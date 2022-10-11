import { injectScript, urlJoin } from "~/assets/js/utils";

export default async (context, inject) => {
    if (!window._cordovaNative) {
        console.log('Your does not support the cordova!');
        return;
    }
    console.log("plugin cordova init");
    function chcpConfigure(config) {
        return new Promise((resolve, reject) => {
            window.chcp && chcp.configure(
                config,
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    function chcpGetVersion() {
        return new Promise((resolve, reject) => {
            window.chcp && chcp.getVersionInfo(
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    }

    function chcpFetchUpdate() {
        return new Promise((resolve, reject) => {
            chcp.fetchUpdate((error, data) => {
                if (error) {
                    console.warn('updateChcp fetchUpdate', error.code, error.description);
                    if (error.code === -2) {
                        // 必须升级底包
                        //调用升级提示框 点击确认会跳转对应商店升级

                        // 告知用户需要进入下载包进行更新 ，chcp 配置 storeIdentifier
                        // chcp.requestApplicationUpdate("请求更新", function onSuccessInnerCallback() {
                        //     console.log("updateChcp requestApplicationUpdate success");
                        // }, function onFailureInnerCallback() {
                        //     console.log("updateChcp requestApplicationUpdate failure");
                        // }); 
                    }
                    return reject(error);
                }
                console.warn('updateChcp fetchUpdate ok ', data);
                resolve(data);
            });
        });
    }

    function chcpIsUpdateAvailableForInstallation() {
        return new Promise((resolve, reject) => {
            chcp.isUpdateAvailableForInstallation((error, data) => {
                if (error) {
                    console.warn('updateChcp isUpdateAvailableForInstallation', error.code, error.description);
                    return resolve(error);
                }
                console.warn('updateChcp isUpdateAvailableForInstallation ok ', data);
                resolve(data);
            });
        });
    }

    function chcpInstallUpdate() {
        return new Promise((resolve, reject) => {
            chcp.installUpdate((error) => {
                if (error) {
                    console.warn('updateChcp installUpdate', error.code, error.description);
                    return reject(false);
                }
                console.warn('updateChcp installUpdate ok ');
                resolve(true);
            });
        });
    }

    async function initChcp(contentUrl) {
        let chcp = window.chcp;
        if (!chcp) return;
        chcp.contentUrl = contentUrl;
        try {
            let localVersion = await chcpGetVersion();
            console.log("initChcp get localVersion ok", localVersion);

            await chcpConfigure({
                "content-url": contentUrl
            });
            console.log("initChcp configure ok");
        } catch (err) {
            if (err.code === 2) {
                // 无更新内容
                console.log("initChcp check no new version", err);
                return;
            }
            console.warn("initChcp error", err);
            context.$logger.reportError({
                filename: contentUrl,
                message: "\n initChcp error" + err.description + " err.message:" + err.message
            });
        }
    }

    async function updateChcp() {
        let chcp = window.chcp;
        if (!chcp) return false;
        try {
            let availableVersionRet = await chcpIsUpdateAvailableForInstallation();
            console.log("updateChcp chcpIsUpdateAvailableForInstallation ok", availableVersionRet);
            if (availableVersionRet.code === 1) { // 没有可安装的版本
                let updateRet = await chcpFetchUpdate();
                if (updateRet.code === 2) { // 没有可以安装的版本
                    console.warn("updateChcp chcpFetchUpdate error", updateRet);
                    return false;
                }
                console.log("updateChcp chcpFetchUpdate ok", updateRet);

                availableVersionRet = await chcpIsUpdateAvailableForInstallation();
                console.log("updateChcp chcpIsUpdateAvailableForInstallation ok", availableVersionRet);
            }
            if (availableVersionRet.currentVersion === availableVersionRet.readyToInstallVersion) {
                console.log("updateChcp chcpIsUpdateAvailableForInstallation version error ", availableVersionRet.currentVersion, availableVersionRet.readyToInstallVersion);
                return false;
            }
            if (window.$nuxt) {
                window.$nuxt.$dialog.alert({
                    title: '更新提示',
                    message: '新版本已经更新成功,点击确定获取最新体验。',
                }).then(async () => {
                    return await chcpInstallUpdate();
                });
            }
        } catch (err) {
            if (err.code === 2) {
                // 无更新内容
                console.log("updateChcp check ", err);
                return false;
            }
            console.warn("updateChcp error", err);
            context.$logger.reportError({
                filename: chcp.contentUrl,
                message: "\n updateChcp code:" + err.code + " error:" + err.description + " message:" + err.message
            });
            if (window.$nuxt) {
                if (err.description) {
                    console.warn("updateChcp error code" + err.code);
                    if (err.code === -21) {
                        err.description = "网络不稳定，请稍后再试！";
                    } else if (err.code === -22) {
                        return false;
                    }
                    window.$nuxt.$dialog.alert({
                        title: '出现错误',
                        message: '详细信息:' + err.description,
                        theme: 'round-button',
                    });
                }
            }
            return false;
        }
    }

    async function updateHotCode(contentUrl) {
        document.addEventListener(chcp.event.BEFORE_ASSETS_INSTALLATION, (e) => {
            console.log("chcpInit BEFORE_ASSETS_INSTALLATION", e);
        });
        document.addEventListener(chcp.event.ASSETS_INSTALLATION_FAILED, (e) => {
            console.log("chcpInit ASSETS_INSTALLATION_FAILED", e);
        });
        document.addEventListener(chcp.event.ASSETS_INSTALLED, (e) => {
            console.log("chcpInit ASSETS_INSTALLED", e);
        });
        document.addEventListener(chcp.event.NOTHING_TO_UPDATE, (e) => {
            // 没有新版本
            console.log("chcpInit  NOTHING_TO_UPDATE", e);
        });
        document.addEventListener(chcp.event.UPDATE_LOAD_FAILED, (e) => {
            console.log("chcpInit UPDATE_LOAD_FAILED", e);
        });
        document.addEventListener(chcp.event.UPDATE_IS_READY_TO_INSTALL, (e) => {
            console.log("chcpInit UPDATE_IS_READY_TO_INSTALL", e);
        });
        document.addEventListener(chcp.event.BEFORE_UPDATE_INSTALLATION, (e) => {
            console.log("chcpInit BEFORE_UPDATE_INSTALLATION", e);
        });
        document.addEventListener(chcp.event.UPDATE_INSTALLATION_FAILED, (e) => {
            console.log("chcpInit UPDATE_INSTALLATION_FAILED", e);
        });
        document.addEventListener(chcp.event.UPDATE_INSTALLED, (e) => {
            console.log("chcpInit UPDATE_INSTALLED", e);
        });
        document.addEventListener(chcp.event.NOTHING_TO_INSTALL, (e) => {
            console.log("chcpInit NOTHING_TO_INSTALL", e);
        });
        try {
            document.addEventListener(chcp.event.DOWNLOAD_ERROR, (e) => {
                context.$logger.reportError({
                    filename: chcp.contentUrl,
                    message: " DOWNLOAD_ERROR: " + e.detail.error.description
                });
            });
        } catch {
        }
        await initChcp(contentUrl);
        return await updateChcp();
    }

    async function getApkVersion() {
        if (!window.ApkUpdater) return;
        let verData = await window.ApkUpdater.getInstalledVersion();
        return {
            package: verData.package,
            version: verData.version.name,
            versionCode: verData.version.code
        };
    }

    function updateApk(newVersion, contentUrl, onDownloadProgress, onDowndloadOk, onDownloadErr) {
        if (!window.ApkUpdater) return;
        // let apkUrl = "https://up.douying.app/apk/dy.apk";
        let apkUrl = urlJoin(contentUrl, context.$env.baseUrl, "/apk/", "app-" + newVersion + ".apk");
        window.ApkUpdater.download(
            apkUrl,
            {
                onDownloadProgress: onDownloadProgress || console.log
            },
            onDowndloadOk,
            onDownloadErr || console.error
        );
    }

    function installApk(onOk, onErr) {
        window.ApkUpdater.install(onOk || console.log, onErr || console.error);
    }

    function getChannel() {
        if (window.device) {
            return window.device.mChannel;
        }
        return "";
    }
    
    function getInviteCode() {
        if (window.device) {
            return window.device.inviteCode;
        }
        return "";
    }

    function getDeviceUUID() {
        if (window.device) {
            return window.device.uuid;
        }
        return "";
    }

    function open(url, target, features) {
        window.open;
        if (window.cordova) {
            window.cordova.InAppBrowser.open(url, target, features);
        }
    }

    //返回键点击响应
    function eventBackButton() {
        if (!['index', 'home', 'short', 'my'].includes(context.route.name)) {
            context.app.router.back();
            return;
        }

        if (window.$nuxt) {
            window.$nuxt.$toast('再点击一次退出!');
        }
        document.removeEventListener("backbutton", eventBackButton, false);//注销返回键
        //3秒后重新注册
        var timerID = window.setTimeout(function () {
            window.clearTimeout(timerID);
            document.addEventListener("backbutton", eventBackButton, false);//返回键
        }, 3000);
    }

    function screenOrientation(orientation) {
        try {
            screen.orientation.lock(orientation);
        } catch {
        }
    }

    function downloadQrcode(imageDom) {
        // var canvas = document.querySelector('canvas');
        // //将canvas转码：
        // var base64Text = canvas.toDataURL("image/png");
        html2canvas(imageDom).then(canvas => {
            // 转成图片，生成图片地址
            var base64Text = canvas.toDataURL("image/png");
            window.cordova.base64ToGallery(
                base64Text,
                {
                    prefix: 'img_',
                    mediaScanner: true
                },
                (path) => {
                    console.log(path);
                    window.$nuxt.$dialog.alert({ title: "", message: "图片保存完成！" });
                },
                (err) => {
                    window.$nuxt.$dialog.alert({ title: "", message: "保存图片失败，请重试！" });
                    console.error(err);
                }
            );
        });
    }

    // 只有在cordova 环境才执行热更新流程
    function init() {
        return new Promise((resolve) => {
            document.addEventListener(
                "deviceready",
                async () => {
                    console.log("cordova device ready");
                    screenOrientation('portrait');
                    document.addEventListener("backbutton", eventBackButton, false);
                    resolve();
                }, false);

            injectScript("cordova.js", () => {
                console.log("cordova.js loaded");
            });
            injectScript("html2canvas.js", () => {
                console.log("html2canvas.js loaded");
            });
        });
    }
    await init();
    inject("cordova", {
        open,
        getChannel,
        getDeviceUUID,
        updateHotCode,
        getApkVersion,
        updateApk,
        installApk,
        screenOrientation,
        downloadQrcode,
        getInviteCode
    });
};