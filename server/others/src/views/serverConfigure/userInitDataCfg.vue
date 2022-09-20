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
import { pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
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
        this.formObj=[{pid:CURRENTPID}]
    },
    methods: {
       
    }
};
</script>
