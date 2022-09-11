<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="后台类型">
                <el-select v-model="search.serverType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in serverTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="search.act" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="登录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="act" label="账号" align="center"></el-table-column>
            <el-table-column prop="ip" label="ip地址" align="center"></el-table-column>
            <el-table-column prop="ipLocation" label="位置" align="center"></el-table-column>
            <el-table-column prop="serverType" label="后台类型" align="center" :formatter="serverTypeFormat"></el-table-column>
            <el-table-column prop="createDate" label="登录时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getBackstageLoginlog } from '@/api/logsManager';
import { accountTypes } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            pageData: [],
            serverTypes: accountTypes
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
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateStart = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getBackstageLoginlog, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        serverTypeFormat(row, column, cellValue) {
            let item = accountTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    margin-bottom: 20px;
}
.zoneBox {
    display: flex;
    width: 280px;
    align-items: center;
    .inputs {
        flex: 3;
        display: flex;
        justify-content: center;
    }
    .line {
        text-align: center;
        flex: 1;
    }
}
</style>