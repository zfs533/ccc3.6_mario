<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="hint">excel文件的密码是：当前登录的后台账号所对应的密码</div>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="path" label="导出模块" align="center" width="160"></el-table-column>
            <el-table-column prop="startDate" label="开始时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
            <!-- <el-table-column prop="finishDate" label="结束时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column> -->
            <el-table-column prop="state" label="状态" align="center" :formatter="stateFormat"></el-table-column>
            <el-table-column prop="reason" label="原因" align="center"></el-table-column>
            <el-table-column prop="opt" label="导出人" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.state==='success'" @click="downLoad(scope.row)">下载</el-button>
                    <el-button type="text" v-if="timeOut(scope.row.startDate)" @click="deleteLine(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getExportInfo, delExport } from '@/api/logsManager';
import { getSession } from '@/utils/auth';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            stateList: [
                { value: "init", label: "创建任务" },
                { value: "exporting", label: "导出中" },
                { value: "fail", label: "失败" },
                { value: "success", label: "成功" },
            ]
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
            let res = await this.$http(getExportInfo, { page: this.page, count: this.count });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
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

        stateFormat(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        timeOut(date) {
            let now = new Date();
            date = new Date(date);
            let loginTime = new Date(date);
            let cha = 1000 * 60 * 60 * 2;
            if (now - loginTime > cha) {
                return true;
            } else {
                return false;
            }
        },
        async deleteLine(id) {
            await this.$confirm(`即将删除该任务，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delExport, { id: id });
            if (res.code === 200) {
                this.$message.success("删除成功");
            }
        },
        downLoad(row) {
            let url = `${getSession("src") || ""}/web/export/${row.fileName}`;
            let link = document.createElement('a');
            link.href = url;
            link.download = url;
            link.click();
        }
    }
}
</script>
<style lang="scss" scoped>
.hint {
    margin: 10px 0;
    color: #f00;
}
</style>