<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="玩家id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="任务名称">
                <el-select v-model="search.taskId" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in taskList" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务状态">
                <el-select v-model="search.status" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in TaskStatusType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="完成时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="领取奖励时间">
                <el-date-picker v-model="dateArr3" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="玩家id" align="center"></el-table-column>
            <el-table-column prop="activityName" label="活动名称" align="center"></el-table-column>
            <el-table-column prop="taskId" label="任务名称" align="center" :formatter="taskIdFormat"></el-table-column>
            <el-table-column prop="status" label="任务状态" align="center" :formatter="taskStatusTypeFormat">
            </el-table-column>
            <el-table-column prop="createDate" label="记录时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="finishDate" label="完成时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="receivedDate" label="领取奖励时间" align="center" :formatter="$dateTimeFm">
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getLogs, getMany } from '@/api/activity';
import { ActivityType, pidList, RewardType, TaskStatusType } from '@/utils/baseConst';

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
            dateArr3: [],
            pidList: pidList,
            formObj: {},
            dialogVisible: false,
            ActivityType: ActivityType,
            TaskStatusType: TaskStatusType,
            RewardType: RewardType,
            taskList: []
        };
    },
    async created() {
        let taskRes = await this.$http(getMany, {});
        if (taskRes.code === 200) {
            this.taskList = taskRes.msg;
        }
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
                query.finishDateBegin = this.dateArr2[0];
                query.finishDateEnd = this.dateArr2[1];
            }
            if (this.dateArr3 && this.dateArr3.length > 1) {
                query.receivedDateBegin = this.dateArr3[0];
                query.receivedDateEnd = this.dateArr3[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getLogs, { page: this.page, count: this.count, ...this.getQuery() });
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
        async submitForm() {
            let query = { ...this.formObj };
            let res = {};
            if (query.id) {
                res = await this.$http(smsCfgUpdate, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        taskStatusTypeFormat(row, column, cellValue) {
            let item = this.TaskStatusType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        taskIdFormat(row, column, cellValue) {
            let item = this.taskList.find(i => i._id === cellValue);
            return item ? item.name + "，" + this.rewardTypeFormat(item.rewardType) + item.rewardCnt : cellValue;
        },
        rewardTypeFormat(value) {
            let item = this.RewardType.find(i => i.value === value);
            return item ? item.label : cellValue;
        },

    }
};
</script>
