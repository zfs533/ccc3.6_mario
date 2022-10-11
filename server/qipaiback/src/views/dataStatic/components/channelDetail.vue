<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="searchData">刷新</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageDataAmount" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
            <el-table-column prop="sumDate" label="统计时间" align="center" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center" :formatter="$channelFormat"></el-table-column>
            <el-table-column prop="newUserCount" label="人数" align="center"></el-table-column>
            <el-table-column prop="afterNewUserCount" label="人数2" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="金额" align="center"></el-table-column>
            <el-table-column prop="afterTotalChargeAmt" label="金额2" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getChannelDiscountDetail } from '@/api/dataStatic';
import { dateTimeFm } from '@/utils/formatter';
export default {
    props: { datas: undefined },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageDataAmount: [],
            _pid: '',
            _channel: '',
            _sumDate: ''
        };
    },
    created() {
        this._pid = this.datas.pid;
        this._channel = this.datas.channel;
        this._sumDate = this.datas.sumDate;
        this.loadData();
    },
    watch: {
        datas(newVal) {
            this._pid = newVal.pid;
            this._channel = newVal.channel;
            this._sumDate = newVal.sumDate;
            this.loadData();
        }
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getChannelDiscountDetail, { pid: this._pid, channel: this._channel, sumDate: this._sumDate, page: this.page, count: this.count });
            if (res.code === 200) {
                this.pageDataAmount = res.msg.pageData;
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
            return dateTimeFm(cellValue);
        }
    }
}
</script>