<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">添加域名</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="domain" align="center" label="跨域域名"></el-table-column>
            <el-table-column :formatter="statusFormatter" prop="status" align="center" label="开启状态"></el-table-column>
            <el-table-column prop="description" align="center" label="描述信息"></el-table-column>
            <el-table-column prop="addUser" align="center" label="创建用户"></el-table-column>
            <el-table-column :formatter="$dateTimeFm" prop="createDate" align="center" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="delLine(scope.row)" type="text" icon="el-icon-delete" size="medium"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="添加跨域域名" :visible.sync="dialogVisible" width="400px">
            <el-form label-width="80px" :model="formObj" ref="forms" :rules="formRules">
                <el-form-item prop="domain" label="跨域域名">
                    <el-input v-model.trim="formObj.domain" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="描述">
                    <el-input type="textarea" :rows="3" v-model.trim="formObj.description" placeholder="请输入"></el-input>
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
import { getCrosDomain, insertCrosDomain, deleteCrosDomain } from '@/api/adminCfg';

export default {
    data() {
        return {
            formRules: {
                domain: [{ required: true, pattern: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/, trigger: 'blur', message: '必须是符合规则的域名' }],
                description: [{ required: true, trigger: 'blur', message: '描述必填' }]
            },
            roleData: undefined,
            roleId: "",
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            roleList: [],
            formObj: {},
            dialogVisible: false,
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
            let query = { pageNo: this.page, pageSize: this.count };
            let res = await this.$http(getCrosDomain, query);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        statusFormatter(row, column, cellValue) {
            switch (cellValue) {
                case 1: return "开启"; break;
                case 0: return "关闭"; break;
                default: return cellValue; break;
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        async submitForm() {
            await this.$refs.forms.validate();
            let res = await this.$http(insertCrosDomain, { ...this.formObj });
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.loadData();
            }
        },
        async delLine(row) {
            await this.$confirm(`即将删除跨域域名： ${row.domain}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteCrosDomain, { _id: row._id });
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