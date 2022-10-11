<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="search.publisherId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频id">
                <el-input v-model="search.vid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="长短类型">
                <el-select v-model="search.timeType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频分类">
                <el-cascader v-model="search.categorie" :options="[{ name: '全部', id:undefined },...categorieList]" :props="{ expandTrigger: 'hover',checkStrictly:true,value:'id',label:'name'  }"></el-cascader>
            </el-form-item>
            <el-form-item label="视频标签">
                <el-select filterable v-model="search.tag" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in tagsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付费方式">
                <el-select v-model="search.payType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="记录时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" width="80" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="uid" label="用户id" align="center" width="100"></el-table-column>
            <el-table-column prop="vid" label="视频id" align="center" width="210"></el-table-column>
            <el-table-column prop="logDate" label="记录时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="name" show-overflow-tooltip label="视频名称" align="center" min-width="170"></el-table-column>
            <el-table-column prop="publisherId" label="发布人id" align="center" width="160"></el-table-column>
            <el-table-column prop="time" label="视频时长" align="center" :formatter="secondFormat" width="120"></el-table-column>
            <el-table-column prop="price" label="购买价格" align="center" width="80"></el-table-column>
            <el-table-column prop="watchedTime" label="视频停留时长" sortable align="center" width="100" :formatter="secondFormat"></el-table-column>
            <el-table-column prop="payType" label="付费类型" align="center" :formatter="payTypeFormat" width="80"></el-table-column>
            <el-table-column prop="timeType" label="长短类型" align="center" :formatter="timeTypeFormat" width="100"></el-table-column>
            <el-table-column prop="categories" show-overflow-tooltip label="分类" align="center" :formatter="nameFormat"></el-table-column>
            <el-table-column prop="tags" show-overflow-tooltip label="标签" align="center" :formatter="nameFormat"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center" width="120">
                <template slot-scope="scope">
                    {{scope.row.channel?scope.row.channel:"官方"}}
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getVideoHistory, videoHistoryLogExcel } from '@/api/usersManager';
import { payTypeList, pidList, timeTypeList } from '@/utils/baseConst';
import { secToString } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            pageData: [],
            formObj: {},
            dialogVisible: false,
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
    async created() {
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            console.log(query.categorie);
            query.categorie = query.categorie ? query.categorie[query.categorie.length - 1] : undefined;

            //query.categorie = query.categorie ? query.categorie[1] : undefined;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateStart = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getVideoHistory, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.isCheckedTags = false;
                this.pageData = res.msg.pageData;
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

        payTypeFormat(row, column, cellValue) {
            let item = this.payTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        timeTypeFormat(row, column, cellValue) {
            let item = this.timeTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        nameFormat(row, column, cellValue) {
            let newArr = [];
            for (let i of this.categorieList) {
                newArr.push({ label: i.label, value: i.value });
                if (i.children) {
                    for (let j of i.children) {
                        newArr.push({ label: j.label, value: j.value });
                    }
                }
            }
            let item = newArr.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        tagsFormat(row, column, cellValue) {
            let str = '';
            if (cellValue && cellValue.length > 0) {
                for (let j of cellValue) {
                    let item = this.tagsList.find(i => i.value === j);
                    str += (item ? item.label : j) + " ";
                    if (!item && !this.isCheckedTags) {
                        this.isCheckedTags = true;
                        this.$message('标签未解析，已更新，请重新查询');
                        this.$store.dispatch("baseData/setTags",CURRENTPID);
                    }
                }
            }
            return str ? str : cellValue;
        },
        nameFormat(row, column, cellValue) {
            if (cellValue instanceof Array) {
                let arr = cellValue.map(i => i.name);
                return arr.join(' ');
            }
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(updateVideos, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = {
                id: row._id,
                name: row.name,
                categorie: row.categorie,
                tags: row.tags,
                payType: row.payType,
                timeType: row.timeType,
                state: row.state,
                summary: row.summary
            };
            this.dialogVisible = true;
        },
        async exportData() {
            let res = await this.$http(videoHistoryLogExcel, { ...this.getQuery(), page: 1, count: 1 });
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
.zoneBox {
    display: flex;
    width: 280px;
    align-items: center;
    .inputs {
        flex: 3;
        display: flex;
        justify-content: center;
    }
    .line {
        text-align: center;
        flex: 1;
    }
}
</style>