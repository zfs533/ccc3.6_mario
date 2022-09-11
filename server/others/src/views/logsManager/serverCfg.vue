<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="操作人">
                <el-input v-model="search.operator" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="操作类型">
                <el-select v-model="search.operation" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in operationList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模块名称">
                <el-select v-model="search.logSms" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in logSmsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="logModular" label="模块名称" align="center" width="160" :formatter="logModularFormat"></el-table-column>
            <el-table-column prop="operation" label="操作类型" align="center" width="160"></el-table-column>
            <el-table-column prop="operator" label="操作人" align="center" width="160"></el-table-column>
            <el-table-column prop="changeLog" label="修改记录" align="center" :formatter="changeLogFormat"></el-table-column>
            <el-table-column prop="date" label="记录时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getServerCfg, adminOptLogEnum } from '@/api/logsManager';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            pageData: [],
            operationList: [
                { label: "删除", value: "删除" },
                { label: "添加", value: "添加" },
                { label: "批量添加", value: "批量添加" },
                { label: "更改", value: "更改" }
            ],
            logSmsList: [],
        };
    },
    created() {
        this.loadData();
        this.loadEnum();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
            this.loadEnum();
        },
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.dateStart = this.dateArr1[0];
                query.dateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getServerCfg, { page: this.page, count: this.count, ...this.getQuery() }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        async loadEnum() {
            let res = await this.$http(adminOptLogEnum, {}, true);
            if (res.code === 200) {
                this.logSmsList = res.msg;
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

        logModularFormat(row, column, cellValue) {
            let item = this.logSmsList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        changeLogFormat(row, column, cellValue) {
            if (!cellValue) {
                return cellValue;
            }
            let str = JSON.stringify(cellValue);
            let newStr = str.replace(/\\"/g, '"').replace(/]"/g, "]").replace(/"\[/g, "[");
            return newStr;
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