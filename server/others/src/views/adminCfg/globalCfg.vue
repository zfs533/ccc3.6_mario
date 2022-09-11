<template>
    <el-card class="box-card">
        <el-form class="cardeare">
            <el-form-item prop="chgChannelLimitDays" label="用户渠道修改注册周期">
                <el-input v-model="formObj.chgChannelLimitDays" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item prop="loginHiddenAuthSwitch" label="外部后台登陆验证开关">
                <el-switch v-model="formObj.loginHiddenAuthSwitch" />
            </el-form-item>
            <el-form-item prop="withdrawPids" label="推广提现的平台">
                <el-checkbox-group v-model="formObj.withdrawPids">
                    <el-checkbox v-for="item in pidList" :label="item.pid" :key="item.pid">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="auditPassPids" label="推广自动过审平台">
                <el-checkbox-group v-model="formObj.auditPassPids">
                    <el-checkbox v-for="item in pidList" :label="item.pid" :key="item.pid">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="资源地址(多个按行分开)">
                <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.resourceUrl"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">读取</el-button>
                <el-button type="primary" @click="submitForm">提交修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { getGlobalCfg, updateGlobalCfg } from '@/api/adminCfg';
import { pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            formObj: {},
            pidList: pidList,
        };
    },
    created() {
        this.loadData();

    },
    methods: {
        searchData() {
            this.loadData();

        },
        async loadData() {
            let res = await this.$http(getGlobalCfg, {});
            if (res.code === 200) {
                this.formObj = {
                    chgChannelLimitDays: res.msg.chgChannelLimitDays,
                    loginHiddenAuthSwitch: res.msg.loginHiddenAuthSwitch,
                    withdrawPids: res.msg.withdrawPids,
                    auditPassPids: res.msg.auditPassPids,
                    ipLimit: res.msg.ipLimit,
                    ipStep: res.msg.ipStep,
                    resourceUrl: res.msg?.resourceUrl.join("\n"),
                };
                // 设置资源地址
                setSession("src", res.msg.resourceUrl);
            }
        },
        async submitForm() {
            let query = {
                ipLimit: this.formObj.ipLimit,
                ipStep: this.formObj.ipStep,
                chgChannelLimitDays: this.formObj.chgChannelLimitDays,
                loginHiddenAuthSwitch: this.formObj.loginHiddenAuthSwitch,
                withdrawPids: this.formObj.withdrawPids || [],
                auditPassPids: this.formObj.auditPassPids || [],
                resourceUrl: this.$splitStr(this.formObj.resourceUrl),
            };
            let res = await this.$http(updateGlobalCfg, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
            }
        }
    }
};
</script>
<style>
.cardeare {
    padding: 18px 0;
}

.box-card {
    width: 800px;
}
</style>