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
            <el-form-item label="订单号">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="bill订单号">
                <el-input v-model="search.withdrawOrderID" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换渠道">
                <el-input v-model="search.settleChannel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换类型">
                <el-select v-model="search.settleType" placeholder="请选择兑换类型">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in settleTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="search.status" placeholder="请选择订单状态">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单完成时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="订单审核时间">
                <el-date-picker v-model="dateArr3" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" min-width="120" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="uid" label="用户id" align="center" min-width="120"></el-table-column>
            <el-table-column prop="_id" label="订单号" align="center" min-width="210"></el-table-column>
            <el-table-column prop="withdrawOrderID" label="bill订单号" align="center" min-width="210"></el-table-column>
            <el-table-column prop="status" label="订单状态 " align="center" min-width="120" :formatter="stateFormat">
            </el-table-column>
            <el-table-column prop="billState" label="bill订单状态" align="center" min-width="120"
                :formatter="billStateFomart">
            </el-table-column>
            <el-table-column prop="refStatus" label="退款状态" align="center" min-width="120" :formatter="refStatusFormat">
            </el-table-column>
            <el-table-column prop="statusDetail" label="审核状态描述" align="center" min-width="200"></el-table-column>
            <el-table-column prop="settleType" label="结算方式" align="center" min-width="120"
                :formatter="settleTypeFormat"></el-table-column>
            <el-table-column prop="settleChannel" label="结算渠道方式" align="center" min-width="120"></el-table-column>
            <el-table-column prop="applyMoney" label="申请结算金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="realMoney" label="到账金额金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="applyTax" label="提现税收" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalIncome" label="总收入" align="center" min-width="120"></el-table-column>
            <el-table-column prop="totalSettleMoney" label="总提现" align="center" min-width="120"></el-table-column>
            <el-table-column prop="settleUser" label="结算用户" align="center" min-width="120"></el-table-column>

            <el-table-column prop="alipayAct" label="支付宝账号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="alipayName" label="支付宝姓名" align="center" min-width="120"></el-table-column>
            <el-table-column prop="bankCardNo" label="银行卡号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="bankCardName" label="银行卡姓名" align="center" min-width="120"></el-table-column>
            <el-table-column prop="bankName" label="银行名称" align="center" min-width="120"></el-table-column>
            <el-table-column prop="usdtAdr" label="USDT地址" align="center" min-width="120"></el-table-column>
            <el-table-column prop="usdtName" label="USDT姓名" align="center" min-width="120"></el-table-column>

            <!-- <el-table-column prop="isBlacklist" label="是否存在黑名单)" align="center" min-width="120"></el-table-column> -->

            <el-table-column prop="applyDate" label="提交时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="successDate" label="到账时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="failDate" label="订单失败时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="refundDate" label="退款时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="transferDate" label="转账时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>

            <el-table-column prop="remark" label="备注" align="center" min-width="120"></el-table-column>
            <el-table-column prop="operator" label="操作人" align="center" min-width="120"></el-table-column>
            <el-table-column prop="auditDate" label="操作时间" align="center" min-width="120"></el-table-column>

            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope" v-if="scope.row.status === 'await'">
                    <el-button type="success" @click="auditPass(scope.row._id)">通过</el-button>
                    <el-button type="danger" @click="auditReject(scope.row._id)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { promoteWithDrawList, withDrawAuditFail, withDrawAuditPass } from '@/api/promote.js';
import { billOrderState, pidList, refStatus, withDrawStatus, withdrawTypes } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            pidList: pidList,
            settleTypeList: withdrawTypes,
            statusList: withDrawStatus,
            billStateList: billOrderState,
            refStatusList: refStatus,
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
                query.applyDateBegin = this.dateArr1[0];
                query.applyDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.successDateBegin = this.dateArr2[0];
                query.successDateEnd = this.dateArr2[1];
            }
            if (this.dateArr3 && this.dateArr3.length > 1) {
                query.auditTimeBegin = this.dateArr3[0];
                query.auditTimeEnd = this.dateArr3[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(promoteWithDrawList, { page: this.page, count: this.count, ...this.getQuery() });
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
        stateFormat(row, column, cellValue) {
            let item = this.statusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        billStateFomart(row, column, cellValue) {
            let item = this.billStateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        refStatusFormat(row, column, cellValue) {
            let item = this.refStatusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        settleTypeFormat(row, column, cellValue) {
            let item = this.settleTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        async auditPass(id) {
            let prompt = await this.$prompt("请填写通过原因", `审核通过`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(withDrawAuditPass, { orderID: id, remarks: prompt.value });
            if (res.code === 200) {
                this.$message.success('操作成功');
                this.loadData();
            }
        },
        async auditReject(id) {
            let prompt = await this.$prompt("请填写拒绝原因", `审核拒绝`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(withDrawAuditFail, { orderID: id, remarks: prompt.value });
            if (res.code === 200) {
                this.$message.success('操作成功');
                this.loadData();
            }

        }
    }
};
</script>
