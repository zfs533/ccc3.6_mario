<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换方式">
                <el-select v-model="search.withdrawType" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in withdrawTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="app订单号">
                <el-input v-model="search.gameOrderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="bill单号">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="兑换状态">
                <el-select v-model="search.state" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退款状态">
                <el-select v-model="search.state" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in refStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单生成时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="到账时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="createTime" label="订单创建时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="pid" label="项目" align="center" min-width="100" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="act" label="账号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="deviceType" label="设备类型" align="center" min-width="80"></el-table-column>
            <el-table-column prop="name" label="用户名称" align="center" min-width="120"></el-table-column>
            <el-table-column prop="uid" label="用户id" align="center" min-width="120"></el-table-column>
            <el-table-column prop="userChannel" label="用户渠道" align="center" min-width="120" :formatter="$channelFormat">
            </el-table-column>
            <el-table-column prop="merchantId" label="商户类型" align="center" min-width="120"></el-table-column>
            <el-table-column prop="gameOrderId" label="app订单" align="center" min-width="120"></el-table-column>
            <el-table-column prop="_id" label="订单号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="state" label="订单状态" align="center" min-width="120" :formatter="stateFomart">
            </el-table-column>
            <el-table-column prop="refStatus" label="退款状态" align="center" min-width="120" :formatter="refStatusFormat">
            </el-table-column>
            <el-table-column prop="closed" label="关闭状态" align="center" min-width="120" :formatter="closedFormat">
            </el-table-column>
            <el-table-column prop="withdrawType" label="兑换类型" align="center" min-width="120"
                :formatter="withdrawTypeFomart"></el-table-column>
            <el-table-column prop="channel" label="兑换通道" align="center" min-width="120"></el-table-column>
            <el-table-column prop="deliveredTime" label="订单完成时间" align="center" min-width="170"
                :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="paidTime" label="支付时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="thrPaidTime" label="第三方到账时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="closeTime" label="订单关闭时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="refTime" label="退款时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="price" label="兑换金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="tax" label="手续费" align="center" min-width="120"></el-table-column>
            <el-table-column prop="payeeName" label="支付宝姓名" align="center" min-width="120"></el-table-column>
            <el-table-column prop="payeeAccount" label="支付宝账号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="bankCard" label="银行卡号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="bankCode" label="银行编码" align="center" min-width="120"></el-table-column>
            <!-- <el-table-column prop="opt" label="操作人" align="center" min-width="120"></el-table-column> -->
            <el-table-column prop="reason" label="备注" align="center" min-width="160"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { ordersList } from '@/api/withdrawMgr';
import { billOrderState, pidList, refStatus, withdrawTypes } from '@/utils/baseConst';
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
            pidList: pidList,
            dialogVisible: false,
            stateList: billOrderState,
            withdrawTypes: withdrawTypes,
            refStatusList: refStatus
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
                query.createTimeBegin = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.paidTimeBegin = this.dateArr2[0];
                query.paidTimeEnd = this.dateArr2[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(ordersList, { page: this.page, count: this.count, ...this.getQuery() });
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
        stateFomart(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        refStatusFormat(row, column, cellValue) {
            let item = this.refStatusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        withdrawTypeFomart(row, column, cellValue) {
            let item = this.withdrawTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        closedFormat(row, column, cellValue) {
            return cellValue ? "关闭" : "";
        }
    }
};
</script>
