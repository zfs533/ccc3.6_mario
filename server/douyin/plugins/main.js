import { AppModuleTypes, AppResImgCodes } from "~/assets/js/constants";
import FastClick from "~/assets/js/fastclick";
import flexible from "~/assets/js/flexible";
import iNoBounce from "~/assets/js/inobounce";

class AdManager {
    context;
    showAds = false;
    adData = {};

    constructor(context) {
        this.context = context;
        this.adData = {
            enterApp: [],
            afterEnterApp: [],
            categoryTop: [],
            categoryMid: [],
            inVideos: [],
            playVideo: [],
            vip: [],
            my: [],
            floatAd: []
        };
        console.log("AdManager init");
    }

    initAds(ads) {
        this.showAds = false;
        this.adData = {
            enterApp: [],
            afterEnterApp: [],
            categoryTop: [],
            categoryMid: [],
            inVideos: [],
            playVideo: [],
            vip: [],
            my: [],
            floatAd: []
        };

        let enterAppAds = ads.filter(x => x.pos == 1);
        if (enterAppAds.length > 0) {
            this.context.$storage.set("enterAppADS", enterAppAds);
        }
        this.setAlllAD(ads);
    }

    initEnterAppAds(enterAppAds) {
        this.adData.enterApp = enterAppAds;
    }

    getAllAD() {
        return this.adData;
    };

    setAlllAD(data) {
        console.log("AdManager setAlllAD");
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            if (el.pos == 1) {
                this.adData.enterApp.push(el);
            } else if (el.pos == 2) {
                this.adData.afterEnterApp.push(el);
            } else if (el.pos == 3) {
                this.adData.categoryTop.push(el);
            } else if (el.pos == 4) {
                this.adData.categoryMid.push(el);
            } else if (el.pos == 5) {
                this.adData.inVideos.push(el);
            } else if (el.pos == 6) {
                this.adData.playVideo.push(el);
            } else if (el.pos == 7) {
                this.adData.vip.push(el);
            } else if (el.pos == 8) {
                this.adData.my.push(el);
            } else if (el.pos == 9) {
                this.adData.floatAd.push(el);
            }
        }
        for (let i = 0; i < this.adData.inVideos.length; i++) {
            let el = this.adData.inVideos[i].coverUrl;
            this.adData.inVideos[i].coverURL = el;
        }
    }

    arrayInsertAd(arr) {
        const adArr = this.adData.inVideos;
        if (!adArr || adArr.length == 0) {
            return arr;
        }
        let tmp = [];
        for (let i = 0; i < arr.length; i++) {
            tmp.push(arr[i]);
            if ((i + 1) % 8 === 0) {
                let ad = adArr.shift();
                tmp.push(ad);
                adArr.push(ad);
            }
        }
        return tmp;
    }

    getInVideoAds() {
        return this.adData.inVideos;
    }

    getShowAds() {
        return this.showAds;
    }
    setShowAds(isShow) {
        this.showAds = isShow;
    }
}

export default function(context, inject) {
    console.log("plugin main loaded");

    window.app = context.app;

    let adManager = new AdManager(context);
    let mainData, topicData, vipData, allVideoCount;
    let shortData;
    let hotSearchData = [];
    let filterAllTag = [];
    let adData;
    let myFollowData;
    let sysNotice;
    let sysAnnouncement;
    let newUserRewardCfgg;
    let checkInn;
    let _shareCfg;
    let _vipLevelInfo;
    let resImgs = {};

    async function checkUserInfo() {
        let userInfo = context.$userStore.getMyInfo();
        if (!(userInfo && userInfo.uid)) {
            // 如果用户不存在
            let token = context.$userStore.getToken();
            if (token) {
                await context.$api.updateMyInfo();
            }
        }
    }
    async function updateModuleInfo() {
        let res = await context.$api.getAppModule({
            pid: context.$env.pid,
            fields: 17,
        });
        if (res.errorCode !== 0) {
            window.$nuxt && window.$nuxt.$toast("数据请求出错：" + res.message);
            return false;
        }
        let moduleData = res.data;

        console.log('update appModuleData ', res.data);

        let {
            ads,
            checkIn,
        } = moduleData;
        adData = ads;
        checkInn = checkIn;
        adManager.initAds(adData);

        if (checkIn) {
            checkInn = checkIn;
            context.$userStore.updateCheckInStatus(checkIn.isCheckInToDay, checkIn.continueDays);
        }

        return true;
    }

    async function initAppModuleData() {
        let userInfo = context.$userStore.getMyInfo();
        let res = await context.$api.getAppModule({
            pid: context.$env.pid,
            fields: [
                AppModuleTypes.homeCategories,
                AppModuleTypes.vipCategories,
                AppModuleTypes.topicCategories,
                AppModuleTypes.avCategories,
                AppModuleTypes.hotSearchWords,
                AppModuleTypes.ads,
                AppModuleTypes.tags,
                AppModuleTypes.newUserRewardCfg,
                AppModuleTypes.shareCfg,
                AppModuleTypes.checkIn,
                AppModuleTypes.videoCnt,
                AppModuleTypes.notice,
                AppModuleTypes.announcement,
                AppModuleTypes.vipCfg,
                AppModuleTypes.resImgs
                // AppModuleTypes.myInfo,
                // AppModuleTypes.myFollow,
                // AppModuleTypes.shorts,
            ].join(',')
        });
        if (res.errorCode !== 0) {
            window.$nuxt && window.$nuxt.$toast("数据请求出错：" + res.message);
            return false;
        }
        let moduleData = res.data;

        console.log('update appModuleData ', res.data);

        let {
            homeCategories,
            topicCategories,
            vipCategories,
            hotSearchWords,
            myFollow,
            shorts,
            tags,
            ads,
            myInfo,
            videoCnt,
            notice,
            announcement,
            checkIn,
            newUserRewardCfg,
            shareCfg,
            vipLevelInfo,
            imgs
        } = moduleData;
        allVideoCount = videoCnt;
        hotSearchData = hotSearchWords;
        mainData = homeCategories;
        vipData = vipCategories;
        topicData = topicCategories;
        shortData = shorts;
        filterAllTag = tags;
        adData = ads;
        myFollowData = myFollow;
        sysNotice = notice;
        newUserRewardCfgg = newUserRewardCfg;
        checkInn = checkIn;
        sysAnnouncement = announcement;
        _shareCfg = shareCfg;
        _vipLevelInfo = vipLevelInfo;
        resImgs = {};
        if (imgs && imgs.length > 0) {
            imgs.forEach((imgInfo) => {
                if (imgInfo) {
                    resImgs[imgInfo.code] = imgInfo;
                }
            });
        }

        if (myInfo) {
            context.$userStore.updateUserInfo(myInfo);
        } else {
            myInfo = userInfo;
        }
        if (checkIn) {
            checkInn = checkIn;
            context.$userStore.updateCheckInStatus(checkIn.isCheckInToDay, checkIn.continueDays);
        }

        adManager.initAds(adData);
        return true;
    }

    //获取签到活动配置
    function getCheckinActivityData() {
        return checkInn;
    }

    //签到，获取新人限时活动配置
    function getLimitedActivityData() {
        return newUserRewardCfgg;
    }

    function getAllVideoCount() {
        return allVideoCount;
    }

    function getMainData() {
        return mainData;
    }

    function getTopicData() {
        return topicData;
    }

    function getVipData() {
        return vipData;
    }

    function getHotSearchWords() {
        return hotSearchData;
    }

    function getFillterAllTags() {
        return filterAllTag;
    }

    function getMyFollowData() {
        return myFollowData;
    }

    function getShortData() {
        return shortData;
    }

    function getSysNotice() {
        return sysNotice;
    }

    function getAnnouncement() {
        return sysAnnouncement;
    }

    function getShareCfg() {
        return _shareCfg;
    }

    function getVipLevelInfo() {
        return _vipLevelInfo;
    }

    function getResImg(code) {
        return resImgs[code];
    }

    function getPageBgResImg(code) {
        return resImgs[code] || resImgs[AppResImgCodes.defaultPageBg];
    }

    function initCacheEnterAppAds() {
        let enterAppADS = context.$storage.getArray("enterAppADS");
        if (enterAppADS.length > 0) {
            adManager.initEnterAppAds(enterAppADS);
        }
    }


    function preCache() {
        {
            for (const code in resImgs) {
                if (resImgs.hasOwnProperty(code)) {
                    const imgInfo = resImgs[code];
                    context.$fileloader.dowloadPngImg(imgInfo.imgUrl, 640, (url, data) => {
                        if (data) {
                            imgInfo.imgUrl = url;
                            imgInfo.base64ImgData = data;
                        }
                    });
                }
            }
        } {
            if (adData && adData.length > 0) {
                for (const ad of adData) {
                    context.$fileloader.dowloadPngImg(ad.coverUrl, 640, (url, data) => {
                        if (data) {
                            ad.coverUrl = url;
                            ad.base64ImgData = data;
                        }
                    });
                }
            }
        } {
            if (mainData && mainData.length > 0) {
                for (let tindex = 0;
                    (tindex < mainData.length && tindex < 2); tindex++) {
                    const topCate = mainData[tindex];
                    if (!topCate.childCategories || topCate.childCategories.length === 0) continue;

                    for (let cindex = 0;
                        (cindex < topCate.childCategories.length && cindex < 2); cindex++) {
                        const childCate = topCate.childCategories[cindex];
                        const firstLarge = childCate.firstLarge || true;
                        for (let index = 0;
                            (index < childCate.videos.length); index++) {
                            const v = childCate.videos[index];
                            context.$fileloader.dowloadJpegImg(v.coverURL, (index === 0 && firstLarge) ? 480 : 240, (url, data) => {
                                if (data) {
                                    v.coverURL = url;
                                    v.base64ImgData = data;
                                }
                            });
                        }
                    }
                }
            }
        } {
            if (topicData && topicData.length > 0) {
                for (let tindex = 0;
                    (tindex < topicData.length && tindex < 2); tindex++) {
                    const topCate = topicData[tindex];
                    if (!topCate.childCategories || topCate.childCategories.length === 0) continue;

                    for (let cindex = 0;
                        (cindex < topCate.childCategories.length && cindex < 4); cindex++) {
                        const childCate = topCate.childCategories[cindex];
                        if (childCate.coverUrl) {
                            context.$fileloader.dowloadJpegImg(childCate.coverUrl, 640, (url, data) => {
                                if (data) {
                                    childCate.coverUrl = url;
                                    childCate.base64ImgData = data;
                                }
                            });
                        }
                    }
                }
            }
        } {
            if (shortData && shortData.length > 0) {
                for (let index = 0;
                    (index < shortData.length && index < 3); index++) {
                    let v = shortData[index];
                    context.$fileloader.dowloadJpegImg(v.video.coverURL, 640, (url, data) => {
                        if (data) {
                            v.coverURL = url;
                            v.base64ImgData = data;
                        }
                    });
                }
            }
        }
    }

    function init() {
        if (window.initing) {
            return false;
        }
        window.initing = true;

        console.log('plugin main safe-area inset.support', context.$env.safeAreaInsets.support);
        console.log('plugin main safe-area inset-top', context.$env.safeAreaInsets.top);
        console.log('plugin main safe-area inset-left', context.$env.safeAreaInsets.left);
        console.log('plugin main safe-area inset-right', context.$env.safeAreaInsets.right);
        console.log('plugin main safe-area inset-bottom', context.$env.safeAreaInsets.bottom);

        console.log('plugin main safe-area  window.screen.height', window.screen.height);
        console.log('plugin main safe-area  document.body.clientHeight', document.body.clientHeight);

        const root = document.documentElement;
        root.style.setProperty('--safe-top', `${context.$env.safeAreaInsets.top}px`);
        root.style.setProperty('--safe-bottom', `${context.$env.safeAreaInsets.bottom}px`);

        let deviceRatio = context.$env.device.ratio();
        console.log('plugin main device ratio', context.$env.device.ratio(), window.screen.height * deviceRatio / 100, window.screen.width * deviceRatio / 100);

        if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
            document.documentElement.style.height = "100%";
        } else {
            // 全面屏
            console.log('plugin main safe-area is fullscreen');
            document.documentElement.style.height = "100vh";
        }
        if (context.$env.device.ios()) {
            iNoBounce.enable();
        }
        if (!context.$env.device.desktop()) {
            FastClick.attach(document.body);
        }
        if (context.$env.device.cordova()) {
            if (window.device.barHeight > 0) {
                root.style.setProperty('--safe-top', `${window.device.barHeight * 100 / deviceRatio}px`);
            }
            // if (window.device.naviHeight > 0) {
            //     root.style.setProperty('--safe-bottom', `${window.device.naviHeight * 100 / deviceRatio}px`);
            // }
        }
        flexible(window, document);

        context.$logger.init();
        context.$checkLine.init();
        context.$fileloader.init();
        // 初始化缓存启动广告
        initCacheEnterAppAds();
    }

    async function initData(callback) {
        if (window.inited) {
            return callback(window.inited);
        }

        await checkUserInfo();

        let lastTime = new Date();
        setInterval(() => {
            let curTime = new Date();
            window.$nuxt.$emit('timeInterval', curTime - lastTime);
            lastTime = curTime;
        }, 1000);


        window.$nuxt.$on('login', () => {
            updateModuleInfo();
        });

        window.inited = await initAppModuleData();
        return callback(window.inited);
    }

    inject("main", {
        init,
        initData,
        initAppModuleData,
        preCache,
        adManager,
        getResImg,
        getPageBgResImg,
        getMainData,
        getTopicData,
        getVipData,
        getSysNotice,
        getAnnouncement,
        getMyFollowData,
        getAllVideoCount,
        getShortData,
        getHotSearchWords,
        getFillterAllTags,
        getCheckinActivityData,
        getLimitedActivityData,
        getShareCfg,
        getVipLevelInfo,
    });
    console.log("plugin main loaded ok");
}