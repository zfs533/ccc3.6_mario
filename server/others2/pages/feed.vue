<template>
    <section class="feed flex-container" @dragstart.prevent>
        <div ref="header" class="top toptabbox">
            <van-nav-bar style="width: 100%;" :placeholder="true">
                <template #left>
                    <div class="findTR" @click="onClickSearch">
                        <van-icon name="search" size="25" />
                    </div>
                </template>
                <template #title>
                    <van-tabs :stop-propagation="false" v-model="curTopTabIndex" class="top-tabbar" @click="onClickTopTab">
                        <van-tab :key="0" :title="'关注'">
                        </van-tab>
                        <van-tab v-for="(topCategor, topIndex) in homeCategories" :key="topIndex + 1" :title="topCategor.name">
                        </van-tab>
                    </van-tabs>
                </template>
                <template #right>
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
                </template>
            </van-nav-bar>
        </div>
        <div class="content" style="margin-top:5px">
            <swiper :ref="'topSwiper'" class="full-container" :options="swiperOption" @slideChange="onTopSwiperChange">
                <swiper-slide :key="0" class="swiper-view">
                    <my-follow-v-iew-big :videoTimeType="2" />
                </swiper-slide>
                <swiper-slide v-for="(topCategor, topIdx) in homeCategories" :key="(topIdx + 1)" class="swiper-view flex-container">
                    <div class="top">
                        <van-tabs v-if='topCategor.childCategories && topCategor.childCategories.length > 0' :stop-propagation="false" v-model="topCategor.childActiveTabIndex" class="child-tabbar" @click="onClickChildTab">
                            <van-tab v-for="(childCategor, childIndex) in topCategor.childCategories" :key="childIndex" :title="childCategor.name">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="content">
                        <swiper :ref="'childSwiper' + (topIdx + 1)" class="full-container" :options="swiperOption" @slideChange="onChildSwiperChange(topCategor)">
                            <swiper-slide v-for="(childCategor, childIdx) in topCategor.childCategories" :key="childCategor.id + childIdx" class="swiper-view">
                                <div class="scroll-container">
                                    <van-pull-refresh v-model="childCategor.pLoading" @refresh="onRefresh(childCategor)" style="min-height:100%">
                                        <div class="swipebox" v-if="categoryTopAds.length > 0">
                                            <swiper class="my-swipe" :options="adSwiperOption" style="width: 95%; height: 95%;">
                                                <swiper-slide v-for="(ad, adIndex) in categoryTopAds" :key="adIndex">
                                                    <van-image @click="onClickAd(ad.url)" fit=" cover" radius="0.3rem" :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width: 100%; height: 100%; max-height: 50vw">
                                                    </van-image>
                                                </swiper-slide>
                                                <div class="swiper-pagination" slot="pagination"></div>
                                            </swiper>
                                        </div>
                                        <div class="notice">
                                            <van-notice-bar class="notice-bg" v-if="sysNotice" style="border-radius:15px" left-icon="volume-o" :text="sysNotice" mode="closeable" />
                                        </div>
                                        <van-list v-model="childCategor.loading" loading-text=" " :finished="childCategor.finished" finished-text="已经到我的底线啦" @load="onLoadModuleData(childCategor)">
                                            <div class="feed-warp" v-for="(itemData, dIndex) in childCategor.videos" :key="dIndex">
                                                <feed-item :imgData="itemData" />
                                            </div>
                                        </van-list>
                                    </van-pull-refresh>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script> 
import { pageMixin } from "~/assets/js/mixins";
import FeedItem from "~/components/feeditem";
import MyFollowView from "~/components/home/myFollowView.vue";
import MyFollowVIewBig from '~/components/home/myFollowVIewBig.vue';
export default {
    name: "home",
    layout: "keepalive",
    components: { FeedItem, MyFollowView, MyFollowVIewBig },
    mixins: [pageMixin],
    data() {
        return {
            canAddToHome: false,
            sysNotice: "",
            homeCategories: [],
            curTopTabIndex: 1,
            defaultPageSize: 5,
            categoryTopAds: [],
            categoryMidAds: [],
            randomMidAd: undefined,
            swiperOption: {
                speed: 200,
                // autoHeight: true
            },
            adSwiperOption: {
                // loop: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            },
            isCheckInToDay: false,
            checkInActive: false,
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

        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.add("safe-bottom");

        this.sysNotice = this.$main.getSysNotice();
        let homeCategories = this.$main.getMainData();
        if (homeCategories) {
            homeCategories.forEach((topCate, topIndex) => {
                if (topCate.name === "关注") return;
                if (topIndex > 2) return;

                let childCategories = [];
                topCate.childCategories.forEach((childCate, childIndex) => {
                    childCategories.push(
                        {
                            mapIndex: childIndex,
                            id: childCate.id,
                            name: childCate.name,
                            page: 1,
                            videos: [],
                            pageSize: this.defaultPageSize,
                            loading: false,
                            finished: false,
                            pLoading: false,
                        }
                    );
                });

                this.homeCategories.push({
                    mapIndex: topIndex,
                    id: topCate.id,
                    name: topCate.name,
                    childCategories: childCategories,
                    childActiveTabIndex: 0
                });

            });
        }
        let allAd = await this.$main.adManager.getAllAD();
        this.categoryTopAds = await Promise.all(allAd.categoryTop.map(x => this.adsItem(x)));

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
    activated() {
        console.log("home index activated");
        this.$nextTick(() => {
            if (this.$refs.topSwiper) {
                this.$refs.topSwiper.$swiper.slideTo(this.curTopTabIndex, 0);
            }
        });

        this.$parent.showTabbar = true;

        this.isCheckInToDay = this.$userStore.getTodayCheckIn();
    },
    methods: {
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
        async onRefresh(childCategor) {
            childCategor.videos = [];
            childCategor.page = 1;
            childCategor.loading = true;
            childCategor.finished = false;
            childCategor.pLoading = true;
            await this.onLoadModuleData(childCategor);

            this.$toast('刷新成功');
            childCategor.loading = false;
            childCategor.pLoading = false;
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
        onTopSwiperChange() {
            setTimeout(() => {
                this.$nextTick(() => {
                    if (this.$refs.topSwiper) {
                        this.curTopTabIndex = this.$refs.topSwiper.$swiper.activeIndex;
                    }
                });

                // if (this.categoryMidAds && this.categoryMidAds.length > 0) {
                //     this.randomMidAd = this.categoryMidAds[Math.floor(Math.random() * this.categoryMidAds.length)];
                // }
            }, 10);
        },
        onChildSwiperChange(topCategor) {
            this.$nextTick(() => {
                let childSwiperId = 'childSwiper' + this.curTopTabIndex;
                if (this.$refs[childSwiperId]) {
                    let curSwiper = this.$refs[childSwiperId][0];
                    if (!curSwiper) return;
                    topCategor.childActiveTabIndex = curSwiper.$swiper.activeIndex;
                }
            });
        },
        async onClickTopTab(index, title) {
            console.log("home index onClickTopTab", index, title);

            let cate = this.homeCategories[index - 1];
            if (cate) {
                if (cate.childCategories.length > 0) { }
            }
            //this.curTopTabIndex = index;
            this.$nextTick(() => {
                if (this.$refs.topSwiper) {
                    this.$refs.topSwiper.$swiper.slideTo(index);
                }
            });
        },
        async onClickChildTab(index, title) {
            console.log("home index onClickChildTab", index, title);
            // let topCate = this.homeCategories[this.curTopTabIndex];
            // if (topCate) {
            //     if (topCate.childCategories.length > 0) { }
            // }
            //this.homeCategories[this.curTopTabIndex].childActiveTabIndex = index;
            this.$nextTick(() => {
                let childSwiperId = 'childSwiper' + this.curTopTabIndex;
                if (this.$refs[childSwiperId]) {
                    this.$refs[childSwiperId][0].$swiper.slideTo(index);
                }
            });
        },
        async onLoadModuleData(childCategor) {
            console.log("home index onLoadModuleData", childCategor.id, childCategor.name);

            childCategor.loading = true;

            let curPageData = [];
            // 如果没有预存的第一页，则从第一页加载
            let paramdata = {
                timeType: 1,
                compositeSort: 1,
                page: childCategor.page,
                pageSize: this.defaultPageSize,
                inPool: true
            };
            let res = await this.$api.getSecondCategoriesData(childCategor.id, paramdata);
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错: " + res.message);
                childCategor.loading = false;
                return;
            }
            curPageData = res.data.videos;
            if (curPageData && curPageData.length > 0) {
                childCategor.videos = childCategor.videos.concat(curPageData);
            }
            console.log("home index onLoadModuleData", childCategor.id, childCategor.name, childCategor.page, curPageData.length);
            if (curPageData && curPageData.length > 0) {
                if (curPageData.length < childCategor.pageSize) {
                    childCategor.finished = true;
                }
            } else if (curPageData && curPageData.length == 0) {
                childCategor.finished = true;
            } else if (!curPageData || curPageData.error) {
                childCategor.finished = true;
            }
            childCategor.loading = false;
            childCategor.page = childCategor.page + 1;
        }
    },


    beforeDestroy() { },
};
</script>

<style lang="less">
.feed {
    .top-tabbar {
        .van-tab {
            margin: 0 5px;
        }
    }
    .child-tabbar {
        .van-tabs__line {
            display: none;
        }
    }
}
</style>
<style lang="less" scoped>
.feed {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    // position: relative;
    z-index: 1;

    .findTR {
        color: @active-color;
        font-size: 0.35rem;
        cursor: pointer;
        position: absolute;
    }

    .notice {
        width: 95%;
        margin: 5px 2.5%;
        .van-notice-bar {
            color: @home-bg-color3;
        }
    }
}
.notice-bg {
    background-color: @home-bg-color2;
}
.notice-swipe {
    height: 40px;
    line-height: 40px;
    .van-swipe-item {
        text-align: left;
    }
}

.mBody {
    margin-bottom: 8px;
}

.searchbox {
    width: 17rem;
    height: 2rem;
    color: darkgray;
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
    border-radius: 4rem;

    .van-icon {
        color: @home-bg-color9 !important;
    }
}
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
}

.checkin-font {
    font-size: 10px;
    color: @active-color;
}

.swipebox {
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
</style>
