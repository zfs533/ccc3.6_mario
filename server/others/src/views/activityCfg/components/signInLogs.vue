<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="玩家id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="奖励类型">
                <el-select v-model="search.rewardType" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in RewardType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="签到时间时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="玩家id" align="center"></el-table-column>
            <el-table-column prop="rewardType" label="奖励类型" align="center" :formatter="rewardTypeFormat">
            </el-table-column>
            <el-table-column prop="rewardCnt" label="奖励数量" align="center"></el-table-column>
            <el-table-column prop="continueDays" label="连续签到天数" align="center"></el-table-column>
            <el-table-column prop="createDate" label="记录时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="checkInDate" label="签到时间" align="center" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getSignInLogs } from '@/api/activity';
import { pidList, RewardType } from '@/utils/baseConst';

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
            pidList: pidList,
            formObj: {},
            RewardType: RewardType,
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
                query.createDateBegin = this.dateArr1[0];
                query.createDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.checkInDateBegin = this.dateArr2[0];
                query.checkInDateEnd = this.dateArr2[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getSignInLogs, { page: this.page, count: this.count, ...this.getQuery() });
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

        rewardTypeFormat(a, b, value) {
            let item = this.RewardType.find(i => i.value === value);
            return item ? item.label : value;
        },

    }
};
</script>
