<template>
    <div class="row2">
        <div class="followbtn" v-if="!isSmall">
            <span class="btn1" v-if="!mfollowed" @click="onClickFollow">关注</span>
            <span class="btn2" v-else-if="mfollowed" @click="onClickUnfollow">已关注</span>
        </div>
        <div class="btn" v-else>
            <img src="~/assets/img/jia.png" v-if="!mfollowed" @click="onClickFollow">
            <img src="~/assets/img/gou.png" v-else-if="mfollowed" @click="onClickUnfollow">
        </div>
    </div>
</template>
<script>

export default {
    name: "followbtn",
    props: ['followed', 'uid', 'isSmall'],
    data() {
        return {
            mfollowed: this.followed,
            muid: this.uid,
        };
    },
    watch: {
        followed: {
            deep: true,  // 深度监听
            async handler(newVal, oldVal) {
                this.mfollowed = this.followed;
            }
        },
        uid: {
            deep: true,  // 深度监听
            async handler(newVal, oldVal) {
                this.muid = this.uid;
            }
        }
    },

    methods: {
        async onClickFollow() {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            let res = await this.$api.followUp(this.muid);
            if (res && res.errorCode == 0) {
                this.mfollowed = true;
                this.$nuxt.$emit("followChange");
            }
        },
        async onClickUnfollow() {
            let res = await this.$api.unfollowUp(this.muid);
            if (res && res.errorCode == 0) {
                this.mfollowed = false;
                this.$nuxt.$emit("followChange");
            }
        }
    }
}
</script>

<style lang="less" scoped>
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

.btn img {
    width: 0.44rem;
}
</style>
