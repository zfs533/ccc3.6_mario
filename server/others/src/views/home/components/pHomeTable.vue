<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目" v-if="pidList.length>1">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="sumDate" label="时间" align="center"></el-table-column>
            <el-table-column v-if="!dataAuth" prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
            <el-table-column v-if="!dataAuth" prop="vipChargeAmt" label="vip充值" align="center"></el-table-column>
            <el-table-column v-if="!dataAuth" prop="diamondChargeAmt" label="钻石充值" align="center"></el-table-column>
            <el-table-column v-if="!dataAuth" prop="vipChargeCount" label="vip订单数" align="center"></el-table-column>
            <el-table-column v-if="!dataAuth" prop="diamondChargeCount" label="钻石订单数" align="center"></el-table-column>
            <el-table-column prop="loginUserCount" label="登陆人数" align="center"></el-table-column>
            <el-table-column prop="watchUserCount" label="观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="新增人数" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="prev,next" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getPRealDays } from '@/api/home';
import { pidList } from '@/utils/baseConst';
import { getSession } from '@/utils/auth';
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: getBeforeDate('date', 0, 0),
            pidList: pidList,
            dataAuth: false,
            next: false
        };
    },
    async created() {
        this.dataAuth = getSession("dataAuth");
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
                query.sumDateStart = this.dateArr1[0];
                query.sumDateEnd = this.dateArr1[1];
            }
            if (!query.pid && pidList) {
                query.pid = pidList[0].pid;
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getPRealDays, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                if (this.page === 1 && this.totalCount === 0) {
                    this.totalCount = 1;
                }
                if (res.msg.next) {
                    if (this.totalCount > this.page * this.count) {
                    } else {
                        this.totalCount = this.totalCount + this.count;
                    }
                }
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
