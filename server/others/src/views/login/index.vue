<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

            <div class="title-container">
                <h3 class="title">站群管理后台</h3>
            </div>

            <el-form-item prop="name">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input ref="name" v-model="loginForm.name" placeholder="账号" name="username" type="text" tabindex="1" autocomplete="on" />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="pwd">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input :key="passwordType" ref="pwd" v-model="loginForm.pwd" :type="passwordType" placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-form-item prop="code">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input ref="code" v-model="loginForm.code" placeholder="验证码" name="code" type="number" />
            </el-form-item>
            <div style="color:#ccc">账号首次登录时无需输入验证码</div>
            <el-button :loading="loading" type="primary" style="width:100%;margin:30px 0;" @click="handleLogin()">登录</el-button>
        </el-form>
        <el-dialog title="验证二维码" :visible.sync="showImg" width="50%" @close="imgUrl=''" top="5%">
            <AuthCode :qrcode='imgUrl' v-if="showImg" @handleLogin="handleLogin" />
        </el-dialog>
    </div>
</template>

<script>
import { login } from '@/api/user';
import { setSession } from '@/utils/auth';
import QRCode from "qrcode";
import AuthCode from '@/components/AuthCode.vue';

export default {
    name: 'Login',
    components: {
        AuthCode
    },
    computed: {
        showImg() {
            return this.imgUrl ? true : false;
        }
    },
    data() {
        return {
            loginForm: {
                name: '',
                pwd: '',
                code: ''
            },
            loginRules: {
                name: [{ required: true, trigger: 'blur', message: '账号必填' }],
                pwd: [{ required: true, trigger: 'blur', message: '密码必填' }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            imgUrl: ''
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true
        }
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
        // this.imgUrl = "dfsdfsdfsd";
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        checkCapslock(e) {
            const { key } = e;
            this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        async handleLogin(code) {
            await this.$refs.loginForm.validate();
            let query = { ...this.loginForm };
            if (code) {
                query.code = code;
            }
            let res = await this.$http(login, { ...query, verify: code ? true : undefined });
            if (res.code === 200) {
                if (res.msg.url) {
                    this.$message.info("请输入验证码");
                    QRCode.toDataURL(res.msg.url).then(url => {
                        this.imgUrl = url;
                    });
                    return;
                }
                this.imgUrl = '';
                setSession("role", res.msg.role);
                setSession("x-token", res.msg.token);
                setSession("tokenGetTime", new Date().getTime());
                setSession("src", res.msg.sul);
                setSession("pidList", res.msg.pid);
                setSession("dataAuth", res.msg.role.dataAuth);
                this.$store.dispatch("baseData/setCategories");
                this.$store.dispatch("baseData/setTags");
                this.$router.push({ path: this.redirect || '/index', query: this.otherQuery });
            }
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        }
        // afterQRScan() {
        //   if (e.key === 'x-admin-oauth-code') {
        //     const code = getQueryObject(e.newValue)
        //     const codeMap = {
        //       wechat: 'code',
        //       tencent: 'code'
        //     }
        //     const type = codeMap[this.auth_type]
        //     const codeName = code[type]
        //     if (codeName) {
        //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //         this.$router.push({ path: this.redirect || '/' })
        //       })
        //     } else {
        //       alert('第三方登录失败')
        //     }
        //   }
        // }
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .login-form .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .login-form .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .login-form .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
