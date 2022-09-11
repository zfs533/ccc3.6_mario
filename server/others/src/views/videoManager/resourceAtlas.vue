<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- <el-tab-pane label="图集资源" v-if="pidList.length" name="first">
                <resourceAtlas />
            </el-tab-pane> -->
            <el-tab-pane v-for='item in pidList' :label="item.name" :name="item.pid" :key="item.pid" :value="item.pid" >
                <resourceAtlasPid :pid='item.pid'/>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>


import { pidList } from '@/utils/baseConst';
import resourceAtlas from './components/resourceAtlas.vue';
import resourceAtlasPid from './components/resourceAtlasPid.vue';
export default {
    components: {
        resourceAtlasPid,
        resourceAtlas,
    },
    data() {

        return {
            pidList,
            activeName: pidList[0].pid,
        };
    },
    methods: {
        handleClick(tab, event) {
        },
    },

    async created() {
    }
};
</script>