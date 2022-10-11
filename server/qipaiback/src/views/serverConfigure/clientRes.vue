<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="开关">
                <el-switch v-model="formObj.enable" />
            </el-form-item> -->
            <el-form-item label="编码">
                <el-input v-model="search.code" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <!-- <el-button type="primary" @click="addOne">新增</el-button> -->
            </el-form-item>

        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid"  label="项目" width="100px" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="enable"  label="开关" width="50px" align="center" :formatter="booleanFormat"></el-table-column>
            <el-table-column prop="code"  label="编码" width="200px" align="center" ></el-table-column>
            <el-table-column prop="des"  label="描述"  align="center"></el-table-column>
            <el-table-column prop="imgUrl" label="资源地址"  align="center" ></el-table-column>
             <el-table-column prop="url" label="头像" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.imgUrlView" style="width: 100px; height: 100px" :src="scope.row.imgUrlView" :preview-src-list="[scope.row.imgUrlView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading"></div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.status !== 2" style="margin:0 10px 0 0"
                        @click="editOne(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
   <el-dialog :title="this.title" :visible.sync="dialogVisible" width="600px">
            <el-form label-position="top" label-width="100px">
                <el-form-item label="项目" v-if="!isUpdate">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="编码">
                    <el-input v-model="formObj.code" placeholder="编码为英文字母" :disabled="isUpdate" ></el-input>
                </el-form-item>
                <el-form-item label="开关">
                    <el-switch v-model="formObj.enable" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input  v-model="formObj.des" placeholder="描述" :disabled="isUpdate"></el-input>
                </el-form-item>
                <el-form-item label="资源图片(点图上传)">
                    <ImgUpload :imageUrl="formObj.imgUrlView" :path="UploadPath.IconImage" :isCompress="true"
                        @success="uploaded" />
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
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>

<script>
import { clientRes_addOne, clientRes_getMany, clientRes_update } from '@/api/videoManager';
import imgUpload from '@/components/imgUpload.vue';
import { pidList, UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
     components: {
        ImgUpload: imgUpload,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            search: {},
            formObj: {},
            pidList:pidList,
            UploadPath:UploadPath,
            dialogVisible: false,
            isUpdate:false,
            title:"",
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
            let query = { ...this.search };
            query.pid=CURRENTPID;
            let res = await this.$http(clientRes_getMany, { page: this.page, count: this.count, ...query }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.pageData = deepClone(await setImgView(res.msg.pageData, "imgUrl"));
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
        uploaded(path) {
            this.formObj.imgUrl = path;
        },
        async editOne(row) {
            this.title="编辑"
            this.isUpdate=true;
            this.formObj = {
                    id:row._id,
                    pid:row.pid,
                    enable:row.enable,
                    code:row.code,
                    des:row.des,
                    imgUrl :row.imgUrl,
                    imgUrlView:row.imgUrlView
                };
            this.dialogVisible=true;
        },
        async addOne() {
            this.title="添加"
            this.isUpdate=false;
            this.formObj={pid:CURRENTPID};
            this.dialogVisible=true;
        },
        booleanFormat(row, column, cellValue) {
            return cellValue ? "开" : "关";
        },

        formatObjectId(r, a, cellValue) {
            if (!cellValue || cellValue.length !== 24) return "";
            return cellValue;
        },

        async submitForm() {
            let query = { ...this.formObj };
            delete query.imgUrlView;
            if(this.isUpdate){
                let res = await this.$http(clientRes_update, { ...this.formObj }, true);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            }else{
                let res = await this.$http(clientRes_addOne, { ...this.formObj }, true);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            }
        }
    }
};
</script>
