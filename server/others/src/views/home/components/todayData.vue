<template>
    <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <h4>今日数据</h4>
            <div>
                <el-button class="dashboard-winLoseButton" type="primary" size="mini" icon="el-icon-refresh" @click="searchDataTotal">刷新</el-button>
            </div>
        </div>
        <el-descriptions direction="vertical" :column="15" border>
            <el-descriptions-item label-class-name="label_title1" label="总充值">{{ formObj.totalChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="vip充值">{{ formObj.vipChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="钻石充值">{{ formObj.diamondChargeAmt}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="vip订单数">{{formObj.vipChargeCount || 0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="vip用户数(新/老)">{{(formObj.newUserVipChargeUserCount || 0)+"/"+(formObj.oldUserVipChargeUserCount || 0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="钻石订单数">{{ formObj.diamondChargeCount || 0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="钻石用户数(新/老)">{{(formObj.newUserDiamondChargeUserCount || 0) +"/"+(formObj.oldUserDiamondChargeUserCount||0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="登陆人数">{{ formObj.loginUserCount ||0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="观影人数(新/老)">{{ (formObj.watchUserCount ||0)+"/"+(formObj.newUserWatchUserCount||0)+"/"+(formObj.oldUserWatchUserCount||0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="新增人数">{{ formObj.newUserCount || 0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="落地页(PV/UV/DV)">{{ (formObj.guardVistCount || 0)+"/"+(formObj.guardUsersCount || 0)+"/"+(formObj.guardTotalDownCount || 0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="拉单数(成功/失败)">{{ (formObj.totalOrdersRechargeCount||0)+"/"+(formObj.totalRechargeCount||0)+"/"+(formObj.totalArriviedCount || 0)+"/"+((formObj.totalRechargeCount || 0)-(formObj.totalArriviedCount || 0))}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="支付成功率">{{ formObj.payRate||0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="新增付费率">{{ formObj.newUserPayRate }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="次日留存">{{formObj.retentionDay2}}</el-descriptions-item>

                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{ formObj.androidTotalChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidVipChargeAmt}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{ formObj.androidDiamondChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidVipChargeCount || 0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{ (formObj.androidNewUserVipChargeUserCount || 0)+"/"+(formObj.androidOldUserVipChargeUserCount || 0) }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidDiamondChargeCount || 0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{ (formObj.androidNewUserDiamondChargeUserCount || 0)+"/"+(formObj.androidOldUserDiamondChargeUserCount || 0) }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{ formObj.androidLoginUserCount || 0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{ (formObj.androidWatchUserCount || 0)+"/"+(formObj.androidNewUserWatchUserCount||0)+"/"+(formObj.androidOldUserWatchUserCount||0) }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{formObj.androidNewUserCount || 0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{(formObj.androidGuardVistCount || 0)+"/"+(formObj.androidGuardUsersCount||0)+"/"+(formObj.androidGuardTotalDownCount||0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{(formObj.androidTotalOrdersRechargeCount||0)+"/"+(formObj.androidTotalRechargeCount || 0)+"/"+(formObj.androidArriviedCount || 0)+"/"+((formObj.androidTotalRechargeCount || 0)-(formObj.androidArriviedCount || 0))}} </el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{formObj.androidPayRate||0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="安卓">{{formObj.androidNewUserPayRate}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="安卓">{{formObj.androidRetentionDay2}}</el-descriptions-item>

                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ formObj.iosTotalChargeAmt}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosVipChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ formObj.iosDiamondChargeAmt }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosVipChargeCount || 0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ (formObj.iosNewUserVipChargeUserCount || 0)+"/"+(formObj.iosOldUserVipChargeUserCount || 0) }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosDiamondChargeCount }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ (formObj.iosNewUserDiamondChargeUserCount || 0)+"/"+(formObj.iosOldUserDiamondChargeUserCount || 0) }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{formObj.iosLoginUserCount || 0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{(formObj.iosWatchUserCount || 0)+"/"+(formObj.iosNewUserWatchUserCount||0)+"/"+(formObj.iosOldUserWatchUserCount||0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosNewUserCount ||0}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{(formObj.iosGuardVistCount || 0)+"/"+(formObj.iosGuardUsersCount||0)+"/"+(formObj.iosGuardTotalDownCount||0)}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{(formObj.iosTotalOrdersRechargeCount||0)+"/"+(formObj.iosTotalRechargeCount || 0)+"/"+(formObj.iosArriviedCount || 0)+"/"+((formObj.iosTotalRechargeCount || 0)-(formObj.iosArriviedCount || 0))}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ formObj.iosPayRate||0 }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title2" label="ios">{{ formObj.iosNewUserPayRate }}</el-descriptions-item>
                        <el-descriptions-item label-class-name="label_title1" label="ios">{{ formObj.iosRetentionDay2 }}</el-descriptions-item>
        </el-descriptions>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <h4>24h走势图</h4>
            <div>
                <el-button class="dashboard-winLoseButton" type="primary" size="mini" icon="el-icon-refresh" @click="searchData">刷新</el-button>
            </div>
        </div>
        <!-- <LineMarker> </LineMarker> -->
        <div style="display:flex">
            <lineRender :id="('trend_userCount' + pid)" :height="'420px'" :datas="{...data_line_count, text:'用户图'}">
            </lineRender>
            <lineRender :id="('trend_charge' + pid )" :height="'420px'" :datas="{ ...data_line_charge, text:'充值图'}">
            </lineRender>

        </div>
    </div>
</template>

<script>
import { pDaySum, pRealDayLine } from '@/api/home';
import LineMarker from '@/components/Charts/LineMarker.vue';
import { dataConfig, dataConfig_recharge } from '@/utils/home';
import lineRender from './lineRender.vue';

export default {


    props: {
        pid: {
            type: String,
            default: 'chart'
        },
    },

    components: {
        lineRender,
        LineMarker,
    },



    data() {
        return {
            formObj: {},

            formLine: [],
            data_line_count: {},
            data_line_charge: {},
        };
    },
    created() {
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

        async loadInfo() {
            let res = await this.$http(pDaySum, { pid: this.pid }, true);
            if (res.code === 200) {
                this.formObj = res.msg ? res.msg : {};
            }
        },

        async initChart() {
            let res = await this.$http(pRealDayLine, { pid: this.pid }, true);
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
}
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