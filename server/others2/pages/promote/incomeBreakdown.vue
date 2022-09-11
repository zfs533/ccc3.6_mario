<template >
    <div class="promote flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="收益明细" style="z-index: 1000; width: 100%;" :placeholder="true">
            </van-nav-bar>
            <div class="pcm-app">
                <div class="breakdown_promoteInfo">
                    <div class="promoteInfo_titles ">
                        <div class="promoteInfo_title ">总推广人数</div>
                        <div class="promoteInfo_num ">{{promoteInfo.totalPromoteCnt}}</div>
                    </div>
                    <div class="app_promote_line"></div>
                    <div class="promoteInfo_titles ">
                        <div class="promoteInfo_title ">总推广收益</div>
                        <van-row class="promoteInfo_num" type="flex" justify="center">
                            <div class="num"> {{promoteInfo.totalIncome}}</div>
                        </van-row>
                    </div>
                    <div class="app_promote_line"></div>
                    <div class="promoteInfo_titles ">
                        <div class="promoteInfo_title ">今日推广人数</div>
                        <div class="promoteInfo_num ">{{promoteInfo.todayPromoteCnt}}</div>
                    </div>
                    <div class="app_promote_line"></div>
                    <div class="promoteInfo_titles ">
                        <div class="promoteInfo_title ">今日推广收益</div>
                        <van-row class="promoteInfo_num" type="flex" justify="center">
                            <div class="num"> {{promoteInfo.todayIncome}}</div>
                        </van-row>
                    </div>
                </div>
                <div class="detailList_title">
                    <img src="~/assets/img/promote/jiantou.png" alt="">
                    <div>详情列表</div>
                    <img src="~/assets/img/promote/jiantou.png" alt="" style="transform: rotate(180deg)">
                </div>
                <div class="listBox" v-if="recordList.length>0">
                    <div class="record_list_top">
                        <div class="invitedUid">推广人员</div>
                        <div class="logDate">用户ID</div>
                        <div class="income">收益金额</div>
                    </div>
                </div>
                <div class="svgBox" v-else>
                    <div class="app_promote_line"></div>
                    <p class="desc">这里空空如也～</p>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="pcm-app">
                <div class="scroll-container">
                    <div class="listBox" v-if="recordList.length>0">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadNextPage">
                            <li class="promot_record" v-for="(item, index) in recordList" :key="index">
                                <div class="records">
                                    <div class="username">{{ item.username}}</div>
                                    <div class="invitedUid">{{ item.invitedUid }}</div>
                                    <div class="income">{{ item.income}}</div>
                                </div>
                                <div class="app_promote_line2"></div>
                            </li>
                        </van-list>
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

const perPageSize = 20;
export default {
    name: "incomeBreakdown",
    layout: "keepalive",
    components: { loading },
    mixins: [pageMixin],
    data() {
        return {
            curPageIndex: 1,
            showLoading: true,
            loading: true,
            finished: false,
            total: 0,
            recordList: [],
            promoteInfo: {
                totalIncome: "0",
                totalPromoteCnt: 0,
                todayIncome: "0",
                todayPromoteCnt: 0
            }
        };
    }, created() {
        this.loadProfitDetail();
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        async loadProfitDetail() {
            let res = await this.$api.promoteProfitDetail({
                page: this.curPageIndex,
                pageSize: perPageSize,
            });
            this.showLoading = false;

            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }

            let data = res.data;
            if (data && data.total > 0) {
                this.total = data.total;
                if (data.data && data.data.length > 0) {
                    if (data.data.length < perPageSize) {
                        this.finished = true;
                    }
                    for (let index = 0; index < data.data.length; index++) {
                        this.recordList.push(data.data[index]);
                    }
                }
                this.promoteInfo = data.promoteInfo;
            }
        },
        async onLoadNextPage() {
            this.curPageIndex++;
            this.loadProfitDetail();
        },
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
.pcm-app {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    color: @promote-font-color2;
}
.svgBox {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.app_promote_line {
    height: 1px;
    background: @promote-bg-color6;
}
.breakdown_promoteInfo {
    width: 100%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    background: @promote-bg-color1;
    border-radius: 10px;
    .promoteInfo_titles {
        margin-bottom: 10px;
        margin-top: 10px;
        display: flex;
        align-items: baseline;
    }
}
.promoteInfo_title {
    font-size: 14px;
    width: 90px;
    color: @promote-font-color1;
}
.promoteInfo_num {
    font-size: 14px;
    color: @promote-font-color2;
    margin-left: 123px;
}
.detailList_title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px 10px 10px;
    font-size: 16px;
    color: @promote-font-color1;
}
.desc {
    padding-bottom: 1.333rem;
    font-size: 12px;
    color: @promote-font-color5;
    text-align: center;
}
.promot_record {
    display: flex;
    flex-direction: column;
    .records {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: @promote-font-color2;
        display: flex;
        justify-content: space-around;
        text-align: center;
        .invitedUid {
            width: 56px;
        }
        .income {
            width: 56px;
        }
        .username {
            width: 56px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
        }
    }
    .app_promote_line2 {
        height: 1px;
        background: @promote-bg-color2;
    }
}
.record_list_top {
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    color: @promote-font-color1;
    height: 40px;
    background-color: @promote-bg-color1;
    .logDate {
        width: 71.05px;
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