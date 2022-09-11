<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- <el-tab-pane v-if="pidList.length" label="视频资源" name="first">
                <resourceVideo/>
            </el-tab-pane> -->
            <el-tab-pane v-for="item in pidList" :label="$pidFormat(item.pid)" :key="item.pid" :value="item.pid" :name="item.pid">
                <resourceVideoPid :pid="item.pid" ></resourceVideoPid>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>

import { pidList } from '@/utils/baseConst';
import resourceVideo from './components/resourceVideo.vue';
import resourceVideoPid from './components/resourceVideoPid.vue';
export default {
    components: {
        resourceVideo,
        resourceVideoPid
    },
    data() {
        return {
            pidList:pidList,
            activeName:pidList[0].pid,
            // activeName: "first",
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