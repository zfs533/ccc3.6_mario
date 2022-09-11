<template>
    <!-- <player ref="player" :tabbar="true" /> -->
    <div class="shortIndex flex-container" :class="activeClass">
        <div class="flex-safe-top"></div>
        <div class="topBar">

            <van-tabs v-model="activeTab" @rendered="rendered" line-width="0" @change="onTabChange">
                <van-tab :key="0" title="关注" title-class="tabItem">
                </van-tab>
                <van-tab :key="1" title="推荐" title-class="tabItem">
                </van-tab>
            </van-tabs>
            <div class="findTR" @click="onClickSearch">
                <van-icon name="search" size="25" />
            </div>
        </div>
        <div class="top top-container"></div>
        <div class="content">
            <swiper ref="shortSwiper" class="shortSwiper full-container" :options="swiperOption" @slideChange="onSwiperChange">
                <swiper-slide :key="0" class="swiper-view">
                    <my-follow-view ref="follow" :videoTimeType="3" />
                </swiper-slide>
                <swiper-slide :key="1" class="swiper-view">
                    <player ref="shortPlayer" :tabbar="true" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script> 
import { pageMixin } from "~/assets/js/mixins";
import MyFollowView from "~/components/home/myFollowView.vue";
import player from './player.vue';
export default {
    name: 'short',
    layout: 'keepalive',
    components: {
        player, MyFollowView
    },
    mixins: [pageMixin],
    data() {
        return {
            activeTab: 1,
            swiperOption: {
                speed: 200,
                initialSlide: 1
                // autoHeight: true
            },
            topHeight: 0,
            activeClass: ""
        };
    },
    created() {
        console.log("short index created");
    },
    mounted() {
        console.log("short index mounted");
        this.$parent.showTabbar = true;
        document.documentElement.classList.add("safe-bottom");
        document.documentElement.classList.remove("safe-top");

        // this.$refs.player.updateHeight();
    },
    activated() {
        console.log("short index activated");
        this.$parent.showTabbar = true;


        document.documentElement.classList.remove("safe-top");
        document.documentElement.classList.add("short-view");
        this.$nextTick(() => {
            if (this.$refs.shortPlayer) {
                this.$refs.shortPlayer.updateHeight();
            }
        });
    },
    deactivated() {
        console.log("short index deactivated");

        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.remove("short-view");
    },
    methods: {
        rendered() {
            this.$refs.shortPlayer.updateHeight();
        },
        onClickSearch() {
            this.$router.push({
                path: "/search"
            });
        },
        onTabChange(index) {
            this.$nextTick(() => {
                if (this.$refs.shortSwiper) {
                    this.$refs.shortSwiper.$swiper.slideTo(index);
                }

            });
        },
        onSwiperChange() {
            setTimeout(() => {
                this.$nextTick(() => {
                    if (!this.$refs.shortSwiper) {
                        return;
                    }
                    let index = this.$refs.shortSwiper.$swiper.activeIndex;
                    this.activeTab = index;
                    if (index == 0) {
                        this.activeClass = "followView";
                        if (this.$refs.shortPlayer) {
                            this.$refs.shortPlayer.pauseAllVideo();
                        }

                        if (!this.$userStore.checkLogin()) {
                            return;
                        }
                        if (this.$refs.follow) {
                            this.$refs.follow.check();
                        }
                    }
                    else {
                        this.activeClass = "videoView";
                        this.$refs.shortPlayer.playActiveVideo();
                    }
                });
            }, 10);
        }
    }
}
</script>
<style lang="less">
.shortIndex {
    // background: #000;
    .topBar {
        position: fixed;
        top: var(--safe-top);
        width: 100%;
        height: 44px;
        z-index: 100;
        .van-tabs {
            width: 160px;
            margin: 0 auto;
            height: 100%;
            background: transparent;
        }
        .van-tab {
            font-size: 0.45rem !important;
        }
        .van-tab--active {
            font-weight: 700;
            font-size: 0.5rem !important;
        }
        .van-tabs__nav {
            background: transparent;
        }
        .findTR {
            color: @text-color;
            font-size: 0.35rem;
            cursor: pointer;
            padding: 0 10px;
            position: absolute;
            top: 8px;
            right: 10px;
            z-index: 1002;
        }
    }
    .flex-safe-top {
        height: var(--safe-top);
        position: fixed;
        width: 100%;
        // background: #000;
        top: 0;
    }
    &.followView {
        // .topBar {
        //     background: #000;
        // }
        .top-container {
            height: calc(44px + var(--safe-top));
        }
        // .flex-safe-top {
        //     background: #000;
        // }
    }
    &.videoView {
        .topBar {
            background: transparent;
        }
        .top-container {
            height: 0;
        }
        .flex-safe-top {
            background: transparent;
        }
    }
}
</style>