<template>
    <el-card>
        <el-col class="toolbar1">
            <el-popover ref="popover1" placement="top" itle="标题" trigger="hover" content="域名维护"></el-popover>
            <el-button v-popover:popover1 type="text" class="el-icon-info"></el-button>
            <span class="title">域名维护</span>
        </el-col>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="域名">
                <el-input v-model="search.url" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="search.state" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="search.type" placeholder="全部">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">批量新增</el-button>
                <el-button type="primary" @click="deleteList">批量删除</el-button>
                <!-- <el-button type="primary" @click="isDbatch">导出</el-button> -->
            </el-form-item>

        </el-form>
        <el-table :data="pageData" border tooltip-effect="dark" @selection-change="handleSelectionChange" cell-class-name="tableTd" header-cell-class-name="tableTh">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="pid" fixed label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="domain" fixed label="主域名" align="center"></el-table-column>
            <el-table-column prop="state" label="使用状态" :formatter="statusFormat" align="center"></el-table-column>
            <el-table-column prop="channelsNum" label="使用个数" align="center"></el-table-column>
            <el-table-column prop="type" label="域名类型" :formatter="typeFormat" align="center"></el-table-column>
            <el-table-column prop="closeDate" label="关闭时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" :formatter="$dateTimeFm" width="160" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editLine(scope.row)" size="small">编辑</el-button>
                    <el-button type="primary" v-if="scope.row.state!==1" @click="deleteLine(scope.row)" size="small">删除</el-button>
                    <el-button type="primary" v-if="scope.row.state==1" @click="closeLine(scope.row)" size="small">关闭</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

        <el-dialog title="批量新增" :visible.sync="dialogAdd" width="500px">
            <el-form>
                <el-form-item label="项目" label-width="80px">
                    <el-select v-model="addArr.pid" placeholder="请选择pid" style="width:110px">
                        <template v-for="item in pidList">
                            <el-option :key="item.pid" :label="item.name" :value="item.pid" v-if="item.pid!=undefined"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="域名" label-width="80px">
                    <el-input type="textarea" v-model="addArr.urls" :rows="2" placeholder="请输入域名，多个域名用英文逗号(,)隔开"></el-input>
                </el-form-item>
                <el-form-item label="类型" label-width="80px">
                    <el-select v-model="addArr.type" placeholder="请选择域名类型">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd=false">取消</el-button>
                <el-button type="primary" @click="addFuc">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="`编辑:${dialogId}`" :visible.sync="dialogEditor" width="500px">
            <el-form>
                <el-form-item label="域名" label-width="80px">
                    <el-input type="textarea" v-model="editArr.url" :rows="2"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditor=false">取消</el-button>
                <el-button type="primary" @click="updateFuc">确定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import { delUrlMaintenance, getUrlMaintenance, insertUrlMaintenance, invalidOne, updateUrlMaintenance } from '@/api/channel';
import { pidList, UrlStateList, UrlTypeList } from '@/utils/channelShield';


export default {

    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,


            multipleSelection: [],
            editArr: [],

            search: {},
            statusList: UrlStateList,
            typeList: UrlTypeList,
            pidList: pidList,


            pageData: [],


            dialogAdd: false,
            addArr: [],
            dialogId: "",
            dialogEditor: false,

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


        statusFormat(row, column, cellValue) {
            let item = this.statusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },

        typeFormat(row, column, cellValue) {
            let item = this.typeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },


        searchData() {
            this.page = 1;
            this.loadData();
        },

        showAdd() {
            this.dialogAdd = true;
        },

        async addFuc() {
            let queryItem = { ...this.addArr };
            if (queryItem.urls.trim() == "") {
                this.$message.error("域名不能为空");
                return;
            }
            queryItem.urls = queryItem.urls.split(",");

            function checkDuplicationNormal(arr) {
                return arr.some((val, idx) => {
                    return arr.includes(val, idx + 1);
                });
            }
            if (checkDuplicationNormal(queryItem.urls)) {
                this.$message.error("域名有重复");
                return;
            }
            let res = await this.$http(insertUrlMaintenance, queryItem);

            if (res.code == 200) {

                this.$message.success("添加成功！");
                this.loadData();
                this.addArr.urls = "";
                this.addArr.type = "";
                this.addArr.pid = "";
                this.dialogAdd = false;
                return;
            }

        },

        async exportData() {
            let res = await this.$http(usersListExcel, this.search);
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
            }
        },

        async loadData() {
            let res = await this.$http(getUrlMaintenance, { page: this.page, count: this.count, ...this.search });
            // console.log('res = ', res);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        async updateFuc() {
            let queryItem = {
                beforUrl: this.dialogId,
                afterUrl: this.editArr.url
            };
            let res = await this.$http(updateUrlMaintenance, queryItem);
            if (res.code == 200) {

                this.$message.success("修改成功！");
                this.dialogEditor = false;
                this.editArr.url = "";
                this.loadData();
            }
        },

        editLine(row) {
            this.dialogEditor = true;
            this.dialogId = row.domain;
        },

        deleteList() {
            let urls = [];
            for (let index = 0; index < this.multipleSelection.length; index++) {
                const element = this.multipleSelection[index];
                urls.push(element.domain);
            }
            this.$confirm(`此操作将批量删除选中域名, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(delUrlMaintenance, { urls: urls });
                    if (res.code == 200) {
                        this.$message.success("删除成功!");
                        this.loadData();
                        return;
                    }
                })
                .catch(() => {
                    this.$message.info("已取消删除");
                });
        },

        deleteLine(row) {
            //删除确认
            this.$confirm(`此操作将删除域名"${row.domain}", 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await this.$http(delUrlMaintenance, { urls: [row.domain] });

                if (res.code == 200) {
                    this.$message.success("删除成功!");
                    this.loadData();
                    return;
                }

            }).catch(() => {
                this.$message.info("已取消删除");
            });
        },

        closeLine(row) {
            //删除确认
            this.$confirm(`此操作将关闭并自动替换域名的引用"${row.domain}", 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await this.$http(invalidOne, { id: row._id });

                if (res.code == 200) {
                    this.$message.success("操作成功!");
                    this.loadData();
                    return;
                }

            }).catch(() => {
                this.$message.info("已取消操作");
            });
        }


    },

}
</script>

<style>
</style>