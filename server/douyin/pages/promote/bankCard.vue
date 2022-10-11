<template >
    <div class="promote flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="银行卡管理" style="z-index: 1000; width: 100%;" :placeholder="true">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="body">
                <div class="bankCard_cardBox">
                    <div class="cardNameBox">
                        <div class="name">{{promoteInfo.bankCardName}}</div>
                        <div class="bankName">{{promoteInfo.bankCode}}</div>
                    </div>
                    <div class="bankCardNo">{{promoteInfo.bankCardNo}}</div>
                </div>
                <div class="tip">*只能绑定一张银行卡<br>*请确保银行卡信息正确，若错误会导致提现失败</div>
                <div class="modifyBtn" @click="onClickChangeCard">更换银行卡</div>
            </div>
        </div>
        <div class="flex-safe-bottom"></div>
    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: "bankCard",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            promoteInfo: {
                bankCardName: "",
                bankCardNo: "",
                bankCode: ""
            }
        };
    },
    created() {
        let promoteInfo = window.promoteInfo;
        if (promoteInfo) {
            this.promoteInfo = promoteInfo;
        }

        if (this.promoteInfo.bankCardName === "") {
            this.$router.replace(
                {
                    path: "/promote/bindBankCard"
                }
            );
        }
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onClickChangeCard() {
            this.$router.push({
                path: "/promote/bindBankCard",
            });
        }
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

    .body {
        padding: 0 0.267rem;
        .bankCard_cardBox {
            padding: 10px 16px;
            display: flex;
            background: @promote-bg-color1;
            border-radius: 10px;
            flex-direction: column;
            color: @promote-font-color1;
            .cardNameBox {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
            }
            .bankCardNo {
                font-size: 14px;
                line-height: 30px;
            }
        }
        .modifyBtn {
            width: 100%;
            height: 32px;
            text-align: center;
            line-height: 30px;
            color: @common-btnText-color1;
            border-radius: 20px;
            font-size: 14px;
            background-image: @common-btnBG-color1;
            margin-top: 30px;
        }
        .tip {
            color: @promote-font-color5;
            font-size: 12px;
            margin-top: 15px;
        }
    }
}
</style>