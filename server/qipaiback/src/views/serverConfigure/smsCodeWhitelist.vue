<template>
    <el-card>
        <el-form :inline="false" style="width:850px">
            <el-form-item>
                <el-button type="primary" @click="loadData">读取</el-button>
                <el-button type="danger" @click="submit">提交编辑</el-button>
            </el-form-item>
            <el-form-item label="短信验证白名单">
                <el-input type="textarea" style="width:800px" :autosize="{ minRows: 3}" v-model="content" placeholder="多个词语用逗号隔开"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { getSmsCodeWhitelist, postSmsCodeWhitelist } from '@/api/serverConfigure';
export default {
    data() {
        return {
            content: '',
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            let res = await this.$http(getSmsCodeWhitelist);
            if (res.code === 200) {
                this.pageData = res.msg;

                let phones = res.msg.map((item, idx) => {
                    return item.phone;
                });
                phones = phones.join('\n');
                this.content = phones;


            }
        },
        async submit() {
            let content = this.content ? this.$splitStr(this.content) : undefined;
            let res = await this.$http(postSmsCodeWhitelist, { phones: content, });
            if (res.code === 200) {
                this.$message.success("编辑成功");
                this.loadData();
            }
        },
    }
}
</script>