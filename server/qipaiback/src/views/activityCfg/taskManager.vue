<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="任务记录" name="first">
                <taskLog />
            </el-tab-pane>
            <el-tab-pane label="任务列表" name="second">
                <taskList />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import taskLog from './components/taskLog.vue';
import taskList from './components/taskList.vue';
export default {
    components: {
        taskLog,
        taskList
    },
    data() {
        return {
            activeName: "first",
            payTypes: []
        };
    },
    async created() {
    }
}
</script>