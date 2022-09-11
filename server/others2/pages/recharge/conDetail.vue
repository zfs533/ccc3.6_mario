<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="流水明细" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content ">
            <div class="list scroll-container" v-if="bVideoData.length > 0">
                <van-list v-model="bLoading" :finished="bFinished" finished-text="没有更多了" @load="loadDiamondConsumeRecord">
                    <div class="diamondrecod" v-for="(data, index) in bVideoData" :key="index">
                        <span>{{formatDate(data.createdDate)}}</span>
                        <span class="des">{{data.description}}</span>
                        <span class="buyprice">{{data.buyPrice}}</span>
                    </div>
                </van-list>
                <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="loadNext_finished"
          finished-text="没有更多了"
          @load="onLoadNextPage"
        >
          <div
            class="box"
            v-for="(item, index) in rechargeHistory"
            :key="index"
          >
            <div class="title2">
              <div class="left">
                <div class="name">{{ item.name }}</div>
                <div class="success">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAjCAYAAACJiBSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU5JREFUeNrsmyFLA2EAhm+nNgcGHYLNIEuLY2NVl20mwb8gLpgFbe4HmMWgYBXG/APiELQIYltbcKiIFuf7wWyGb2Gfb3geeMpYeh/udnfcCqNqJYtkUR7KTVnKYBq8yq7cl0+FyDhFeSPL7JeEoazlkV/eJUxSFuRRbJx19kpOM5+gJKRlPmcDX4hDHCAOccApzqpcZiq/OOFRTU8uMZVPnDnZlpfc4/wfs398tiIvZJ15vI6cprwjjFecGXkgr/h98TqthRhnGQ83LY+cY8L4xtmRLfnFHH5xvsdHT1U+MInn1dr9OFC4vxkxjd+l9KfckxuyzzyeTwiuZXjz45yJ/OIEXuSW3JYfTOUV55dT+cxUnnGAOEAc4gBxiAPucYZMlZz32DhdtkpOZ5L/59zKNTZLQjhT1WOPnDfZkCdywHZTI+wc3niqyccfAQYAho4utwb6ezMAAAAASUVORK5CYII="
                    alt=""
                  /><span>支付成功</span>
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
            <div class="btn">我已经充值成功,上传凭据</div>
          </div>
        </van-list>
      </van-pull-refresh> -->
            </div>
            <loading v-else-if="showLoading" />
            <emptybox v-else />
        </div>
    </div>
</template>
      
<script> 

import { pageMixin } from "~/assets/js/mixins";
import emptybox from "~/components/emptybox.vue";
import loading from "~/components/loading.vue";

export default {
    name: "conDetail",
    layout: "keepalive",
    components: { loading, emptybox },
    mixins: [pageMixin],
    data() {
        return {
            bFinished: false,
            bVideoData: [],
            bPage: 1,
            bLoading: true,
            showLoading: true,
            pageSize: 20
        };
    },
    async created() {
        this.loadDiamondConsumeRecord();
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

        formatDate(createDate) {
            let date = new Date(createDate);
            return date.toLocaleString();
        },

        async loadDiamondConsumeRecord() {
            if (this.bPage == 1) {
                this.bVideoData = [];
            }
            let pa = {
                page: this.bPage,
                pageSize: this.pageSize,
            };
            let res = await this.$api.getDiamondConsumeRecord(pa);

            this.showLoading = false;
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            let xdata = res.data;
            this.bLoading = false;
            this.bPage++;
            if (xdata && xdata.length > 0) {
                this.bVideoData = this.bVideoData.concat(xdata);
                if (xdata.length < this.pageSize) {
                    this.bFinished = true;
                }
            } else if (xdata && xdata.length == 0) {
                this.bFinished = true;
            } else if (!xdata || res.error) {
                this.bFinished = true;
            }
        }
    },
};
</script>
      
<style lang="less" scoped>
.list {
    padding: 0 25px;
}
.box {
    padding: 20px 0 0;
    border-bottom: 1px solid #242535;
}

.title2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.name {
    font-size: 18px;
    color: @text-color;
    font-weight: 700;
    padding-right: 10px;
}
.diamondrecod {
    height: 30px;
    color: @theme-color2;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .des {
        font-size: 13px;
        color: @theme-color2;
    }
    .buyprice {
        color: @active-color;
    }
}
</style>