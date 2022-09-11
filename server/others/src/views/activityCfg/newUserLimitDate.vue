<template>
    <el-card>
        <el-form :inline="false" class="demo-form-inline" style="width:500px">
            <el-form-item label="项目">
                <el-select v-model="formObj.pids" multiple placeholder="请选择">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务名称">
                <el-select v-model="formObj.taskIds" multiple placeholder="请选择">
                    <el-option v-for="item in taskList" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动名称">
                <el-input v-model="formObj.name"></el-input>
            </el-form-item>
            <el-form-item label="倒计时天数">
                <el-input type="number" v-model="formObj.countdown"></el-input>
            </el-form-item>
            <el-form-item label="活动开关">
                <el-switch v-model="formObj.active" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">读取</el-button>
                <el-button type="primary" @click="submitForm">提交修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { getMany, getNewUserLimitDate, updateNewUserLimitDate } from '@/api/activity';
import { pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            formObj: {},
            pidList: pidList,
            taskList: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        searchData() {
            this.loadData();
        },
        async loadData() {
            let taskRes = await this.$http(getMany, {});
            if (taskRes.code === 200) {
                this.taskList = taskRes.msg;
            }
            let res = await this.$http(getNewUserLimitDate);
            if (res.code === 200) {
                this.formObj = res.msg;
            }
        },
        async submitForm() {
            let query = { ...this.formObj };
            query.id = query._id;
            delete query._id;
            let res = await this.$http(updateNewUserLimitDate, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
            }
        }
    }
}
</script>
