<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
            <el-form-item label="重置时间">
                <el-date-picker v-model="sumDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetFun">重置统计任务</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="loginUserCnt" align="center" label="登陆人数区间" :formatter="loginUserCntFormat"></el-table-column>
            <el-table-column prop="androidRate" align="center" label="安卓用户占比区间" :formatter="arrFormat"></el-table-column>
            <el-table-column prop="newUserRate" align="center" label="新增用户占比" :formatter="arrFormat"></el-table-column>
            <el-table-column prop="watchedUserRate" align="center" label="观影人数占比" :formatter="arrFormat"></el-table-column>
            <el-table-column prop="rechargeRate" align="center" label="用户充值系数" :formatter="arrFormat"></el-table-column>
            <el-table-column prop="vipRechargeRate" align="center" label="vip充值用户占比" :formatter="arrFormat"></el-table-column>
            <el-table-column prop="avgRechargeAmt" align="center" label="平均充值区间" :formatter="loginUserCntFormat"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="infoLine(scope.row)" type="text" icon="el-icon-info" size="medium"></el-button>
                    <el-button @click="updateLine(scope.row)" type="text" icon="el-icon-edit" size="medium"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="区间信息" :visible.sync="infoVisible" width="1000px">
            <el-table :data="infoPageData" :border="true" min-width="100%" max-height="600">
                <el-table-column prop="timeStr" align="center" label="时间"></el-table-column>
                <el-table-column prop="workDayRate" align="center" label="周1-周4区间" :formatter="rateFormatStart"></el-table-column>
                <el-table-column prop="workDayRate" align="center" label="周1-周4区间" :formatter="rateFormatEnd"></el-table-column>
                <el-table-column prop="weekendDayRate" align="center" label="周5-周日区间" :formatter="rateFormatStart"></el-table-column>
                <el-table-column prop="weekendDayRate" align="center" label="周5-周日区间" :formatter="rateFormatEnd"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="80%" style="margin-bottom:20px">
            <div class="outBox">
                <el-card class="cardItem">
                    <el-form :inline="false" style="width:100%" label-position="right" label-width="150px">
                        <el-form-item label="登陆人数区间">
                            <div v-for="(item,index) in formObj.loginUserCnt" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.loginUserCnt[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.loginUserCnt[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="安卓用户占比区间">
                            <div v-for="(item,index) in formObj.androidRate" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.androidRate[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.androidRate[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="新增用户占比">
                            <div v-for="(item,index) in formObj.newUserRate" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.newUserRate[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.newUserRate[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="观影人数占比">
                            <div v-for="(item,index) in formObj.watchedUserRate" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.watchedUserRate[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.watchedUserRate[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="用户充值系数">
                            <div v-for="(item,index) in formObj.rechargeRate" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.rechargeRate[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.rechargeRate[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="vip充值用户占比">
                            <div v-for="(item,index) in formObj.vipRechargeRate" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.vipRechargeRate[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.vipRechargeRate[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="平均充值区间">
                            <div v-for="(item,index) in formObj.avgRechargeAmt" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                                <div v-if="index==0">
                                    <el-input v-model="formObj.avgRechargeAmt[index]" style="width:6em;display:inline-block" />
                                    -
                                    <el-input v-model="formObj.avgRechargeAmt[index+1]" style="width:6em;display:inline-block" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="cardItem">
                    <el-form :inline="false" :model="formObj" style="width:100%">
                        <el-table :data="formObj.rateCfg" :border="true" min-width="100%" max-height="600" show-summary :summary-method="getSummaries">
                            <el-table-column prop="timeStr" align="center" label="时间"></el-table-column>
                            <el-table-column prop="workDayRate" align="center" label="周1-周4区间">
                                <template slot-scope="scope">
                                    <!--    <el-input v-model="scope.row.workDayRate[0]" style="width:6em;display:inline-block" />
                                    <div style="align-center">—</div> -->
                                    <el-input v-model="scope.row.workDayRate[0]" style="width:6em;display:inline-block" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="workDayRate" align="center" label="周1-周4区间">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.workDayRate[1]" style="width:6em;display:inline-block" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="weekendDayRate" align="center" label="周5-周日区间">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.weekendDayRate[0]" style="width:6em;display:inline-block" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="weekendDayRate" align="center" label="周5-周日区间">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.weekendDayRate[1]" style="width:6em;display:inline-block" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-card>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { getDataCfg, updateDataCfg, dataCfgReset } from '@/api/adminCfg';
import { isArray } from '@/utils/validate';
import { pidList } from '@/utils/baseConst';
export default {
    data() {
        return {
            formRules: {
                domain: [{ required: true, pattern: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/, trigger: 'blur', message: '必须是符合规则的域名' }],
                description: [{ required: true, trigger: 'blur', message: '描述必填' }]
            },
            search: {},
            roleData: undefined,
            roleId: "",
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            roleList: [],
            formObj: {},
            dialogVisible: false,
            pidList: pidList,
            infoVisible: false,
            infoPageData: [],
            sumDate: undefined,
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
        getQuery() {
            let query = { ...this.search };
            return query;
        },
        async loadData() {
            let query = { page: this.page, count: this.count, ...this.getQuery() };
            let res = await this.$http(getDataCfg, query);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        statusFormatter(row, column, cellValue) {
            switch (cellValue) {
                case 1: return "开启"; break;
                case 0: return "关闭"; break;
                default: return cellValue; break;
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
        async submitForm() {
            let res = await this.$http(updateDataCfg, { id: this.formObj._id, ...this.formObj });
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        updateLine(row) {
            this.formObj = row;
            this.dialogVisible = true;
        },
        loginUserCntFormat(row, column, cellValue) {
            if (isArray(cellValue) && cellValue.length > 0) {
                return cellValue[0] + "—" + cellValue[1];
            }
        },
        arrFormat(row, column, cellValue) {
            if (isArray(cellValue) && cellValue.length > 0) {
                return this.toPercent(cellValue[0]) + "—" + this.toPercent(cellValue[1]);
            }
        },
        rateFormatStart(row, column, cellValue) {
            if (isArray(cellValue) && cellValue.length > 0) {
                return this.toPercent(cellValue[0]);
            }
        },
        rateFormatEnd(row, column, cellValue) {
            if (isArray(cellValue) && cellValue.length > 0) {
                return this.toPercent(cellValue[1]);
            }
        },
        infoLine(row) {
            this.infoPageData = row.rateCfg;
            this.infoVisible = true;
        },
        toPercent(point) {
            var str = Number(point * 100).toFixed(2);
            str += "%";
            return str;
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                let arrIndex = index === 1 || index === 3 ? 0 : 1;
                const values = data.map(item => Number(item[column.property][arrIndex]));
                let sum = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                }, 0);
                sums[index] = Number(sum).toFixed(4);
            });
            return sums;
        },
        async resetFun() {
            if (!this.sumDate) {
                this.$message.error("请选择重置时间");
                return;
            }
            let res = await this.$http(dataCfgReset, { sumDate: this.sumDate });
            if (res.code === 200) {
                this.$message.success("重置成功");
                this.loadData();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.outBox {
    min-height: 600px;
    display: flex;
    .cardItem {
        flex: 1;
        margin-right: 20px;
        &:nth-child(2) {
            flex: 2;
        }
    }
}
</style>