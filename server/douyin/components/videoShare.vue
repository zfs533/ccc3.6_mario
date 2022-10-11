<template>
    <div class="videoShareBox">
        <div class="boxIn" @click.stop ref="imageDom">
            <div class="title img-share-video-spr img-share-video-spr-wz2"></div>
            <div :class="`shareImg img-share-video-spr ${randomClass}`">
                <van-icon name="play-circle-o" size="60" style="opacity: 0.8" class="playIcon" />
            </div>
            <div class="shareInfo">
                <div id="qrcode"></div>
                <dl class="textInfo">
                    <dt>扫二维码<br>下载立即观看</dt>
                    <dd class="url">{{downloadUrl}}</dd>
                </dl>
            </div>
            <div class="btns">
                <div class="btn" @click="downloadQrcode">保存二维码</div>
                <div class="btn" @click="copyUrl">复制链接分享</div>
            </div>
        </div>
        <div id="qrcodeDownload" style="width:0;height:0;overflow:hidden"></div>
    </div>
</template>
<script>
const QRCode = require("~/assets/js/qrcode");
import * as utils from "~/assets/js/utils";
export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            downloadUrl: "",
            coverArr: [
                'img-share-video-spr-36',
                'img-share-video-spr-38',
                'img-share-video-spr-40',
                'img-share-video-spr-43',
                'img-share-video-spr-46',
                'img-share-video-spr-48',
                'img-share-video-spr-51',
                'img-share-video-spr-52',
                'img-share-video-spr-53',
                'img-share-video-spr-54'
            ],
            randomClass: ''
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.randomCover();
            }
        }
    },
    created() {
        this.downloadUrl = this.$storage.getString('officialDownloadUrl');
    },
    mounted() {
        this.qrcodeObj = new QRCode('qrcode', {
            text: this.downloadUrl,
            width: 85,
            height: 85,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
        }, 1000);
        new QRCode('qrcodeDownload', {
            text: this.downloadUrl,
            width: 400,
            height: 400,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
        }, 1000);
    },
    methods: {
        randomCover() {
            let num = Math.floor(Math.random() * 10);
            this.randomClass = this.coverArr[num];
        },
        copyUrl() {
            let str = this.downloadUrl;
            this.$copyText(str).then(
                (e) => {
                    this.$toast("网址复制成功");
                },
                (e) => {
                    this.$toast("网址复制失败");
                }
            );

        },
        downloadQrcode() {
            var qrcode = document.getElementById('qrcodeDownload');
            var img = qrcode.getElementsByTagName('img')[0];
            var url = img.getAttribute("src");
            if (navigator.msSaveBlob) {
                let blob = utils.dataURItoBlob(url);
                return navigator.msSaveBlob(blob, 'douyin.png');
            }
            else {
                var link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", 'douyin.png');
                link.click();
            }
            if (this.$cordova) {
                this.$cordova.downloadQrcode(this.$refs.imageDom);
            }
        },
    }
}
</script>
<style lang="less" scoped>
.videoShareBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    dl,
    dt,
    dd {
        padding: 0;
        margin: 0;
    }
    .boxIn {
        width: 270px;
        padding: 15px;
        box-sizing: content-box;
        border-radius: 10px;
        background: @videoShare-bg-color1;
        .title {
            width: 255px;
            height: 51px;
            margin: 0 auto 0.5rem auto;
        }
        .shareImg {
            width: 270px;
            height: 140px;
            // background: url("~/assets/img/share-video/36.png") no-repeat;
            position: relative;
            .playIcon {
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -30px 0 0 -30px;
            }
        }
        .shareInfo {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
            #qrcode {
                width: 105px;
                height: 105px;
                margin-right: 20px;
                padding: 10px;
                background: @videoShare-bg-color2;
            }
            .textInfo {
                dt {
                    font-size: 0.45rem;
                    color: @videoShare-font-color1;
                    margin-bottom: 0.2rem;
                }
                // .tips {
                //     color: rgb(204, 204, 204);
                //     font-size: 0.3rem;
                //     white-space: nowrap;
                // }
                .url {
                    color: @videoShare-font-color2;
                    font-size: 0.35rem;
                }
            }
        }
        .btns {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            .btn {
                width: 122px;
                height: 32px;
                line-height: 32px;
                background: @common-btnBG-color1;
                color: @common-btnText-color1;
                border-radius: 0.5rem;
                text-align: center;
                font-size: 0.4rem;
            }
        }
    }
}
</style>