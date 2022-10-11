<template>
    <div>
        <div class="outBox">
            <div style="height:500px">
                <el-steps direction="vertical" :active="-1">
                    <el-step title="下载并安装谷歌验证器APP"></el-step>
                    <el-step title="使用谷歌验证器扫描下面的二维码"></el-step>
                    <el-step title="输入动态口令后登录"></el-step>
                </el-steps>
            </div>
            <div class="stepContent">
                <section>
                    <dl style="margin-left:20px">
                        <dt>在手机上安装谷歌验证器 (Google Authenticator)</dt>
                        <dd>
                            <li>安卓：<el-button type="text" @click="showDown(0)">点击获取下载二维码</el-button>
                            </li>
                            <li>苹果：<el-button type="text" @click="showDown(1)">点击获取下载二维码</el-button>
                            </li>
                        </dd>
                    </dl>
                </section>
                <section>
                    <img :src="qrcode" class="qrcode" alt="">
                </section>
                <section>
                    <el-input name="code" type="text" size="medium" class="codeBox" v-model="code" placeholder="输入谷歌验证器中显示的6位数字进行绑定" />
                    <el-button type="primary" @click.native.prevent="handleLogin">验证并登录</el-button>
                </section>
            </div>
        </div>
        <el-dialog :title="`Authenticator-${downType===0?'安卓':downType===1?'苹果':''}下载`" :visible.sync="dialogDown" append-to-body width="30%">
            <img :src="downType===0?adrUrl:downType===1?iosUrl:''" alt="" class="downQrcode">
        </el-dialog>
    </div>
</template>
<script>
import QRCode from "qrcode";
export default {
    props: {
        qrcode: String
    },
    data() {
        return {
            code: "",
            dialogDown: false,
            adrUrl: "",
            iosUrl: "",
            downType: ''
        };
    },
    methods: {
        handleLogin() {
            this.dialogDown = false;
            this.$emit('handleLogin', this.code);
        },
        showDown(type) {
            this.downType = type;
            if (type === 0) {
                QRCode.toDataURL('https://drive.google.com/file/d/1kIblYgP5E3qsWW6f5-9jbj7WYd9mJjpg/view?usp=sharing').then(url => {
                    this.adrUrl = url;
                });
            }
            else if (type === 1) {
                QRCode.toDataURL('https://itunes.apple.com/tw/app/google-authenticator/id388497605?mt=8&ign-mpt=uo%3D4').then(url => {
                    this.iosUrl = url;
                });
            }
            this.dialogDown = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.downQrcode {
    display: block;
    width: 300px;
    height: 300px;
    margin: 0 auto;
}
.outBox {
    height: 650px;
    .el-step__title.is-wait {
        color: #666;
    }
    .stepContent {
        position: absolute;
        top: 100px;
        left: 40px;
        height: 620px;
        display: flex;
        flex-direction: column;
        section {
            flex: 2;
            &:nth-child(3) {
                flex: 1;
            }
        }
        dl {
            line-height: 40px;
        }
        .qrcode {
            width: 200px;
            height: 200px;
        }
        .codeBox {
            display: block;
            margin-bottom: 16px;
        }
    }
}
</style>