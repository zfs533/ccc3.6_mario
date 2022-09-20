<template>
    <el-card>
        <el-form :inline="true" style="width:100%">
            <el-form-item label="渠道账号">
                <el-input v-model="search.channelAct"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel"></el-input>
            </el-form-item>
            <el-form-item label="统计日期:">
                <el-date-picker v-model="sumDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="serchData">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <el-descriptions direction="vertical" :column="4" border style="margin-bottom:10px">
            <el-descriptions-item label-class-name="label_title1" label="安卓总下载">{{ totalSum.androidCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title2" label="ios总下载">{{ totalSum.iosCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title3" label="iosTF总下载">{{ totalSum.iosTfCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title4" label="web总下载">{{ totalSum.unknownCount }}
            </el-descriptions-item>
        </el-descriptions>
        <el-table :data="pageData" :border="true" min-width="100%" ref="table" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" fixed width="80" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="sumDate" label="统计日期" align="center" fixed width="120px" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="channel" label="渠道" align="center" fixed min-width="100"></el-table-column>
            <el-table-column prop="vistCount" label="总访问次数" align="center"></el-table-column>
            <el-table-column prop="usersCount" label="总访问用户数" align="center"></el-table-column>
            <el-table-column prop="repeatDownload" label="总下载次数" align="center"></el-table-column>
            <el-table-column prop="totalDownCount" label="总下载次数(去重)" align="center"></el-table-column>
            <el-table-column prop="androidCount" label="安卓下载次数(去重)" align="center"></el-table-column>
            <el-table-column prop="iosCount" label="ios下载次数(去重)" align="center"></el-table-column>
            <el-table-column prop="iosTfCount" label="iosTF下载次数(去重)" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { exportCpGuardStatData, getCpGuardStatData } from '@/api/dataStatic';
import { pidList } from '@/utils/baseConst';
import { getBeforeDate } from '@/utils/dateTime';
import { dateFm } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            formObj: {},
            pageData: [],
            totalSum: {
                androidCount: 0,
                iosCount: 0,
                iosTfCount: 0,
                unknownCount: 0,
            },
            sumDate: getBeforeDate('date', 0, 0),
            search: {},
            pidList: pidList,
        };
    },
    computed: {
        categorieList() {
            return this.$store.getters.categorieList;
        },
        tagsList() {
            return this.$store.getters.tagsList;
        }
    },
    created() {
        // this.loadData();
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
        serchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            if (this.sumDate && this.sumDate.length > 1) {
                query.startTime = this.sumDate[0];
                query.endTime = this.sumDate[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getCpGuardStatData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.totalSum = res.msg.totalSum || { androidCount: 0, iosCount: 0, iosTfCount: 0, unknownCount: 0, };
            }
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },


        async exportExcel() {
            let res = await this.$http(exportCpGuardStatData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    },
};
</script>