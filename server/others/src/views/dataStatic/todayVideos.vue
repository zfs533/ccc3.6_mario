<template>
    <el-card>
        <el-form :inline="true" style="width:100%">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频id">
                <el-input v-model="search.vid"></el-input>
            </el-form-item>
            <el-form-item label="排序方式">
                <el-select v-model="search.sort" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in todayVideoSortList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
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
        <el-table :data="pageData" :border="true" min-width="100%" ref="table" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" fixed width="80" :formatter="$pidFormat">
            </el-table-column>
            <el-table-column prop="sumDate" label="统计日期" align="center" fixed width="120px" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="vid" label="视频id" align="center" fixed min-width="210"></el-table-column>
            <el-table-column prop="watchedCount" label="观看次数" align="center"></el-table-column>
            <el-table-column prop="watchedUserCount" label="观看人数" align="center"></el-table-column>
            <el-table-column prop="likedCount" label="点赞次数" align="center"></el-table-column>
            <el-table-column prop="collectedCount" label="收藏数量" align="center"></el-table-column>
            <el-table-column prop="totalChargeMoney" label="今日总充值" align="center"></el-table-column>
            <el-table-column prop="totalChargeCount" label="今日购买次数" align="center"></el-table-column>
            <el-table-column prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column>
            <el-table-column prop="name" label="视频名称" align="center" show-overflow-tooltip min-width="200">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center"></el-table-column>
            <el-table-column prop="publisherId" label="发布人" align="center"></el-table-column>
            <el-table-column prop="timeType" label="长短类型" align="center" :formatter="timeTypeFormat"></el-table-column>
            <el-table-column prop="publishDay" label="发布天数" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="categorie" label="分类" align="center" :formatter="categorieFormat" min-width="200"></el-table-column>
            <el-table-column prop="tags" label="标签" align="center" :formatter="tagsFormat" min-width="200"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getTodayVideos } from '@/api/dataStatic';
import { payTypeList, pidList, timeTypeList, todayVideoSortList } from '@/utils/baseConst';
import { getBeforeDate } from '@/utils/dateTime';
import { dateFm, getWholeCategorieLabelByIds } from '@/utils/formatter';
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
            todayVideoSortList: todayVideoSortList,
            payTypeList: payTypeList,
            timeTypeList: timeTypeList,
            pidList: pidList,
            isCheckedTags: true,
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
        serchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            if (this.sumDate && this.sumDate.length > 1) {
                query.sumDateBegin = this.sumDate[0];
                query.sumDateEnd = this.sumDate[1];
            }
            return query;
        },
        async loadData() {
            if (!this.sumDate[1]) {
                this.$message.error('请选择日期');
                return;
            }
            let res = await this.$http(getTodayVideos, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.isCheckedTags = false;
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        }, payTypeFormat(row, column, cellValue) {
            let item = this.payTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        timeTypeFormat(row, column, cellValue) {
            let item = this.timeTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        categorieFormat(row, column, cellValue) {
            if (Array.isArray(cellValue) && cellValue.length != 0) {
                let v = getWholeCategorieLabelByIds(cellValue, this.categorieList);
                return v;
            }
        },
        // tagsFormatUnit(val) {
        //     let item = this.tagsList.find(i => i.value === val);
        //     return item ? item.label : val;
        // },
        // tagsFormat(row, column, cellValue) {
        //     if (cellValue instanceof Array) {
        //         let arr = cellValue.map(i => this.tagsFormatUnit(i));
        //         return arr.join(' ');
        //     }
        //     return cellValue;
        // },
        tagsFormat(row, column, cellValue) {
            let str = '';
            if (cellValue && cellValue.length > 0) {
                for (let j of cellValue) {
                    let item = this.tagsList.find(i => i.value === j);
                    str += (item ? item.label : j) + " ";
                    if (!item && !this.isCheckedTags) {
                        this.isCheckedTags = true;
                        this.$message('标签未解析，已更新，请重新查询');
                        this.$store.dispatch("baseData/setTags");
                    }
                }
            }
            return str ? str : cellValue;
        },
        async exportExcel() {
            let res = await this.$http(todayVideosExport, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },
    },
};
</script>