import { urlJoin, versionCompare } from "~/assets/js/utils";

export default (context, inject) => {
    console.log("plugin version init");

    let updateWebing = false;
    var html = window.document.getElementsByTagName("html")[0];
    var htmlAttrs = {
        version: html.getAttribute("version"),
        buildTime: Number(html.getAttribute("buildTime"))
    };
    var serverVersionData;

    function getCurrentWebVersion() {
        return htmlAttrs.version;
    }

    function getServerWebVersion() {
        return serverVersionData.version;
    }

    async function getClientVersion() {
        let version;
        let nativeVersion = await context.$version.getInstalledApkVersion();
        if (nativeVersion) {
            version = `n${nativeVersion.version}+w${context.$env.version}`;
        } else {
            version = context.$env.version;
        }
        return version;
    }

    function getServerVersionData(webUrl) {
        return new Promise((resolve, reject) => {
            let versionUrl = urlJoin(webUrl, context.$env.baseUrl, "version.js?dt=" + Date.now());
            context.$axios.jsonp(versionUrl, "version_callback").then(async(ret) => {
                console.log("getServerVersionData version.json ok==", versionUrl, ret);
                if (ret) {
                    let data = ret.data;
                    return resolve(data);
                } else {
                    return resolve(undefined);
                }
            }).catch((err) => {
                console.log("getServerVersionData version.json catch==", err.config.url);
                return resolve(undefined);
            });
        });
    }

    async function getInstalledApkVersion() {
        if (!context.$cordova) return;

        return await context.$cordova.getApkVersion();
    }

    function getServerApkVersion() {
        return serverVersionData.apkVersion;
    }

    async function checkApkVersion() {
        if (context.isDev) return false;
        let localVersion = await getInstalledApkVersion();
        if (!localVersion) return false;

        console.log("version checkApkVersion server", serverVersionData, "local", localVersion);

        if (serverVersionData.package !== localVersion.package) return false;
        // 服务器版本大于当前版本号才进行更新
        if (versionCompare(serverVersionData.apkVersion.name, localVersion.version) > 0) {
            return true;
        }
        if (Number(serverVersionData.apkVersion.code) > Number(localVersion.versionCode)) {
            return true;
        }
        return false;
    }

    function checkWebVersion() {
        if (context.isDev) return false;

        console.log(`version checkWebVersion server: ${serverVersionData.version} local: ${htmlAttrs.version}`);
        // 服务器版本大于当前版本号才进行更新
        if (versionCompare(serverVersionData.version, htmlAttrs.version) > 0) return true;
        return false;
    }

    async function updateWeb() {
        if (updateWebing) return;
        updateWebing = true;

        let webBaseUrl = context.$checkLine.getWebBaseUrl();
        if (context.$cordova) {
            let ret = await context.$cordova.updateHotCode(webBaseUrl);
            updateWebing = false;
            return ret;
        }
        if (context.$serviceWork) {
            let ret = await context.$serviceWork.manualUpdateSW();
            updateWebing = false;
            return ret;
        }
    }

    function updateApk(newVersion, onDownloadProgress, onDowndloadOk, onDownloadErr) {
        let webBaseUrl = context.$checkLine.getWebBaseUrl();
        if (context.$cordova) {
            context.$cordova.updateApk(newVersion, webBaseUrl, onDownloadProgress, onDowndloadOk, onDownloadErr);
        }
    }

    function installNewVersionApk(onOk, onErr) {
        if (context.$cordova) {
            context.$cordova.installApk(onOk, onErr);
        }
    }

    async function init() {
        let webBaseUrl = context.$checkLine.getWebBaseUrl();
        serverVersionData = await getServerVersionData(webBaseUrl);

        // 测试使用
        // serverVersionData = {
        //     "version": "1.1.17-116",
        //     "buildTime": Date.now(),
        //     "package": "com.zq.douying",
        //     "apkVersion": {
        //         "name": "1.2.3",
        //         "code": 1
        //     }
        // };
        console.log("version plugin init server version: ", serverVersionData);
        if (serverVersionData) {
            return true;
        }
        return false;
    }

    inject("version", {
        init,
        getCurrentWebVersion,
        getServerWebVersion,
        getInstalledApkVersion,
        getServerApkVersion,
        checkWebVersion,
        checkApkVersion,
        updateWeb,
        updateApk,
        installNewVersionApk,
        getClientVersion
    });
};