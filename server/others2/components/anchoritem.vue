<template>
    <div class="anchorItem">
        <div class="info" @click="onClickUser">
            <div class="comomAvater">
                <usericon :imgUrl=userData.avatarURL />
            </div>
            <div class="mainInfo">
                <div class="name">{{itemData.username}}</div>
                <div class="des">{{itemData.introduce}}</div>
                <div class="num">
                    <div>粉丝 <span class="fans-num">{{formatNumber2(itemData.followerCnt)}}</span></div>
                    <div>作品 <span class="video-num">{{formatNumber2(itemData.videoCnt)}}</span></div>
                </div>
            </div>
        </div>
        <div class="followbtn">
            <span class="btn1" v-if="!mfollowed" @click="onClickFollow">关注</span>
            <span class="btn2" v-else @click="onClickUnfollow">取消关注</span>
        </div>
    </div>
</template>
<script>
import { defaultRes } from "~/assets/js/constants";
import * as utils from '~/assets/js/utils';
import usericon from './usericon.vue';

export default {
    name: "anchoritem",
    components: { usericon },
    props: {
        userData: {
            avatarURL: "",
            followerCnt: 0,
            id: 0,
            username: "--",
            introduce: ""
        },
        followed: false
    },
    data() {
        return {
            itemData: this.userData,
            mfollowed: this.followed,
            defaultImg: defaultRes.userAvatorDefault
        };
    },
    activated() {
        this.itemData = this.userData;
        this.mfollowed = this.followed;
    },
    methods: {
        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
        onClickUser() {
            this.$router.push({
                path: "/user",
                query: {
                    uid: this.userData.uid
                }
            });
        },

        onClickFollow() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            this.$api.followUp(this.userData.uid, this);
            this.mfollowed = true;
        },
        onClickUnfollow() {
            this.$api.unfollowUp(this.userData.uid, this);
            this.mfollowed = false;
        },
        changStyle(parm) {
            if (this.mfollowed) {
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

        }
    }
}
</script>

<style lang="less" scoped>
.anchorItem {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.45rem;
    justify-content: space-between;
}
.info {
    flex: 1;
    width: 0;
    padding-right: 0.4rem;
    display: flex;
    align-items: center;
}
.mainInfo {
    padding-left: 0.11rem;
    flex: 1;
    width: 0;
}
.name {
    font-size: 0.45rem;
    text-overflow: ellipsis;
    overflow: hidden;
    color: @text-color;
    white-space: nowrap;
}
.des {
    font-size: 0.35rem;
    color: #808184;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 0.08rem;
}
.num {
    display: flex;
    font-size: 0.35rem;
    color: #808184;

    div {
        margin-right: 10px;
    }
    .fans-num {
        color: #fe0000;
    }
    .video-num {
        color: @active-color;
    }
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
</style>