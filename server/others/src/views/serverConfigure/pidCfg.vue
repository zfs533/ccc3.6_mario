<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addData">添加</el-button>
                <el-button type="primary" @click="delData">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="prefix" label="渠道前缀" align="center"></el-table-column>
            <el-table-column prop="officialDownloadUrl" label="官网地址" align="center"></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="新增平台" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="项目">
                    <el-input v-model="formObj.pid" placeholder="大写字母"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="formObj.name" placeholder="中文名称"></el-input>
                </el-form-item>
                <el-form-item label="渠道前缀">
                    <el-input v-model="formObj.prefix" placeholder="小写字母"></el-input>
                </el-form-item>
                <el-form-item label="官网下载地址">
                    <el-input v-model="formObj.officialDownloadUrl" placeholder="https://"></el-input>
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
import { addPidCfgData, delPidCfgData, getPidCfgData } from '@/api/serverConfigure';
import { setSession } from "@/utils/auth";
import { pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
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
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createTimeStart = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getPidCfgData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
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
            let res = await this.$http(addPidCfgData, query);
            if (res.code === 200) {
                this.$message.success("操作成功,需要重新登陆更新数据");
                this.dialogVisible = false;
                setSession("pidList", res.msg);
                this.loadData();
            }
        },
        addData(row) {
            this.formObj = {
                pid: "",
                name: "",
                prefix: "",
                officialDownloadUrl: "",
            };
            this.dialogVisible = true;
        },
        async delData() {
            let prompt = await this.$prompt("请输入平台", `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delPidCfgData, { pid: prompt.value ? prompt.value : "" });
            if (res.code === 200) {
                this.$message.success("删除成功,需要重新登陆更新数据");
                setSession("pidList", res.msg);
                this.loadData();
            }
        },

    }
};
</script>
