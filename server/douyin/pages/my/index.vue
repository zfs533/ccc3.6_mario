<template>
    <div v-show="isLogin" class="my-index flex-container" ref="imageToFile">
        <div class="top">
            <div class="header ">
                <div class="left">
                    <span>抖荫ID: {{ userInfo.uid }}</span><img @click="onClickCopyID" src="~assets/img/copy.png" alt />
                </div>
                <div class="right">
                    <div style="margin: 0 0.2rem;">
                        <QrcodeLogin>
                            <van-icon name="scan" size="24" />
                        </QrcodeLogin>
                    </div>
                    <div style="margin: 0 0.2rem;">
                        <nuxt-link to="/my/info">
                            <van-icon class="setting" name="setting-o" size="24" />
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="scroll-container">
                <div class="userInfo">
                    <nuxt-link class="pic" to="/my/info">
                        <!-- <usericon :imgUrl="userInfo.avatarURL" /> -->
                        <img class="head" :data-src="userInfo.avatarURL" :src="headBase64Data" alt="" />
                        <img class="icon" v-if="headIcon" :src="headIcon" />

                    </nuxt-link>
                    <div class="mainInfo">
                        <div class="row1">
                            <div class="name">{{ userInfo.username }}</div>
                            <div class="phone">
                                <div v-if="isBind">
                                    <van-icon name="checked" />{{ userInfo.phone }}
                                </div>
                                <div v-else>
                                    <van-tag class="go-bind" mark @click="$router.replace('/login?from=my')">
                                        <van-icon class="icon" name="award" />
                                        绑定手机
                                    </van-tag>
                                </div>
                            </div>
                        </div>
                        <div class="row2">
                            <nuxt-link class="showItem" v-if="!userInfo.vipLevel && userInfo.dailyVideoTimes > 0" to='/recharge?type=vip'>
                                <div class="num">{{userInfo.remainTimes}}/{{userInfo.dailyVideoTimes}}</div>
                                <div class="numName">免费次数</div>
                            </nuxt-link>
                            <!-- <div class="showItem" @click="onclickShowPage(0)">
                            </div> -->
                            <div class="showItem" @click="onclickShowPage(0)">
                                <div class="num">{{formatNumber2(userInfo.followCnt) }}</div>
                                <div class="numName">关注</div>
                            </div>
                            <div class="showItem" @click="onclickShowPage(1)">
                                <div class="num">{{ formatNumber2(userInfo.followerCnt) }}</div>
                                <div class="numName">粉丝</div>
                            </div>
                            <div class="showItem" @click="onclickShowPage(2)">
                                <div class="num">{{ formatNumber2(userInfo.inviteCnt) }}</div>
                                <div class="numName">邀请</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recharge">
                    <nuxt-link class="myVipBg" :style="{'background-image': 'url(' + vipBg + ')'}" :to="{ path: '/recharge', query: { type: 'vip' }}">
                        <!-- <div class="row1">VIP会员</div>
                        <div class="row2">{{vipType}}</div> -->
                        <div class="row3">{{vipDec}}</div>
                    </nuxt-link>
                    <nuxt-link class="diamondBg" :style="{'background-image': 'url(' + diamondBg + ')'}" to='/recharge?type=diamond'>
                        <!-- <div class="row1">我的钱包</div> -->
                        <div class="row2">{{ formatNumber2(userInfo.diamond) }}</div>
                        <div class="row3">立即充值</div>
                    </nuxt-link>
                </div>
                <div class="ad-swipebox vip-big-bg" v-if=" ads.length > 0">
                    <swiper class="my-swipe" :options="adSwiperOption" style="width: 100%; height: 100%">
                        <swiper-slide v-for="(ad, index) in ads" :key="index">
                            <img :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width:100%;height:100%" @click="onClickAd(ad.url)" />
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <div class="toolbox">
                    <van-grid>
                        <van-grid-item icon="gold-coin-o" text="推广赚钱" to="/promote" />
                        <van-grid-item icon="shop-collect-o" text="我的购买" to="/my/collectList?type=buy" />
                        <van-grid-item icon="star-o" text="我的收藏" to="/my/collectList?type=collect" />
                        <van-grid-item icon="gem-o" text="激活兑换码" to="/recharge/exchangeCenter" />
                        <van-grid-item icon="tosend" text="签到打卡" to="/checkin" />
                        <van-grid-item icon="idcard" text="账号凭证" @click="onClickShowCard" />
                        <van-grid-item icon="comment-circle-o" text="在线客服" @click="onClickCustomer" />
                        <van-grid-item icon="share-o" text="分享领VIP" to="/my/share" />
                    </van-grid>
                </div>
                <div class="list ">
                    <nuxt-link class="listItem" to="/my/history">
                        <div class="left">
                            <van-icon name="video-o" size="23" />
                            <span>观影记录</span>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" size="16" />
                        </div>
                    </nuxt-link>
                    <!-- <div class="listItem" @click="showToast('暂未开通')">
                    <div class="left">
                        <van-icon name="cash-back-record" size="23" color="#ff4e6f" />
                        <span>业务充值</span>
                    </div>
                    <div class="right">
                        <van-icon name="arrow" color="#aaa" size="16" />
                    </div>
                </div> -->
                    <nuxt-link v-if="!userInfo.channel" class="listItem" to=/my/bindInviteCode>
                        <div class="left">
                            <van-icon name="cluster-o" size="23" />
                            <span>绑定邀请码</span>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" size="16" />
                        </div>
                    </nuxt-link>
                    <a class="listItem" @click="openFrame('https://douying.uk', '应用中心')">
                        <div class="left">
                            <van-icon name="apps-o" size="23" />
                            <span>应用中心</span>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" size="16" />
                        </div>
                    </a>
                    <div class="listItem" @click="onClickContactUrl">
                        <div class="left">
                            <van-icon name="chat-o" size="23" />
                            <span>官网群组</span>
                        </div>
                        <div class="right">
                            <van-icon name="arrow" size="16" />
                        </div>
                    </div>
                    <div class="listItem" @click="onClickUpdate">
                        <div class="left">
                            <van-icon name="shield-o" size="23" />
                            <span>版本检测</span>
                        </div>
                        <div class="right">
                            <span>{{version}}</span>
                            <van-icon name="arrow" size="16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cardDialog" v-show="showCard" @click="closeCard()" ref="imageDom">
            <div class="closeBtn">
                <van-icon name="cross" size="30" />
            </div>
            <div class="cardBox img-mybg-spr img-mybg-spr-id-card-bg" @click="keepStatue()">
                <div class="cardTitle">抖荫身份卡</div>
                <div class="cardInfo">
                    <img :data-src="userInfo.avatarURL" :src="headBase64Data" alt="" class="photo" />
                    <div class="actInfo">
                        <dl>
                            <dt>用户名</dt>
                            <dd>{{ userInfo.username }}</dd>
                        </dl>
                        <dl>
                            <dt>抖荫ID</dt>
                            <dd>{{ userInfo.uid }}</dd>
                        </dl>
                    </div>
                </div>
                <div class="middleBox">
                    <div class="qrcode" id="qrcode"></div>
                    <dl>
                        <dt>防止账号丢失</dt>
                        <dd class="sub1">保存账号凭证</dd>
                        <dd class="sub2" @click="copyUrl">{{downloadUrl}}</dd>
                    </dl>
                </div>
                <div class="tips">
                    <h3>温馨提示</h3>
                    <div class="tipsContent">
                        <div>请妥善保管此账号凭证，不随意透露给其他人</div>
                    </div>
                </div>
                <div class="saveBtn img-mybg-spr img-mybg-spr-id-card-button" @click="onSaveClick">
                    请截图保存
                </div>
            </div>
            <!-- <div class="saveCard" @click="saveCardToIphone">
        <span>保存至相册</span>
      </div> -->
        </div>
    </div>
</template>

<script> 
import { AppResImgCodes, defaultRes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import * as utils from '~/assets/js/utils';

import QrcodeLogin from '~/components/qrcodeLogin.vue';
import Usericon from '~/components/usericon.vue';
const QRCode = require("~/assets/js/qrcode");

export default {
    name: "my",
    layout: "keepalive",
    components: { QrcodeLogin },
    mixins:
        Usericon[pageMixin],
    data() {
        return {
            version: "",
            barIndex: 2,
            showCard: false,
            isLogin: false,
            isBind: false,
            userInfo: {
                headBase64Data: defaultRes.userAvatorDefault
            },
            headBase64Data: defaultRes.userAvatorDefault,
            defaultVipBg: "",
            vipBg: "",
            diamondBg: "",
            showInfo: false,
            qrcodeObj: {}, // 二维码配置
            downloadUrl: "",
            vipType: "您当前未开通VIP",
            bgImg: "",

            mUpRefreshing: false,

            headIcon: '',

            ads: [],

            adSwiperOption: {
                watchOverflow: true,
                autoplay: {
                    disableOnInteraction: false,
                },
            },
        };
    },
    computed: {

        vipDec() {
            let vipDec = "立即开通";
            let effTime = this.userInfo.vipEffectiveTime;
            if (this.userInfo.vipLevel != 0 && effTime) {
                vipDec = new Date(effTime).format("yyyy年MM月dd日");
                let xxtime = effTime.substr(0, effTime.indexOf("-"));
                if (+xxtime - 2022 > 10) {
                    vipDec = "永久有效";
                }
            }
            return vipDec;
        }
    },

    async created() {
        console.log("my index created");
        if (!this.$userStore.checkLogin(false))
            return;

        this.$nuxt.$on("login", () => {
            this.updateUserInfo();
        });
        this.initTheme();
        // this.inPageTime = Date.now();
        let allAd = await this.$main.adManager.getAllAD();
        this.ads = [];
        for (let i = 0; i < allAd.my.length; i++) {
            let item = allAd.my[i];
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
    },

    async mounted() {
        console.log("my index mounted");
        this.$parent.showTabbar = true;
        if (!this.$userStore.checkLogin(false))
            return;

        this.$nextTick(() => {
            this.$dialog.confirm({
                title: '防止账号丢失',
                confirmButtonText: "我要保存",
                cancelButtonText: '我已保存',
                message: '方式一：请绑定手机号码，可通过账号切换输入手机号码找回账号\n\n方式二：请保存账号凭证，可以随时扫描其二维码登录账号',
                messageAlign: "left",
                className: 'fistDialog'
            }).then(() => {
                this.onClickShowCard();
            }).catch(() => {

            });
        });
    },
    async activated() {
        this.$parent.showTabbar = true;
        if (!this.$userStore.checkLogin(false))
            return;
        this.initTheme();

        this.$api.updateMyInfo().then(() => {
            this.updateUserInfo();
        });
    },
    deactivated() {
        // this.$parent.resetBackground(); 
    },
    methods: {
        initTheme() {
            this.$parent.initTheme(AppResImgCodes.myPageBg);

            let myDefvipBgInfo = this.$main.getResImg(AppResImgCodes.myDefvipBg);
            if (myDefvipBgInfo) {
                if (myDefvipBgInfo.base64ImgData) {
                    this.defaultVipBg = myDefvipBgInfo.base64ImgData;
                } else {
                    this.$fileloader.dowloadPngImg(myDefvipBgInfo.imgUrl, 640, (url, data) => {
                        if (!data) {
                            console.warn("my Index dowloadFile error: ", url);
                            return;
                        }
                        this.defaultVipBg = data;
                    });
                }
            }

            let myWalletBgInfo = this.$main.getResImg(AppResImgCodes.myWalletBg);
            if (myWalletBgInfo) {
                if (myWalletBgInfo.base64ImgData) {
                    this.diamondBg = myWalletBgInfo.base64ImgData;
                } else {
                    this.$fileloader.dowloadPngImg(myWalletBgInfo.imgUrl, 640, (url, data) => {
                        if (!data) {
                            console.warn("my Index dowloadFile error: ", url);
                            return;
                        }
                        this.diamondBg = data;
                    });
                }
            }
        },
        onClickAd(adurl) {
            window.open(adurl);
        },

        openFrame(url, title) {
            this.$router.push({
                path: "/frame",
                query: {
                    target: url,
                    from: window.location.pathname,
                    title: title
                },
            });
        },

        onUpRefresh() {
            this.$api.updateMyInfo().then(() => {
                this.updateUserInfo();
            });
            this.mUpRefreshing = false;
        },


        async updateUserInfo() {
            this.isLogin = this.$userStore.isLogin();
            this.isBind = this.$userStore.isBind();

            this.vipType = "您当前未开通VIP";
            this.userInfo = this.$userStore.getMyInfo();
            this.headIcon = '';
            this.vipBg = this.defaultVipBg;
            this.showInfo = true;
            this.downloadUrl = this.$storage.getString("officialDownloadUrl");

            let nativeVersion = await this.$version.getInstalledApkVersion();
            if (nativeVersion) {
                this.version = `n${nativeVersion.version}+w${this.$env.version}`;
            } else {
                this.version = this.$env.version;
            }

            this.$fileloader.dowloadJpegImg(this.userInfo.avatarURL, 120, (url, data) => {
                if (data) {
                    this.avatarURL = url;
                    this.headBase64Data = data;
                }
            });

            let vipLevelInfo = this.$main.getVipLevelInfo();
            if (vipLevelInfo) {
                for (let item of vipLevelInfo) {
                    if (item.vipLevel == this.userInfo.vipLevel) {
                        this.$fileloader.dowloadPngImg(item.bgImg, 640, (url, data) => {
                            if (data) {
                                this.bgImg = item.bgImg;
                                this.vipBg = data;
                            }
                        });
                        this.vipType = "已开通" + item.name;
                        this.headIcon = item.icon;
                        continue;
                    }
                }
                // this.vipType = ""
                // vipType = "已开通黄金VIP";
            }

        },
        base64ToBlob(code) {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], { type: contentType });
        },
        keepStatue() {
            event.stopPropagation();
        },
        onClickShowCard() {
            this.showCard = true;
            if (this.userInfo.identifyCard) {
                this.qrcodeObj = new QRCode('qrcode', {
                    text: this.userInfo.identifyCard,
                    width: 100,
                    height: 100,
                    colorDark: '#000', // 绿色
                    colorLight: '#fff',
                    correctLevel: QRCode.CorrectLevel.H
                }, 1000);
            }

        },
        closeCard() {
            this.showCard = false;
            document.querySelector("#qrcode").innerHTML = '';
        },

        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
        onClickContactUrl() {
            let officialContactUrl = this.$storage.getString("officialContactUrl");
            if (officialContactUrl) {
                window.open(officialContactUrl, "_blank");
            } else {
                this.$toast("暂未开通官方交流群");
            }
        },
        onClickCustomer() {
            let url = this.$customer.getCustomerUrl();
            if (!url) {
                this.$toast('未配置客服');
                return;
            }
            this.$router.push({
                path: "/frame",
                query: {
                    target: url,
                    from: this.$route.path,
                    title: "在线客服"
                },
            });
        },
        onClickVIP() {
            this.$router.push({
                path: "/recharge?type=vip",
            });
        },
        showToast(str) {
            return this.$toast(str);
        },
        onClickCopyID() {
            let id = this.userInfo.uid;
            this.$copyText(id + "").then(
                (e) => {
                    this.showToast("复制成功");
                },
                (e) => {
                    this.showToast("复制失败");
                }
            );
        },
        copyUrl() {
            // this.showCard = false;
            let str = this.downloadUrl;
            this.$copyText(str).then(
                (e) => {
                    this.showToast("网址复制成功");
                },
                (e) => {
                    this.showToast("网址复制失败");
                }
            );

        },
        onclickShowPage(idx) {
            switch (idx) {
                case 0:
                    this.$router.push({
                        path: "/user/follow",
                    });
                    break;
                case 1:
                    this.$router.push({
                        path: "/user/fans",
                        name: "user-fans",
                        params: {
                            uid: this.userInfo.uid,
                        },
                    });
                    break;
                case 2:
                    this.$router.push({
                        path: "/my/invite",
                    });
                    break;
            }
        },
        async onClickUpdate() {
            await this.$version.init();
            // 检测APK版本
            let hasNewApk = await this.$version.checkApkVersion();
            if (hasNewApk) {
                this.$dialog.alert({
                    title: '更新提示',
                    message: '进入点击确定立即更新',
                    theme: 'round-button',
                }).then(async () => {
                    this.$router.replace({
                        path: "/update",
                    });
                });

                return;
            }
            // 检测web资源版本
            let hasNewWeb = await this.$version.checkWebVersion();
            if (hasNewWeb) {
                const toast = window.$nuxt.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '检测到新版，正在准备更新',
                });
                let ok = await this.$version.updateWeb();
                if (!ok) {
                    console.log("start index updateWeb faild");
                }
                window.$nuxt.$toast.clear();
                return;
            }
            this.$toast("您已经是最新版本");
        },
        onSaveClick() {
            if (this.$cordova) {
                this.$cordova.downloadQrcode(this.$refs.imageDom);
            } else {
                this.$toast("您需要手动截图才能保存凭证哟");
            }
        }
    },
};
</script>
 
<style lang="less" scoped>
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;

    .left {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: @my-font-color1;
    }

    .right {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: @my-bg-color1;
    }

    .left span {
        padding-right: 12px;
    }

    .right img {
        width: 17px;
    }
}

img {
    width: 15px;
}

.userInfo {
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.userInfo .pic {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
}

.userInfo .pic .head {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
}

.userInfo .pic .icon {
    width: 57px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -7px;
}

.userInfo .mainInfo {
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.userInfo .mainInfo .row1 {
    display: flex;
    align-items: center;
}

.userInfo .mainInfo .row1 {
    .name {
        font-size: 21px;
        color: @my-font-color1;
        cursor: pointer;
    }
    .phone {
        font-size: 0.25rem;
        color: @my-font-color1;
        cursor: pointer;
        padding: 0px 10px;

        .go-bind {
            color: @my-font-color2;
            background-color: @my-bg-color2;
            border: solid 1px;

            .icon {
                color: @my-font-color2;
            }
        }
    }
}

.userInfo .mainInfo .row1 .mark {
    margin-left: 10px;
    width: 54px;
    height: 20px;
    background: @content-color;
    border-radius: 3px;
    font-size: 12px;
    color: @text-color;
    text-align: center;
    line-height: 20px;
}
.setting {
    color: @my-bg-color1;
}
.userInfo .mainInfo .row2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 17px;
}

.showItem {
    cursor: pointer;
}

.showItem .num {
    font-size: 15px;
    color: @my-font-color1;
    text-align: center;
}

.showItem .numName {
    font-size: 12px;
    color: @my-font-color3;
    margin-top: 6px;
}

.recharge {
    // width: 100%;
    margin: 10px 14px;
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.recharge > a {
    width: 48%;
    // background-size: contain;
    height: 90px;
    border-radius: 10px;
    position: relative;
    flex-direction: column;
    margin: 2px;
}

.recharge > a .row1 {
    font-size: 16px;
    color: @my-font-color1;
    /* text-align: center; */
}

.recharge > a .row2 {
    font-size: 15px;
    color: @my-font-color1;
    height: 27px;
    position: absolute;
    bottom: 32px;
    left: 53px;
    font-weight: bold;
}
.recharge > a .row3 {
    font-size: 12px;
    color: @theme-color1;
    background: @theme-color2;
    flex-wrap: nowrap;
    border-radius: 10px;
    width: fit-content;
    padding: 3px 10px;
    transform: scale(0.833333);

    position: absolute;
    bottom: 5px;
    left: 5px;
}

// .recharge > a .row3 {
//     background: rgba(0, 0, 0, 0.2);
//     height: 22px;
//     line-height: 22px;
//     flex-wrap: nowrap;
//     // padding: 0 10px;
//     text-align: center;
//     border-radius: 0.5rem;
//     margin-top: 4px;
// }
.vip-big-bg {
    height: 82px;
    margin: 10px 14px;
}

.myVipBg {
    background-repeat: no-repeat;
    background-size: cover;
    .row3 {
        margin-top: 60px;
    }
}

.diamondBg {
    background-repeat: no-repeat;
    background-size: cover;
}

.toolbox {
    background: @my-bg-color4 !important;
    margin: 0 14px;
    border-radius: @box-border-radius;
}

.list {
    padding: 20px;
    background: @my-bg-color4 !important;
    margin: 10px 14px;
    border-radius: @box-border-radius;
}

.listItem {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;
    cursor: pointer;
}

.list .listItem,
.list .listItem .left {
    display: flex;
    align-items: center;
    color: @theme-color2;
}

.list .listItem .left img {
    width: 20px;
}

.list .listItem .left span {
    padding-left: 14px;
    font-size: 15px;
    color: @theme-color2;
}

.list .listItem .right {
    display: flex;
    align-items: center;
    color: @my-bg-color5;
}

.list .listItem .right span {
    font-size: 13px;
    color: @my-bg-color5;
    padding-right: 15px;
}

.list .listItem .right img {
    width: 7px;
}

.dialog .diaContent {
    width: 100%;
    padding: 0.4rem 0.2rem 0.2rem;
}

.dialog .diaContent .groupItem {
    display: flex;
    align-items: center;
    font-size: 0.35rem;
    margin-bottom: 0.2rem;
}

.dialog .diaContent .groupItem .avatar {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
}

.dialog .diaContent .groupItem .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
}

.dialog .diaContent .groupItem .name {
    font-size: 15px;
    padding-left: 0.1rem;
    color: #191b21;
}

.cardDialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: auto;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2000;
    .closeBtn {
        position: fixed;
        right: 0.6rem;
        top: calc(0.5rem + var(--safe-top));
        opacity: 0.6;
    }
    .cardBox {
        width: 360px;
        height: 485px;
        background-size: 501px 483px;
        font-size: 0.2rem;
        padding: 0 12%;
        color: @cardDialog-font-color2;
        position: relative;
        dl,
        dt,
        dd {
            padding: 0;
            margin: 0;
        }
        .cardTitle {
            font-size: 0.4rem;
            text-align: center;
            padding-top: 14px;
            color: @cardDialog-font-color1;
        }
        .cardInfo {
            display: flex;
            padding-top: 16px;
            .photo {
                display: block;
                width: 60px;
                height: 60px;
                margin-right: 10px;
                margin-top: 5px;
            }

            dl {
                display: flex;
                font-size: 0.38rem;
                line-height: 28px;
                height: 28px;
                margin-bottom: 10px;
                dt {
                    width: 1.2rem;
                    margin-right: 0.2rem;
                    color: @cardDialog-font-color2;
                }
                dd {
                    width: 120px;
                    font-size: 0.38rem;
                    border: solid 1.5px @cardDialog-bg-color1;
                    border-radius: 0.6rem;
                    padding: 0 0.25rem;
                    color: @cardDialog-font-color2;
                    line-height: 24px;
                    height: 26px;
                }
            }
        }
        .middleBox {
            margin-top: 5px;
            display: flex;
            height: 25%;
            align-items: center;
            border: solid 2px @cardDialog-border-color1;
            border-radius: 0.3rem;
            padding-left: 0.1rem;
            background: @cardDialog-bg-color2;
            dl {
                margin-left: 5px;
                line-height: 0.8rem;
                text-align: center;
                white-space: nowrap;
                dt {
                    font-size: 0.45rem;
                }
                .sub1 {
                    font-size: 0.35rem;
                }
                .sub2 {
                    color: @my-bg-color6;
                    font-size: 0.3rem;
                }
            }
        }
        .tips {
            h3 {
                margin: 0.3rem 0 0.1rem;
                font-size: 0.4rem;
                color: @cardDialog-font-color3;
                font-weight: normal;
            }
            .tipsContent {
                font-size: 0.3rem;
                color: @cardDialog-font-color3;
                div {
                    line-height: 0.4rem;
                    margin-bottom: 0.15rem;
                }
            }
        }
        .saveBtn {
            width: 240px;
            height: 53px;
            position: absolute;
            bottom: 1.3rem;
            left: 15%;
            text-align: center;
            padding-bottom: 0.5rem;
            line-height: 1.45rem;
            font-size: 0.55rem;
            color: @cardDialog-font-color4;
            background-size: 864px 833px;
            background-position: -624px 0px;
        }
    }
}

.codebox .codetext {
    margin-top: 0.5rem;
    font-size: 0.35rem;
    margin-left: 0.5rem;
}
.codetext .ofurl {
    color: blue;
    margin-top: 1rem;
}
.saveCard {
    background: blue;
    border-radius: 1rem;
    color: @text-color;
    font-size: 0.45rem;
    width: 80%;
    height: 1.2rem;
    line-height: 1.2rem;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
}
.cardtip {
    color: red;
    font-size: 0.45rem;
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>