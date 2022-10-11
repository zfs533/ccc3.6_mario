<template>
    <div class="flex-container">
        <div class="top">
            <div class="findTop">
                <div class="findTL">
                    <div @click="onClickBack" alt class="back">
                        <van-icon name="arrow-left" size="28" />
                    </div>
                </div>
                <div class="findTC">
                    <van-search v-model="searchValue" @search="onSearch" class="msearchbox" background="transparent" shape="round" placeholder="请输入搜索关键词" @cancel="searchValue=''" />
                </div>
                <div class="findTR" @click="onSearch(searchValue)"> 搜索 </div>
            </div>
        </div>
        <div class="content">
            <div class="hot-input full-container" v-if="showHot">
                <div class="history-words" v-if="historyWords.length>0">
                    <h3>
                        <van-icon name="underway" class="hot-icon" />搜索历史
                    </h3>
                    <van-row gutter="10">
                        <van-col span="6" v-for="(item,index) in historyWords" :key="index">
                            <div class="words-item" @click="onSearch(item)">{{item}}</div>
                        </van-col>
                    </van-row>
                </div>
                <div class="hot-words" v-if="hotWords.length>0">
                    <h3>
                        <van-icon name="fire" color="#ee0a24" size="20" class="hot-icon" />热搜词
                    </h3>
                    <van-row gutter="10">
                        <van-col span="6" v-for="(item,index) in hotWords" :key="index">
                            <div class="words-item" @click="onSearch(item)">{{item}}</div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="tabBox full-container" v-else>
                <van-tabs v-model="tabIndex" class="mvantabs scroll-container" @click="onClickTab">
                    <van-tab class="mvantab" title="视频">
                        <div class="firstTabbts">
                            <btn-list-box :callBack="onClcikVideoTypeBt" />
                            <van-popover class="mpopover" :offset="offsetNumber" placement="bottom-end" :immediate-check="false" v-model="showPopover" trigger="click" :actions="shortTypes" @select="onSelect" @opened="onOpenSort">
                                <template #reference>
                                    <div class="selectTitle">
                                        <span class="selectText">{{shortTypes[sortType - 1].text}}</span>
                                        <van-icon name="sort" size="16" />
                                    </div>
                                </template>
                            </van-popover>
                        </div>
                        <list-box ref="videoList" :waterfall="true" :showAvatar="true" @load="onVideoListLoad" @clear="onVideoListClear" />
                    </van-tab>
                    <van-tab class="mvantab" title="UP主">
                        <van-pull-refresh v-model="mUpRefreshing" @refresh="onUpRefresh">
                            <van-list v-model="mUpLoading" :finished="mUpFinished" finished-text="没有更多了" @load="onLoadUpsData" style="min-height:80vh">
                                <div v-for="(data, index) in allUpData" :key="index">
                                    <anchoritem :userData=data />
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script> 

import { pageMixin } from "~/assets/js/mixins";
import Anchoritem from '~/components/anchoritem.vue';
import btnListBox from '~/components/btnListBox.vue';

export default {
    name: "search",
    layout: "keepalive",
    components: { btnListBox, Anchoritem },
    mixins: [pageMixin],
    data() {
        return {
            showHot: true,
            historyWords: [],
            hotWords: ['美女', '巨乳', '奶子', '帅哥'],
            mUpLoading: false,
            mUpFinished: false,
            mUpRefreshing: false,
            offsetNumber: [0, 8],
            allUpData: [],
            allData: [],
            curVideoPage: 1,
            curUpPage: 1,
            mpageSize: 10,

            searchValue: "",
            tabIndex: 0,
            showPopover: false,
            videoType: 1,
            searchType: 1,   // video=1     Anchor=2
            sortType: 1,
            shortTypes: [{ text: '综合', className: 'active-sort' }, { text: '播放最多', className: '' }, { text: '收藏最多', className: '' }, { text: '最新视频', className: '' }]
        };
    },
    watch: {
        searchValue(val) {
            if (val == '') {
                this.showHot = true;
            }
        }
    },
    created() {
        console.log("search created");

    },
    mounted() {
        console.log("search mounted");
        this.$parent.showTabbar = false;

        if (document.documentElement.clientWidth > 1000) {
            this.offsetNumber = [600, 10];
        }
    },
    activated() {
        console.log("search activated");
        this.hotWords = this.$main.getHotSearchWords();
        this.historyWords = this.$storage.getArray('historyWords');
        // if (this.historyWords.length == 0 && this.hotWords.length == 0) {
        //     this.showHot = true;
        // }
        this.$parent.showTabbar = false;
        this.$nextTick(() => {

            if (this.$refs.videoList && !this.$refs.videoList.hasItem()) {
                this.$refs.videoList.clearData();
                this.$refs.videoList.check();
            }
        });

    },

    deactivated() {
    },
    methods: {
        onClickTab(name, titile) {
            this.searchType = +name + 1;
        },
        onClcikVideoTypeBt(videoType) {
            this.videoType = +videoType + 1;
            this.curVideoPage = 1;
            this.$nextTick(() => {

                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                };
            });
        },
        onClickBack() {
            this.searchValue = "";
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                }
            });
            this.$router.back();
        },
        onSelect(action) {
            this.curVideoPage = 1;
            for (let i = 0; i < this.shortTypes.length; i++) {
                const el = this.shortTypes[i];
                if (el.text == action.text) {
                    el.className = 'active-sort';
                    this.sortType = i + 1;
                } else {
                    el.className = '';
                }
            }
            this.$nextTick(() => {
                if (this.$refs.videoList) {
                    this.$refs.videoList.clearData();
                    this.$refs.videoList.check();
                }
            });
        },
        onOpenSort() {
            document.querySelector(".active-sort").click();
        },
        onSearch(key) {
            if (!key) {
                this.$toast("搜索内容不能为空");
                return;
            }
            this.searchValue = key.trim();

            if (this.searchValue.startsWith("__go:")) {
                let url = this.searchValue.replace("__go:", "");
                if (url.startsWith("http")) {
                    window.location = url;
                }
                return;
            }

            let newWords = [...this.historyWords];
            let index = this.historyWords.findIndex(i => i === this.searchValue);
            if (index >= 0) {
                newWords[0] = newWords.splice(index, 1, newWords[0])[0];
            }
            else {
                newWords.unshift(this.searchValue);
                if (newWords.length > 4) {
                    newWords.pop();
                }
            }
            this.$storage.set('historyWords', newWords);
            this.curVideoPage = 1;
            this.curUpPage = 1;
            if (this.searchType == 2) {
                this.allUpData = [];
                this.onLoadUpsData();  // 搜索主播
            } else {
                this.$nextTick(() => {
                    if (this.$refs.videoList) {
                        this.$refs.videoList.clearData();
                        this.$refs.videoList.check();
                    };
                });
            }
            this.showHot = false;
        },

        onUpRefresh() {
            this.mUpLoading = true;
            this.mUpFinished = false;
            this.onLoadUpsData();
            this.mUpLoading = false;
            this.mUpRefreshing = false;
        },
        async onLoadUpsData() {
            if (this.mUpRefreshing) {
                this.allUpData = [];
                this.curUpPage = 1;
                this.mUpRefreshing = false;
                // return;
            }
            if (this.searchValue == "") {
                this.mUpLoading = false;
                this.mUpFinished = true;
                return;
            }
            let pa = {
                pid: this.$env.pid,
                type: this.searchType, // video=1     Anchor=2
                keyword: this.searchValue,
                page: this.curUpPage,
                pageSize: this.mpageSize,
                timeType: 1,
                compositeSort: 1
            };
            let res = await this.$api.searchUpOrVideo(pa);

            if (res.errorCode !== 0) {
                this.$toast("数据请求出错：" + res.message);
                this.mUpFinished = true;
                return;
            }
            this.mUpLoading = false;
            let tdata = res.data.users;
            this.curUpPage++;
            if (tdata && tdata.length > 0) {
                this.allUpData = this.allUpData.concat(tdata);
                if (tdata.length < this.mpageSize) {
                    this.mUpFinished = true;
                }
            } else if (tdata && tdata.length == 0) {
                this.mUpFinished = true;
            }
            else if (!tdata || tdata.error) {
                this.mUpFinished = true;
            }
        },
        onVideoListClear() {
            this.curVideoPage = 1;
        },
        async onVideoListLoad() {
            let searchValue = this.searchValue.trim();
            if (searchValue == "") {
                return;
            }

            let pa = {
                pid: this.$env.pid,
                type: this.searchType, // video=1     Anchor=2
                keyword: searchValue,
                page: this.curVideoPage,
                pageSize: this.mpageSize,
                timeType: this.videoType,
                compositeSort: this.sortType,
            };
            let res = await this.$api.searchUpOrVideo(pa);
            this.$nextTick(() => {
                if (!this.$refs.videoList) {
                    return;
                }
                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                let videos = res.data.videos;
                if (!videos) {
                    this.$refs.videoList.finished();
                }
                if (videos.length > 0) {
                    if (this.$refs.videoList) {
                        this.$refs.videoList.concatData(videos);
                    }
                    if (videos.length < this.mpageSize) {
                        this.$refs.videoList.finished();
                    }
                } else if (videos.length == 0) {
                    this.$refs.videoList.finished();
                }
                this.curVideoPage++;
            });
        },
    },
}
</script>

<style lang="less" scoped>
.hot-input {
    margin: 0.5rem 0;
    color: @theme-color2;
    padding: 0 20px;
    & > div {
        margin-bottom: 0.5rem;
    }
    h3 {
        margin: 0;
        padding: 0;
        font-size: 0.4rem;
        height: 0.6rem;
        display: flex;
        align-items: center;
        width: 100%;
    }
    .hot-icon {
        margin-right: 10px;
    }
    .words-item {
        font-size: 0.3rem;
        width: 100%;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px @search-bg-color1;
        border-radius: 8px;
        margin-top: 20px;
    }
}
.hot-words {
    .words-item {
        background: @search-bg-color3;
        color: @search-font-color1;
        border: none;
    }
}
.tabBox .van-tabs__line {
    background-color: rgb(30, 65, 255);
    width: 0.4rem;
    transform: translateX(38px) translateX(-50%);
    height: 0.05rem;
    border-radius: 0.03rem;
    transition-duration: 0.3s;
}
.findTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
}
.findTL {
    text-align: left;
    cursor: pointer;
    padding: 0 5px;
}
.findTC {
    text-align: center;
    font-size: 0.35rem;
    flex: 1;
    margin: 0 0.1rem 0 0.15rem;
    padding-left: 0.15rem;
    display: flex;
    align-items: center;
    /* height: 0.34rem; */
    border-radius: 0.5rem;
}
.findTR {
    text-align: right;
    color: @text-color;
    font-size: 0.35rem;
    cursor: pointer;
    margin-right: 20px;
}
.msearchbox {
    width: 100%;
    /* height: 0.75rem; */
}
.back {
    width: 0.3rem;
    margin-bottom: 0.1rem;
    color: @theme-color2;
}
.van-cell {
    color: @common-inputText-color1 !important;
}
.van-field__control {
    color: @common-inputText-color1 !important;
}
.van-search__content {
    background-color: @common-inputBG-color1 !important;
}
.mvantabs {
    width: 100%;
    margin: auto;
}
.mvantab {
    /* display: flex; */
    /* justify-content: space-between; */
    padding: 0 2.5%;
    align-items: center;
}
.firstTabbts {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.selectText {
    color: @active-color;
    font-size: 0.4rem;
    padding-right: 0.1rem;
}
.selectTitle {
    display: flex;
    align-items: center;
    .van-icon {
        color: @active-color;
    }
}
</style>
