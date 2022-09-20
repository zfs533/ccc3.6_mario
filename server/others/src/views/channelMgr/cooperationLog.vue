<template>
    <el-card>
        <el-col class="toolbar1">
            <el-popover ref="popover1" placement="top" itle="标题" trigger="hover" content="域名维护"></el-popover>
            <el-button v-popover:popover1 type="text" class="el-icon-info"></el-button>
            <span class="title">合作配置修改记录</span>
        </el-col>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="渠道名称">
                <el-input v-model="search.channel"></el-input>
            </el-form-item>
            <el-form-item label="日志时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="操作人">
                <el-input v-model="search.opt"></el-input>
            </el-form-item>
            <el-form-item label="后台类型">
                <el-select v-model="search.accountType">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in accountTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <!-- <el-button type="primary" @click="isDbatch">导出</el-button> -->
            </el-form-item>

        </el-form>

        <el-table :data="pageData" min-width="100%" :border="true">
            <el-table-column prop="logDate" width="160px" label="日志时间" align="center" :formatter="$dateTimeFm"> </el-table-column>
            <el-table-column prop="pid" width="60px" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="channel" width="80px" label="渠道" align="center"></el-table-column>
            <el-table-column prop="activeDate" width="160px" label="生效时间" align="center" :formatter="$dateTimeFm"> </el-table-column>
            <el-table-column prop="opt" width="100px" label="操作人" align="center"></el-table-column>
            <el-table-column prop="accountType" width="60px" label="后台类型" align="center"></el-table-column>
            <el-table-column prop="mark" width="120px" label="备注" align="center"></el-table-column>
            <el-table-column prop="cooperationType" width="100px" label="合作方式" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.cooperationType">
                        修改前:{{scope.row.cooperationType[0]}}<br />
                        修改后:{{scope.row.cooperationType[1]}}<br />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" width="100px" label="单价/投入金额" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.price">
                        修改前:{{scope.row.price[0]}}<br />
                        修改后:{{scope.row.price[1]}}<br />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="rate" width="100px" label="分成比例" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.rate">
                        修改前:{{scope.row.rate[0]}}<br />
                        修改后:{{scope.row.rate[1]}}<br />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="deliveryCycle" width="100px" label="投放周期" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.deliveryCycle">
                        修改前:{{scope.row.deliveryCycle[0]}}<br />
                        修改后:{{scope.row.deliveryCycle[1]}}<br />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="config" label="扣量配置" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.config">
                        <b>修改前:</b>
                        <div v-for="(item ,index) in (scope.row.config[0]||[])" :key="'info-'+index">
                            <div v-if="scope.row.cooperationType[0] == 'CPA'">
                                {{foramtCPACell(scope.row.config[0], index)}}
                            </div>
                            <div v-else-if="scope.row.cooperationType[0] == 'CPS'">
                                充值:{{item.totalRecharge}} 扣量比:{{item.rate}}
                            </div>
                        </div>
                        <b>修改后:</b>
                        <div v-for="(item2 ,idx2) in (scope.row.config[1]||[])" :key="'info+'+idx2">
                            <div v-if="scope.row.cooperationType[1] == 'CPA'">
                                {{foramtCPACell(scope.row.config[1], idx2)}}
                                <!-- 注册数量:{{idx2>0 ? scope.row.config[1][idx2 -1].value : '0'}}-{{item2.value}} 扣量比:{{item2.rate}} -->
                            </div>
                            <div v-else-if="scope.row.cooperationType[1] == 'CPS'">
                                充值:{{item2.totalRecharge}} 扣量比:{{item2.rate}}
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="修改详情" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="onclickShowDetail(scope.row)" size="large">详情</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

        <el-dialog :title="`修改详情${this.curData.channel}`" width="900px" :visible.sync="dialogDetail" @close="dialogDetail = false">
            <div style="display:flex;justify-content:center;">
                <div style="width:400px;">
                    <div> 修改前:</div>
                    <showCooperationDialog :cooperationType="formBefore.cooperationType" :_readOnly="true" :dataVal="formBefore" />
                </div>
                <div style="height:510px;padding:20px;display:flex;align-items:center">
                    <i class="el-icon-right"></i>
                </div>
                <div style="width:400px">
                    <div> 修改后:</div>
                    <showCooperationDialog :cooperationType="formAfter.cooperationType" :_readOnly="true" :dataVal="formAfter" />
                </div>
            </div>
        </el-dialog>

    </el-card>
</template>

<script>
import { getCooperationLog } from '@/api/channel';
import { accountTypes, pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
import showCooperationDialog from './showCooperation.vue';
export default {
    components: {
        showCooperationDialog,
    },
    data() {
        return {

            page: 1,
            count: 10,
            totalCount: 0,

            pidList: pidList,

            pageData: [],

            search: {},
            dateArr1: [],
            accountTypes: accountTypes,

            dialogDetail: false,
            formBefore: {},
            formAfter: {},
            curData: {},

        };
    },

    created() {
        this.loadData();
    },

    methods: {

        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },

        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },

        formatChange(row, column, cellValue) {
            if (cellValue) {
                let str1 = cellValue[0] ? cellValue[0] : '无';
                let str2 = cellValue[1] ? cellValue[1] : '无';
                return '修改前:' + str1 + '\n修改后' + str2;
            } else {
                return '无变化';
            }
        },


        getQuery() {
            let query = { ...this.search };
            query.pid= CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateBegin = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },

        searchData() {
            this.page = 1;
            this.loadData();
        },



        async loadData() {
            let res = await this.$http(getCooperationLog, { page: this.page, count: this.count, ...this.search, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        async onclickShowDetail(row) {
            this.curData = row;
            // let res = await this.$http(getCooperation, { id: row._id });
            // if (res.code === 200) {
            // this.data_patner = res.msg.pageData;
            // this.formBefore = res.msg.data;
            // this.curCooperationType = res.msg.type;
            this.dialogDetail = true;
            this.formBefore = {
                cooperationType: row.cooperationType[0],
                price: row.price ? row.price[0] : 0,
                rate: row.rate ? row.rate[0] : 0,
                deliveryCycle: row.deliveryCycle ? row.deliveryCycle[0] : 0,
                config: row.config ? row.config[0] : 0,
            };
            this.formAfter = {
                cooperationType: row.cooperationType[1],
                price: row.price ? row.price[1] : 0,
                rate: row.rate ? row.rate[1] : 0,
                deliveryCycle: row.deliveryCycle ? row.deliveryCycle[1] : 0,
                config: row.config ? row.config[1] : 0,
            };


        },

        foramtCPACell(info, idx) {

            let str = '注册数量:' + (idx > 0 ? info[idx - 1].value + 1 : '0') + ' -  ' + info[idx].value + ' 扣量比:' + info[idx].rate;
            return str;
        },


    }

}
</script>

<style>
</style>
