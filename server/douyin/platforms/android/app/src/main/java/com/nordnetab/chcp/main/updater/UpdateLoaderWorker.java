package com.nordnetab.chcp.main.updater;

import android.text.TextUtils;
import android.util.Log;

import com.nordnetab.chcp.main.config.ApplicationConfig;
import com.nordnetab.chcp.main.config.ContentConfig;
import com.nordnetab.chcp.main.config.ContentManifest;
import com.nordnetab.chcp.main.events.DownloadErrorEvent;
import com.nordnetab.chcp.main.events.MD5Exception;
import com.nordnetab.chcp.main.events.NothingToUpdateEvent;
import com.nordnetab.chcp.main.events.UpdateDownloadErrorEvent;
import com.nordnetab.chcp.main.events.UpdateIsReadyToInstallEvent;
import com.nordnetab.chcp.main.events.WorkerEvent;
import com.nordnetab.chcp.main.model.ChcpError;
import com.nordnetab.chcp.main.model.ManifestDiff;
import com.nordnetab.chcp.main.model.ManifestFile;
import com.nordnetab.chcp.main.model.PluginFilesStructure;
import com.nordnetab.chcp.main.network.ApplicationConfigDownloader;
import com.nordnetab.chcp.main.network.ContentManifestDownloader;
import com.nordnetab.chcp.main.network.DownloadResult;
import com.nordnetab.chcp.main.network.FileDownloader;
import com.nordnetab.chcp.main.storage.ApplicationConfigStorage;
import com.nordnetab.chcp.main.storage.ContentManifestStorage;
import com.nordnetab.chcp.main.storage.IObjectFileStorage;
import com.nordnetab.chcp.main.utils.FilesUtility;
import com.nordnetab.chcp.main.utils.URLUtility;

import org.greenrobot.eventbus.EventBus;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by Nikolay Demyankov on 28.07.15.
 * <p/>
 * Worker, that implements update download logic.
 * During the download process events are dispatched to notify the subscribers about the progress.
 * <p/>
 * Used internally.
 */
class UpdateLoaderWorker implements WorkerTask {

    private final String applicationConfigUrl;
    private final String applicationContentUrl;
    private final int appNativeVersion;
    private final PluginFilesStructure filesStructure;
    private final Map<String, String> requestHeaders;

    private IObjectFileStorage<ApplicationConfig> appConfigStorage;
    private IObjectFileStorage<ContentManifest> manifestStorage;

    private ApplicationConfig oldAppConfig;
    private ContentManifest oldManifest;

    private WorkerEvent resultEvent;

    /**
     * Constructor.
     *
     * @param request download request
     */
    UpdateLoaderWorker(final UpdateDownloadRequest request) {
        applicationConfigUrl = request.getConfigURL();
        applicationContentUrl = request.getContentURL();
        appNativeVersion = request.getCurrentNativeVersion();
        filesStructure = request.getCurrentReleaseFileStructure();
        requestHeaders = request.getRequestHeaders();
    }

    @Override
    public void run() {
        Log.d("CHCP", "Starting loader worker ");
        // initialize before running
        if (!init()) {
            return;
        }

        // download new application config
        final ApplicationConfig newAppConfig = downloadApplicationConfig(applicationConfigUrl);
        if (newAppConfig == null) {
            setErrorResult(ChcpError.FAILED_TO_DOWNLOAD_APPLICATION_CONFIG, null);
            return;
        }
        final ContentConfig newContentConfig = newAppConfig.getContentConfig();

        String contentUrl = newContentConfig.getContentUrl();
        if (contentUrl == null && applicationContentUrl != null) contentUrl = applicationContentUrl;

        if (newContentConfig == null
                || TextUtils.isEmpty(newContentConfig.getReleaseVersion())
                || TextUtils.isEmpty(contentUrl)) {
            setErrorResult(ChcpError.NEW_APPLICATION_CONFIG_IS_INVALID, null);
            return;
        }

        // check if there is a new content version available
        if (newContentConfig.getReleaseVersion().equals(oldAppConfig.getContentConfig().getReleaseVersion())) {
            setNothingToUpdateResult(newAppConfig);
            return;
        }

        // check if current native version supports new content
        if (newContentConfig.getMinimumNativeVersion() > appNativeVersion) {
            setErrorResult(ChcpError.APPLICATION_BUILD_VERSION_TOO_LOW, newAppConfig);
            return;
        }

        // download new content manifest
        final ContentManifest newContentManifest = downloadContentManifest(contentUrl);
        if (newContentManifest == null) {
            setErrorResult(ChcpError.FAILED_TO_DOWNLOAD_CONTENT_MANIFEST, newAppConfig);
            return;
        }

        // find files that were updated
        final ManifestDiff diff = oldManifest.calculateDifference(newContentManifest);
        if (diff.isEmpty()) {
            manifestStorage.storeInFolder(newContentManifest, filesStructure.getWwwFolder());
            appConfigStorage.storeInFolder(newAppConfig, filesStructure.getWwwFolder());
            setNothingToUpdateResult(newAppConfig);

            return;
        }

        // switch file structure to new release
        filesStructure.switchToRelease(newAppConfig.getContentConfig().getReleaseVersion());

        recreateDownloadFolder(filesStructure.getDownloadFolder());

        // download files
        int isDownloaded = downloadNewAndChangedFiles(contentUrl, diff);
        if (isDownloaded != 0) {
            cleanUp();
            if (isDownloaded == 1) {
                setErrorResult(ChcpError.DOWNLOAD_NETWORK_ERROR, null);
            } else if (isDownloaded == 2) {
                setErrorResult(ChcpError.DOWNLOAD_MD5_ERROR, null);
            } else {
                setErrorResult(ChcpError.FAILED_TO_DOWNLOAD_UPDATE_FILES, newAppConfig);
            }
            return;
        }

        // store configs
        manifestStorage.storeInFolder(newContentManifest, filesStructure.getDownloadFolder());
        appConfigStorage.storeInFolder(newAppConfig, filesStructure.getDownloadFolder());

        // notify that we are done
        setSuccessResult(newAppConfig);

        Log.d("CHCP", "Loader worker has finished");
    }

    /**
     * Initialize all required variables before running the update.
     *
     * @return <code>true</code> if we are good to go, <code>false</code> - failed to initialize
     */
    private boolean init() {
        manifestStorage = new ContentManifestStorage();
        appConfigStorage = new ApplicationConfigStorage();

        // load current application config
        oldAppConfig = appConfigStorage.loadFromFolder(filesStructure.getWwwFolder());
        if (oldAppConfig == null) {
            setErrorResult(ChcpError.LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND, null);
            return false;
        }

        // load current content manifest
        oldManifest = manifestStorage.loadFromFolder(filesStructure.getWwwFolder());
        if (oldManifest == null) {
            setErrorResult(ChcpError.LOCAL_VERSION_OF_MANIFEST_NOT_FOUND, null);
            return false;
        }

        return true;
    }

    /**
     * Download application config from server.
     *
     * @param configUrl from what url it should be downloaded
     * @return new application config; <code>null</code> when failed to download
     */
    private ApplicationConfig downloadApplicationConfig(final String configUrl) {
        final ApplicationConfigDownloader downloader = new ApplicationConfigDownloader(configUrl, requestHeaders);
        final DownloadResult<ApplicationConfig> downloadResult = downloader.download();
        if (downloadResult.error != null) {
            Log.d("CHCP", "Failed to download application config");

            return null;
        }

        return downloadResult.value;
    }

    /**
     * Download new content manifest from server.
     *
     * @param contentUrl url where our content lies
     * @return new content manifest; <code>null</code> when failed to download
     */
    private ContentManifest downloadContentManifest(final String contentUrl) {
        String url = contentUrl;
        if (!contentUrl.endsWith(".manifest")) {
            url = URLUtility.construct(contentUrl, PluginFilesStructure.MANIFEST_FILE_NAME);
        }
        final ContentManifestDownloader downloader = new ContentManifestDownloader(url, requestHeaders);
        final DownloadResult<ContentManifest> downloadResult = downloader.download();
        if (downloadResult.error != null) {
            Log.d("CHCP", "Failed to download content manifest");
            return null;
        }
        return downloadResult.value;
    }

    /**
     * Remove old version of download folder and create a new one.
     *
     * @param folder absolute path to download folder
     */
    private void recreateDownloadFolder(final String folder) {
        FilesUtility.delete(folder);
        FilesUtility.ensureDirectoryExists(folder);
    }

    /**
     * Download from server new and update files.
     *
     * @param contentUrl content url
     * @param diff       manifest difference from which we will know, what files to download
     * @return <code>true</code> if files are loaded; <code>false</code> - otherwise
     */
    private int downloadNewAndChangedFiles(final String contentUrl, final ManifestDiff diff) {
        final List<ManifestFile> downloadFiles = diff.getUpdateFiles();
        int isFinishedWithSuccess = 0;
        try {
            FileDownloader.downloadFiles(filesStructure.getDownloadFolder(), contentUrl, downloadFiles, requestHeaders);
        } catch (IOException e) {
            e.printStackTrace();
            isFinishedWithSuccess = 1;
        } catch (MD5Exception e) {
            e.printStackTrace();
            isFinishedWithSuccess = 2;
        } catch (Exception e) {
            e.printStackTrace();
            EventBus.getDefault().post(new DownloadErrorEvent("热更新下载文件异常错误捕获：" + e.getMessage()));
            isFinishedWithSuccess = 3;
        }

        return isFinishedWithSuccess;
    }

    /**
     * Remove temporary files
     */
    private void cleanUp() {
        FilesUtility.delete(filesStructure.getContentFolder());
    }

    // region Events

    private void setErrorResult(final ChcpError error, final ApplicationConfig newAppConfig) {
        resultEvent = new UpdateDownloadErrorEvent(error, newAppConfig);
    }

    private void setSuccessResult(final ApplicationConfig newAppConfig) {
        resultEvent = new UpdateIsReadyToInstallEvent(newAppConfig);
    }

    private void setNothingToUpdateResult(final ApplicationConfig newAppConfig) {
        resultEvent = new NothingToUpdateEvent(newAppConfig);
    }

    @Override
    public WorkerEvent result() {
        return resultEvent;
    }

    // endregion
}