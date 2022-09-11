<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="签到记录" name="first">
                <singInLogs />
            </el-tab-pane>
            <el-tab-pane label="签到奖励配置" name="second">
                <singInCfg />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import singInLogs from './components/signInLogs.vue';
import singInCfg from './components/signInCfg.vue';
export default {
    components: {
        singInLogs,
        singInCfg
    },
    data() {
        return {
            activeName: "first",
            payTypes: []
        };
    },
    async created() {
    }
};
</script>