package com.nordnetab.chcp.main.network;

import android.util.Log;

import com.nordnetab.chcp.main.events.DownloadErrorEvent;
import com.nordnetab.chcp.main.events.MD5Exception;
import com.nordnetab.chcp.main.model.ManifestFile;
import com.nordnetab.chcp.main.utils.FilesUtility;
import com.nordnetab.chcp.main.utils.MD5;
import com.nordnetab.chcp.main.utils.Paths;
import com.nordnetab.chcp.main.utils.URLConnectionHelper;
import com.nordnetab.chcp.main.utils.URLUtility;

import org.apache.cordova.LOG;
import org.greenrobot.eventbus.EventBus;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

/**
 * Created by Nikolay Demyankov on 22.07.15.
 * <p/>
 * Helper class to download files.
 */
public class FileDownloader {

    /**
     * Download list of files.
     * Full url to the file is constructed from the contentFolderUrl and ManifestFile#hash (relative path).
     * For each downloaded file we perform check of his hash. If it is different from the one, that provided
     * if ManifestFile#hash - exception will be thrown.
     * Download stops on any error.
     *
     * @param downloadFolder   absolute path to the folder, where downloaded files should be placed
     * @param contentFolderUrl root url on the server, where all files are located
     * @param files            list of files to download
     * @throws Exception
     * @see ManifestFile
     */
    public static void downloadFiles(final String downloadFolder,
                                     final String contentFolderUrl,
                                     final List<ManifestFile> files,
                                     final Map<String, String> requestHeaders) throws Exception {
        int num = 0;
        boolean isFinishedWithSuccess = false;
        for (ManifestFile file : files) {
            String fileUrl = URLUtility.construct(contentFolderUrl, file.name);
            String filePath = Paths.get(downloadFolder, file.name);
            try {
                download(fileUrl, filePath, file.hash, requestHeaders);
            } catch (Exception e) {
                while (num < 2 && !isFinishedWithSuccess) {
                    num++;
                    Log.d("ssss", "downloadFiles: 重试失败:" + num);
                    try {
                        download(fileUrl, filePath, file.hash, requestHeaders);
                        isFinishedWithSuccess = true;
                    } catch (Exception err) {
                        isFinishedWithSuccess = false;
                        if (num == 2) {
                            EventBus.getDefault().post(new DownloadErrorEvent("下载错误重试文件：" + fileUrl + " 重试次数：" + num + " 失败"));
                            throw err;
                        }
                    }
                }
                if (isFinishedWithSuccess) {
                    Log.d("ssss", "downloadFiles: 重试成功");
                    EventBus.getDefault().post(new DownloadErrorEvent("下载错误重试文件：" + fileUrl + " 重试次数：" + num + " 成功"));
                }
            }
        }
    }
    /**
     * Download file from server, save it on the disk and check his hash.
     *
     * @param urlFrom  url to download from
     * @param filePath where to save file
     * @param checkSum checksum of the file
     * @throws IOException
     */
    public static void download(final String urlFrom,
                                final String filePath,
                                final String checkSum,
                                final Map<String, String> requestHeaders) throws Exception {
        Log.d("CHCP", "download file start: " + urlFrom);
        final MD5 md5 = new MD5();

        final File downloadFile = new File(filePath);
        FilesUtility.delete(downloadFile);
        FilesUtility.ensureDirectoryExists(downloadFile.getParentFile());

        // download file
        String urlF = urlFrom + "?dt=" + System.currentTimeMillis();
        final URLConnection connection = URLConnectionHelper.createConnectionToURL(urlF, requestHeaders);
        final InputStream input = new BufferedInputStream(connection.getInputStream());
        final OutputStream output = new BufferedOutputStream(new FileOutputStream(filePath, false));

        final byte data[] = new byte[1024];
        int count;
        while ((count = input.read(data)) != -1) {
            output.write(data, 0, count);
            md5.write(data, count);
        }

        output.flush();
        output.close();
        input.close();

        final String downloadedFileHash = md5.calculateHash();
        if (!downloadedFileHash.equals(checkSum)) {
            LOG.e("CHCP", "download file error " + urlFrom + " is corrupted: checksum " + checkSum + " doesn't match hash " + downloadedFileHash + " of the downloaded file");
//            EventBus.getDefault().post(new DownloadErrorEvent("download file error " + urlFrom + " is corrupted: checksum " + checkSum + " doesn't match hash " + downloadedFileHash + " of the downloaded file"));
            throw new MD5Exception("MD5错误:"+urlFrom);
        } else {
            Log.d("CHCP", "download file ok : " + urlFrom);
        }
    }
}
