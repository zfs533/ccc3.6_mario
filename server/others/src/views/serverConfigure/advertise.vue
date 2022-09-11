<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="广告位置">
                <el-select v-model="search.pos" placeholder="请选择广告位置">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in PosType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型">
                <el-select v-model="search.type" placeholder="请选择广告类型">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in AdType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addLine">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="pos" label="广告位置" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="type" label="广告类型" align="center" :formatter="adTypeFormat"></el-table-column>
            <el-table-column prop="url" label="跳转地址" align="center" width="300"></el-table-column>
            <el-table-column prop="coverUrl" label="封面图片" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.coverUrlView" :src="scope.row.coverUrlView" :preview-src-list="[scope.row.coverUrlView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="index" label="排序" align="center" width="100"></el-table-column>
            <el-table-column prop="enable" label="是否开启" align="center" :formatter="formatBoolean" width="100">
            </el-table-column>
            <el-table-column prop="opt" label="操作人" align="center" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                    <el-button type="text" style="margin:0 10px 0 0" @click="deleteLine(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="this.title" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置">
                    <el-select v-model="formObj.pos" placeholder="请选择广告位置">
                        <el-option v-for="item in PosType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="广告类型">
                    <el-select v-model="formObj.type" placeholder="请选择广告类型">
                        <el-option v-for="item in AdType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转类型">
                    <el-select v-model="JumpModel" placeholder="请选择广告类型" @change="selectChange">
                        <el-option label="自填" :value="undefined"></el-option>
                        <el-option v-for="item in JumpType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频id" v-if="isPlay">
                    <el-input v-model="vid" placeholder="请输入" @change="vidInputChange"></el-input>
                </el-form-item>
                <el-form-item label="视频类型" v-if="isPlay">
                    <el-select v-model="playType" placeholder="请选择广告类型" @change="vidInputChange">
                        <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转地址">
                    <el-input v-model="formObj.url" placeholder="请输入" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="封面图(点图上传)" label-width="150px">
                    <ImgUpload :imageUrl="formObj.coverUrlView" :path="UploadPath.AdsImage" @success="uploaded" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input type="number" v-model="formObj.index" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="是否开启">
                    <el-radio-group v-model="formObj.enable">
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
import { addAdvertise, deleteAdvertise, getAdvertiseData, updateAdvertise } from '@/api/serverConfigure';
import imgUpload from '@/components/imgUpload.vue';
import { AdType, JumpType, pidList, PosType, timeTypeList, UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
export default {
    components: {
        ImgUpload: imgUpload
    },
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
            dialogVisible: false,
            PosType: PosType,
            UploadPath:UploadPath,
            AdType: AdType,
            JumpType: JumpType,
            timeTypeList: timeTypeList,
            isPlay: false,
            title: "新增",
            playType: 2,
            JumpModel: undefined,
            vid: '',
            isDisabled: false,
            copyUrl: ""
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
                query.createdDateStart = this.dateArr1[0];
                query.createdDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getAdvertiseData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = deepClone(await setImgView(res.msg.pageData, "coverUrl"));
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
        typeFormat(row, column, cellValue) {
            let item = this.PosType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        adTypeFormat(row, column, cellValue) {
            let item = this.AdType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        async submitForm() {
            let query = { ...this.formObj };
            /* if (this.JumpModel == undefined) {
                var regexp = /^(http|https):\/\//;
                if (query.url && !regexp.test(query.url)) {
                    this.$message.error("跳转地址需以http://或者https://开头");
                    return;
                }
            } */
            delete query.coverUrlView;
            let res = {};
            if (query.id) {
                res = await this.$http(updateAdvertise, query);
            } else {
                res = await this.$http(addAdvertise, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.formObj = {};
                this.loadData();
            }
        },
        editLine(row) {
            this.initialization();
            this.title = "编辑";
            this.formObj = {
                pid: row.pid,
                id: row._id,
                pos: row.pos,
                index: row.index,
                name: row.name,
                url: row.url,
                coverUrl: row.coverUrl,
                coverUrlView: row.coverUrlView,
                enable: row.enable,
                type: row.type,
            };
            this.copyUrl = row.url;
            this.dialogVisible = true;
        },
        addLine() {
            this.initialization();
            this.formObj = { pid: 'A', enable: true, url: '' };
            this.dialogVisible = true;
        },
        uploaded(path) {
            this.formObj.coverUrl = path;
        },
        async deleteLine(row) {
            await this.$confirm(`确认删除吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteAdvertise, { id: row._id });
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
                this.dialogVisible = false;
            }
        },
        selectChange(val) {
            switch (val) {
                case undefined: this.isDisabled = false; this.isPlay = false;
                    break;
                case 1: this.formObj.url = "/customer"; this.isDisabled = true; this.isPlay = false;
                    break;
                case 2: this.isPlay = true; this.isDisabled = true; this.isPlay = true; this.isShortVideo(this.copyUrl);
                    break;
                case 3: this.formObj.url = "/vip"; this.isDisabled = true; this.isPlay = false;
                    break;
                case 4: this.formObj.url = "/recharge/diamondRecharge"; this.isDisabled = true; this.isPlay = false;
                    break;
                default: this.formObj.url = "/recharge/vipRecharge"; this.isDisabled = true; this.isPlay = false;
                    break;
            }
        },
        vidInputChange(val) {
            if (this.playType == 2) {//长视频
                this.formObj.url = `/play?vid=${this.vid}`;
            } else {
                this.formObj.url = `/short/play?vid=${this.vid}`;
            }
        },
        initialization() {//初始化
            this.isDisabled = false;
            this.isPlay = false;
            this.JumpModel = undefined;
            this.vid = "";
            this.playType = 2;
        },
        isShortVideo(url) {
            if (url.indexOf('/short/play?') > -1) {
                this.vid = url.substring(url.indexOf('vid=') + 4);
                this.playType = 3;
                this.formObj.url = url;
                return;
            }
            if (url.indexOf('/play?') > -1) {
                this.vid = url.substring(url.indexOf('vid=') + 4);
                this.playType = 2;
                this.formObj.url = url;
                return;
            }
            this.formObj.url = "";
        }
    }
};
</script>
