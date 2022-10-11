<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="申请人uid">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="操作人">
                <el-input v-model="search.opt" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="search.state" placeholder="请选择审核状态">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="申请人" align="center"></el-table-column>
            <el-table-column prop="alipayAct" label="支付宝账号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="alipayName" label="支付宝姓名" min-width="160" align="center"></el-table-column>
            <el-table-column prop="bankCardNo" label="银行卡号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="bankCardName" label="银行卡姓名" min-width="160" align="center"></el-table-column>
            <el-table-column prop="bankCode" label="银行编码" min-width="160" align="center"></el-table-column>
            <el-table-column prop="usdtAdr" label="USDT地址" min-width="160" align="center"></el-table-column>
            <el-table-column prop="usdtName" label="USDT姓名" min-width="160" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="160" align="center"></el-table-column>
            <el-table-column prop="contact" label="联系方式" min-width="160" align="center"></el-table-column>
            <el-table-column prop="state" label="审核状态" align="center" :formatter="formatStates"></el-table-column>
            <el-table-column fixed="right" label="操作" width="260" align="center">
                <template slot-scope="scope" v-if="scope.row.state == 1">
                    <el-button type="success" @click="auditPass(scope.row._id)">通过</el-button>
                    <el-button type="danger" @click="auditReject(scope.row._id)">拒绝</el-button>
                    <el-button type="primary" @click="editLine(scope.row)">修改</el-button>
                </template>
            </el-table-column>
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
import { audit, getAuditList, updateInfo } from '@/api/promote.js';
import { pidList, promoteAuditStates } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {
                state: 1
            },
            pageData: [],
            dateArr1: [],
            dateArr2: [],
            pidList: pidList,
            formObj: {},
            dialogVisible: false,
            stateList: promoteAuditStates
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
            query.pid = CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createDateBegin = this.dateArr1[0];
                query.createDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.auditDateBegin = this.dateArr2[0];
                query.auditDateEnd = this.dateArr2[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getAuditList, { page: this.page, count: this.count, ...this.getQuery() });
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
        formatStates(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        async auditPass(id) {
            await this.$confirm(`即将通过审核 ${id}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(audit, { id: id, state: 2 });
            if (res.code === 200) {
                this.$message.success('操作成功');
                this.loadData();
            }
        },
        async auditReject(id) {
            this.$prompt("请填写拒绝原因", `审核拒绝`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async resData => {
                if (!resData.value || resData.value.length < 3) {
                    this.$message.error('拒绝理由必填,且大于等于3个字符');
                } else {
                    let res = await this.$http(audit, { id: id, state: 3, remark: resData.value });
                    if (res.code === 200) {
                        this.$message.success('操作成功');
                        this.loadData();
                    }
                }
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: error == "cancel" ? "取消操作" : error
                });
            });
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(updateInfo, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = {
                id: row._id,
                bankCardNo: row.bankCardNo,
                bankCardName: row.bankCardName,
                bankCode: row.bankCode,
                phone: row.phone,
                contact: row.contact,
                remark: row.remark
            };
            this.dialogVisible = true;
        }
    }
};
</script>
