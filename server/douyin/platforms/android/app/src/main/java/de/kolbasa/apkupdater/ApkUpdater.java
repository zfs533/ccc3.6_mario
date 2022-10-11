package de.kolbasa.apkupdater;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.File;

import de.kolbasa.apkupdater.downloader.Progress;
import de.kolbasa.apkupdater.exceptions.ActionInProgressException;
import de.kolbasa.apkupdater.exceptions.DownloadInProgressException;
import de.kolbasa.apkupdater.exceptions.DownloadNotRunningException;
import de.kolbasa.apkupdater.tools.ApkInstaller;
import de.kolbasa.apkupdater.tools.AppData;
import de.kolbasa.apkupdater.tools.PermissionManager;
import de.kolbasa.apkupdater.tools.StackExtractor;
import de.kolbasa.apkupdater.update.Update;
import de.kolbasa.apkupdater.update.UpdateManager;

public class ApkUpdater extends CordovaPlugin {

    private static final String UPDATE_DIR = "update";

    private UpdateManager updateManager;

    private void init() {
        if (updateManager == null) {
            File downloadDir = new File(cordova.getContext().getFilesDir(), UPDATE_DIR);
            updateManager = new UpdateManager(downloadDir, cordova.getContext());
        }
    }

    private void checkIfRunning() throws DownloadInProgressException {
        if (updateManager != null && updateManager.isDownloading()) {
            throw new DownloadInProgressException();
        }
    }

    private Update getUpdate() throws Exception {
        checkIfRunning();
        return updateManager.getUpdate();
    }

    private void pushProgressEvent(CallbackContext callbackContext, Progress progress) {
        if (progress == null || callbackContext.isFinished()) {
            return;
        }
        try {
            PluginResult resp = new PluginResult(PluginResult.Status.OK, progress.toJSON());
            if (progress.getPercent() < 100) {
                resp.setKeepCallback(true);
            }
            callbackContext.sendPluginResult(resp);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private int toBit(boolean bool) {
        return bool ? 1 : 0;
    }

    private void getInstalledVersion(CallbackContext callbackContext) {
        try {
            callbackContext.success(AppData.getPackageInfo(cordova.getContext()).toJSON());
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private String parseString(String str) {
        return str.equals("null") ? null : str;
    }

    private void download(JSONArray data, CallbackContext callbackContext) {
        try {
            checkIfRunning();

            String url = parseString(data.getString(0));
            String basicAuth = parseString(data.getString(1));
            String zipPassword = parseString(data.getString(2));

            Update update = updateManager.download(url, basicAuth, zipPassword);
            callbackContext.success(update.toJSON());
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void addProgressObserver(CallbackContext callbackContext) {
        try {
            updateManager.addDownloadObserver((o, arg) -> pushProgressEvent(callbackContext, (Progress) arg));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void addUnzipObserver(CallbackContext callbackContext) {
        try {
            updateManager.addUnzipObserver((o, arg) -> pushProgressEvent(callbackContext, (Progress) arg));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void stop(CallbackContext callbackContext) {
        try {
            if (updateManager.isDownloading()) {
                reset(callbackContext);
            } else {
                throw new DownloadNotRunningException();
            }
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void getDownloadedUpdate(CallbackContext callbackContext) {
        try {
            callbackContext.success(getUpdate().toJSON());
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void reset(CallbackContext callbackContext) {
        try {
            updateManager.reset();
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private CallbackContext cbcInstallSettings;

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        if (cbcInstallSettings != null) {
            canRequestPackageInstalls(cbcInstallSettings);
            cbcInstallSettings = null;
        }
    }

    private void canRequestPackageInstalls(CallbackContext callbackContext) {
        try {
            callbackContext.success(toBit(PermissionManager.canRequestPackageInstalls(cordova.getContext())));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void openInstallSetting(CallbackContext callbackContext) {
        try {
            if (cbcInstallSettings != null) {
                throw new ActionInProgressException();
            }
            cbcInstallSettings = callbackContext;
            PermissionManager.openInstallSetting(cordova.getContext());
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void install(CallbackContext callbackContext) {
        try {
            ApkInstaller.install(cordova.getContext(), getUpdate().getInstallFile());
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void isDeviceRooted(CallbackContext callbackContext) {
        try {
            callbackContext.success(toBit(ApkInstaller.isDeviceRooted(cordova.getContext())));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void requestRootAccess(CallbackContext callbackContext) {
        try {
            callbackContext.success(toBit(ApkInstaller.requestRootAccess()));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void rootInstall(CallbackContext callbackContext) {
        try {
            ApkInstaller.rootInstall(cordova.getContext(), getUpdate().getInstallFile());
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void isDeviceOwner(CallbackContext callbackContext) {
        try {
            callbackContext.success(toBit(ApkInstaller.isDeviceOwner(cordova.getContext())));
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    private void ownerInstall(CallbackContext callbackContext) {
        try {
            ApkInstaller.ownerInstall(cordova.getContext(), getUpdate().getInstallFile());
            callbackContext.success();
        } catch (Exception e) {
            callbackContext.error(StackExtractor.format(e));
        }
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
        init();

        switch (action) {
            case "getInstalledVersion":
                cordova.getThreadPool().execute(() -> getInstalledVersion(callbackContext));
                break;
            case "download":
                cordova.getThreadPool().execute(() -> download(data, callbackContext));
                break;
            case "addProgressObserver":
                cordova.getThreadPool().execute(() -> addProgressObserver(callbackContext));
                break;
            case "addUnzipObserver":
                cordova.getThreadPool().execute(() -> addUnzipObserver(callbackContext));
                break;
            case "stop":
                cordova.getThreadPool().execute(() -> stop(callbackContext));
                break;
            case "getDownloadedUpdate":
                cordova.getThreadPool().execute(() -> getDownloadedUpdate(callbackContext));
                break;
            case "reset":
                cordova.getThreadPool().execute(() -> reset(callbackContext));
                break;
            case "canRequestPackageInstalls":
                cordova.getThreadPool().execute(() -> canRequestPackageInstalls(callbackContext));
                break;
            case "openInstallSetting":
                cordova.getThreadPool().execute(() -> openInstallSetting(callbackContext));
                break;
            case "install":
                cordova.getThreadPool().execute(() -> install(callbackContext));
                break;
            case "isDeviceRooted":
                cordova.getThreadPool().execute(() -> isDeviceRooted(callbackContext));
                break;
            case "rootInstall":
                cordova.getThreadPool().execute(() -> rootInstall(callbackContext));
                break;
            case "requestRootAccess":
                cordova.getThreadPool().execute(() -> requestRootAccess(callbackContext));
                break;
            case "isDeviceOwner":
                cordova.getThreadPool().execute(() -> isDeviceOwner(callbackContext));
                break;
            case "ownerInstall":
                cordova.getThreadPool().execute(() -> ownerInstall(callbackContext));
                break;
            default:
                return false;
        }

        return true;
    }

}