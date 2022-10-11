<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="配置开关">
                <el-select v-model="search.active" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="开" :value="true"></el-option>
                    <el-option label="关" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换方式">
                <el-select v-model="search.type" placeholder="请选择" @change="getChannels">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in withdrawTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换通道">
                <el-select v-model="search.channel" placeholder="请选择">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in channelList" :key="item._id" :label="item.label" :value="item.channel">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">添加配置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="minMoney" label="最小金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="maxMoney" label="最大金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="timeInterval" label="兑换间隔时长" align="center" min-width="120"></el-table-column>
            <el-table-column prop="withdrawTimes" label="兑换次数" align="center" min-width="120"></el-table-column>
            <el-table-column prop="withdrawRate" label="兑换费率" align="center" min-width="120"></el-table-column>
            <el-table-column prop="channel" label="兑换通道" align="center" min-width="120"></el-table-column>
            <el-table-column prop="active" label="开关" align="center" min-width="120" :formatter="boolFormat">
            </el-table-column>
            <el-table-column prop="pids" label="项目列表" align="center" width="150" :formatter="$pidFormat">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.pids" :key="item">{{ $pidFormat(item) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="moneyRange" label="固定金额" align="center" min-width="120"
                :formatter="moneyRangeFormat"></el-table-column>
            <el-table-column prop="type" label="兑换类型" align="center" min-width="120" :formatter="typeFormat">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editLine(scope.row)">修改</el-button>
                    <el-button type="danger" @click="delLine(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="isAdd ? '添加配置' : '修改配置'" :visible.sync="dialogVisible" width="800px">
            <el-form label-width="120px" :inline="true">
                <template v-if="isAdd">
                    <el-form-item label="兑换方式">
                        <el-select v-model="formObj.type" placeholder="请选择" @change="getChannels">
                            <el-option v-for="item in withdrawTypes" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="兑换通道">
                        <el-select v-model="formObj.channel" placeholder="请选择">
                            <el-option v-for="item in channelList" :key="item._id" :label="item.label"
                                :value="item.channel"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <el-form-item label="配置开关">
                    <el-switch v-model="formObj.active" />
                </el-form-item>
                <el-form-item label="最小金额">
                    <el-input v-model="formObj.minMoney" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="最大金额">
                    <el-input v-model="formObj.maxMoney" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="兑换间隔时长">
                    <el-input v-model="formObj.timeInterval" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="兑换次数">
                    <el-input v-model="formObj.withdrawTimes" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="兑换费率">
                    <el-input v-model="formObj.withdrawRate" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="项目">
                    <el-select multiple v-model="formObj.pids" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in pidList" :key="item.value" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="金额范围">
                    <el-input v-model="formObj.moneyRange" placeholder="多个金额用逗号隔开"></el-input>
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
import { getAllChannel } from '@/api/consumptionManagement';
import { addOneCfg, delOneCfg, getCfg, updateOneCfg } from '@/api/withdrawMgr';
import { billOrderState, pidList, refStatus, withdrawTypes } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
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
            formObj: {},
            dialogVisible: false,
            isAdd: true,
            stateList: billOrderState,
            withdrawTypes: withdrawTypes,
            refStatusList: refStatus,
            channelList: []
        };
    },
    async created() {
        this.loadData();
    },
    methods: {
        async getChannels(val) {
            let res = await this.$http(getAllChannel, { type: "withdraw", payType: val }, true);
            if (res.code === 200 && res.msg) {
                this.channelList = res.msg;
            }
        },
        async searchData() {
            this.page = 1;
            this.loadData();

        },
        showAdd() {
            this.isAdd = true;
            this.formObj = {};
            this.dialogVisible = true;
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
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
            let res = await this.$http(getCfg, { page: this.page, count: this.count, ...this.getQuery() });
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
        typeFormat(row, column, cellValue) {
            let item = this.withdrawTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        moneyRangeFormat(row, column, cellValue) {
            return cellValue ? cellValue.join(',') : cellValue;
        },
        boolFormat(row, column, cellValue) {
            return cellValue ? "开" : "关";
        },
        async submitForm() {
            let query = { ...this.formObj };
            console.log("ssss", query.moneyRange);
            query.moneyRange = this.$splitStr(this.formObj.moneyRange) || [];
            let res = {};
            if (this.isAdd) {
                res = await this.$http(addOneCfg, query);
            }
            else {
                res = await this.$http(updateOneCfg, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = {
                id: row._id,
                active: row.active,
                minMoney: row.minMoney,
                maxMoney: row.maxMoney,
                timeInterval: row.timeInterval,
                withdrawTimes: row.withdrawTimes,
                withdrawRate: row.withdrawRate,
                pids: row.pids,
                moneyRange: row.moneyRange.join(",")
            };
            this.isAdd = false;
            this.dialogVisible = true;
        },
        async delLine(id) {
            await this.$confirm(`即将删除本条配置，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delOneCfg, { id: id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        },
    }
};
</script>
