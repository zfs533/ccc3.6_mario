<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换开关">
                <el-select v-model="search.banSettlement" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="开" :value="true"></el-option>
                    <el-option label="关" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="推广开关">
                <el-select v-model="search.allowSetPromote" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="开" :value="true"></el-option>
                    <el-option label="关" :value="false"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">创建推广账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170">
            </el-table-column>
            <el-table-column prop="uid" label="用户uid" align="center"></el-table-column>
            <el-table-column prop="totalSettleMoney" label="累计提现" min-width="160" align="center"></el-table-column>
            <el-table-column prop="balance" label="余额" min-width="160" align="center"></el-table-column>
            <el-table-column prop="totalIncome" label="总收入" min-width="160" align="center"></el-table-column>
            <el-table-column prop="totalPromoteCnt" label="总推广人数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="totalRechargeCnt" label="总充值笔数" min-width="100" align="center"></el-table-column>
            <el-table-column prop="totalRechargeAmt" label="总充值金额" min-width="100" align="center"></el-table-column>
            <!-- <el-table-column prop="allowSetPromote" label="推广开关" min-width="160" align="center" :formatter="boolFormat"></el-table-column> -->
            <el-table-column prop="banSettlement" label="兑换开关" min-width="100" align="center" :formatter="boolFormat">
            </el-table-column>
            <el-table-column prop="alipayAct" label="支付宝账号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="alipayName" label="支付宝姓名" min-width="100" align="center"></el-table-column>
            <el-table-column prop="bankCardNo" label="银行卡号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="bankCardName" label="银行卡姓名" min-width="100" align="center"></el-table-column>
            <el-table-column prop="bankCode" label="银行编码" min-width="160" align="center"></el-table-column>
            <el-table-column prop="usdtAdr" label="USDT地址" min-width="160" align="center"></el-table-column>
            <el-table-column prop="usdtName" label="USDT姓名" min-width="100" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="contact" label="联系方式" min-width="160" align="center"></el-table-column>
            <el-table-column prop="remark" label="推广备注" min-width="100" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button type="success">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;"
                                    @click="editPay(scope.row)">
                                    支付信息</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;"
                                    @click="editContact(scope.row)">联系方式</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;"
                                    @click="setBanSettlement(scope.row)">{{ scope.row.banSettlement ? "开启兑换" :
                                            "关闭兑换"
                                    }}
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;"
                                    @click="moneyChange(scope.row.uid)">流水记录</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;"
                                    @click="showEditScroeView(scope.row)">上下分</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="`修改支付信息：${formObj.uid}`" :visible.sync="dialogVisible" width="400px">
            <el-form label-width="100px">
                <el-form-item label="类型">
                    <el-select v-model="formObj.payType" placeholder="请选择类型">
                        <template v-for="item in payTypes">
                            <el-option :key="item.value" :label="item.label" :value="item.value"
                                v-if="item.value != 'giftCard'"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <template v-if="formObj.payType === 'unionpay'">
                    <el-form-item label="银行卡号">
                        <el-input v-model="formObj.bankCardNo" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="银行名称">
                        <el-input v-model="formObj.bankCardName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="银行编码">
                        <el-input v-model="formObj.bankCode" placeholder="请输入"></el-input>
                    </el-form-item>
                </template>
                <template v-if="formObj.payType === 'alipay'">
                    <el-form-item label="支付宝账号">
                        <el-input v-model="formObj.alipayAct" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝姓名">
                        <el-input v-model="formObj.alipayName" placeholder="请输入"></el-input>
                    </el-form-item>
                </template>
                <template v-if="formObj.payType === 'usdtpay'">
                    <el-form-item label="USDT地址">
                        <el-input v-model="formObj.usdtAdr" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="USDT姓名">
                        <el-input v-model="formObj.usdtName" placeholder="请输入"></el-input>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPayInfo">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`修改联系方式：${formObj2.uid}`" :visible.sync="dialogVisible2" width="400px">
            <el-form label-width="100px">
                <el-form-item label="手机号">
                    <el-input v-model="formObj2.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="formObj2.contact" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitContact">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="创建推广账号" :visible.sync="dialogAdd" width="700px">
            <el-form label-width="100px" :inline="true">
                <el-form-item label="用户uid">
                    <el-input v-model="formAdd.uid" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="兑换开关">
                    <el-switch v-model="formAdd.banSettlement"></el-switch>
                </el-form-item>
                <el-form-item label="推广开关">
                    <el-switch v-model="formAdd.allowSetPromote"></el-switch>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="formAdd.bankCardNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行名称">
                    <el-input v-model="formAdd.bankCardName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行编码">
                    <el-input v-model="formAdd.bankCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号">
                    <el-input v-model="formAdd.alipayAct" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="支付宝姓名">
                    <el-input v-model="formAdd.alipayName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="USDT地址">
                    <el-input v-model="formAdd.usdtAdr" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="USDT姓名">
                    <el-input v-model="formAdd.usdtName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formAdd.remark" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="submitAct">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="流水详情" :visible.sync="dialogMoneyChange" width="1200px">
            <MoneyChange :uid="moneyChangeUid" v-if="dialogMoneyChange" />
        </el-dialog>
        <el-dialog :title="`上下分:${formObjScore.uid},目前可提现金额:${formObjScore.balance}`" :visible.sync="editScroeVisible"
            width="600px">
            <el-form label-width="80px">
                <el-form-item label="操作金额">
                    <el-input-number v-model="editScroeModel.score"></el-input-number>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editScroeModel.remark" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click="submitFormEditScore('add')">上分</el-button>
                <el-button type="warning" @click="submitFormEditScore('sub')" style="margin-left:120px">下分
                </el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addPromoter, banSettlement, downScore, getPromoterList, updateContactInfo, updatePayInfo, upScore } from '@/api/promote.js';
import MoneyChange from '@/components/moneyChange.vue';
import { pidList, withdrawTypes } from '@/utils/baseConst';
export default {
    components: { MoneyChange },
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
            formObj2: {},
            formObjScore: {},
            editScroeModel: {},
            editScroeVisible: false,
            formAdd: {
                banSettlement: false,
                allowSetPromote: false
            },
            dialogVisible: false,
            dialogVisible2: false,
            dialogAdd: false,
            payTypes: withdrawTypes,
            dialogMoneyChange: false,
            moneyChangeUid: null
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
                query.createDateBegin = this.dateArr1[0];
                query.createDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getPromoterList, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
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
        boolFormat(row, column, cellValue) {
            return cellValue ? "关闭" : "开启";
        },
        async setBanSettlement(row) {
            this.$confirm(`该用户当前兑换开关为${row.banSettlement ? "关闭兑换" : "打开兑换"} ，此操作即将 ${row.banSettlement ? "打开兑换" : "关闭兑换"} ，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                let res = await this.$http(banSettlement, { banSettlement: !row.banSettlement, uid: row.uid });
                if (res.code === 200) {
                    this.$message.success('操作成功');
                    this.loadData();
                }
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: error == "cancel" ? "取消操作" : error
                });
            });
        },
        moneyChange(uid) {
            this.moneyChangeUid = uid;
            this.dialogMoneyChange = true;
        },
        showAdd() {
            this.formAdd = {
                banSettlement: false,
                allowSetPromote: false
            };
            this.dialogAdd = true;
        },
        async submitPayInfo() {
            let query = {};
            if (this.formObj.payType === 'unionpay') {
                query = {
                    bankCardNo: this.formObj.bankCardNo,
                    bankCardName: this.formObj.bankCardName,
                    bankCode: this.formObj.bankCode
                };
            }
            else if (this.formObj.payType === 'alipay') {
                query = {
                    alipayAct: this.formObj.alipayAct,
                    alipayName: this.formObj.alipayName,
                };
            }
            else if (this.formObj.payType === 'usdtpay') {
                query = {
                    usdtAdr: this.formObj.usdtAdr,
                    usdtName: this.formObj.usdtName,
                };
            }
            query.payType = this.formObj.payType;
            query.uid = this.formObj.uid;

            let res = await this.$http(updatePayInfo, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        async submitContact() {
            let query = { ...this.formObj2 };
            let res = await this.$http(updateContactInfo, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible2 = false;
                this.loadData();
            }
        },
        async submitAct() {
            let query = { ...this.formAdd };
            let res = await this.$http(addPromoter, query);
            if (res.code === 200) {
                this.$message.success("账号创建成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        editPay(row) {
            this.formObj = {
                uid: row.uid,
                payType: 'unionpay',
                bankCardNo: row.bankCardNo,
                bankCardName: row.bankCardName,
                bankCode: row.bankCode,
                alipayAct: row.alipayAct,
                alipayName: row.alipayName,
                usdtAdr: row.usdtAdr,
                usdtName: row.usdtName,
            };
            this.dialogVisible = true;
        },
        editContact(row) {
            this.formObj2 = {
                uid: row.uid,
                phone: row.phone,
                contact: row.contact
            };
            this.dialogVisible2 = true;
        },
        async showEditScroeView(row) {
            this.editScroeModel = { uid: row.uid, score: 0, remark: "" };
            this.formObjScore = { uid: row.uid, balance: row.balance };
            this.editScroeVisible = true;
        },
        async submitFormEditScore(action) {
            let editScroeModel = { ...this.editScroeModel };
            let res = {};
            if (!editScroeModel.score) {
                this.$message.error("请输入金额");
                return;
            }
            if (!editScroeModel.remark) {
                this.$message.error("请输入描述");
                return;
            }
            if (editScroeModel.score <= 0) {
                this.$message.error("请输入大于0的数");
                return;
            }
            if (action === "add") {
                this.$confirm(`推广账号：${editScroeModel.uid},上分金额:${editScroeModel.score},操作说明:${editScroeModel.remark},请确认操作!`, "操作确认", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async () => {
                    let res = await this.$http(upScore, editScroeModel);
                    if (res.code === 200) {
                        this.editScroeVisible = false;
                        this.$message.success("上分成功");
                        this.loadData();
                    }
                }).catch(error => {
                    this.$message({
                        type: 'info',
                        message: error == "cancel" ? "取消操作" : error
                    });
                });
            } else {
                this.$confirm(`推广账号：${editScroeModel.uid},下分金额: ${editScroeModel.score}, 操作说明: ${editScroeModel.remark}, 请确认操作!`, "操作确认", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async () => {
                    let res = await this.$http(downScore, editScroeModel);
                    if (res.code === 200) {
                        this.editScroeVisible = false;
                        this.$message.success("下分成功");
                        this.loadData();
                    }
                }).catch(error => {
                    this.$message({
                        type: 'info',
                        message: error == "cancel" ? "取消操作" : error
                    });
                });
            }
        },
    }
};
;;</script>
