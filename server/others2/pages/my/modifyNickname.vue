<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="修改昵称" style="z-index: 1000;width: 100%" right-text="保存" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content">
            <div class="info">
                <div class="text">我的名字</div>
                <div class="input">
                    <van-field v-model="username" placeholder="请输入昵称" maxlength="8" :show-word-limit="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>  

import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "modifyNickname",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        let name = "";
        if (this && this.$route && this.$route.query.username) {
            name = this.$route.query.username;
        }
        return {
            // username: this.$router.params.username,
            username: name,
        };
    },
    created() {
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
        async onClickRight() {
            if (this.username.length < 4) {
                this.$toast('用户名最少为4个字符');
                return;
            }
            let res = await this.$api.changeMyInfo({ username: this.username });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.$toast("修改成功");
            this.$userStore.updateUserInfo({ username: this.username });
            this.$router.back();
        },
    },

};
</script>


<style lang="less" scoped>
.info {
    padding: 20px;
}
.info .text {
    font-size: 15px;
    color: @common-tipText-color1;
    margin-bottom: 20px;
}
.info .van-cell {
    background: @common-inputBG-color1;
    color: @text-color;
}
::v-deep .van-field__control::-webkit-input-placeholder {
    color: @common-inputText-color1;
}
</style>