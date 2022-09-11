<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
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
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">新增配置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="100" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="index" label="排序" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="payType" label="充值类型" align="center" :formatter="payTypeFormat"></el-table-column>
            <el-table-column prop="bEnable" label="是否上架" align="center" width="100" :formatter="bEnableFormat">
            </el-table-column>
            <el-table-column prop="bonusDiamondAmount" label="赠送钻石" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="price" label="购买价格" align="center"></el-table-column>
            <el-table-column prop="originalPrice" label="原价" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1200px">
            <el-form :model="formObj" ref="forms" :inline="true">
                <el-form-item v-if="!isUpdate" prop="pid" :rules="{ required: true, message: '项目必选', trigger: 'blur' }"
                    label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in pidList" :key="item.value" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="payType" :rules="{ required: true, message: '充值方式必选', trigger: 'blur' }"
                    label="充值方式">
                    <el-select multiple v-model="formObj.payType" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="index" label="排序">
                    <el-input v-model="formObj.index"></el-input>
                </el-form-item>
                <el-form-item prop="name" :rules="{ required: true, message: '名称必填', trigger: 'blur' }" label="名称">
                    <el-input v-model="formObj.name"></el-input>
                </el-form-item>
                <el-form-item prop="diamondAmount" :rules="{ required: true, message: '钻石数量必填', trigger: 'blur' }"
                    label="钻石数量">
                    <el-input v-model="formObj.diamondAmount"></el-input>
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
                <el-form-item prop="bEnable" :rules="{ required: true, message: '是否上架必选', trigger: 'blur' }"
                    label="是否上架">
                    <el-select v-model="formObj.bEnable" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in bEnableList" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="description" label="描述">
                    <el-input style="width:500px" v-model="formObj.description" placeholder="请输入"></el-input>
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
import { addOne_diamond, getManyPayCfg_diamond, updateOne_diamond } from '@/api/consumptionManagement';
import { goodsType, goodsTypeList, pidList, vipTypeList } from '@/utils/baseConst';
import { deepClone } from '@/utils/formatter';

export default {
    props: {
        payTypes: Array
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
            isUpdate: false,
            goodsTypeList: goodsTypeList,
            bEnableList: [
                { label: "是", value: true },
                { label: "否", value: false }
            ],
            vipTypeList: vipTypeList,
            pidList: pidList,
            GOODSTYPE: goodsType,
        };
    },
    created() {
        this.search.pid = "A";
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getManyPayCfg_diamond, { page: this.page, count: this.count, ...this.search }, true);
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
        bEnableFormat(row, column, cellValue) {
            let item = this.bEnableList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        vipTypeFormat(row, column, cellValue) {
            let item = this.vipTypeList.find(i => i.value === cellValue);
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
            let query = deepClone(this.formObj);
            let res = {};
            if (query.id) {
                res = await this.$http(updateOne_diamond, query);
            }
            else {
                res = await this.$http(addOne_diamond, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        showAdd() {
            this.formObj = {};
            this.dialogTitle = "新增支付配置";
            this.dialogVisible = true;
            this.isUpdate = false;
        },
        async editLine(row) {
            this.formObj = deepClone(row);
            this.formObj.id = row._id;
            this.dialogTitle = "编辑支付配置";
            this.dialogVisible = true;
            this.isUpdate = true;
        }
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
