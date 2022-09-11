<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作人">
                <el-input v-model="search.operator" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="用户id" align="center" width="160"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center" :formatter="$channelFormat"></el-table-column>
            <el-table-column prop="username" label="用户呢称" align="center" width="160"></el-table-column>
            <el-table-column prop="type" label="用户类型" align="center" width="120" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center" width="280"></el-table-column>
            <el-table-column prop="createTime" label="记录时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getCreateUser } from '@/api/logsManager';
import { UserTypeNew, pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            pageData: [],
            typeList: UserTypeNew,
            pidList: pidList,
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
                query.createTimeStart = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getCreateUser, { page: this.page, count: this.count, ...this.getQuery() });
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
        typeFormat(row, column, cellValue) {
            let item = this.typeList.find(i => i.value == cellValue);
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