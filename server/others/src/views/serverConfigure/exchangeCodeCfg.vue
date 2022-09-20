<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="是否使用">
                <el-select v-model="search.used">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option label="已使用" :value="true"></el-option>
                    <el-option label="未使用" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换码">
                <el-input v-model="search.code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="奖励类型">
                <el-select v-model="search.rewardType">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in codeTypes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="兑换码类型">
                <el-select v-model="search.codeType">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in ExchangeCodeType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
                <el-button type="primary" @click="showAdd">新增兑换码</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <!-- <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column> -->
            <el-table-column prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="code" label="兑换码" align="center"></el-table-column>
            <el-table-column prop="rewardType" label="奖励类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="vipLevel" label="vip特权等级" align="center" :formatter="vipInfoFomat"></el-table-column>
            <el-table-column prop="rewardCount" label="奖励数量" align="center" :formatter="countFromType"></el-table-column>
            <el-table-column prop="codeType" label="兑换码类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="used" label="是否使用" align="center" :formatter="formatBoolean"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="delLine(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="新增兑换码" :visible.sync="dialogVisible" width="400px">
            <el-form label-width="100px">
                <!-- <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="兑换码个数">
                    <el-input v-model="formObj.codeCount" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="兑换码长度">
                    <el-input v-model="formObj.codeLength" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="兑换码类型">
                    <el-select v-model="formObj.codeType">
                        <el-option v-for="item in ExchangeCodeType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖励类型">
                    <el-select v-model="formObj.rewardType">
                        <el-option v-for="item in codeTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="vip特权等级" v-if="formObj.rewardType==='vip'">
                    <el-input v-model="formObj.vipLevel" placeholder="请输入"></el-input>
                </el-form-item> -->
                <el-form-item label="vip特权等级" v-if="formObj.rewardType==='vip'">
                    <el-select v-model="formObj.vipLevel" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in (viplevelInfoList).filter(e=>e.pid===formObj.pid)" :key="item.vipLevel" :label="item.pid+'_'+item.name" :value="item.vipLevel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="getCountNameByType(formObj.rewardType)">
                    <el-input v-model="formObj.rewardCount" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="是否使用">
                    <el-radio-group v-model="formObj.used">
                        <el-radio :label="true">已使用</el-radio>
                        <el-radio :label="false">未使用</el-radio>
                    </el-radio-group>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addExchangeCode, delExchangeCode, getExchangeCode, getExchangeCodeExcel, getVipLevelPrivileges } from '@/api/serverConfigure';
import { codeTypes, exchangeTypes, pidList } from '@/utils/baseConst';
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
            pidList: pidList,
            formObj: {},
            codeTypes: codeTypes,
            ExchangeCodeType: exchangeTypes,
            dialogVisible: false,
            codeTypeForCount: [
                { value: "diamond", label: "钻石数量" },
                { value: "vip", label: "vip天数" },
                { value: "watchTicket", label: "观影券数" },
            ],
            viplevelInfoList: [],
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
        async exportData() {
            let res = await this.$http(getExchangeCodeExcel, { ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
        showAdd() {
            this.formObj = {pid:CURRENTPID};
            this.formObj.used = false;
            this.dialogVisible = true;
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createDateStart = this.dateArr1[0];
                query.createDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let ret = await Promise.all([
                this.$http(getExchangeCode, { page: this.page, count: this.count, ...this.getQuery() }),
                this.$http(getVipLevelPrivileges, { pid: CURRENTPID }, true),
            ]);
            // let res = await this.$http(getExchangeCode, { page: this.page, count: this.count, ...this.getQuery() });
            if (ret[0].code === 200) {
                this.pageData = ret[0].msg.pageData;
                this.totalCount = ret[0].msg.totalCount;
            }
            if (ret[1].code === 200) {
                this.viplevelInfoList = (ret[1].msg.pageData || []).map(e => { return { pid: e.pid, name: e.name, vipLevel: e.vipLevel }; });
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
        vipInfoFomat(row, column, cellValue) {
            let vipInfo = this.viplevelInfoList.find(e => e.pid === row.pid && e.vipLevel === cellValue);
            return vipInfo ?  vipInfo.name : cellValue ? cellValue :"-" ;
        },
        countFromType(row, column, cellValue) {
            if(row.rewardType==='diamond'){
                return `${cellValue} 钻石`
            }else if(row.rewardType==='vip'){
                return `${cellValue} 天vip`
            }else if(row.rewardType==='watchTicket'){
                return `${cellValue} 张`
            }else{
                return cellValue
            }
        },
        formatBoolean(row, column, cellValue) {
            let ret = '';
            if (cellValue) {
                ret = "已使用";
            } else {
                ret = "未使用";
            }
            return ret;
        },

        typeFormat(row, column, cellValue) {
            let item = this.codeTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        getCountNameByType(type) {
            let find = this.codeTypeForCount.find(e => e.value === type);
            return find ? find.label : "数量";
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(addExchangeCode, query);
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        async delLine(id) {
            await this.$confirm(`即将删除兑换码，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delExchangeCode, { id: id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        }
    }
};
</script>
