<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="vip等级">
                <el-input v-model="search.vipLevel"></el-input>
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
            <el-table-column prop="vipLevel" label="vip等级" align="center" width="100px"></el-table-column>
            <el-table-column prop="privilegeIds" label="特权配置" align="center" :formatter="formartPrivilege">
            </el-table-column>
            <el-table-column prop="bgImgView" label="封面" align="center" min-width="150">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.bgImgView" :src="scope.row.bgImgView" :preview-src-list="[scope.row.bgImgView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
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
                <el-form-item label="vip等级" v-if="!isUpdate">
                    <el-input v-model="formObj.vipLevel" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="特权配置">
                    <el-select multiple filterable v-model="formObj.privilegeIds" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in privilegesOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图标(base64)">
                    <el-upload class="upload-demo" ref="upload" action="" :on-change="handleChange" :file-list="fileList" :limit="1" :auto-upload="false" accept=".jpg,.jpeg,.png,.JPG,.JPEG">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpeg/png文件，且不超过15kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="封面图(点图上传)" label-width="150px">
                    <ImgUpload v-loading="imgLoading" :element-loading-text="`拼命上传中...`" :imageUrl="formObj.bgImgView" :path='UploadPath.PayInfoImage' ref="serverCfg" @success="uploaded" :isCompress="true" />
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
import { addVipLevelPrivileges, delVipLevelPrivileges, getPrivileges, getVipLevelPrivileges, updateVipLevelPrivileges } from '@/api/serverConfigure';
import imgUpload from '@/components/imgUpload.vue';
import { pidList, UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
export default {
    components: {
        ImgUpload: imgUpload,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            privileges: [],
            privilegesOptions: [],
            pageData: [],
            dialogVisible: false,
            isUpdate: false,
            search: { pid: "A" },
            formObj: {},
            titleName: "新增配置",
            pidList,
            UploadPath,
            imgLoading: false,
            fileList: []
        };
    },
    created() {
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
            let allRet = await Promise.all([
                this.$http(getVipLevelPrivileges, { page: this.page, count: this.count, ...this.search }, true),
                this.$http(getPrivileges, { pid: this.search.pid }, true),
            ]);
            let errRet = allRet.find(e => e.code !== 200);
            if (errRet) {
                this.$message.error("请求错误:" + JSON.stringify(errRet));
                return;
            }
            this.pageData = allRet[0].msg?.pageData || [];
            this.totalCount = allRet[0].msg?.totalCount || 0;
            this.privileges = allRet[1].msg?.pageData || [];
            this.privilegesOptions = this.privileges.map(e => {
                return {
                    label: e.name,
                    value: e._id,
                };
            });
            this.pageData = deepClone(await setImgView(this.pageData, "bgImg"));
        },
        addOne() {
            this.loadData();
            this.dialogVisible = true;
            this.isUpdate = false;
            this.titleName = '新增配置';
            this.formObj = { pid: this.search.pid };
            this.formObj.bgImgView = "";
            this.fileList = [];
        },
        updateOne(row) {
            this.dialogVisible = true;
            this.isUpdate = true;
            this.titleName = '编辑配置';
            this.formObj = deepClone(row);
            this.fileList = [];
        },
        async submitForm() {
            if (this.isUpdate) {
                let data = {
                    id: this.formObj._id,
                    name: this.formObj.name,
                    privilegeIds: this.formObj.privilegeIds,
                    icon: this.formObj.icon,
                    bgImg: this.formObj.bgImg
                };
                delete this.formObj.bgImgView;
                let res = await this.$http(updateVipLevelPrivileges, data);
                if (res.code === 200) {
                    this.$message.success("修改成功");
                    this.dialogVisible = false;
                    this.loadData();
                }
            } else {
                let data = {
                    pid: this.formObj.pid,
                    name: this.formObj.name,
                    vipLevel: this.formObj.vipLevel,
                    privilegeIds: this.formObj.privilegeIds,
                    icon: this.formObj.icon,
                    bgImg: this.formObj.bgImg
                };
                delete this.formObj.bgImgView;
                let res = await this.$http(addVipLevelPrivileges, data);
                if (res.code === 200) {
                    this.dialogVisible = false;
                    this.$message.success("添加成功");
                    this.loadData();
                }
            }
        },
        async onClickDel(row) {
            let res = await this.$http(delVipLevelPrivileges, { id: row._id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        },
        formartPrivilege(row, column, cellValue) {
            let ids = cellValue || [];
            let str = "";
            ids.forEach(e => {
                let find = this.privileges.find(p => p._id === e);
                if (find) {
                    str += find.name + ",";
                } else {
                    str += e + ",";
                }
            });
            return str;
        },
        handleChange(file, fileList) {
            // console.log("flie", file);
            // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            // console.log("flietype", file.type);
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
        async setImg(e, base64) {
            let file2 = await this.compressFile(e);
            e = e.size > file2.size ? file2 : e;

            let formData = new FormData();
            formData.append("file", e);
            this.imgLoading = true;
            try {
                let res = await this.$http(uploadImg, formData, true);
                if (res.code === 200) {
                    this.$message.success("图片上传成功！");
                    this.formObj.bgImg = `${res.msg.path}/${res.msg.fileName}`;
                    this.formObj.bgImgView = base64;
                }
            } catch (error) {

            } finally {
                this.imgLoading = false;
                return;
            }
        },
        uploaded(path) {
            this.formObj.bgImg = path;
        },
    }
};
</script>