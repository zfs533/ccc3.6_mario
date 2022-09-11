<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" title="绑定邀请码" style="z-index: 1000; width: 100%" right-text="绑定" :placeholder="true"></van-nav-bar>
        </div>
        <div class="inputBox content">
            <!-- <input type="text" placeholder="请输入兑换码" /> -->
            <van-field v-model="value" placeholder="请输入邀请用户ID" />
        </div>
    </div>
</template>

<script> 

import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "bindInviteCode",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            value: "",
        };
    },
    created() {

    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    activated() {

        console.log("bindCode activated");
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },

        async onClickRight() {
            if (!this.value) {
                // this.$toast("请输入邀请码");
                return;
            }
            let res = await this.$api.bindInviteCode({
                inviteCode: this.value,
            });
            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            this.$toast("绑定成功");
        },
    },
};
</script>

<style lang="less" scoped>
.inputBox {
    padding: 0 20px;
    margin-top: 20px;
}

// input {
//     height: 50px;
//     width: 100%;
//     background: @content-color;
//     color: @text-color;
//     border: none;
//     border-radius: 5px;
//     padding-left: 25px;
// }

.van-field {
    background: @common-inputBG-color1;
    padding-left: 20px;
    color: @common-inputText-color1;
}
::v-deep .van-field__control::-webkit-input-placeholder {
    color: @common-inputText-color1;
}
</style>