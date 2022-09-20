<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户呢称">
                <el-input v-model="search.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="search.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户渠道">
                <el-input v-model="search.userChannel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频id">
                <el-input v-model="search.vid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="search.publisherId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="购买时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="玩家id" align="center"></el-table-column>
            <el-table-column prop="username" label="用户呢称" align="center"></el-table-column>
            <el-table-column prop="logDate" label="购买时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="price" label="订单金额" align="center"></el-table-column>
            <el-table-column prop="buyPrice" label="购买价格" align="center"></el-table-column>
            <el-table-column prop="vid" label="视频id" align="center"></el-table-column>
            <el-table-column prop="name" label="视频名称" align="center"></el-table-column>
            <el-table-column prop="publisherId" label="发布人" align="center"></el-table-column>
            <el-table-column prop="phone" label="用户手机号" align="center"></el-table-column>
            <el-table-column prop="channel" label="用户渠道" align="center" :formatter="$channelFormat"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { buyVideoRecord, buyVideoRecordExport } from '@/api/consumptionManagement';
import { pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
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
            query.pid = CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createTimeStart = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(buyVideoRecord, { page: this.page, count: this.count, ...this.getQuery() });
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
        datetimeFormat(row, column, cellValue) {//时间格式化
            return this.$dateTimeFm(cellValue);
        },
        async exportData() {
            let res = await this.$http(buyVideoRecordExport, { ...this.getQuery(), page: 1, count: 1 });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    }
};
</script>
