<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户昵称" name="first">
                <userName :pid="pid" />
            </el-tab-pane>
            <el-tab-pane label="用户头像" name="second">
                <userAvatar :pid="pid" />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import userAvatar from './components/userAvatar.vue';
import userName from './components/userName.vue';
export default {
    props: {
        pid: '',
    },
    components: {
        userName,
        userAvatar
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