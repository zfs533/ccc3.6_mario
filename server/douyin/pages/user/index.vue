<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="用户主页" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>

            <div class="info">
                <div class="userInfo">
                    <div class="comomAvater">
                        <usericon :imgUrl="userData.avatarURL" />
                    </div>
                    <div class="mainInfo">
                        <div class="row1">
                            <div class="numItem">
                                <div class="itemName">粉丝</div>
                                <div class="num">{{formatNumber2(userData.followerCnt)}}</div>
                            </div>
                            <div class="numItem">
                                <div class="itemName">获赞</div>
                                <div class="num">{{formatNumber2(userData.likedCnt)}}</div>
                            </div>
                            <div class="numItem">
                                <div class="itemName">视频</div>
                                <div class="num">{{formatNumber2(userData.videoCnt)}}</div>
                            </div>
                        </div>
                        <div style="width:65%;">
                            <followbtn :followed="mfollowed" :uid="userData.uid" :isSmall=false />
                        </div>
                    </div>
                </div>
                <div class="nameInfo">
                    <div class="userName">{{userData.username}}</div>
                </div>
                <div class="userId">
                    <span>抖荫ID:{{userData.uid}}</span>
                    <img src="~assets/img/copy.png" alt="" @click="onClickCopyId" />
                </div>
                <div class="des">{{userData.introduce}}</div>
            </div>
            <btn-list-box :callBack="onClickVideoType" />
        </div>
        <div class="content">
            <div class="scroll-container userVideobox">
                <list-box ref="videoList" :waterfall="true" loading-text="努力加载中..." @load="onLoadVideoData" @clear="onVideoListClear" />
            </div>
        </div>
    </div>

</template>
<script>

import { pageMixin } from "~/assets/js/mixins";
import usericon from '~/components/usericon.vue';
import * as utils from '~/assets/js/utils';
import BtnListBox from '~/components/btnListBox.vue';
import ImgItem from '~/components/imgitem';
import Followbtn from '~/components/followbtn.vue';
export default {
    name: "user",
    layout: "keepalive",
    components: { usericon, BtnListBox, ImgItem, Followbtn },
    mixins: [pageMixin],
    data() {
        return {
            uid: undefined,
            userData: {
                introduce: ""
            },
            mfollowed: false,
            curVideoType: 1,
            finished: false,
            curVideoPage: 1,
            mpageSize: 8
        };
    },
    created() {
        console.log("user created");
    },
    mounted() {
        console.log("user mounted");
        this.$parent.showTabbar = false;
    },
    async activated() {
        console.log("user activated");
        this.$parent.showTabbar = false;
        if (this.$route.query.uid !== this.uid) {
            this.uid = this.$route.query.uid;
            let res = await this.$api.getUserInfo(this.uid);
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.userData = res.data.user;
            this.mfollowed = res.data.followed;
        }

        this.$nextTick(() => {
            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });
    },
    methods: {
        onVideoListClear() {
            this.curVideoPage = 1;
        },
        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
        async onLoadVideoData() {
            let res = await this.$api.getUserVideos(this.$route.query.uid, { timeType: this.curVideoType, page: this.curVideoPage, pageSize: this.mpageSize });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }

            let tdata = res.data;
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
        },

        async onClickVideoType(type) {
            let mtype = +type + 1;
            this.curVideoType = mtype;
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onClickLeft() {
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                }
            });
            this.$router.back();
        },
        onClickRight() {

        },
        onClickCopyId() {
            let id = this.userData.uid;
            this.$copyText(id + "").then(
                (e) => {
                    this.$toast('复制成功');
                },
                (e) => {
                    // alert("Can not copy");
                }
            );
        },
    }
}
</script>

<style lang="less" scoped>
.userVideobox {
    width: 95%;
    margin: 0 auto;
}

.header {
    height: 46px;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .back {
        padding: 5px 10px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        position: absolute;
        left: 0;
        top: 0;
    }
    color: @text-color;
    font-size: 0.4rem;
}
.info {
    width: 100%;
    padding: 0 0.6rem 0.2rem;
    border-bottom: 1px solid #242535;
}
.userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.15rem;
}
.userInfo .mainInfo {
    flex: 1;
    padding-left: 0.8rem;
}
.row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
}
.itemName {
    color: @text-color;
    font-size: 0.35rem;
    text-align: center;
}
.num {
    color: @text-color;
    font-size: 0.35rem;
    font-weight: 700;
    text-align: center;
}

.nameInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.6rem;
}
.userName {
    font-size: 0.6rem;
    color: @text-color;
    font-weight: 700;
}
.userId {
    margin-top: 0.4rem;
    display: flex;
    align-items: center;
}
.userId span {
    font-size: 0.35rem;
    color: @text-color;
}
.userId img {
    margin-left: 0.2rem;
}
.des {
    margin-top: 0.1rem;
    font-size: 0.35rem;
    color: #808184;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
