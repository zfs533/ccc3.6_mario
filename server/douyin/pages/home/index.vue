<template>
    <section class="homePage flex-container" @dragstart.prevent>
        <!-- <div class="flex-safe-top"></div> -->
        <div ref="header" class="top toptabbox">
            <div class="mhead">
                <van-notice-bar @click="onClickSearch" class="mheadCenter" left-icon="search" :scrollable="false">
                    <van-swipe width='auto' vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                        <van-swipe-item v-for="(value, idx) in hotWords" :key="idx">{{value}}</van-swipe-item>
                    </van-swipe>
                </van-notice-bar>
                <nuxt-link :to="'/filter?from=' + $route.path" class="home-top-btn">
                    <van-icon name="filter-o" size="16" />
                </nuxt-link>
                <nuxt-link v-if="checkInActive" :to="'/checkin'" class="home-top-btn ">
                    <div class="img-checkin-spr img-checkin-spr-qiandaox1 img-checkin-custom" v-if="!isCheckInToDay">
                    </div>
                    <div class="img-checkin-spr img-checkin-spr-qiandaox2 img-checkin-custom1" v-if="isCheckInToDay">
                    </div>
                    <div class="checkin-red-point1">
                        <div class="checkin-red-point" v-if="!isCheckInToDay">
                        </div>
                    </div>
                </nuxt-link>
                <a v-if="canAddToHome" class="home-top-btn" @click="onAddToHomeClick">
                    <van-icon name="miniprogram-o" />
                </a>
            </div>
            <van-tabs ref="myTabsTitle" style="width:100%;margin-bottom:10px" :stop-propagation="false" v-model="curTabIndex" @click="onClickTab">
                <van-tab :key="0" :title="'关注'">
                </van-tab>
                <van-tab v-for="(topCategor, index) in homeCategories" :key="index + 1" :title="topCategor.name">
                </van-tab>
            </van-tabs>
            <div class="notice">
                <van-notice-bar class="notice-bg" v-if="sysNotice" style="border-radius:15px" left-icon="volume-o" :text="sysNotice" mode="closeable" />
            </div>
        </div>
        <div class="content" style="margin-top:5px">
            <swiper ref="mySwiper" class="mySwiper full-container" :options="swiperOption" @slideChange="onChange">
                <swiper-slide :key="0" class="swiper-view">
                    <my-follow-view ref="myFollowView" :videoTimeType="2" />
                </swiper-slide>
                <swiper-slide v-for="(topCategor, idx) in homeCategories" :key="idx + 1" class="swiper-view">
                    <div v-if="( curTabIndex - idx > -1 && curTabIndex - idx < 3)" class="scroll-container">
                        <van-pull-refresh v-model="topCategor.pLoading" @refresh="()=>{ onRefresh(topCategor)}" style="min-height:100%">
                            <div class="adSwipebox" v-if="categoryTopAds.length > 0">
                                <swiper class="my-swipe" :options="adSwiperOption" style="width: 95%; height: 95%;">
                                    <swiper-slide v-for="(ad, index) in categoryTopAds" :key="index">
                                        <van-image @click="onClickAd(ad.url)" fit=" cover" radius="0.3rem" :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width: 100%; height: 100%; max-height: 50vw">
                                            <template v-slot:error>
                                            </template>
                                            <template v-slot:loading>
                                            </template>
                                        </van-image>
                                    </swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                            </div>
                            <van-list v-model="topCategor.loading" loading-text=" " :finished="topCategor.finished" finished-text="已经到我的底线啦" @load="onLoadModuleData(topCategor)">
                                <div v-for="(data, index1) in topCategor.childCategories" :key="index1">
                                    <box-item :itemMsg="data" />
                                    <div class="mAd" v-if="(index1 + 1) % 4 == 0 && index1 != 0 && getMidAd(index1)">
                                        <div class="bannerAd">
                                            <van-image fit="cover" :data-src="getMidAd(index1).coverUrl" :src="getMidAd(index1).base64ImgData" style="width: 100%; height: 100%" @click="onClickAd(getMidAd(index1).url)">
                                                <template v-slot:error>
                                                </template>
                                                <template v-slot:loading>
                                                </template>
                                            </van-image>
                                        </div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="floatAd" v-if="floatAd">
            <!-- <div class="floatAd" v-if="floatAd" :style="{'background-image': 'url(' + floatAd.base64ImgData + ')'}" @click="onClickAd(floatAd.url)"> -->
            <van-image @click="onClickAd(floatAd.url)" fit=" cover" radius="0.3rem" :data-src="floatAd.coverUrl" :src="floatAd.base64ImgData" style="width: 100%; height: 100%; max-height: 50vw">
                <template v-slot:error>
                </template>
                <template v-slot:loading>
                </template>

                <div class="fontDiv" v-if="floatAd.countdown && floatAd.countdown > 0">
                    {{ formatSecond(floatAd.countdown) }}
                </div>
            </van-image>

            <!-- <img> -->
        </div>
    </section>
</template>

<script> 
import { AppResImgCodes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import BoxItem from "~/components/boxitem";
import MyFollowView from "~/components/home/myFollowView.vue";


import * as utils from "~/assets/js/utils";


export default {
    name: "home",
    layout: "keepalive",
    components: { BoxItem, MyFollowView },
    mixins: [pageMixin],
    data() {
        return {
            canAddToHome: false,
            sysNotice: "",
            homeCategories: [],
            curTabIndex: 1,
            videoCnt: 0,

            hotWords: ['美女', '巨乳', '奶子', '帅哥'],
            defaultPageSize: 5,
            categoryTopAds: [],
            categoryMidAds: [],
            randomMidAd: undefined,
            showDialog: true,
            swiperOption: {
                speed: 200,
                // autoHeight: true
            },
            adSwiperOption: {
                // loop: true,
                watchOverflow: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            },
            isCheckInToDay: false,
            checkInActive: false,

            floatAd: {},
        };
    },
    beforeCreate() {
        if (window.go) {
            if (window.go.path !== '/home') {
                this.$router.push({
                    path: window.go.path,
                    query: window.go.query,
                });
            }
            window.go = undefined;
        }
    },
    async created() {
        console.log("home index created");
        this.$parent.initTheme(AppResImgCodes.homePageBg);
        this.$nuxt.$on('timeInterval', this.onTimeInterval);

        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.add("safe-bottom");

        this.sysNotice = this.$main.getSysNotice();
        let homeCategories = this.$main.getMainData();
        if (homeCategories) {
            homeCategories.forEach((el, index) => {
                if (el.name === "关注") return;
                this.homeCategories.push({
                    mapIndex: index,
                    id: el.id,
                    name: el.name,
                    childCategories: [],
                    page: 1,
                    pageSize: this.defaultPageSize,
                    loading: false,
                    finished: false,
                    pLoading: false,
                });
            });
        }
        this.videoCnt = this.$main.getAllVideoCount();

        this.hotWords = this.$main.getHotSearchWords();

    },

    async mounted() {
        console.log("home index created");

        this.$parent.showTabbar = true;

        if (window.deferredPrompt) {
            window.addEventListener('appinstalled', (event) => {
                console.log('serviceWorker appinstalled', event);
                // 清除 deferredPrompt，以便将其收集起来
                window.deferredPrompt = null;
                this.canAddToHome = false;
            });

            window.$nuxt.$dialog.confirm({
                theme: "round",
                message: '将应用安装到桌面',
                confirmButtonText: "立即安装",
                cancelButtonText: "下次再说"
            }).then(this.onAddToHomeClick).catch(() => {
                // 下次安装
                this.canAddToHome = true;
            });
        }

        let checkInCfg = this.$main.getCheckinActivityData();
        if (checkInCfg) {
            this.checkInActive = true;
            this.isCheckInToDay = this.$userStore.getTodayCheckIn();
        }
    },
    async activated() {
        console.log("home index activated");
        this.$parent.showTabbar = true;
        this.$parent.initTheme(AppResImgCodes.homePageBg);

        this.$nextTick(() => {
            if (this.$refs.mySwiper) {
                this.$refs.mySwiper.$swiper.slideTo(this.curTabIndex, 0);
            }
        });

        this.isCheckInToDay = this.$userStore.getTodayCheckIn();

        let allAd = await this.$main.adManager.getAllAD();
        this.categoryTopAds = await Promise.all(allAd.categoryTop.map(x => this.adsItem(x)));

        this.floatAd = null;
        if (allAd.floatAd.length > 0) {
            this.floatAd = allAd.floatAd[0];
            let curTime = new Date();
            this.floatAd.countdown = 0;
            if (this.floatAd.limitTime) {
                let time = new Date(this.floatAd.limitTime);
                this.floatAd.countdown = (time - curTime) / 1000;
            }
            this.$fileloader.dowloadPngImg(this.floatAd.coverUrl, 240, (url, data) => {
                if (!data) {
                    console.warn("categoryMidAds dowloadFile error: ", url);
                    return;
                }
                this.floatAd.coverUrl = url;
                this.floatAd.base64ImgData = data;
            });
        }

        this.categoryMidAds = [];
        for (let i = 0; i < allAd.categoryMid.length; i++) {
            let item = allAd.categoryMid[i];
            this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                if (!data) {
                    console.warn("categoryMidAds dowloadFile error: ", url);
                    return;
                }
                item.coverUrl = url;
                item.base64ImgData = data;
                this.categoryMidAds.push(item);

            });
        }

    },
    methods: {
        formatSecond(time) {
            return utils.formatSecondsToDay(time);
        },
        onTimeInterval(time) {

            if (this.floatAd) {
                this.floatAd.countdown = this.floatAd.countdown - time / 1000;
                this.$forceUpdate();
            }

        },
        async onAddToHomeClick() {
            const promptEvent = window.deferredPrompt;
            if (!promptEvent) {
                // 延迟提示不存在。
                return;
            }
            // 显示安装提示。
            promptEvent.prompt();

            const result = await promptEvent.userChoice;
            console.log('serviceWorker userChoice', result);
            if (result.outcome === "dismissed") {
                // 拒绝安装
                this.canAddToHome = true;
            }
        },
        async onRefresh(topCategor) {
            topCategor.page = 0;
            topCategor.loading = true;
            topCategor.finished = false;
            topCategor.pLoading = true;
            await this.onLoadModuleData(topCategor);

            this.$toast('刷新成功');
            topCategor.loading = false;
            topCategor.pLoading = false;
        },
        adsItem(item) {
            return new Promise((resolve, reject) => {
                this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                    if (!data) {
                        console.warn("categoryTopAds dowloadFile error: ", url);
                        return;
                    }
                    item.coverUrl = url;
                    item.base64ImgData = data;

                    resolve(item);
                });
            });
        },
        onClickAd(url) {
            window.open(url);
        },
        onClickSearch() {
            this.$router.push({
                path: "/search",
                query: {
                    from: this.$route.path
                }
            });
        },
        onChange() {
            setTimeout(() => {
                this.$nextTick(() => {
                    if (this.$refs.mySwiper) {
                        this.curTabIndex = this.$refs.mySwiper.$swiper.activeIndex;
                    }
                    if (this.curTabIndex === 0) {
                        if (!this.$userStore.checkLogin()) {
                            return;
                        }

                        // 关注
                        this.$refs.myFollowView.check();
                    }
                });

                if (this.categoryMidAds && this.categoryMidAds.length > 0) {
                    this.randomMidAd = this.categoryMidAds[Math.floor(Math.random() * this.categoryMidAds.length)];
                }
            }, 10);
        },
        async onClickTab(index, title) {
            console.log("home index onClickTab", index, title);

            let cate = this.homeCategories[index - 1];
            if (cate) {
                if (cate.childCategories.length > 0) { }
            }
            this.curTabIndex = index;
            this.$nextTick(() => {
                if (this.$refs.mySwiper) {
                    this.$refs.mySwiper.$swiper.slideTo(index);
                }
            });
        },
        async onLoadModuleData(topCategor) {
            console.log("home index onLoadModuleData", topCategor.id, topCategor.name);

            let curPageData = [];
            if (topCategor.page == 1) {
                console.log("home index onLoadModuleData firstPage", topCategor.name);
                let topCategories = this.$main.getMainData();
                if (topCategories) {
                    curPageData = topCategories[topCategor.mapIndex].childCategories || [];
                }
            }
            if (topCategor.page == 0) {
                topCategor.childCategories = [];
                topCategor.page = 1;

            }
            // 如果没有预存的第一页，则从第一页加载
            if (curPageData.length === 0) {
                let paramdata = {
                    pid: this.$env.pid,
                    page: topCategor.page,
                    pageSize: topCategor.pageSize,
                    hasTop: false
                };

                let res = await this.$api.getFristCategoriesData(topCategor.id, paramdata);
                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                console.log("home index onLoadModuleData api", topCategor.id, topCategor.name, paramdata, res.data);
                curPageData = res.data.childCategories || [];
            }
            if (curPageData && curPageData.length > 0) {
                topCategor.childCategories = topCategor.childCategories.concat(
                    curPageData
                );
            }
            console.log("home index onLoadModuleData", topCategor.id, topCategor.name, topCategor.page, curPageData.length);
            if (curPageData && curPageData.length > 0) {
                if (curPageData.length < topCategor.pageSize) {
                    topCategor.finished = true;
                }
            } else if (curPageData && curPageData.length == 0) {
                topCategor.finished = true;
            } else if (!curPageData || curPageData.error) {
                topCategor.finished = true;
            }
            topCategor.loading = false;
            topCategor.page = topCategor.page + 1;
        },

        getMidAd(index) {
            index = Math.floor(index / 4);

            if (!this.categoryMidAds) {
                return {};
            }
            if (index > this.categoryMidAds.length - 1) {
                index = index % this.categoryMidAds.length;
            }
            return this.categoryMidAds[index];
        }
    },


    beforeDestroy() { },
};
</script>

<style lang="less" scoped>
.homePage {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    z-index: 1;

    .mhead {
        padding: 0.2rem 0.3rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        .van-icon {
            color: @home-bg-color9;
        }
        .van-notice-bar {
            color: @common-inputText-color1;
        }
    }

    .notice {
        width: 95%;
        margin: 0px 2.5%;
        .van-notice-bar {
            color: @home-bg-color3;
        }
    }
}

// .mySwiper {
//     background-color: @theme-color;
// }

.flex-safe-top {
    height: var(--safe-top);
    position: fixed;
    width: 100%;
    background: @theme-color;
    top: 0;
}

// @supports (top: env(safe-area-inset-top)) {
//     .headerBox {
//         padding-top: env(safe-area-inset-top);
//     }
// }
.notice-swipe {
    height: 40px;
    line-height: 40px;
    .van-swipe-item {
        text-align: left;
    }
}

.van-icon {
    color: @home-bg-color9;
}

.mheadCenter {
    background: @common-inputBG-color1;
    height: 0.8rem;
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* width: 60%; */
    margin-left: 0.13rem;
    margin-right: 0.13rem;
    flex: 1;
    cursor: pointer;
}

.searchbox {
    width: 17rem;
    height: 2rem;
    color: darkgray;
}
.notice-bg {
    background-color: @home-bg-color2;
}

.home-top-btn {
    margin: 0 7px;
    width: 0.8rem;
    height: 0.8rem;
    background-image: @home-bg-color1;
    font-size: 0.7rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: @home-bg-color9 !important;
    border-radius: 4rem;
}
// .van-notice-bar {
//     color: @common-inputText-color1 !important;
// }
.checkin-red-point1 {
    margin-left: -3px;
    margin-top: -8px;
    width: 7px;
    height: 7px;
    border-radius: 5px;
}
.checkin-red-point {
    margin-top: -2px;
    width: 7px;
    height: 7px;
    border-radius: 5px;
    background-color: #f00;
}

.checkin-font {
    font-size: 10px;
    color: #ffca7e;
}

.adSwipebox {
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.mAd {
    border-bottom: 10px solid #00000021;
}

.bannerAd {
    height: 30vw;
    width: 95vw;
    margin: 8px auto;
}

.imgBox {
    margin: 0 auto;
    display: block;
    position: relative;
    margin-bottom: 0.8rem;
    /* box-sizing: border-box; */
    width: 100%;
}
.img-checkin-custom {
    margin-left: 4px;
    width: 17px;
    height: 17px;
    background-size: calc(17 / 34 * 674px) calc(17 / 34 * 416px);
    background-position: calc(17 / 34 * -576px) calc(17 / 34 * -317px);
}
.img-checkin-custom1 {
    margin-left: 4px;
    width: 17px;
    height: 17px;
    background-size: calc(17 / 34 * 674px) calc(17 / 34 * 416px);
    background-position: calc(17 / 34 * -614px) calc(17 / 34 * -317px);
}

.floatAd {
    position: absolute;
    bottom: 20px;
    right: 10px;
    z-index: 99;
    max-width: 85px;

    color: #ff0000;

    .fontDiv {
        z-index: 99;
        margin-top: -18px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        background-size: contain;
        align-items: flex-end;
        justify-content: center;
    }
}
</style>
