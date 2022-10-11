<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="操作类型">
                <el-select v-model="search.optType" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in promoteOptTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="推广人uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="日志时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="logDate" label="日志时间" align="center" min-width="170" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="uid" label="推广人uid" align="center" min-width="120"></el-table-column>
            <el-table-column prop="optType" label="操作类型" align="center" min-width="120" :formatter="optTypeFormat"></el-table-column>
            <el-table-column prop="detail" label="修改明细" align="center" min-width="300" :formatter="detailFormat"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center" min-width="120"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { promoteOptLogList } from '@/api/promote.js';
import { promoteOptType } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            promoteOptTypes: promoteOptType
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
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateBegin = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(promoteOptLogList, { page: this.page, count: this.count, ...this.getQuery() });
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
        },
        detailFormat(row, column, cellValue) {
            let str = `修改前：${JSON.stringify(cellValue.before)}，修改后：${JSON.stringify(cellValue.after)}`;
            return str;
        },
        optTypeFormat(row, column, cellValue) {
            let item = this.promoteOptTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        }
    }
}
</script>
