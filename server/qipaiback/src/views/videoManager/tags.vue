<template>
    <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部标签" name="first">
                <tagsAll />
            </el-tab-pane>
            <el-tab-pane label="标签分类" name="second">
                <tagsCategory />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>

import tagsAll from './components/tagsAll.vue';
import tagsCategory from './components/tagsCategory.vue';
export default {
    components: {
        tagsAll,
        tagsCategory,
    },
    data() {

        return {
            activeName: "first",
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