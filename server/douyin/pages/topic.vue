<template>
    <section class="topic flex-container" @dragstart.prevent>
        <div v-if="topicCategories && topicCategories.length > 0 " class="top topictabbox">
            <van-nav-bar v-if="topicCategories.length == 1" :title="topicCategories[0].name" style=" width: 100%;" :placeholder="true">
            </van-nav-bar>

            <van-tabs v-else :shrink="true" :border="true" :stop-propagation="false" v-model="curTabIndex" style=" width: 100%;" @click="onClickTab">
                <van-tab class="topicvantab" v-for="(topCategor, index) in topicCategories" :key="index" :title="topCategor.name">
                </van-tab>
            </van-tabs>
        </div>
        <div class="content mt-10">
            <swiper ref="mySwiper" class="mySwiper full-container" :options="swiperOption" @slideChange="onChange">
                <swiper-slide v-for="(topCategor, idx) in topicCategories" :key="idx " class="swiper-view">
                    <div class="scroll-container">
                        <van-pull-refresh v-model="topCategor.pLoading" @refresh="()=>{ onRefresh(topCategor)}" style="min-height:100%">
                            <van-list v-model="topCategor.loading" :finished="topCategor.finished" finished-text="已经到我的底线啦" @load="onLoadModuleData(topCategor)">
                                <div v-for="(data, index1) in topCategor.childCategories" :key="index1">
                                    <topic-item :imgData="data" />
                                </div>
                            </van-list>
                            <template #loading>
                                <span />
                            </template>
                        </van-pull-refresh>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

    </section>
</template>

<script> 
import { AppResImgCodes } from "~/assets/js/constants";
import { pageMixin } from "~/assets/js/mixins";
import { defaultRes } from "~/assets/js/constants";
import TopicItem from '~/components/topicItem';

export default {
    name: "topic",
    layout: "keepalive",
    components: { TopicItem },
    mixins: [pageMixin],
    data() {
        return {
            topicCategories: [],
            curTabIndex: 0,
            defaultPageSize: 5,
            randomMidAd: undefined,
            swiperOption: {
                // autoHeight: true
            },

        };
    },
    async created() {
        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.add("safe-bottom");
        this.$parent.initTheme(AppResImgCodes.topicPageBg);

        let topicCategories = this.$main.getTopicData();
        if (topicCategories) {
            topicCategories.forEach((el, index) => {
                this.topicCategories.push({
                    mapIndex: index,
                    id: el.id,
                    layout: 'cover',
                    name: el.name,
                    childCategories: [],
                    page: 1,
                    pageSize: this.defaultPageSize,
                    loading: false,
                    finished: false,
                    pLoading: false
                });
            });
        }
    },

    async mounted() {
        this.$parent.showTabbar = true;
    },
    activated() {
        this.$parent.showTabbar = true;
        this.$parent.initTheme(AppResImgCodes.topicPageBg);
        this.$nextTick(() => {
            if (this.$refs.mySwiper) {
                this.$refs.mySwiper.$swiper.slideTo(this.curTabIndex, 0);
            }
        });
    },
    methods: {
        async onRefresh(topCategor) {
            topCategor.page = 0;
            topCategor.pLoading = true;
            topCategor.finished = false;
            topCategor.loading = true;
            this.onLoadModuleData(topCategor).then(() => {
                this.$toast('刷新成功');
                topCategor.loading = false;
                topCategor.finished = false;
                topCategor.pLoading = false;
            });
        },

        onChange() {
            this.$nextTick(() => {
                if (this.$refs.mySwiper) {
                    this.curTabIndex = this.$refs.mySwiper.$swiper.activeIndex;
                }
            });
        },
        async onClickTab(index, title) {
            let cate = this.topicCategories[index - 1];
            if (cate) {
                if (cate.childCategories.length > 0) { }
            }
            this.curTabIndex = index;
            this.$nextTick(() => {
                if (this.$refs.mySwiper) {
                    this.$refs.mySwiper.$swiper.slideTo(index);
                }
            });
        },
        async onLoadModuleData(topCategor) {
            let curPageData = [];
            if (topCategor.page == 1) {
                let topCategories = this.$main.getTopicData();
                if (topCategories) {
                    curPageData = topCategories[topCategor.mapIndex].childCategories || [];
                }
            }
            if (topCategor.page == 0) {
                topCategor.childCategories = [];
                topCategor.page = 1;

            }
            // 如果没有预存的第一页，则从第一页加载
            if (curPageData.length === 0) {
                let paramdata = {
                    pid: this.$env.pid,
                    page: topCategor.page,
                    pageSize: topCategor.pageSize,
                    hasTop: false
                };

                let res = await this.$api.getFristCategoriesData(topCategor.id, paramdata);
                if (res.errorCode !== 0) {
                    this.$toast("数据请求出错：" + res.message);
                    return;
                }
                curPageData = res.data.childCategories || [];
            }
            if (curPageData && curPageData.length > 0) {
                topCategor.childCategories = topCategor.childCategories.concat(
                    curPageData
                );
            }
            if (curPageData && curPageData.length > 0) {
                if (curPageData.length < topCategor.pageSize) {
                    topCategor.finished = true;
                }
            } else if (curPageData && curPageData.length == 0) {
                topCategor.finished = true;
            } else if (!curPageData || curPageData.error) {
                topCategor.finished = true;
            }
            topCategor.loading = false;
            topCategor.page = topCategor.page + 1;
        },
    },


    beforeDestroy() { },
};
</script>

<style lang="less">
.topic {
    .van-nav-bar {
        background: transparent !important;
    }
}
</style>
<style lang="less" scoped>
.topictabbox {
    padding-left: 8px;
    padding-right: 8px;
}
.topicvantab {
    z-index: 1000;
    color: rgb(232, 178, 118);
}
</style>