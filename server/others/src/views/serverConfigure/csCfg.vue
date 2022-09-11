<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <!--   <el-form-item label="是否开启">
                <el-select v-model="search.active">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="httpUrl" label="请求地址" align="center"></el-table-column>
            <el-table-column prop="active" label="是否开启" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="编辑客服配置" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="请求地址">
                    <el-input v-model="formObj.httpUrl" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="是否开启">
                    <el-radio-group v-model="formObj.active">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
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
import { getCsCfgData, updateCsCfg } from '@/api/serverConfigure';
import { pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            pidList: pidList,
            formObj: {},
            dialogVisible: false
        };
    },
    async created() {
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();

        },
        getQuery() {
            let query = { ...this.search };
            return query;
        },
        async loadData() {
            let res = await this.$http(getCsCfgData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg;
                this.totalCount = res.msg.length;
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        formatBoolean(row, column, cellValue) {
            let ret = '';
            if (cellValue) {
                ret = "是";
            } else {
                ret = "否";
            }
            return ret;
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(updateCsCfg, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = {
                pid: row.pid,
                httpUrl: row.httpUrl,
                name: row.name,
                active: row.active,
            };
            this.dialogVisible = true;
        }
    }
}
</script>
