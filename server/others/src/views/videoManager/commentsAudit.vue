<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源id">
                <el-input v-model="search.sourceId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源名称">
                <el-input v-model="search.sourceName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="评论id">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上级评论id">
                <el-input v-model="search.parentId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="一级评论id">
                <el-input v-model="search.rootId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资源类型">
                <el-select v-model="search.type">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in contentEntityType" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="search.status">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in commentStatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评论检索">
                <el-input v-model="content" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否全匹配">
                <el-switch v-model="search.isMacthAll" active-text="全匹配" inactive-text="模糊匹配">
                </el-switch>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="bulkEdit">批量审核</el-button>
            </el-form-item>

        </el-form>
        <el-table :data="pageData" :border="true" @selection-change="handleSelectionChange" min-width="100%">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column prop="sourceId" fixed label="资源id" width="200px" align="center"></el-table-column>
            <el-table-column prop="_id" fixed label="评论id" width="200px" align="center" :formatter="formatObjectId">
            </el-table-column>
            <el-table-column prop="uid" fixed label="用户id" width="100" align="center"></el-table-column>

            <el-table-column prop="createdAt" label="创建时间" width="150px" align="center" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="parentId" label="上级评论id" width="200px" align="center" :formatter="formatObjectId">
            </el-table-column>

            <el-table-column prop="rootId" label="一级评论id" width="200px" align="center" :formatter="formatObjectId">
            </el-table-column>
            <el-table-column prop="sourceName" label="资源名称" show-overflow-tooltip width="100px" align="center">
            </el-table-column>
            <el-table-column prop="type" label="资源类型" width="100" align="center" :formatter="formatType">
            </el-table-column>
            <el-table-column prop="content" label="评论" min-width="300" align="center"></el-table-column>
            <el-table-column prop="commentCnt" label="评论数" width="100" align="center"></el-table-column>
            <el-table-column prop="likedCnt" label="点赞数" width="100" align="center"></el-table-column>
            <el-table-column prop="status" label="审核状态" width="100" align="center" :formatter="formatStatus">
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.status !== 2" style="margin:0 10px 0 0"
                        @click="passOne(scope.row)">通过</el-button>
                    <el-button type="text" v-if="scope.row.status !== 3" style="margin:0 10px 0 0"
                        @click="rejectOne(scope.row)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="批量审核" :visible.sync="dialogVisible" width="600px">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="审核状态">
                    <el-select v-model="formObj.status">
                        <el-option :key="commentStatus[1].value" :label="commentStatus[1].label"
                            :value="commentStatus[1].value">
                        </el-option>
                        <el-option :key="commentStatus[2].value" :label="commentStatus[2].label"
                            :value="commentStatus[2].value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50, 100, 200, 500]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>

<script>
import { comments_getMany, comments_update } from '@/api/videoManager';
import { getBeforeDate } from '@/utils/dateTime';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            search: {},
            formObj: {},
            dateArr1: getBeforeDate('date', 0, 0),
            dialogVisible: false,
            contentEntityType: [
                { label: "图集", value: "atlas" },
                { label: "视频", value: "video" }
            ],
            commentStatus: [
                { label: "审核中", value: 1 },
                { label: "审核通过", value: 2 },
                { label: "审核未通过", value: 3 },
            ],
            content: "",// 匹配内容
            isMaterial: false,
            selectData: [],
        };
    },
    created() {
        // 默认查询通过的评论
        this.search.status = 2;
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createdAtBegin = this.dateArr1[0];
                query.createdAtEnd = this.dateArr1[1];
            }
            if (this.content.length) {
                // let content = this.content.split(",");
                // if (content.length) {
                query.content = [this.content];
                // }
            }

            let res = await this.$http(comments_getMany, { page: this.page, count: this.count, ...query }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        handleSelectionChange(val) {
            this.selectData = val;
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        async updateMany() {
            let res = await this.$http(comments_update, { ...this.formObj }, true);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
            }
        },
        async passOne(row) {
            this.formObj = { commmentIds: [row._id], status: 2 };
            this.updateMany();
        },
        async rejectOne(row) {
            this.formObj = { commmentIds: [row._id], status: 3 };
            this.updateMany();
        },

        formatType(r, a, cellValue) {
            let find = this.contentEntityType.find(e => e.value === cellValue);
            return find ? find.label : cellValue;
        },
        formatStatus(r, a, cellValue) {
            let find = this.commentStatus.find(e => e.value === cellValue);
            return find ? find.label : cellValue;
        },
        formatObjectId(r, a, cellValue) {
            if (!cellValue || cellValue.length !== 24) return "";
            return cellValue;
        },
        bulkEdit() {
            if (this.selectData.length == 0) {
                this.$message.error("请选择修改项");
            } else {
                let idArr = [];
                this.selectData.forEach(element => {
                    idArr.push(element._id);
                });
                this.formObj = { commmentIds: idArr, };
                this.dialogVisible = true;
            }
        },
        submitForm() {
            this.updateMany();
            this.dialogVisible = false;
        }
    }
};
</script>