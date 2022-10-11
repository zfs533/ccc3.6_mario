<template>
    <div class="filter flex-container">
        <div class="sortHead top">
            <van-nav-bar title="所有分类" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            </van-nav-bar>
            <div class="filter-cond">
                <div class="chooseBox">
                    <van-row>
                        <van-col v-for="(type, index) in allType1" :key="index" :class="{ boxActive: index == choose0 }" @click="onClickType(0, index)">{{ type }}</van-col>
                    </van-row>
                    <van-row>
                        <van-col v-for="(type, index) in allType3" :key="index" :class="{ boxActive: index == choose2 }" @click="onClickType(2, index)">{{ type }}</van-col>
                    </van-row>
                    <van-row>
                        <van-col v-for="(type, index) in allType4" :key="index" :class="{ boxActive: index == choose3 }" @click="onClickType(3, index)">{{ type }}</van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="f-c">
                <div class="left">
                    <van-sidebar v-model="tagActiveKey" class="scroll-container" @change="onClickType1">
                        <van-sidebar-item class="tag-item" :title="type.name" v-for="(type, index) in allType2" :key="index" />
                    </van-sidebar>
                </div>
                <div class="content">
                    <div class="videosBox scroll-container" v-if="boxShow">
                        <list-box ref="videoList" :waterfall="true" loading-text="努力加载中..." @load="loadFillterVideo" @clear="onVideoListClear" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
import { pageMixin } from "~/assets/js/mixins";

import ImgItem from "~/components/imgitem";

export default {
    components: { ImgItem },
    name: "filterPage",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            boxShow: true,
            tagActiveKey: 0,
            allType1: ["排序", "播放最多", "收藏最多", "最新上架"],
            allType2: [
                {
                    id: "default",
                    name: "全部标签",
                },
            ],
            allType3: ["长短", "长视频", "短视频"],
            allType4: ["类型", "免费", "VIP", "钻石"],
            choose0: 0,
            choose1: 0,
            choose2: 0,
            choose3: 0,
            curVideoPage: 1,
            mpageSize: 20,
            curChoosed: "排序·标签·长短·付费",
            curscrollTop1: 0,
            curscrollTop2: 0,
        };
    },
    created() {
        console.log("filter created");
    },
    mounted() {
        console.log("filter mounted");
        this.$parent.showTabbar = false;
        this.initTags();
    },
    async activated() {
        console.log("filter activated");
        this.$parent.showTabbar = false;
        // this.initTags();
        this.$nextTick(() => {
            if (this.$route.params.type) {
                this.onClickType(3, 3);
            }
            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });
    },
    deactivated() {

    },
    methods: {
        onVideoListClear() {
            this.curVideoPage = 1;
        },

        initTags() {
            if (this.allType2.length < 2) {
                let allTags = this.$main.getFillterAllTags();
                if (allTags.length === 0) {
                    return;
                }
                let tmp = [
                    {
                        id: "default",
                        name: "全部标签",
                    },
                ];
                this.allType2 = tmp.concat(allTags);
            }
        },
        onClickLeft() {

            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                }
            });
            this.$router.back();
        },
        async loadFillterVideo(auto) {
            // if (this.curVideoPage === 1 && auto) return;
            console.log("loadFillterVideo", this.curVideoPage);
            let po = {
                pid: this.$env.pid,
                compositeCategory: this.choose0 + 1,
                videoTimeType: this.choose2 + 1,
                chargeType: this.choose3 + 1,
                tagId: this.allType2[this.choose1].id,
                page: this.curVideoPage,
                pageSize: this.mpageSize,
            };
            this.$api.getFillterVideo(po).then((res) => {
                if (res.errorCode !== 0) {
                    this.$toast("加载数据出错：" + res.message);
                    return;
                }
                let tdata = res.data.videos;
                this.curVideoPage++;
                this.$nextTick(() => {
                    if (!this.$refs.videoList) {
                        return;
                    }
                    if (tdata && tdata.length > 0) {
                        this.$refs.videoList.concatData(tdata);
                        if (tdata.length < this.mpageSize) {
                            this.$refs.videoList.finished();
                        }

                    } else if (tdata && tdata.length == 0) {
                        this.$refs.videoList.finished();
                    } else if (!tdata || tdata.error) {
                        this.$refs.videoList.finished();
                    }
                });
            });
        },
        onClickRight() {
            this.$router.push({
                path: "/search",
            });
        },
        onClickType1(index) {
            this.onClickType(1, index);
        },
        onClickType(bigType, smallType) {
            if (bigType === 0) {
                this.choose0 = smallType;
            } else if (bigType === 1) {
                this.choose1 = smallType;
            } else if (bigType === 2) {
                this.choose2 = smallType;
            } else if (bigType === 3) {
                this.choose3 = smallType;
            }

            this.curVideoPage = 1;
            this.curChoosed =
                this.allType1[this.choose0] +
                "·" +
                this.allType2[this.choose1].name +
                // "·" +
                // this.allType3[this.choose2] +
                "·" +
                this.allType4[this.choose3];

            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });

        },
    },
};
</script>
<style lang="less" scoped>
.f-c {
    display: flex;
    height: 100%;
    > .left {
        height: 100%;
    }

    > .content {
        flex: 1;
        height: 100%;
        width: 0px;
    }
    > .right {
        width: 0px;
    }
}

.tag-item {
    line-height: 16px;
    background-color: @theme-color;
    color: @text-color;
    padding: 15px 10px;

    > div {
        word-break: keep-all;
    }
}

.videosBox {
    width: 95%;
    margin: 2px 2.5%;
    background-color: @theme-color;
}
.sortBox {
    height: 100vh;
    width: 100%;
}
.sortHead {
    align-items: unset !important;
    width: 100%;
}
.filter-cond {
    color: @text-color;
    font-size: 0.35rem;

    .van-row {
        overflow-x: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        margin-bottom: 0.4rem;
    }

    .van-row .van-col {
        padding: 0 0.3rem;
        color: @theme-color2;
        font-size: 0.4rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
    }
    .van-row .boxActive {
        padding: 0.06rem 0.3rem;
        background: @active-color;
        color: @filter-font-color1;
    }
}

.chooseBox {
    padding: 0.1rem 0.1rem;
}
::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
.videoItemBox {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.tbcak {
    height: 0.6rem;
}
</style>