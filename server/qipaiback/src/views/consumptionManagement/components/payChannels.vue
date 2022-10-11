<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="充值类型">
                <el-select v-model="search.payType" placeholder="请选择" @change="changePayType($event, 0)">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="(item) in payTypes" :key="item._id" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值通道">
                <el-select v-model="search.channel" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="(item) in payChannelsList" :key="item._id" :label="item.label"
                        :value="item.channel"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签名称">
                <el-input v-model="search.markName"></el-input>
            </el-form-item>
            <el-form-item label="通道开关">
                <el-select v-model="search.active" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="开" :value="true"></el-option>
                    <el-option label="关" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">新增配置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <!-- <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.pids" :key="item">{{ $pidFormat(item) }}</div>
                </template>
            </el-table-column> -->
            <el-table-column prop="index" label="排序" align="center"></el-table-column>
            <el-table-column prop="weight" label="权重" align="center"></el-table-column>
            <el-table-column prop="active" label="开关" align="center" :formatter="activeFormat"></el-table-column>
            <el-table-column prop="channel" label="充值通道" align="center"></el-table-column>
            <el-table-column prop="markName" label="标签名字" align="center"></el-table-column>
            <el-table-column prop="maxMoney" label="最大金额" align="center"></el-table-column>
            <el-table-column prop="minMoney" label="最小金额" align="center"></el-table-column>
            <el-table-column prop="moneyRange" label="金额范围" align="center" :formatter="moneyRangeFormat">
            </el-table-column>
            <el-table-column prop="payType" label="充值类型" align="center" :formatter="payTypeFormat"></el-table-column>
            <el-table-column prop="rate" label="费率" align="center"></el-table-column>
            <el-table-column prop="extra.instructionUrlView" label="充值教程" align="center" min-width="150">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.extra.instructionUrlView" style="width: 100px; height: 100px"
                        :src="scope.row.extra.instructionUrlView"
                        :preview-src-list="[scope.row.extra.instructionUrlView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else
                        v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                    <el-button type="text" style="margin:0 10px 0 0" @click="deleteLine(scope.row)">删除</el-button>
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
                <template v-if="!formObj.id">
                    <el-form-item prop="payType" :rules="{ required: true, message: '充值方式必选', trigger: 'blur' }"
                        label="充值方式">
                        <el-select v-model="formObj.payType" placeholder="请选择" style="width:300px"
                            @change="changePayType($event, 1)">
                            <el-option v-for="item in payTypes" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="channel" :rules="{ required: true, message: '充值通道必选', trigger: 'blur' }"
                        label="充值通道">
                        <el-select v-model="formObj.channel" placeholder="请选择">
                            <el-option v-for="(item) in payChannelsList" :key="item._id" :label="item.label"
                                :value="item.channel"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="充值方式">
                        {{ formObj.payType }}
                    </el-form-item>
                    <el-form-item label="充值通道">
                        {{ formObj.channel }}
                    </el-form-item>
                </template>
                <el-form-item prop="markName" :rules="{ required: true, message: '标签名称必填', trigger: 'blur' }"
                    label="标签名称">
                    <el-input v-model="formObj.markName"></el-input>
                </el-form-item>
                <el-form-item prop="active" :rules="{ required: true, message: '通道开关必选', trigger: 'blur' }"
                    label="通道开关">
                    <el-select v-model="formObj.active" placeholder="请选择">
                        <el-option label="开" :value="true"></el-option>
                        <el-option label="关" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="moneyRange" :rules="{ required: true, message: '金额范围必填', trigger: 'blur' }"
                    label="金额范围">
                    <el-input v-model="formObj.moneyRange" placeholder="多个金额以英文逗号隔开(,)" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item prop="minMoney" :rules="{ required: true, message: '最小金额必填', trigger: 'blur' }"
                    label="最小金额">
                    <el-input v-model="formObj.minMoney"></el-input>
                </el-form-item>
                <el-form-item prop="maxMoney" :rules="{ required: true, message: '最大金额必填', trigger: 'blur' }"
                    label="最大金额">
                    <el-input v-model="formObj.maxMoney"></el-input>
                </el-form-item>
                <el-form-item prop="rate" :rules="{ required: true, message: '费率必填', trigger: 'blur' }" label="费率">
                    <el-input type="number" v-model="formObj.rate"></el-input>
                </el-form-item>
                <el-form-item prop="index" :rules="{ required: true, message: '排序必填', trigger: 'blur' }" label="排序">
                    <el-input type="number" v-model.number="formObj.index"></el-input>
                </el-form-item>
                <el-form-item prop="weight" :rules="{ required: true, message: '权重必填', trigger: 'blur' }" label="权重">
                    <el-input type="number" v-model.number="formObj.weight"></el-input>
                </el-form-item>
                <br>
                <!-- <el-form-item prop="pids" :rules="{ required: true, message: '绑定项目必填', trigger: 'blur' }" label="绑定项目">
                    <el-checkbox-group v-model="formObj.pids">
                        <el-checkbox v-for="item in pidList" :label="item.pid" :key="item.pid">{{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
                <br>
                <el-form-item label="充值教程">
                    <ImgUpload :imageUrl="formObj.extra ? formObj.extra.instructionUrlView : '' " :path='UploadPath.PayInfoImage' @success="uploaded" />
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
import { addOneChannel, deleteOneChannel, getAllChannel, getManyChannel, updateOneChannel } from '@/api/consumptionManagement';
import imgUpload from '@/components/imgUpload.vue';
import { pidList, UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
export default {
    props: {
        payTypes: Array
    },
    components: {
        ImgUpload: imgUpload
    },
    data() {
        return {
            search: { channel: undefined },
            dialogTitle: "新增配置",
            dialogVisible: false,
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            formObj: { channel: undefined },
            payChannelsList: [],
            pidList: pidList,
            UploadPath:UploadPath,
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
            let res = await this.$http(getManyChannel, { page: this.page, count: this.count, ...this.search }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.pageData = deepClone(await setImgView(res.msg.pageData, 'extra.instructionUrl'));

            }
        },
        changePayType(val, type) {
            if (type === 0) {
                this.search.channel = undefined;
            }
            if (type === 1) {
                delete this.formObj.channel;
            }
            this.getChannels(val);
        },
        async getChannels(val) {
            let res = await this.$http(getAllChannel, { type: "recharge", payType: val }, true);
            if (res.code === 200 && res.msg) {
                this.payChannelsList = res.msg;
            }
        },
        activeFormat(row, column, cellValue) {
            return cellValue ? "开" : "关";
        },
        payTypeFormat(row, column, cellValue) {
            let item = this.payTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        moneyRangeFormat(row, column, cellValue) {
            if (cellValue instanceof Array) {
                return cellValue ? cellValue.join(',') : cellValue;
            }
        },
        async editLine(row) {
            this.formObj = deepClone(row);
            this.formObj.id = row._id;
            this.formObj.moneyRange = row.moneyRange ? row.moneyRange.join(',') : '';
            this.dialogTitle = "编辑配置";
            this.dialogVisible = true;
        },

        async deleteLine(row) {
            // console.log('row = ', row);
            await this.$confirm(`即将删除充值通道： ${row.markName}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteOneChannel, { id: row._id });
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
                this.dialogVisible = false;
            }
        },

        uploaded(path) {
            this.formObj.extra = { instructionUrl: path };
        },
        async submitForm() {
            await this.$refs.forms.validate();
            let query = { ...this.formObj };
            if (!query.extra) {
                query.extra = { instructionUrl: '' };
            }
            if (query.extra.instructionUrlView) {
                delete query.extra.instructionUrlView;
            }
            query.moneyRange = this.$splitStr(query.moneyRange);
            let res = {};
            if (query.id) {
                res = await this.$http(updateOneChannel, query);
            }
            else {
                res = await this.$http(addOneChannel, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
                this.dialogVisible = false;
            }
        },
        showAdd() {
            this.formObj = { weight: 0 };
            this.dialogTitle = "新增配置";
            this.dialogVisible = true;
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        }
    }
};
</script>