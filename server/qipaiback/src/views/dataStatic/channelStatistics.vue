<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="数据明细" name="first">
                <detail />
            </el-tab-pane>
            <el-tab-pane label="数据总计" name="second">
                <sumDetail />
            </el-tab-pane>
            <el-tab-pane label="渠道汇总" name="third">
                <channelSum />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import channelSum from './components/channelSum.vue';
import detail from './components/detail.vue';
import sumDetail from './components/sumDetail.vue';
export default {
    components: {
        detail,
        sumDetail,
        channelSum
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