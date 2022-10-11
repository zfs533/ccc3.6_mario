<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="推广人uid">
                <el-input v-bind:value="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="流水类型">
                <el-select v-model="search.type" placeholder="请选择审核状态">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in moneyChangeTypes" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="推广人" align="center"></el-table-column>
            <el-table-column prop="changeVal" label="变化的金额" align="center" min-width="120"></el-table-column>
            <el-table-column prop="oldVal" label="变化前" align="center" min-width="120"></el-table-column>
            <el-table-column prop="newVal" label="变化后" align="center" min-width="120"></el-table-column>
            <el-table-column prop="type" label="流水类型" align="center" min-width="120" :formatter="typeFormat">
            </el-table-column>
            <el-table-column prop="logDate" label="记录时间" align="center" min-width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center" min-width="140"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center" min-width="100"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="修改推广信息" :visible.sync="dialogVisible" width="400px">
            <el-form label-width="100px">
                <el-form-item label="银行卡号">
                    <el-input v-model="formObj.bankCardNo" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行名称">
                    <el-input v-model="formObj.bankCardName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="银行编码">
                    <el-input v-model="formObj.bankCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formObj.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="formObj.contact" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formObj.remark" placeholder="请输入"></el-input>
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
import { moneyChangeLog } from '@/api/promote.js';
import { moneyChangeTypes, pidList } from '@/utils/baseConst';
export default {
    props: {
        uid: Number | String
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: { uid: '' },
            pageData: [],
            dateArr1: [],
            pidList: pidList,
            formObj: {},
            dialogVisible: false,
            moneyChangeTypes: moneyChangeTypes
        };
    },
    async created() {
        this.search.uid = this.uid;
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
                query.logDateBegin = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(moneyChangeLog, { page: this.page, count: this.count, ...this.getQuery() });
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
            let item = this.moneyChangeTypes.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        submitForm() {

        }
    }
};
</script>
