<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="名称">
                <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="编码">
                <el-input v-model="search.code"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addOne">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="100px" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center" width="200px"></el-table-column>
            <el-table-column prop="code" label="编码" align="center" width="100px"></el-table-column>
            <el-table-column prop="desc" label="描述" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.icon"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="updateOne(scope.row)">修改</el-button>
                    <el-button type="danger" @click="onClickDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="titleName" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="编码" v-if="!isUpdate">
                    <el-input v-model="formObj.code" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="formObj.desc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="图标(base64)">
                    <el-upload class="upload-demo" ref="upload" action="" :on-change="handleChange" :file-list="fileList" :limit="1" :auto-upload="false" accept=".jpg,.jpeg,.png,.JPG,.JPEG">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpeg/png文件，且不超过15kb</div>
                    </el-upload>
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
import { addPrivileges, delPrivileges, getPrivileges, updatePrivileges } from '@/api/serverConfigure';
import { pidList } from '@/utils/baseConst';
import { deepClone } from '@/utils/formatter';
export default {
    components: {

    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            dialogVisible: false,
            isUpdate: false,
            search: { pid: "A" },
            formObj: {},
            titleName: "新增特权",
            pidList,
            fileList: []
        };
    },
    async created() {
        this.page = 1;
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            if (!this.search.pid) {
                this.$message.error("请选择项目");
                return;
            }
            let res = await this.$http(getPrivileges, { page: this.page, count: this.count, ...this.search }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        addOne() {
            this.dialogVisible = true;
            this.isUpdate = false;
            this.titleName = '新增特权';
            this.fileList = [];
            this.formObj = { pid: this.search.pid };
        },
        updateOne(row) {
            this.dialogVisible = true;
            this.isUpdate = true;
            this.titleName = '编辑特权';
            this.fileList = [];
            this.formObj = deepClone(row);
        },
        async submitForm() {
            if (this.isUpdate) {
                let data = {
                    id: this.formObj._id,
                    name: this.formObj.name,
                    desc: this.formObj.desc,
                    icon: this.formObj.icon
                };
                let res = await this.$http(updatePrivileges, data);
                if (res.code === 200) {
                    this.$message.success("修改成功");
                    this.dialogVisible = false;
                    this.loadData();
                }
            } else {
                let data = {
                    pid: this.formObj.pid,
                    code: this.formObj.code,
                    name: this.formObj.name,
                    desc: this.formObj.desc,
                    icon: this.formObj.icon,
                };
                let res = await this.$http(addPrivileges, data);
                if (res.code === 200) {
                    this.$message.success("添加成功");
                    this.dialogVisible = false;
                    this.loadData();
                }
            }
        },
        async onClickDel(row) {
            let res = await this.$http(delPrivileges, { id: row._id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        },
        handleChange(file, fileList) {
            // console.log("flie", file);
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            // if (!isJPG) {
            //     this.$message.error('上传图片只能是 jpeg/png 格式!');
            //     return;
            // }
            const isLt2M = file.size / 1024 < 15;
            if (!isLt2M) {
                this.fileList = [];
                this.$message.error('上传图片大小不能超过 15K!');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = (e) => {
                const base64String = reader.result;
                // .replace('data:', '')
                // .replace(/^.+,/, '');
                this.formObj.icon = base64String;
                this.$message.success('图片解析成功');
                // console.log("加载成功", base64String);
                // console.log(base64String);
            };
        },

    }
};
</script>
