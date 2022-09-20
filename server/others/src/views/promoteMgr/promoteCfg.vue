<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item> -->
        </el-form>
        <h3>当前生效配置</h3>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="rate" label="基础分成比例" align="center"></el-table-column>
            <el-table-column prop="config" label="分成配置" align="center" width="400">
                <template slot-scope="props">
                    <el-card>
                        <el-table :data="props.row.config" :border="true" :stripe="true" style="width:100%">
                            <el-table-column prop="value" label="分成开始金额" align="center">
                            </el-table-column>
                            <el-table-column prop="rate" label="分成比例" align="center" />
                        </el-table>
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="activeDate" label="激活时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="200" align="center">

            </el-table-column> -->
        </el-table>
        <h3>可编辑配置</h3>
        <el-table :data="editPageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="rate" label="基础分成比例" align="center"></el-table-column>
            <el-table-column prop="config" label="分成配置" align="center" width="400">
                <template slot-scope="props">
                    <el-card>
                        <el-table :data="props.row.config" :border="true" :stripe="true" style="width:100%">
                            <el-table-column prop="value" label="分成开始金额" align="center">
                            </el-table-column>
                            <el-table-column prop="rate" label="分成比例" align="center" />
                        </el-table>
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="activeDate" label="激活时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑推广配置" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="基础分成比例">
                    <el-input v-model="formObj.rate" placeholder="请输入"></el-input>
                </el-form-item>
                <!--     <el-form-item label="分成开始金额">
                    <el-input v-model="formObj.config.value" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="分成比例">
                    <el-input v-model="formObj.config.rate" placeholder="请输入"></el-input>
                    范围（0-1）
                </el-form-item> -->
                <el-form-item label="分成配置">
                    <el-button type="primary" style="float:right;margin-left:30px" @click="addCfg(1)">添加</el-button>
                </el-form-item>
                <!--  <div v-for="(item,index) in formObj.config" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                    分成开始金额
                    <el-input v-model="item.value" style="margin-left:10px;width:6rem;" />
                    <span style="padding:0px 10px">分成比例</span>
                    <el-input v-model="item.rate" style="width:4rem;" />
                </div> -->
                <div v-for="(item,index) in formObj.config" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                    分成开始金额
                    <el-input style="width:6em;" v-model="item.value" />
                    <div style="width:10px;background-color:#000;height:1px" />
                    <el-input :value="formObj.config[index+1] ? (formObj.config[index+1].value -0 - 1) +'' :'∞'" disabled style="width:6rem;" />
                    <span style="padding:0px 10px">分成比例</span>
                    <el-input v-model="item.rate" style="width:4rem;" />
                    <i class="el-icon-delete" @click="delCfg(index)" style="margin-left:10px;color:#005CF9"></i>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { getCurCfg, getNextCfg, updateNextCfg } from '@/api/promote.js';
import { pidList } from '@/utils/baseConst';
import { deepClone } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            search: { pid: "A" },
            pageData: [],
            editPageData: [],
            dateArr1: [],
            pidList: pidList,
            formObj: { config: [{ value: 0, rate: 0 }] },
            dialogVisible: false,
        };
    },
    async created() {
        this.loadData();
        this.loadDataNext();
    },
    methods: {
        async searchData() {
            this.loadData();
            this.loadDataNext();
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            return query;
        },
        async loadData() {
            let res = await this.$http(getCurCfg, { ...this.getQuery() });
            if (res.code === 200 && res.msg) {
                let arr = [];
                arr.push(res.msg);
                this.pageData = arr;
            }
            else {
                this.pageData = [];
            }
        },
        async loadDataNext() {
            let res = await this.$http(getNextCfg, { ...this.getQuery() }, true);
            if (res.code === 200 && res.msg) {
                let arr = [];
                arr.push(res.msg);
                this.$nextTick(() => {
                    this.editPageData = arr;
                    this.totalCount = res.msg.totalCount;
                });

            }
            else {
                this.editPageData = [];
                this.totalCount = 0;
            }
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = {};
            if (query.id) {
                res = await this.$http(updateNextCfg, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadDataNext();
            }
        },
        editLine(row) {
            this.formObj = {
                id: row._id,
                rate: row.rate,
                config: deepClone(row.config)
            };
            this.dialogVisible = true;
        },
        addCfg(type) {
            let item = { rate: 0, value: 0 };
            this.formObj.config.push(item);
        },
        delCfg(index) {
            this.formObj.config.splice(index, 1);
        },
    }
}
</script>
