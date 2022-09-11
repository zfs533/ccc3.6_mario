<template>
    <div :id="('div'+ id)" :style="{height:height,width:width}">

        <div :id="id" :class="className" :style="{height:'90%',width:'95%'}" />
        <div style="display:flex">
            <el-button class="dashboard-winLoseButton" type="primary" size="mini" @click="searchDataTotal">全选</el-button>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import resize from '@/components/Charts/mixins/resize';

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        datas: undefined,

        width: {
            type: String,
            default: '50%'
        },
        height: {
            type: String,
            default: '230px'
        }
    },
    watch: {
        datas(newVal) {
            this.lineData = newVal;
            this._xDatas = newVal.xDatas;
            this._seriesData = newVal.seriesData;
            this.initChart();

        }

    },
    data() {
        return {
            chart: null,
            _xDatas: [],
            _seriesData: [],
            lineData: this._xDatas || {},

            showAll: false,
        };
    },

    mounted() {
        this.chart = echarts.init(document.getElementById(this.id));
        this.initChart();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        async initChart() {
            if (!this._xDatas || this._xDatas.length == 0) {
                this._xDatas = [];
                this._seriesData = [];
                this.chart.clear();
            }
            this.chart.setOption({
                // backgroundColor: '#394056',
                title: {
                    text: (this.lineData && this.lineData.text) || "",
                },
                tooltip: {
                    trigger: 'axis',
                },

                legend: {
                    // padding: [550, 500],
                    y: 'bottom',
                    data: this.lineData.legendData,
                },
                dataZoom: [
                    // {
                    //     // type: 'slider',
                    //     show: true,
                    //     realtime: true,
                    //     start: 0,
                    //     end: 100,
                    //     bottom: 20,
                    //     dataZoomEnd: 100
                    // },
                    {
                        show: true,
                        type: 'inside',// 内置于坐标系中
                        start: 0,
                        end: 100,
                        xAxisIndex: [0]
                    },
                ],
                grid: {
                    // top: 60,
                    left: '3%',
                    right: '3%',
                    // bottom: 60,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        showMaxLabel: true
                    },
                    data: this._xDatas
                }],
                yAxis: this.lineData.yAxis || [{
                    type: 'value',
                }],
                series: this._seriesData,
            });

            this.chart.resize();
            // var selectArr = option.legend.data;
        },

        searchDataTotal() {
            let option = this.chart.getOption();

            let selectArr = option.legend[0].data;
            let obj = {};
            for (var key in selectArr) {
                obj[selectArr[key]] = this.showAll;
            }
            this.showAll = !this.showAll;
            option.legend[0].selected = obj;

            this.chart.setOption(option);
            this.chart.resize();

        },
    }
}
</script>
