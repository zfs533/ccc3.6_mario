<template>
    <div class="adminHome">
        <el-card>
            <el-form :inline="true" class="demo-form-inline" v-if="pidList.length > 1 || !dataAuth">
                <el-form-item label="日期" v-if="!dataAuth">
                    <el-date-picker v-model="search.sumDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="display:flex;justify-content:space-between;align-items:center">
                <h4>今日数据</h4>
                <div>
                    <el-button class="dashboard-winLoseButton" type="primary" size="mini" icon="el-icon-refresh" @click="searchDataTotal">刷新</el-button>
                </div>
            </div>
            <el-descriptions direction="vertical" :column="dataAuth == true ? 3 : 8" border>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="总充值">
                    {{ formObj.totalChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="vip充值">
                    {{ formObj.vipChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="钻石充值">
                    {{ formObj.diamondChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="vip订单数">
                    {{ formObj.vipChargeCount }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="钻石订单数">
                    {{ formObj.diamondChargeCount }}</el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="登陆人数">{{ formObj.loginUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title1" label="观影人数">{{ formObj.watchUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="新增人数">{{ formObj.newUserCount }}
                </el-descriptions-item>

                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="安卓">
                    {{ formObj.androidTotalChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="安卓">
                    {{ formObj.androidVipChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="安卓">
                    {{ formObj.androidDiamondChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="安卓">
                    {{ formObj.androidVipChargeCount }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="安卓">
                    {{ formObj.androidDiamondChargeCount }}</el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidLoginUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title1" label="安卓">{{ formObj.androidWatchUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidNewUserCount }}
                </el-descriptions-item>

                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="ios">
                    {{ formObj.iosTotalChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="ios">
                    {{ formObj.iosVipChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="ios">
                    {{ formObj.iosDiamondChargeAmt }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title2" label="ios">
                    {{ formObj.iosVipChargeCount }}</el-descriptions-item>
                <el-descriptions-item v-if="!dataAuth" label-class-name="label_title1" label="ios">
                    {{ formObj.iosDiamondChargeCount }}</el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosLoginUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title1" label="ios">{{ formObj.iosWatchUserCount }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosNewUserCount }}
                </el-descriptions-item>
            </el-descriptions>
            <div style="display:flex;justify-content:space-between;align-items:center">
                <h4>24h走势图</h4>
                <div>
                    <el-button class="dashboard-winLoseButton" type="primary" size="mini" icon="el-icon-refresh" @click="searchData">刷新</el-button>
                </div>
            </div>
            <div style="display:flex">
                <lineRender id="trend_userCount" :height="'420px'" :datas="{ ...data_line_count, text: '用户图' }">
                </lineRender>
                <lineRender v-if="!dataAuth" id="trend_charge" :height="'420px'" :datas="{ ...data_line_charge, text: '充值图' }">
                </lineRender>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getPRealDayLines, getPRealDayStatics } from '@/api/home';
import { getSession } from '@/utils/auth';
import { pidList } from '@/utils/baseConst';
import { dataConfig, dataConfig_recharge } from '@/utils/home';
import lineRender from './lineRender.vue';
import { CURRENTPID } from '@/utils/myAsyncFn';

export default {
    components: {
        lineRender,
    },
    data() {
        return {
            formObj: {},
            search: { pid: pidList.length ? pidList[0].pid || "" : "" },
            formLine: [],
            data_line_count: {},
            data_line_charge: {},
            pidList: pidList,
            dataAuth: false
        };
    },
    created() {
        this.dataAuth = getSession("dataAuth");
        // console.log("dataAuth:", this.dataAuth);
        this.loadData();
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
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            if (!query.pid && pidList) {
                query = { pid: pidList[0].pid, sumDate: this.search.sumDate };
            }
            return query;
        },
        async loadInfo() {
            let query = { ...this.getQuery() };
            let res = await this.$http(getPRealDayStatics, query, true);
            if (res.code === 200) {
                this.formObj = res.msg ? res.msg : {};
            }
        },

        async initChart() {
            let query = { ...this.getQuery() };
            let res = await this.$http(getPRealDayLines, query, true);
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
                if (!this.dataAuth) {
                    xDatas2.push(item.graphDate);
                    dataConfig_recharge.forEach((value, idx) => {
                        if (!yDatas2[value.name]) yDatas2[value.name] = { arr: [] };
                        yDatas2[value.name].arr.push(item[value.key] ? item[value.key] : 0);
                        yDatas2[value.name].type = value.type;
                    });
                }
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
            if (!this.dataAuth) {
                let seriesData2 = [];
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