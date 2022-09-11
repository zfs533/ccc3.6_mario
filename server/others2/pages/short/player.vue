<template>
    <div class="shortVpBox">
        <!-- <img :src="defaultPoster" class="videoCover bottomImg"> -->
        <symbol id="plyr-volume" viewBox="0 0 18 18">
            <path d="M15.6 3.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4C15.4 5.9 16 7.4 16 9c0 1.6-.6 3.1-1.8 4.3-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3C17.1 13.2 18 11.2 18 9s-.9-4.2-2.4-5.7z"></path>
            <path d="M11.282 5.282a.909.909 0 000 1.316c.735.735.995 1.458.995 2.402 0 .936-.425 1.917-.995 2.487a.909.909 0 000 1.316c.145.145.636.262 1.018.156a.725.725 0 00.298-.156C13.773 11.733 14.13 10.16 14.13 9c0-.17-.002-.34-.011-.51-.053-.992-.319-2.005-1.522-3.208a.909.909 0 00-1.316 0zm-7.496.726H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"></path>
        </symbol>
        <symbol id="plyr-muted" viewBox="0 0 18 18">
            <path d="M12.4 12.5l2.1-2.1 2.1 2.1 1.4-1.4L15.9 9 18 6.9l-1.4-1.4-2.1 2.1-2.1-2.1L11 6.9 13.1 9 11 11.1zM3.786 6.008H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"></path>
        </symbol>
        <div class="safe-top findTop" v-if="!hasTabbar">
            <div class="findTL" @click="onClickLeft">
                <van-icon name="arrow-left" color="#fff" size="28" />
            </div>
            <div class="findTR" @click="onClickSearch">
                <van-icon name="search" color="#fff" size="25" />
            </div>
        </div>
        <van-swipe ref="videoSwipe" :style="{height: `${swipeHeight}px`}" :show-indicators="false" :initial-swipe="0" vertical :duration="300" :stop-propagation="false" @change="onChangeVideo">
            <van-swipe-item v-for="(curData, playerId) of playerDatas" :key="playerId" :style="{height: `${swipeHeight}px`}">
                <div class="svideoBox" :style="{height: `${swipeHeight}px`}">
                    <div class="mvb">
                        <!-- <span style="color:#fff">{{playerId}}-{{curDataIndex}}</span> -->
                        <video :id="playerId" :class="`mplay ${curData.video.imgClass}`" :poster="curData.video.base64ImgData" @click="onClickVideo(curData, $event)" @dblclick="onDbClickVideo(curData, $event)" :height="swipeHeight" webkit-playsinline="true" x5-playsinline="" playsinline preload="metadata" x-webkit-airplay="allow" x5-video-orientation="portrait"> </video>
                        <!-- <img :src="curData.video.base64ImgData" :style="{visibility: curData.hidePoster ? 'hidden': 'visible' }" :class="`videoCover ${curData.video.imgClass}`"> -->
                    </div>
                    <div>
                        <div class="footerInfo">

                            <!-- <div v-if="!userInfo.vipLevel && userInfo.dailyVideoTimes > 0" class="freeTimes" @click="onClickOpenVip">今日免费观影次数 {{remainTimes}}/{{userInfo.dailyVideoTimes}}</div> -->
                            <div class="svUser">
                                <div class="svname" @click="onClickUser(curData)">@{{curData.video.user.username}}</div>
                                <div class="subvpRight">
                                    <van-tag v-if="curData.userFollowed" plain round type="primary" color="#fff" text-color="#fff">你的关注</van-tag>
                                </div>
                            </div>
                            <div class="titleText">{{curData.video.name}} <span v-for="tag in curData.video.tags" :key="tag.id" @click='onClickTag(tag.id)'> #{{tag.name}} </span></div>
                            <div class="des">
                                热度 {{formatNumber2(curData.video.hot)}}
                                <span>·</span>
                                时长 {{formatSeconds(curData.video.time)}}
                                <!-- <span>·</span>
                                {{ChargeType[curData.video.payType]}} -->
                            </div>
                            <div class="infobox" v-if="(!userInfo.vipLevel && (curData.video.payType == 3))|| (!curData.buyVideo && (curData.video.payType == 4))">
                                <div class="pop">
                                    <div class="vip" v-if="!curData.vip && (curData.video.payType == 3)" @click="onClickOpenVip">开通VIP观看完整版，享更多特权</div>
                                    <div class="diamond" v-else-if="!curData.buyVideo && (curData.video.payType == 4)">
                                        <div class="diamondPrice" @click="onClickBuyDiamond(curData)">{{curData.diamond}}钻石购买完整版</div>
                                        <div class="vipDiamondPrice" @click="onClickBuyVipDiamond(curData)">{{curData.discountDiamond}}钻石(VIP专享)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="collect">
                            <div class="guanzhu">
                                <div @click="onClickUser(curData)" style="width:100%;height:100%">
                                    <usericon class="avater" :imgUrl="curData.video.user.avatarURL" />
                                </div>
                                <div v-if="!curData.userFollowed" class="follow-btn" @click="onClickFollow(curData)">
                                    <img src="~/assets/img/jia.png">
                                </div>
                                <div v-else @click="onClickFollow(curData)" class="follow-btn">
                                    <img src="~/assets/img/gou.png">
                                </div>
                            </div>
                            <div @click="onClickLike(curData)">
                                <!-- <van-icon name="like" :color="curData.userLiked ? 'red': '#fff'" size="28" /> -->
                                <div class="heartBox">
                                    <div :class="`heartBtn ${curData.userLiked ? 'active':''}`"></div>
                                </div>
                                <div class="num">{{formatNumber2(curData.video.likedCnt)}}</div>
                            </div>
                            <div class="chat" @click="onClickChat(curData)">
                                <van-icon name="chat" color='#fff' size="28" />
                                <div class="num">{{formatNumber2(curData.video.commentCnt)}}</div>
                            </div>
                            <div class="shoucang" @click="onClickCollect(curData)">
                                <van-icon name="star" :color="curData.userCollected?'rgb(229, 32, 71)':'#fff'" size="28" />
                                <div class="num">{{formatNumber2(curData.video.collectedCnt)}}</div>
                            </div>
                            <div @click="onClickMuted()">
                                <svg class="volumeIcon" aria-hidden="true" focusable="false">
                                    <use :xlink:href="playMuted?'#plyr-muted':'#plyr-volume'"></use>
                                </svg>
                            </div>
                            <div @click="onClickShare()">
                                <van-icon name="share" color="#fff" size="28" />
                            </div>
                        </div>
                    </div>
                    <div class="control">
                        <van-icon name="play-circle-o" color="white" size="60" style="opacity: 0.5" v-show="isVideoPaused" class="play" @click="onClickVideo(curData)" />
                    </div>
                    <div class="process swiper-no-swiping" :style="isPressProgress?('height:5px;color:#fff'):('height:2px;color:#ccc')" v-show="isPlay[playerId]">
                        <div v-show="isPressProgresAndMove" class="timeBg"> </div>
                        <div :class="isPressProgress? 'buffer2':'buffer'" :style="{width: `${curData.bufferProcess}%` }"></div>
                        <div :class="isPressProgress? 'play2':'play'" :style="{width: `${curData.playProcess}%` }"></div>
                        <div :class="isPressProgress? 'big-cycle':'small-cycle'" :style="{left: `${curData.playProcess}%`}"></div>
                        <div v-if="!cannotPlay" class="progressControl" @touchstart="(e)=>{touchStart(e,playerId)}" @touchmove="(e)=>{touchMove(e,curData)}" @touchend="(e)=>{touchEnd(e,curData)}"></div>
                        <div v-show="isPressProgresAndMove" class="progressControlTime">{{curProgressTime}}</div>
                    </div>
                    <div class="videoLoading" v-show="!isPlay[playerId]">
                        <div></div>
                    </div>

                </div>
            </van-swipe-item>
        </van-swipe>
        <div style="width:100%;height:100%">
        </div>
        <div class="comments">
            <comment-area ref="refCommentArea" />
        </div>
        <!-- <van-share-sheet v-model="showShare" :options="shareOptions" title="立即分享给好友" /> -->
        <van-overlay :show="showShare" @click="closeShare" z-index="2000" class="overlay">
            <div class="closeBtn">
                <van-icon name="cross" size="30" color="#fff" />
            </div>
            <Share :show="showShare" />
        </van-overlay>
        <van-overlay :show="showVip" @click="closeVip" z-index="2000" class="overlay">
            <div class="closeBtn">
                <van-icon name="cross" size="30" color="#fff" />
            </div>
            <VipTip />
        </van-overlay>
        <van-overlay :show="showDiamond" @click="closeVip" z-index="2000">
            <div class="closeBtn">
                <van-icon name="cross" size="30" />
            </div>

            <DiamondTip :discountDiamond="curVideo.discountDiamond" :diamond="curVideo.diamond" @buy="()=>onClickBuyVipDiamond(curVideo)" />
        </van-overlay>
    </div>
</template>
<script>
import { defaultRes } from '~/assets/js/constants';
import * as utils from "~/assets/js/utils";
import Followbtn from '~/components/followbtn.vue';
import Usericon from '~/components/usericon.vue';
import Share from '~/components/videoShare.vue';
import VipTip from '~/components/vipTip.vue';

const constants = {
    containCls: "contain-video",
    coverCls: "cover-video"
};

import commentArea from '~/components/commentArea.vue';
export default ({
    name: 'player',
    props: {
        tabbar: Boolean,
    },
    components: { Usericon, Followbtn, Share, VipTip, commentArea },
    data() {
        const defaultPageSize = 20;
        const playerIds = ["videoA", "videoB", "videoC"];
        const playerDatas = {};
        for (const playerId of playerIds) {
            playerDatas[playerId] = {
                videoElm: null,
                url: "",
                bufferProcess: 0,
                playProcess: 0,
                buyVideo: false,
                userLiked: false,
                userCollected: false,
                userFollowed: false,
                video: {
                    id: "",
                    tag: [],
                    time: 0,
                    name: "",
                    hot: 0,
                    likedCnt: 0,
                    collectedCnt: 0,
                    payType: 2,
                    playCnt: 0,
                    price: 0,
                    user: {
                        username: "",
                        avatarURL: "",
                        uid: 0,
                    }
                }
            };
        }

        return {
            intervalId: undefined,
            apiState: {
                userLiking: false,
                userCollecting: false,
                userFollowing: false,
            },
            slideCount: 0,
            showVip: false,
            showDiamond: false,
            inPageTime: 0,
            ChargeType: ['', '付费类型', "免费", "VIP", "钻石"],
            hasTabbar: this.tabbar || false,
            dataFlished: false,

            vid: null,
            swipeHeight: 0,
            isActive: false,
            showShare: false,
            isVideoPaused: false,
            shareOptions: [
                { name: '复制链接', icon: 'link', },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
            playerIds: playerIds,
            curVideo: {},
            playerDatas: playerDatas,
            curPage: 1,
            pageSize: defaultPageSize,
            playerVids: [],
            videoDatas: [],
            curPlayerIndex: 0,
            curDataIndex: 0,
            maxCacheVideoCount: defaultPageSize * 3,
            isDataLoading: false,
            playMuted: false,
            eventData: {
                videoClickTimer: null
            },
            isPlay: [],

            isPressProgress: false,
            isPressProgresAndMove: false,
            startX: 0,
            curConVideo: undefined,
            curProgressTime: '',
            totalProgressTime: '',


            showCommentArea: false,
            timer: null,
            timer_watch: null,
            time_watch: 0,
            inPageTime: 0,


            cannotPlay: false,

            userInfo: this.$userStore.getMyInfo(),


            isActivePage: false,
            remainTimes: 0,
        };
    },
    created() {
        console.log("shortPlayer play created");
        if (this.$route.query.vid) {
            this.hasTabbar = false;
        }
        this.$nuxt.$on("refreshShort", () => {
            if (this.isDataLoading) return;

            this.$toast("换一换");
            this.clearPlayers();

            this.loadShortVideoData(this.curPage++, this.pageSize).then((ok) => {
                if (ok) this.onChangeVideo(this.curPlayerIndex, true);
            });
        });


        this.$nuxt.$on("login", () => {
            console.log("shortPlayer relogin event");
            this.clearPlayers();

            this.loadShortVideoData(this.curPage++, this.pageSize).then((ok) => {
                if (ok) this.onChangeVideo(this.curPlayerIndex, true);
            });
        });

        this.$nuxt.$on('updateTotalCommentCnt', this.updateTotalCommentCnt);
    },
    async mounted() {
        console.log("shortPlayer mounted");
        this.userInfo = this.$userStore.getMyInfo();
        let tabbar = document.querySelector(".tabbar");
        let screenWidth = (document.documentElement.clientWidth || document.body.clientWidth);
        let screenHeight = (document.documentElement.clientHeight || document.body.clientHeight);

        let screenRatio = screenWidth / screenHeight;
        for (const playerId in this.playerDatas) {
            let playerData = this.playerDatas[playerId];
            let video = document.querySelector(`#${playerId}`);
            video.muted = this.playMuted;

            video.addEventListener('canplay', async () => {
                if (video.id !== this.playerIds[this.curPlayerIndex]) {
                    this.pauseVideo({ video, retryTimes: 2 });
                    return;
                }
                let videoRatio = video.videoWidth / video.videoHeight;
                console.log(`shortPlayer canplay event ${video.id} autoplay:${video.autoplay} muted:${video.muted} playing:${video.playing} screenRatio: ${screenRatio}, videoRatio: ${videoRatio}`);
                if (video.videoWidth < video.videoHeight) {
                    playerData.video.imgClass = constants.coverCls;
                } else {
                    playerData.video.imgClass = constants.containCls;
                }
                if (video.autoplay && !video.playing && !this.cannotPlay) {
                    console.log(`shortPlayer canplay event playVideo ${video.id}  play`);
                    await this.playVideo({ video, retryTimes: 3 });
                }
            });
            video.addEventListener("progress", () => {
                var bufferedEnd = 0;
                try {
                    bufferedEnd = video.buffered.end(video.buffered.length - 1);
                } catch { }
                var duration = video.duration;
                if (bufferedEnd > 0 && duration > 0) {
                    let process = ((bufferedEnd / duration) * 100);
                    if (process > 99) {
                        process = 100;
                    }
                    playerData.bufferProcess = process;
                }
            });

            video.addEventListener("timeupdate", () => {
                var duration = video.duration;
                if (!this.isActivePage || this.isPressProgress || this.cannotPlay) {
                    video.pause();
                    return;
                }
                if (duration > 0) {
                    let process = ((video.currentTime / duration) * 100);
                    if (process > 99) {
                        process = 100;
                    }
                    playerData.playProcess = process;
                    // console.log("shortPlayer timeupdate", video.id, playerData.videoElm.id, playerData.playProcess);
                }
                if (video.id === this.playerIds[this.curPlayerIndex]) {
                    if (video.currentTime > 0.1) {
                        if (!this.playerDatas[this.playerIds[this.curPlayerIndex]].hidePoster) {
                            this.playerDatas[this.playerIds[this.curPlayerIndex]].hidePoster = true;
                        }
                        if (video.style.visibility != "visible") {
                            this.$nextTick(() => {
                                video.style.visibility = "visible";
                            });
                        }



                        // if (this._showVip) this.showVip = true;
                    }
                    if (video.currentTime > 0.2) {
                        if (this.slideCount % 6 == 0 && this.slideCount != 0 && !this.hasShow) {
                            console.log('出vip弹窗');
                            this.showVip = true;
                            this.hasShow = true;
                            this.pauseVideo({ video, retryTimes: 3 });
                        }
                    }
                }
            });
            video.addEventListener("ended", () => {
                console.log("shortPlayer ended");
                if (this.isPressProgress) {
                    video.pause();
                    return;
                }
                playerData.bufferProcess = 100;
                playerData.playProcess = 100;

                video.currentTime = 0;
                if (!this.userInfo.vipLevel && playerData.video.payType == 3) {
                    this.showVip = true;
                }
                else if (!playerData.buyVideo && playerData.video.payType == 4) {
                    this.showDiamond = true;
                }
                else {
                    this.playVideo({ video, retryTimes: 3 });
                }
                if (!playerData.hasWatch) {
                    playerData.hasWatch = true;
                }

            });

            video.addEventListener('pause', () => {
                if (this.timer_watch) {
                    clearInterval(this.timer_watch);
                    this.timer_watch = 0;
                }
            }, false);
            video.addEventListener("play", () => {
                if (!this.isActivePage) {
                    video.pause();
                    return;
                }
                if (!this.timer_watch) {
                    this.timer_watch = setInterval(() => {
                        this.time_watch++;
                    }, 1000);
                }

                let activePlayer = this.playerDatas[this.playerIds[this.curPlayerIndex]].videoElm;
                console.log("shortPlayer play event", video.id, activePlayer.id);

                if (video.id !== activePlayer.id) {
                    this.pauseVideo({
                        video: video,
                        retryTimes: 5
                    });
                } else {
                    if (this.time_watch == 0) {
                        this.time_watch++;
                        let myInfo = this.$userStore.getMyInfo();

                        if (false)
                            if (playerData.buyVideo == false && !myInfo.vip && myInfo.dailyVideoTimes > 0) {
                                console.log('myInfo.videoHistory = ', myInfo.videoHistory);
                                if (!myInfo.videoHistory.includes(playerData.video.id)) {
                                    if (this.remainTimes <= 0) {
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
                                            this.cannotPlay = false;
                                            this.playVideo({
                                                video: video,
                                                retryTimes: 5
                                            });
                                        });
                                        this.pauseVideo({
                                            video: video,
                                            retryTimes: 5
                                        });
                                        this.cannotPlay = true;
                                        return;
                                    }
                                    this.remainTimes = this.remainTimes - 1;
                                    this.cannotPlay = false;
                                    // myInfo.videoHistory.push(playerData.video.id);
                                    // this.userInfo.remainTimes = this.userInfo.remainTimes <= 0 ? 0 : this.userInfo.remainTimes - 1;
                                    // this.$userStore.updateUserInfo({ remainTimes: myInfo.remainTimes - 1, videoHistory: myInfo.videoHistory });
                                }
                            } else {
                                this.cannotPlay = false;
                            }
                    }
                    if (this.showVip || this.showDiamond) {
                        this.pauseVideo({
                            video: video,
                            retryTimes: 5
                        });
                        this.isVideoPaused = true;
                        return;
                    }
                    if (this.isVideoPaused) {
                        this.isVideoPaused = false;
                    }
                }
                if (this.cannotPlay) {
                    this.pauseVideo({
                        video: video,
                        retryTimes: 5
                    });
                }
            });
            playerData.videoElm = video;
        }

        // let swipeHeight = screenHeight;
        // if (this.hasTabbar) {
        //     swipeHeight = screenHeight - (tabbar ? tabbar.clientHeight || 50 : 50);
        // }
        // if (this.swipeHeight !== swipeHeight) {
        //     this.swipeHeight = swipeHeight;
        // }

        if (this.$route.query.vid) {
            this.slideCount = 0;
            this.vid = this.$route.query.vid;
            await this.loadShortVideoByVid(this.$route.query.vid);
        } else {
            let data = await this.$main.getShortData();
            if (data && data.length > 0) {
                this.curPage = 1;
                this.videoDatas = this.videoDatas.concat(data);
            } else {
                await this.loadShortVideoData(1);
            }
        }
        this.onChangeVideo(-1, true);
    },
    async activated() {
        console.log("shortPlayer activated");
        this.isActivePage = true;

        this.userInfo = this.$userStore.getMyInfo();

        this.remainTimes = this.userInfo.remainTimes;
        console.log('myInfo = ', this.userInfo);
        this.inPageTime = Date.now();
        if (this.vid && this.vid !== this.$route.query.vid) {
            this.clearPlayers();

            await this.loadShortVideoByVid(this.$route.query.vid);
            this.onChangeVideo(-1, true);
        } else {
            console.log("shortPlayer curPlayerIndex:", this.curPlayerIndex, "curDataIndex:", this.curDataIndex);
            if (this.curPlayerIndex === 0) {
                this.isActive = true;
            } else {
                this.$refs.videoSwipe.swipeTo(this.curPlayerIndex);
            }
        }

        this.intervalId = setInterval(() => {
            this.updateProcess();
        }, 1000);

    },
    deactivated() {
        let playerData = this.playerDatas[this.playerIds[this.curPlayerIndex]];
        this.updateHistory(playerData);
        this.isActive = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.pauseAllVideo();


        clearTimeout(this.timer);
        clearInterval(this.timer_watch);
        this.timer_watch = 0;
        this.inPageTime = 0;
        this.time_watch = 0;
        this.isActivePage = false;
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        clearInterval(this.timer_watch);
        this.timer_watch = 0;
        this.time_watch = 0;
        this.inPageTime = 0;
        this.clearPlayers();
    },
    methods: {

        updateTotalCommentCnt(param) {
            let curVideoData = this.videoDatas[this.curDataIndex];
            if (!curVideoData || !curVideoData.video)
                return;
            if (curVideoData.video.id == param.id) {
                curVideoData.video.commentCnt = param.totalCommentCnt;
            }
        },


        updateProcess() {
            if (this.isVideoPaused) return;

            let playerId = this.playerIds[this.curPlayerIndex];
            let playerData = this.playerDatas[playerId];
            let video = playerData.videoElm;
            if (video) {
                if (!this.isPlay[playerId]) return;

                if (video.buffered) {
                    var bufferedEnd = 0;
                    try {
                        bufferedEnd = video.buffered.end(video.buffered.length - 1);
                    } catch { }
                    var duration = video.duration;
                    if (bufferedEnd > 0 && duration > 0) {
                        let process = ((bufferedEnd / duration) * 100);
                        if (process > 99) {
                            process = 100;
                        }
                        playerData.bufferProcess = process;
                    }
                }
                {
                    var duration = video.duration;
                    if (duration > 0) {
                        let process = ((video.currentTime / duration) * 100);
                        if (process > 99) {
                            process = 100;
                        }
                        playerData.playProcess = process;
                    }
                }
            }
        },
        closeVip() {
            this.slideCount = 0;
            this.showVip = false;
            this.showDiamond = false;
            let playerData = this.playerDatas[this.playerIds[this.curPlayerIndex]];
            if (!playerData || !playerData.videoElm) {
                return;
            }
            this.playVideo({ video: playerData.videoElm, retryTimes: 2 });

        },
        closeShare() {
            this.showShare = false;
            let playerData = this.playerDatas[this.playerIds[this.curPlayerIndex]];
            if (!playerData || !playerData.videoElm) {
                return;
            }
            this.playVideo({ video: playerData.videoElm, retryTimes: 2 });
        },
        updateHistory(playerData) {
            if (!playerData || !playerData.videoElm) {
                return;
            }
            if (this.inPageTime == 0 || !this.isActivePage || this.time_watch < 1) {
                return;
            }
            let videoElm = playerData.videoElm;
            let time = Math.floor((Date.now() - this.inPageTime) / 1000);
            let param = {
                stayTime: time,
                watchedTime: this.time_watch,
                progressTime: videoElm.currentTime,
            };
            this.$api.updateVideoHistory(playerData.video.id, param);

        },

        updateHeight() {
            this.$nextTick(() => {
                let tabbar = document.querySelector(".tabbar");
                let screenHeight = document.documentElement.clientHeight;
                if (tabbar.offsetTop) {
                    console.log("shortPlayer updateHeight offsetTop", tabbar.offsetTop);
                    this.swipeHeight = tabbar.offsetTop;
                } else {
                    let swipeHeight = screenHeight;

                    if (this.hasTabbar) {

                        swipeHeight = screenHeight - (tabbar ? tabbar.clientHeight || 50 : 50);
                    } else {
                        swipeHeight = screenHeight - this.$env.safeAreaInsets.bottom + this.$env.safeAreaInsets.top;
                    }
                    if (this.swipeHeight !== swipeHeight) {
                        console.log("shortPlayer updateHeight swipeHeight", swipeHeight);
                        this.swipeHeight = swipeHeight;
                    }
                }
                this.$nextTick(() => {
                    if (this.$refs.videoSwipe) {
                        this.$refs.videoSwipe.resize();
                    }
                });
            });
        },
        clearPlayers() {
            this.videoDatas = [];
            this.curDataIndex = 0;
            this.isVideoPaused = false;
            this.$nextTick(() => {
                for (const key in this.playerDatas) {
                    if (!this.playerDatas[key]) continue;
                    let video = this.playerDatas[key].videoElm;
                    if (video) {
                        try {
                            video.src = "";
                            video.imgClass = constants.containCls;
                            video.base64ImgData = defaultRes.videoCoverDefault;
                            if (video.hls) {
                                video.hls.destroy();
                                video.hls = null;
                            }
                        } catch { }
                    }
                }
            });
        },
        async pauseVideo({ video, retryTimes, delay }) {
            if (!video.paused) {
                console.log(`shortPlayer pauseVideo ${video.id} canplay autoplay:${video.autoplay} muted:${video.muted} paused:${video.paused}`);
                try {
                    if (Hls.isSupported()) {
                        if (video.hls) {
                            console.log(`shortPlayer pauseVideo ${video.id} hls stopLoad`);
                            video.hls.stopLoad();
                        }
                    }
                    // if (video.muted !== this.playMuted) {
                    //     video.muted = this.playMuted;
                    // }
                    await video.pause();
                } catch (e) {
                    console.warn(`shortPlayer pauseVideo ${video.id} play error ${e.message}`);
                }
                if (!video.paused) {
                    if (!delay) delay = 400;
                    console.log(`shortPlayer pauseVideo ${video.id} play falid and delay ${delay} replay ${retryTimes}`);
                    if (retryTimes > 0) {
                        setTimeout(this.pauseVideo, delay, { video, retryTimes: retryTimes - 1 });
                    }
                }
            }
            if (video.paused) {
                // this.isPlay[video.id] = false;
                console.log(`shortPlayer pauseVideo ${video.id} paused:${video.paused} currentTime: ${video.currentTime} muted:${video.muted}`);
            }
        },
        async playVideo({ video, retryTimes, delay }) {
            if (!this.isActivePage) {
                return;
            }
            if (this.isPressProgress || this.showDiamond || this.showVip) {
                return;
            }
            this.isVideoPaused = false;
            this.isPlay[video.id] = false;
            if (!video.playing) {
                console.log(`shortPlayer playVideo ${video.id} canplay autoplay:${video.autoplay} muted:${video.muted} playing:${video.playing}`);
                try {
                    if (Hls.isSupported()) {
                        if (video.hls) {
                            console.log(`shortPlayer playVideo ${video.id} hls startLoad`);
                            video.hls.startLoad();
                        }
                    }
                    if (video.muted !== this.playMuted) {
                        video.muted = this.playMuted;
                    }
                    // video.currentTime = 0;
                    video.currentTime = video.currentTime || 0.1;
                    await video.play();
                } catch (e) {
                    console.warn(`shortPlayer playVideo ${video.id} play error ${e.message}`);
                }
                if (!video.playing) {
                    if (!delay) delay = 400;
                    console.log(`shortPlayer playVideo ${video.id} play falid and delay ${delay} replay ${retryTimes}`);
                    if (retryTimes > 0) {
                        setTimeout(this.playVideo, delay, { video, retryTimes: retryTimes - 1 });
                    }
                }
            }
            if (video.playing) {
                //播放中
                video.currentTime = video.currentTime || 0;
                this.isPlay[video.id] = true;
                console.log(`shortPlayer playVideo ${video.id} playing:${video.playing} currentTime: ${video.currentTime} muted:${video.muted}`);
            }
        },
        preloadVideo(playerData, coverURL, vUrl, autoplay = false) {
            if (playerData) {
                playerData.bufferProcess = 0;
                playerData.playProcess = 0;
            }
            let video = playerData.videoElm;
            let playerPoster = video.getAttribute("data-poster");
            // let playerPoster = playerData.video.base64ImgData;
            if (autoplay) {
                playerData.hidePoster = false;
            } else {
                playerData.hidePoster = true;
            }
            if (playerPoster !== coverURL) {
                if (!playerData.video.base64ImgData) {
                    playerData.video.imgClass = constants.containCls;
                    playerData.video.base64ImgData = defaultRes.videoCoverDefault;
                    playerData.hidePoster = false;
                    // video.poster = defaultRes.videoCoverDefault;
                    this.$fileloader.dowloadJpegImg(coverURL, 640, (url, data) => {
                        console.log("shortPlayer coverURL callback", coverURL);
                        if (data) {
                            video.setAttribute("data-poster", coverURL);
                            // playerData.video.base64ImgData = coverURL;
                            var img = new Image();
                            img.src = data;
                            img.onload = () => {
                                if (img.width < img.height) {
                                    playerData.video.imgClass = constants.coverCls;
                                } else {
                                    playerData.video.imgClass = constants.containCls;
                                }
                                playerData.video.base64ImgData = data;
                            };
                        }
                        else {
                            console.log("shortPlayer", coverURL, "解密失败");
                        }
                    });
                } else {
                    video.setAttribute("data-poster", coverURL);

                    // video.poster = playerData.video.base64ImgData;
                    let base64ImgData = playerData.video.base64ImgData;
                    playerData.video.imgClass = constants.containCls;
                    playerData.video.base64ImgData = defaultRes.videoCoverDefault;

                    var img = new Image();
                    img.src = base64ImgData;
                    playerData.hidePoster = false;
                    img.onload = function () {
                        if (img.width < img.height) {
                            playerData.video.imgClass = constants.coverCls;
                        } else {
                            playerData.video.imgClass = constants.containCls;
                        }
                        playerData.video.base64ImgData = base64ImgData;
                    };
                }
            }
            // video.style.visibility = "hidden";
            video.pause();
            if (autoplay) {
                video.autoplay = true;
            } else {
                video.autoplay = false;
            }
            if (Hls.isSupported()) {
                if (video.hls) {
                    if (video.hls.url === vUrl) {
                        return;
                    }
                    video.hls.destroy();
                    video.hls = null;
                }
                video["hls"] = video.hls = new Hls({
                    autoStartLoad: true,
                    // startFragPrefetch: true,
                    debug: false
                });
                video.hls.attachMedia(video);
                video.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    video.hls.loadSource(vUrl);
                    video.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                        console.log("shortPlayer hls manifest loaded, found ", data);
                        // if (video.autoplay) {
                        //     console.log("autoPlay Video:", video.id, url);

                        //     video.play();
                        // }
                    });
                    hls.on(Hls.Events.ERROR, (event, data) => {
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

                console.log("shortPlayer preloadVideo:", video.id, vUrl);
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = vUrl;
                video.muted = true;
                video.currentTime = 0.1;
            }
            video.preload = "metadata";
        },
        pauseAllVideo() {
            this.isVideoPaused = true;
            for (const key in this.playerDatas) {
                let video = this.playerDatas[key].videoElm;
                video.pause();

                if (Hls.isSupported()) {
                    if (video.hls) {
                        console.log(`shortPlayer PrePlayer ${video.id} hls stopLoad`);
                        video.hls.stopLoad();
                    }
                }
            }
        },
        async playActiveVideo() {
            let curPlayer = this.playerDatas[this.playerIds[this.curPlayerIndex]].videoElm;
            if (curPlayer && curPlayer.playing) {
                if (curPlayer.ended) {
                    video.currentTime = 0;
                } else {
                    if (curPlayer.paused) {
                        this.isVideoPaused = false;
                        curPlayer.play();
                    }
                    else {
                        this.isVideoPaused = true;
                        curPlayer.pause();
                    }
                }
            } else {
                await this.playVideo({ video: curPlayer, retryTimes: 3 });
                if (this.isVideoPaused) {
                    this.isVideoPaused = false;
                }
            }
        },
        createHeart(e) {
            const heart = document.createElement('i');
            heart.classList.add('heart');
            heart.classList.add('van-icon');
            heart.classList.add('van-icon-like');

            const x = e.clientX;
            const y = e.clientY;

            const leftOffset = e.target.offsetLeft;
            const topOffset = e.target.offsetTop;

            const xInside = x - leftOffset;
            const yInside = y - topOffset;

            heart.style.top = `${yInside}px`;
            heart.style.left = `${xInside}px`;
            heart.style.color = "red";

            setTimeout(() => heart.remove(), 1000);
            return heart;
        },
        onClickVideo(curData, event) {
            if (this.eventData.videoClickTimer) {
                clearTimeout(this.eventData.videoClickTimer);
            }
            this.eventData.videoClickTimer = setTimeout(async () => {
                this.playActiveVideo();
            }, 200);

        },
        async onDbClickVideo(curData, event) {
            if (!this.$userStore.checkLogin()) {
                return;
            }

            if (this.eventData.videoClickTimer) {
                clearTimeout(this.eventData.videoClickTimer);
                this.eventData.videoClickTimer = null;
            }
            if (!curData.userLiked) {
                let res = await this.$api.likeVideo(curData.video.id);
                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                if (res.errorCode == 0) {
                    // userLiked = true;
                    curData.video.likedCnt++;
                    curData.userLiked = true;
                }
            }

            // 爱心动画
            {
                let vBox = document.querySelector(".shortVpBox");
                if (vBox) {
                    let heart = this.createHeart(event);
                    vBox.appendChild(heart);
                }
            }
        },
        initPreVideo(curPlayerIndex, preOffset) {
            let index = curPlayerIndex;
            let prePlayerIndex = index - preOffset;
            if (prePlayerIndex < 0) {
                prePlayerIndex = this.playerIds.length - preOffset;
            }
            let preDataIndex = this.curDataIndex - preOffset;
            if (preDataIndex < 0) {
                preDataIndex = this.videoDatas.length - preOffset;
                // this.$toast('到顶了');
            }

            let prePlayerData = this.playerDatas[this.playerIds[prePlayerIndex]];

            let prePlayer = prePlayerData.videoElm;
            if (prePlayer) {
                this.updateHistory(prePlayerData);
                clearTimeout(this.timer);
                clearInterval(this.timer_watch);
                this.inPageTime = Date.now();
                this.timer_watch = 0;
                this.time_watch = 0;

                let info = this.videoDatas[preDataIndex];
                if (!info) return;
                Object.keys(info).forEach(x => {
                    this.playerDatas[this.playerIds[prePlayerIndex]][x] = info[x];
                });

                let id = info.video.id;
                let playerVid = this.playerVids[prePlayerIndex];
                let url = info.url + "&pid=" + this.$env.pid + "&domain=" + this.$checkLine.getResBaseUrl();

                console.log(`shortPlayer PrePlayer ${prePlayer.id} 播放器: ${prePlayerIndex} 数据:${preDataIndex} P:${playerVid} <=> N:${id} 是否更新: ${playerVid !== id}`);

                if (playerVid !== id) {
                    this.playerVids[prePlayerIndex] = id;

                    this.preloadVideo(this.playerDatas[this.playerIds[prePlayerIndex]], info.video.coverURL, url);
                } else {
                    this.pauseVideo({ video: prePlayer, retryTimes: 2 });
                }
            }
        },
        initNextVideo(curPlayerIndex, nextOffset) {
            let index = curPlayerIndex;

            let nextPlayerIndex = index + nextOffset;
            if (nextPlayerIndex + nextOffset > this.playerIds.length) {
                nextPlayerIndex = nextOffset - 1;
            }
            let nextDataIndex = this.curDataIndex + nextOffset;
            if (nextDataIndex + nextOffset > this.videoDatas.length) {
                nextDataIndex = nextOffset - 1;
            }
            //缓存下一个视频
            let nextPlayerData = this.playerDatas[this.playerIds[nextPlayerIndex]];
            let nextPlayer = nextPlayerData.videoElm;
            if (nextPlayer) {
                let info = this.videoDatas[nextDataIndex];
                if (!info) return;

                Object.keys(info).forEach(x => {
                    this.playerDatas[this.playerIds[nextPlayerIndex]][x] = info[x];
                });

                let id = info.video.id;
                let playerVid = this.playerVids[nextPlayerIndex];

                let url = info.url + "&pid=" + this.$env.pid + "&domain=" + this.$checkLine.getResBaseUrl();
                console.log(`shortPlayer NextPlayer ${nextPlayer.id} 播放器: ${nextPlayerIndex} 数据:${nextDataIndex} P:${playerVid} <=> N:${id} 是否更新: ${playerVid !== id}`);
                if (playerVid !== id) {
                    this.playerVids[nextPlayerIndex] = id;

                    this.preloadVideo(this.playerDatas[this.playerIds[nextPlayerIndex]], info.video.coverURL, url);
                } else {
                    this.pauseVideo({ video: nextPlayer, retryTimes: 2 });
                }
            }
        },
        async onChangeVideo(index, first = false) {
            if (this.videoDatas.length === 0) {
                this.$nuxt.$emit("refreshShort");
            }

            if (!this.isActivePage) {
                return;
            }
            setTimeout(() => {
                if (first) {
                    this.isActive = true;
                } else {
                    if (!this.isActive) {
                        console.log("shortPlayer onChangeVideo isActive to true");
                        this.isActive = true;
                        return;
                    }
                }
                console.log("shortPlayer onChangeVideo isActive ", this.isActive);
                if (index < 0) {
                    this.curPlayerIndex = index = 0;
                    this.curDataIndex = 0;
                }
                let direction = 1; // -1 = up, 1 = down
                if (!first) {
                    if (this.curPlayerIndex == index || (index > this.curPlayerIndex && index === this.curPlayerIndex + 1) || (index < this.curPlayerIndex && index == 0 && this.curPlayerIndex === this.playerIds.length - 1)) {
                        // 顺滑
                        direction = 1;
                        this.curDataIndex = this.curDataIndex + 1;
                    } else if (index < this.curPlayerIndex || (index > this.curPlayerIndex && index === this.playerIds.length - 1)) {
                        // 倒滑
                        direction = -1;
                        this.curDataIndex = this.curDataIndex - 1;
                    }

                    if (this.curDataIndex === -1) {
                        this.curDataIndex = this.videoDatas.length - 1;
                    } else if (this.curDataIndex >= this.videoDatas.length) {
                        this.curDataIndex = 0;
                    }
                }
                console.log(`shortPlayer ${direction === 1 ? "顺滑" : "倒划"} 当前播放器:${index} / 数据(${this.curDataIndex}) 数据总量: ${this.videoDatas.length}`);

                let curPlayerData = this.playerDatas[this.playerIds[index]];
                let curPlayer = curPlayerData.videoElm;
                if (curPlayer) {
                    let info = this.videoDatas[this.curDataIndex];
                    if (info) {
                        console.log('shortPlayer info = ', info);
                        let id = info.video.id;
                        let playerVid = this.playerVids[index];
                        let url = info.url + "&pid=" + this.$env.pid + "&domain=" + this.$checkLine.getResBaseUrl();
                        console.log(`shortPlayer 当前播放器: ${index} 数据:${this.curDataIndex} P:${playerVid} <=> N:${id} first: ${first} 是否更新: ${playerVid !== id}`);
                        if (playerVid !== id) {
                            this.playerVids[index] = id;
                            Object.keys(info).forEach(x => {
                                curPlayerData[x] = info[x];
                            });
                            curPlayerData["vip"] = this.userInfo.vip;

                            this.preloadVideo(this.playerDatas[this.playerIds[index]], info.video.coverURL, url, first);
                        }
                        // this.pauseAllVideo();
                        if (this.userInfo && this.userInfo.vipLevel === 0 && ++this.slideCount % 6 == 0) {
                            this.$nextTick(() => {
                                this.showVip = true;
                            });
                        } else {
                            if (first) {
                                // curPlayer.autoplay = true;  
                            } else {
                                console.log("shortPlayer onChangeVideo playVideo", curPlayer.id, index);
                                this.playVideo({ video: curPlayer, retryTimes: 3 });
                            }
                        }
                    }
                }
                {
                    this.initPreVideo(index, 1);
                    // this.initPreVideo(index, 2);
                    // this.initPreVideo(index, 3);
                }
                {
                    this.initNextVideo(index, 1);
                    // this.initNextVideo(index, 2);
                    // this.initNextVideo(index, 3);
                }

                this.curPlayerIndex = index;

                if (this.curDataIndex === this.videoDatas.length - 3) {
                    console.log(`shortPlayer 开始请求新的视频数据, 当前页：${this.curPage} 数据Index: ${this.curDataIndex} 缓存总数据: ${this.videoDatas.length}`);
                    if (this.videoDatas.length >= this.maxCacheVideoCount) {
                        console.log(`shortPlayer 缓存数量${this.videoDatas.length} 超过 ${this.maxCacheVideoCount}, 开始清理前:${this.pageSize} `);
                        // 数大于缓存数量则 移除 最开始的一页数据
                        this.videoDatas = this.videoDatas.slice(this.pageSize);
                        this.curDataIndex = this.curDataIndex - this.pageSize;
                    }
                    this.loadShortVideoData(this.curPage++);
                }

                this.isPressProgress = false;
                this.isPressProgresAndMove = false;
                this.startX = 0;
                this.curProgressTime = '';
                this.totalProgressTime = '';
            }, 10);
        },

        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
        formatSeconds(time) {
            return utils.formatSeconds(time);
        },
        async loadShortVideoByVid(vid) {
            let res = await this.$api.getPlayVideoInfo(this.$route.query.vid);
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.curVideo = {
                vid: res.data.video.id,
                url: res.data.url,
                bufferProcess: 0,
                playProcess: 0,
                diamond: res.data.diamond,
                discountDiamond: res.data.discountDiamond,
                buyVideo: res.data.buyVideo,
                userLiked: res.data.userLiked,
                userCollected: res.data.userCollected,
                userFollowed: res.data.userFollowed,
                video: res.data.video
            };
            if (!this.curVideo.video.user) {
                this.$toast('获取视频数据错误');
            } else {
                this.videoDatas.push(this.curVideo);
            }
            await this.loadShortVideoData(1);
        },
        async loadShortVideoData(page, pageSize) {
            if (this.isDataLoading) return false;
            this.isDataLoading = true;
            console.log(`shortPlayer loadShortVideoData page ${page}`);
            this.curPage = page;
            let pa = {
                pid: this.$env.pid,
                page: this.curPage,
                pageSize: pageSize || this.pageSize
            };
            let res = await this.$api.getShortVideos(pa);
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            let tdata = res.data;
            if (tdata && tdata.length > 0) {
                if (tdata.length < this.pageSize) {
                    this.dataFlished = true;
                }
                for (const v of tdata) {
                    if (!v.video.user) {
                        continue;
                    }
                    this.$fileloader.dowloadJpegImg(v.video.coverURL, 640, (url, data) => {
                        if (data) {
                            v.video.coverURL = url;
                            var img = new Image();
                            img.src = data;
                            img.onload = function () {
                                if (img.width < img.height) {
                                    v.video.imgClass = constants.coverCls;
                                } else {
                                    v.video.imgClass = constants.containCls;
                                }
                                v.video.base64ImgData = data;
                                img = null;
                            };

                        }
                    });
                }
                this.videoDatas = this.videoDatas.concat(tdata);
            } else if (tdata.length == 0) {
                this.dataFlished = true;
            } else if (!tdata) {
                this.dataFlished = true;
            }
            this.isDataLoading = false;
            console.log(`shortPlayer loadShortVideoData page ${this.curPage} end 总数: ${this.videoDatas.length}`);
            return true;
        },
        onClickUser(data) {
            this.$router.push({
                path: "/user",
                query: {
                    uid: data.video.user.uid
                }
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
        onClickLeft() {
            this.$router.back();
        },
        onClickOpenVip() {
            // 开通vip
            this.$router.push({
                path: "/recharge?type=vip"
            });
        },
        onClickSearch() {
            this.$router.push({
                path: "/search"
            });
        },

        async onClickLike(curData) {
            if (!this.$userStore.checkLogin()) {
                return;
            }

            if (this.apiState.userLiking) {
                return;
            }
            this.apiState.userLiking = true;

            if (curData.userLiked) {
                curData.video.likedCnt--;
                curData.userLiked = false;
                let res = await this.$api.unLikeVideo(curData.video.id);

                if (res.errorCode !== 0) {
                    curData.video.likedCnt++;
                    curData.userLiked = true;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }

            } else {
                curData.video.likedCnt++;
                curData.userLiked = true;
                let res = await this.$api.likeVideo(curData.video.id);

                if (res.errorCode !== 0) {
                    curData.video.likedCnt--;
                    curData.userLiked = false;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
            }
            let curVideoData = this.videoDatas[this.curDataIndex];
            if (curVideoData) {
                curVideoData.userLiked = curData.userLiked;
            }
            this.apiState.userLiking = false;
        },
        async onClickChat(curData) {
            this.$nextTick(() => {
                if (!this.$refs.refCommentArea) return;
                this.$refs.refCommentArea.onShowChat(curData.video.id);
            });
        },
        async onClickCollect(curData) {

            if (!this.$userStore.checkLogin()) {
                return;
            }

            if (this.apiState.userCollecting) {
                return;
            }
            this.apiState.userCollecting = true;
            if (curData.userCollected) {
                curData.video.collectedCnt--;
                curData.userCollected = false;
                let res = await this.$api.unCollectVideo(curData.video.id);
                if (res.errorCode !== 0) {
                    curData.video.collectedCnt++;
                    curData.userCollected = true;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
            } else {
                curData.video.collectedCnt++;
                curData.userCollected = true;
                let res = await this.$api.collectVideo(curData.video.id);
                if (res.errorCode !== 0) {
                    curData.video.collectedCnt--;
                    curData.userCollected = false;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                this.$toast({
                    message: '您已经成功收藏视频啦',
                    position: 'bottom',
                });
            }
            let curVideoData = this.videoDatas[this.curDataIndex];
            if (curVideoData) {
                curVideoData.userCollected = curData.userCollected;
            }
            this.apiState.userCollecting = false;
        },
        async onClickBuyVipDiamond(curData) {
            // 购买vip钻石
            if (!curData.vip) {
                this.$router.push({
                    path: "/recharge?type=vip"
                });
            } else if (curData.curDiamond < curData.discountDiamond) {
                this.$router.push({
                    path: "/recharge?type=diamond"
                });
            } else {
                // 购买
                let res = await this.$api.buyVideo(curData.video.id);

                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }

                curData.buyVideo = true;
                this.preloadVideo(curData, curData.video.coverURL, curData.url, true);
                this.$toast('购买成功');
            }

        },
        async onClickBuyDiamond(curData) {
            // 购买钻石
            if (curData.curDiamond < curData.diamond) {
                this.$router.push({
                    path: "/recharge?type=diamond"
                });
            } else {
                // 购买
                let res = await this.$api.buyVideo(curData.video.id);
                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }

                curData.buyVideo = true;
                this.preloadVideo(curData, curData.video.coverURL, curData.url, true);
                this.$toast('购买成功');
            }
        },
        onClickMuted() {
            console.log("shortPlayer onClickMuted");
            this.playMuted = !this.playMuted;
            for (const key in this.playerDatas) {
                let video = this.playerDatas[key].videoElm;
                video.muted = this.playMuted;
            }
        },
        onClickShare() {
            console.log("shortPlayer onClickShare");
            this.showShare = true;
            let playerData = this.playerDatas[this.playerIds[this.curPlayerIndex]];
            if (!playerData) {
                return;
            }
            playerData.videoElm.pause();

        },
        async onClickFollow(curData) {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            if (this.apiState.userFollowing) {
                return;
            }
            this.apiState.userFollowing = true;

            if (curData.userFollowed) {
                curData.userFollowed = false;
                let res = await this.$api.unfollowUp(curData.video.user.uid);
                if (res.errorCode !== 0) {
                    curData.userFollowed = true;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                } this.$nuxt.$emit("followChange");

            } else {
                curData.userFollowed = true;
                let res = await this.$api.followUp(curData.video.user.uid);
                if (res.errorCode !== 0) {
                    curData.userFollowed = false;
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                this.$nuxt.$emit("followChange");
            }
            for (const videoData of this.videoDatas) {
                if (videoData.video.user.uid === curData.video.user.uid)
                    videoData.userFollowed = curData.userFollowed;
            }
            this.apiState.userFollowing = false;
        },

        touchStart(e, playerId) {
            this.curConVideo = document.querySelector(`#${playerId}`);
            this.isPressProgress = true;
            this.isPressProgresAndMove = false;
            this.startX = e.changedTouches[0].clientX;
            this.totalProgressTime = this.formatTime(this.curConVideo.duration);
        },

        touchMove(e, curData) {
            e.preventDefault();
            this.isPressProgresAndMove = true;
            const width = window.screen.width;
            const tx = e.clientX || e.changedTouches[0].clientX;
            // if (tx < 0 || tx > width) {
            //     return;
            // }

            let video = this.curConVideo;
            let duing = (tx - this.startX) / width;
            duing = duing > 1 ? 1 : duing;
            let now = duing * video.duration;
            // if (now < 0) now = 0;

            this.startX = e.changedTouches[0].clientX;
            curData.playProcess += duing * 100;
            let curTime = (video.currentTime + now < 0) ? 0 : (video.currentTime + now);
            if (isFinite(curTime)) video.currentTime = curTime;
            this.curProgressTime = this.formatTime(video.currentTime) + '/' + this.totalProgressTime;
            // video.currentTime = second(Math.floor(now.value));
            // percentage.value = Math.floor((tx / width) * 100);
        },

        touchEnd(e, curData) {
            let video = this.curConVideo;
            this.isPressProgress = false;
            // //点击
            // if (!this.isPressProgresAndMove) {
            //     const width = window.screen.width;
            //     console.log('e = ', e);
            //     const tx = e.clientX || e.changedTouches[0].clientX;
            //     let video = this.curConVideo;
            //     let duing = tx / width;
            //     duing = duing > 1 ? 1 : duing;
            //     let now = duing * video.duration;
            //     curData.playProcess = duing * 100;
            //     video.currentTime = now;
            // }
            this.isPressProgresAndMove = false;
            video.play();
        },
        formatTime(times = 0) {
            let formatTimeStr = (val) => {
                if (val > 9) {
                    return val;
                } else {
                    return '0' + val;
                }
            };
            var hour = parseInt((times) / 3600);
            var minute = parseInt((times % 3600) / 60);
            var second = parseInt(times % 60);
            if (hour > 0) {
                return formatTimeStr(hour) + ':' + formatTimeStr(minute) + ':' + formatTimeStr(second);
            } else {
                return formatTimeStr(minute) + ':' + formatTimeStr(second);
            }
        },

    }
})
</script>

<style lang="less">
@keyframes grow {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    40% {
        transform: translate(-50%, -50%) scale(6);
        opacity: 0.6;
    }
    60% {
        transform: translate(-50%, -50%) scale(6);
        opacity: 0.4;
    }
    100% {
        transform: translate(-50%, -50%) scale(10);
        opacity: 0;
    }
}

.shortVpBox {
    .overlay {
        left: 0;
        position: absolute;
    }
    .heart {
        position: absolute;
        animation: grow 0.6s linear;
        transform: translate(-50%, -50%) scale(0);
    }
    .heartBox {
        width: 30px;
        height: 30px;
        position: relative;
        margin: 0 auto;
    }
    .heartBtn {
        position: absolute;
        top: -35px;
        left: -35px;
        width: 100px;
        height: 100px;
        background: url("~/assets/img/heart.png") no-repeat;
        background-position: 0 0;
        cursor: pointer;
        -webkit-transition: background-position 1s steps(28);
        transition: background-position 1s steps(28);
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
        &.active {
            -webkit-transition-duration: 1s;
            transition-duration: 1s;
            background-position: -2800px 0;
        }
    }
}
</style>
<style lang="less" scoped>
.cover-video,
.cover-video[poster] {
    object-fit: cover !important;
    object-position: center !important;
}

.contain-video,
.contain-video[poster] {
    object-fit: contain !important;
    object-position: center !important;
}

.shortVpBox .samllFbtn img {
    visibility: visible;
}

.mplay {
    width: 100% !important;
    height: 100% !important;
    background: #000 !important;
    margin: 0 auto;
    border: none;
}

.videoCover {
    visibility: visible;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background: #000;
    position: absolute;
    border: none;
    top: 0;
    left: 0;
    object-fit: contain;
    object-position: center;
    opacity: 1;
}

.mvb {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 2px;
    right: 0;
    object-position: center;
    object-fit: cover;
    overflow: hidden;
}

.collect {
    position: absolute;
    right: 2vw;
    bottom: 20px;
    z-index: 10;
    > div {
        text-align: center;
        margin-bottom: 8px;
        .num {
            color: #fff;
            font-size: 0.3rem;
        }
    }
    .guanzhu {
        width: 1.1rem;
        height: 1.1rem;
        margin-bottom: 1.2rem;
    }

    .volumeIcon {
        fill: #fff;
        width: 28px;
        height: 28px;
    }
}

.control {
    position: absolute;
    top: 44%;
    right: 42%;
    z-index: 999;
}
.svideoBox {
    position: relative;
}
.footerInfo {
    position: absolute;
    left: 0;
    bottom: 20px;
    color: #fff;
    text-align: left;
    padding: 0 0.2rem;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.process {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    opacity: 0.9;
    background-color: #ccc;

    .buffer {
        height: 2px;
        position: absolute;
        bottom: 0;

        background-color: rgb(155, 151, 151);
    }
    .buffer2 {
        height: 5px;
        position: absolute;
        bottom: 0;

        background-color: rgb(155, 151, 151);
    }

    .play {
        height: 2px;
        bottom: 0;
        position: absolute;
        background-color: rgb(110, 48, 48);
    }
    .play2 {
        height: 5px;
        bottom: 0;
        position: absolute;
        background-color: rgb(170, 78, 78);
    }
    .small-cycle {
        width: 2px; //小圆点
        height: 2px;
        background-color: rgb(189, 189, 189);
        border-radius: 50%;
        bottom: 0px;
        position: absolute;
    }
    .big-cycle {
        width: 10px; //小圆点
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        bottom: -2px;
        position: absolute;
    }

    .progressControl {
        width: 100%;
        height: 30px;
        bottom: 0;
        position: absolute;
    }
    .timeBg {
        position: absolute;
        width: 100%;
        height: 45px;
        bottom: 0;
        backdrop-filter: blur(2px) brightness(50%);
        background-color: rgba(0, 0, 0, 0.5);
    }
    .progressControlTime {
        color: #fff;
        bottom: 10px;
        position: absolute;
        font-size: 16px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
.videoLoading {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -5rem;
    right: 0;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    width: 10rem;
    height: 2px;
    div {
        position: absolute;
        background: #fff;
        z-index: 10;
        height: 2px;
        animation: loading 1.2s infinite;
        animation-timing-function: ease;
        animation-direction: normal;
        -webkit-animation: loading 1.2s infinite;
        -webkit-animation-timing-function: ease;
        -webkit-animation-direction: normal;
    }
}
@keyframes loading {
    0% {
        width: 4rem;
        opacity: 1;
    }

    100% {
        width: 10rem;
        opacity: 0;
    }
}

@-webkit-keyframes loading {
    0% {
        width: 4rem;
        opacity: 1;
    }

    90% {
        width: 10rem;
        opacity: 0;
    }

    100% {
        width: 4rem;
        opacity: 0;
    }
}
.findTop {
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: none !important;
    /* background: black; */

    .findTL {
        text-align: left;
        cursor: pointer;
        padding: 0 5px;
    }
    .findTL img {
        width: 0.4rem;
    }
    .findTR {
        text-align: right;
        color: #fff;
        font-size: 0.35rem;
        cursor: pointer;
        padding: 10px;
    }
    .findTR img {
        width: 0.6rem;
    }
}
.avater {
    width: 100%;
    height: 100%;
}

.follow-btn {
    position: relative;
    top: -10px;
    height: 50px;
}
.svUser {
    display: flex;
    align-items: center;
    color: #fff;
    text-align: left;
    font-size: 0.4rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
}

.subvpRight {
    width: 1.8rem;
    margin-left: 0.3rem;
}
.des {
    color: #fff;
    font-size: 0.32rem;
    margin-top: 0.25rem;
}
.titleText {
    font-size: 0.35rem;
}

.svideoTags {
    font-size: 0.42rem;
    color: #1e41ff;
}

.infobox {
    z-index: 100;
    .pop {
        display: inline-block;
        height: 0.8rem;
    }
}
.freeTimes {
    padding: 3px 15px;
    // height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    // margin: 0 auto;
    margin-bottom: 10px;
    width: fit-content;
    color: #fff;
    border-radius: 0.5rem;
    border: solid 2px #fff;
}

.vip {
    padding: 0 0.4rem;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    // margin: 0 auto;
    width: fit-content;
    color: @active-color;
    border-radius: 0.5rem;
    border: solid 2px @active-color;
}

.diamond {
    padding: 0 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 1000;
}
.pop .diamond .diamondPrice {
    padding: 0 10px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: @active-color;
    border: 2px solid @active-color;
    border-radius: 15px;
    margin: 0 5px;
}

.pop .diamond .vipDiamondPrice {
    color: #fff;
    border-radius: 15px;
    border: solid 2px #fff;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin: 0 5px;
    padding: 0 10px;
}
.samllFbtn {
    text-align: center;
    position: absolute;
    top: 0.4rem;
    left: 0.32rem;
}
.closeBtn {
    position: absolute;
    right: 0.6rem;
    top: calc(2rem + var(--safe-top));
    opacity: 0.6;
}
</style> 