<template>
    <div>
        <div class="vipBox">
            <div class="boxIn img-buy-video-spr img-buy-video-spr-buy-zs" @click.stop>
                <div class="priceInfos">
                    <div v-if="!isVIP" class="infoLine">
                        <div class="price">原价：{{diamond}}</div>
                        <div class="bg_zs img-buy-video-spr img-buy-video-spr-zs"></div>
                    </div>
                    <div class="infoLine">
                        <div class="img-buy-video-spr img-buy-video-spr-zhe"></div>
                        <div class="price2">会员价：{{discountDiamond}}</div>
                        <div class="bg_zs img-buy-video-spr img-buy-video-spr-zs"></div>
                    </div>
                </div>

                <div class="myInfo">
                    <div class="curZS">钻石余额：{{curDiamond}}</div>
                    <div class="cur img-buy-video-spr img-buy-video-spr-zs"> </div>
                </div>
                <div class="btns">
                    <nuxt-link v-if="!isVIP" class="btn" to="/recharge?type=vip">开通VIP</nuxt-link>
                    <div class="btn" @click="buyDiamond">{{btnText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        diamond: {
            type: [String, Number],
            default: 0
        },
        discountDiamond: {
            type: [String, Number],
            default: 0
        },
        // curDiamond: {
        //     type: [String, Number],
        //     default: 0
        // },
        // isVIP: {
        //     type: [Boolean],
        //     default: false,
        // },
    },
    data() {
        let userInfo = this.$userStore.getMyInfo();
        return {
            isVIP: userInfo.vipLevel > 0,
            curDiamond: userInfo.diamond,
        };
    },
    computed: {
        btnText() {
            return this.curDiamond < this.diamond ? '购买钻石' : '购买影片';
        }
    },
    mounted() {

        let userInfo = this.$userStore.getMyInfo();
        this.isVIP = userInfo.vipLevel > 0;
        this.curDiamond = userInfo.diamond;
    },
    methods: {
        buyDiamond() {
            if (this.curDiamond < this.diamond) {
                this.$router.push({
                    path: "/recharge?type=diamond",
                });
            }
            else {
                this.$emit('buy');
            }
        }
    }
}
</script>
<style lang="less" scoped>
.vipBox {
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .boxIn {
        position: relative;
        padding-top: 182px;
        text-align: center;
        .price {
            color: @diamondTip-font-color1;
            font-size: 20px;
            text-align: center;
            display: inline-block;
            padding-right: 40px;
        }
        .price2 {
            color: @diamondTip-font-color2;
            font-size: 24px;
            text-align: center;
            padding-right: 40px;
            padding-left: 10px;
        }

        .priceInfos {
            min-height: 65px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        .infoLine {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .bg_zs {
            position: absolute;
            transform: scale(0.5) translate(300%, 0%);
        }
        .myInfo {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 14px;
        }
        .curZS {
            line-height: 20px;
            color: @diamondTip-font-color1;

            padding-left: 30px;
            height: 20px;
            line-height: 20px;
            text-align: left;
            font-size: 16px;
        }
        .cur {
            transform: scale(0.4);
        }
        .btns {
            width: 272px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            .btn {
                display: block;
                height: 35px;
                width: 125px;
                margin: 0 5px;
                line-height: 35px;
                background-image: @common-btnBG-color1;
                color: @common-btnText-color1;
                border-radius: 30px;
                text-align: center;
                font-size: 16px;
            }
        }
    }
}
</style>