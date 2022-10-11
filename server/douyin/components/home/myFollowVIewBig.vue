<template>
    <div class="followbox flex-container">
        <!-- <div class="top">
            <div class="swiper-no-swiping x-scroll-container list">
                <nuxt-link to="/user/anchorList">
                    <div class="item">
                        <div class="pic">+</div>
                        <div class="name">更多</div>
                    </div>
                </nuxt-link>
                <div class="item" v-for="(anchor,index) in anchors" :key="index" @click="onClickAnchor(anchor.uid)">
                    <div class="comomAvater">
                        <usericon :imgUrl="anchor.avatarURL" />
                    </div>
                    <div class="name">{{anchor.username}}</div>
                </div>
            </div>
        </div> -->
        <div class="content">
            <div class="scroll-container scroll2 ">
                <van-list v-model="loading" loading-text=" " :finished="finished" finished-text="已经到我的底线啦" @load="onLoadVideoData">
                    <div class="feed-warp" v-for="(itemData, dIndex) in videoList" :key="dIndex">
                        <feeditem :hideFollow="true" :imgData="itemData"></feeditem>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script> 
import btnListBox from '../btnListBox.vue';
import Feeditem from '../feeditem.vue';
import Usericon from '../usericon.vue';
const perPageSize = 10;
export default {
    name: "MyFollowView",
    components: { btnListBox, Usericon, Feeditem },
    props: {
        videoTimeType: {
            type: Number,
            default: 3
        }
    },
    data() {
        let curTimeType = [1, 2, 3].includes(this.videoTimeType) ? this.videoTimeType : 3;
        return {
            curVideoPage: 1,
            pageSize: 10,
            curTimeType: curTimeType,
            anchors: [],

            loading: false,
            finished: false,

            videoList: [],

        };
    },
    mounted() {
        console.log("myFollowView mounted");

        this.$nuxt.$on("login", () => {
            this.curVideoPage = 1;
            this.check(true);
        });
        this.$nuxt.$on("followChange", () => {
            this.curVideoPage = 1;
            this.check(true);
        });
        let followData = this.$main.getMyFollowData();
        if (followData) {
            this.$nextTick(() => {
                this.curVideoPage++;
                if (followData.users && followData.users.length > 0) {
                    this.anchors = followData.users;
                }
                let recentVideos = [];
                if (this.curTimeType === 2) {
                    recentVideos = followData.recentVideos;
                } else if (this.curTimeType === 3) {
                    recentVideos = followData.recentShortVideos;
                }
                if (recentVideos && recentVideos.length > 0) {
                    this.videoList = this.videoList.concat(recentVideos);
                }
            });
        }
    },
    methods: {
        check(forceClear) {
            console.log("myFollowView check");
            this.$nextTick(() => {
                if (this.$refs.videoList && (forceClear || !this.$refs.videoList.hasItem())) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                }
            });
        },
        onVideoListClear() {
            this.curVideoPage = 1;
        },
        async loadUserFollows() {
            let res = await this.$api.getUserFollow({
                page: 1,
                pageSize: perPageSize,
            });
            this.showLoading = false;
            if (res.errorCode !== 0) {
                this.$toast("加载数据出现错误：" + res.message);
                return;
            }
            let data = res.data;
            let infoList = [];
            for (let i = 0; i < data.length; i++) {
                let info = data[i];
                let item = {};
                item.avatarURL = info.avatarURL;
                item.introduce = info.introduce;
                item.username = info.username;
                item.id = info.id;
                item.uid = info.uid;

                infoList.push(item);
            }
            this.anchors = infoList;
        },

        onClickAnchor(uid) {
            this.$router.push({
                path: "/user",
                query: {
                    uid: uid
                }
            });
        },
        async onLoadVideoData() {
            if (this.curVideoPage == 1) {
                this.loadUserFollows();
            }
            let res = await this.$api.followedVideos({ timeType: this.curTimeType, page: this.curVideoPage, pageSize: this.pageSize });
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错：" + res.message);
                return;
            }
            this.$nextTick(() => {
                this.loading = false;
                this.finished = false;
                let tdata = res.data;
                this.curVideoPage++;
                if (tdata && tdata.length > 0) {
                    this.videoList = this.videoList.concat(tdata);
                    if (tdata.length < this.pageSize) {
                        this.finished = true;
                    }
                } else if (tdata && tdata.length == 0) {
                    this.finished = true;
                } else if (!tdata || tdata.error) {
                    this.finished = true;
                }
            });
        },
    }
}

</script>

<style lang="less" scoped>
.followbox {
    width: 100%;
    height: 100%;
}

.list {
    display: flex;
    align-items: center;
    padding: 0.16rem 0 0.16rem 0.2rem;

    .item {
        display: flex;
        width: 70px;
        cursor: pointer;
        flex-direction: column;
        margin: 0 1px;
    }
    .item .pic {
        align-self: center;
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.1rem;
        text-align: center;
        border-radius: 50%;
        background: @button-color;
        color: @text-color;
        font-size: 1rem;
        position: relative;
    }
    .item .name {
        font-size: 0.35rem;
        color: #aaa;
        margin-top: 0.15rem;
        text-align: center;
        width: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

/* .bgbox {
  background-color: black;
  width: 100%;
  height: 100vh;
  position: absolute;
} */

.avater {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
}
</style>