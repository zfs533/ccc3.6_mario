<template>
    <el-card>
        <resourceVideoPid></resourceVideoPid>
    </el-card>
</template>
<script>

import resourceVideo from './components/resourceVideo.vue';
import resourceVideoPid from './components/resourceVideoPid.vue';
export default {
    components: {
        resourceVideo,
        resourceVideoPid
    },
    data() {
        return {
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