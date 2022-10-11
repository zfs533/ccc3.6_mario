<template>
    <div class="topic-item">
        <div class="imgIn" style="width:100%;">
            <lazy-component class="cover" @show="loadImgData" v-bind:style="{'background-image': 'url(' + videoCoverDefaultIcon + ')'}">
                <transition name="bounce">
                    <div v-show="visibleImg" :coverUrl="coverUrl" :key="coverUrl" class="imgDom" :style="{ 'background-image': 'url(' + base64ImgData + ')' ,'height':scaleImgHeight + 'px'}" @click="onClickImg">
                        <div class="info">
                            <div class="info-item">
                                <van-icon name="eye" size="15" color="#f7f8fa" />
                                <span class="imgfont">
                                    {{ formatNumber2(imgData.viewCnt) }}
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="imgfont">{{ formatNumber2(imgData.videoCnt) }}部</span>
                            </div>
                        </div>
                    </div>
                </transition>
            </lazy-component>
        </div>
        <div v-if="showTitle" class="topic-name">{{ imgData.name }}</div>
    </div>
</template>
<script>
import * as utils from "~/assets/js/utils";
import { defaultRes } from "~/assets/js/constants";

export default {
    name: "TopicItem",
    props: {
        imgData: Object,
        callBack: Function,
        large: Boolean,
        showMode: String,
    },
    data() {
        return {
            mImgData: this.imgData,
            base64ImgData: defaultRes.videoCoverDefaultIcon,
            usericon: defaultRes.userAvatorDefault,
            id: this.imgData.id,
            videoCoverDefaultIcon: defaultRes.videoCoverDefaultIcon,
            coverUrl: this.imgData.coverUrl,
            visibleImg: false,
            scaleImgHeight: 400,
            showTitle: false
        };
    },
    created() {

    },
    mounted() {
    },
    watch: {
        imgData: {
            handler(val) {
                this.loadImgData();
            }
        }
    },
    methods: {
        loadImgData() {
            this.showTitle = false;
            if (this.imgData.props.showTitle) {
                this.showTitle = true;
            }
            if (this.imgData.base64ImgData) {
                if (this.imgData.base64ImgData == '') {
                    this.videoCoverDefaultIcon = defaultRes.videoCoverDefaultIcon;
                } else {
                    this.videoCoverDefaultIcon = '';
                }
                this.$nextTick(() => {
                    this.base64ImgData = this.imgData.base64ImgData;
                    this.coverUrl = this.imgData.coverUrl;
                    this.visibleImg = true;
                    this.scaleImgHeight = 160;
                });
            } else {
                if (this.imgData.coverUrl) {
                    this.$fileloader.dowloadJpegImg(this.imgData.coverUrl, this.large ? 480 : 240, (url, data, width, height) => {
                        if (data) {
                            this.videoCoverDefaultIcon = '';
                            this.coverUrl = url;
                            this.base64ImgData = data;
                            this.visibleImg = true;
                            this.scaleImgHeight = 160;
                            // this.$nextTick(() => {
                            //     let div = document.querySelector(".imgIn");
                            //     if (!div) return;
                            //     let clientWidth = div.offsetWidth;
                            //     let scale = width ? (clientWidth / width) : 1;
                            //     this.scaleImgHeight = (height || 0) * scale;
                            //     // console.log('scaleImgHeight = ', this.scaleImgHeight);
                            // });
                        }
                    });
                }
            }
            return false;
        },
        formatNumber2(nub) {
            return utils.formatNumber(nub);
        },
        formatSecond(time) {
            return utils.formatSeconds(time);
        },

        onClickImg() {
            this.$router.push({
                path: "/home/moduleList",
                query: {
                    moid: this.imgData.id,
                }
            });
        },


    },
};
</script>
<style lang="less" scoped>
.topic-item {
    padding-bottom: 20px;
}

.imgIn {
    position: relative;
    text-align: center;
}

.cover {
    width: 95%;
    margin: 0 auto;
    min-height: 160px;

    background-repeat: no-repeat;
    // height: 100%;
    background-position: center center;
    background-color: @img-bg-color; // @theme-color;
    border-radius: @box-border-radius;
    background-size: scale-down;
    img {
        object-fit: cover;
        border-radius: @box-border-radius;
    }
}

.loading_img {
    object-fit: scale-down;
}
.tips {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.info {
    display: flex;
    justify-content: space-between;
    position: absolute;
    padding: 0px 5px;
    bottom: 0;
    height: 20px;
    width: 95%;
    border-radius: 0px 0px @box-border-radius @box-border-radius;
    background-color: rgba(0, 0, 0, 0.2);
    .info-item {
        display: flex;
        align-items: center;
        color: #f7f8fa;
    }
}

.imgfont {
    font-size: 0.3rem;
    margin-right: 4px;
    margin-left: 5px;
}

.imgDom {
    /* box-sizing: border-box; */
    width: 100%;
    min-height: 100px;
    overflow: hidden;
    border-radius: @box-border-radius;
    background-size: cover;
}

.topic-name {
    line-height: 0.5rem;
    height: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: @text-color;
    font-size: 14px;
    word-break: break-all;
    margin: 8px 0 20px 2.5%;
}
</style>
