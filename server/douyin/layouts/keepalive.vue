<template >
    <div id="app" class="flex-container">
        <div class="content">
            <nuxt-child keep-alive :keep-alive-props="props">
            </nuxt-child>
        </div>
        <div class="bottom toobar" v-show="showTabbar">
            <van-tabbar class="tabbar" :border="false" :fixed="false" route style="height: 50px">
                <van-tabbar-item v-for="tab of tabs" :to="tab.path" :name="tab.name" :key="tab.name" replace @click="onTabClick(tab)">
                    <span>{{tab.title}}</span>
                    <template #icon="props">
                        <img :src="tabIcon(tab.name, props.active)" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
            <div class="flex-safe-bottom"></div>
        </div>
        <div>
            <div v-if="afterEnterAppAds && afterEnterAppAds.length > 0">
                <div v-for="(ad, index) in afterEnterAppAds" :key="index">
                    <van-popup v-model="showPopAd" v-if="curadIndex === index" :duration="0.5" :close-on-click-overlay="false" :lazy-render="true" :close-on-popstate="true" :closeable="false" :overlay="true" :transition="'van-fade'" :transition-appear="true" :overlay-style='{"background-color": "" }' :style='{"background-color": "transparent" }' @click-overlay="onClickCloseAd()">
                        <div class="ad-dialog" :style="{width: `${ad.width}vw`}">
                            <div class="ad">
                                <img :data-src="ad.coverUrl" :src="ad.base64ImgData" style="width: 100%; height: 100%; voerflow: hidden" @click="onClickAd(ad.url)" />
                            </div>
                            <van-icon name="close" size="46" @click="onClickCloseAd()" />
                        </div>
                    </van-popup>
                </div>
            </div>
            <van-popup v-model="showNotify" :duration="0.5" :close-on-click-overlay="false" :lazy-render="true" :close-on-popstate="true" :closeable="false" :overlay="true" :transition="'van-fade'" :transition-appear="true" :overlay-style='{"background-color": "" }' :style='{"background-color": "transparent" , width: "297px", height: "460px"}' @click-overlay="closeNotify()">
                <div class="notify flex-container">
                    <div class="top">
                        <div class="notifyBg img-notice-tips-spr img-notice-tips-spr-notify">
                            <h3>系统公告</h3>
                        </div>
                    </div>
                    <div class="content">
                        <div v-html="notifyContent" class="notifyHtml"></div>
                    </div>
                    <div class="bottom">
                        <div class="bottomBox">
                            <div class="btn" @click="closeNotify()">我知道了</div>
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    name: "keepalive",
    data() {
        return {
            tabs: [],
            eventData: {
                shortClickTimer: null,
                shortClickCounter: 0
            },
            showTabbar: false,
            props: {
                include: [
                    'home',
                    'feed',
                    "short",
                    "shortPlay",
                    "my",
                    "topic",
                    "vip",
                    "user",
                    "moduleList",
                    "historyList",
                    "filterPage",
                    "search",
                    "tag",
                    "promote"
                ]
            },
            notifyContent: "",
            showNotify: false,
            showPopAd: false,
            curadIndex: 0,
            afterEnterAppAds: []
        };
    },
    created() {
        console.log("keepalive created");
        if (this.$env.options.homePage.tabs && this.$env.options.homePage.tabs.length > 0) {
            this.tabs = this.$env.options.homePage.tabs;
        } else {
            this.tabs = [{
                "name": "home",
                "path": "/home",
                "title": "主页"
            },
            {
                "name": "short",
                "path": "/short",
                "title": "短视频"
            },
            {
                "name": "feed",
                "path": "/feed",
                "title": "发现"
            },
            {
                "name": "topic",
                "path": "/topic",
                "title": "专题"
            },
            {
                "name": "vip",
                "path": "/vip",
                "title": "会员"
            },
            {
                "name": "my",
                "path": "/my",
                "title": "我"
            }];
        }
    },
    async mounted() {
        console.log("keepalive mounted");

        this.afterEnterAppAds = [];
        let showAds = this.$main.adManager.getShowAds();
        if (!showAds) {
            let allAd = await this.$main.adManager.getAllAD();
            this.$nextTick(() => {
                for (let i = 0; i < allAd.afterEnterApp.length; i++) {
                    let item = allAd.afterEnterApp[i];
                    if (!item.width) item.width = 80;
                    this.$fileloader.dowloadPngImg(item.coverUrl, 640, (url, data) => {
                        if (!data) {
                            console.warn("afterEnterAppAds dowloadFile error: ", url);
                            return;
                        }
                        item.coverUrl = url;
                        item.base64ImgData = data;

                        this.afterEnterAppAds.push(item);
                    });
                };
                this.$main.adManager.setShowAds(!showAds);
            });
        }
        this.notifyContent = this.$main.getAnnouncement();
        if (this.notifyContent) {
            this.showNotify = true;
        }
    },
    methods: {
        closeNotify() {
            console.log("keepalive closeNotify");
            this.$nextTick(() => {
                this.showNotify = false;
                this.showPopAd = true;
            });
        },
        onClickCloseAd() {
            this.curadIndex++;
        },
        onClickAd(url) {
            window.open(url);
            this.curadIndex++;
        },
        tabIcon(name, active) {
            switch (name) {
                case "home":
                    return active ? require('~/assets/img/icons/icon-sy-xz.png') : require('~/assets/img/icons/icon-sy.png');
                case "short":
                    return active ? require('~/assets/img/icons/icon-dsp-xz.png') : require('~/assets/img/icons/icon-dsp.png');
                case "feed":
                    return active ? require('~/assets/img/icons/icon-feed-xz.png') : require('~/assets/img/icons/icon-feed.png');
                case "vip":
                    return active ? require('~/assets/img/icons/icon-hy-xz.png') : require('~/assets/img/icons/icon-hy.png');
                case "my":
                    return active ? require('~/assets/img/icons/icon-wd-xz.png') : require('~/assets/img/icons/icon-wd.png');
                case "topic":
                    return active ? require('~/assets/img/icons/icon-topic-xz.png') : require('~/assets/img/icons/icon-topic.png');
            }
        },
        onTabClick(tab) {
            if (tab.name === 'short') {
                this.eventData.shortClickCounter++;

                if (this.eventData.shortClickCounter == 1) {
                    this.eventData.shortClickTimer = setTimeout(() => {
                        this.eventData.shortClickCounter = 0;
                        //单击
                        // this.$toast("c");
                    }, 300);

                    return;
                }

                clearTimeout(this.eventData.shortClickTimer);
                this.eventData.shortClickCounter = 0;
                //双击
                this.$nuxt.$emit("refreshShort");
                console.log("emit refreshShort");
            }
        },
        updateDocumentBg(imgBase64) {
            document.documentElement.style.backgroundImage = `url(${imgBase64})`;
            document.documentElement.style.backgroundSize = 'contain';
            document.documentElement.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundColor = "transparent";
        },
        initTheme(resImgCode) {
            let pageBgInfo = this.$main.getPageBgResImg(resImgCode);
            if (pageBgInfo) {
                if (pageBgInfo.base64ImgData) {
                    this.updateDocumentBg(pageBgInfo.base64ImgData);
                } else {
                    this.$fileloader.dowloadPngImg(pageBgInfo.imgUrl, 640, (url, data) => {
                        if (!data) {
                            console.warn("videoPlay Ads dowloadFile error: ", url);
                            return;
                        }
                        pageBgInfo.coverUrl = url;
                        pageBgInfo.base64ImgData = data;
                    });
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
.toobar {
    height: 50px;

    img {
        height: 26px;
    }
    .flex-safe-bottom {
        height: var(--safe-bottom);
        position: fixed;
        width: 100%;
        background: @tabbar-background-color;
        bottom: 0;
    }
}

.van-tabbar-item {
    color: @home-font-color4;
}
.notify {
    position: absolute;
    z-index: 100;
    width: 297px;
    height: 350px;
    background-image: @keepalive-bg-color1;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    margin: -165px 0 0 -149px;
    padding: 0px 28px;

    .top {
        height: 86px;
        margin-top: -67px;
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
        color: @keepalive-font-color1;
        text-align: center;
    }

    .notifyHtml {
        font-size: 14px;
        line-height: 20px;
        overflow-y: auto;
        overflow-x: hidden;
        color: @theme-color1;
        white-space: pre-wrap;
    }

    ::-webkit-scrollbar {
        display: block;
        background: @keepalive-bg-color2;
        border-radius: 2.5px;
    }

    ::-webkit-scrollbar-thumb {
        background: @keepalive-bg-color3;
    }

    .bottomBox {
        height: 60px;
        padding: 10px 0px;
        width: 100%;
    }

    .btn {
        // background: #723204;
        background-image: @common-btnBG-color1;
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: @common-btnText-color1;
        font-size: 18px;
        text-align: center;
        border-radius: 18px;
    }
}

.ad-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ad {
        max-height: 90%;
        max-width: 95%;
    }
    .van-icon {
        color: #fff;
    }
}
</style>