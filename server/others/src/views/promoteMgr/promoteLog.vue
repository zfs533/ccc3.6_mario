<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="推广人uid">
                <el-input v-model="search.promoter" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" min-width="120" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="uid" label="用户uid" align="center" min-width="120"></el-table-column>
            <el-table-column prop="promoter" label="推广人uid" align="center" min-width="120"></el-table-column>
            <el-table-column prop="logDate" label="记录时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { promoteLogList } from '@/api/promote.js';
import { pidList, withDrawStatus, withdrawTypes } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            pidList: pidList,
            settleTypeList: withdrawTypes,
            statusList: withDrawStatus
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
            let res = await this.$http(promoteLogList, { page: this.page, count: this.count, ...this.getQuery() });
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
        stateFormat(row, column, cellValue) {
            let item = this.statusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        settleTypeFormat(row, column, cellValue) {
            let item = this.settleTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        }
    }
};
</script>
