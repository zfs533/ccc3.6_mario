<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否关闭">
                <el-select v-model="search.closed" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in boolList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="bill订单id">
                <el-input v-model="search.orderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="第三方订单号">
                <el-input v-model="search.thirdOrderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="支付流水号">
                <el-input v-model="search.flowId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="app订单id">
                <el-input v-model="search.appOrderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="付款时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="uid" label="用户id" align="center"></el-table-column>
            <el-table-column prop="price" label="订单金额" align="center"></el-table-column>
            <el-table-column prop="goodsPrice" label="实际支付金额" align="center"></el-table-column>
            <el-table-column prop="payType" label="支付类型" align="center"></el-table-column>
            <el-table-column prop="channel" label="通道名字" align="center"></el-table-column>
            <el-table-column prop="userChannel" label=" 用户渠道" align="center"></el-table-column>
            <el-table-column prop="paidTime" label="付款时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="thirdOrderId" label="第三方订单号" align="center"></el-table-column>
            <el-table-column prop="flowId" label="支付流水号" align="center"></el-table-column>
            <el-table-column prop="appOrderId" label="app订单id" align="center"></el-table-column>
            <el-table-column prop="orderId" label="bill订单id" align="center"></el-table-column>
            <el-table-column prop="callBackUrl" label="游戏服回调地址" align="center"></el-table-column>
            <el-table-column prop="closed" label="订单是否关闭" align="center" :formatter="boolFormat"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="check(scope.row._id)">记录状态</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { repeatGet, updateRepeat } from '@/api/consumptionManagement';
import { goodsTypeList, orderPayStates } from '@/utils/baseConst';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            boolList: [
                { label: "是", value: true },
                { label: "否", value: false }
            ],
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
                query.paidTimeBegin = this.dateArr1[0];
                query.paidTimeEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(repeatGet, { page: this.page, count: this.count, ...this.getQuery() });
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
        async check(id) {
            await this.$confirm(`此操作将记录操作状态，修改完成将不能撤回，请确认已经处理完成这条订单在操作, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            });
            let res = await this.$http(updateRepeat, { id: id }, true);
            if (res.code === 200) {
                this.$message.success("操作成功");
            }
        }
    }
}
</script>
