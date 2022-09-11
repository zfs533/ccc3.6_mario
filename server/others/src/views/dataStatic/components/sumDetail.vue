<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="合作方式">
                <el-select v-model="search.cooperationType" placeholder="请选择合作方式">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in ChannelCooperationTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道归属人">
                <el-input v-model="search.relegation" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="扣量">
                <el-select v-model="search.isDiscount">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="扣量前" :value="false"></el-option>
                    <el-option label="扣量后" :value="true"></el-option>
                </el-select>
            </el-form-item>
            <!--   <el-form-item label="操作系统">
                <el-select v-model="search.platform" placeholder="请选择操作系统" allow-create filterable default-first-option>
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in platFormType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
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
            <el-table-column prop="newUserCount" label="当日新增人数" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="当日总充值金额" align="center"></el-table-column>
        </el-table>
        <h3>一级渠道每日汇总</h3>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
            <el-table-column prop="sumDate" label="统计时间" align="center" :formatter="dateFormat" width="120px"></el-table-column>
            <el-table-column prop="cooperationType" label="合作方式" align="center" :formatter="formatPriceTitle"></el-table-column>
            <el-table-column prop="parentChannel" label="统计渠道" align="center"></el-table-column>
            <el-table-column prop="totalIncome" label="当日佣金" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="当日新增人数" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="当日总充值金额" align="center"></el-table-column>
            <el-table-column prop="relegation" label="归属人" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
//数据统计页面导出
import { getDetailStat, mainChannelDaySumExcel } from '@/api/dataStatic';
import { ChannelCooperationTypeList, pidList, ChannelLevel } from '@/utils/channelShield';
import { platFormType } from '@/utils/baseConst';
import { dateFm } from '@/utils/formatter';
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: { pid: 'A', isDiscount: false },
            pageData: [],
            totalData: [],
            formObj: {},
            pidList: pidList,
            ChannelCooperationTypeList: ChannelCooperationTypeList,
            platFormType: platFormType,
            ChannelLevel: ChannelLevel,
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
            let res = await this.$http(getDetailStat, { page: this.page, count: this.count, ...this.getQuery() }, true);
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
        formatPriceTitle(row, column, cellValue) {
            switch (row.cooperationType) {
                case 'CPA':
                    return `CPA 单价:${row.price}`;
                case 'CPS':
                    return `CPS 分成比例:${row.price}`;
                case 'CPT':
                    return `CPT 投放资金:${row.price}`;
            }
        },
        channelLevelFormat(row, column, cellValue) {
            let item = this.ChannelLevel.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },
        async exportExcel() {
            let res = await this.$http(mainChannelDaySumExcel, { page: this.page, count: this.count, ...this.getQuery() });
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
