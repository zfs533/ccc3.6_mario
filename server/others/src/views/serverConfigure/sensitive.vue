<template>
    <el-card>
        <el-form :inline="false" style="width:850px">
            <el-form-item>
                <el-button type="primary" @click="loadData">读取</el-button>
                <el-button type="danger" @click="submit">提交编辑</el-button>
            </el-form-item>
            <el-form-item label="敏感词汇表">
                <el-input type="textarea" style="width:800px" :autosize="{ minRows: 3}" v-model="content" placeholder="多个词语用逗号隔开"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { sensitiveGet, sensitiveUpdate } from '@/api/serverConfigure';
export default {
    data() {
        return {
            content: '',
            id: ''
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            let res = await this.$http(sensitiveGet);
            if (res.code === 200) {
                this.content = res.msg.content;
                this.id = res.msg._id;
            }
        },
        async submit() {
            let content = this.content ? this.$splitStr(this.content).join(',') : undefined;
            let res = await this.$http(sensitiveUpdate, { content: content, id: this.id });
            if (res.code === 200) {
                this.$message.success("编辑成功");
                this.loadData();
            }
        },
    }
}
</script>