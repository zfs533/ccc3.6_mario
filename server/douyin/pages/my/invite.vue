<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="邀请记录" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <!-- <div class="list" v-if="infoList.length > 0"> -->
        <div class="content">
            <div class="scroll-container">
                <div class="list" v-if="infoList.length > 0">
                    <van-pull-refresh v-model="b_loadingInfo" @refresh="onRefresh">
                        <van-list v-model:loading="b_loadingInfo2" :finished="loadNext_finished" finished-text="没有更多了" @load="onLoadNextPage">
                            <li class="item" v-for="(item, index) in infoList" :key="index">
                                <div>
                                    <div class="avatar">
                                        <usericon :imgUrl="item.avatarURL" alt="" />
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="name">{{ item.username }}</div>
                                    <div class="des">{{ item.introduce }}</div>
                                </div>
                            </li>
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
import usericon from "~/components/usericon.vue";

const perPageSize = 20;

export default {
    name: "invite",
    layout: "keepalive",
    components: { loading, emptybox, usericon },
    mixins: [pageMixin],
    data() {
        return {
            showLoading: true,
            infoList: [],
            b_loadingInfo: false,
            loadNext_finished: false,

            curPageIndex: 1,
        };
    },

    async created() {
        await this.getInfo();
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

        async getInfo() {
            // return new Promise((resolve) => {
            //     setTimeout(() => {
            //         this.showLoading = false;
            //         resolve();
            //     }, 400);
            // });
            let uid = this.$route.params.uid;
            let res = await this.$api.getInvitationRecord({
                page: this.curPageIndex,
                pageSize: perPageSize,
                // uid: uid,
            });
            this.showLoading = false;
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            let data = res.data;
            if (data.length < perPageSize) {
                this.loadNext_finished = true;
            }
            // this.rechargeHistory = data;
            for (let i = 0; i < data.length; i++) {
                let info = data[i];
                let item = {};
                item.avatarURL = info.avatarURL;
                item.introduce = info.introduce;
                item.username = info.username;
                item.id = info.id;

                this.infoList.push(item);
                this.b_loadingInfo2 = false;
            }
        },

        onRefresh() {
            this.$toast("刷新成功");
            this.b_loadingInfo = false;
        },

        async onLoadNextPage() {
            this.curPageIndex++;

            await this.getInfo();

            this.b_loadingInfo2 = false;
        },
    },
};
</script>

<style lang="less">
.list {
    padding: 20px;
}

.item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.item .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
.item .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
}
.item .right {
    flex: 1;
    width: 0;
    padding-left: 10px;
}
.item .right .name {
    font-size: 15px;
    color: @text-color;
}
.item .right .des {
    font-size: 12px;
    color: #808184;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>