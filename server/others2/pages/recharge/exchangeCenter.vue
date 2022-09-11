<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="兑换中心" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content">
            <div class="inputBox">
                <van-field v-model="value" placeholder="请输入兑换码" />
            </div>
            <div class="rules">
                <p>兑换规则:</p>
                <p>1、每张兑换码仅限使用一次</p>
                <p>2、兑换成功后请前往会员中心查看兑换细节</p>
                <p>3、切勿要频繁尝试兑换,如频繁验证,系统将限制兑换</p>
            </div>
            <div class="btn" @click="onClickExchange">
                <span>兑换</span>
            </div>
        </div>
        <van-overlay :show="showtips" z-index="3000" class="overlay" style="left:0" @click="showtips = false">
            <div class="vipTips img-notice-tips-spr img-notice-tips-spr-bg flex-container">
                <div class="top">
                    <h3>恭喜你获得{{getStr}}</h3>
                </div>
                <div class="content">
                    <template v-if="type==='vip'">
                        <div class="subTitle">立即享受以下特权</div>
                        <div class="tequan">
                            <div class="item">
                                <div class="img-notice-tips-spr img-notice-tips-spr-1"></div>
                                <span>专享影片</span>
                            </div>
                            <div class="item">
                                <div class="img-notice-tips-spr img-notice-tips-spr-2"></div>
                                <span>专属折扣</span>
                            </div>
                            <div class="item">
                                <div class="img-notice-tips-spr img-notice-tips-spr-3"></div>
                                <span>高速专线</span>
                            </div>
                            <div class="item">
                                <div class="img-notice-tips-spr img-notice-tips-spr-4"></div>
                                <span>尊贵标识</span>
                            </div>
                        </div>
                    </template>
                    <div v-else class="diamond">
                        <div class="diamondIcon img-notice-tips-spr img-notice-tips-spr-zs"></div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="btnTips" @click="goHome">立即体验</div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script> 

import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "exchangeCenter",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            value: "",
            getStr: '',
            showtips: false,
            type: 'diamond'
        };
    },
    created() {
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    activated() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        goHome() {
            this.showtips = false;
            this.$router.push({
                path: "/home"
            });
        },
        async onClickExchange() {
            if (!this.value) {
                this.$toast("请输入兑换码");
                return;
            }
            let res = await this.$api.exchangeCode({
                code: this.value,
            });
            if (res.errorCode !== 0) {
                this.$toast(res.message);
                return;
            }
            let data = res.data;
            this.type = data.reward.rewardType;
            if (data.reward.rewardType == 'diamond') {
                this.getStr = `${data.reward.rewardCount}钻石`;
            }
            if (data.reward.rewardType == 'vip') {
                this.getStr = `${data.reward.rewardCount}天vip特权`;
            }
            this.$api.updateMyInfo();
            this.showtips = true;
        },
    },
};
</script>

<style lang="less" scoped>
.inputBox {
    padding: 0 20px;
    margin-top: 20px;
}

// input {
//     height: 50px;
//     width: 100%;
//     background: @content-color;
//     color: @text-color;
//     border: none;
//     border-radius: 5px;
//     padding-left: 25px;
// }

.van-field {
    background: @common-inputBG-color1;
    padding-left: 20px;
    color: @common-inputText-color1;
}

.rules {
    padding: 0 20px;
    margin-top: 40px;
    font-size: 12px;
    color: @common-tipText-color1;
}
::v-deep .van-field__control::-webkit-input-placeholder {
    color: @common-inputText-color1;
}

.rules p {
    margin-bottom: 8px;
}

.btn {
    padding: 0 20px;
    width: 100%;
    position: absolute;
    bottom: 40px;
    cursor: pointer;
}
.btn span {
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: @common-btnBG-color1;
    color: @common-btnText-color1;
    font-size: 15px;
    border-radius: 50px;
}

.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    .vipTips {
        height: 295px;
        transform: scale(1.2);
        text-align: center;
        .top {
            align-items: center;
        }
        .bottom {
            height: 50px;
        }
        h3 {
            font-size: 20px;
            color: @exchangeCenter-font-color1;
            height: 24px;
            line-height: 24px;
            margin: 25px 0 8px 0;
            font-weight: normal;
        }
        .subTitle {
            font-size: 16px;
            color: @exchangeCenter-font-color2;
        }
        .tequan {
            display: flex;
            justify-content: space-around;
            padding: 30px 30px;
            .item {
                display: flex;
                flex-direction: column;
                div {
                    margin: 0 auto;
                }
                span {
                    color: @exchangeCenter-font-color2;
                    font-size: 10px;
                    text-align: center;
                    margin-top: 8px;
                }
            }
        }
        .btnTips {
            margin: 0 auto;
            font-size: 16px;
            width: 80%;
            height: 36px;
            line-height: 36px;
            text-align: center;
            color: @exchangeCenter-font-color2;
            border-radius: 18px;
            // background: #e7b47c;
            background-image: @exchangeCenter-bg-color1;
        }
        .diamond {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-image: @exchangeCenter-bg-color1;
            margin: 30px auto 80px auto;
        }
        .diamondIcon {
            width: 51px;
            height: 44px;
            background-size: calc(51 / 102 * 571px) calc(44 / 87 * 295px);
            background-position: calc(51 / 102 * -274px) calc(44 / 87 * -90px);
        }
    }
}
</style>