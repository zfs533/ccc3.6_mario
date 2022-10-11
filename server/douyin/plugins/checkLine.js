import { urlJoin } from "~/assets/js/utils";

export default (context, inject) => {
    const apiPrefix = "api/v1";


    console.log("plugin checkLine init");
    let apiBaseUrl, resBaseUrl,
        webBaseUrl;
    let excludeResDomains = [];
    /**
     * 资源节点选线路
     * @param {*} domains 
     */
    async function _checkFastResUrl(domains, resPrex) {
        console.log("checkLine _checkFastResUrl ===开始选取资源线路 ==", domains);
        let cb;
        let p = new Promise(resolve => cb = resolve);
        let cbok = false;
        let testOne = async(url, prex) => {
            return new Promise((resolve, reject) => {
                let startTick = Date.now();
                let fullUrl = urlJoin(url, prex) + "?dt=" + Date.now();
                window.ajax({
                    url: fullUrl,
                    type: "GET",
                    success: (data) => {
                        console.log("checkLine _checkFastResUrl success", fullUrl, (Date.now() - startTick) / 1000);
                        if (!cbok) {
                            cbok = true;
                            console.log("checkLine _checkFastResUrl ===选取的资源线路cb ==", fullUrl, (Date.now() - startTick) / 1000);
                            cb(url);
                            resolve();
                        }
                    },
                    fail: (status) => {
                        if (status === 200) {
                            if (!cbok) {
                                cbok = true;
                                console.log("checkLine _checkFastResUrl ===选取的资源线路cb ==", fullUrl, (Date.now() - startTick) / 1000);
                                cb(url);
                                resolve();
                            }
                            return;
                        }
                        console.warn(`checkLine _checkFastResUrl fail url: ${fullUrl} ${status} ${(Date.now() - startTick) / 1000}`);
                        resolve();
                    }
                });
            });
        };
        resPrex = resPrex || "speedtest.ceb";
        let ps = [];
        for (let domain of domains) {
            try {
                let dUrl = new URL(domain);
                // 如果已经排除的域名则跳过选线
                if (excludeResDomains.includes(dUrl.origin)) continue;

                ps.push(testOne(domain, resPrex));
            } catch {}
        }
        Promise.all(ps).then(() => {
            if (!cbok) {
                console.log("checkLine _checkFastResUrl ===备用选取的资源线路cb ==");
                let randomUrl = domains[Math.floor(Math.random() * domains.length)];
                cb(randomUrl);
            } else {
                cb();
            }
        });
        return p;
    }

    function testOneWebJSONP(fullUrl) {
        return new Promise((resolve, reject) => {
            let startTick = Date.now();

            var JSONP = document.createElement("script");
            JSONP.type = "text/javascript";
            JSONP.async = true;
            JSONP.src = fullUrl;
            JSONP.onload = () => {
                console.log("checkLine _checkFastWebUrl_JS success", fullUrl, (Date.now() - startTick) / 1000);

                document.getElementsByTagName("head")[0].removeChild(JSONP);
                resolve(true);
            };
            JSONP.onerror = (e) => {
                console.error(`checkLine _checkFastWebUrl_JS fail url: ${fullUrl}`, (Date.now() - startTick) / 1000);
                document.getElementsByTagName("head")[0].removeChild(JSONP);
                resolve(false);
            };
            document.getElementsByTagName("head")[0].appendChild(JSONP);
        });
    }
    /**
     * 资源节点选线路
     * @param {*} domains 
     */
    async function _checkFastWebUrl_JS(domains, resPrex) {
        window["version_callback"] = function() {};
        if (window.location.host.startsWith("192.168")) {
            return Promise.resolve(window.location.origin);
        }
        if (window.location.host !== "localhost") {
            // 本地域名则直接返回
            let curFullUrl = urlJoin(window.location.origin, context.$env.baseUrl, resPrex);
            let testOK = await testOneWebJSONP(curFullUrl);
            if (testOK) {
                console.log("checkLine _checkFastWebUrl_JS ===优先使用当前Web域名 ==", window.location.origin);
                return Promise.resolve(window.location.origin);
            }
        }
        if (context.$env.isPreprod && context.$env.webUrls.length > 0) {
            return Promise.resolve(context.$env.webUrls[0]);
        }
        console.log("checkLine _checkFastWebUrl_JS ===开始选取的Web资源线路 ==", domains);
        let cb;
        let p = new Promise(resolve => cb = resolve);
        let cbok = false;
        let testOne = async(url, prex) => {
            return new Promise((resolve) => {
                let fullUrl = urlJoin(url, context.$env.baseUrl, prex);
                testOneWebJSONP(fullUrl).then(ok => {
                    if (ok) {
                        if (!cbok) {
                            cbok = true;
                            console.log("checkLine _checkFastWebUrl_JS ===选取的Web资源线路cb ==", fullUrl);
                            cb(url);
                        }
                    }
                    resolve();
                });
            });
        };
        Promise.all(domains.map(x => testOne(x, resPrex))).then(() => {
            console.log("checkLine _checkFastWebUrl_JS all then call cb");
            if (!cbok) {
                cbok = true;
                console.log("checkLine _checkFastWebUrl_JS ===备用选取的Web资源线路cb ==");
                let randomUrl = domains[Math.floor(Math.random() * domains.length)];
                cb(randomUrl);
            } else {
                cb();
            }
        });
        return p;
    }

    /**
     * api 选线路
     */
    async function _checkFastApiUrl(domains) {
        if (apiBaseUrl) return Promise.resolve(apiBaseUrl);
        if (context.$env.isTest()) {
            let url = domains[0];
            console.log("checkLine _checkFastApiUrl ===选取的测试API线路 ==", url);
            return Promise.resolve(url);
        } else if (context.$env.isDev()) {
            let url = domains[0];
            console.log("checkLine _checkFastApiUrl ===选取的开发API线路 ==", url);
            return Promise.resolve(url);
        } else if (context.$env.isPreprod) {
            let url = domains[0];
            console.log("checkLine _checkFastApiUrl ===选取的预发布API线路 ==", url);
            return Promise.resolve(url);
        } else {
            const axios = context.$axios;
            let cb;
            let p = new Promise(resolve => cb = resolve);
            let cbok = false;
            let testOne = async(url, prex) => {
                let startTick = Date.now();
                try {
                    let fullUrl = urlJoin(url, prex);
                    let ret = await axios.get(fullUrl);
                    if (ret.status === 200) {
                        if (!cbok) {
                            cbok = true;
                            console.log("checkLine _checkFastApiUrl ===选取的线路cb ==", url, (Date.now() - startTick) / 1000);
                            cb(url);
                        }
                    }
                } catch (e) {
                    console.error("checkLine _checkFastApiUrl", e, "url:", url, (Date.now() - startTick) / 1000);
                }
            };
            let prex = 'speedtest';
            let baseUrls = domains;
            let ps = [];
            for (let apiBaseUrl of baseUrls) {
                if (!apiBaseUrl) continue;
                if (!String(apiBaseUrl).includes(apiPrefix)) {
                    apiBaseUrl = urlJoin(apiBaseUrl, apiPrefix);
                }
                ps.push(testOne(apiBaseUrl, prex));
            }
            Promise.all(ps).then(() => {
                if (!cbok) {
                    console.log("checkLine _checkFastApiUrl ===备用选取的线路cb ==");
                    let randomUrl = domains[Math.floor(Math.random() * domains.length)];
                    cb(randomUrl);
                } else {
                    cb();
                }
            });
            return p;
        }
    }

    function setResBaseUrl(domain) {
        if (domain) {
            console.log("checkLine setResBaseUrl", domain);
            context.$storage.set("resBaseUrl", domain, 24 * 60 * 60);
            resBaseUrl = domain;

            if (context.$serviceWork) {
                context.$serviceWork.updateResCacheRule();
            }
        }
    }

    function clearResBaseUrl() {
        console.log("checkLine clearResBaseUrl");
        context.$storage.remove("resBaseUrl");
        resBaseUrl = undefined;
    }

    function setWebBaseUrl(domain) {
        if (domain) {
            console.log("checkLine setWebBaseUrl", domain);
            context.$storage.set("webBaseUrl", domain, 12 * 60 * 60);
            webBaseUrl = domain;
        }
    }

    function setApiBaseUrl(domain) {
        if (domain) {
            console.log("checkLine setApiBaseUrl", domain);
            if (String(domain).includes(apiPrefix)) {
                apiBaseUrl = domain;
            } else {
                apiBaseUrl = urlJoin(domain, apiPrefix);
            }
            context.$storage.set("apiBaseUrl", apiBaseUrl, 2 * 60 * 60);
        }
    }

    function getApiBaseUrl() {
        if (apiBaseUrl) return apiBaseUrl;
        let baseUrl = context.$storage.getString("apiBaseUrl");
        if (baseUrl) {
            apiBaseUrl = baseUrl;
        }
        return apiBaseUrl || "";
    };

    function getResBaseUrl() {
        if (resBaseUrl) return resBaseUrl;
        let baseUrl = context.$storage.getString("resBaseUrl");
        if (baseUrl) {
            resBaseUrl = baseUrl;
        }
        return resBaseUrl || "";
    }

    function getWebBaseUrl() {
        if (webBaseUrl) return webBaseUrl;
        let baseUrl = context.$storage.getString("webBaseUrl");
        if (baseUrl) {
            webBaseUrl = baseUrl;
        }
        return webBaseUrl || "";
    };

    function init() {
        let url = getResBaseUrl();
        if (url) {
            if (context.$serviceWork) {
                context.$serviceWork.updateResCacheRule();
            }
        }
    }
    inject("checkLine", {
        init,
        checkFastResUrl(resDomains, resUrl = "speedtest.ceb") {
            return new Promise(async(resolve) => {
                let url = getResBaseUrl();
                if (url) return resolve(url);

                url = await _checkFastResUrl(resDomains.slice(0, resDomains.length > 8 ? 8 : resDomains.length), resUrl);
                console.log("checkLine checkFastResUrl", url);
                if (url) setResBaseUrl(url);
                return resolve(resBaseUrl);
            });
        },
        checkFastWebUrl(webDomains) {
            return new Promise(async(resolve) => {
                let url = getWebBaseUrl();
                if (url) return resolve(url);

                url = await _checkFastWebUrl_JS(webDomains.slice(0, webDomains.length > 8 ? 8 : webDomains.length), "version.js");
                console.log("checkLine checkFastWebUrl", url);
                if (url) setWebBaseUrl(url);
                return resolve(webBaseUrl);
            });
        },
        checkFastApiUrl(apiUrls) {
            return new Promise(async(resolve) => {
                let url = getApiBaseUrl();
                if (url) return resolve(url);

                if (!apiUrls || apiUrls.length === 0) {
                    apiUrls = context.$env.apiUrls;
                }
                url = await _checkFastApiUrl(apiUrls);
                console.log("checkLine checkFastApiUrl", url);
                if (url) setApiBaseUrl(url);
                return resolve(apiBaseUrl);
            });
        },
        getApiBaseUrl,
        getResBaseUrl,
        getWebBaseUrl,
        setResBaseUrl,
        clearResBaseUrl,
        addExcludeResDomains(resUrl) {
            if (!resUrl) return;
            let url = new URL(resUrl);
            if (!excludeResDomains.includes(url.origin)) {
                excludeResDomains.push(url.origin);
            }
        }
    });

};