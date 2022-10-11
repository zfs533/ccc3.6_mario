<template>
    <div class="my-history flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickBack" title="观影记录" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
            <btn-list-box :callBack="onClcikBVideoTypeBt" />
        </div>
        <div class="historyTabBox content">
            <div class="scroll-container">
                <list-box ref="videoList" :waterfall="true" :showAvatar="true" loading-text="努力加载中..." @load="getVideoHistory" @clear="onVideoListClear" />
            </div>
        </div>
    </div>
</template>

<script>

import { pageMixin } from "~/assets/js/mixins";
import btnListBox from "~/components/btnListBox.vue";
import ImgItem from "~/components/imgitem";

export default {
    name: "historyList",
    layout: "keepalive",
    components: { btnListBox, ImgItem },
    mixins: [pageMixin],
    data() {
        return {
            tabIndex: 0,
            bPage: 1, // 页码

            bVideoType: 1,
            pageSize: 20,
        };
    },

    asyncData() { },
    created() {
        console.log("history created");
    },
    mounted() {
        console.log("history mounted");
        this.$parent.showTabbar = false;
        this.$nextTick(() => {
            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });
    },
    activated() {
        console.log("history activated");
        this.$parent.showTabbar = false;
        this.$nextTick(() => {
            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });
    },
    methods: {
        onVideoListClear() {
            this.bPage = 1;
        },
        onClickTab(index) { },
        async getVideoHistory() {

            let pa = {
                timeType: this.bVideoType,
                page: this.bPage,
                pageSize: this.pageSize,
            };
            let res = await this.$api.getVideoHistory(pa);
            this.bPage = this.bPage + 1;
            this.$nextTick(() => {
                if (!this.$refs.videoList) {
                    return;
                }
                if (res.errorCode !== 0) {
                    this.$refs.videoList.finished();
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                let xdata = res.data;
                if (xdata && xdata.length > 0) {
                    if (this.$refs.videoList) {
                        this.$refs.videoList.concatData(xdata);
                    }

                    if (xdata.length < this.pageSize) {
                        this.$refs.videoList.finished();
                    }
                } else if (xdata && xdata.length == 0) {
                    this.$refs.videoList.finished();
                }
            });
        },
        onClickBack() {
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                }
            });
            this.$router.back();
        },
        onClcikBVideoTypeBt(videoType) {
            this.bVideoType = +videoType + 1;
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.historyTabBox {
    padding: 0.2rem 10px 0 10px;
}
.historyTabBox .van-sticky {
    display: flex;
    justify-content: center;
}

.historyTabBox .van-tabs__wrap {
    width: 50%;
}

.historyTabBox .van-tab {
    font-size: 0.4rem;
}

.historyTabBox .van-tabs__line {
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
.pageTitle {
    color: @text-color;
    font-size: 0.4rem;
    padding: 0 0 0 0.2rem;
}
</style>
