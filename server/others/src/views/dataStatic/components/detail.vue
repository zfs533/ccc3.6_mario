<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="合作方式">
                <el-select v-model="search.cooperationType" placeholder="请选择合作方式">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in ChannelCooperationTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道归属人">
                <el-input v-model="search.relegation" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="父渠道">
                <el-input v-model="search.parentChannel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道等级">
                <el-select v-model="search.level">
                    <el-option v-for="item in ChannelLevel" :key="item.pid" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="扣量">
                <el-select v-model="search.isDiscount">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="扣量前" :value="false"></el-option>
                    <el-option label="扣量后" :value="true"></el-option>
                </el-select>
            </el-form-item>
            <!--    <el-form-item label="操作系统">
                <el-select v-model="search.platform" placeholder="请选择操作系统" allow-create filterable default-first-option>
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in platFormType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="统计时间">
                <el-date-picker v-model="dateArr1" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <h3>总数据</h3>
        <el-table :data="totalData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeAmt" label="vip充值" align="center"></el-table-column>
            <el-table-column prop="diamondChargeAmt" label="钻石充值" align="center"></el-table-column>
            <el-table-column prop="newUserChargeAmt" label="新增充值" align="center"></el-table-column>
            <el-table-column prop="oldUserChargeAmt" label="老用户充值" align="center"></el-table-column>
            <el-table-column prop="totalChargeUserCount" label="充值总人数" align="center"></el-table-column>
            <el-table-column prop="newUserChargeUserCount" label="新增充值人数" align="center"></el-table-column>
            <el-table-column prop="oldUserChargeCount" label="老用户充值人数" align="center"></el-table-column>
            <el-table-column prop="loginUserCount" label="登陆用户数" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="新增用户数" align="center"></el-table-column>
            <el-table-column prop="bindUserCount" label="绑定人数" align="center"></el-table-column>
            <el-table-column prop="oldUserLoginUserCount" label="老用户登陆数" align="center"></el-table-column>
            <el-table-column prop="watchUserCount" label="观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserWatchUserCount" label="新观影人数" align="center"></el-table-column>
            <el-table-column prop="oldUserWatchUserCount" label="老用户观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserWatchTime" label="新用户累计观看时长" align="center" :formatter="secondFormat"></el-table-column>
        </el-table>
        <h3>每个渠道每日明细</h3>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
            <el-table-column prop="sumDate" label="统计时间" align="center" :formatter="dateFormat" width="120px"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center" :formatter="$channelFormat"></el-table-column>
            <el-table-column prop="parentChannel" label="上级渠道" align="center"></el-table-column>
            <el-table-column prop="childrenCount" label="下级渠道数量" align="center"></el-table-column>
            <el-table-column prop="level" label="渠道等级" align="center" :formatter="channelLevelFormat"></el-table-column>
            <el-table-column prop="cooperationType" label="合作方式" align="center" :formatter="formatPriceTitle"></el-table-column>
            <!-- <el-table-column prop="price" label="单价/抽成" align="center"></el-table-column> -->
            <el-table-column prop="totalIncome" label="今日佣金" align="center"></el-table-column>
            <el-table-column prop="totalChargeAmt" label="总充值" align="center"></el-table-column>
            <el-table-column prop="vipChargeAmt" label="vip充值" align="center"></el-table-column>
            <el-table-column prop="diamondChargeAmt" label="钻石充值" align="center"></el-table-column>
            <el-table-column prop="newUserChargeAmt" label="新增充值" align="center"></el-table-column>
            <el-table-column prop="oldUserChargeAmt" label="老用户充值" align="center"></el-table-column>
            <el-table-column prop="arppu" label="登陆用户人均付费" align="center"></el-table-column>
            <el-table-column prop="payRate" label="登陆用户人均付费" align="center"></el-table-column>
            <el-table-column prop="totalChargeUserCount" label="充值总人数" align="center"></el-table-column>
            <el-table-column prop="newUserChargeUserCount" label="新增充值人数" align="center"></el-table-column>
            <el-table-column prop="oldUserChargeCount" label="老用户充值人数" align="center"></el-table-column>
            <el-table-column prop="loginUserCount" label="登陆用户数" align="center"></el-table-column>
            <el-table-column prop="newUserCount" label="新增用户数" align="center"></el-table-column>
            <el-table-column prop="bindUserCount" label="绑定人数" align="center"></el-table-column>
            <el-table-column prop="oldUserLoginUserCount" label="老用户登陆数" align="center"></el-table-column>
            <el-table-column prop="watchUserCount" label="观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserWatchUserCount" label="新观影人数" align="center"></el-table-column>
            <el-table-column prop="oldUserWatchUserCount" label="老用户观影人数" align="center"></el-table-column>
            <el-table-column prop="newUserWatchTime" label="新用户累计观看时长" align="center" :formatter="secondFormat"></el-table-column>
            <el-table-column prop="relegation" label="归属人" align="center"></el-table-column>
            <el-table-column prop="retentionDay2" label="次日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay2" label="安卓次日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay2" label="ios次日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay3" label="三日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay3" label="安卓三日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay3" label="ios三日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay7" label="七日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay7" label="安卓七日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay7" label="ios七日留存" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button v-if="isShow(scope.row)" type="text" style="margin:0 10px 0 0" @click="showDetailView(scope.row)">扣量详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="`渠道统计详情:${this.channel }`" :visible.sync="openDialog" width="75%" :destroy-on-close="true">
            <channelDetail v-if="openDialog" :datas={pid:pid,channel:channel,sumDate:sumDate} /><!-- :pid="pid" :channel="channel" :sumDate="sumDate"  -->
        </el-dialog>
    </el-card>
</template>
<script>
import { allChannelDaySumExcel, getChannelDetail } from '@/api/dataStatic';
import { platFormType } from '@/utils/baseConst';
import { ChannelCooperationTypeList, ChannelLevel, pidList } from '@/utils/channelShield';
import { getBeforeDate } from '@/utils/dateTime';
import { dateFm, secToString } from '@/utils/formatter';
import channelDetail from './channelDetail.vue';
export default {
    components: {
        channelDetail: channelDetail,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: { pid: 'A', isDiscount: false },
            pageData: [],
            totalData: [],
            formObj: {},
            pidList: pidList,
            ChannelCooperationTypeList: ChannelCooperationTypeList,
            platFormType: platFormType,
            ChannelLevel: ChannelLevel,
            dateArr1: getBeforeDate('date', 0, 0),
            openDialog: false,
            pid: "",
            channel: "",
            sumDate: ""
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.sumDateBegin = this.dateArr1[0];
                query.sumDateEnd = this.dateArr1[1];
            }
            return query;
        },
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getChannelDetail, { page: this.page, count: this.count, ...this.getQuery() }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalData = res.msg.totalData;
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
        formatPriceTitle(row, column, cellValue) {
            switch (row.cooperationType) {
                case 'CPA':
                    return `CPA 单价:${row.price}`;
                case 'CPS':
                    return `CPS 分成比例:${row.price}`;
                case 'CPT':
                    return `CPT 投放资金:${row.price}`;
            }
        },
        channelLevelFormat(row, column, cellValue) {
            let item = this.ChannelLevel.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        showDetailView(row) {
            this.channel = row.channel;
            this.pid = row.pid;
            this.sumDate = row.sumDate;
            this.openDialog = true;
        }, isShow(row) {
            return row.channel ? true : false;
        },
        async exportExcel() {
            let res = await this.$http(allChannelDaySumExcel, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    }
}
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
