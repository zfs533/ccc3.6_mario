<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="推广人uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="统计时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" min-width="120" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="sumDate" label="统计日期(天)" align="center" min-width="170" :formatter="$dateFm"></el-table-column>
            <el-table-column prop="uid" label="推广人uid" align="center" min-width="170"></el-table-column>
            <el-table-column prop="totalSettleMoney" label="总提现" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalIncome" label="总收益" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalPromoteCnt" label="总推广人数" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalRechargeCnt" label="总充值笔数" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalRechargeUserCnt" label="总充值人数" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalRechargeAmt" label="总充值金额" align="center" min-width="120"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { promoteDaySumList } from '@/api/promote.js';
import { pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            dateArr2: [],
            pidList: pidList
        };
    },
    async created() {
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();

        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.sumDateBegin = this.dateArr1[0];
                query.sumDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(promoteDaySumList, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        }
    }
}
</script>
