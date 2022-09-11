<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值渠道">
                <el-input v-model="search.channel"></el-input>
            </el-form-item>
            <el-form-item label="时间范围">
                <el-date-picker v-model="dateArr1" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
                    placeholder="选择时间范围"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
            <br>
            <el-form-item label="时间段">
                <el-select v-model="minute" placeholder="请选择时间" @change="minuteChange">
                    <el-option v-for="item in minuteList" :key="item.minute" :label="item.name" :value="item.minute">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-date-picker disabled v-model="dateArr2" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="shortTimeSearchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="sumDate" label="统计时间" min-width="150" :formatter="$dateTimeFm" align="center">
            </el-table-column>
            <el-table-column prop="payType" label="充值类型" min-width="100" align="center" :formatter="payTypeFormat">
            </el-table-column>
            <el-table-column prop="channel" label="充值渠道" min-width="100" align="center"></el-table-column>
            <el-table-column prop="totalCount" label="总单数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="orderedCount" label="拉单数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="arrivalCount" label="成功数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="successRate" label="成功率" min-width="100" align="center"></el-table-column>
            <el-table-column prop="createMoney" label="创建金额" min-width="100" align="center"></el-table-column>
            <el-table-column prop="orderedMoney" label="拉单金额" min-width="100" align="center"></el-table-column>
            <el-table-column prop="arrivalMoney" label="回调到账金额" min-width="100" align="center"></el-table-column>
            <el-table-column prop="createUsdtMoney" label="创建USDT" min-width="120" align="center"></el-table-column>
            <el-table-column prop="orderedUsdtMoney" label="拉单USDT" min-width="120" align="center"></el-table-column>
            <el-table-column prop="arrivalUsdtMoney" label="回调到账USDT" min-width="120" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { daySumExport, getDaySum, getRealDay } from "@/api/dataStatic";
import { payTypes, pidList } from "@/utils/baseConst";
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            search: {},
            page: 1,
            count: 10,
            totalCount: 10,
            pageData: [],
            payTypes: payTypes,
            dateArr1: [],
            dateArr2: [],
            pidList: pidList,
            minute: 0,
            minuteList: [
                {
                    minute: 0,
                    name: "请选择"
                },
                {
                    minute: 10,
                    name: "10分钟"
                },
                {
                    minute: 20,
                    name: "20分钟"
                },
                {
                    minute: 30,
                    name: "30分钟"
                },
                {
                    minute: 40,
                    name: "40分钟"
                },
                {
                    minute: 50,
                    name: "50分钟"
                },
                {
                    minute: 60,
                    name: "60分钟"
                }
            ]
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        shortTimeSearchData() {
            this.page = 1;
            this.shoutTimeLoadData();
        },
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.startTime = this.dateArr1[0];
                query.endTime = this.dateArr1[1];
            }
            return query;
        },
        getQueryShortTime() {
            let query = { ...this.search };
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.startTime = this.dateArr2[0];
                query.endTime = this.dateArr2[1];
            }
            return query;
        },
        async loadData() {
            let query = { page: this.page, count: this.count, ...this.getQuery() };
            let res = await this.$http(getDaySum, query, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        async shoutTimeLoadData() {
            let query = { page: this.page, count: this.count, ...this.getQueryShortTime() };
            let res = await this.$http(getRealDay, query, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        //页码变更
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        payTypeFormat(row) {
            let item = payTypes.find(i => i.value === row.payType);
            return item ? item.label : row.payType;
        },
        minuteChange() {
            if (this.minute != 0) {
                this.dateArr2 = [getBeforeDate('time', 0, this.minute), getBeforeDate('time', 0, 0)];
            } else {
                this.dateArr2 = [];
            }
        },
        async exportExcel() {
            let res = await this.$http(daySumExport, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    }
};
</script>