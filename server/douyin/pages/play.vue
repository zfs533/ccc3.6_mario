<template>
    <div class="play videoPageBox flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <div class="videoTop">
                <div class="top-head">
                    <van-skeleton :loading="!inited" title avatar>
                        <van-nav-bar class="top-navbar" left-arrow @click-left="onClickBack" style="z-index: 1000; width: 100%" :placeholder="true">
                            <template #title class="topright">
                                <div class="vpuserBox">
                                    <div class="avater" @click="onClickUser">
                                        <usericon :imgUrl="video.user.avatarURL" />
                                    </div>
                                    <div class="name" @click="onClickUser">{{video.user.username}}</div>
                                </div>
                            </template>
                            <template #right>
                                <div class="subvpRight">
                                    <followbtn :followed="userFollowed" :uid="video.user.uid" :isSmall=false />
                                </div>
                            </template>
                        </van-nav-bar>
                    </van-skeleton>
                </div>
                <div class="videoBox" :style="{ 'height': videoBoxHeight, 'max-height': videoBoxHeight}">
                    <van-skeleton :loading="!inited" class="video-skeleton" :row="1" />
                    <div v-show="inited" class="mplay">
                        <video id="mse" webkit-playsinline="true" x5-playsinline="" playsinline preload="auto" x-webkit-airplay="allow" x5-video-orientation="portrait"> </video>
                    </div>
                </div>

                <div class="infobox" v-if="inited && !fullScreen && (!allData.vip&&video.payType==3)|| (!allData.buyVideo&&video.payType==4)">
                    <div class="pop">
                        <div class="vip" v-if="!allData.vip&&video.payType==3" @click="onClickOpenVip">开通VIP观看完整版</div>
                        <div class="diamond" v-else-if="!allData.buyVideo&&video.payType==4">
                            <div v-if="!allData.vip" class="diamondPrice" @click="onClickBuyDiamond">{{allData.diamond}}钻石观看完整版</div>
                            <div class="vipDiamondPrice" @click="onClickBuyVipDiamond">{{allData.discountDiamond}}钻石(VIP专享)</div>
                        </div>
                    </div>
                </div>
            </div>
            <van-skeleton style="width:150px;margin:10px 0" :loading="!inited" title>
                <van-tabs line-height="0" style="width:150px;margin-top:0px" :stop-propagation="false" v-model="curTabIndex" @click="onClickTab">
                    <van-tab :border="false" style="padding-right:30px" :key="0" :title="'简介'" />
                    <van-tab :key="1" :title="`评论 ${formatNumber2( this.video.commentCnt) || '' }`" />
                </van-tabs>
            </van-skeleton>
        </div>
        <div class="content">
            <swiper ref="mySwiper" :options="swiperOption" style="width:100%;height:100%" @slideChange="onChange">
                <swiper-slide style="width:100%">
                    <div class="scroll-container">
                        <div class="otherBody">
                            <van-skeleton :loading="!inited" :row="3">
                                <div class="titlebox"><span class="videoTitle">{{video.name}}</span></div>
                                <div class="videoTags">
                                    <van-tag v-for="tag in video.tags" :key="tag.id" @click='onClickTag(tag.id)' round size="large">{{tag.name}}</van-tag>
                                </div>
                                <div class="des">
                                    热度 {{video.hot}}
                                    <span>·</span>
                                    时长 {{formatSecond(video.time)}}
                                    <span>·</span>
                                    {{ChargeType[video.payType]}}
                                </div>
                            </van-skeleton>
                            <div v-show="inited" class="actionBtns">
                                <div class="shoucang" @click="onClickCollect">
                                    <van-icon name="star" v-if="userCollected" color="rgb(229, 32, 71)" size="36" />
                                    <van-icon class="shoucang-img" name="star-o" v-else size="36" />
                                    <div class="loveRight">
                                        <div class="loveNum">{{formatNumber2(video.collectedCnt)}}</div>
                                        <div class="loveText">收藏</div>
                                    </div>
                                </div>
                                <div class="like" @click="onClickLike">
                                    <div>
                                        <van-icon name="like" v-if="userLiked" color="rgb(229, 32, 71)" size="36" />
                                        <van-icon class="shoucang-img" name="like-o" v-else size="36" />
                                    </div>
                                    <div class="loveRight">
                                        <div class="loveNum">{{formatNumber2(video.likedCnt)}}</div>
                                        <div class="loveText">点赞</div>
                                    </div>
                                </div>
                                <div class="like" @click="onClickShare">
                                    <div>
                                        <van-icon class="shoucang-img" name="share-o" size="36" />
                                    </div>
                                    <div class="loveRight">
                                        <div class="loveNum"></div>
                                        <div class="loveText">分享</div>
                                    </div>
                                </div>
                            </div>
                            <div class="ad-swipebox" v-if="inited && ads.length > 0">
                                <swiper class="my-swipe" :options="adSwiperOption" style="width: 95%; height: 95%">
                                    <swiper-slide v-for="(ad, index) in ads" :key="index">
                                        <img :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width:100%;height:100%" @click="onClickAd(ad.url)" />
                                    </swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                            </div>
                        </div>
                        <div v-show="inited" class="otherVideo" v-if="showOthers">
                            <div class="otherViodeTitle">更多TA的视频</div>
                            <div class="userVideobox">
                                <list-box ref="videoList" :waterfall="true" loading-text="努力加载中..." @load="onLoadVideoData" @clear="onVideoListClear" />
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <comment-area ref="refCommentArea" :fixed='true' />
                </swiper-slide>
            </swiper>

        </div>
        <van-overlay :show="showShare" @click="showShare = false" z-index="2000">
            <div class="closeBtn">
                <van-icon name="cross" size="30" />
            </div>
            <Share :show="showShare" />
        </van-overlay>
        <van-overlay :show="showVip" @click="showVip = false" z-index="2000">
            <div class="closeBtn">
                <van-icon name="cross" size="30" />
            </div>
            <VipTip />
        </van-overlay>
        <van-overlay :show="showDiamond" @click="showDiamond = false" z-index="2000">
            <div class="closeBtn">
                <van-icon name="cross" size="30" />
            </div>
            <DiamondTip :isVIP="allData.vip" :discountDiamond="allData.discountDiamond" :diamond=" allData.diamond" :curDiamond="allData.curDiamond" @buy="payDiamond" />
        </van-overlay>
    </div>
</template>
<script>
import "~/assets/css/plyr.custom.less";
import { pageMixin } from "~/assets/js/mixins";
import * as utils from "~/assets/js/utils";

import { defaultRes } from '~/assets/js/constants';
import Plyr from "~/assets/js/plyr";
import DiamondTip from '~/components/diamondTip.vue';
import Followbtn from '~/components/followbtn.vue';
import ImgItem from '~/components/imgitem';
import Usericon from '~/components/usericon.vue';
import Share from '~/components/videoShare.vue';
import VipTip from '~/components/vipTip.vue';
export default {
    name: 'play',
    layout: "keepalive",
    components: { Usericon, Followbtn, ImgItem, Share, VipTip, DiamondTip },
    mixins: [pageMixin],
    data() {
        let videoBoxMaxHeight = "";
        if (this.$env.device.desktop()) {
            videoBoxMaxHeight = (460 * 0.57) + 'px';
        } else {
            videoBoxMaxHeight = "57vw";
        }
        return {
            apiState: {
                userLiking: false,
                userCollecting: false,
                userFollowing: false,
            },
            inited: false,
            videoBoxMaxHeight,
            videoBoxHeight: videoBoxMaxHeight,
            showShare: false,
            showVip: false,
            showDiamond: false,
            playerElm: null,
            player: null,
            tags: ["标签1", "标签2", "标签3"],
            images: [""],
            playURL: "",
            userLiked: false,
            userCollected: false,
            fullScreen: false,
            userFollowed: false,
            vid: this.$route.query.vid,
            video: {
                collectedCnt: 0,
                userLiked: false,
                coverURL: "",
                hot: 0,
                id: "",
                likedCnt: 0,
                name: "",
                payType: 1,
                playCnt: 0,
                publisherId: 0,
                tags: [],
                time: 0,
                timeType: 1,
                user: {
                    avatarURL: "",
                    id: 0,
                    uid: 0,
                    username: "",
                },
                version: 0
            },
            curVideoPage: 1,
            mpageSize: 20,
            allData: {
                buyVideo: false,
                curDiamond: 0,
                isAuthorSelf: false,
                otherVideos: [],
                url: "",
                userFollowed: false,
                userCollected: false,
                userLiked: false,
                video: {},
                vip: false
            },
            ChargeType: ['', '付费类型', "免费", "VIP", "钻石"],
            ads: [],
            timer: null,
            timer_watch: null,
            time_watch: 0,
            inPageTime: 0,
            playOptions: {
                muted: false,
                autoplay: true,
                hideControls: true,
                iconUrl: "plyr.svg",
                controls: [
                    'play', 'progress', 'current-time', 'mute', 'fullscreen', 'pip',
                    'airplay'
                ],
                // speed: { selected: 2, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
                fullscreen: {
                    iosNative: true
                }
                // disableContextMenu:false
            },

            swiperOption: {
                edgeSwipeDetection: true,
            },
            adSwiperOption: {
                loop: false,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            },
            showOthers: false,

            curTabIndex: 0,

            myInfo: this.$userStore.getMyInfo(),
        };

    },
    async created() {
        console.log("play created");
        if (this.$cordova) {
            this.$cordova.screenOrientation("any");
        }
        // this.inPageTime = Date.now();
        let allAd = await this.$main.adManager.getAllAD();
        this.ads = [];
        for (let i = 0; i < allAd.playVideo.length; i++) {
            let item = allAd.playVideo[i];
            this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                if (!data) {
                    console.warn("videoPlay Ads dowloadFile error: ", url);
                    return;
                }
                item.coverUrl = url;
                item.base64ImgData = data;
                this.ads.push(item);
            });
        }

        this.$nuxt.$on('updateTotalCommentCnt', this.updateTotalCommentCnt);

        //用户变化屏幕方向时调用
        window.addEventListener("orientationchange", (e) => {
            this.orientChange();
        });
    },
    async mounted() {
        console.log("play mounted");
        this.$parent.showTabbar = false;

        this.playerElm = document.querySelector('#mse');
        this.player = Plyr.setup([this.playerElm], {
            ...this.playOptions,
            // listeners: {
            //     fullscreen: (e) => {
            //         let p = this.player;
            //         if (!this.$env.device.mobile()) return;

            //         console.log("player fullscreen ", p.fullscreen.active);
            //         if (p.fullscreen.active === false) {
            //             // 全屏
            //             this.fullScreen = true;
            //             this.playerElm.style["max-height"] = "";
            //             this.playerElm.style["object-fit"] = "contain";
            //         } else {
            //             this.fullScreen = false;
            //             this.playerElm.style["max-height"] = "212px;";
            //             this.playerElm.style["object-fit"] = "cover";
            //         }
            //     }
            // }
        })[0];
        this.player.on('canplay', () => {
            this.playerElm.style["object-fit"] = "contain";
        });
        this.player.on('enterfullscreen', () => {
            console.log("play enterfullscreen");
            this.fullScreen = true;
            this.videoBoxHeight = "";
            if (this.$cordova) {
                this.$cordova.screenOrientation("landscape");
            }
        });
        this.player.on('exitfullscreen', () => {
            console.log("play exitfullscreen");
            if (this.$cordova) {
                this.$cordova.screenOrientation("portrait");
                this.$cordova.screenOrientation("any");
            }
            this.fullScreen = false;
            this.videoBoxHeight = this.videoBoxMaxHeight;
        });

        this.playerElm.addEventListener("webkitendfullscreen", () => {
            console.log("player webkitendfullscreen ");
            this.fullScreen = false;
            this.videoBoxHeight = this.videoBoxMaxHeight;
        });


        // console.log('myInfo = ', this.$userStore);

        this.playerElm.addEventListener('play', () => {
            if (!this.timer_watch) {
                this.timer_watch = setInterval(() => {
                    this.time_watch++;
                }, 1000);
            }

            if (this.inPageTime == 0) {
                let userStore = this.$userStore;
                this.myInfo = this.$userStore.getMyInfo();
                if (this.allData.buyVideo == false && !this.myInfo.vipLevel && this.myInfo.dailyVideoTimes > 0) {
                    if (!this.myInfo.videoHistory.includes(this.video.id)) {
                        if (this.myInfo.remainTimes <= 0) {
                            this.$dialog.confirm({
                                title: '温馨提示',
                                cancelButtonText: "再看看",
                                confirmButtonText: "升级VIP",
                                message: '今日免费次数已用尽，充值VIP即可畅享全场视频',
                                messageAlign: "left",
                                className: 'fistDialog'
                            }).then(() => {
                                this.$router.push({
                                    path: "/recharge?type=vip"
                                });
                            }).catch(() => {
                                this.playerElm.play();
                                this.inPageTime = this.inPageTime + 1;
                            });
                            this.playerElm.pause();
                            return;
                        }
                        this.myInfo.videoHistory.push(this.video.id);
                        this.myInfo.remainTimes = this.myInfo.remainTimes - 1;
                        userStore.updateUserInfo({ remainTimes: this.myInfo.remainTimes - 1, videoHistory: this.myInfo.videoHistory });
                    }
                }

                this.inPageTime = Date.now();
                this.timer = setTimeout(() => {
                    let time = Math.floor((Date.now() - this.inPageTime) / 1000);
                    this.$api.updateVideoHistory(this.allData.video.id, { watchedTime: time });
                }, 1000);
            }

        }, false);
        this.playerElm.addEventListener('ended', () => { //结束
            if (!this.allData.vip && this.video.payType == 3) {
                this.showVip = true;
            }
            if (!this.allData.buyVideo && this.video.payType == 4) {
                console.log("钻石");
                this.showDiamond = true;
            }

        }, false);
        this.playerElm.addEventListener('pause', () => {
            if (this.timer_watch) {
                clearInterval(this.timer_watch);
                this.timer_watch = 0;
            }

        }, false);
        if (this.$route.query.vid) {
            this.loadVideoByVid(this.$route.query.vid);
        }
        this.orientChange();
    },
    async activated() {
        console.log("play activated");

        this.myInfo = this.$userStore.getMyInfo();
        this.$parent.showTabbar = false;
        this.playerElm.poster = defaultRes.videoCoverDefault;
        this.showOthers = false;
        if (!this.vid || this.$route.query.vid === this.vid) return;

        this.loadVideoByVid(this.$route.query.vid);
    },
    deactivated() {
        this.inited = false;
    },
    destroyed() {
        console.log("play destroyed");
        this.inited = false;
        if (this.$cordova) {
            this.$cordova.screenOrientation("portrait");
        }
        this.setHiStory();
        this.inPageTime = 0;
        clearTimeout(this.timer);
        clearInterval(this.timer_watch);
        this.timer_watch = 0;
        this.playerElm.poster = "";
        this.playerElm.pause();
        if (this.playerElm.hls) {
            this.playerElm.hls.destroy();
            this.playerElm.hls = null;
        }
        this.playerElm.src = "";
        this.showOthers = false;
    },
    watch: {
        "$route.query.vid": "vidChange"
    },
    methods: {

        updateTotalCommentCnt(param) {
            if (this.video.id == param.id)
                this.video.commentCnt = param.totalCommentCnt;
        },

        onChange() {
            setTimeout(() => {
                this.$nextTick(() => {
                    if (this.$refs.mySwiper) {
                        this.curTabIndex = this.$refs.mySwiper.$swiper.activeIndex;
                    }
                });
            }, 10);
        },
        async onClickTab(index, title) {
            this.curTabIndex = index;
            this.$nextTick(() => {
                if (this.$refs.mySwiper) {
                    this.$refs.mySwiper.$swiper.slideTo(index);
                }
            });
        },

        onVideoListClear() {
            this.curVideoPage = 1;
        },
        setHiStory() {
            let time = Math.floor((Date.now() - this.inPageTime) / 1000);
            // if (time && time >= 10) {
            this.$api.updateVideoHistory(this.video.id, {
                stayTime: time,
                watchedTime: this.time_watch,
                progressTime: this.playerElm.currentTime,

            });
            // }
        },
        async orientChange() {

            if (window.orientation == 90 || window.orientation == -90) {
                //ipad、iphone竖屏；Andriod横屏
                document.body.classList.remove("portrait");
                document.body.classList.add("landscape");
                document.documentElement.classList.remove("safe-top");
                if (this.$cordova) return;
                if (this.player.playing) {
                    try {
                        await this.player.fullscreen.enter();
                    } catch { }
                }
                return false;
            }
            else if (window.orientation == 0 || window.orientation == 180) {
                //ipad、iphone横屏；Andriod竖屏
                document.body.classList.remove("landscape");
                document.body.classList.add("portrait");

                document.documentElement.classList.add("safe-top");

                if (this.$cordova) return;
                if (this.player.playing) {
                    try {
                        await this.player.fullscreen.exit();
                    } catch { }
                }
                return false;
            }
        },
        preloadVideo(video, vUrl, coverURL, autoplay = false, reload = false) {
            let playerPoster = video.getAttribute("data-poster");
            video.poster = defaultRes.videoCoverDefault;
            if (playerPoster !== coverURL) {
                if (coverURL) {
                    this.$fileloader.dowloadJpegImg(coverURL, 0, (url, data) => {
                        if (data) {
                            video.setAttribute("data-poster", coverURL);
                            video.poster = data;
                        }
                    });
                }
            } else {
            }
            if (video.hls && video.hls.url === vUrl && !reload) return;

            video.pause();
            if (autoplay) {
                video.autoplay = true;
            } else {
                video.autoplay = false;
            }
            if (Hls.isSupported()) {
                if (video.hls) {
                    video.hls.destroy();
                    video.hls = null;
                }
                video.hls = new Hls({
                    autoStartLoad: true,
                    // startFragPrefetch: true,
                    debug: false
                });
                video.hls.attachMedia(video);
                video.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    video.hls.loadSource(vUrl);
                    video.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                        console.log("hls manifest loaded, found ", data);
                        // if (video.autoplay) {
                        //     console.log("autoPlay Video:", video.id, url);

                        //     video.play();
                        // }
                    });
                    hls.on(Hls.Events.ERROR, function (event, data) {
                        var errorType = data.type;
                        var errorDetails = data.details;
                        var errorFatal = data.fatal;
                        console.warn("hls error", data);
                        switch (data.details) {
                            case hls.ErrorDetails.FRAG_LOAD_ERROR:
                                console.log("hls frag error encountered", data.details);
                                break;
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                // try to recover network error
                                console.log("hls network error encountered, try to recover", data.details);
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log("hls media error encountered, try to recover", data.details);
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log("hls default error encountered", data.details);
                                hls.destroy();
                                break;
                        }
                    });
                });

                console.log("preloadVideo:", video.id, vUrl);
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = vUrl;
            }
            video.preload = "auto";
        },
        vidChange(vid) {
            console.log("play vidChange");
            this.inited = false;
            this.setHiStory();
            this.playerElm.poster = defaultRes.videoCoverDefault;
            this.inPageTime = 0;
            clearTimeout(this.timer);
            clearInterval(this.timer_watch);
            this.timer_watch = 0;
            this.time_watch = 0;

            if (this.$route.path !== "/play") return;
            if (vid) {
                this.loadVideoByVid(vid);
            }
        },
        async loadVideoByVid(vid) {
            console.log("play loadVideoByVid", vid);
            this.vid = vid;
            this.player.stop();

            let res = await this.$api.getPlayVideoInfo(vid);

            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }

            this.allData = res.data;
            this.userLiked = this.allData.userLiked;
            this.userCollected = this.allData.userCollected;
            this.userFollowed = this.allData.userFollowed;
            this.video = this.allData.video;

            this.playURL = this.allData.url + "&pid=" + this.$env.pid + "&domain=" + this.$checkLine.getResBaseUrl();
            console.log("play loadVideoByVid set src", this.playURL);
            this.preloadVideo(this.playerElm, this.playURL, this.video.coverURL, true);

            this.$nextTick(() => {
                if (!this.$refs.refCommentArea) return;
                this.$refs.refCommentArea.onShowChat(this.video.id, this.formatNumber2(this.video.commentCnt));
                this.inited = true;
                this.showOthers = true;
                this.$nextTick(() => {
                    if (this.$refs.videoList) {
                        this.$refs.videoList.clearData();
                        this.$refs.videoList.check();
                    }
                });
            });
        },
        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
        onClickOpenVip() {
            // 开通vip
            this.$router.push({
                path: "/recharge?type=vip"
            });
        },
        async onClickBuyVipDiamond() {
            // 购买vip钻石
            if (!this.allData.vip) {
                this.$router.push({
                    path: "/recharge?type=vip"
                });
            } else if (this.allData.curDiamond < this.allData.discountDiamond) {
                this.$router.push({
                    path: "/recharge?type=diamond"
                });
            } else {
                this.showDiamond = true;
            }
        },
        async onClickBuyDiamond() {
            // 购买钻石
            if (this.allData.curDiamond < this.allData.diamond) {
                this.$router.push({
                    path: "/recharge?type=diamond"
                });
            } else {
                this.showDiamond = true;
            }
        },
        async payDiamond() {
            if (this.allData.discountDiamond > this.allData.curDiamond) {
                this.$toast('对不起，钻石余额不足');
                return;
            }
            // 购买
            let res = await this.$api.buyVideo(this.video.id);

            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.playURL = this.allData.url + "&pid=" + this.$env.pid + "&domain=" + this.$checkLine.getResBaseUrl();
            console.log("play loadVideoByVid set src", this.playURL);
            this.preloadVideo(this.playerElm, this.playURL, this.video.coverURL, true, true);

            this.allData.buyVideo = true;
            this.showDiamond = false;
        },
        onClickAd(url) {
            if (url && url != "") {
                window.open(url);
            }
        },
        onClickUser() {
            this.$router.push({
                path: "/user",
                query: {
                    uid: this.video.user.uid
                }
            });
        },
        formatSecond(time) {
            return utils.formatSeconds(time);
        },
        async onLoadVideoData() {
            console.log("play onLoadVideoData", this.curVideoPage);
            let curPageDatas = [];
            if (this.curVideoPage == 1) {
                curPageDatas = this.allData.otherVideos;

            }
            if (curPageDatas.length == 0) {
                let res = await this.$api.getUserVideos(this.video.user.uid, { timeType: 1, page: this.curVideoPage, pageSize: this.mpageSize });

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                if (res && res.data) {
                    curPageDatas = res.data;
                }
            }

            this.$nextTick(() => {
                if (!this.$refs.videoList) {
                    return;
                }
                if (curPageDatas && curPageDatas.length > 0) {
                    this.curVideoPage++;
                    this.$refs.videoList.concatData(curPageDatas);

                }
                if (curPageDatas.length < this.mpageSize) {
                    this.$refs.videoList.finished();
                } else if (curPageDatas && curPageDatas.length == 0) {
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
        onClickTag(tagid) {
            this.$router.push({
                path: "/tag",
                query: {
                    tagid: tagid
                }
            });
        },
        async onClickLike() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            if (this.apiState.userLiking) {
                return;
            }
            this.apiState.userLiking = true;
            if (this.userLiked) {
                this.userLiked = false;
                this.video.likedCnt--;
                let res = await this.$api.unLikeVideo(this.video.id);

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    this.video.likedCnt++;
                    this.userLiked = true;

                    return;
                }
            } else {
                this.userLiked = true;
                this.video.likedCnt++;
                let res = await this.$api.likeVideo(this.video.id);

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    this.video.likedCnt--;
                    this.userLiked = false;
                    return;
                }
            }
            this.apiState.userLiking = false;

        },
        onClickShare() {
            console.log("onClickShare");
            this.showShare = true;
        },
        async onClickCollect() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            if (this.apiState.userCollecting) {
                return;
            }
            this.apiState.userCollecting = true;
            if (this.userCollected) {
                this.userCollected = false;
                this.video.collectedCnt--;
                let res = await this.$api.unCollectVideo(this.video.id);

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    this.video.collectedCnt++;
                    this.userCollected = true;
                    return;
                }
            } else {
                this.userCollected = true;
                this.video.collectedCnt++;
                let res = await this.$api.collectVideo(this.video.id);

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    this.video.collectedCnt--;
                    this.userCollected = false;
                    return;
                }
            }
            this.apiState.userCollecting = false;
        },
    },

}
</script>
<style lang="less" scoped>
.flex-safe-top {
    height: var(--safe-top);
    position: fixed;
    width: 100%;
    background: @theme-color;
    top: 0;
}

.userVideobox {
    width: 95%;
    margin: 0 auto;
}

.videoPageBox {
    // min-height: calc(100vh - 1.6rem);
    background: @theme-color;
}
.otherBody {
    padding-bottom: 0.25rem;
    // padding-top: 0.5rem;
}
.shoucang-img {
    color: @play-bg-color5;
}
.mobile.landscape {
    .top-head,
    .top-navbar {
        display: none;
    }
    .videoBox {
        width: 100vw;
        height: 100vh;
        margin-top: 0px;
    }
    .infobox .pop {
        display: none !important;
    }

    .otherBody,
    .otherVideo {
        display: none !important;
    }
}

.top-navbar .avater img {
    display: block;
    margin-top: -3px;
}

.ad-swipebox {
    width: 100%;
    max-height: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .van-skeleton__row {
        width: 100% !important;
        height: 100%;
    }
}
.vpalyback {
    width: 0.3rem;
}
.videoBox {
    width: 100%;
    position: relative;
}
.mplay {
    width: 100% !important;
    height: 100% !important;
}
.videoTags {
    margin: 0.25rem;
    .van-tag {
        background-color: @play-bg-color4;
        color: @play-font-color3;
    }
    /* height: 1rem; */
}
.videoTags span {
    margin: 5px;
    font-size: 0.4rem;
}

.des {
    color: @play-font-color4;
    font-size: 0.35rem;
    margin-left: 0.25rem;
    margin-top: 0.25rem;
}
.actionBtns {
    display: flex;

    .van-skeleton__row {
        height: 40px;
    }
}
.shoucang {
    flex: 1;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .num {
        height: 20px;
        line-height: 20px;
        color: @text-color;
        font-size: 0.4rem;
        margin-left: 0.2rem;
    }
}
.like {
    flex: 1;
    display: flex;
    align-items: center;
    height: 2rem;
    // background: @content-color;
    padding: 0 0.2rem;
    border-radius: 0.25rem;
    justify-content: center;
}
.like div img {
    width: 1rem;
}
.loveNum {
    color: @play-font-color4;
    font-size: 0.35rem;
}
.loveText {
    color: @play-font-color4;
    font-size: 0.35rem;
    margin-top: 0.06rem;
}
.loveRight {
    margin-left: 0.4rem;
}
.videoSwipebox {
    width: 100%;
    height: 15vh;
    background-color: black;
    /* display: flex; */
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.videoSwipebox img {
    border-radius: 0.25rem;
}
.videoTop {
    // height: calc(56vw + 5vh);
    width: 100%;
    .top-head {
        height: 46px;
    }
}

.vpuserBox {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-right: 40px;
}
.avater {
    margin-left: 0.13rem;
    width: 0.7rem;
    height: 0.7rem;
    display: flex;
    align-items: center;
}

.name {
    font-size: 0.35rem;
    color: @theme-color2;
    margin-left: 0.2rem;
}

.subvpRight {
    width: 1.8rem;
    // height: 0.8rem;
}
.otherViodeTitle {
    font-size: 0.45rem;
    color: @text-color;
    font-weight: 700;
    padding: 0.2rem;
    /* position: sticky;
    position: -webkit-sticky;
    top: calc(6vh + 56vw); */
    background: @theme-color;
    width: 100%;
}
.infobox .pop {
    position: absolute;
    top: 2.85rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    display: inline-block;
    height: 1.1rem;
    z-index: 100;
}
.pop .vip {
    width: 44%;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    margin: 0 auto;
    color: @play-font-color2;
    border-radius: 0.5rem;
    background: @play-bg-color3;
}

.pop .diamond {
    padding: 0 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.pop .diamond .diamondPrice {
    color: @play-font-color2;
    border-radius: 0.5rem;
    background: @play-bg-color2;
    width: 3.5rem;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.38rem;
}

.pop .diamond .vipDiamondPrice {
    width: 3.5rem;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.38rem;
    background-color: #edb310ad;
    color: @text-color;
    border-radius: 0.5rem;
}
.titlebox {
    font-size: 0.38rem;
    color: @home-font-color3;
    margin: 0.25rem;
    text-overflow: ellipsis;
    /* white-space: nowrap;
  overflow: hidden; */
    width: 90%;
}
.closeBtn {
    position: fixed;
    right: 0.6rem;
    top: calc(0.5rem + var(--safe-top));
    opacity: 0.6;
    color: #fff;
}
.video-skeleton {
    height: 100%;
    padding: 0 0;
    .van-skeleton__row {
        width: 100% !important;
        height: 100%;
    }
}

.top-head {
    .van-skeleton {
        margin: 5px 0;
    }
}
</style>