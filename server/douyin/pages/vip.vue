<template>
    <section class="flex-container" @dragstart.prevent>
        <!-- <div class="flex-safe-top"></div> -->
        <div class="vip-img">
            <img src="~/assets/img/vip.png" alt="" />
        </div>
        <div class="top viptabbox">
            <van-tabs :shrink="true" :border="true" :stop-propagation="false" v-model="curTabIndex" @click="onClickTab">
                <van-tab class="vipvantab" v-for="(topCategor, index) in vipCategories" :key="index" :title="topCategor.name">
                </van-tab>
            </van-tabs>
        </div>
        <div class="content mt-10">
            <swiper ref="mySwiper" class="mySwiper full-container" :options="swiperOption" @slideChange="onChange">
                <swiper-slide v-for="(topCategor, idx) in vipCategories" :key="idx " class="swiper-view">
                    <div class="scroll-container">
                        <van-pull-refresh v-model="topCategor.pLoading" @refresh="()=>{ onRefresh(topCategor)}" style="min-height:100%">
                            <div class="vipSwipe" v-if="ads && ads.length > 0">
                                <swiper class="my-swipe" :options="adSwiperOption" style="width: 95%; ">
                                    <swiper-slide v-for="(ad, index) in ads" :key="index">
                                        <img :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width:100%;height:100%" @click="onClickAd(ad.url)" />
                                    </swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                            </div>
                            <div class="info">
                                <div v-if="idx ==0" class="wraper">
                                    <div class="userinfo">
                                        <div class="left">
                                            <div style="width:1rem;height:1rem;">
                                                <usericon :imgUrl="user.avatarURL" />
                                            </div>
                                            <div class="mainInfo">
                                                <div class="name">{{user.username}}</div>
                                                <div v-if="user.vipLevel == 0" class="text">您当前未开通抖荫VIP</div>
                                            </div>
                                            <!-- <div class="unLogin">
                              暂未登录
                          </div> -->
                                        </div>
                                        <div class="btn" v-if="user.vip == 4">
                                            永久VIP
                                        </div>
                                        <div v-else class="btn" @click="onClickUpVip">
                                            VIP升级
                                        </div>
                                    </div>
                                </div>
                                <div v-if="idx == 1" class="wraper">
                                    <div class="userinfo">
                                        <div class="left">
                                            <div class="unLogin">
                                                钻石余额:{{user.diamond}}
                                            </div>
                                        </div>
                                        <div class="btn" @click="onClickBuyDiomo">
                                            购买钻石
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <van-list v-model="topCategor.loading" :finished="topCategor.finished" finished-text="已经到我的底线啦" @load="onLoadModuleData(topCategor)">
                                <div v-for="(data, index1) in topCategor.childCategories" :key="index1">
                                    <box-item :itemMsg="data" />
                                    <div class="mAd">
                                        <div class="bannerAd" v-if="index1 % 2 == 0 && index1 != 0 && randomMidAd">
                                            <van-image fit="cover" :data-src="randomMidAd.coverUrl" :src="randomMidAd.base64ImgData" style="width: 100%; height: 100%" @click="onClickAd(randomMidAd.url)">
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

    </section>
</template>

<script> 
import { AppResImgCodes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import BoxItem from "~/components/boxitem";
import Usericon from '~/components/usericon.vue';

export default {
    name: "vip",
    layout: "keepalive",
    components: { BoxItem, Usericon },
    mixins: [pageMixin],
    data() {
        return {
            vipCategories: [],
            curTabIndex: 0,
            defaultPageSize: 5,
            categoryMidAds: [],
            randomMidAd: undefined,
            swiperOption: {
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
            ads: [],

            user: {},
            diamond: 0,
        };
    },
    async created() {
        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.add("safe-bottom");

        this.$parent.initTheme(AppResImgCodes.vipPageBg);

        this.user = this.$userStore.getMyInfo();
        this.$nuxt.$on("login", () => {
            this.user = this.$userStore.getMyInfo();
        });

        let vipCategories = this.$main.getVipData();
        if (vipCategories) {
            vipCategories.forEach((el, index) => {
                if (el.name === "关注") return;
                this.vipCategories.push({
                    mapIndex: index,
                    id: el.id,
                    name: el.name,
                    childCategories: [],
                    page: 1,
                    pageSize: this.defaultPageSize,
                    loading: false,
                    finished: false,
                    pLoading: false
                });
            });
        }

        let allAd = await this.$main.adManager.getAllAD();

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
        if (allAd.vip && allAd.vip.length > 0) {
            for (let i = 0; i < allAd.vip.length; i++) {
                let item = allAd.vip[i];
                this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                    if (!data) {
                        console.warn("vip page ad dowloadFile error: ", url);
                        return;
                    }
                    item.coverUrl = url;
                    item.base64ImgData = data;
                    this.ads.push(item);
                });
            }
        }

    },

    async mounted() {
        this.$parent.showTabbar = true;
    },
    activated() {
        this.$refs.mySwiper.$swiper.slideTo(this.curTabIndex, 0);
        this.$parent.showTabbar = true;
        this.$parent.initTheme(AppResImgCodes.vipPageBg);
    },
    methods: {
        onClickUpVip() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            // 点击升级vip
            this.$router.push({
                path: "/recharge?type=vip"
            });
        },
        onClickBuyDiomo() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            // 点击购买钻石
            this.$router.push({
                path: "/recharge?type=diamond"
            });
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
        onClickAd(url) {
            window.open(url);
        },
        onChange() {
            this.$nextTick(() => {
                if (this.$refs.mySwiper) {
                    this.curTabIndex = this.$refs.mySwiper.$swiper.activeIndex;
                }
            });
        },
        async onClickTab(index, title) {

            if (this.categoryMidAds && this.categoryMidAds.length > 0) {
                this.randomMidAd = this.categoryMidAds[Math.floor(Math.random() * this.categoryMidAds.length)];
            }

            let cate = this.vipCategories[index - 1];
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

            let curPageData = [];
            if (topCategor.page == 1) {
                let topCategories = this.$main.getVipData();
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
                curPageData = res.data.childCategories || [];
            }
            if (curPageData && curPageData.length > 0) {
                topCategor.childCategories = topCategor.childCategories.concat(
                    curPageData
                );
            }
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
    },


    beforeDestroy() { },
};
</script>

<style lang="less" scoped>
.flex-safe-top {
    height: var(--safe-top);
    position: fixed;
    width: 100%;
    background: @theme-color;
    top: 0;
}
.viptabbox {
    padding-left: 8px;
    padding-right: 8px;
}
.vipvantab {
    z-index: 1000;
    color: @active-color;
}

.mAd {
    border-bottom: 10px solid #00000021;
}

.bannerAd {
    height: 30vw;
    width: 90vw;
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
.vip-img {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    transform: scale(0.5);
}

.info {
    width: 100%;
    padding: 10px;

    .wraper {
        width: 100%;
        background: @vip-bg-color1;
        padding: 0.4rem;
        border-radius: 7px;
    }
    .wraper .userinfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .wraper .userinfo .left {
        display: flex;
        align-items: center;
    }
    .wraper .userinfo .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 0.8rem;
        border-radius: 0.5rem;
        color: @common-btnText-color1;
        font-size: 0.35rem;
        background: @common-btnBG-color1;
    }

    .wraper .userinfo .left .unLogin {
        font-size: 0.5rem;
        color: @active-color;
    }
}
.mainInfo .name {
    font-size: 0.34rem;
    color: @theme-color2;
}
.mainInfo .text {
    font-size: 0.28rem;
    color: @vip-font-color1;
    margin-top: 0.08rem;
}
.mainInfo {
    margin-left: 0.2rem;
}
</style>