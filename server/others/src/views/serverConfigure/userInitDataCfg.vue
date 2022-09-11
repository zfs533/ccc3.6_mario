<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane v-for="item in formObj" :key="item.pid" :label="$pidFormat(item.pid)" :value="item.pid">
                <userInitDataInfo :pid="item.pid"> </userInitDataInfo>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import { secretMgrGet } from '@/api/serverConfigure';
import { pidList } from '@/utils/baseConst';
import userInitDataInfo from './userInitDataInfo.vue';
export default {
    components: {
        userInitDataInfo
    },
    data() {
        return {
            pidList: pidList,
            activeName: '',
            formObj: [],
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            let res = await this.$http(secretMgrGet, {});
            if (res.code === 200) {
                this.formObj = (res.msg.data || []).sort((e1, e2) => (e1.pid).localeCompare(e2.pid));
            }
        },
    }
};
</script>
