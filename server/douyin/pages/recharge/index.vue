<template>
    <div class="recharge flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" style="width: 100%" right-text="充值记录" :placeholder="true">
                <template #title>
                    <van-tabs line-width="30px" background="transparent" v-model="curTabIndex" @click="onClickTab">
                        <van-tab title="VIP会员" title-style="margin-right:10px"></van-tab>
                        <van-tab title="钻石充值"></van-tab>
                    </van-tabs>
                </template>
            </van-nav-bar>
        </div>
        <div v-show="!isLoading" class="content">
            <swiper ref="mySwiper" class="full-container" :options="swiperOption" @slideChange="onChange">
                <swiper-slide class="slider">
                    <div class="scroll-container">
                        <div class=" userInfo">
                            <div class="left">
                                <div class="pic">
                                    <usericon :imgUrl="userInfo.avatarURL" />
                                </div>
                                <div class="info">
                                    <div class="name">{{ userInfo.username }}</div>
                                    <div class="isVip">
                                        <span>{{ vipDec }}</span>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link class="right" to="/recharge/exchangeCenter">兑换会员</nuxt-link>
                        </div>
                        <div class="vipCard swiper-no-swiping">
                            <div v-for="(item, index) in vipCardInfo" :style="{'color':item.fontColor ,'background-image': 'url(' + item.base64ImageData + ')'}" :key="index" class="vipCardItem" :class="rechargeItemClass(index)" @click="onclickCheckVipItem(index)">
                                <div class="mark" v-if="item.countdown">
                                    限时： {{ formatSecond(item.countdown) }}
                                </div>
                                <div class="mark" v-else-if="item.mask">
                                    {{ item.mask }}
                                </div>
                                <div v-if="!item.originalImageMode" class="vipCardItemInfo">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="price">
                                        ¥<span>{{ item.price }}</span>
                                    </div>
                                    <div class="originalPrice">
                                        <div :style="{'visibility':(item.originalPrice && item.originalPrice!= '0')? 'visible': 'hidden' }">原价：¥{{ item.originalPrice }}</div>
                                    </div>
                                    <div class="changeMonth" :style="{'visibility':item.privilege? 'visible': 'hidden' }"> {{ item.privilege }} </div>
                                    <div class="des">
                                        {{ item.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kindTips">
                            *每日充值额度库存有限，充值失败时请尝试其他额度，或稍后再试
                        </div>
                        <div class="panel">
                            <div class="tipTitle">
                                <img style="" src="~/assets/img/pay/line.png" alt="" />
                                <span>VIP会员特权</span>
                                <img style=" transform: rotateY(180deg);" src="~/assets/img/pay/line.png" alt="" />
                            </div>
                            <van-row type="flex" v-if="curVipCardInfo">
                                <van-col class="privilegeItem" v-for="(item, index) in curVipCardInfo.privileges" :key="index" span="6">
                                    <!-- <img src="~/assets/img/pay/icon1.png" alt="" /> -->
                                    <img :src="item.icon" />

                                    <div class="name">{{ item.name }}</div>
                                </van-col>
                            </van-row>
                        </div>

                        <div class="panel">
                            <div class="tipTitle">
                                <img style="" src="~/assets/img/pay/line.png" alt="" />
                                <span> 温馨提示 </span>
                                <img style=" transform: rotateY(180deg);" src="~/assets/img/pay/line.png" alt="" />
                            </div>
                            <div class="kindTips">
                                <div> 1.本APP支持支付宝/微信和钻石余额支付，账单不会有任何情色成人相关信息，请放心购买。 </div>
                                <div> 2.跳转后请及时支付，超时支付无法到账，如多次支付失败，请尝试其他支付方式或稍后重试。</div>
                                <div> 3.连续发起订单且未支付，账号可能被加入黑名单。支付成功后一般10分钟到账，若未到账请及时联系客服（24小时在线）</div>
                                <div> 4.部分安卓手机支付时误报毒，请选择忽略即可。如有疑问请及时联系客服（24小时在线） </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottomContent">
                        <div class="paynow" @click="onClickShowPayDetail"> {{ curTabIndex == 0? '立即开通会员' : '充值钻石'}}</div>
                        <!-- <div class="tips">支付报读解决方案（点击跳转）</div> -->
                        <nuxt-link class="tips" to="/recharge/help">支付报读解决方案（点击跳转）</nuxt-link>
                    </div>
                </swiper-slide>

                <swiper-slide class="slider">

                    <div class="scroll-container">
                        <div class="box">
                            <div>钻石余额</div>
                            <div class="box-tip">USER BALANCE</div>
                            <div class="diamondCnt">
                                <img src="~/assets/img/pay/diamond.png" class="diamond" />
                                <span>{{ userInfo.diamond }}</span>
                            </div>
                            <div class="bottom">(1元=1钻石)
                                <nuxt-link class="btn" to="/recharge/conDetail">流水明细</nuxt-link>
                            </div>
                        </div>
                        <div>
                            <div class="kindTips">
                                *每日充值额度库存有限，充值失败时请尝试其他额度，或稍后再试
                            </div>
                            <div class="tipTitle">
                                <img src="~/assets/img/pay/line.png" alt="" />
                                <span>请选择充值金额</span>
                                <img style=" transform: rotateY(180deg);" src="~/assets/img/pay/line.png" alt="" />
                            </div>
                        </div>

                        <div style="margin:0 20px;display:flex;flex-wrap:wrap;">
                            <div v-for="(item, index) in diamondCardInfo" :key="index" style="flex-basis:33%;padding:5px">
                                <div class="diamondCardItem" :class="diamondCheckIdx === index && `selectDiamondCardActive` " @click="onclickCheckDiamondItem(index)">
                                    <div class="price">
                                        <span>充{{ item.price }}</span>¥
                                    </div>
                                    <div>
                                        {{ item.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="tipTitle">
                                <img style="" src="~/assets/img/pay/line.png" alt="" />
                                <span> 温馨提示 </span>
                                <img style=" transform: rotateY(180deg);" src="~/assets/img/pay/line.png" alt="" />
                            </div>
                            <div class="kindTips">
                                <div>
                                    1.本APP支持支付宝/微信和钻石余额支付，账单不会有任何情色
                                    成人相关信息，请放心购买。
                                </div>
                                <div>
                                    2.跳转后请及时支付，超时支付无法到账，如多次支付失败，请尝试其
                                    他支付方式或稍后重试。</div>
                                <div>
                                    3.连续发起订单且未支付，账号可能被加入黑名单。支付成功后一般10
                                    分钟到账，若未到账请及时联系客服（24小时在线）</div>
                                <div>
                                    4.部分安卓手机支付时误报毒，请选择忽略即可。如有疑问请及时联系
                                    客服（24小时在线）
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottomContent">
                        <div class="paynow" @click="onClickShowPayDetail"> {{ curTabIndex == 0? '立即开通会员' : '充值钻石'}}</div>
                        <!-- <div class="tips">支付报读解决方案（点击跳转）</div> -->
                        <nuxt-link class="tips" to="/recharge/help">支付报读解决方案（点击跳转）</nuxt-link>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="flex-safe-bottom"></div>
        </div>

        <loading v-show="isLoading" />
        <van-popup v-model="showPayPanel" position="bottom" round safe-area-inset-bottom>
            <div class="dialog">
                <div style="flex:1">
                    <div class="quantily">
                        <div>
                            <div>订单支付</div>
                            <span>订单金额： </span>
                            <span class="money">{{ curPayInfo.price }}元</span>
                        </div>

                        <div class="custom" @click="onClickCustomer">
                            <van-icon name="service-o" size="30px" />
                            <div>在线客服</div>
                        </div>
                    </div>
                    <div class="selectPay">
                        请选择支付方式
                        <van-radio-group v-model="payTypeChecked">
                            <van-radio label-position="left" name="alipay" v-if="isShowAliPay" @click="onCheckPayType('ali_pay')">
                                <div class="cell">
                                    <img src="~/assets/img/pay/zfbpay.png" class="payIcon" />
                                    <span>支付宝</span>
                                </div>
                            </van-radio>
                            <van-radio label-position="left" name="wx" v-if="isShowWxPay" @click="onCheckPayType('wx_pay')">
                                <div class="cell">
                                    <img src="~/assets/img/pay/wxpay.png" class="payIcon" />
                                    <span>微信</span>
                                </div>
                            </van-radio>
                            <van-radio label-position="left" name="diamond_pay" v-if="isShowDiamondPay" @click="onCheckPayType('diamond_pay')">
                                <div class="cell">
                                    <img src="~/assets/img/pay/zspay.png" class="payIcon" />
                                    <span>钻石支付</span>
                                    <span style="color:gray">(余额:{{userInfo.diamond}})</span>
                                </div>
                            </van-radio>
                        </van-radio-group>
                    </div>
                    <div class="kindTips">
                        支付小贴士：（支付通道夜间比较忙，建议选择白天支付）<br>
                        1.跳转后请及时支付，超时支付无法到照，如多次支付失败，请尝试其他支付方式活稍后重试。<br>
                        2.连续发起订单且未支付，账号可能被加入黑名单。支付成功后一般10分钟到账，<span>若未到账请及时联系客服（24小时在线）</span>。<br>
                        3.部分安卓手机支付时误报毒，请选择忽略即可。<span>如有疑问请及时联系客服（24小时在线）</span>。<br>

                    </div>
                    <div class="paynow" @click="onClickPay">
                        <span>立即支付</span>
                    </div>
                </div>
            </div>

        </van-popup>

        <div v-if="showPayConfirm" class="rechargeConfirm" @click="showPayConfirm = false">
            <div class="wrapper">
                <div class="block" @click.stop>
                    <div class="confirmtitle">
                        温馨提示
                    </div>
                    <div style="margin-top: 24px;"><br><br>
                        <span>
                            抖荫收入来源于广告及赞助商<br> 产品安全无毒，可放心使用<br>
                            <br>
                        </span>
                    </div>
                    <div class="tip">
                        由于APP包含成人敏感内容，<br> 会被判定为恶意软件。<br>
                        如在支付过程中遇到恶意软件提醒，<br> 请<span>点击忽略</span>即可。<br>
                        <br>
                    </div>
                    <img src="~/assets/img/pay/picture4.png" alt="" style="margin-bottom: 10px;" />
                    <div class="paynow" @click="onClickSurePay">确认支付</div>
                </div>
            </div>

        </div>
        <div v-if="showFinishPay" class="rechargeConfirm" @click="showFinishPay = false">
            <div class="wrapper">
                <div class="block" @click.stop>
                    <div class="confirmtitle">
                        订单支付中
                    </div>
                    <div style="margin:50px 30px;text-align:left"><br>
                        1.支付成功后，一般会在<span>1-10分钟内到账</span>， 如果超时未到账，请联系在线客服为您处理<br><br>
                        2.受特殊行业限制，如支付失败可尝试重新发起订单，系统将会自动切换备用的支付通道。<br><br>
                        3.本APP有稳定的广告收益，产品稳定安全，可放心充值使用<br><br>
                    </div>
                    <div style="display:flex;padding:0 10px">
                        <div class="twoBtn" @click="onClickCustomer">联系客服</div>
                        <div class="twoBtn" @click="showFinishPay= false">支付成功</div>
                    </div>

                    <div class="flex-safe-bottom"></div>
                </div>
            </div>

        </div>
        <van-overlay :show="showOrderLoading" z-index="9999">
            <div class="centerTip">
                <van-loading type="spinner" vertical>正在下单，页面跳转中请稍等</van-loading>
            </div>
        </van-overlay>
    </div>
</template>

<script> 

import { AppResImgCodes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import loading from "~/components/loading.vue";
const GoodsType = {
    Diamond: 1,
    Vip: 2,

};

import * as utils from "~/assets/js/utils";

export default {
    name: "recharge",
    layout: "keepalive",
    components: {
        loading
    },

    mixins: [pageMixin],
    data() {
        return {
            isLoading: true,
            curTabIndex: 0,
            showType: '',
            swiperOption: {
                edgeSwipeDetection: true,
                // autoHeight: true,
            },
            showOrderLoading: false,
            payTypeChecked: "-1",
            curPayType: "",
            vipCheckIdx: 0,
            diamondCheckIdx: 0,
            showConfirm: false,
            confirmData: {},
            payBg: require("~/assets/img/default/vipDefaultBg.png"),

            vipDec: "您当前未开通VIP",
            userInfo: {},


            showPayPanel: false,
            showPayConfirm: false,
            showFinishPay: false,

            payInfo: {},
            isShowAliPay: false,
            isShowWxPay: false,
            isShowDiamondPay: false,

            vipCardInfo: [],
            curVipCardInfo: {},

            diamondCardInfo: {},
            curDiamondCardInfo: {},

            curPayInfo: {},
        };
    },
    async created() {
        console.log("recharge created");
        if (!this.$userStore.checkLogin(false))
            return;
        this.$nuxt.$on('timeInterval', this.onTimeInterval);

        this.updateUserInfo();

        let info = window.rechargeInfo;
        if (info) {
            this.isLoading = false;
            this.vipCardInfo = info.vipCfg;
            this.diamondCardInfo = info.diamondCfg;

            let curTime = new Date();
            for (let item of this.vipCardInfo) {
                item.countdown = 0;
                if (item.limitTime) {
                    let time = new Date(item.limitTime);
                    item.countdown = (time - curTime) / 1000;
                }
            }
            this.$forceUpdate();
            this.onclickCheckVipItem(this.vipCheckIdx);
            this.onclickCheckDiamondItem(this.diamondCheckIdx);
        }
        let res = await this.$api.getRechargeCfg({});
        if (res.errorCode !== 0) {
            this.isLoading = false;
            this.$toast("数据请求出错：" + res.message);
            return;
        }
        info = res.data;
        let { privilegeCfg, vipCfg, diamondCfg } = info;
        if (privilegeCfg && vipCfg && vipCfg.length > 0) {
            vipCfg.forEach((v) => {
                v.privileges = [];
                if (v.privilegeCodes && v.privilegeCodes.length > 0) {
                    v.privilegeCodes.forEach((pc) => {
                        v.privileges.push(privilegeCfg[pc]);
                    });
                }
            });
        }
        window.rechargeInfo = { vipCfg, diamondCfg };
        this.vipCardInfo = vipCfg;
        this.diamondCardInfo = info.diamondCfg;

        let curTime = new Date();
        for (let item of this.vipCardInfo) {
            item.countdown = 0;
            if (item.limitTime) {
                let time = new Date(item.limitTime);
                let countdown = (time - curTime) / 1000;
                if (countdown > 0) {
                    item.countdown = countdown;
                }
            }
        }
        this.$forceUpdate();

        this.onclickCheckVipItem(this.vipCheckIdx);
        this.onclickCheckDiamondItem(this.diamondCheckIdx);
        this.downloadBG().then(() => {
            this.isLoading = false;
        });
    },

    mounted() {
        console.log("recharge mounted");
        if (!this.$userStore.checkLogin(false))
            return;
        this.$parent.showTabbar = false;
        this.$parent.initTheme(AppResImgCodes.rechargePageBg);

        let showType = this.$route.query.type;
        if (showType) {
            this.showType = showType;
            if (this.showType == "vip")
                this.curTabIndex = 0;
            else if (this.showType == "diamond")
                this.curTabIndex = 1;
        }

        this.$nextTick(() => {
            if (!this.$refs.mySwiper) return;
            this.$refs.mySwiper.$swiper.slideTo(this.curTabIndex, 0);
        });

    },
    activated() {
        console.log("recharge activated");
        this.$parent.showTabbar = false;
        this.$parent.initTheme(AppResImgCodes.rechargePageBg);
    },
    deactivated() {
        console.log("recharge deactivated");
    },
    destroyed() {
        console.log("recharge destroyed");
    },

    methods: {
        formatSecond(time) {
            return utils.formatSecondsToDay(time);
        },
        onTimeInterval(timeDiff) {
            for (let item of this.vipCardInfo) {
                if (item.countdown) {
                    item.countdown = item.countdown - timeDiff / 1000;
                    this.$forceUpdate();

                }
            }

            // vipCardInfo: []
            // diamondCardInfo: { }

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

        downloadBG() {
            return new Promise((resolve) => {
                let loadCnt = 0;
                if (!this.vipCardInfo.length) {
                    resolve();
                }
                for (let i = 0; i < this.vipCardInfo.length; i++) {
                    let item = this.vipCardInfo[i];
                    this.vipCardInfo[i].base64ImageData = this.payBg;
                    if (!item.bgImg) {
                        continue;
                    }

                    this.$fileloader.dowloadPngImg(item.bgImg, 240, (url, data) => {
                        if (data) {
                            this.vipCardInfo[i].base64ImageData = data;
                            this.$forceUpdate();
                        }
                        loadCnt++;

                        if (loadCnt === this.vipCardInfo.length) {
                            resolve();
                        }
                    });
                }
            });
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


        rechargeItemClass(index) {
            let cls = "";
            if (this.vipCheckIdx === index) {
                cls += ' selectActive';
            }
            return cls;
        },
        updateUserInfo() {
            let data = this.$userStore.getMyInfo();

            let vipType = "您当前未开通VIP";
            let vipLevelInfo = this.$main.getVipLevelInfo();
            if (vipLevelInfo) {
                for (let item of vipLevelInfo) {
                    if (item.vipLevel == data.vipLevel) {
                        vipType = "已开通" + item.name;
                        // this.headIcon = item.icon;
                        break;
                    }
                }
            }

            this.vipDec = vipType;
            this.userInfo = data;
        },
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
            this.$router.push({
                path: "/recharge/rechargeRecord",
                query: {},
            });
        },


        onclickCheckVipItem(idx) {
            this.vipCheckIdx = idx;
            this.curVipCardInfo = this.vipCardInfo[idx];
        },

        onclickCheckDiamondItem(idx) {
            this.diamondCheckIdx = idx;
            this.curDiamondCardInfo = this.diamondCardInfo[idx];

        },

        onCheckPayType(d1) {
            this.curPayType = d1;
        },


        async onClickShowPayDetail() {
            this.showPayPanel = true;
            let itemInfo = {};
            let goodsType = 0;
            if (this.curTabIndex == 0) {
                itemInfo = this.curVipCardInfo;
                goodsType = GoodsType.Vip;
            } else if (this.curTabIndex == 1) {
                itemInfo = this.curDiamondCardInfo;
                goodsType = GoodsType.Diamond;
            }
            this.curPayInfo = { ...itemInfo, goodsType: goodsType, };
            this.isShowAliPay =
                itemInfo.payType.indexOf("ali_pay") >= 0 ? true : false;
            this.isShowWxPay = itemInfo.payType.indexOf("wx_pay") >= 0 ? true : false;
            this.isShowDiamondPay = itemInfo.payType.indexOf("diamond_pay") >= 0 ? true : false;
        },

        async onClickPay() {
            if (this.payTypeChecked < 0) {
                this.$toast("请选择支付方式");
                return;
            }
            let itemInfo = this.curPayInfo;

            // this.payInfo[this.vipCheckIdx];
            if (itemInfo.payType.indexOf(this.curPayType) < 0) {
                this.$toast("请选择支付方式");
                return;
            }
            if (this.curPayType == 'diamond_pay') {
                this.showOrderLoading = true;
                let data = this.$userStore.getMyInfo();
                if (data.diamond < itemInfo.price) {

                    this.showOrderLoading = false;
                    this.$toast('钻石不足');
                    return;
                }

                let res = await this.$api.recharge({
                    goodsType: itemInfo.goodsType,
                    id: itemInfo.id,
                    payType: this.curPayType,
                    deviceType: this.appSource(),
                });

                this.showOrderLoading = false;
                if (res.errorCode !== 0) {
                    this.$toast(res.message);
                    return;
                }
                this.showFinishPay = true;
                this.$toast('会员充值成功，详情可查看充值记录');

                this.showPayPanel = false;
                this.$api.updateMyInfo().then(() => {
                    this.updateUserInfo();
                });
                return;
            }
            this.showPayConfirm = true;
            this.showPayPanel = false;
            return;
        },

        async onClickSurePay() {
            let itemInfo = this.curPayInfo;
            this.showPayPanel = false;
            this.showOrderLoading = true;

            let popupWin;
            if (!this.$env.inCordova && this.$env.device.ios()) {
                popupWin = window._open("", "_blank");
            }

            let res = await this.$api.recharge({
                goodsType: itemInfo.goodsType,
                id: itemInfo.id,
                payType: this.curPayType,
                deviceType: this.appSource(),
            });
            this.showOrderLoading = false;
            if (res.errorCode !== 0) {
                if (popupWin) popupWin.close();
                this.$toast(res.message);
                return;
            }

            let data = res.data;
            let rurl = data.url;

            if (popupWin) {
                popupWin.location = rurl;
            }
            else {
                this.$nextTick(() => {
                    window.open(rurl, "_blank");
                });
            }
            let time;
            if (data.createDate) {
                time = new Date(data.createDate).format("yyyy年MM月dd日");
            } else {
                time = new Date();
            }

            this.confirmData = {
                price: this.curPayInfo.price,
                name: this.curPayInfo.name,
                payType: this.curPayType,
                orderCode: data.orderId,
                payTime: time,
            };
            this.payTime = time;
            this.showFinishPay = true;

            this.showPayConfirm = false;
            // this.showConfirm = true;
        },

        appSource() {
            const u = navigator.userAgent;
            const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isiOS) {
                return "ios";
            } else {
                return "android";
            }
        },
    },
};
</script>
<style lang="less">
.recharge-index-page {
    background-color: @theme-color !important;
    background-repeat: no-repeat;
    background-size: contain;

    body {
        background: transparent !important;
    }
}
</style>
<style lang="less" scoped>
.recharge {
    visibility: visible;
}
.van-nav-bar {
    background: transparent;
}
.van-popup {
    background: @theme-color;
}

.userInfo {
    padding: 15px 0 15px 15px;
    justify-content: space-between;
}

.payIcon {
    height: 30px;
    width: 30px;
}

.userInfo,
.userInfo .left {
    display: flex;
    align-items: center;
}

.userInfo .left .pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.userInfo .left .pic img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
}

.userInfo .left .info {
    padding-left: 20px;
}

.userInfo .left .info .name {
    font-size: 19px;
    color: @recharge-font-color7;
}

.isVip {
    font-size: 13px;
    color: @recharge-font-color1;
    margin-top: 8px;
}

.userInfo .right {
    width: 90px;
    height: 30px;
    background: @recharge-bg-color2;
    color: @recharge-font-color11;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

.vipCard {
    width: 100%;
    padding-left: 20px;
    overflow-x: auto;
    display: flex;
    align-items: flex-end;
    height: 210px;
    margin-bottom: 20px;
    // padding-bottom: 0.5rem;
}

.vipCard::-webkit-scrollbar {
    width: 0 !important;
}

.vipCardItem {
    border-radius: 20px;
    width: 150px;
    height: 190px;
    flex: none;
    margin-right: 10px;
    position: relative;
    color: #f5f5f5;
    background-size: cover;
    .des {
        flex: 1;
        font-size: 12px;
        margin-top: 6px;
        text-align: center;
        max-height: 52px;
        overflow: hidden;
        p {
            margin-block-start: 0em;
        }
    }
}

.vipCardItemInfo {
    padding: 20px 15px 0;
    width: 150px;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.vip_privilege {
    width: 50px;
    height: 50px;
}

.mark {
    height: 20px;
    padding: 0 10px;
    background: @recharge-bg-color1;
    color: @recharge-font-color7;
    font-size: 12px;
    line-height: 20px;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    position: absolute;
    top: -10px;
    right: 0;
}

.vipCard .vipCardItem .name {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
}

.vipCard .vipCardItem .price {
    font-size: 14px;
    text-align: center;
}
.originalPrice {
    font-size: 16px;
    text-decoration: line-through;
}

.vipCardItem .price span {
    font-size: 36px;
    padding-left: 5px;
}

.changeMonth {
    font-size: 12px;
    height: 22px;
    // margin-top: 6px;
    text-align: center;
    color: @recharge-font-color4;
}

.time {
    position: absolute;
    left: 0;
    bottom: 0;
    background: @recharge-font-color4;
    width: 100%;
    height: 20px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: @text-color;
    .van-count-down {
        color: @text-color;
        font-size: 12px;
        height: 100%;
    }

    span {
        padding-left: 3px;
        height: 100%;
    }
}

.selectActive {
    // border: 1px solid @active-color;
    height: 195px;
    width: 155px;
}

.selectPay {
    width: 100%;
    padding: 0 20px;
    margin-top: 14px;
    font-size: 15px;
    color: @recharge-font-color2;
}

.selectPay .van-radio {
    width: 100%;
    justify-content: space-between;
    margin: 15px 0;
}

.selectPay .cell,
.selectPay .van-radio {
    display: flex;
    align-items: center;
}

.selectPay .cell span {
    font-size: 15px;
    color: @recharge-font-color6;
    padding-left: 12px;
}

.tipTitle {
    /* margin: 0px auto; */
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
        font-size: 18px;
        margin: 0 10px;
        color: @active-color;
    }
}
.mainInfo {
    flex: 1;
}
.kindTips {
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    font-size: 12px;
    color: @recharge-font-color2;
    line-height: 20px;
    div {
        text-align: left;
        margin: 5px 0;
    }
    span {
        color: @recharge-font-color4;
    }
}

.panel {
    margin-top: 20px;
    // padding: 0 20px 100px;
}

.privilegeItem {
    font-size: 14px;
    color: @theme-color2;
    text-align: center;
    margin: 10px 0;
    img {
        width: 50px;
        margin: 0 auto;
    }
}

.bottomContent {
    width: 100%;
    padding: 0 20px;
    background: @theme-color;
    text-align: center;
}

.bottomContent .tips {
    color: @recharge-font-color4;
    font-size: 15px;
}
.paynow {
    width: 90%;
    height: 43px;
    border-radius: 50px;
    text-align: center;
    margin: 10px auto;
    line-height: 43px;
    font-size: 18px;
    color: @recharge-font-color5;
    // font-weight: 700;
    background: @recharge-bg-color3;
}

.centerTip {
    margin-top: 40vh;
}

.quantily {
    margin-top: 10px;
    color: @text-color;
    text-align: center;
    font-size: 16px;

    span {
        font-size: 0.8em;
    }
    .money {
        color: @active-color;
        font-size: 1em;
    }

    .custom {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        color: @recharge-font-color2;
    }
}

.rechargeConfirm {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    font-size: 16px;
    text-align: center;
    z-index: 2;
    display: flex;
    justify-content: center;
    span {
        color: @recharge-font-color4;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 326px;
    }

    .block {
        width: 360px;
        // height: 480px;
        background-color: @recharge-bg-color5;
        border-radius: 15px;
        background-image: url("~/assets/img/pay/tsbg.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
        .tip {
            color: #000;
        }
    }

    .confirmtitle {
        // position: absolute;
        font-size: 24px;
        padding-top: 20px;
        text-align: center;
        // top: 15px;
        // left: 50%;
        // transform: translateX(-50%);
        color: @theme-color1;
    }

    .twoBtn {
        width: 40%;
        height: 43px;
        border-radius: 50px;
        text-align: center;
        margin: 10px auto;
        line-height: 43px;
        font-size: 18px;
        color: @recharge-font-color5;
        // font-weight: 700;
        background: @recharge-bg-color3;
    }
}

.box {
    // width: 100%;
    margin: 20px;
    font-size: 24px;
    background: @recharge-bg-color7;
    border-radius: 15px;
    height: 200px;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    color: @recharge-font-color8;
    .box-tip {
        color: @recharge-font-color9;
    }
}

.box .bottom {
    display: flex;
    font-size: 15px;
    align-items: center;
    justify-content: space-between;
}

.box .btn {
    width: 90px;
    height: 33px;
    background: @recharge-bg-color8;
    color: @recharge-font-color11;
    font-size: 14px;
    border-radius: 50px;
    text-align: center;
    line-height: 33px;
}
.diamondCnt {
    font-size: 42px;
    margin: 15px 0;
    display: flex;
    align-items: center;
}
.diamond {
    width: 48px;
    height: 40px;
    background-size: 1087.5px 957px;
    background-position: -1028px -228px;
}

.diamondCardItem {
    width: 100%;
    height: 70px;
    font-size: 13px;
    background: @recharge-bg-color10;
    color: @recharge-font-color7;
    border-radius: 10px;

    text-align: center;

    .price {
        color: @recharge-font-color10;
        padding-top: 8px;
    }
    .price span {
        font-size: 22px;
    }
}
.selectDiamondCardActive {
    background: @recharge-bg-color9;

    .price {
        color: @recharge-font-color8 !important;
    }
}
.van-grid-item__content {
    padding: 0 !important;
}

.flex-safe-bottom {
    height: var(--safe-bottom);
    position: fixed;
    width: 100%;
    background: @theme-color;
    bottom: 0;
}

.slider {
    display: flex;
    flex-direction: column;
}
</style>


