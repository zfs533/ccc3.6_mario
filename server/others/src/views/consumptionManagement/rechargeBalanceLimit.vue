<template>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="外部充值预警" name="first">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="twoSearchData">刷新</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="twoPageData" :border="true" min-width="100%">
                    <el-table-column prop="channel" label="充值渠道" align="center">

                    </el-table-column>
                    <el-table-column prop="todayRecharge" align="center">
                        <template slot="header">
                            <el-tooltip class="item" effect="dark" content="大概数据" placement="top-start">
                                <span>今日总充值...</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="recharge" align="center">
                        <template slot="header">
                            <el-tooltip class="item" effect="dark" content="上次提现到本次更新时间的充值金额" placement="top-start">
                                <span>充值金额...</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="withdraw" label="今日兑换金额" align="center"></el-table-column>
                    <el-table-column prop="balance" label="同步三方余额" align="center"></el-table-column>
                    <el-table-column prop="sumDate" label="统计日期" align="center" :formatter="$dateTimeFm"></el-table-column>
                    <el-table-column prop="withdrawDate" label="上次提现日期" align="center" :formatter="$dateTimeFm"></el-table-column>
                    <el-table-column prop="updateDate" label="本次更新时间" align="center" :formatter="$dateTimeFm"></el-table-column>
                    <el-table-column prop="modifier" label="操作人" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" style="margin:0 10px 0 0" @click="twoEditLine(scope.row)">提现</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col class="toolbar2">
                    <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="twoHandleCurrentChange" @size-change="twoHandleSizeChange" :current-page="twoPage" :page-sizes="[10,20,30,50]" :page-size="twoCount" :total="twoTotalCount"></el-pagination>
                </el-col>
                <el-dialog title="提现" :visible.sync="twoDialogVisible" width="400px" @close="viewClose">
                    <el-form :model="twoFormObj" ref="twoFormObj" :inline="false" label-width="120px">
                        <el-form-item prop="withdraw" :rules="{required: true, message: '本次提现金额必填', trigger: 'blur'}" label="本次提现金额">
                            <el-input type="number" v-model="twoFormObj.withdraw"></el-input>
                        </el-form-item>
                        <el-form-item prop="balance" :rules="{required: true, message: '第三方余额必填', trigger: 'blur'}" label="第三方余额">
                            <el-input type="number" v-model="twoFormObj.balance"></el-input>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="twoDialogVisible=false">取 消</el-button>
                        <el-button type="primary" @click="twoSubmitForm">确 定</el-button>
                    </div>
                </el-dialog>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="预警配置" name="second">
            <el-card>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="searchData">查询</el-button>
                        <el-button type="primary" @click="showAdd">新增配置</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="pageData" :border="true" min-width="100%">
                    <el-table-column prop="channel" label="充值渠道" align="center"></el-table-column>
                    <el-table-column prop="active" label="开关" align="center" :formatter="boolFormat"></el-table-column>
                    <el-table-column prop="balanceLimit" label="预警金额" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col class="toolbar2">
                    <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
                </el-col>
                <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="400px">
                    <el-form :model="formObj" ref="forms" :inline="false" label-width="80px">
                        <!--   <el-form-item v-if="!formObj.id" prop="channel" :rules="{required: true, message: '充值渠道必填', trigger: 'blur'}" label="充值渠道">
                            <el-input v-model="formObj.channel"></el-input>
                        </el-form-item> -->
                        <el-form-item label="充值渠道">
                            <el-select v-model="formObj.channel" placeholder="请选择充值渠道">
                                <el-option v-for="item in channelList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="active" :rules="{required: true, message: '开关必选', trigger: 'blur'}" label="开关">
                            <el-select v-model="formObj.active" placeholder="请选择">
                                <el-option v-for="item in boolList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="balanceLimit" :rules="{required: true, message: '预警金额必填', trigger: 'blur'}" label="预警金额">
                            <el-input type="number" v-model="formObj.balanceLimit"></el-input>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible=false">取 消</el-button>
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                    </div>
                </el-dialog>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import { rechargeBalanceLimitCfgGet, rechargeBalanceLimitCfgUpdate, rechargeBalanceLimitCfgAdd, outChannelGetMany, outChannelWithdraw, getChannels } from '@/api/consumptionManagement';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            formObj: {},
            dialogVisible: false,
            dialogTitle: "添加用户",
            boolList: [
                { label: "开", value: true },
                { label: "关", value: false }
            ]
            , activeName: 'first',
            twoPage: 1,
            twoCount: 10,
            twoTotalCount: 0,
            twoPageData: [],
            twoFormObj: {},
            twoDialogVisible: false,
            channelList: []
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
            let resTwo = await this.$http(outChannelGetMany, { page: this.twoPage, count: this.twoCount });
            if (resTwo.code === 200) {
                this.twoPageData = resTwo.msg.pageData;
                this.twoTotalCount = resTwo.msg.totalCount;
            }
            let res = await this.$http(rechargeBalanceLimitCfgGet, { page: this.page, count: this.count });
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
        boolFormat(row, column, cellValue) {
            let item = this.boolList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        async submitForm() {
            await this.$refs.forms.validate();
            let query = { ...this.formObj };
            let res = {};
            if (query.id) {
                res = await this.$http(rechargeBalanceLimitCfgUpdate, query);
            }
            else {
                res = await this.$http(rechargeBalanceLimitCfgAdd, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        showAdd() {
            this.formObj = {};
            this.dialogTitle = "新增外部充值预警配置";
            this.dialogVisible = true;
            this.getChannelList();
        },
        editLine(row) {
            this.formObj = { ...row };
            this.formObj.id = row._id;
            this.dialogTitle = "编辑外部充值预警配置";
            this.dialogVisible = true;
            this.getChannelList();
        },
        async getChannelList() {
            let res = await this.$http(getChannels);
            if (res.code === 200) {
                this.channelList = res.msg;
            }
        },
        twoSearchData() {
            this.page = 1;
            this.twoLoadData();
        },
        async twoLoadData() {
            let res = await this.$http(outChannelGetMany, { page: this.twoPage, count: this.twoCount });
            if (res.code === 200) {
                this.twoPageData = res.msg.pageData;
                this.twoTotalCount = res.msg.totalCount;
            }
        },
        twoHandleCurrentChange(val) {
            this.twoPage = val;
            this.twoLoadData();
        },
        //每页显示数据量变更
        twoHandleSizeChange(val) {
            this.twoCount = val;
            this.twoLoadData();
        },
        async twoSubmitForm() {
            //wait this.$refs.forms.validate();
            let query = { ...this.twoFormObj };
            let res = {};
            res = await this.$http(outChannelWithdraw, { channel: query.channel, withdraw: query.withdraw, balance: query.balance });
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.twoDialogVisible = false;
                this.twoLoadData();
            }
        },
        twoEditLine(row) {
            this.twoFormObj = { ...row };
            this.twoDialogVisible = true;
        }, viewClose() {
            this.twoFormObj = {};
            this.$refs['twoFormObj'].resetFields();
        }
    }
}
</script>
