<template>
    <div :class="boxClass">
        <div v-if="imgData.pos" class="imgIn adImgBox" :style="`width:${imgWidth};height:${imgHeight}`" @click="onClickImg">
            <lazy-component class="cover" @show="loadImgData" :style="{'background-image': 'url(' + videoCoverDefaultIcon + ')'}">
                <transition name="bounce">
                    <div v-show="visibleImg" :key="coverURL" class="imgDom" :style="{'background-image': 'url(' + base64ImgData + ')'}" />
                </transition>
            </lazy-component>
            <div class="adbg">
                <span>广告</span>
            </div>
        </div>
        <div v-else class="imgIn" :style="`width:${imgWidth};height:${imgHeight}`" @click="onClickImg">
            <lazy-component class="cover" @show="loadImgData" :style="{'background-image': 'url(' + videoCoverDefaultIcon + ')'}">
                <transition name="bounce">
                    <div v-show="visibleImg" :coverURL="coverURL" :key="coverURL" class="imgDom" :style="{'background-image': 'url(' + base64ImgData + ')'}">
                        <div class="tips">
                            <div v-if="!!imgData.price && imgData.price != 0" class="price">
                                <span>
                                    <van-icon name="gem-o" />{{ imgData.price }}
                                </span>
                            </div>
                            <div v-if="imgData.payType == 2" class="pricefree">
                                <span>免费</span>
                            </div>
                            <div v-if="imgData.payType == 3" class="priceVIP">
                                <span>VIP</span>
                            </div>
                        </div>

                        <div class="info">
                            <div class="info-item">
                                <van-icon name="play-circle" size="15" color="#f7f8fa" />
                                <span class="imgfont">
                                    {{ formatSecond(imgData.time) }}
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="imgfont">{{ formatNumber2(imgData.hot) }}</span>
                            </div>
                        </div>
                    </div>
                </transition>
            </lazy-component>
        </div>
        <div v-if="showTitle" class="itemTitle" :id="`img-${imgData.id}`" :style="`width:${imgWidth};`">
            <div class="videoName">{{ imgData.name }}</div>
            <div class="userInfo" v-if="showAvatar">
                <div class="userLeft" @click="onAvatarClick">
                    <lazy-component @show="loadAvatar">
                        <img :src="avatarBase64ImgData" alt="" class="avatar">
                    </lazy-component>
                    <div class="userName">{{ imgData.user.username }}</div>
                </div>
                <div class="likedCnt">
                    <van-icon name="like" size="12" style="margin-right:4px" />
                    {{ imgData.likedCnt }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defaultRes } from "~/assets/js/constants";
import * as utils from "~/assets/js/utils";

export default {
    name: "ImgItem",
    props: {
        imgData: Object,
        callBack: Function,
        large: Boolean,
        showMode: String,
        imageLocation: String,
        showTitle: { type: Boolean, default: true },
        imgWidth: { type: String, default: '100%' },
        imgHeight: String,
        showAvatar: { type: Boolean, default: false }
    },
    data() {
        let boxClass = "imgBox twoItem ";
        if (this.showMode) {
            boxClass += this.showMode + " ";
        }
        if (this.imageLocation) {
            boxClass += this.imageLocation + " ";
        }
        if (this.showTitle === false) {
            boxClass += "noTitle";
        }
        let useHeight = this.imgHeight;
        if (this.showMode == "horizontal") {
            useHeight = useHeight || '110px';
        }
        else {
            useHeight = useHeight || '180px';
        }
        return {
            useHeight: useHeight,
            mImgData: this.imgData,
            boxClass,
            base64ImgData: defaultRes.videoCoverDefaultIcon,
            usericon: defaultRes.userAvatorDefault,
            id: this.imgData.id,
            videoCoverDefaultIcon: defaultRes.videoCoverDefaultIcon,
            coverURL: this.imgData.coverURL,
            visibleImg: false,
            avatarURL: this.imgData.user ? this.imgData.user.avatarURL : '',
            avatarBase64ImgData: defaultRes.userAvatorDefault
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
            if (this.imgData.base64ImgData || this.imgData.base64ImgData == '') {
                if (this.imgData.base64ImgData == '') {
                    this.videoCoverDefaultIcon = defaultRes.videoCoverDefaultIcon;
                } else {
                    this.videoCoverDefaultIcon = '';
                }
                this.$nextTick(() => {
                    this.base64ImgData = this.imgData.base64ImgData;
                    this.coverURL = this.imgData.coverURL;
                    this.visibleImg = true;
                });
            } else {
                if (this.imgData.pos) {
                    // 广告图片
                    this.$fileloader.dowloadJpegImg(this.imgData.coverURL, 240, (url, data) => {
                        if (data) {
                            this.videoCoverDefaultIcon = '';
                            this.coverURL = url;
                            this.base64ImgData = data;
                            this.visibleImg = true;
                        }
                    });
                } else {
                    this.$fileloader.dowloadJpegImg(this.imgData.coverURL, this.large ? 480 : 240, (url, data) => {
                        if (data) {
                            this.videoCoverDefaultIcon = '';
                            this.coverURL = url;
                            this.base64ImgData = data;
                            this.visibleImg = true;
                        }
                    });
                }
            }
            return false;
        },
        loadAvatar() {
            if (this.imgData.avatarBase64ImgData || this.imgData.avatarBase64ImgData == '') {
                this.avatarBase64ImgData = this.imgData.avatarBase64ImgData;
                this.avatarURL = this.imgData.user.avatarURL;
                this.visibleImg = true;
            } else {
                this.$fileloader.dowloadJpegImg(this.imgData.user.avatarURL, 120, (url, data) => {
                    if (data) {
                        this.avatarURL = url;
                        this.avatarBase64ImgData = data;
                        this.avatarVisible = true;
                    }
                });
            }
            return false;
        },
        changeClass() {
            if (this.large == 0) {
                return 'fimgBox';
            } else {
                return "imgBox";
            }
        },
        changeImgClass() {
            if (this.large == 0) {
                return 'bigImg';
            } else {
                return "smallImg";
            }
        },
        formatNumber2(nub) {
            return utils.formatNumber(nub);
        },
        formatSecond(time) {
            return utils.formatSeconds(time);
        },
        onClickUser() {
            this.$router.push({
                path: "/user",
                query: {
                    uid: this.imgData.user.uid,
                },
            });
        },
        onClickImg() {
            if (this.imgData.pos) {
                // 广告
                window.open(this.imgData.url);
                return;
            }
            if (this.imgData.timeType == 3) {
                // 短视频
                this.$router.push({
                    path: "/short/play",
                    query: {
                        vid: this.imgData.id,
                    },
                });
                return;
            } else {

                if (this.$route.name === "play") {
                    this.$router.replace({
                        path: "/play",
                        query: {
                            vid: this.imgData.id,
                        },
                    });
                } else {
                    this.$router.push({
                        path: "/play",
                        query: {
                            vid: this.imgData.id,
                        },
                    });
                }
            }
        },
        onAvatarClick() {
            this.$router.push({
                path: "/user",
                query: {
                    uid: this.imgData.user.uid,
                },
            });
        }
    },
};
</script>
<style lang="less" scoped>
.imgBox {
    position: relative;
    .imgIn {
        position: relative;
    }

    &.twoItem {
        width: 100%;
    }

    &.twoItem.vertical {
        height: 180px;
    }
    &.noTitle {
        margin-bottom: 0.2rem;
    }
}

.right > .imgIn > .cover > div {
    background-position-x: right;
}
.cover {
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
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
.price {
    position: absolute;
    top: 0;
    right: 0;
    background: @home-bg-color7;
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    flex-wrap: nowrap;
    color: @home-font-color5;
    z-index: 10;
}
.pricefree {
    position: absolute;
    top: 0;
    right: 0;
    background: @home-bg-color6;
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    color: @home-font-color5;
    z-index: 10;
}

.priceVIP {
    position: absolute;
    top: 0;
    right: 0;
    background: @home-bg-color5;
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    span {
        color: @home-font-color2;
        font-weight: bold;
    }
    z-index: 10;
}

.adbg {
    position: absolute;
    right: 0.05rem;
    top: 0.05rem;
    width: 1.2rem;
    height: 0.65rem;
    background: rgba(0, 0, 0, 0.2);
    color: @home-font-color5;
    text-align: center;
    font-size: 0.12rem;
    line-height: 0.65rem;
    border-radius: @box-border-radius;
}
.info {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    height: 20px;
    width: 100%;
    border-radius: 0px 0px @box-border-radius @box-border-radius;
    background-color: rgba(0, 0, 0, 0.2);
    .info-item {
        display: flex;
        align-items: center;
        color: @home-font-color5;
    }
}

.imgfont {
    font-size: 0.3rem;
    margin-right: 4px;
    margin-left: 5px;
}
.itemTitle {
    margin-top: 0.1rem;
    margin-bottom: 0.35rem;
    // color: @home-font-color3;
    font-size: 0.32rem;
    word-break: break-all;
    // text-align: center;
    .videoName {
        line-height: 0.5rem;
        height: 0.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 0.1rem;
        color: @home-font-color1;
    }
    .userInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @theme-color2;
        .userLeft {
            display: flex;
            align-items: center;
            width: 65%;
            .avatar {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                margin-right: 0.2rem;
                display: block;
            }
            .userName {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 0.5rem;
            }
        }

        font-size: 0.3rem;
    }
    .likedCnt {
        max-width: 35%;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.avatarInfo {
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
}
.avatarInfo .iusericon {
    width: 0.5rem;
    height: 0.5rem;
}

.avatarInfo span {
    font-size: 0.35rem;
    color: #808184;
    padding-left: 0.05rem;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 0.1rem;
}
.iusericon img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    display: block;
}

.imgDom {
    /* box-sizing: border-box; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: @box-border-radius;
    background-size: cover;
}
</style>
