<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAddRole">添加角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="name" label="角色名" align="center" />
            <el-table-column prop="updateDate" label="更新时间" sortable width="170" :formatter="$dateTimeFm" align="center" />
            <el-table-column prop="dataAuth" label="是否开启数据限制" align="center" :formatter="dataAuthFormat" />
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="showUpdate(scope.row)">编辑</el-button>
                    <!-- <el-button type="text" @click="delRole(scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="dialogRoleTitle" :visible.sync="dialogRole" width="500px">
            <RolePermissions :roleData="roleData" @close="closeRole" v-if="dialogRole" />
        </el-dialog>
    </el-card>
</template>
<script>
import { privileges, createRole, updateRole, getByType, getByParent } from '@/api/account';
import rolePermissions from './rolePermissions';
import { getSession, setSession } from '@/utils/auth';

export default {
    components: {
        RolePermissions: rolePermissions
    },
    data() {
        return {
            roleData: undefined,
            roleId: "",
            page: 1,
            count: 10,
            totalCount: 10,
            pageData: [],
            roleList: [],
            formObj: {},
            dialogRole: false,
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
            let type = getSession("role").type;
            let name = getSession("role").name;
            let query = { page: this.page, count: this.count, type: type };

            let res = await this.$http(getByType, query, true);
            if (res.code === 200) {
                this.pageData = res.msg.data;
                this.totalCount = res.msg.totalCount;
            }
            for (let i = 0; i < this.pageData.length; i++) {
                if (this.pageData[i].name == name) {
                    let userInfo = getSession("role");
                    if (userInfo) {
                        userInfo.pages = this.pageData[i].pages;
                        setSession("role", userInfo);
                        return;
                    }
                }
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
        async showUpdate(row) {
            this.roleData = {
                permissions: row.pages,
                id: row._id,
                name: row.name,
                pidList: row.pidList,
                dataAuth: row.dataAuth
            };

            this.dialogRole = true;
            this.dialogRoleTitle = "编辑角色";

        },

        closeRole() {
            this.dialogRole = false;
            this.loadData();

        },
        showAddRole() {
            this.roleData = {};
            this.dialogRole = true;
            this.dialogRoleTitle = '添加角色';
        },
        dataAuthFormat(row, column, cellValue) {
            if (cellValue === true) {
                return "开启";
            }
            return "关闭";
        },
    }
}
</script>