<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="类型">
                <el-select v-model="search.chgType" placeholder="类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ChangeMoneyType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-table :data="pageDataAmount" :border="true" min-width="100%" @close="closePlayer">
            <el-table-column prop="uid" label="uid" align="center"></el-table-column>
            <el-table-column prop="chgType" label="类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="logDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="diamondOrg" label="变化前钻石" align="center"></el-table-column>
            <el-table-column prop="diamondEnd" label="变化后钻石" align="center"></el-table-column>
            <el-table-column prop="chgDiamond" label="变化钻石" align="center"></el-table-column>
            <el-table-column prop="vipOrg" label="变化前vip" align="center"></el-table-column>
            <el-table-column prop="vipEnd" label="变化后vip" align="center"></el-table-column>
            <el-table-column prop="vipEffectiveTime" label="vip过期时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="description" label="描述" align="center"></el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import { moneyChange } from '@/api/usersManager';
import { ChangeMoneyType } from '@/utils/baseConst';
export default {
    props: {
        uname: '',
        uid: ''
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: { chgType: "" },
            dateArr1: [],
            pageDataAmount: [],
            ChangeMoneyType: ChangeMoneyType,
            _uid: '',
        };
    },
    created() {
        this._uid = this.uid;
        this.loadData();
    },
    watch: {
        uid(newVal) {
            this._uid = newVal;
            this.searchData();
        }
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
            let res = await this.$http(moneyChange, { uid: this._uid, page: this.page, count: this.count, ...this.getQuery() });
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
        typeFormat(row, column, cellValue) {
            let item = ChangeMoneyType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        closePlayer() {
            this.search = {};
        }
    }
}
</script>