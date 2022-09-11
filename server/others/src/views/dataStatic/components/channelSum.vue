<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="一级渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扣量">
                <el-select v-model="search.isDiscount">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="扣量前" :value="false"></el-option>
                    <el-option label="扣量后" :value="true"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="统计时间">
                <el-date-picker v-model="dateArr1" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <h3>总数据</h3>
        <el-table :data="totalData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="newUserCount" label="总新增人数" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
        </el-table>
        <h3>一级渠道汇总数据</h3>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
            <el-table-column prop="parentChannel" label="一级渠道" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="总新增人数" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getChannelStat, mainChannelTotalExcel } from '@/api/dataStatic';
import { pidList } from '@/utils/channelShield';
import { dateFm } from '@/utils/formatter';
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: { isDiscount: false },
            pageData: [],
            totalData: [],
            formObj: {},
            pidList: pidList,
            dateFm: dateFm,
            dateArr1: getBeforeDate('date', 0, 0),
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.sumDateBegin = this.dateArr1[0];
                query.sumDateEnd = this.dateArr1[1];
            }
            return query;
        },
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getChannelStat, { page: this.page, count: this.count, ...this.getQuery() }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalData = res.msg.totalData;
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
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },
        async exportExcel() {
            let res = await this.$http(mainChannelTotalExcel, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.header {
    margin-bottom: 20px;
}
h3 {
    font-size: 16px;
    color: #999;
}
</style>
