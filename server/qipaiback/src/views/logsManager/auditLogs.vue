<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="操作类型">
                <el-select v-model="search.optType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in operationList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作人">
                <el-input v-model="search.opt" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="内容id">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="日志时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="optType" label="操作类型" align="center" width="200" :formatter="logOptTypeFormat">
            </el-table-column>
            <el-table-column prop="opt" label="操作人" align="center" width="100"></el-table-column>
            <el-table-column prop="contentId" label="内容id" align="center" width="250"></el-table-column>
            <el-table-column prop="detail" label="描述" align="center" :formatter="changeLogFormat"></el-table-column>
            <el-table-column prop="logDate" label="日志时间" align="center" width="170" :formatter="$dateTimeFm">
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
import { getAuditLogs } from '@/api/logsManager';
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: getBeforeDate('date', 0, 0),
            pageData: [],
            operationList: [
                { label: "线上资源-单个编辑", value: "online_updateOne" },
                { label: "线上资源-批量编辑", value: "online_updateplist" },
                { label: "内容审核-审核拒绝", value: "contentAudit_auditFail" },
                { label: "内容审核-审核通过", value: "contentAudit_auditPass" },
                { label: "内容审核-审核暂存", value: "contentAudit_auditWait" },
                { label: "内容审核-批量操作", value: "contentAudit_updatePlist" },
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
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateStart = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getAuditLogs, { page: this.page, count: this.count, ...this.getQuery() });
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
        boolFormat(row, column, cellValue) {
            return cellValue ? "是" : "否";
        },
        changeLogFormat(row, column, cellValue) {
            if (!cellValue) {
                return cellValue;
            }
            let str = JSON.stringify(cellValue);
            let newStr = str.replace(/\\"/g, '"').replace(/]"/g, "]").replace(/"\[/g, "[");
            return newStr;
        },
        logOptTypeFormat(row, column, cellValue) {
            let item = this.operationList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
    }
};
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