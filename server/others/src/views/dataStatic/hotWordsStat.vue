<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="热词">
                <el-input v-model="search.words"></el-input>
            </el-form-item>
            <el-form-item label="热度">
                    <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.priceMin" placeholder="起" style="width:120px">
                        </el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.priceMax" placeholder="止" style="width:120px">
                        </el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="serchData">查询</el-button>
                <el-button disabled type="success" @click="addOne">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" ref="table" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" width="100px" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="inx" label="排名" align="center" width="100px" ></el-table-column>
            <el-table-column prop="words" label="热词" align="center" min-width="100" ></el-table-column>
            <el-table-column prop="searchCnt" label="热度" align="center"></el-table-column>
             <el-table-column fixed="right" label="操作" width="200px" align="center">
                <template slot-scope="scope" >
                    <el-button type="text" style="margin:0 10px 0 0" @click="editOne(scope.row)">编辑</el-button>
                    <el-button type="text" style="margin:0 10px 0 0" @click="delOne(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="isUpdate?'编辑':'新增'" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
               <el-form-item label="项目">
                <el-select disabled v-model="formObj.pid">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="热词">
                    <el-input v-model="formObj.words" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="热度">
                    <el-input disabled v-model="formObj.searchCnt" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { addHotWords, delHotWords, getHotWordsStat, updateHotWords } from '@/api/dataStatic';
import { pidList } from '@/utils/baseConst';
import { dateFm } from '@/utils/formatter';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            formObj: {},
            pageData: [],
            search: {pid:"A"},
            dialogVisible:false,
            isUpdate:false,
            pidList:pidList,
        };
    },
    computed: {
   
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
            return query;
        },
        async loadData() {
            let res = await this.$http(getHotWordsStat, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        dateFormat(row, column, cellValue) {
            return dateFm(cellValue);
        },

        editOne(row){
            this.formObj={id:row._id,words:row.words,searchCnt:row.searchCnt,pid:row.pid};
            this.dialogVisible=true;
            this.isUpdate=true;
        },
        addOne(){
            this.formObj={pid:this.search.pid,searchCnt:0};
            this.dialogVisible=true;
            this.isUpdate=false;
        },
        async submitForm(){
            let query = { ...this.formObj };
            if (this.isUpdate) {
                let res = await this.$http(updateHotWords, query);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            } else {
                let res = await this.$http(addHotWords, query);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            }
        },
        async delOne(row){
            this.$confirm(`即将删除热词，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                    let res = await this.$http(delHotWords, { id: row._id });
                    if (res.code === 200) {
                        this.$message.success("删除成功");
                        this.loadData();
                    }else{
                        this.$message.error(`操作失败${res.err}`);
                    }
                })
                .catch(() => {
                    this.$message.info("已取消修改");
                });
            
        },
    },
};
</script>
<style lang="scss" scoped>
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
