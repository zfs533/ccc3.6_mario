<template>
    <el-card>
        <el-button type="primary" @click="searchData" style="margin-bottom:20px">刷新</el-button>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="followerId" label="关注人" align="center"></el-table-column>
            <el-table-column prop="createdDate" label="关注时间" align="center" :formatter="$dateTimeFm"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { moneyFollowers } from '@/api/usersManager';
export default {
    props: {
        uid: ''
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            _uid: this.uid,
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
            let res = await this.$http(moneyFollowers, { uid: this._uid, page: this.page, count: this.count });
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
        }
    }
}
</script>