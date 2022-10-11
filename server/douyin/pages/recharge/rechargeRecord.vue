<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="充值记录" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content">
            <div class="scroll-container">

                <div class="list" v-if="rechargeHistory.length > 0">
                    <van-pull-refresh v-model="b_loadingInfo" @refresh="onRefresh">
                        <van-list v-model="b_loadingInfo2" :finished="loadNext_finished" finished-text="没有更多了" @load="onLoadNextPage">
                            <div class="box" v-for="(item, index) in rechargeHistory" :key="index">
                                <div class="title2">
                                    <div class="left">
                                        <div class="name">{{ item.name }}</div>
                                        <div class="success">
                                            <van-tag v-if="item.hasDeliver" type="primary">支付成功</van-tag>
                                            <van-tag v-if="!item.hasDeliver" type="danger">支付失败</van-tag>
                                        </div>
                                    </div>
                                    <div class="right">¥{{ item.price }}</div>
                                </div>
                                <div class="info">
                                    <div class="row">充值方式:{{ item.payType }}</div>
                                    <div class="row">会员天数:{{ item.vipEffectiveTime }}</div>
                                    <div class="row">订单编号:{{ item.id }}</div>
                                    <div class="row">交易时间:{{ item.deliverTime }}</div>
                                </div>
                                <!-- <div class="btn">我已经充值成功,上传凭据</div> -->
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
                <loading v-else-if="showLoading" />
                <emptybox v-else />
            </div>
        </div>
    </div>
</template>
      
<script> 

import { pageMixin } from "~/assets/js/mixins";
import emptybox from "~/components/emptybox.vue";
import loading from "~/components/loading.vue";

export default {
    name: "rechargeRecord",
    layout: "keepalive",
    components: { loading, emptybox },
    mixins: [pageMixin],
    data() {
        return {
            b_loadingInfo: false,
            b_loadingInfo2: false,
            loadNext_finished: false,
            rechargeHistory: [],
            curPageIndex: 1,
            showLoading: true,
        };
    },

    async created() {
        this.getHistoryInfo();
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

        async getHistoryInfo() {
            let res = await this.$api.getRechargeHistory({
                page: this.curPageIndex,
                pageSize: 20,
            });
            this.showLoading = false;
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            let data = res.data;
            if (data.length < 20) {
                this.loadNext_finished = true;
            }
            // this.rechargeHistory = data;
            for (let i = 0; i < data.length; i++) {
                let info = data[i];
                let item = {};
                item.name = info.goodsName;
                item.price = info.goodsPrice;
                item.vipEffectiveTime = info.vipEffectiveTime ? info.vipEffectiveTime : 0;
                //   if (data[i].vipEffectiveTime > 9999) {
                //     item.vipEffectiveTime = "永久免费";
                //   } else {
                //     item.vipEffectiveTime = data[i].vipEffectiveTime + "天";
                //   }
                item.deliverTime = new Date(info.createDate).format("yyyy年MM月dd日");

                item.id = info.id;

                item.hasDeliver = info.hasDeliver;
                if (info.payType == "ali_pay") {
                    item.payType = "支付宝";
                } else if (info.payType == "wx_pay") {
                    item.payType = "微信支付";
                } else if (info.payType == "diamond_pay") {
                    item.payType = "钻石支付";
                } else {
                    item.payType = info.payType;
                }

                item.showMask = info.mask ? true : false;
                item.markDec = info.mask;
                this.rechargeHistory.push(item);
                this.b_loadingInfo2 = false;
            }
        },

        onRefresh() {
            this.b_loadingInfo = false;
        },

        async onLoadNextPage() {
            this.curPageIndex++;
            await this.getHistoryInfo();

            this.b_loadingInfo2 = false;
        },
    },
};
</script>
      
<style lang="less" scoped>
.list {
    padding: 0 25px;
}
.box {
    border-bottom: 1px solid #242535;
}

.title2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.name {
    font-size: 18px;
    color: @theme-color2;
    font-weight: 700;
    padding-right: 10px;
}

img {
    border: none;
    vertical-align: middle;
    width: 63px;
}

.left {
    display: flex;
    align-items: end;
}

.right {
    font-size: 19px;
    color: @active-color;
    font-weight: 700;
}

.list .box .info {
    margin-top: 18px;
}

.list .box .info .row {
    margin-bottom: 14px;
    color: @recharge-font-color2;
    font-size: 14px;
}

.emptybox {
    width: 100%;
    padding-top: 70px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.emptybox .pic {
    width: 100%;
    text-align: center;
}
.emptybox .pic img {
    width: 30%;
    border: none;
    vertical-align: top;
}
.emptybox .text {
    text-align: center;
    font-size: 14px;
    color: #808184;
    margin-top: 20px;
}

.list .box .btn {
    width: 100%;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @text-color;
    font-size: 12px;
    border-radius: 4px;
    margin-bottom: 18px;
    background: @active-color;
}

.van-list__error-text,
.van-list__finished-text,
.van-list__loading {
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
}
</style>