<template>
    <div class="outerBox">
        <el-checkbox-group v-model="checkList" @change="sendList">
            <el-checkbox v-for="(item,index) in tagsList" :key="index" :label="item.value" style="margin:10px">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    props: {
        checked: Array,
    },
    data() {
        return {
            checkList: [],
        };
    },
    computed: {
        tagsList() {
            return this.$store.getters.tagsList;
        }
    },
    created() {
        this.checkList = this.checked ? [...this.checked] : [];
    },
    watch: {
        // tagsList: {
        //     handler(nv, ov) {
        //         console.log(nv, "*******");
        //     },
        //     deep: true
        // },
        checked: {
            handler(nv, ov) {
                // 特别注意，不能用箭头函数，箭头函数，this指向全局
                this.checkList = nv ? [...nv] : [];
            },
            deep: true // 可以深度检测到 obj 对象的属性值的变化
        }
    },
    methods: {
        sendList() {
            this.$emit("check", this.checkList);
        }
    }
}
</script>
<style lang="scss" scoped>
.outerBox {
    max-width: 80vw;
    max-height: 80vh;
    overflow-y: auto;
}
</style>