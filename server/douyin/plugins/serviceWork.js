import { urlJoin } from "~/assets/js/utils";

export default (context, inject) => {
    if (!('serviceWorker' in navigator)) {
        console.log('Your browser does not support the serviceWorker!');
        return;
    }
    if (window._cordovaNative) {
        return;
    }
    console.log("plugin serviceWork loaded");

    async function installSW(version) {
        if (!('serviceWorker' in navigator)) {
            console.log('Your browser does not support the serviceWorker!');
            return;
        }
        function emitUpdate() {
            var event = document.createEvent('Event');
            event.initEvent('sw.update', true, true);
            window.dispatchEvent(event);
        }
        const newSwVersionUrl = `sw.js?v=${version}`;
        navigator.serviceWorker.register(newSwVersionUrl).then((reg) => {
            console.log("serviceWorker init reg", newSwVersionUrl);

            if (reg.waiting) {
                emitUpdate();
                return;
            }

            reg.onupdatefound = function () {
                console.log("serviceWorker onupdatefound", newSwVersionUrl);
                var installingWorker = reg.installing;
                if (installingWorker) {
                    installingWorker.onstatechange = function () {
                        switch (installingWorker.state) {
                            case 'installed':
                                console.log("serviceWorker onupdatefound installed", newSwVersionUrl, installingWorker.state);
                                if (navigator.serviceWorker.controller) {
                                    emitUpdate();
                                }
                                break;
                        }
                    };
                }
            };
        }).catch(e => {
            console.log("serviceWorker init reg error", newSwVersionUrl, e.message);
        });
    }

    async function uninstallSW(version) {
        if (!('serviceWorker' in navigator)) {
            console.log('Your browser does not support the serviceWorker!');
            return;
        }
        const workbox = await window.$workbox;
        if (workbox) {
            workbox.addEventListener("installed", (event) => {
                console.log("serviceWorker installed", event);
                if (event.isUpdate) {
                    console.log("serviceWorker isUpdate installed isUpdate", event.isUpdate);
                }
            });
        }

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log(`serviceWorker unregister controllerchange ${uswUrl}`);
            if (refreshing) {
                return;
            }
            refreshing = true;
            if (window.$nuxt) {
                window.$nuxt.$dialog.alert({
                    title: '????????????',
                    message: '???????????????????????????,?????????????????????????????????',
                }).then(() => {
                    window.location.replace(window.location.origin + "?skipUpdate=true&from=" + window.from);
                });
            }
            // window.location.replace(window.location.origin + "?skipUpdate=true&from=" + window.from);
        });
        let uswUrl = `usw.js?v=${version}`;
        try {
            let usw = await navigator.serviceWorker.register(uswUrl);
            console.log(`serviceWorker unregister ${uswUrl}`, usw);
        } catch (e) {
            console.log(`serviceWorker unregister error ${uswUrl}`);
        }
    }

    async function manualUpdateSW() {
        let hasOldVersion = false;
        let newVersion = context.$version.getServerWebVersion();
        if (!hasOldVersion && (navigator.serviceWorker)) {
            let sws = await navigator.serviceWorker.getRegistrations();
            for (const sw of sws) {
                if (!sw.active.scriptURL.endsWith(`sw.js?v=${newVersion}`)) {
                    hasOldVersion = true;
                }
            }
        }
        if (hasOldVersion) {
            // window.$nuxt.$toast.loading({
            //     duration: 0, // ???????????? toast
            //     forbidClick: true,
            //     message: '??????????????????, ??????????????????',
            // });
            console.log("check uninstallSW data", newVersion);
            await uninstallSW(newVersion);
        }
        // checkAndUpdateSW();

        // let second = 5;
        // const timer = setInterval(() => {
        //     second--;
        //     if (second) {
        //         toast.message = `${second} ??????????????????`;
        //     } else {
        //         clearInterval(timer);
        //         // ???????????? Toast
        //         window.$nuxt.$toast.clear();
        //         window.location = window.location.orgin;
        //     }
        // }, 1000);
        return true;
    }

    function updateResCacheRule() {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                name: "registerRoute",
                options: {
                    runtimeCaching: [
                        {
                            urlPattern: urlJoin(context.$checkLine.getResBaseUrl(), "web/*"),
                            handler: "CacheFirst",
                            strategyOptions: {
                                cacheName: "workbox-img"
                            }
                        },
                        {
                            urlPattern: urlJoin(context.$checkLine.getResBaseUrl(), "speedtest.*"),
                            handler: "NetworkOnly",
                            strategyOptions: {
                                cacheName: "workbox-img"
                            }
                        },
                        {
                            urlPattern: urlJoin(context.$checkLine.getResBaseUrl(), "short-01/*"),
                            handler: "CacheFirst",
                            strategyOptions: {
                                cacheName: "workbox-media"
                            }
                        }
                    ]
                },
            });
        }
    }

    window.addEventListener("load", () => {
        // ??????beforeinstallprompt???????????????window.onload??? ??????mounted??????????????????window.deferredPrompt?????????pwa?????????
        if (!window.deferredPrompt) {
            // ??????beforeinstallprompt???????????????window.onload??? ??????mounted????????????????????????????????????
            window.addEventListener('beforeinstallprompt', (e) => {
                console.log('serviceWorker beforeinstallprompt event', e);
                e.preventDefault();
                window.deferredPrompt = e;
            });

        }
    });

    async function init() {
        if (!('serviceWorker' in navigator)) {
            console.log('Your browser does not support the serviceWorker!');
            return;
        }

        console.log("plugin serviceWork init");
        let curVersion = context.$version.getCurrentWebVersion();
        await installSW(curVersion);
        console.log("plugin serviceWork init ok");
    }
    inject('serviceWork', {
        init,
        manualUpdateSW,
        updateResCacheRule
    });
};