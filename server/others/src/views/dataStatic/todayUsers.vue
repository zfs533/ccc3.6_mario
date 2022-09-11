<template>

    <el-card>

        <el-form :inline="true" style="width:100%">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="search.uid"></el-input>
            </el-form-item>
            <el-form-item label="统计日期:">
                <el-date-picker v-model="sumDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="serchData">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" ref="table">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="sumDate" label="统计日期" align="center" width="120px" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="uid" label="用户id" align="center"></el-table-column>
            <el-table-column prop="totalChargeMoney" label="今日总充值" align="center"></el-table-column>
            <el-table-column prop="totalVipChargeMoney" label="今日vip总充值" align="center"></el-table-column>
            <el-table-column prop="totalDiamondChargeMoney" label="今日钻石总充值" align="center"></el-table-column>
            <el-table-column prop="watchedTime" label="今日观影时长" align="center" :formatter="secondFormat">
            </el-table-column>
            <el-table-column prop="watchedVideoCount" label="今日观看视频数" align="center"></el-table-column>
            <el-table-column prop="watchCount" label="今日观看次数" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>

<script>

import { getTodayUsers, todayUsersExcel } from '@/api/dataStatic';
import { pidList } from '@/utils/baseConst';
import { getBeforeDate } from '@/utils/dateTime';
import { dateFm, secToString } from '@/utils/formatter';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            formObj: {},
            pageData: [],
            sumDate: getBeforeDate('date', 0, 0),
            search: {},
            pidList: pidList,
        };
    },
    created() {
        this.loadData();
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
        async exportExcel() {
            let res = await this.$http(todayUsersExcel, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
        getQuery() {
            let query = { ...this.search };
            if (this.sumDate && this.sumDate.length > 1) {
                query.sumDateBegin = this.sumDate[0];
                query.sumDateEnd = this.sumDate[1];
            }
            return query;
        },
        async loadData() {
            if (!this.sumDate[1]) {
                this.$message.error('请选择日期');
                return;
            }
            let res = await this.$http(getTodayUsers, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        }, secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
    },

};
</script>

<style>
</style>