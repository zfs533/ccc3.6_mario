<template >
    <div class="promote flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="推广记录" style="z-index: 1000; width: 100%;" :placeholder="true">
            </van-nav-bar>
            <div class="inviteTotal">累计邀请用户{{total}}人</div>
            <div class="record_list_top" v-if="3>0">
                <div class="top_uid">推广人员</div>
                <div class="top_time">用户ID</div>
                <div class="top_time">推广时间</div>
            </div>
            <div class="svgBox" v-else>
                <div class="app_promote_line"></div>
                <p class="desc">这里空空如也～</p>
            </div>
        </div>
        <div class="content">
            <div class="scroll-container">
                <div class="listBox" v-if="recordList.length>0">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadNextPage">
                        <li class="promot_record" v-for="(item, index) in recordList" :key="index">
                            <div class="records">
                                <div class="username">{{ item.username}}</div>
                                <div class="name">{{ item.uid }}</div>
                                <div class="time">{{ item.logDate}}</div>
                            </div>
                            <div class="app_promote_line"></div>
                        </li>
                    </van-list>
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
    name: "promotionRecord",
    layout: "keepalive",
    components: { loading },
    mixins: [pageMixin],
    data() {
        return {
            curPageIndex: 1,
            loading: true,
            finished: false,
            showLoading: true,
            total: 0,
            recordList: []
        };
    },
    created() {
        console.log("promote created");
        this.promoteRecord();
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        async promoteRecord() {
            let promoteRecordData = await this.$api.promoteRecord({
                page: this.curPageIndex,
                pageSize: perPageSize,
            }
            );
            this.loading = false;
            this.showLoading = false;
            if (promoteRecordData.data) {
                this.total = promoteRecordData.data.total;
                if (promoteRecordData.data.data.length < perPageSize) {
                    this.finished = true;
                }
                for (let index = 0; index < promoteRecordData.data.data.length; index++) {
                    this.recordList.push(promoteRecordData.data.data[index]);
                }
            }
            if (promoteRecordData.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
            }
        },
        async onLoadNextPage() {
            this.curPageIndex++;
            await this.promoteRecord();
        },
    },

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
.svgBox {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.inviteTotal {
    width: 100%;
    font-size: 16px;
    color: @promote-font-color1;
    text-align: center;
    margin: 0 auto 10px;
}
.record_list_top {
    width: 100%;
    height: 40px;
    background-color: @promote-bg-color1;
    font-size: 16px;
    color: @promote-font-color1;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
}
.app_promote_line {
    height: 1px;
    background: @promote-bg-color2;
}
.promot_record {
    height: 100%;
    display: flex;
    flex-direction: column;
    .records {
        font-size: 12px;
        color: @promote-font-color2;
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        .username {
            width: 56px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
        }
    }
}
.desc {
    font-size: 12px;
    color: @promote-font-color5;
    margin: 20px auto;
}
.loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1002;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    .van-loading__text {
        color: #ffffff;
    }
}
</style>