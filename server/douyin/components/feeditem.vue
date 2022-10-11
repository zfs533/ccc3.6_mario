<template>
    <div class="feedBox">
        <van-row type="flex" justify="space-between">
            <van-col span="18">
                <div class="feed-user-info">
                    <div class="left" @click="onAvatarClick">
                        <lazy-component @show="loadAvatar">
                            <img :src="avatarBase64ImgData" alt="" class="avatar">
                        </lazy-component>
                        <div>
                            <div class="userName">{{ imgData.user.username }}</div>
                            <div>
                                <span class="pub-location">
                                    <van-icon name="location" />{{ imgData.location }}
                                </span>
                                <span class="pub-date">{{ new Date(imgData.releaseDate).format("yyyy年MM月dd日") }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-col>
            <van-col span="6">
                <div v-if="!hideFollow && !userFollowed" class="follow-warp">
                    <followbtn :followed="userFollowed" :uid="imgData.user.uid" :isSmall="false" />
                </div>
            </van-col>
        </van-row>
        <van-row>
            <div class="itemTitle" :id="`img-${imgData.id}`">
                <label-area-2 :id="imgData.id">
                    {{imgData.name}}
                </label-area-2>
                <!-- <label-area :text="imgData.name+imgData.name+imgData.name+imgData.name" :width="400" :maxLines="3">
                </label-area> -->
                <div class="videoTags">
                    <span class="post-tag" v-for="tag in imgData.tags" :key="tag.id" @click='onClickTag(tag.id)'>
                        #{{tag.name}}
                    </span>
                </div>
            </div>
        </van-row>
        <van-row>
        </van-row>
        <van-row>
            <div class="imgIn" @click="onClickImg">
                <lazy-component class="cover" @show="loadImgData" :style="{'background-image': 'url(' + videoCoverDefaultIcon + ')'}">
                    <transition name="bounce">
                        <div v-show="visibleImg" :coverURL="coverURL" :key="coverURL" class="imgDom" :style="{'background-image': 'url(' + base64ImgData + ')','width':scaleImgWidth + 'px','height':scaleImgHeight + 'px'}">
                            <div class="tips" :style="{'width':scaleImgWidth + 'px','height':scaleImgHeight + 'px'}">
                                <van-icon name="play-circle-o" color="white" size="60" style="opacity: 0.5" />
                            </div>
                        </div>
                    </transition>
                </lazy-component>
            </div>
        </van-row>
        <van-row>
            <div class="feed-tip">
                <div class="left" @click="onAvatarClick">
                    <div class="userName">浏览次数: {{ formatNumber2(imgData.playCnt) }}</div>
                </div>
                <div class="right">
                    <div class="action-warp like-warp">
                        <van-icon name="chat" size="12" style="margin-right:4px" />
                        {{ imgData.commentCnt }}
                    </div>
                    <div class="action-warp like-warp">
                        <van-icon name="star" size="12" style="margin-right:4px" />
                        {{ imgData.likedCnt }}
                    </div>
                    <!-- <div class="action-warp collect-warp">
                        <van-icon name="like" size="12" style="margin-right:4px" />
                        {{ imgData.playCnt }}
                    </div> -->
                </div>
            </div>
        </van-row>
    </div>
</template>
<script>
import { defaultRes } from "~/assets/js/constants";
import * as utils from "~/assets/js/utils";
import Followbtn from '~/components/followbtn.vue';
import LabelArea from './labelArea.vue';

export default {
    name: "FeedItem",
    components: { Followbtn, LabelArea },
    props: {
        imgData: Object,
        callBack: Function,
        large: Boolean,

        hideFollow: false,
    },
    data() {
        return {
            mImgData: this.imgData,
            userFollowed: this.imgData.user.followed,
            base64ImgData: defaultRes.videoCoverDefaultIcon,
            usericon: defaultRes.userAvatorDefault,
            id: this.imgData.id,
            videoCoverDefaultIcon: defaultRes.videoCoverDefaultIcon,
            coverURL: this.imgData.coverURL,
            visibleImg: false,
            avatarURL: this.imgData.user ? this.imgData.user.avatarURL : '',
            avatarBase64ImgData: defaultRes.userAvatorDefault,

            scaleImgWidth: 380,
            scaleImgHeight: 400,
        };
    },
    created() {
    },
    mounted() {
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
                    this.$fileloader.dowloadJpegImg(this.imgData.coverURL, this.large ? 480 : 240, (url, data, width, height) => {
                        if (data) {
                            this.videoCoverDefaultIcon = '';
                            this.coverURL = url;
                            this.base64ImgData = data;
                            this.visibleImg = true;
                        }
                    });
                }
            }
            this.coverLoaded(this.imgData.width, this.imgData.height);

            return false;
        },

        coverLoaded(imgWidth, imgHeight) {
            this.$nextTick(() => {
                let div = document.querySelector(".imgIn");
                if (!div) return;
                let clientWidth = div.offsetWidth;
                let clientHeight = 400;
                let scale1 = imgWidth ? (clientWidth / imgWidth) : 1;
                let scale2 = imgHeight ? (clientHeight / imgHeight) : 1;
                let scale = scale1 > scale2 ? scale2 : scale1;
                this.scaleImgWidth = (imgWidth || 0) * scale;
                this.scaleImgHeight = (imgHeight || 0) * scale;
                this.$forceUpdate();
            });
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
                return 'ffeedBox';
            } else {
                return "feedBox";
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
        },

        onClickTag(tagid) {
            this.$router.push({
                path: "/tag",
                query: {
                    tagid: tagid
                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.feedBox {
    margin: 8px 0px;
    padding: 9px;
    position: relative;
    color: @theme-color2;
    background: @theme-color1;

    .imgIn {
        position: relative;
        // maxWidth: 380px;
        max-width: 100%;
        max-height: 400px;
        margin: 0 auto;
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

.cover {
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    background-position: center center;
    // background-color: @img-bg-color; // @theme-color;
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
    left: 0;
    // width: 100%;
    // height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;
}
.price {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(30deg, #fd2de9 20%, #7a10a0);
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    flex-wrap: nowrap;
    color: @text-color;
    z-index: 10;
}
.pricefree {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(30deg, #2ddf64, #0bac40);
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    color: @text-color;
    z-index: 10;
}

.priceVIP {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(30deg, #ffd598, #db9646);
    border-top-right-radius: @box-border-radius;
    border-bottom-left-radius: @box-border-radius;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    width: 45px;
    span {
        color: #6e330d;
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
    color: @text-color;
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
        color: #f7f8fa;
    }
}

.imgfont {
    font-size: 0.3rem;
    margin-right: 4px;
    margin-left: 5px;
}
.itemTitle {
    margin: 0.2rem 0;
    color: @text-color;
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
    }
    .post-tag {
        color: @feed-font-color1;
        padding-right: 0.234rem;
        padding-bottom: 0.07rem;
        padding-top: 0.093rem;
        font-size: 0.374rem;
    }
}
.follow-warp {
    display: flex;
    justify-content: end;
}
.feed-user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;

    .left {
        display: flex;
        width: 85%;
        white-space: nowrap;
        .avatar {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: 0.2rem;
            display: block;
        }
        .userName {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
        }

        .pub-location,
        .pub-date {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 10px;
            color: @feed-font-color2;
        }
        .pub-date {
            margin-left: 10px;
        }
    }
}

.feed-tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
    margin: 10px 0px;
    color: @feed-font-color2;

    .left {
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
    .right {
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;

        .action-warp {
            margin-left: 10px;
        }
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
