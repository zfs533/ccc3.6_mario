<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickLeft" title="账号与安全" style="z-index: 1000;  width: 100%;" :placeholder="true"></van-nav-bar>
        </div>
        <div class="info content">
            <!-- <div class="row" @click="toPage(0)">
                <div class="avatar">
                    <img :data-src="avatarURL" :src="headBase64Data" alt="" />
                </div>
                <div class="right">
                    <span>修改头像</span>
                    <van-icon name="arrow" color="#aaa" size="16" />
                </div>
            </div> -->
            <div class="row" @click="toPage(1)">
                <div class="left">名字</div>
                <div class="right">
                    <span>{{ username }}</span>
                    <van-icon name="arrow" color="#aaa" size="16" />
                </div>
            </div>
            <div class="row" @click="toPage(2)">
                <div class="left">简介</div>
                <div class="right">
                    <span>{{
            introduce ? introduce : "填写个人简介,让更多人关注你"
          }}</span>
                    <van-icon name="arrow" color="#aaa" size="16" />
                </div>
            </div>
            <div class="row">
                <div class="left">手机号</div>
                <div v-if="phone" class="right">
                    <span>{{ phone }}</span>
                </div>
                <div v-else class="right" @click="$router.replace('/login?from=my')">
                    <span>绑定手机号</span>
                    <van-icon name="arrow" color="#aaa" size="16" />
                </div>

            </div>
            <div class="row" @click="toPage(3)">
                <div class="left">绑定邀请人</div>
                <div class="right">
                    <span>{{ inviteStr }}</span>
                    <van-icon v-if="!inviteDate" name="arrow" color="#aaa" size="16" />
                </div>
            </div>
            <div class="btn" @click="onClickChangeAct">切换账号</div>
        </div>
        <div class="dialog1">
            <van-dialog v-model="isShowDialog1" :showConfirmButton="false" :closeOnClickOverlay="true">
                <div class="diaContent">
                    <!-- <div class="system">系统头像</div> -->
                    <div class="local" @click="toPage(14)">本地头像</div>
                </div>
            </van-dialog>
        </div>
        <div class="dialog4">
            <van-popup v-model="isShowDialog4" position="bottom" round :style="{ height: '20%' }">
                <div class="diaContent" style="height: 20%">
                    <van-uploader :before-read="beforeRead" :after-read="afterRead">
                        <span class="text">从本地导入图片</span>
                    </van-uploader>
                </div>
            </van-popup>
        </div>

        <van-overlay :show="showLogind">
            <van-loading type="spinner" vertical />
        </van-overlay>
    </div>
</template>

<script>  

import { defaultRes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "info",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            username: "",
            introduce: "",
            avatarURL: "",
            headBase64Data: defaultRes.userAvatorDefault,
            phone: "",
            inviteStr: "未绑定",
            inviteDate: "",

            isShowDialog1: false,
            isShowDialog4: false,
            showLogind: false,
            isBind: false
        };
    },

    async created() {
        console.log("info created");
        let info = this.$userStore.getMyInfo();
        this.isBind = this.$userStore.isBind();
        this.username = info.username;
        if (info.avatarURL) this.avatarURL = info.avatarURL;
        if (info.headBase64Data) this.headBase64Data = info.headBase64Data;
        this.introduce = info.introduce;
        this.phone = info.phone;
        this.inviteDate = info.inviteDate;
        this.inviteStr = info.invitedUid ? info.invitedUid : "前往绑定";
    },
    mounted() {
        this.$parent.showTabbar = false;
    },
    activated() {
        console.log("info activated");
        this.$parent.showTabbar = false;
    },
    deactivated() {
        console.log("info deactivated");
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },

        toPage(id) {
            switch (id) {
                case 0:
                    this.isShowDialog1 = true;
                    break;
                case 1:
                    this.$router.push({
                        path: "/my/modifyNickname",
                        query: {
                            username: this.username,
                        },
                    });
                    break;
                case 2:
                    this.$router.push({
                        path: "/my/modifyIntro",
                        query: {
                            introduce: this.introduce,
                        },
                    });
                    break;
                case 3:
                    if (this.inviteStr == "前往绑定") {
                        this.$router.push({
                            path: "/my/bindInviteCode",
                        });
                    } else {
                        this.$toast('您已经绑定了～');
                    }

                    break;
                case 14:
                    this.isShowDialog1 = false;
                    this.isShowDialog4 = true;
                    break;
            }
        },
        beforeRead(file) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                this.$toast("请上传 jpg 或者 png 格式图片");
                return false;
            }
            return true;
        },

        async afterRead(file) {
            this.showLogind = true;
            let formData = new FormData();
            formData.append("file", file.file);
            let res = await this.$api.sendImg(formData);
            if (res.errorCode !== 0) {
                this.showLogind = false;
                this.$toast("数据请求出错：" + res.message);
                return;
            }

            this.avatarURL = res.msg;

            let resInfo = await this.$api.changeMyInfo({ avatarURL: this.avatarURL });

            this.showLogind = false;
            if (resInfo.errorCode !== 0) {
                this.$toast("数据请求出错：" + resInfo.message);
                return;
            }
            this.$toast("修改成功");

            this.avatar = file.content;
            this.$userStore.updateUserInfo({ headBase64Data: this.avatar, avatarURL: this.avatarURL });

            this.isShowDialog1 = false;
            this.isShowDialog4 = false;

            // this.$toast("修改成功");
            // this.$router.back();
        },

        onClickUploadHead() { },

        onClickChangeAct() {
            this.$router.push({
                path: "/login",
                query: {
                    from: this.$route.path
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.info {
    margin-top: 20px;
    padding: 0 20px;
    width: 100%;
}
.info .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
}
.info .row .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

.info .row .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    display: block;
}
.right {
    display: flex;
    align-items: center;
}

.right span {
    font-size: 13px;
    color: #808184;
    padding-right: 8px;
}
.right img {
    width: 7px;
}

.left {
    color: @text-color;
    font-size: 13px;
}

.info .btn {
    width: 100%;
    height: 42px;
    background: @common-btnBG-color1;
    color: @common-btnText-color1;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 60px;
    cursor: pointer;
}

.dialog1 .diaContent {
    width: 100%;
    height: 150px;
}
.dialog1 .diaContent > div {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
}
.dialog3 .diaContent,
.dialog4 .diaContent {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.text {
    font-size: 18px;
    text-align: center;
}

.van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -15px;
}
</style>