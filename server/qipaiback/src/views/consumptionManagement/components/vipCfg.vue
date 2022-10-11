<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否上架">
                <el-select v-model="search.bEnable" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in bEnableList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动类型">
                <el-select v-model="search.type" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in VipCfgTacticsTypeEnum" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">新增配置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <!-- <el-table-column prop="pid" label="项目" align="center" width="80" :formatter="$pidFormat"></el-table-column> -->
            <el-table-column prop="index" label="排序" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="payType" label="充值类型" align="center" :formatter="payTypeFormat"></el-table-column>
            <el-table-column prop="bEnable" label="是否上架" align="center" width="100" :formatter="bEnableFormat">
            </el-table-column>
            <el-table-column prop="originalImageMode" label="原图模式" align="center" width="100" :formatter="bEnableFormat"></el-table-column>
            <el-table-column prop="bonusDiamondAmount" label="赠送钻石" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="fontColor" label="字体颜色" align="center"></el-table-column>
            <el-table-column prop="discountRate" label="折扣率" align="center"></el-table-column>
            <el-table-column prop="price" label="购买价格" align="center"></el-table-column>
            <el-table-column prop="originalPrice" label="原价" align="center"></el-table-column>
            <el-table-column prop="vipEffectiveTime" label="vip有效时间(天)" align="center"></el-table-column>
            <el-table-column prop="vipLevelId" label="vip特权等级" align="center" :formatter="vipLevelPrivilegeFromatter"></el-table-column>
            <el-table-column prop="type" label="活动类型" align="center" :formatter="vipCfgTypeFromatter"></el-table-column>
            <el-table-column prop="cycleDay" label="周几" align="center"></el-table-column>
            <el-table-column prop="startDate" label="开始时间" align="center" width="160" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="endDate" label="结束时间" align="center" width="160" :formatter="$dateTimeFm"></el-table-column>

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
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1200px">
            <el-form :model="formObj" ref="forms" :inline="true">
                <!-- <el-form-item v-if="!isUpdate" prop="pid" :rules="{ required: true, message: '项目必选', trigger: 'blur' }" label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in pidList" :key="item.value" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item prop="payType" :rules="{ required: true, message: '充值方式必选', trigger: 'blur' }" label="充值方式">
                    <el-select multiple v-model="formObj.payType" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index" :rules="{ required: true, message: '排序必填', trigger: 'blur' }" label="排序">
                    <el-input v-model="formObj.index"></el-input>
                </el-form-item>
                <el-form-item prop="name" :rules="{ required: true, message: '名称必填', trigger: 'blur' }" label="名称">
                    <el-input v-model="formObj.name"></el-input>
                </el-form-item>
                <el-form-item prop="discountRate" :rules="{ required: true, message: '折扣率必填', trigger: 'blur' }" label="折扣率">
                    <el-input v-model="formObj.discountRate"></el-input>
                </el-form-item>
                <el-form-item prop="vipEffectiveTime" :rules="{ required: true, message: 'vip天数必填', trigger: 'blur' }" label="vip天数">
                    <el-input v-model="formObj.vipEffectiveTime"></el-input>
                </el-form-item>
                <el-form-item prop="privilege" label="特权描述">
                    <el-input v-model="formObj.privilege"></el-input>
                </el-form-item>
                <el-form-item prop="mask" label="角标签">
                    <el-input v-model="formObj.mask"></el-input>
                </el-form-item>
                <el-form-item prop="fontColor" label="字体颜色">
                    <el-input v-model="formObj.fontColor"></el-input>
                </el-form-item>
                <el-form-item prop="bonusDiamondAmount" label="赠送钻石">
                    <el-input v-model="formObj.bonusDiamondAmount"></el-input>
                </el-form-item>
                <el-form-item prop="price" :rules="{ required: true, message: '购买价格必填', trigger: 'blur' }" label="购买价格">
                    <el-input v-model="formObj.price"></el-input>
                </el-form-item>
                <el-form-item prop="originalPrice" label="原价">
                    <el-input v-model="formObj.originalPrice"></el-input>
                </el-form-item>
                <el-form-item prop="bEnable" :rules="{ required: true, message: '是否上架必选', trigger: 'blur' }" label="是否上架">
                    <el-select v-model="formObj.bEnable" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in bEnableList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="originalImageMode" label="是否原图">
                    <el-select v-model="formObj.originalImageMode" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in bEnableList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="originalImageMode" label="是否原图">
                    <el-select v-model="formObj.originalImageMode" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in bEnableList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="description" label="描述">
                    <el-input style="width:500px" v-model="formObj.description" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item prop="vipLevelId" :rules="{ required: true, message: 'vip特权必填', trigger: 'blur' }" label="vip特权等级">
                    <el-select v-model="formObj.vipLevelId" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in vipLevelPrivileges" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="type" label="活动类型">
                    <el-select v-model="formObj.type" placeholder="请选择" style="width:160px">
                        <el-option label="无" :value="undefined"></el-option>
                        <el-option v-for="item in VipCfgTacticsTypeEnum" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" v-if="formObj.type==='Range_Time_Activity'">
                    <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
                </el-form-item>
                <el-form-item prop="cycleDay" label="周几<周末为0>" v-if="formObj.type==='Timed_Period_Activity'">
                    <el-input v-model="formObj.cycleDay"></el-input>
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
import { addOne_vip, getManyPayCfg_vip, updateOne_vip } from '@/api/consumptionManagement';
import { getVipLevelPrivileges } from '@/api/serverConfigure';
import imgUpload from '@/components/imgUpload.vue';
import { goodsType, goodsTypeList, pidList, UploadPath, VipCfgTacticsTypeEnum } from '@/utils/baseConst';
import { dateTimeFm, deepClone, setImgView } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    props: {
        payTypes: Array
    },
    components: {
        ImgUpload: imgUpload,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            formObj: {},
            dialogVisible: false,
            dialogTitle: "添加用户",
            goodsTypeList: goodsTypeList,
            UploadPath:UploadPath,
            VipCfgTacticsTypeEnum: VipCfgTacticsTypeEnum,
            bEnableList: [
                { label: "是", value: true },
                { label: "否", value: false }
            ],
            pidList: pidList,
            GOODSTYPE: goodsType,
            imgLoading: false,
            isUpdate: false,
            vipLevelPrivileges: [],
            dateArr1: [],
        };
    },
    created() {
        this.search.pid =CURRENTPID;
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            this.search.goodsType = 2;
            let allRet = await Promise.all([
                this.$http(getManyPayCfg_vip, { page: this.page, count: this.count, ...this.search }, true),
                this.$http(getVipLevelPrivileges, { pid: CURRENTPID }, true),
            ]);
            let errRet = allRet.find(e => e.code !== 200);
            if (!errRet) {
                this.pageData = allRet[0].msg.pageData;
                this.totalCount = allRet[0].msg.totalCount;
                this.vipLevelPrivileges = (allRet[1].msg?.pageData || []).map(e => { return { label:  e.name, value: e._id }; });
                this.pageData = deepClone(await setImgView(allRet[0].msg.pageData, "bgImg"));
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
        bEnableFormat(row, column, cellValue) {
            let item = this.bEnableList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        goodsTypeFormat(row, column, cellValue) {
            let item = this.goodsTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        payTypeFormat(row, column, cellValue) {
            if (cellValue instanceof Array) {

                let arr = cellValue.map(i => {
                    let obj = this.payTypes.find(j => j.value === i);
                    return obj ? obj.label : i;
                });
                return arr.join(' ');
            }
        },
        async submitForm() {
            await this.$refs.forms.validate();
            delete this.formObj.bgImgView;
            let query = deepClone(this.formObj);
            query.pid = CURRENTPID;
             if (this.dateArr1 && this.dateArr1.length > 1) {
                 if(this.dateArr1[0]&&this.dateArr1[1]){
                    query.startDate = this.dateArr1[0];
                    query.endDate = this.dateArr1[1];
                 }
            }
            let res = {};
            if (query.id) {
                res = await this.$http(updateOne_vip, query);
            }
            else {
                res = await this.$http(addOne_vip, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        showAdd() {
            this.formObj = {};
            this.formObj.bEnable = false;
            this.formObj.originalImageMode = false;
            this.dialogTitle = "新增支付配置";
            this.formObj.bgImgView = "";
            this.dialogVisible = true;
            this.isUpdate = false;
            this.dateArr1 = [];
        },
        async editLine(row) {
            this.loadData();
            this.formObj = deepClone(row);
            this.formObj.id = row._id;
            this.formObj.cycleDay = 0;
            this.formObj.goodsType = 2;
            this.dialogTitle = "编辑支付配置";
            this.dialogVisible = true;
            this.isUpdate = true;
            this.dateArr1=[];
            if (this.formObj.startDate && this.formObj.endDate) {
                this.dateArr1 = [dateTimeFm(this.formObj.startDate), dateTimeFm(this.formObj.endDate)];
            }else{
                delete this.formObj.startDate;
                delete this.formObj.endDate;
            }
        },
        // getQuery() {
        //     query.pid = CURRENTPID;
        // }
        uploaded(path) {
            // console.log(path);
            this.formObj.bgImg = path;
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
        vipLevelPrivilegeFromatter(row, column, cellValue) {
            let item = this.vipLevelPrivileges.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        vipCfgTypeFromatter(row, column, cellValue) {
            let item = this.VipCfgTacticsTypeEnum.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
    }
};
</script>
<style lang="scss" scoped>
.header {
    margin-bottom: 20px;
}

h3 {
    font-size: 16px;
    color: #999;
}
</style>
