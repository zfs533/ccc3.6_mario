<template>
    <div>
        <van-nav-bar v-if="showBackBar" left-arrow @click-left="onClickLeft"> </van-nav-bar>
        <div class="content">
            <div class="myTitle">Hello/抖友</div>
            <div class="phone">
                <van-field placeholder="请输入手机号" type="tel" v-model="phoneNumber">
                </van-field>
            </div>
            <div class="code">
                <van-field placeholder="请输入随意六位数字" type="digit" v-model="code">
                </van-field>
                <div class="line"></div>
                <span v-if="showBtnCode" @click="onClickGetCode">获取验证码</span>
                <span v-else>{{ countdown }}秒</span>
            </div>
            <div class="text">禁止未满18周岁的用户注册使用</div>
            <div class="text" @click="showTip = true">
                <van-icon name="question-o" />
                <span> 为什么使用手机号登陆</span>
            </div>
            <div class="btn" @click="onClickLogin">立即登陆</div>
            <div class="qrLogin">
                <!-- <div class="streemLogin" @click="onClickOther">扫码登录</div> -->
                <div class="streemLogin">
                    <!-- <span>识别二维码登录</span> -->
                    <QrcodeLogin>
                        <div>识别二维码登录</div>
                    </QrcodeLogin>
                </div>
            </div>
            <div class="ps">
                <p>
                    如果您已经在app上购买VIP或视频,<br />请先在app绑定手机号，再登录网页端
                </p>
                <p v-if="autoRegister">未注册用户将自动注册</p>
            </div>
        </div>
        <van-dialog v-model="showTip" :showConfirmButton="false" :closeOnClickOverlay="true">
            <div class="diaContent">
                <div class="code1">
                    您的手机号不会以明文显示，除了你自己，谁也不会知道。您不会收到任何多余的信息。绑定仅为了与抖阴app账号互通，防止账号丢失。抖阴15年，感谢你的信任。
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>  
import { pageMixin } from "~/assets/js/mixins";
import QrcodeLogin from '~/components/qrcodeLogin.vue';
export default {
    name: "login",
    layout: "keepalive",
    components: {
        QrcodeLogin
    },
    mixins: [pageMixin],
    data() {
        return {
            autoRegister: false,
            showTip: false,
            phoneNumber: "",
            code: "",
            countdown: 60,
            TotalTime: 60,
            timer: null,
            showBtnCode: true,
            showBackBar: true,
        };
    },
    created() {
        this.autoRegister = this.$env.options.autoRegister;
    },
    async mounted() {
        console.log("login mounted");
        this.$parent.showTabbar = false;
    },
    activated() {
        console.log("login activated");
        this.$parent.showTabbar = false;
    },

    methods: {
        onClickLeft() {
            if (this.$route.query.from == "my") {
                this.$router.replace("/my");
            } else if (this.$route.query.from == "vip") {
                this.$router.replace("/vip");
            } else {
                this.$router.replace("/home");
            }
        },

        async onClickGetCode() {
            if (!this.phoneNumber) {
                this.$toast("请先输入手机号码");
                return;
            } else if (!this.isValidateMobile(this.phoneNumber)) {
                this.$toast("phone 格式是无效的");
                return;
            }

            let res = await this.$api.getPhoneCode({
                // login:"xxx",//  用户名
                phone: this.phoneNumber,
            });

            if (res.errorCode !== 0) {
                this.$toast("网络请求出错：" + res.message);
                return;
            }

            this.$toast("验证码发送成功！");

            this.doCountDown();
        },

        async onClickLogin() {
            if (this.code.length != 6) this.$toast("请输入正确的验证码");
            if (! /^1[3456789]\d{9}$/.test(this.phoneNumber)) {
                this.$toast("请输入正确的手机号");
                return;
            }
            let channel = this.$channel.getChannel();
            let promote = this.$channel.getPromoteCode();

            let res = await this.$api.signin({
                login: this.phoneNumber,
                code: this.code,
                verifyType: "phone",
                platform: "web",
                channel: channel,
                inviteCode: promote
            });

            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                return;
            }
            // this.$toast("登录成功！"); 
            this.$router.replace("/my");
        },

        isValidateMobile(phoneNo) {
            let pattern = /^1[0-9]{10}$/;

            return pattern.test(phoneNo);
        },

        doCountDown() {
            this.showBtnCode = false;
            this.countdown = this.TotalTime;
            this.timer = setInterval(() => {
                if (this.countdown === 1) {
                    this.clearTimer();
                    this.showBtnCode = true;
                } else {
                    this.countdown--;
                }
            }, 1000);
        },
        loading() {
            this.countdown--;
        },
        clearTimer() {
            clearInterval(this.timer);
            this.timer = null;
        },
    },
    async activated() {
    },
};
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    padding: 60px 20px 0;
}

.content .myTitle {
    color: @theme-color2;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 40px;
}
.content .phone {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: @common-inputBG-color1;
    border-radius: 50px;
}
.content .van-cell {
    background: none;
    // padding-left: 0;
}
.content .code {
    display: flex;
    align-items: center;
    background: @common-inputBG-color1;
    border-radius: 50px;
}

.content .code span {
    width: 100px;
    height: 32px;
    // border: 1px solid @active-color;
    font-size: 12px;
    color: @active-color;
    // border-radius: 50px;
    display: flex;
    // justify-content: center;
    align-items: center;
}

.content .text {
    color: @common-tipText-color1;
    margin-top: 20px;
    font-size: 12px;
}

.content .btn {
    margin-top: 46px;
    color: @common-btnText-color1;
    background-image: @common-btnBG-color1;
    width: 100%;
    height: 42px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

.loading,
.qrLogin {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content .streemLogin {
    color: @active-color;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}

.ps {
    font-size: 12px;
    color: @theme-color2;
    text-align: center;
}

.ps p {
    margin-top: 20px;
}

.diaContent {
    padding: 20px;
}

.diaContent .code1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @theme-color2;
}
::v-deep .van-field__control::-webkit-input-placeholder {
    color: @common-inputText-color1;
}

.van-dialog {
    background: @common-inputBG-color1;
}
.line {
    width: 1px;
    height: 30px;
    margin-right: 8px;
    background-color: @login-bg-color1;
}
</style>