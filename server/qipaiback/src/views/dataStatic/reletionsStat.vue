<template>
    <el-card>
        <el-form :inline="true" style="width:100%">
            <el-form-item label="统计日期:">
                <el-date-picker v-model="sumDate" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="serchData">查询</el-button>
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-descriptions direction="vertical" :column="4" border style="margin-bottom:10px">
            <el-descriptions-item label-class-name="label_title1" label="安卓总下载">{{ totalSum.androidCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title2" label="ios总下载">{{ totalSum.iosCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title3" label="iosTF总下载">{{ totalSum.iosTfCount }}
            </el-descriptions-item>
            <el-descriptions-item label-class-name="label_title4" label="web总下载">{{ totalSum.unknownCount }}
            </el-descriptions-item>
        </el-descriptions> -->
        <el-table :data="pageData" :border="true" min-width="100%" ref="table" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" fixed width="80" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="sumDate" label="统计日期" align="center" fixed width="120px" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="retentionDay2" label="2日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay2_regCnt" label="2日注册数" align="center"></el-table-column>
            <el-table-column prop="retentionDay2_loignCnt" label="近2日登录数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay2" label="安卓2日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay2_regCnt" label="安卓2日注册数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay2_loignCnt" label="安卓近2日登录数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay2" label="ios2日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay2_regCnt" label="ios2日注册数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay2_loignCnt" label="ios近2日登录数" align="center"></el-table-column>

            <el-table-column prop="retentionDay3" label="3日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay3_regCnt" label="3日注册数" align="center"></el-table-column>
            <el-table-column prop="retentionDay3_loignCnt" label="近3日登录数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay3" label="安卓3日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay3_regCnt" label="安卓3日注册数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay3_loignCnt" label="安卓近3日登录数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay3" label="ios3日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay3_regCnt" label="ios3日注册数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay3_loignCnt" label="ios近3日登录数" align="center"></el-table-column>

            <el-table-column prop="retentionDay7" label="7日留存" align="center"></el-table-column>
            <el-table-column prop="retentionDay7_regCnt" label="7日注册数" align="center"></el-table-column>
            <el-table-column prop="retentionDay7_loignCnt" label="近7日登录数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay7" label="安卓7日留存" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay7_regCnt" label="安卓7日注册数" align="center"></el-table-column>
            <el-table-column prop="androidRetentionDay7_loignCnt" label="安卓近7日登录数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay7" label="ios7日留存" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay7_regCnt" label="ios7日注册数" align="center"></el-table-column>
            <el-table-column prop="iosRetentionDay7_loignCnt" label="ios近7日登录数" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { exportUserReletionStatData, getReletionStat } from '@/api/dataStatic';
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
            sumDate: getBeforeDate('date', 0, 0),
            search: {},
            pidList: pidList,
        };
    },
    computed: {

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
                query.sumDateBegin = this.sumDate[0];
                query.sumDateEnd = this.sumDate[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getReletionStat, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },


        async exportExcel() {
            let res = await this.$http(exportUserReletionStatData, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    },
};
</script>
