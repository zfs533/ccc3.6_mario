<template>
    <div class="adminHome">
        <el-card>
            <todayData :pid="pid"> </todayData>
        </el-card>
    </div>
</template>

<script>
import { gDaySum, gRealDayLine } from '@/api/home';
import LineMarker from '@/components/Charts/LineMarker.vue';
import { pidList } from '@/utils/baseConst';
import { dataConfig, dataConfig_recharge } from '@/utils/home';
import lineRender from './components/lineRender.vue';
import todayData from './components/todayData.vue';
import { CURRENTPID } from '@/utils/myAsyncFn';



export default {
    components: {
        lineRender,
        LineMarker,
        todayData,
    },





    data() {
        return {
            pid: CURRENTPID,
            formObj: {},

            pidList: pidList,

            activeName: '',

            formLine: [],
            data_line_count: {},
            data_line_charge: {},
        };
    },
    created() {
        this.loadData();
        this.pid = CURRENTPID;
    },

    mounted() {
    },

    methods: {

        searchDataTotal() {
            this.loadInfo();
        },

        searchData() {
            this.loadData();
        },
        async loadData() {

            this.loadInfo();
            this.initChart();
        },

        async loadInfo() {
            // let res = await this.$http(gDaySum, {}, true);
            // if (res.code === 200) {
            //     this.formObj = res.msg ? res.msg : {};
            // }
        },

        async initChart() {
            return;
            let res = await this.$http(gRealDayLine, {}, true);
            if (res.code === 200) {
                this.formLine = res.msg;
            }
            let xDatas1 = [];
            let yDatas1 = {};
            let legendData1 = [];

            let xDatas2 = [];
            let yDatas2 = {};
            let legendData2 = [];


            let seriesData = [];
            this.formLine.forEach(item => {
                xDatas1.push(item.graphDate);
                dataConfig.forEach((value, idx) => {
                    if (!yDatas1[value.name]) {
                        yDatas1[value.name] = [];
                    }
                    yDatas1[value.name].push(item[value.key] ? item[value.key] : 0);
                });
                xDatas2.push(item.graphDate);
                dataConfig_recharge.forEach((value, idx) => {
                    if (!yDatas2[value.name]) yDatas2[value.name] = { arr: [] };
                    yDatas2[value.name].arr.push(item[value.key] ? item[value.key] : 0);
                    yDatas2[value.name].type = value.type;
                });
            });
            for (let val in yDatas1) {
                let info = {
                    name: val,
                    type: "line",
                    smooth: true,
                    sampling: "average",
                    showSymbol: false,
                    showAllSymbol: false,
                    data: yDatas1[val]
                };
                seriesData.push(info);
                legendData1.push(val);
            }
            this.data_line_count = {
                xDatas: xDatas1,
                seriesData: seriesData,
                legendData: legendData1,
            };

            let seriesData2 = [];
            // this.formLine.forEach(item => {

            // });
            for (let val in yDatas2) {
                let info = {
                    name: val,
                    type: yDatas2[val].type,
                    smooth: true,
                    sampling: "average",
                    showSymbol: false,
                    data: yDatas2[val].arr,
                    yAxisIndex: yDatas2[val].type == "line" ? 0 : 1,
                };
                seriesData2.push(info);
                legendData2.push(val);
            }
            let yAxis = [{
                name: '单数',
                type: 'value',
            }, {
                name: '充值',
                type: 'value',
            }];
            this.data_line_charge = {
                xDatas: xDatas2,
                seriesData: seriesData2,
                yAxis: yAxis,
                legendData: legendData2,

            };





        }
    }
};
</script>

<style>
.adminHome .kuai {
    width: 200px;
}

.adminHome .label_title1 {
    color: #000000;
    background: #e1f3d8;
}

.adminHome .label_title2 {
    color: #000000;
    background: #e6ebf5;
}

/* .adminHome .todayBar {
    display: flex;
} */

/* .adminHome .todayBar:hover {
    color: cadetblue;
    transform: scale(1.4);
} */

.adminHome .part div {
    font-size: 16px;
    padding: 5px 10px;
}

.adminHome .gray {
    color: gray;
    font-size: 10px;
}
</style>