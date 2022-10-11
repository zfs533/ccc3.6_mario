<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="任务名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="奖励类型">
                <el-select v-model="search.rewardType" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in RewardType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务类型">
                <el-select v-model="search.type" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in TaskType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
            <el-table-column prop="rewardType" label="奖励类型" align="center" :formatter="rewardTypeFormat">
            </el-table-column>
            <el-table-column prop="type" label="任务类型" align="center" :formatter="taskTypeTypeFormat"></el-table-column>
            <el-table-column prop="vipLevel" label="vip等级" align="center"></el-table-column>
            <el-table-column prop="rewardCnt" label="奖励" align="center"></el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import { getMany } from '@/api/activity';
import { RewardType, TaskType } from '@/utils/baseConst';

export default {
    data() {
        return {
            search: { a: 1 },
            pageData: [],
            formObj: {},
            dialogVisible: false,
            TaskType: TaskType,
            RewardType: RewardType,
        };
    },
    async created() {
        this.loadData();
    },
    methods: {
        async searchData() {
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            return query;
        },
        async loadData() {
            let res = await this.$http(getMany, { ...this.getQuery() }, true);
            if (res.code === 200) {
                this.pageData = res.msg;
            }
        },
        rewardTypeFormat(row, column, cellValue) {
            let item = this.RewardType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        taskTypeTypeFormat(row, column, cellValue) {
            let item = this.TaskType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        }
    }
};
</script>
