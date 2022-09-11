<template>
    <div class="mBody">
        <div>
            <div class="msubtitle">
                <div class="title-box">
                    <div class="moduleTitle">{{itemMsg.name}}</div>
                    <div class="moduleInstr">{{itemMsg.instruction}}</div>
                </div>
                <div class="more" @click="onclickMore">
                    <div>
                        <van-icon name="more-o" size="25" />
                    </div>
                    <div>更多</div>
                </div>
            </div>

            <div v-if="isGrid">
                <van-row gutter="10" style="width:95%;margin:0 2.5%">
                    <template v-for="(itemData, index) in videos">
                        <van-col :span="colunmSpan(index)" :key="index" class="col">
                            <img-item :imageLocation="imageLocation" :imgData="itemData" :showTitle="showTitle" :large="isLarge(index)" :imgWidth="colunmWidth" :imgHeight="getHeight(index)" />
                        </van-col>
                    </template>
                </van-row>
            </div>
            <div v-else class="horizontalBox swiper-no-swiping">
                <div class="horizontalBoxIn" :style="`width:${scrollWidth}`">
                    <template v-for="(itemData, index) in videos">
                        <img-item :imageLocation="imageLocation" :key="index" :imgData="itemData" :showTitle="showTitle" :imgWidth="colunmWidth" :imgHeight="rowHeight" :style="`margin-right:${scrollItemMargin}px`" />
                    </template>
                </div>
            </div>
            <div class="bottomBtns" v-if="showBtns">
                <div class="toMore" @click="onClickToMore">
                    <van-icon name="play-circle-o" size="18" style="margin-right:8px;" />
                    <span>更多</span>
                </div>
                <div class="change" @click="onClickChange">
                    <van-icon size="18" name="exchange" style="margin-right:8px;" />
                    <span>换一换</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script> 
import ImgItem from '~/components/imgitem';
let fixScaleW = 18 / 11;
let fixScaleH = 13 / 20;
export default {
    name: "BoxItem",
    components: { ImgItem },
    props: {
        itemMsg: Object,
        // 1.box 视频格子模式 2.cover 封面模式
        contentLayoutType: {
            type: [String],
            default: 'box',
        },
        // options: {
        //     type: Object,
        //     default: {
        //         firstLarge: true,
        //         showMode: 'horizontal',
        //          imageLocation: '0'      //0显示封面右边 1 左边
        //         row: null,                             // 行 为1 表示横向滚动 ，firstLarge 、设置无效
        //         colunm: 2,                          // 列 为1 表示为单列全大图模式
        //         colunmWidth: null,                        // 没设置则使用默认
        //         rowHeight: null,                           // 没设置则使用默认,
        //         showBtns: false
        //     }
        // }
    },
    computed: {
        isGrid() {
            if (this.showMode == "horizontal") {
                return this.colunm > 2 ? false : true;
            }
            else {
                return this.colunm > 3 ? false : true;
            }
        },
        scrollWidth() {
            let count = this.videos.length < this.colunm ? this.videos.length : this.colunm;
            //(每项的宽度+边距)*列数
            return (parseInt(this.colunmWidth) + this.scrollItemMargin) * count + "px";
        }
    },
    data() {
        let pageSize = 5;
        let showMode = "horizontal";
        let imageLocation = "right";
        let firstLarge = true;
        let colunm = null;
        let colunmWidth = null;
        let rowHeight = null;
        let showBtns = true;
        let row = null;
        let showTitle = true;
        if (this.itemMsg.props) {
            firstLarge = !!this.itemMsg.props.firstLarge;
            if (this.itemMsg.props.showMode) {
                showMode = this.itemMsg.props.showMode;
            }
            imageLocation = this.itemMsg.props.imageLocation || "right";
            colunm = this.itemMsg.props.colunm;
            colunmWidth = this.itemMsg.props.colunmWidth;
            rowHeight = this.itemMsg.props.rowHeight;
            showBtns = this.itemMsg.props.showBtns || false;
            row = this.itemMsg.props.row;
            showTitle = this.itemMsg.props.showTitle === false ? false : true;
        }
        // row = 1;
        let boxWidth = (document.documentElement.clientWidth || document.body.clientWidth) * 0.95;
        if (showMode === "horizontal") {
            // 横向
            pageSize = 4;
            colunm = colunm ? colunm : 2;
            if (rowHeight && !colunmWidth) {
                colunmWidth = rowHeight * fixScaleW;
            }
            else if (!rowHeight && colunmWidth) {
                rowHeight = colunmWidth / fixScaleW;
            }
            else if (!rowHeight && !colunmWidth) {
                rowHeight = 110;
                colunmWidth = 180;
                if (colunm == 1) {
                    rowHeight = boxWidth / fixScaleW;
                }
            }
            if (colunm > 2) {
                firstLarge = false;
            }
            if (colunm <= 2) {
                colunmWidth = '100%';
            }

        } else {
            // 竖向
            pageSize = 6;
            colunm = colunm ? colunm : 3;
            if (rowHeight && !colunmWidth) {
                colunmWidth = rowHeight * fixScaleH;
            }
            else if (!rowHeight && colunmWidth) {
                rowHeight = colunmWidth / fixScaleH;
            }
            else if (!rowHeight && !colunmWidth) {
                rowHeight = 180;
                colunmWidth = 117;
                if (colunm == 1) {
                    rowHeight = boxWidth / fixScaleH;
                }
            }
            if (colunm > 3) {
                firstLarge = false;
            }
            if (colunm <= 3) {
                colunmWidth = '100%';
            }
        }
        if (colunm && row) {
            pageSize = colunm * row;
        }
        if (firstLarge) {
            pageSize = pageSize + 1;
        }

        rowHeight = rowHeight.toString();
        colunmWidth = colunmWidth.toString();
        if (!rowHeight.includes("%")) {
            rowHeight = rowHeight + "px";
        }
        if (!colunmWidth.includes("%")) {
            colunmWidth = colunmWidth + "px";
        }
        return {
            curPage: 1,
            pageSize: pageSize,
            bLoading: false,
            bFinished: false,
            videos: this.itemMsg.videos ? [...this.itemMsg.videos] : [],
            firstLarge: firstLarge,
            showMode: showMode,
            imageLocation: imageLocation,
            colunm: colunm,
            colunmWidth: colunmWidth,
            rowHeight: rowHeight,
            showBtns: showBtns,
            row: row,
            showTitle: showTitle,
            scrollItemMargin: 10,
            layout: this.contentLayoutType,
        };
    },

    created() {
        // if (this.row && this.colunm && this.row != 1) {
        //     let total=this.row * this.colunm
        //     this.videos = this.videos.slice(0, this.row * this.colunm;
        // }
    },
    methods: {
        isLarge(index) {
            if (index == 0 && this.firstLarge) return true;
            if (this.colunm === 1) return true;
            return false;
        },
        getHeight(index) {
            let largeHeight = this.$env.device.mobile() ? '54vw' : '246px';
            return this.isLarge(index) ? largeHeight : this.rowHeight;
        },
        colunmSpan(index) {
            if (this.isLarge(index)) return 24;
            return 24 / this.colunm;
        },
        onClickToMore() {
            this.$router.push({
                path: "/home/moduleList",
                query: {
                    moid: this.itemMsg.id
                }
            });
        },
        async onClickChange() {
            let videosTemp = this.videos;
            this.videos = this.videos.map(i => {
                return { ...i, base64ImgData: '' };
            });
            if (this.videos.length == this.pageSize) {
                this.curPage++;
            }
            else {
                this.$toast("没有更多了");
                this.curPage = 1;
            }
            let res = await this.$api.getSecondCategoriesData(this.itemMsg.id, { timeType: 1, compositeSort: 1, page: this.curPage, pageSize: this.pageSize, inPool: true });
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错: " + res.message);
                this.videos = videosTemp;
                return;
            }
            let tdata = res.data.videos;
            if (!tdata || tdata.length == 0) {
                this.$toast("没有更多了");
                this.videos = videosTemp;
                return;
            }
            this.$nextTick(() => {
                this.videos = tdata;
            });

        },
        onclickMore() {
            this.$router.push({
                path: "/home/moduleList",
                query: {
                    moid: this.itemMsg.id
                }
            });
        },
    }
}
</script> 
<style lang="less" scoped>
.mBody {
    border-bottom: 10px solid #00000021;
    .msubtitle {
        .title-box {
            margin-top: 6px;
            margin-bottom: 3px;
            max-width: 85%;
            line-height: 30px;
        }
        .moduleTitle {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.45rem;
        }
        .moduleInstr {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 20px;
            color: @home-font-color6;
            font-size: 0.28rem;
        }
    }
}
.bottomBtns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.35rem;
    color: @text-color;
    padding: 0.2rem 0.2rem;

    .van-icon {
        color: @theme-color2;
    }
}
.bottomBtns div img {
    width: 0.6rem;
    padding-right: 0.2rem;
}
.toMore {
    display: flex;
    align-items: center;
    width: 49%;
    height: 1.1rem;
    justify-content: center;
    background: @common-btnBG-color1;
    border-radius: @box-border-radius;
    color: @theme-color2;
    cursor: pointer;
}
.change {
    display: flex;
    align-items: center;
    width: 49%;
    height: 1.1rem;
    justify-content: center;
    background: @common-btnBG-color1;
    border-radius: @box-border-radius;
    color: @theme-color2;
    cursor: pointer;
}
.col {
    display: flex;
    justify-content: center;
}
.horizontalBox {
    width: 100%;
    overflow-x: auto;

    .horizontalBoxIn {
        box-sizing: content-box;
        padding-left: 10px;
        display: flex;
    }
}
</style>