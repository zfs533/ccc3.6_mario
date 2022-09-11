<template>
    <div class="promote flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickShowPage('bankCard')" title="推广赚钱" right-text="银行卡管理" style="z-index: 1000; width: 100%; " :placeholder="true">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="list scroll-container">
                <div class="appPromotePage">
                    <div class="promote_top">
                        <div class="app_title">收益总额</div>
                        <div class="app_amout_box">
                            <div class="app_amount">
                                <img src="~/assets/img/promote/zuanshix0.5.png" alt="" />
                                <div class="promtoe_balance">{{promoteInfo.balance}}</div>
                            </div>
                            <div class="app_withdrawBtn" @click="onClickShowPage('withdraw')">立即提现</div>
                        </div>
                    </div>
                    <div class="promoteInfo">
                        <div class="promoteInfo_titles ">
                            <div class="promoteInfo_title ">成功推广人数</div>
                            <div class="promoteInfo_num ">{{promoteInfo.totalPromoteCnt}}</div>
                        </div>
                        <div class="app_promote_line"></div>
                        <div class="promoteInfo_titles ">
                            <div class="promoteInfo_title ">总推广收益 </div>
                            <div class="promoteInfo_num"> {{promoteInfo.totalIncome}}</div>
                        </div>
                        <div class="app_promote_line"></div>
                        <div class="promoteInfo_titles ">
                            <div class="promoteInfo_title ">今日推广收益</div>
                            <div class="promoteInfo_num">{{promoteInfo.todayIncome}}</div>
                        </div>
                        <div class="app_promote_line"></div>
                    </div>
                    <van-row class="promote_logos" type="flex" justify="space-around">
                        <div class="promote_logo" @click="onClickShowPage('incomeBreakdown')">
                            <van-icon name="balance-list-o" size="40" />
                            <div class="promote_logo_title ">收益明细</div>
                        </div>
                        <div class="promote_logo " @click="onClickShowPage('promotionRecord')">
                            <van-icon name="records" size="40" />
                            <div class="promote_logo_title ">推广记录</div>
                        </div>
                        <div class="promote_logo " @click="onclickShowshare">
                            <van-icon name="share-o" size="40" />
                            <div class="promote_logo_title ">立即推广</div>
                        </div>
                    </van-row>

                    <div class="rebateBox">
                        <div class="rebateBox_top">
                            <img src="~/assets/img/promote/jiantou.png" alt="">
                            <div>推广返利</div>
                            <img src="~/assets/img/promote/jiantou.png" alt="" style="transform: rotate(180deg)">
                        </div>
                        <div class="profit_title">
                            <div style="width:80px;">累计充值</div>
                            <div style="width:80px;">返利百分比</div>
                        </div>
                        <div class="app_promote_line"></div>
                        <div class="profit_items" v-for="(itemData, index) in promoteCfg.config" :key="index">
                            <div class="profit_item">
                                <div style="width:80px;" class="left" v-if="index == 0">{{ promoteCfg.config[index + 1].value}}以下</div>
                                <div style="width:80px;" class="left" v-else>{{promoteCfg.config[index + 1] ? itemData.value + '-' + promoteCfg.config[index + 1].value : (itemData.value +'以上')}}</div>
                                <div style="width:80px" class="right">返利{{ parseInt(itemData.rate * 100) }}%</div>
                            </div>
                            <div class="app_promote_line"></div>
                        </div>
                    </div>
                    <div class="rebateBox">
                        <div class="rebateBox_top">
                            <img src="~/assets/img/promote/jiantou.png" alt="">
                            <div>推广流程</div>
                            <img src="~/assets/img/promote/jiantou.png" alt="" style="transform: rotate(180deg)">
                        </div>
                        <div class="stepBox">
                            <div class="stepImg">1</div>
                            <div class="stepContentBox">
                                <div class="stepTitle">第一步: 点击<span class="stepTitleColor">”立即推广“</span></div>
                                <div class="stepContent">将"二维码"分享给其他人或其他渠道，对方扫码下载APP并登录了新账号，则视为推广成功</div>
                            </div>
                        </div>
                        <div class="stepBox">
                            <div class="stepImg">2</div>
                            <div class="stepContentBox">
                                <div class="stepTitle">第二步: 对方<span class="stepTitleColor">充值</span></div>
                                <div class="stepContent">推广的用户充值，则充值金额按照「推广级别」的比例返利给您，若有什么疑问请联系<span class="stepTitleColor">"在线客服"</span></div>
                            </div>
                        </div>
                        <div class="stepBox">
                            <div class="stepImg">3</div>
                            <div class="stepContentBox">
                                <div class="stepTitle">第三步: <span class="stepTitleColor">收益提现</span></div>
                                <div class="stepContent">
                                    <div>收益可以提现，月入万元不是梦！</div>
                                    <div>立即提现 <span class="stepTitleColor">--></span> 银行卡</div>
                                </div>
                            </div>
                        </div>
                        <div class="app_promote_line"></div>
                        <div class="bottomText">
                            <div>一看即会，任何人都可参与，边看片边赚钱终身享受</div>
                            <div style="text-align: left">利润分红，任何疑问请联系<span class="stepTitleColor" @click="onClickCustomer">在线客服</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showLoading" class="loading">
            <van-loading size="50px" vertical>加载中...
            </van-loading>
        </div>
        <div class="flex-safe-bottom"></div>
    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";

import loading from "~/components/loading.vue";
export default {
    name: "promote",
    layout: "keepalive",
    components: { loading },
    mixins: [pageMixin],
    data() {
        return {
            showLoading: true,
            canApply: false,
            isPromote: false,
            state: 1,
            isUpdatInfo: true,
            promoteCfg: {
                config: [],
            },
            promoteInfo: {
                balance: "0",
                totalIncome: "0",
                totalPromoteCnt: 0,
                inviteUrl: "",
                todayIncome: "0",
                todayPromoteCnt: 0,
                bankCardName: "",
                bankCardNo: "",
                bankCode: "",
                withdrawalFee: 5
            }
        };
    },
    async mounted() {
        console.log("promote created");
        this.$parent.showTabbar = false;
        if (!this.isUpdatInfo) {
            this.showLoading = false;
            return;
        }
        window.promoteInfo = this.promoteInfo;
        this.loadPromoteInfo();
    },
    activated() {
        this.$parent.showTabbar = false;
    },
    methods: {
        async loadPromoteInfo() {
            let res = await this.$api.promoteBasicInfo();
            this.showLoading = false;
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错：" + res.message);
                return;
            }
            this.canApply = res.data.canApply;
            this.isPromote = res.data.isPromote;
            if (res.data.promoteInfo) {
                this.promoteInfo = res.data.promoteInfo;
                // this.$storage.set("promoteInfo", this.promoteInfo);
                window.promoteInfo = this.promoteInfo;
            }
            if (res.data.promoteCfg && res.data.promoteCfg.config.length > 1) {
                this.promoteCfg = res.data.promoteCfg;
            }
        },
        onClickLeft() {
            this.$router.push({
                path: "/my",
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
        onClickShowPage(name) {
            if (this.isPromote) {
                if (name === 'withdraw') {
                    if (this.promoteInfo.bankCardName === "") {
                        name = "bindBankCard";
                    }
                }
                this.$router.push({
                    path: "/promote/" + name,
                });
            } else {
                if (!this.canApply) {
                    this.$toast('正在审核中');
                } else {
                    this.$dialog.confirm({
                        title: '申请提示',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        message: '你是要申请APP推广嘛？'
                    }).then(async () => {
                        let res = await this.$api.promoteApply();
                        let str = "";
                        switch (res.data) {
                            case 1:
                                str = "正在审核中，请稍后";
                                this.canApply = false;
                                break;
                            case 2:
                                str = "审核通过";
                                this.isPromote = true;
                                this.loadPromoteInfo();
                                break;
                            default:
                                break;
                        }
                        this.$toast(str);
                    }).catch((err) => {
                        console.log("取消", err);
                    });
                }
            }
        },
        onclickShowshare() {
            this.$router.push({
                path: "/my/share",
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
        formatNumber(nb) {
            return utils.formatNumber(nb);
        },

    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // vm相当于上面的this
            vm.fromPage = from.path;
            if (from.name.indexOf("incomeBreakdown") > 0 || from.name.indexOf("promotionRecord") > 0 || from.name.indexOf("share") > 0) {
                vm.isUpdatInfo = false;
            } else {
                vm.isUpdatInfo = true;
            }
        });

    }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background: @common-color1;
}
.promote {
    background: @common-color1;

    .flex-safe-top {
        height: var(--safe-top);
        position: fixed;
        width: 100%;
        background: @common-color1;
        top: 0;
    }

    .flex-safe-bottom {
        height: var(--safe-bottom);
        position: fixed;
        width: 100%;
        background: @common-color1;
        bottom: 0;
    }
}
.appPromotePage {
    width: 100%;
    // padding: 0 16px;
    .app_title {
        font-size: 20px;
        margin-top: 15px;
        color: @promote-font-color1;
    }
    .promote_top {
        padding: 0 16px;
        display: flex;
        height: 130px;
        // background-image: linear-gradient(-30deg, #323232, #424242);
        background: @promote-bg-color1;

        border-radius: 10px;
        flex-direction: column;
    }
    .app_amout_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 35px 0 0;
    }
    .app_withdrawBtn {
        width: 108px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 20px;
        font-size: 14px;
        background: @common-btnBG-color1;
        color: @common-btnText-color1;
    }
    .app_amount {
        display: flex;
        .promtoe_balance {
            font-size: 40px;
            height: 35px;
            line-height: 30px;
            color: @promote-font-color1;
        }
    }
    .app_promote_line {
        height: 1px;
        background: @promote-bg-color2;
    }
    .promoteInfo_titles {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .promoteInfo_title {
        font-size: 14px;
        margin-left: 25px;
        width: 86px;
        color: @promote-font-color1;
    }
    .promoteInfo_num {
        font-size: 14px;
        color: @promote-font-color2;
        margin-left: 25px;
    }
    .promote_logo {
        padding: 10px;
        margin: 10px;
        text-align: center;
        .van-icon {
            color: @promote-font-color1;
        }
    }
    .promote_logo_title {
        margin-bottom: 10px;
        font-size: 14px;
        color: @promote-font-color2;
        text-align: center;
    }
    .rebateBox_top {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 16px;
        color: @promote-font-color1;
        line-height: 35px;
    }
    .profit_title {
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        color: @promote-font-color2;
        text-align: center;
        margin-bottom: 10px;
    }
    .profit_item {
        font-size: 12px;
        color: @promote-font-color2;
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .stepBox {
        padding: 0 12px 0 20px;
        display: flex;
        margin-bottom: 20px;
    }
    .stepImg {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: @promote-bg-color4;
        color: @common-btnText-color1;
        font-size: 12px;
        line-height: 25px;
    }
    .stepContentBox {
        display: flex;
        flex: 2;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
        color: @promote-font-color2;
        margin-top: 2px;
    }
    .stepTitle {
        font-size: 14px;
        color: @promote-font-color2;
    }
    .stepContent {
        font-size: 12px;
        color: @promote-font-color2;
        margin-top: 5px;
        text-align: left;
    }
    .stepTitleColor {
        color: @promote-font-color3;
    }
    .bottomText {
        font-size: 12px;
        text-align: left;
        margin-left: 53px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: @promote-font-color2;
    }
    .rebateBox {
        background: @promote-bg-color3;
        border-radius: 10px;
        // border: 1px solid;
        // color: @promote-border-color1;
        text-align: center;
        height: 100%;
        margin-bottom: 20px;
    }
}
.loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    .van-loading__text {
        color: #ffffff;
    }
}
</style>