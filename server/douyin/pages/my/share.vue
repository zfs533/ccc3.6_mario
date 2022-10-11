<template>
    <div class="my-share flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar class="headers" left-arrow @click-left="onClickLeft" title="分享推广" style="z-index: 1000; width: 100%" :placeholder="true"></van-nav-bar>
        </div>
        <div class="content">
            <div class="scrollView">
                <div class="upBox">
                    <div class="title img-share-spr img-share-spr-msz"></div>
                    <div class="downUrl">
                        <div class="leftBg img-share-spr img-share-spr-ta"></div>
                        <div class="url">记录美好性生活</div>
                        <div class="rightBg img-share-spr img-share-spr-ta"></div>
                    </div>
                    <div class="qrcodeBox" ref="imageDom">
                        <div class="leftCircle"></div>
                        <div class="rightCircle"></div>
                        <dl class="selfCode">
                            <dt>邀请码</dt>
                            <dd>{{selfInviteCode}}</dd>
                        </dl>
                        <div id="qrcode"></div>
                        <div class="infoText">
                            使用浏览器扫码或直接访问<br /><a @click="copyUrl">{{downloadUrl}}</a>
                        </div>
                    </div>
                    <div class="shareBtns">
                        <div class="btn" @click="downloadQrcode">保存二维码分享</div>
                        <div class="btn" @click="copyUrl">复制链接分享</div>
                    </div>
                </div>
                <div class="listBox">
                    <div class="line">
                        <div class="persons">邀请人数</div>
                        <div class="award">奖励</div>
                    </div>
                    <div class="line" v-for="(item,index) in inviteList" :key="index">
                        <div class="persons">{{item.persons}}人</div>
                        <div class="award">{{item.award}}天</div>
                    </div>
                </div>
                <div class="ruleText">
                    <em>邀请规则</em>
                    1.复制图片或链接邀请好友下载APP，报毒请忽略。<br />
                    2.邀请成功后，被邀请方也将免费获得 {{ invitedRewardVipDays }} 天VIP赠送
                </div>

                <div class="inviteBox">
                    <h3>邀请步骤</h3>
                    <div class="inviteBoxIn">
                        <div class="leftLine"></div>
                        <dl>
                            <dt>第一步</dt>
                            <dd class="circle"></dd>
                            <dd class="text">点击“保存二维码分享”或“复制链接分享”</dd>
                        </dl>
                        <dl>
                            <dt>第二步</dt>
                            <dd class="circle"></dd>
                            <dd class="text">将图片或链接通过各种渠道发送出去</dd>
                            <dd class="icons">
                                <div class="iconItem img-share-spr img-share-spr-qq"></div>
                                <div class="iconItem img-share-spr img-share-spr-wx"></div>
                                <div class="iconItem img-share-spr img-share-spr-tieba"></div>
                                <div class="iconItem img-share-spr img-share-spr-wb"></div>
                                <div class="iconItem img-share-spr img-share-spr-wyy"></div>
                                <div class="iconItem img-share-spr img-share-spr-xhs"></div>
                                <div class="iconItem img-share-spr img-share-spr-bili"></div>
                                <div class="iconItem img-share-spr img-share-spr-zh"></div>
                                <div class="iconItem img-share-spr img-share-spr-tg"></div>
                                <div class="iconItem img-share-spr img-share-spr-pt"></div>
                            </dd>
                            <dd class="text">等平时常用的社交软件</dd>
                            <dd class="icons">
                                <div class="iconItem img-share-spr img-share-spr-lol"></div>
                                <div class="iconItem img-share-spr img-share-spr-wz"></div>
                                <div class="iconItem img-share-spr img-share-spr-cj"></div>
                                <div class="iconItem img-share-spr img-share-spr-ys"></div>
                            </dd>
                            <dd class="text">等各类游戏的公共频道</dd>
                        </dl>
                        <dl>
                            <dt>第三步</dt>
                            <dd class="circle"></dd>
                            <dd class="text">被邀请用户下载并进入app中即生效，若自动绑定邀请码失败，可进入我的-设置页面手动填写邀请码</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div id="qrcodeDownload" style="width:0;height:0;overflow:hidden"></div>
        <div class="flex-safe-bottom"></div>
    </div>
</template>
<script>

import { pageMixin } from "~/assets/js/mixins";
import * as utils from "~/assets/js/utils";
const QRCode = require("~/assets/js/qrcode");

export default {
    name: "share",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            downloadUrl: '',
            selfInviteCode: '',
            inviteList: [],
            invitedRewardVipDays: 0,
        };
    },
    created() {
        let shareCfg = this.$main.getShareCfg();
        if (shareCfg) {
            this.invitedRewardVipDays = shareCfg.invitedRewardVipDays;
            if (shareCfg.inviteRewards) {
                for (const inviteReward of shareCfg.inviteRewards) {
                    this.inviteList.push({ persons: inviteReward.inviteCnt, award: inviteReward.inviteRewardVipDays });
                }
            }
        }
    },
    async mounted() {
        this.$parent.showTabbar = false;
        let userInfo = this.$userStore.getMyInfo();
        this.selfInviteCode = userInfo.selfInviteCode;
        this.downloadUrl = this.$storage.getString('officialDownloadUrl') + "/p?q=" + userInfo.uid;
        this.qrcodeObj = new QRCode('qrcode', {
            text: this.downloadUrl,
            width: 160,
            height: 160,
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
        onClickLeft() {
            this.$router.back();
        }
    }
}
</script>
<style lang="less" scoped>
dl,
dt,
dd,
h3 {
    padding: 0;
    margin: 0;
}
.headers {
    background: @common-color1;
}
.scrollView {
    flex: 1;
    overflow-y: auto;
    background: @common-color1;
}
.upBox {
    width: 80%;
    margin: 0 auto;
}
.title {
    margin: 0.2rem auto 0.25rem auto;
}
.downUrl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto 0.3rem auto;
    .url {
        color: @share-font-color1;
        font-size: 0.35rem;
        padding: 0 0.2rem;
        margin-top: -0.05rem;
    }
    .rightBg {
        transform: rotate(180deg);
    }
}
.qrcodeBox {
    width: 100%;
    border-radius: 0.5rem;
    border: solid 2px @share-border-color1;
    background: @theme-color2;
    background-image: @share-bg-color1;
    position: relative;
    .leftCircle,
    .rightCircle {
        width: 0.5rem;
        height: 1rem;
        border: solid 2px @share-border-color1;
        background-color: @common-color1;
        position: absolute;
        top: 2rem;
    }
    .leftCircle {
        border-radius: 0 0.5rem 0.5rem 0;
        border-left: none;
        left: -2px;
    }
    .rightCircle {
        border-radius: 0.5rem 0 0 0.5rem;
        right: -2px;
        border-right: none;
    }
    .selfCode {
        height: 2.5rem;
        border-bottom: dashed 2px @bottom-bar-color;
        color: @share-font-color2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        dt {
            font-size: 0.4rem;
            margin-bottom: 0.2rem;
        }
        dd {
            font-size: 0.8rem;
        }
    }
    #qrcode {
        width: 160px;
        height: 160px;
        margin: 0.35rem auto;
        padding: 8px;
        box-sizing: content-box;
        border: solid 2px @share-border-color2;
        background: @share-bg-color3;
    }
    .infoText {
        font-size: 0.35rem;
        padding: 0 20px 0.5rem 20px;
        word-break: break-all;
        line-height: 0.6rem;
        text-align: center;
        color: @share-font-color3;
    }
}
.shareBtns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    .btn {
        width: 130px;
        height: 32px;
        line-height: 32px;
        background-image: @common-btnBG-color1;
        color: @common-btnText-color1;
        border-radius: 16px;
        text-align: center;
        font-size: 0.35rem;
    }
}
.listBox {
    .line {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.35rem;
        color: @theme-color2;
        display: flex;
        justify-content: space-between;
        padding: 0 15%;
        &:nth-child(2n + 1) {
            background: @share-bg-color2;
        }
        & > div {
            width: 30%;
            text-align: center;
        }
    }
}
.ruleText {
    color: @theme-color2;
    font-size: 0.3rem;
    padding: 10px;
    padding-left: 40px;
    line-height: 0.6rem;
    em {
        font-style: normal;
        display: block;
        font-size: 0.4rem;
    }
}

.inviteBox {
    h3 {
        font-size: 0.5rem;
        padding-bottom: 0.5rem;
        padding-top: 0.3rem;
        color: @text-color;
    }
    padding-left: 10%;
    margin: 0 0.5rem 0.5rem 0.5rem;
    color: @text-color;
    background-color: @share-bg-color2;
    border-radius: 0.3rem;
    .inviteBoxIn {
        position: relative;
    }
    .leftLine {
        position: absolute;
        left: 0;
        top: 10px;
        bottom: 1.5rem;
        width: 1px;
        background-color: @share-bg-color4;
    }
    dl {
        position: relative;
        padding-left: 20px;
        padding-bottom: 0.3rem;
        .circle {
            position: absolute;
            left: -8px;
            top: 0.1rem;
            width: 0.4rem;
            height: 0.4rem;
            background-color: @share-bg-color4;
            border-radius: 50%;
        }
        dt {
            font-size: 0.45rem;
            position: relative;
            line-height: 0.6rem;
            margin-bottom: 0.2rem;
            // margin-top: -20px;
        }
        .text {
            font-size: 0.3rem;
            color: @theme-color2;
        }
        .icons {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;
            .iconItem {
                margin: 5px 6px;
            }
        }
    }
}

.flex-safe-top {
    height: var(--safe-top);
    position: fixed;
    width: 100%;
    background: @common-color1;
    top: 0;
}

.flex-safe-bottom {
    height: var(--safe-bottom);
    position: fixed;
    width: 100%;
    background: @common-color1;
    bottom: 0;
}
</style>