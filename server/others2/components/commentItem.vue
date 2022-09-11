<template>
    <div class="comment-item" :key="showInfo.uid">
        <div class="left">
            <div @click="onClickUser(showInfo.user.uid)" class="avatar">
                <usericon :imgUrl="showInfo.user.avatarURL" alt="" />
            </div>
        </div>
        <div class="comment-info">
            <div class="comment-title">
                <div class="create-info">
                    <div class="createUsername" @click="onClickUser(showInfo.user.uid)">
                        {{showInfo.user.username}}
                    </div>
                    <div v v-if="showInfo.rootId && showInfo.parentId != showInfo.rootId" class="sanjiao"></div>
                    <div @click="onClickUser(showInfo.parent.uid)" v-if="showInfo.rootId && showInfo.parentId != showInfo.rootId">
                        {{showInfo.parent.username}}
                    </div>
                    <div class="createTime">{{showInfo.createdAtLabel}}</div>
                </div>
            </div>
            <div class="comment-content">
                {{showInfo.content}}
            </div>
            <div class="comment-option">
                <div class="options">
                    <div class="likeBtn" @click="onClickLike()">
                        <van-icon style="padding:1px" v-if="showInfo.userLiked" name="like" size="18" color="#ee0a24" />
                        <van-icon style="padding:1px" v-else name="like-o" size="18" />
                        <div class="num">{{formatNumber2(showInfo.likedCnt)}}</div>
                    </div>
                    <div class="likeBtn" @click="onClickReply()">
                        <van-icon style="padding:1px" name="chat-o" size="18" />
                        <div class="num">回复</div>
                    </div>
                </div>
            </div>
            <div>
                <comment-item :info='item' v-for="item of showInfo.comments" :key="item.id" />
            </div>
            <div @click="getMoreComments" class="detailBtn" v-if="showInfo.commentCnt > 2 && showInfo.comments.length < showInfo.commentCnt">
                展开更多回复
            </div>
        </div>

    </div>

</template>

<script>


const CommentSourceType = {
    SourceVideo: "video",
};
const PerCount = 10;


import * as utils from "~/assets/js/utils";
export default {
    props: {
        info: {
            user: {
            },

            userLiked: false,
        },
        discountDiamond: {
            type: [String, Number],
            default: 0
        },

    },

    watch: {
        info(val) {
            this.showInfo = val;
        },
    },

    data() {
        let info = this.info;
        info.user = info.user || 0;
        info.likedCnt = this.info.likedCnt || 0;
        info.userLiked = this.info.userLiked || false;
        return {
            showInfo: info,
        };
    },

    methods: {
        async onClickLike() {
            this.$nextTick(async () => {


                if (this.showInfo.userLiked) {
                    this.showInfo.likedCnt--;
                    this.showInfo.userLiked = false;
                    let res = await this.$api.sendUnlikeComment(CommentSourceType.SourceVideo, this.showInfo.id);
                    if (res.errorCode != 0) {
                        this.$toast(res.message);
                        this.showInfo.likedCnt++;
                        this.showInfo.userLiked = true;
                    }
                } else {
                    this.showInfo.likedCnt++;
                    this.showInfo.userLiked = true;
                    let res = await this.$api.sendLikeComment(CommentSourceType.SourceVideo, this.showInfo.id);
                    if (res.errorCode != 0) {
                        this.$toast(res.message);
                        this.showInfo.likedCnt--;
                        this.showInfo.userLiked = false;
                    }
                }
                this.$forceUpdate();
            });
        },

        onClickReply() {
            let param = {
                rootId: this.showInfo.rootId || this.showInfo.id,
                parentId: this.showInfo.id || '',
                parent: {
                    username: this.showInfo.user.username,
                    id: this.showInfo.user.id,
                    id: this.showInfo.user.uid,

                }
            };
            this.$nuxt.$emit('replyComment', param);
        },

        onClickUser(id) {
            if (!id) {
                id = this.showInfo.user.uid;
            }
            this.$router.push({
                path: "/user",
                query: {
                    uid: id
                }
            });
        },

        async getMoreComments() {
            const lastCommentID = this.showInfo.comments.length
                ? this.showInfo.comments[this.showInfo.comments.length - 1].id
                : "";
            let data = await this.$api.getSecondComments(CommentSourceType.SourceVideo, this.showInfo.id, lastCommentID, PerCount);
            this.loadingCommonts = false;
            if (data && data.errorCode != 0) {
                return;
            }
            this.finished = false;
            let list = data.data.list;
            if (list.length < PerCount) {
                this.finished = true;
            }
            this.showInfo.comments = this.showInfo.comments.concat(list);
        },


        formatNumber2(nb) {
            return utils.formatNumber(nb);
        },
    },


}


</script>

<style lang="less" scoped>
.comment-item {
    display: flex;
    margin-top: 16px;
    position: relative;

    font-size: 14px;
}
.left {
    cursor: pointer;
    margin-right: 12px;
    z-index: 1;
}
.avatar {
    height: 40px;
    width: 40px;
}
.comment-info {
    flex-grow: 1;
    width: 0;
    .comment-title {
        align-items: center;
        display: flex;
        margin-bottom: 4px;
        .create-info {
            align-items: center;
            display: flex;
            flex: 1 1;
            overflow: hidden;
            position: relative;
            .createUsername {
                line-height: 20px;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .createTime {
                color: hsla(0, 0%, 100%, 0.5);
                flex-shrink: 0;
                font-size: 12px;
                font-weight: 400;
                line-height: 20px;
                line-height: 21px;
                margin-left: 8px;
            }
        }
    }
    .comment-content {
        position: relative;
    }
    .comment-option {
        align-items: center;
        color: rgba(47, 48, 53, 0.7);
        color: hsla(0, 0%, 100%, 0.7);
        display: flex;
        font-size: 14px;
        font-weight: 500;
        height: 20px;
        line-height: 20px;
        margin-top: 11px;

        .options {
            align-items: center;
            display: flex;
            font-size: 12px;
            font-weight: 500;
            height: 20px;
            line-height: 20px;
            margin-top: 11px;
        }

        .likeBtn {
            align-items: center;
            cursor: pointer;
            display: flex;
            justify-content: center;
            margin-right: 10px;
            .van-icon {
                color: @active-color;
            }
            .num {
                color: @common-tipText-color1;
            }
        }
        .heartBox {
            width: 30px;
            height: 30px;
            position: relative;
            margin: 0 auto;
        }
    }
}
.sanjiao {
    border: 8px solid transparent;
    border-left: 10px solid #000;
    border-right: none;
    display: inline-block;
    vertical-align: middle;
    margin: 0 8px;

    border-top-width: 4px;
    border-bottom-width: 4px;
    border-left-width: 5px;
    border-left-color: rgb(108, 111, 141);
}

.detailBtn {
    align-items: center;
    background-color: transparent;
    border: none;
    color: hsla(0, 0%, 100%, 0.5);
    cursor: pointer;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    height: 20px;
    letter-spacing: 0.6px;
    line-height: 20px;
    margin-top: 8px;
    outline: none;
}
</style>