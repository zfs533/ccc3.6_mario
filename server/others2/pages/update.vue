<template>
    <div class="full-container" style="background: #000;">
        <div class="notify flex-container" v-show="showNotify">
            <div class="top">
                <div class="notifyBg img-notice-tips-spr img-notice-tips-spr-notify">
                    <h3>新版本更新</h3>
                </div>
            </div>
            <div class="content">
                <div class="notifyHtml">{{notify}}</div>
            </div>
            <div class="bottom">
                <div class="bottomBox">
                    <div style="margin: 20px 0;">
                        <van-progress v-if="install" :percentage="percentage"></van-progress>
                    </div>
                    <div class="btn" @click="onUpdateClick">{{install?'正在下载':'立即更新'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { pageMixin } from "~/assets/js/mixins";
export default {
    mixins: [pageMixin],
    data() {
        return {
            percentage: 0,
            install: false,
            curVersion: "",
            newVersion: "",
            showNotify: true,
            notify: ''
        };
    },
    created() {
        console.log("update created");
    },
    async mounted() {
        console.log("update mounted");

        let versionData = await this.$version.getInstalledApkVersion();

        if (versionData) {
            this.curVersion = versionData.version;
        }
        let newVersionData = this.$version.getServerApkVersion();
        this.newVersion = newVersionData.name;
        // newVersionData.note = "\
        // 1. swiper升级和切换优化  \n\
        // 2. 封面瀑布流 \n\
        // 3. 安卓更新错误优化与重试 \n\
        // 4. 签到 \n\
        // 5. 系统公告 \n\
        // 6. 更新功能弹窗优化 \n\
        // 7. vip兑换功能 \n\
        // 8. 新版分享送VIP推广设计 \n\
        // 9. 视频加载骨架屏 \n\
        // 10. 增加我的页面个人设置 \n\
        // 11. 增加使用兑换码 \n\
        // ";

        let str = `当前版本: ${this.curVersion} \n新版本: ${this.newVersion}\n\n`;
        this.notify = str + (newVersionData.note || '');
    },
    methods: {
        async onUpdateClick() {
            let hasNew = await this.$version.checkApkVersion();
            if (!hasNew) {
                return;
            }

            if (this.install) {
                return;
            }
            this.install = true;
            this.$version.updateApk(this.newVersion, ({ progress, bytes, bytesWritten }) => {
                this.percentage = progress;
            }, () => {
                // down ok
                this.$dialog.confirm({ title: "新版本", message: "新版本下载完成，点击确定进行安装" }).then(() => {
                    this.$version.installNewVersionApk();
                }).catch(() => {
                    // 取消会退出进程
                    navigator.app.exitApp();
                });
            }, (err) => {
                // error
                console.warn("updateApk err", err);
                this.$dialog.alert({ title: "下载更新出现错误: ", message: err.message }).then(() => {
                    // navigator.app.exitApp();
                    window.location.replace(window.location.origin + "?skipUpdate=true&from=" + window.from);
                });
            });
        }
    }
}
</script>

<style lang="less" scoped>
.notify {
    position: absolute;
    width: 297px;
    height: 380px;
    background-image: linear-gradient(0deg, #fff, #fde7c6);
    border-radius: 10px;
    left: 50%;
    top: 50%;
    margin: -200px 0 0 -149px;
    padding: 0px 28px;

    .top {
        height: 86px;
        margin-top: -44px;
    }
    .notifyBg {
        position: absolute;
        left: 0;
    }

    h3 {
        font-size: 24px;
        height: 42px;
        line-height: 42px;
        font-weight: normal;
        color: #fec767;
        text-align: center;
    }

    .notifyHtml {
        font-size: 14px;
        line-height: 20px;
        overflow-y: auto;
        overflow-x: hidden;
        color: #333;
        height: 260px;
        white-space: pre-wrap;
    }

    ::-webkit-scrollbar {
        display: block;
        background: #c8c4bf;
        border-radius: 2.5px;
    }

    ::-webkit-scrollbar-thumb {
        background: #f4ad3d;
    }

    .bottomBox {
        height: 90px;
        width: 100%;
    }

    .btn {
        background: #723204;
        background-image: linear-gradient(90deg, #ffe1b4, #e7b47c);
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: #723204;
        font-size: 18px;
        text-align: center;
        border-radius: 18px;
    }
}
</style>