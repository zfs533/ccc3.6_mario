<template >
    <div class="flex-container bindBankCard">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="绑定银行卡" style="z-index: 1000; width: 100%;" :placeholder="true">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="body">
                <div class="bank_input">
                    <div class="bank_name">开户姓名：</div>
                    <div class="inputBox">
                        <div class="van-cell ">
                            <van-field placeholder="请输入真实姓名" type="text" v-model="bankCardName">
                            </van-field>
                        </div>
                    </div>
                </div>
                <div class="bank_input">
                    <div class="bank_name">开户银行：</div>
                    <div class="inputBox">
                        <div class="van-cell ">
                            <van-field placeholder="请输入开户行名称如工商银行" type="text" v-model="bankCode">
                            </van-field>

                        </div>
                    </div>
                </div>
                <div class="bank_input">
                    <div class="bank_name">银行卡号：</div>
                    <div class="inputBox">
                        <div class="van-cell ">
                            <van-field placeholder="请输入账号卡号" type="number" v-model="bankCardNo">
                            </van-field>
                        </div>
                    </div>
                </div>
                <div class="tip">*请确保银行卡信息正确，若错误会导致兑换失败</div>
                <div class="confirm">
                    <div class="confirmBtn" @click="onClickBind">确认</div>
                </div>
            </div>
            <div class="flex-safe-bottom"></div>
        </div>
    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: "bindBankCard",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            bankCode: "",
            bankCardName: "",
            bankCardNo: ""
        };
    },
    created() {
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: "/promote",
            });
        },
        async onClickBind() {
            if (!this.bankCardName || !this.bankCode || !this.bankCardNo) {
                this.$toast("请输入正确的卡号信息");
                return;
            }
            let res = await this.$api.promoteModifyBank({
                realName: this.bankCardName,
                bankCode: this.bankCode,
                bankCardNumber: this.bankCardNo
            });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            window.promoteInfo.bankCardName = this.bankCardName;
            window.promoteInfo.bankCode = this.bankCode;
            window.promoteInfo.bankCardNo = this.bankCardNo;
            this.$toast("绑定成功");
            this.$router.replace({
                path: "/promote/bankCard",
            });
        },
    }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background: @common-color1;
}
.bindBankCard {
    background: @common-color1;
    height: 100%;

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

    .body {
        padding: 10px 10px 0;
        margin: 0 auto;
        .bank_input {
            display: flex;
            align-items: center;
            margin: 20px 0;
        }
        .bank_name {
            font-size: 14px;
            color: @promote-font-color2;
        }
        .inputBox {
            background: @promote-bg-color5;
            border-radius: 50px;
            width: 250px;
        }
        .van-cell {
            background: none;
            display: flex;
            align-items: center;
            height: 35px;
        }
    }
    ::v-deep .van-field__control::-webkit-input-placeholder {
        color: @promote-font-color5;
    }
    .tip {
        color: @promote-font-color5;
        font-size: 12px;
    }
    .confirmBtn {
        width: 100%;
        height: 32px;
        text-align: center;
        line-height: 30px;
        color: @common-btnText-color1;
        border-radius: 20px;
        font-size: 14px;
        background-image: @common-btnBG-color1;
    }
    .confirm {
        margin: 20px;
        display: flex;
        justify-content: space-around;
    }
}
</style>