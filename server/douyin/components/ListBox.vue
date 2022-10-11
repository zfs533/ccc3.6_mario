<template>
    <div :id="`list-${dataId}`">
        <van-pull-refresh v-model="pullRefreshing" @refresh="onPullRefresh">
            <van-list ref="listRef" v-model="list.loading" :finished="list.finished" :immediate-check="false" @load="onListLoad" finished-text="没有更多了" v-bind="$attrs">
                <van-row gutter="10">
                    <van-col :class="'column-box column-box-' + cindex" :span="24/columns" v-for="(columnData,cindex) in columnDatas" :key="cindex">
                        <img-item :imgData="data" v-for="(data, dindex) in columnData" :key="dindex" :showAvatar="data.showAvatar" imgWidth="100%" :imgHeight="waterfall?data.height+'px':'110px'" />
                    </van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import ImgItem from '~/components/imgitem';
export default {
    components: { ImgItem },
    props: {
        waterfall: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Number,
            default: 2
        },
        showAvatar: {
            type: Boolean,
            default: false
        },
    },
    data() {
        const columnDatas = {};
        const columnDeviationHeights = [];
        for (let index = 0; index < this.columns; index++) {
            columnDatas[index] = [];
            columnDeviationHeights[index] = 0;
        }
        return {
            dataId: Date.now(), // 防止网络延迟导致数据切换装载错误
            itemCount: 0,
            columnDatas: columnDatas,
            columnDeviationHeights: columnDeviationHeights,
            pullRefreshing: false,
            list: {
                loading: false,
                finished: false,
            }
        };
    },
    methods: {
        check() {
            console.log('listRef check');
            this.list.loading = false;
            this.list.finished = false;
            this.$refs.listRef.check();
        },
        onListLoad() {
            this.list.loading = true;
            this.$emit('load');
        },
        onPullRefresh() {
            this.pullRefreshing = true;
            this.clearData();
            this.$emit('load');
        },
        filterMin() {
            const min = Math.min.apply(null, this.columnDeviationHeights);
            return this.columnDeviationHeights.indexOf(min);
        },
        clearData() {
            console.log("listbox clearData");
            this.dataId = Date.now();
            this.itemCount = 0;
            this.list.loading = true;
            this.list.finished = false;
            for (const key in this.columnDatas) {
                this.columnDeviationHeights[key] = 0;
                if (this.columnDatas.hasOwnProperty(key)) {
                    const columnData = this.columnDatas[key];
                    if (columnData && columnData.length > 0) {
                        columnData.splice(0, columnData.length);
                    }
                }
            }
            this.$emit('clear');
        },
        concatAd() {
            let inVideoAds = this.$main.adManager.getInVideoAds();
            if (inVideoAds.length > 0) {
                let curAd = inVideoAds.shift();
                if (curAd) {
                    this.$fileloader.dowloadPngImg(curAd.coverUrl, 480, (url, data, imgWidth, imgHeight) => {
                        if (data) {
                            this.coverLoaded(curAd, url, data, imgWidth, imgHeight);
                        }
                    });
                    inVideoAds.push(curAd);
                }
            }
        },
        concatData(newVideoDatas) {
            if (!newVideoDatas) {
                return;
            }
            console.log("listbox concatData", newVideoDatas.length);
            let loadedCount = 0;

            for (const videoData of newVideoDatas) {
                if (!videoData) {
                    loadedCount++;
                    if (loadedCount === newVideoDatas.length) {
                        if (this.pullRefreshing) {
                            this.pullRefreshing = false;
                        }
                        if (this.list.loading) {
                            this.list.loading = false;
                        }
                    }
                    continue;
                }
                let dataId = this.dataId;
                this.$fileloader.dowloadJpegImg(videoData.coverURL, 480, (url, data, imgWidth, imgHeight) => {
                    if (data) {
                        if (this.dataId !== dataId) {
                            console.log("concatData error", this.dataId, dataId);
                            return;
                        }

                        this.coverLoaded(videoData, url, data, imgWidth, imgHeight);

                        loadedCount++;
                        this.itemCount++;

                        if (loadedCount === newVideoDatas.length) {
                            if (this.pullRefreshing) {
                                this.pullRefreshing = false;
                            }
                            if (this.list.loading) {
                                this.list.loading = false;
                            }
                        }

                        if ((this.itemCount + 1) % 8 === 0) {
                            this.concatAd();
                        }
                    }
                });
            }
        },
        finished() {
            console.log("listbox finished");
            this.pullRefreshing = false;
            this.list.loading = false;
            this.list.finished = true;
        },
        coverLoaded(videoData, url, data, imgWidth, imgHeight) {
            if (data) {
                videoData.coverWidth = imgWidth;
                videoData.coverHeight = imgHeight;
                videoData.coverURL = url;
                videoData.base64ImgData = data;
                videoData.showAvatar = this.showAvatar;
                if (!videoData.user) {
                    videoData.showAvatar = false;
                }

                this.$nextTick(() => {
                    if (!this.$refs.listRef) return;
                    let columnBox = document.querySelector(`#list-${this.dataId} .column-box`);
                    if (!columnBox) return;
                    let clientWidth = columnBox.clientWidth;
                    let scale = imgWidth ? (clientWidth / imgWidth) : 1;
                    let scaleImgHeight = (imgHeight || 0) * scale;

                    let minIndex = this.filterMin();
                    videoData.height = scaleImgHeight;


                    this.columnDatas[minIndex].push(videoData);
                    this.columnDeviationHeights[minIndex] += scaleImgHeight;

                });
            }
        },
        count() {
            return this.itemCount;
        },
        hasItem() {
            return this.itemCount > 0;
        }
    }
}
</script>
<style lang="less" scoped>
</style>