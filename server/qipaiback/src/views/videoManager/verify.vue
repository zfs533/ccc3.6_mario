<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="视频审核" name="first">
                <verifyContent />
            </el-tab-pane>
            <el-tab-pane label="图集审核" name="second">
                <verifyImages />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>

import verifyContent from './components/verifyContent.vue';
import verifyImages from './components/verifyImages.vue';
export default {
    components: {
        verifyContent,
        verifyImages,
    },
    data() {

        return {
            activeName: "first",
        };
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    },

    async created() {
    }
};
</script>