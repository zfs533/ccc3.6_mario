<template>
    <div class="app-view container">
        <div v-show="showDown" class="fbtn safe-top" @click="onClickBtn">
            <van-tag plain round color="#ffffff6f" style="padding: 0 10px;">
                <van-count-down v-if="showDown" v-show="!timeouted" :time="time" format="广告  ss秒" @finish="finish" />
                <div v-if="timeouted" class="van-count-down">进入</div>
            </van-tag>
        </div>
        <div v-show="showDown">
            <div class="picbg" v-if="!loading && (ads && ads.length > 0)">
                <swiper :options="adSwiperOption" class="full-container" :class="ads.length  === 1 ? 'swiper-no-swiping':''">
                    <swiper-slide v-for="(ad, index) in ads" :key="index">
                        <img class="ad-cover" :data-src="ad.coverUrl" :src="ad.base64ImgData" @click="onClickAd(ad.url)" />
                    </swiper-slide>
                </swiper>
            </div>
            <div class="vsion safe-bottom">{{ appVersion }}</div>
            <div class="preload" style="width:0;height:0;overflow:hidden;">
                <div class="img-notice-tips-spr img-notice-tips-spr-1" />
                <div class="img-mybg-spr img-mybg-spr-id-card-button" />
                <div class="img-share-spr img-share-spr-bili" />
                <div class="img-share-video-spr img-share-video-spr-wz2" />
                <div class="img-checkin-spr img-checkin-spr-wz4" />
            </div>
        </div>
        <div v-if="initError !== ''" class="error-tip">
            <van-empty image="network" :description="initError">
                <van-button round type="danger" class="error-button" @click="onClickRetry">重试</van-button>
            </van-empty>
        </div>
    </div>
</template>
<script>  
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: 'launchView',
    mixins: [pageMixin],
    data() {
        return {
            time: 5 * 1000,
            timeouted: false,
            loading: true,
            base64ImgData: "",
            adUrl: "",
            ads: [],
            pushed: false,
            showDown: false,
            isCheckLineOk: false,
            appVersion: this.$env.version,
            initAppData: false,
            initError: "",
            adSwiperOption: {
                loop: false,
                autoplay: false,
            }
        };
    },
    created() {
        console.log("launch created");
        document.documentElement.classList.remove("safe-top");
        document.documentElement.classList.remove("safe-bottom");

        console.log("launch created end");
    },
    async mounted() {
        console.log("launch mounted");

        //如果存在缓存ad 则优先使用并进行显示
        let adda = this.$main.adManager.getAllAD();
        if (adda.enterApp && adda.enterApp.length > 0) {
            let resBaseUrl = this.$checkLine.getResBaseUrl();
            if (resBaseUrl) {
                await this.showEnterAppAd();
                if (this.showDown) {
                    this.hideLoading();
                }
            }
        }
        let cacheApiDomains = [];
        let cacheDomainData = undefined;
        if (cacheDomainData) {
            cacheApiDomains = cacheDomainData.apiDomains;
        }

        let url = await this.$checkLine.checkFastApiUrl(cacheApiDomains);
        if (!url) {
            this.showDown = false;
            this.initError = "网络错误, 接口线路数据出错，请重试！";
            // this.$toast(this.initError);
            this.hideLoading();
            return;
        }
        console.log("launch ===选取的API线路==", url);
        let domainData;
        if (cacheDomainData) {
            domainData = cacheDomainData;
        } else {
            let domainRet = await this.$api.getDomains();
            if (domainRet.errorCode !== 0) {
                if (!cacheDomainData) {
                    this.showDown = false;
                    this.initError = '获取线路失败: ' + domainRet.message;
                    // this.$toast(this.initError);
                    this.hideLoading();
                    return;
                }
                domainData = cacheDomainData;
            } else {
                domainData = domainRet.data;
                this.$storage.set("domains", domainData, 2 * 60 * 60);
            }
        }
        let { apiDomains, webDomains, resDomains, downloadUrl, officialContactUrl, officialDownloadUrl } = domainData;

        if (apiDomains && apiDomains.length > 0) {
            this.$storage.set("apiDomains", apiDomains);
        }

        let fWebDomain = await this.$checkLine.checkFastWebUrl(webDomains);
        if (!fWebDomain) {
            this.showDown = false;
            this.initError = "网络错误, Web线路数据出错，请重试！";
            // this.$toast(this.initError);
            this.hideLoading();
            return;
        }
        console.log("launch ===选取资源线路==", fWebDomain);
        if (officialContactUrl) {
            this.$storage.set("officialContactUrl", officialContactUrl);
        }
        if (officialDownloadUrl) {
            this.$storage.set("officialDownloadUrl", officialDownloadUrl);
        }

        // 初始化版本
        console.log("launch ===版本管理初始化==");
        let versionok = await this.$version.init();
        if (!versionok) {
            this.showDown = false;
            this.initError = "网络错误, 版本数据出错，请重试！";
            // this.$toast(this.initError);
            this.hideLoading();
            return;
        }

        console.log("launch ===初始化统计==");
        this.isCheckLineOk = true;

        this.authAndInit();
    },
    methods: {
        hideLoading() {
            if (!this.loading) return;
            this.loading = false;
            let appLoading = document.querySelector('.appLoading');
            if (appLoading) {
                appLoading.style.display = "none";
                appLoading.remove();
            };
        },
        async authAndInit() {
            if (!this.isCheckLineOk) {
                setTimeout(this.authAndLoadAd, 100);
                return;
            }

            if (!this.$userStore.isLogin()) {
                this.$userStore.setToken("");

                // 仅仅安卓允许匿名用户
                if (this.$env.options.autoRegister || this.$cordova) {
                    let deviceUUID = this.$cordova ? this.$cordova.getDeviceUUID() : "";
                    await this.$api.signin({
                        // login:"xxx",//  用户名 
                        verifyType: "anonymous",
                        uuid: deviceUUID,
                        channel: this.$channel.getChannel(),
                        inviteCode: this.$channel.getPromoteCode()
                    }, true);
                }
            }
            // 检测web资源版本
            console.log("launch ===检测web资源版本==");
            let hasNewWeb = await this.$version.checkWebVersion();
            if (hasNewWeb) {
                console.log("launch ===检测到新版本==");
                // const toast = window.$nuxt.$toast.loading({
                //     duration: 0, // 持续展示 toast
                //     forbidClick: true,
                //     message: '检测到新版，正在进行更新',
                // });
                if (!Boolean(this.$route.query.skipUpdate)) {
                    this.$version.updateWeb().then(ok => {
                        if (!ok) {
                            console.log("launch updateWeb faild");
                        }
                    });
                }
                // window.$nuxt.$toast.clear();
            } else {
                if (this.$serviceWork) {
                    await this.$serviceWork.init();
                }

                console.log("launch ===检测APP版本==");
                if (!Boolean(this.$route.query.skipUpdate)) {
                    // 检测APK版本
                    let hasNewApk = await this.$version.checkApkVersion();
                    if (hasNewApk) {
                        console.log("launch ===进入版本更新==");
                        this.hideLoading();
                        this.$router.replace({
                            path: "/update",
                        });
                        return;
                    }
                }
            }

            this.$main.adManager.setShowAds(false);

            console.log("launch preload data");
            this.$main.initData((async (ok) => {
                console.log("launch main init ", ok);
                if (!ok) {
                    // this.$toast(this.initError);
                    this.hideLoading();
                    return;
                }
                this.initAppData = true;
                this.$ga.init();
                this.$main.preCache();
                this.showEnterAppAd(true).then(() => {
                    this.hideLoading();

                    if (this.showDown === false) {
                        this.goHome();
                        return;
                    }
                    if (this.timeouted) {
                        this.goHome();
                        return;
                    }
                });
            }));
        },
        async showEnterAppAd(bAsyncLoadImg = false) {
            if (this.showDown) return;
            let adda = this.$main.adManager.getAllAD();

            if (adda.enterApp && adda.enterApp.length > 0) {
                console.log("start page ad enterApp ", adda.enterApp.length);

                this.ads = [];
                let loadAds = [];
                for (let i = 0; i < adda.enterApp.length; i++) {
                    let item = adda.enterApp[i];
                    console.warn("start page ad start dowloadFile: ", item.coverUrl);
                    if (bAsyncLoadImg) {
                        loadAds.push(new Promise((resolve) => {
                            console.warn("start page ad start dowloadFile: ", item.coverUrl);
                            this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                                if (!data) {
                                    console.warn("start page ad dowloadFile error: ", url);
                                } else {
                                    item.coverUrl = url;
                                    item.base64ImgData = data;
                                    this.ads.push(item);
                                    console.log("start page ad dowloadFile :", url);
                                }
                                resolve();
                            });
                        }));
                    } else {
                        let { url, data } = await this.$fileloader.dowloadPngImg(item.coverUrl, 640);
                        if (!data) {
                            console.warn("start page ad dowloadFile error: ", url);
                        } else {
                            item.coverUrl = url;
                            item.base64ImgData = data;
                            this.ads.push(item);
                            console.log("start page ad dowloadFile :", url);
                        }
                    }
                }
                if (bAsyncLoadImg) {
                    await Promise.all(loadAds);
                }
                console.log("start page ad load ok", this.ads);
                if (this.ads.length > 0) {
                    if (this.ads.length > 1) {
                        this.adSwiperOption.loop = false;
                        this.adSwiperOption.autoplay = true;
                    }
                    this.showDown = true;
                    console.log("start page ad load showDown", this.showDown, this.time);
                }
            }
        },
        onClickAd(adurl) {
            window.open(adurl);
        },
        finish() {
            this.timeouted = true;
            if (this.showDown && !this.pushed && this.initAppData) {
                console.log("launch finish go home", this.showDown);
                this.goHome();
            }
        },
        onClickBtn() {
            if (this.initAppData && this.timeouted) {
                console.log("launch click go home");
                this.goHome();
            }
        },
        goHome() {
            if (this.$env.options && this.$env.options.homePage && this.$env.options.homePage.launch) {
                this.$router.replace({
                    path: this.$env.options.homePage.launch,
                });
            } else {
                this.$router.replace({
                    path: "/home",
                });
            }
            this.pushed = true;
        },
        onClickRetry() {
            this.$main.initAppModuleData().then(async (ok) => {
                console.log("launch onClickRetry initAppModuleData init ", ok);
                if (!ok) {
                    this.showDown = false;
                    this.initError = "网络错误, 初始化数据出错，请重试！";
                    // this.$toast(this.initError);
                    this.hideLoading();
                    return;
                }
                window.location.replace(window.location.origin);
            });
        }
    },
}
</script>

<style lang="less" scoped>
.fbtn {
    position: fixed;
    width: 100%;
    text-align: right;
    margin-top: 10px;
    padding-right: 0.5rem;
    color: @text-color;
    font-size: 0.35rem;
    z-index: 10;
}
.vsion {
    position: fixed;
    width: 100%;
    text-align: right;
    padding-right: 0.5rem;
    color: @text-color;
    font-size: 0.35rem;
    bottom: 10px;
    z-index: 10;
}
.container {
    height: 100%;
    width: 100%;
    display: flex;
}

.title {
    font-family: Quicksand, "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
.picbg {
    width: 100%;
    height: 100%;

    .ad-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.error-tip {
    margin: 80px auto;
}
.error_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.error-button {
    width: 160px;
    height: 40px;
}
</style>
