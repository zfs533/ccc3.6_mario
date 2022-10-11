<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="总计" name="first">
                <pHomeData />
            </el-tab-pane>
            <el-tab-pane label="明细" name="second">
                <pHomeTable />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import pHomeData from './components/pHomeData.vue';
import pHomeTable from './components/pHomeTable.vue';
export default {
    components: {
        pHomeData,
        pHomeTable,
    },
    data() {
        return {
            activeName: "first",
        };
    },
    async created() {

    }
}
</script>