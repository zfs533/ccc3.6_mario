<template>
    <div class="anchorMore flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="关注列表" style="z-index: 1000; width: 100%" right-text="充值记录" :placeholder="true">
                <template #right>
                    <van-icon name="search" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="anchorList scroll-container">
                <van-tabs style="width: 100%;">
                    <van-tab title="已关注">
                        <van-pull-refresh v-model="followRefreshing" @refresh="followonRefresh">
                            <van-list class="tab-content" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadFollowData">
                                <anchoritem v-for="(uData,index) in followdata" :key="index" :userData=uData :followed=true />
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                    <van-tab title="未关注">
                        <van-pull-refresh v-model="unfollowRefreshing" @refresh="unfollowonRefresh">
                            <van-list class="tab-content" v-model="unloading" :finished="unfinished" finished-text="没有更多了" @load="onLoadUnFollowData">
                                <anchoritem v-for="(uData,index) in unfollowdata" :key="index" :userData=uData />
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>

import { pageMixin } from "~/assets/js/mixins";
import anchoritem from '~/components/anchoritem.vue';

export default {
    name: "anchorList",
    layout: "keepalive",
    components: { anchoritem },
    mixins: [pageMixin],
    data() {
        return {
            followdata: [],
            unfollowdata: [],

            followRefreshing: false,
            unfollowRefreshing: false,
            loading: false,
            finished: false,
            unloading: false,
            unfinished: false,
            page: 1,
            upage: 1,
            pageSize: 20
        };
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    activated() {
        this.$parent.showTabbar = false;
    },
    methods: {
        followonRefresh() {
            this.loading = true;
            this.finished = false;
            this.onLoadFollowData();
        },
        unfollowonRefresh() {
            this.unloading = true;
            this.unfinished = false;
            this.onLoadUnFollowData();
        },
        async onLoadFollowData() {
            if (this.followRefreshing) {
                this.followdata = [];
                this.page = 1;
                this.followRefreshing = false;
            }
            let pa = {
                page: this.page,
                pageSize: this.pageSize
            };
            let res = await this.$api.getFollowUps(pa);
            if (res.errorCode !== 0) {
                this.finished = true;
                this.$toast("数据请求出错：" + res.message);
                return;
            }

            this.loading = false;
            let tdata = res.data;
            this.page++;
            if (tdata && tdata.length > 0) {
                this.followdata = this.followdata.concat(tdata);
                if (tdata.length < this.pageSize) {
                    this.finished = true;
                }
            } else if (tdata && tdata.length == 0) {
                this.finished = true;
            }
            else if (!tdata || tdata.error) {
                this.finished = true;
            }
        },
        async onLoadUnFollowData() {
            if (this.unfollowRefreshing) {
                this.unfollowdata = [];
                this.upage = 1;
                this.unfollowRefreshing = false;
            }
            let pa = {
                page: this.upage,
                pageSize: this.pageSize
            };
            let res = await this.$api.getUnfollowUps(pa);
            if (res.errorCode !== 0) {
                this.unfinished = true;
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.unloading = false;
            let tdata = res.data;
            this.upage++;
            if (tdata && tdata.length > 0) {
                this.unfollowdata = this.unfollowdata.concat(tdata);
                if (tdata.length < this.pageSize) {
                    this.unfinished = true;
                }
            } else if (tdata && tdata.length == 0) {
                this.unfinished = true;
            }
            else if (!tdata || tdata.error) {
                this.unfinished = true;
            }
        },
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
            this.$router.push({
                path: "/search"
            });
        }
    },
}
</script>

<style lang="less" scoped>
.van-icon,
.van-icon:before {
    display: inline-block;
}
.search {
    width: 0.6rem;
    height: 0.6rem;
    border: none;
    vertical-align: top;
}
.mylabel {
    color: @text-color;
    font-size: 0.6rem;
}
.anchorList {
    widows: 100%;
    margin-top: 0.3rem;

    .tab-content {
        padding: 0 15px;
    }
}
</style>
