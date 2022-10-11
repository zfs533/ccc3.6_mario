<template>
    <el-card>
        <resourceAtlasPid :pid='pid' />
    </el-card>
</template>
<script>


import resourceAtlas from './components/resourceAtlas.vue';
import resourceAtlasPid from './components/resourceAtlasPid.vue';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    components: {
        resourceAtlasPid,
        resourceAtlas,
    },
    data() {
        return {
            pid: CURRENTPID,
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