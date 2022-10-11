<template>
    <div class="collectTop flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickBack" title="收藏与解锁" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <div class="collectTabBox content">
            <div class="scroll-container">
                <van-tabs v-model="tabIndex" class="mvantabs" @click="onClickTab" sticky background="@theme-color">
                    <van-tab class="mvantab" title="收藏">
                        <btn-list-box :callBack="onClcikCVideoTypeBt" />
                        <div class="scroll-container">
                            <list-box ref="videoListA" :waterfall="true" loading-text="努力加载中..." @load="getMyCollectVideos" @clear="onVideoListClearA" />
                        </div>
                    </van-tab>
                    <van-tab class="mvantab" title="已购">
                        <btn-list-box :callBack="onClcikBVideoTypeBt" />
                        <div class="scroll-container">
                            <list-box ref="videoListB" :waterfall="true" loading-text="努力加载中..." @load="getPageMyBuyVideos" @clear="onVideoListClearB" />
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>

import { pageMixin } from "~/assets/js/mixins";
import btnListBox from "~/components/btnListBox.vue";
import ImgItem from "~/components/imgitem";

export default {
    name: "collectList",
    layout: "keepalive",
    components: { btnListBox, ImgItem },
    mixins: [pageMixin],
    data() {
        return {
            tabIndex: 0,
            cPage: 1, // 收藏的页码
            bPage: 1, // 购买的页码

            cVideoType: 1,
            bVideoType: 1,
            pageSize: 20,
        };
    },
    created() {
        console.log("collect created");
    },
    mounted() {
        console.log("collect mounted");
        this.$parent.showTabbar = false;
        if (this.$route.query.type === "buy") {
            this.tabIndex = 1;
        }
        this.$nextTick(() => {
            if (this.$refs.videoListA) {
                this.$refs.videoListA.clearData();
                this.$refs.videoListA.check();
            }
            if (this.$refs.videoListB) {
                this.$refs.videoListB.clearData();
                this.$refs.videoListB.check();
            }
        });
    },
    activated() {
        console.log("collect activated");
        this.$parent.showTabbar = false;
        this.$nextTick(() => {
            if (this.$refs.videoListA && !this.$refs.videoListA.hasItem()) {
                this.$refs.videoListA.clearData();
                this.$refs.videoListA.check();
            }
            if (this.$refs.videoListB && !this.$refs.videoListB.hasItem()) {
                this.$refs.videoListB.clearData();
                this.$refs.videoListB.check();
            }
        });
    },
    methods: {
        onVideoListClearA() {
            this.cPage = 1;
        },
        onVideoListClearB() {
            this.bPage = 1;
        },
        onClickTab(index) {
            this.$nextTick(() => {
                if (index === 1) {
                    if (this.$refs.videoListB && !this.$refs.videoListB.hasItem()) {
                        this.$refs.videoListB.clearData();
                        this.$refs.videoListB.check();
                    }
                } else {
                    if (this.$refs.videoListA && !this.$refs.videoListA.hasItem()) {
                        this.$refs.videoListA.clearData();
                        this.$refs.videoListA.check();
                    }
                }
            });

        },
        async getPageMyBuyVideos() {
            let pa = {
                timeType: this.bVideoType,
                page: this.bPage,
                pageSize: this.pageSize,
            };
            let res = await this.$api.getMyBuyVideos(pa);
            this.bPage++;
            this.$nextTick(() => {
                if (!this.$refs.videoListB) {
                    return;
                }
                if (res.errorCode !== 0) {
                    this.$refs.videoListB.finished();
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                let xdata = res.data;
                if (xdata && xdata.length > 0) {
                    this.$refs.videoListB.concatData(xdata);
                    if (xdata.length < this.pageSize) {
                        this.$refs.videoListB.finished();
                    }
                } else if (xdata && xdata.length == 0) {
                    this.$refs.videoListB.finished();
                }
            });
        },
        async getMyCollectVideos() {
            let pa = {
                timeType: this.cVideoType,
                page: this.cPage,
                pageSize: this.pageSize,
            };
            let res = await this.$api.getMyCollectVideos(pa);
            this.cPage++;

            this.$nextTick(() => {
                if (!this.$refs.videoListA) {
                    return;
                }
                if (res.errorCode !== 0) {
                    this.$refs.videoListA.finished();
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                let xdata = res.data.videoList;
                if (xdata && xdata.length > 0) {
                    this.$refs.videoListA.concatData(xdata);
                    if (xdata.length < this.pageSize) {
                        this.$refs.videoListA.finished();
                    }
                } else if (xdata && xdata.length == 0) {
                    this.$refs.videoListA.finished();
                }
            });
        },
        onClickBack() {
            this.$nextTick(() => {
                if (this.$refs.videoListA) {
                    this.$refs.videoListA.clearData();
                }
                if (this.$refs.videoListB) {
                    this.$refs.videoListB.clearData();
                }
            });
            this.$router.back();
        },
        onClcikCVideoTypeBt(videoType) {
            this.cVideoType = +videoType + 1;
            this.$nextTick(() => {
                if (this.$refs.videoListA) {
                    this.$refs.videoListA.clearData();
                    this.$refs.videoListA.check();
                };
            });
        },
        onClcikBVideoTypeBt(videoType) {
            this.bVideoType = +videoType + 1;

            this.$nextTick(() => {
                if (this.$refs.videoListB) {
                    this.$refs.videoListB.clearData();
                    this.$refs.videoListB.check();
                };
            });
        },
    },
};
</script>

<style lang="less" scoped>
.collectTabBox .van-sticky {
    display: flex;
    justify-content: center;
}

.collectTabBox .van-tabs__wrap {
    width: 50%;
}

.collectTabBox .van-tab {
    font-size: 0.4rem;
}

.collectTabBox .van-tabs__line {
    background-color: rgb(30, 65, 255);
    width: 0.4rem;
    transform: translateX(38px) translateX(-50%);
    height: 0.05rem;
    border-radius: 0.03rem;
    transition-duration: 0.3s;
}

.mvantab {
    padding: 0 10px;
    align-items: center;
}
</style>
