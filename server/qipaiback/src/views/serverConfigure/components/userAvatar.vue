<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addLine">添加</el-button>
                <el-button type="primary" @click="deleteList">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="url" label="头像" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.urlView" style="width: 100px; height: 100px" :src="scope.row.urlView" :preview-src-list="[scope.row.urlView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading"></div>
                </template>
            </el-table-column>
        </el-table>

        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="新增头像" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="头像(点图上传)" label-width="150px">
                    <ImgUpload :imageUrl="formObj.urlView" :path="UploadPath.HeadImage" @success="uploaded" />
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
import { addUserAvatar, delUserAvatar, getUserAvatar } from '@/api/serverConfigure';
import imgUpload from '@/components/imgUpload.vue';
import { UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
export default {
    props: {
        pid: '',
    },
    components: {
        ImgUpload: imgUpload
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            UploadPath:UploadPath,
            pageData: [],
            multipleSelection: [],
            dialogVisible: false,
            formObj: {}
        };
    },
    async searchData() {
        this.page = 1;
        this.loadData();

    },
    async created() {
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getUserAvatar, { page: this.page, count: this.count, pid: this.pid }, true);
            if (res.code === 200) {
                this.pageData = deepClone(await setImgView(res.msg.pageData, "url"));
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
        async submitForm() {
            let query = { ...this.formObj };
            delete query.urlView;
            let res = await this.$http(addUserAvatar, { pid: this.pid, ...query });
            if (res.code === 200) {
                this.formObj = {};
                this.$message.success("操作成功");
                this.loadData();
                this.dialogVisible = false;
            }
        },
        deleteList() {
            let ids = [];
            for (let index = 0; index < this.multipleSelection.length; index++) {
                const element = this.multipleSelection[index];
                ids.push(element._id);
            }
            this.$confirm(`此操作将批量删除选中数据, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(delUserAvatar, { ids: ids });
                    if (res.code == 200) {
                        this.$message.success("删除成功!");
                        this.loadData();
                        return;
                    }
                })
                .catch(() => {
                    this.$message.info("已取消删除");
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        uploaded(path) {
            this.formObj.url = path;
        },
        addLine() {
            this.dialogVisible = true;
        },
    }
}
</script>
