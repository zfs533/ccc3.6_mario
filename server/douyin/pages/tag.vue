<template>
    <div class="tagBox flex-container">
        <div class="top">
            <van-nav-bar :title="tagData.tag.name" style="width: 100%;" left-arrow @click-left="onClickLeft">
                <template>
                    <van-icon name="arrow-left" size="28" />
                </template>
            </van-nav-bar>
            <div class="tagInfo">
                <div class="tagMainInfo">
                    <div class="submainInfo">
                        <div class="tagAvatarList">
                            <div class="tagAvatarBox" v-for="(data,index) in tagData.tag.likeUsers" :key="index">
                                <div class="tagAvatar">
                                    <!-- <img :data-src="data.avatarURL" alt="" class="userAvater"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row2">
                        <div class="followbtn">
                            <span class="btn1" v-if="!tagData.liked" @click="onClickFollow">关注</span>
                            <span class="btn2" v-else @click="onClickUnfollow">取消关注</span>
                        </div>
                    </div> -->
                </div>
                <div class="des">{{tagData.tag.summary}}</div>
            </div>
            <div class="tagBodyBtn">
                <btn-list-box :callBack="onClickVideoTypeBt" />
                <van-popover class="mpopover" placement="bottom-end" v-model="showPopover" trigger="click" :actions="shortTypes" @select="onSelect" @opened="onOpenSort">
                    <template #reference>
                        <div class="selectTitle">
                            <span class="selectText">{{shortTypes[sortType - 1].text}}</span>
                            <van-icon name="sort" size="16" />
                        </div>
                    </template>
                </van-popover>
            </div>
        </div>
        <div class="content">
            <div class="tagBody scroll-container userVideobox">
                <list-box ref="videoList" :waterfall="true" loading-text="努力加载中..." @load="onLoadVideoData" @clear="onVideoListClear" />
            </div>
        </div>
    </div>
</template>
<script>

import { pageMixin } from "~/assets/js/mixins";
import btnListBox from '~/components/btnListBox.vue';

export default {
    name: "tag",
    layout: "keepalive",
    components: { btnListBox },
    mixins: [pageMixin],
    data() {
        return {
            tagId: undefined,
            avatars: [],
            tagData: {
                liked: false,
                tag: {
                    id: "",
                    likeUsers: [],
                    name: "",
                    playCnt: 0,
                    summary: "",
                    videos: []
                }
            },
            mloading: false,
            finished: false,
            curVideoPage: 1,
            mpageSize: 15,
            curTimeType: 1,
            sortType: 1,
            showPopover: false,
            shortTypes: [{ text: '综合', className: 'active-sort' }, { text: '播放最多', className: '' }, { text: '收藏最多', className: '' }, { text: '最新视频', className: '' }]
        };
    },
    async created() {
        console.log("tag created");
    },
    mounted() {
        console.log("tag mounted");
        this.$parent.showTabbar = false;

    },
    async activated() {
        console.log("tag activated", this.$route.query.tagid, this.tagId);
        this.$parent.showTabbar = false;

        if (this.$route.query.tagid === this.tagId) return;
        this.tagId = this.$route.query.tagid;

        let res = await this.$api.getOneTagInfo(this.tagId);
        if (res.errorCode !== 0) {
            this.$toast("数据请求出错：" + res.message);
            return;
        }
        Object.keys(res.data).forEach(x => this.tagData[x] = res.data[x]);
        this.$nextTick(() => {
            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });

    },
    methods: {
        onVideoListClear() {
            this.curVideoPage = 1;
        },
        onClickFollow() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            this.$api.followTag(this.tagData.tag.id);
            this.tagData.liked = true;
        },
        onClickUnfollow() {
            this.$api.unFollowTag(this.tagData.tag.id);
            this.tagData.liked = false;
        },
        changStyle(parm) {
            if (this.tagData.liked) {
                if (parm == 1) {
                    return 'display: none;';
                } else {
                    return '';
                }
            } else {
                if (parm == 1) {
                    return '';
                } else {
                    return 'display: none;';
                }
            }
        },
        onClickVideoTypeBt(videoType) {
            this.curTimeType = +videoType + 1;

            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onSelect(action) {
            for (let i = 0; i < this.shortTypes.length; i++) {
                const el = this.shortTypes[i];
                if (el.text == action.text) {
                    el.className = 'active-sort';
                    this.sortType = i + 1;
                } else {
                    el.className = '';
                }
            }
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onOpenSort() {
            document.querySelector(".active-sort").click();
        },
        async onLoadVideoData() {
            console.log("tag onLoadVideoData", this.curVideoPage);
            let res = await this.$api.tagVideos(this.$route.query.tagid, { compositeSort: this.sortType, timeType: this.curTimeType, page: this.curVideoPage, pageSize: this.mpageSize });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            let tdata = res.data;

            this.mloading = false;
            this.curVideoPage++;
            this.$nextTick(() => {
                if (!this.$refs.videoList) {
                    return;
                }
                if (tdata && tdata.length > 0) {
                    this.$refs.videoList.concatData(tdata);
                    if (tdata.length < this.mpageSize) {
                        this.$refs.videoList.finished();
                    }
                } else if (tdata && tdata.length == 0) {
                    this.$refs.videoList.finished();
                } else if (!tdata || tdata.error) {
                    this.$refs.videoList.finished();
                }
            });
        },
        onClickLeft() {
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                }
            });
            this.$router.back();
        }
    }
}
</script>

<style lang="less" scoped>
.userVideobox {
    width: 95%;
    margin: 0 auto;
}

.search {
    width: 0.6rem;
    margin-right: 0.3rem;
}
.tbcak {
    height: 0.6rem;
}
.tagInfo {
    width: 100%;
    padding: 0 0.2rem 0.16rem;
    border-bottom: 1px solid #242535;
}
.tagAvatarList {
    display: flex;
    align-items: center;
    margin-left: 0.4rem;
}
.submainInfo {
    display: flex;
    align-items: center;
}
.tagMainInfo {
    margin-top: 0.15rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.tagAvatarBox {
    margin-left: -0.3rem;
}
.tagAvatar {
    align-items: center;
}
.tagText {
    font-size: 0.4rem;
    color: @text-color;
    margin-left: 0.6rem;
}
.des {
    margin-top: 0.18rem;
    font-size: 0.35rem;
    color: #808184;
    margin-left: 0.1rem;
}

.tagBodyBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
}

.row2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn {
    width: 100%;
}

.followbtn {
    span {
        width: 1.8rem;
        height: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.35rem;
        border-radius: 0.5rem;
    }
    .btn1 {
        color: @active-color;
        border: solid 1px @active-color;
    }
    .btn2 {
        color: @play-font-color1;
        // background-color: @play-bg-color1;
        border: solid 1px @play-bg-color1;
    }
}
.selectText {
    color: @active-color;
    font-size: 0.4rem;
    padding-right: 0.1rem;
}
.selectTitle {
    display: flex;
    align-items: center;
    .van-icon {
        color: @active-color;
    }
}
.userAvater {
    width: 0.8rem;
    height: 0.8rem;
    /* width: 100%;
  height: 100%; */
    border-radius: 50%;
}
</style>