<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换用户uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换码">
                <el-input v-model="search.code" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="奖励类型">
                <el-select v-model="search.rewardType">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in codeTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换码类型">
                <el-select v-model="search.codeType">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in ExchangeCodeType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="兑换用户uid" align="center"></el-table-column>
            <el-table-column prop="code" label="兑换码" align="center"></el-table-column>
            <el-table-column prop="rewardType" label="奖励类型" align="center"></el-table-column>
            <el-table-column prop="codeType" label="兑换码类型" align="center"></el-table-column>
            <el-table-column prop="channel" label="用户渠道" align="center"></el-table-column>
            <el-table-column prop="createDate" label="兑换时间" align="center" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { exchangeCodeRecord, getExchangeCodeRecord } from '@/api/logsManager';
import { codeTypes, exchangeTypes, pidList } from '@/utils/baseConst';
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
            formObj: {},
            dialogVisible: false,
            codeTypes: codeTypes,
            ExchangeCodeType: exchangeTypes,
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
        async exportData() {
            let res = await this.$http(getExchangeCodeRecord, { ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createdDateStart = this.dateArr1[0];
                query.createdDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(exchangeCodeRecord, { page: this.page, count: this.count, ...this.getQuery() });
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
