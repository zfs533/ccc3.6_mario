<template >
    <div class="flex-container gold-withdraw">
        <div class="flex-safe-top"></div>

        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onclickShowBankCard" title="金币提现" right-text="银行卡管理" style="z-index: 1000; width: 100%" :placeholder="true">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="withdraw-body">
                <div class="balanceInfo">
                    <div class="banlance">余额:</div>
                    <div class="app_amount">
                        <img style="height:35px" src="~/assets/img/promote/zuanshix0.5.png" alt="" />
                        <div class="promtoe_balance">{{promoteInfo.balance}}</div>
                    </div>
                    <div class="proportion">提现比例1钻石=1元</div>
                </div>
                <div class="cardBox">
                    <div class="cardNameBox">
                        <div class="banlance">{{promoteInfo.bankCardName}}</div>
                        <div class="bankName">{{promoteInfo.bankCode}}</div>
                    </div>
                    <div class="bankCardNo">{{promoteInfo.bankCardNo}}</div>
                </div>
                <div class="withdrawAmount">
                    <div class="lab">提现金额：</div>
                    <van-field placeholder="请输入提现金额" type="tel" v-model="inputGoldNum">
                        <template #button>
                            <div class="allBtn" @click="onClickAllBtn">全部</div>
                        </template>
                    </van-field>
                </div>
                <div class="tips">
                    <div class="lab">手续费率：</div>
                    <div class="tip">{{feeTip}}</div>
                </div>
                <div class="btn" @click="onClickWithdraw">立即提现</div>
                <div class="remind"> 1.每次提现金额必须满足 ≥100，且为10的整数倍额度才能提现<br> 2.提交提现申请后3个工作日内到账<br> 3.请确保银行卡信息正确，若错误会导致提现失败 </div>
            </div>
        </div>
        <div class="flex-safe-bottom"></div>
    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: "withdraw",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            inputGoldNum: 0,
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
    computed: {
        feeTip: function () {
            let coldNum = Number(this.inputGoldNum);
            if (isNaN(coldNum) || coldNum < 0) coldNum = 0;
            let fee = 0;
            if (this.promoteInfo) {
                fee = this.promoteInfo.withdrawalFee;
            }
            return `提现手续费为 ${fee}%，实际到账为 ${coldNum * parseFloat((1 - (fee / 100))).toFixed(2)} 元`;
        }
    },
    created() {
        console.log("promote created");
        let promoteInfo = window.promoteInfo;
        if (promoteInfo) {
            this.promoteInfo = promoteInfo;
        }
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onclickShowBankCard() {
            this.$router.push({
                path: "/promote/bankCard",
            });

        },
        onClickAllBtn() {
            this.inputGoldNum = Number(this.promoteInfo.balance);
            if (this.inputGoldNum < 100) {
                this.$toast("余额不足");
                return;
            }
        },
        async onClickWithdraw() {
            let coldNum = Number(this.inputGoldNum);
            if (isNaN(coldNum) || coldNum < 100 || coldNum > this.promoteInfo.balance) {
                this.$toast("提现金额不正确，请检查余额是否充足");
                return;
            }
            let res = await this.$api.promoteWithdraw({ money: parseInt(this.inputGoldNum) });
            if (res.errorCode !== 0) {
                this.$toast("兑换失败: " + res.message);
                return;
            }
            this.$toast("提现成功");
            this.promoteInfo.balance = this.promoteInfo.balance - parseInt(this.inputGoldNum);
        }
    }
}
</script>

<style  lang="less" scoped>
.van-nav-bar {
    background: @common-color1;
}
.gold-withdraw {
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
    ::v-deep .van-field__control::-webkit-input-placeholder {
        color: @promote-font-color5;
    }
    .withdraw-body {
        padding: 0.427rem 0.427rem 0;

        .cardBox {
            padding: 11px 22px;
            border-radius: 10px;
            background: @promote-bg-color1;
            color: @promote-font-color1;
            font-size: 20px;
            .cardNameBox {
                display: flex;
                justify-content: space-between;
            }
            .bankCardNo {
                margin-top: 11px;
            }
        }

        .balanceInfo {
            background: @promote-bg-color1;
            color: @promote-font-color1;
            padding: 11px 22px;

            margin: 10px 0;
            // height: 130px;
            border-radius: 10px;
        }

        .banlance {
            font-size: 20px;
            color: @promote-font-color1;
        }
        .app_amount {
            display: flex;
            align-items: center;
            margin: 10px 0;

            .promtoe_balance {
                color: @promote-font-color1;
                margin-left: 10px;
                line-height: 30px;
                font-size: 40px;
            }
        }
        .proportion {
            font-size: 15px;
            color: @promote-font-color1;
        }
        .withdrawAmount {
            display: flex;
            font-size: 18px;
            margin-top: 20px;
            white-space: nowrap;
            align-items: center;
            .van-cell {
                background: @common-inputBG-color1;
                border-radius: 25px;
                padding: 8px 16px;
            }
            .allBtn {
                font-size: 18px;
                color: @promote-font-color2;
            }
        }
        .lab {
            margin-right: 10px;
            white-space: nowrap;
            color: @promote-font-color2;
        }
        .tips {
            font-size: 18px;
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .tip {
            font-size: 16px;
            color: @promote-font-color5;
        }
        .btn {
            // height: 1.12rem;
            line-height: 1.12rem;
            border-radius: 0.72rem;
            font-size: 0.533rem;
            color: @common-btnText-color1;
            margin: 50px 15px;
            background: @common-btnBG-color1;
            text-align: center;
        }
        .remind {
            font-size: 0.32rem;
            line-height: 0.48rem;
            color: @promote-font-color5;
        }
        .van-cell {
            background: transparent;
        }
    }
}
</style>