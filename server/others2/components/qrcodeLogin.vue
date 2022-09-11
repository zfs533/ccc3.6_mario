<template>
    <div id="app">
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <div class="photoBtn">
                <slot></slot>
            </div>
        </van-uploader>
        <van-overlay z-index="2" :show="loadingText!=''">
            <div class="centerTip">
                <van-loading type="spinner" vertical>{{loadingText}}</van-loading>
            </div>
        </van-overlay>
    </div>
</template>
<script>

import Loading from '~/components/loading.vue';
import qrcode from 'llqrcode';
export default {
    components: {
        Loading
    },
    data() {
        return {
            xxurl: "",
            loadingText: ""
        };
    },
    methods: {
        async onDecode(url) {
            if (url) {
                let res = await this.$api.signin({
                    verifyType: 'identifyCard',
                    login: url
                });
                if (res.errorCode !== 0) {
                    this.$toast("登录失败!!" + res.message);
                    return;
                }
                this.$router.replace({
                    path: "/my"
                });
            }
        },
        onInit(promise) {
            promise
                .then(console.log)
                .catch(console.error);
        },
        getUrl(file) {
            // let url = this.getObjectURL(file);
            let url = window.webkitURL.createObjectURL(file) || window.URL.createObjectURL(file);
            console.log('开始解析二维码...', url);
            qrcode.decode(url);
            qrcode.callback = async (imgMsg) => {
                console.log('二维码识别结果', imgMsg);
                if (imgMsg && imgMsg != 'error decoding QR Code') {
                    this.loadingText = "识别成功，正在登录...";
                    let data = await this.$api.signin({
                        verifyType: 'identifyCard',
                        login: imgMsg
                    });
                    if (data.errorCode !== 0) {
                        this.loadingText = '';
                        this.$toast("登录失败!!" + res.message);
                        return;
                    } else {
                        this.$router.replace("/my");
                    }
                }
                else {
                    this.$toast("二维码识别失败，请保持照片中的二维码质量清晰");
                }
                this.loadingText = '';
            };

        },
        getObjectURL(file) {
            let url = null;
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        async afterRead(file) {
            this.loadingText = '正在识别二维码，请稍候...';
            let newFile = await this.imgLow(file);
            // this.xxurl = newFile.content;
            this.getUrl(newFile.file);
            // 此时可以自行将文件上传至服务器
        },
        imgLow(file) {
            return new Promise((resolve, reject) => {
                let canvas = document.createElement('canvas'); // 创建Canvas对象(画布)
                let context = canvas.getContext('2d');
                let img = new Image();
                img.src = file.content; // 指定图片的DataURL(图片的base64编码数据)
                img.onload = () => {
                    // 图片原始尺寸
                    var originWidth = img.width;
                    var originHeight = img.height;
                    // 最大尺寸限制
                    var maxWidth = 500, maxHeight = 500;
                    // 目标尺寸
                    var targetWidth = originWidth;
                    var targetHeight = originHeight;
                    // 图片尺寸超过400x400的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    file.content = canvas.toDataURL(file.file.type, 0.92);
                    resolve(file);
                };
            });
        },
        beforeRead(file) {
            console.log(file, "$$$$$$$$$$$$$");
            return true;
        },
        onClickBack() {
            this.$router.back();
        },

    }
}
</script>
<style lang="less" scoped>
.centerTip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    margin-top: 20vh;
}
</style>