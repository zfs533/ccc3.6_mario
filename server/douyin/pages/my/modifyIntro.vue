<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="修改简介" style="z-index: 1000;width: 100%" right-text="保存" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content">
            <div class="scroll-container">
                <div class="info">
                    <div class="text">个人简介</div>
                    <div class="input">
                        <van-field v-model="introduce" rows="3" type="textarea" size="large" placeholder="填写个人简介更容易获得别人关注哦" maxlength="100" :show-word-limit="true" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 

import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "modifyIntro",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        let name = "";
        if (this && this.$route && this.$route.query.introduce) {
            name = this.$route.query.introduce;
        }
        return {
            // introduce: this.$router.params.introduce,
            introduce: name,
        };
    },

    methods: {
        onClickLeft() {
            this.$router.back();
        },
        async onClickRight() {
            let res = await this.$api.changeMyInfo({ introduce: this.introduce });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.$toast("修改成功");
            this.$userStore.updateUserInfo({ introduce: this.introduce });
            this.$router.back();
        },
    },

    created() {
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    activated() {
        this.$parent.showTabbar = false;
    }
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