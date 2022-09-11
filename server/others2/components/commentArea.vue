<template>
    <div style="height:100%">
        <van-popup v-if="!fixed" overlay-class="opactiyMask" class="popup" v-model="showChat" position="bottom" round get-container="#app">
            <div class="main">
                <div class="topTitle">
                    <span>全部评论({{totalCount}})</span>
                    <van-icon @click="showChat=false" name="cross" />
                </div>
                <div class="chatsArea">
                    <van-list class="tab-content" v-model="loadingCommonts" :finished="finished" finished-text="没有更多了" @load="getMoreComments">
                        <comment-item :info='item' v-for="item of commentList" :key="item.id">
                        </comment-item>
                    </van-list>
                </div>
                <div class="inputArea">
                    <div class="comment-input-linear-bg" />
                    <div v-if="$userStore.getMyInfo().vipLevel">
                        <van-field ref="commentField" v-model="textInput" :placeholder="replyInfo.parent?(`回复 ${replyInfo.parent.username}:`):' 有爱评论，说点好听的～'" right-icon="arrow" @click-right-icon="clickSend" />
                    </div>
                    <div v-else class="loginTip" @click="onclickLogin">
                        <div class="tips">
                            升级<span style="color:#f00"> VIP </span>，占领评论区
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <div v-else class="fixed main">
            <div class="chatsArea">
                <van-list class="tab-content" v-model="loadingCommonts" :finished="finished" finished-text="没有更多了" @load="getMoreComments">
                    <comment-item :info='item' v-for="item of commentList" :key="item.id">
                    </comment-item>
                </van-list>
            </div>
            <div class="inputArea">
                <div v-if="$userStore.getMyInfo().vipLevel">
                    <van-field ref="commentField" v-model="textInput" :placeholder="replyInfo.parent?(`回复 ${replyInfo.parent.username}:`):' 有爱评论，说点好听的～'" right-icon="arrow" @click-right-icon="clickSend" />
                </div>
                <div v-else class="loginTip" @click="onclickLogin">
                    <div class="tips">
                        升级<span style="color:#f00"> VIP </span>，占领评论区
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const CommentSourceType = {
    SourceVideo: "video",
};
const PerCount = 10;




export default {

    props: {
        sourceId: '',
        fixed: false,
    },

    watch: {
        sourceId(val) {
            curSourceId = val;
        }
    },

    data() {
        return {
            showChat: false,
            curSourceId: this.sourceId,

            loadingCommonts: false,
            finished: false,
            textInput: '',

            totalCount: 0,
            commentList: [],

            replyInfo: {
            },



        };
    },


    created() {
        this.$nuxt.$on("replyComment", (data) => this.replyComment(data));
    },

    activated() {
    },


    methods: {

        async clickSend() {
            if (!this.textInput) {
                return;
            }

            let rootId = this.replyInfo.rootId || '';
            let parentId = this.replyInfo.parentId || '';

            let param = {
                sourceId: this.curSourceId,
                parentId: parentId,
                rootId: rootId,
                content: this.textInput,
            };
            let res = await this.$api.sendComment(CommentSourceType.SourceVideo, param);
            if (res.errorCode != 0) {
                this.$toast(res.message);
                return;
            }
            this.$toast('发送成功');
            this.totalCount++;

            this.updateTotalCommentCnt();
            let comment = res.data.comment;
            comment.user = this.$userStore.getMyInfo();
            comment.comments = [];
            if (!comment.rootId) {
                this.commentList.unshift(comment);
            } else {
                comment.parentId = parentId;
                comment.parent = this.replyInfo.parent;
                for (let item of this.commentList) {
                    if (item.id == comment.rootId) {
                        item.comments.unshift(comment);
                        break;
                    }
                }
            }
            this.textInput = '';
            this.replyInfo = {};
        },



        async onShowChat(val) {
            this.showChat = true;
            if (val == this.curSourceId && this.commentList.length) {
                // return;
            }
            this.finished = true;
            this.curSourceId = val;
            this.commentList = [];
            this.totalCount = 0;
            this.replyInfo = {};
            await this.getMoreComments();
        },

        replyComment(data) {
            if (!this.$refs.commentField) {
                return;
            }
            this.$refs.commentField.focus();

            this.replyInfo = data;

        },

        async getMoreComments() {

            if (!this.curSourceId) {
                return;
            }
            const lastCommentID = this.commentList.length
                ? this.commentList[this.commentList.length - 1].id
                : "";

            let data = await this.$api.getFirstComments(CommentSourceType.SourceVideo, this.curSourceId, lastCommentID, PerCount);
            this.loadingCommonts = false;
            if (data && data.errorCode != 0) {
                return;
            }
            this.finished = false;
            let list = data.data.list;
            if (list.length < PerCount) {
                this.finished = true;
            }
            this.totalCount = data.data.totalCommentCnt;
            this.updateTotalCommentCnt();
            this.commentList = this.commentList.concat(list);
        },

        onclickLogin() {
            this.showChat = false;
            this.$router.push({
                path: "/recharge?type=vip",
            });
        },


        updateTotalCommentCnt() {
            let param = {
                id: this.curSourceId || '',
                totalCommentCnt: this.totalCount,

            };
            this.$nuxt.$emit('updateTotalCommentCnt', param);
        },


    }

}
</script>

<style lang="less" scoped>
.popup {
    height: 80%;

    padding-bottom: var(--safe-bottom);
    background: @theme-color;
    color: @theme-color2;
    overflow: hidden;
}

.opactiyMask {
    background: transparent;
}
.main {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.chatsArea {
    flex-direction: column;
    flex-grow: 1;
    outline: none;
    overflow: scroll;
    overflow-x: hidden;
    padding: 0 16px;
    position: relative;
}

.popup {
    .topTitle {
        align-items: center;
        display: flex;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 16px;
        font-weight: 500;
        height: 54px;
        justify-content: space-between;
        line-height: 24px;
        padding: 0 16px;
        position: relative;
        top: 0;
        z-index: 1;
    }

    .inputArea {
        flex-grow: 0;
        flex-shrink: 0;
        margin-bottom: 10px;
        max-height: calc(100% - 74px);
        padding: 0 16px;
        position: relative;
        width: 100%;
    }

    .van-cell {
        background: @common-inputBG-color1;
    }

    .comment-input-linear-bg {
        // background: linear-gradient(0deg, #2e2f3b, rgba(46, 47, 59, 0));
        height: 126px;
        left: 0;
        pointer-events: none;
        position: absolute;
        right: -16px;
        top: -126px;
    }
    .loginTip {
        align-items: center;
        background-color: @common-inputBG-color1;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        height: 44px;
        justify-content: center;
        width: 100%;
        .tips {
            // color: rgba(47, 48, 53, 0.7);
            // color: hsla(0, 0%, 100%, 0.7);
            color: @common-inputText-color1;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
        }
    }
}
::v-deep .van-field__control::-webkit-input-placeholder {
    color: @common-inputText-color1;
}

.fixed {
    // color: hsla(0, 0%, 100%, 0.9);
    color: @theme-color2;
    .inputArea {
        flex-grow: 0;
        flex-shrink: 0;
        max-height: calc(100% - 74px);
        margin-bottom: 10px;
        position: relative;
        width: 100%;
        padding: 0 16px;
        // box-shadow: 1px 1px 2px @play-border-color1;
    }

    .van-cell {
        background: @theme-color;
    }

    .loginTip {
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        height: 44px;
        justify-content: center;
        width: 100%;

        align-items: center;
        background-color: @common-inputBG-color1;
        .tips {
            color: @theme-color2;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;

            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
        }
    }
}
</style>