
<template>
    <div>
        <el-form :inline="true" style="width:100%">
            <el-form-item label="周期数据:">
                <el-date-picker v-model="sumDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="serchData">刷新</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="exportGDaySum">导出</el-button>
            </el-form-item>
        </el-form>
        <h3>总数据</h3>
        <el-table :data="totalData" :border="true" min-width="100%" ref="table">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeAmt" label="vip充值" align="center"></el-table-column>
            <el-table-column prop="diamondChargeAmt" label="钻石充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeCount" label="vip订单数" align="center"></el-table-column>
            <el-table-column prop="diamondChargeCount" label="钻石订单数" align="center"></el-table-column>
            <el-table-column prop="loginUserCount" label="登陆人数" align="center"></el-table-column>
            <el-table-column prop="watchUserCount" label="观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="新增人数" align="center"></el-table-column>
            <el-table-column prop="bindUserCount" label="绑定人数" align="center"></el-table-column>
            <el-table-column prop="androidTotalChargeAmt" label="安卓总充值" align="center"></el-table-column>
            <el-table-column prop="androidVipChargeAmt" label="安卓vip充值" align="center"></el-table-column>
            <el-table-column prop="androidDiamondChargeAmt" label="安卓钻石充值" align="center"></el-table-column>
            <el-table-column prop="androidVipChargeCount" label="安卓vip订单数" align="center"></el-table-column>
            <el-table-column prop="androidDiamondChargeCount" label="安卓钻石订单数" align="center"></el-table-column>
            <el-table-column prop="androidLoginUserCount" label="安卓登陆人数" align="center"></el-table-column>
            <el-table-column prop="androidWatchUserCount" label="安卓观影人数" align="center"></el-table-column>
            <el-table-column prop="androidNewUserCount" label="安卓新增人数" align="center"></el-table-column>
            <el-table-column prop="iosTotalChargeAmt" label="ios总充值" align="center"></el-table-column>
            <el-table-column prop="iosVipChargeAmt" label="iosvip充值" align="center"></el-table-column>
            <el-table-column prop="iosDiamondChargeAmt" label="ios钻石充值" align="center"></el-table-column>
            <el-table-column prop="iosVipChargeCount" label="iosvip订单数" align="center"></el-table-column>
            <el-table-column prop="iosDiamondChargeCount" label="ios钻石订单数" align="center"></el-table-column>
            <el-table-column prop="iosLoginUserCount" label="ios登陆人数" align="center"></el-table-column>
            <el-table-column prop="iosWatchUserCount" label="ios观影人数" align="center"></el-table-column>
            <el-table-column prop="iosNewUserCount" label="ios新增人数" align="center"></el-table-column>
            <el-table-column prop="adsCount" label="广告点击次数" align="center"></el-table-column>
            <el-table-column prop="vipChargeUserCount" label="vip充值人数" align="center"></el-table-column>
            <el-table-column prop="diamondChargeUserCount" label="钻石充值人数" align="center"></el-table-column>
        </el-table>
        <h3>详情数据</h3>
        <el-table :data="pageData" :border="true" min-width="100%" ref="table">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="sumDate" label="统计日期" align="center" width="250" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeAmt" label="vip充值" align="center"></el-table-column>
            <el-table-column prop="diamondChargeAmt" label="钻石充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeCount" label="vip订单数" align="center"></el-table-column>
            <el-table-column prop="diamondChargeCount" label="钻石订单数" align="center"></el-table-column>
            <el-table-column prop="loginUserCount" label="登陆人数" align="center"></el-table-column>
            <el-table-column prop="watchUserCount" label="观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="新增人数" align="center"></el-table-column>
            <el-table-column prop="bindUserCount" label="绑定人数" align="center"></el-table-column>
            <el-table-column prop="regAndChargeRate" label="新增付费率" align="center"></el-table-column>
            <el-table-column prop="androidTotalChargeAmt" label="安卓总充值" align="center"></el-table-column>
            <el-table-column prop="androidVipChargeAmt" label="安卓vip充值" align="center"></el-table-column>
            <el-table-column prop="androidDiamondChargeAmt" label="安卓钻石充值" align="center"></el-table-column>
            <el-table-column prop="androidVipChargeCount" label="安卓vip订单数" align="center"></el-table-column>
            <el-table-column prop="androidDiamondChargeCount" label="安卓钻石订单数" align="center"></el-table-column>
            <el-table-column prop="androidLoginUserCount" label="安卓登陆人数" align="center"></el-table-column>
            <el-table-column prop="androidWatchUserCount" label="安卓观影人数" align="center"></el-table-column>
            <el-table-column prop="androidNewUserCount" label="安卓新增人数" align="center"></el-table-column>
            <el-table-column prop="iosTotalChargeAmt" label="ios总充值" align="center"></el-table-column>
            <el-table-column prop="iosVipChargeAmt" label="iosvip充值" align="center"></el-table-column>
            <el-table-column prop="iosDiamondChargeAmt" label="ios钻石充值" align="center"></el-table-column>
            <el-table-column prop="iosVipChargeCount" label="iosvip订单数" align="center"></el-table-column>
            <el-table-column prop="iosDiamondChargeCount" label="ios钻石订单数" align="center"></el-table-column>
            <el-table-column prop="iosLoginUserCount" label="ios登陆人数" align="center"></el-table-column>
            <el-table-column prop="iosWatchUserCount" label="ios观影人数" align="center"></el-table-column>
            <el-table-column prop="iosNewUserCount" label="ios新增人数" align="center"></el-table-column>
            <el-table-column prop="adsCount" label="广告点击次数" align="center"></el-table-column>
            <el-table-column prop="vipChargeUserCount" label="vip充值人数" align="center"></el-table-column>
            <el-table-column prop="diamondChargeUserCount" label="钻石充值人数" align="center"></el-table-column>
            <el-table-column prop="retentionDay2" label="次日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay2" label="安卓次日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay2" label="ios次日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay3" label="三日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay3" label="安卓三日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay3" label="ios三日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay7" label="七日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay7" label="安卓七日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay7" label="ios七日留存" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </div>
</template>

<script>

import { exportpDaySum, getPDaySum } from '@/api/dataStatic';
import { pidList } from '@/utils/baseConst';
import { getBeforeDate } from '@/utils/dateTime';
import { dateFm } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {

    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            formObj: {},
            pageData: [],
            sumDate: [],
            pid: undefined,
            pidList: pidList,
            activeName: 'all',
            totalData: []
        };
    },
    created() {
        this.sumDate=getBeforeDate('date', 0, 0);
    },
    methods: {

        

        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        serchData() {
            this.page = 1;
            this.loadData();
        },

        getQuery() {
            let query = {};
            if (this.sumDate && this.sumDate.length > 1) {
                query.sumDateStart = this.sumDate[0];
                query.sumDateEnd = this.sumDate[1];
                query.pid = CURRENTPID || '';
            }

            return query;
        },

        async loadData() {
            if (!this.sumDate[1]) {
                this.$message.error('请选择日期');
                return;
            }
            let res = await this.$http(getPDaySum, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.totalData = res.msg.totalData;
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        async exportGDaySum() {
            let res = await this.$http(exportpDaySum, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                // this.pageData = res.msg.pageData;
                // this.totalCount = res.msg.totalCount;
                this.$message.success("导出任务创建成功");
            }
        },


        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        }
    },

};
</script>

<style>
</style>