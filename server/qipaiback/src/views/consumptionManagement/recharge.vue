<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="search.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="search.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户渠道">
                <el-input v-model="search.userChannel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="bill订单id">
                <el-input v-model="search.orderId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="第三方订单号">
                <el-input v-model="search.thirdOrderId" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="订单状态">
                <el-select v-model="search.state" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付类型">
                <el-select v-model="search.payType" placeholder="请选择" style="width:160px" @change="changePayType($event, 0)">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="(item) in payTypesList" :key="item.value" :label="item.label+'_'+item.value" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付通道">
                <el-select v-model="search.payChannel" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="(item) in payChannelsList" :key="item._id" :label="item.payType+'_'+item.label"
                        :value="item.channel"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品类型">
                <el-select v-model="search.goodsType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in goodsTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="search.goodsName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="bill订单创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="bill订单完成时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="第三方支付时间">
                <el-date-picker v-model="dateArr3" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="150" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="用户id" align="center" min-width="120"></el-table-column>
            <el-table-column prop="state" label="订单状态" align="center" min-width="120" :formatter="stateFormat">
            </el-table-column>
            <el-table-column prop="goodsPrice" label="订单价格" align="center" min-width="120"></el-table-column>
            <el-table-column prop="payType" label="支付类型" align="center" min-width="120"></el-table-column>
            <el-table-column prop="channel" label="支付通道" align="center" min-width="120"></el-table-column>
            <el-table-column prop="createTime" label="创建订单时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="thirdOrderId" label="第三方订单号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="reason" label="备注" align="center" min-width="200"></el-table-column>
            <el-table-column prop="userChannel" label="用户渠道" align="center" min-width="120" :formatter="$channelFormat">
            </el-table-column>
            <el-table-column prop="deliveredTime" label="完成时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="payTime" label="支付时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="phone" label="用户手机号" align="center" min-width="120"></el-table-column>
            <el-table-column prop="userName" label="用户名称" align="center" min-width="120"></el-table-column>
            <el-table-column prop="goodsInfo.goodsType" label="商品类型" align="center" min-width="120"
                :formatter="goodsTypeFormat"></el-table-column>
            <el-table-column prop="goodsInfo.goodsName" label="商品名称" align="center" min-width="120"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

    </el-card>
</template>
<script>
import { billRecordsGet, getAllChannel, ordersExcel } from '@/api/consumptionManagement';
import { goodsTypeList, orderPayStates, PayTypesEnum, pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
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
            stateList: orderPayStates,
            payChannelsList: [],
            payTypesList:PayTypesEnum,
            goodsTypeList: goodsTypeList,
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            pidList: pidList,
        };
    },
    async created() {
        await this.getChannels();
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            // await this.getChannels();
            this.loadData();

        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createTimeStart = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.finishTimeStart = this.dateArr2[0];
                query.finishTimeEnd = this.dateArr2[1];
            }
            if (this.dateArr3 && this.dateArr3.length > 1) {
                query.payTimeStart = this.dateArr3[0];
                query.payTimeEnd = this.dateArr3[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(billRecordsGet, { page: this.page, count: this.count, ...this.getQuery() }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
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
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        getPayChannelByPayType(payType){
            if(payType){
                return (this.payChannelsList||[]).fliter(e=>e.payType===payType);
            }
            return this.payChannelsList||[];
        },
        boolFormat(row, column, cellValue) {
            let item = this.boolList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        stateFormat(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        goodsTypeFormat(row, column, cellValue) {
            let item = this.goodsTypeList.find(i => i.value === row.goodsInfo.goodsType);
            return item ? item.label : row.goodsInfo.goodsType;
        },
        async exportData() {
            let res = await this.$http(ordersExcel, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("充值订单导出任务创建成功");
            }
        },
    }
};
</script>
