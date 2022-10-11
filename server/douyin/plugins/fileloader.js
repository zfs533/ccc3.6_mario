import { urlJoin } from "~/assets/js/utils";

export default (context, inject) => {
    console.log("plugin fileloader init");

    const cacheResUrlMap = {};
    const downloadTaskQueue = [];
    const downloadTaskTimeoutQueue = [];
    let loadErrorCount = 0;

    function loadImg(url, callback, retryTimes = 0) {
        return new Promise(async(resolve, reject) => {
            if (isNaN(retryTimes)) retryTimes = 0;
            let startTick = Date.now();
            const axios = context.$axios;

            let baseUrl = context.$checkLine.getResBaseUrl();
            if (!baseUrl) return resolve();

            let xurl = urlJoin(baseUrl, url);
            // xurl = "https://huangwang.github.io/short-011/pi/km/mn/94ff100694f34dddb8b3b6e5b831a6df.ceb";
            axios({
                method: "get",
                url: xurl,
                responseType: "arraybuffer",
                timeout: (retryTimes + 1) * 5 * 1000
                    // _retryTimes: 3
            }).then((ret) => {
                let imgData;
                if (ret && ret.data) {
                    try {
                        loadErrorCount = 0;

                        let bf = Buffer.from(ret.data);
                        let base64da = bf.toString('base64');
                        imgData = context.$crypto.decryption(base64da);
                        if (callback) {
                            var img = new Image();
                            img.src = imgData;
                            img.onload = () => {
                                console.log("loadImg task callback", url, img.width, img.height);

                                cacheResUrlMap[url] = { imgData: imgData };
                                cacheResUrlMap[url]['width'] = img.width;
                                cacheResUrlMap[url]['height'] = img.height;
                                callback(url, imgData, img.width, img.height);
                            };
                        }
                    } catch (e) {
                        callback(url);
                        console.warn("loadImg decryption error", url, xurl, error.message);
                    }
                }
                resolve(imgData);
                console.log("loadImg task ok time", url, (Date.now() - startTick) / 1000);
            }).catch((e) => {
                let needRetry = false;
                if (e.message.includes("Network Error")) {
                    console.warn("loadImg task error", url, e.message);
                    if (window.$nuxt.isOffline) {
                        if (callback) {
                            callback(url, undefined);
                        }
                        return resolve();
                    } else {
                        // 非离线的情况 出现网络错误大概率未跨域错误，需要切换线路
                        context.$checkLine.clearResBaseUrl();
                        context.$checkLine.addExcludeResDomains(xurl);
                        needRetry = true;
                    }
                }
                loadErrorCount++;
                if ((e.response)) {
                    console.warn("loadImg response error", url, e.response.status, e.response.statusText, e.message, (Date.now() - startTick) / 1000);
                    if (e.response.status === 504 || e.response.status === 503) {
                        context.$checkLine.clearResBaseUrl();
                        context.$checkLine.addExcludeResDomains(xurl);
                        needRetry = true;
                    } else if (e.response.status === 404) {
                        context.$checkLine.clearResBaseUrl();
                        context.$checkLine.addExcludeResDomains(xurl);
                        needRetry = true;
                    } else {
                        if (callback) {
                            console.warn("loadImg task callback error", url, e.response.status);
                            callback(url, undefined);
                        }
                    }
                } else if (e.message.includes('timeout')) {
                    console.warn("loadImg loadImg error", url, e.message, (Date.now() - startTick) / 1000);
                    needRetry = true;
                } else {
                    if (loadErrorCount > 20) {
                        context.$checkLine.clearResBaseUrl();
                        context.$checkLine.addExcludeResDomains(xurl);
                        needRetry = true;
                    }
                }
                if (retryTimes > 4) {
                    console.warn("loadImg loadImg retryTimes over retry error", url, retryTimes);
                    needRetry = false;
                }
                if (needRetry) {
                    downloadTaskTimeoutQueue.push({
                        url: url,
                        callback,
                        retryTimes: retryTimes + 1
                    });
                }
                return resolve();
            });
        });
    }

    async function dowloadImg(url, callback) {
        let data;
        if (cacheResUrlMap[url]) {
            data = cacheResUrlMap[url];
        } else {
            if (url.indexOf(';base64,') != -1) {
                data = url;
            } else {
                if (callback) {
                    downloadTaskQueue.push({
                        url: url,
                        callback,
                        retryTimes: 0
                    });
                } else {
                    console.log("dowloadImg loadImg", url);
                    data = await loadImg(url);
                }
            }
        }
        if (callback && data) callback(url, data.imgData, data.width, data.height);
        return data;
    }

    /**
     * @param {*} width  120 | 240 | 360 | 640 | 750
     */
    async function dowloadJpegImg(url, width, callback) {
        var coverURL = String(url);
        if (coverURL.includes("@")) {
            console.warn("dowloadJpegImg repeat", coverURL);
        }
        // let deviceRatio = context.$env.device.ratio();
        // if (deviceRatio >= 300) {
        if (width === 240) width = 480;
        else if (width === 480) width = 640;
        // }

        if (width &&
            !coverURL.includes("@")
        ) {
            if (window.webpSupported) {
                coverURL += "@webp-" + width;
            } else {
                coverURL += "@jpeg-" + width;
            }
        }
        let data = await dowloadImg(coverURL, callback);
        return { url: coverURL, data };
    }

    /**
     * @param {*} width  120 | 240 | 360 | 640 | 750
     */
    async function dowloadPngImg(url, width, callback) {
        var coverURL = String(url);
        if (coverURL.includes("@")) {
            console.warn("dowloadPngImg repeat", coverURL);
        }
        // let deviceRatio = context.$env.device.ratio();
        // if (deviceRatio >= 300) {
        if (width === 240) width = 480;
        else if (width === 480) width = 640;
        // }

        if (width &&
            !coverURL.includes("@")
        ) {
            if (window.webpSupported) {
                coverURL += "@webp-" + width;
            } else {
                coverURL += "@png-" + width;
            }
        }
        let data = await dowloadImg(coverURL, callback);
        return { url: coverURL, data };
    }

    async function runImgDownloadTask() {
        if (downloadTaskQueue.length > 0) {
            let baseUrl = context.$checkLine.getResBaseUrl();
            if (!baseUrl) {
                let top1 = downloadTaskQueue[0];
                let cacheDomainData = context.$storage.getObject("domains");
                if (cacheDomainData) {
                    let { resDomains } = cacheDomainData;
                    let fastDomain = await context.$checkLine.checkFastResUrl(resDomains);
                    console.log("runImgDownloadTask  ===切换资源线路==", fastDomain);
                }
            }

            let tops = downloadTaskQueue.splice(0, downloadTaskQueue.length < 5 ? downloadTaskQueue.length : 5);
            Promise.all(tops.map(x => loadImg(x.url, x.callback, x.retryTimes))).then((r) => {
                console.log(`runImgDownloadTask process img ${tops.length} ${r.length}`);
                setTimeout(runImgDownloadTask, 10);
            });
        } else {
            setTimeout(runImgDownloadTask, 100);
        }
    }

    async function runImgDownloadTimeoutTask() {
        if (downloadTaskTimeoutQueue.length > 0) {
            let baseUrl = context.$checkLine.getResBaseUrl();
            if (!baseUrl) {
                let top1 = downloadTaskTimeoutQueue[0];
                let cacheDomainData = context.$storage.getObject("domains");
                if (cacheDomainData) {
                    let { resDomains } = cacheDomainData;
                    let fastDomain = await context.$checkLine.checkFastResUrl(resDomains);
                    console.log("runImgDownloadTimeoutTask  ===切换资源线路==", fastDomain);
                }
            }

            let tops = downloadTaskTimeoutQueue.splice(0, downloadTaskTimeoutQueue.length < 5 ? downloadTaskTimeoutQueue.length : 5);
            Promise.all(tops.map(x => loadImg(x.url, x.callback, x.retryTimes))).then((r) => {
                console.log(`runImgDownloadTimeoutTask process img ${tops.length} ${r.length}`);
                setTimeout(runImgDownloadTimeoutTask, 10);
            });
        } else {
            setTimeout(runImgDownloadTimeoutTask, 100);
        }
    }

    function init() {
        runImgDownloadTask();
        runImgDownloadTimeoutTask();
    }

    inject("fileloader", {
        init,
        dowloadPngImg,
        dowloadJpegImg
    });
};