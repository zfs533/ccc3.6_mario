<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="vip等级特权" name="first">
                <vipLevelPrivileges />
            </el-tab-pane>
            <el-tab-pane label="特权配置" name="second">
                <privileges />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import privileges from './components/privileges.vue';
import vipLevelPrivileges from './components/vipLevel.vue';
export default {
    props: {
        pid: '',
    },
    components: {
        privileges,
        vipLevelPrivileges
    },
    data() {
        return {
            activeName: "first",
        };
    },
    async created() {
    }
};
</script>