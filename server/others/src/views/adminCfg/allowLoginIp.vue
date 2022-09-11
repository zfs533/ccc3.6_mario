<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">添加白名单</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="createTime" label="创建时间" sortable min-width="100" align="center" :formatter="timeFormat"></el-table-column>
            <el-table-column prop="adminIp" label="ip" min-width="100" align="center"></el-table-column>
            <el-table-column prop="operator" label="操作人" min-width="100" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" min-width="100" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="medium" style="margin:0 10px 10px 0" icon="el-icon-delete" @click="delLine(scope.row.adminIp)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加白名单" :visible.sync="dialogVisible" width="400px">
            <el-form label-width="80px">
                <el-form-item label="IP地址">
                    <el-input v-model="formObj.adminIp" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="3" v-model="formObj.description" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addAllowIp, deleteAllowIp, getAllowIp } from '@/api/adminCfg';

export default {
    data() {
        return {
            pageData: [],
            formObj: {},
            dialogVisible: false,
            dialogRoleTitle: "添加角色"
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getAllowIp, {}, true);
            if (res.code === 200) {
                this.pageData = res.msg;
            }
        },
        timeFormat(row, column, cellValue) {//时间格式化
            return this.$dateTimeFm(cellValue);
        },
        async submitForm() {
            let res = await this.$http(addAllowIp, { ...this.formObj });
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        async delLine(ip) {
            await this.$confirm(`即将删除白名单IP： ${ip}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteAllowIp, { adminIp: ip });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        },
        showAdd() {
            this.formObj = {};
            this.dialogVisible = true;
        }
    }
}
</script>