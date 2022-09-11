<template>
    <div class="moduleBox flex-container">
        <div class="top header" :data-src="moduleData.coverUrl">
            <div class="moHeader">
                <van-nav-bar left-arrow @click-left="onClickLeft" class="monar transparent-bg-color">
                    <template #left>
                        <van-icon name="arrow-left" size="28" color="#ffffff" />
                    </template>
                    <template #right>
                        <div alt="" class="search" @click="onClickSearch">
                            <van-icon name="search" size="25" color="#ffffff" />
                        </div>
                        <div alt="" class="filtter" @click="onClickFiltter">
                            <van-icon name="filter-o" size="22" color="#ffffff" />
                        </div>
                    </template>
                </van-nav-bar>
            </div>
            <div class="moMainInfo full-container" :style="{'background-image': 'url(' + moduleBgDefault + ')' }">
                <div class="pos">
                    <div class="title">
                        {{this.moduleData.name}}
                    </div>
                    <div class="des">
                        {{moduleData.instruction}}
                    </div>
                </div>
                <div class="moBodyBtn">
                    <btn-list-box :callBack="onClcikVideoTypeBt" />
                    <van-popover class="mpopover" :offset="offsetNumber" placement="bottom-end" v-model="showPopover" trigger="click" :actions="shortTypes" @select="onSelect" @opened="onOpenSort">
                        <template #reference>
                            <div class="selectTitle">
                                <span class="selectText">{{shortTypes[sortType - 1].text}}</span>
                                <van-icon name="sort" size="16" />
                            </div>
                        </template>
                    </van-popover>
                </div>
            </div>
        </div>
        <div class="moBody content">
            <div class="scroll-container">
                <div class="userVideobox">
                    <list-box ref="videoList" :waterfall="true" loading-text="努力加载中..." @load="onLoadVideoData" @clear="onVideoListClear" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { defaultRes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import btnListBox from '~/components/btnListBox.vue';

export default {
    name: "moduleList",
    layout: "keepalive",
    components: { btnListBox },
    mixins: [pageMixin],
    data() {
        return {
            moduleData: {},
            id: "",
            finished: false,
            curVideoPage: 1,
            mpageSize: 16,
            curTimeType: 1,
            sortType: 1,
            showPopover: false,
            shortTypes: [{ text: '综合', className: 'active-sort' }, { text: '播放最多', className: '' }, { text: '收藏最多', className: '' }, { text: '最新视频', className: '' }],
            moduleBgDefault: defaultRes.moduleBgDefault,
            coverImgBase64: defaultRes.moduleBgDefault,
            offsetNumber: [0, 8],
        };
    },
    created() {
        console.log("moduleList created");
    },
    mounted() {
        console.log("moduleList mounted");
        this.$parent.showTabbar = false;

        if (document.documentElement.clientWidth > 1000) {
            this.offsetNumber = [570, 10];
        }
    },
    activated() {
        console.log("moduleList activated", this.id, this.$route.query.moid);
        this.$parent.showTabbar = false;

        if (this.id !== this.$route.query.moid) {
            this.moduleData = {};
            this.updateCoverImgBase64(defaultRes.moduleBgDefault);
            this.curTimeType = 1;
            this.id = this.$route.query.moid;
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    if (this.$refs.videoList.hasItem()) {
                        this.$refs.videoList.clearData();
                    }
                    if (!this.$refs.videoList.hasItem()) {
                        this.$refs.videoList.check();
                    }
                }
            });
        } else {
            this.updateCoverImgBase64(this.coverImgBase64);
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    if (!this.$refs.videoList.hasItem()) {
                        this.$refs.videoList.check();
                    }
                }
            });
        }
    },
    methods: {
        updateCoverImgBase64(imgBase64) {
            this.coverImgBase64 = imgBase64;
            if (this.$route.name.endsWith("moduleList")) {
                this.$parent.updateDocumentBg(imgBase64);
            }
        },
        onVideoListClear() {
            this.curVideoPage = 1;
        },
        changStyle(parm) {
            if (this.tagData.liked) {
                if (parm == 1) {
                    return 'display: none;';
                } else {
                    return '';
                }
            } else {
                if (parm == 1) {
                    return '';
                } else {
                    return 'display: none;';
                }
            }
        },
        onClcikVideoTypeBt(videoType) {
            this.curTimeType = +videoType + 1;
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onSelect(action) {
            for (let i = 0; i < this.shortTypes.length; i++) {
                const el = this.shortTypes[i];
                if (el.text == action.text) {
                    el.className = 'active-sort';
                    this.sortType = i + 1;
                } else {
                    el.className = '';
                }
            }

            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onOpenSort() {
            document.querySelector(".active-sort").click();
        },
        async onLoadVideoData() {
            console.log("moduleList onLoadVideoData page", this.curVideoPage);

            let res = await this.$api.getSecondCategoriesData(this.id, { timeType: this.curTimeType, compositeSort: this.sortType, page: this.curVideoPage, pageSize: this.mpageSize });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.moduleData = res.data;
            this.$nextTick(() => {
                if (!this.$refs.videoList) {
                    return;
                }
                if (this.moduleData.coverUrl.indexOf("http") == -1) {
                    this.$fileloader.dowloadJpegImg(this.moduleData.coverUrl, 640, (url, data) => {
                        if (data) this.updateCoverImgBase64(data);
                    });
                } else {
                    this.updateCoverImgBase64(this.moduleData.coverUrl);
                }
                let tdata = this.moduleData.videos;
                this.curVideoPage++;
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
        },

        onClickLeft() {
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                };
            });
            this.$router.back();
        },
        onClickSearch() {
            this.$router.push({ path: "/search" });
        },
        onClickFiltter() {
            this.$router.push({ path: "/filter" });
        },
    }
}
</script>
<style lang="less" scoped>
.search {
    width: 0.6rem;
    margin-right: 0.3rem;
}
.tbcak {
    height: 0.6rem;
}
.userVideobox {
    width: 95%;
    margin: 5px auto;
}

.header {
    height: 160px;
    width: 100%;
    background-size: cover;
    .moHeader {
        position: absolute;
        width: 100%;
        z-index: 1000;
    }

    .moMainInfo {
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        .pos {
            position: absolute;
            bottom: 1.2rem;
            padding: 0 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: column;
            width: 100%;

            .title {
                font-size: 0.5rem;
                color: #ffffff;
                font-weight: 700;
            }

            .des {
                margin-top: 0.13rem;
                font-size: 0.3rem;
                color: #808184;
            }
        }
        .moBodyBtn {
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            z-index: 10;
            background-color: @theme-color;
        }
    }
}
.moBody {
    z-index: 10;
    background-color: @theme-color;
}

.mpopover {
    margin-right: 20px;
}

.selectText {
    color: @active-color;
    font-size: 0.4rem;
    padding-right: 0.1rem;
}
.selectTitle {
    display: flex;
    align-items: center;
    .van-icon {
        color: @active-color;
    }
}
.van-popup {
    left: 1203px !important;
}
</style>