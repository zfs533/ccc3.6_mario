<template>
    <el-card>
        <el-col class="toolbar1">
            <el-popover ref="popover1" placement="top" itle="标题" trigger="hover" content="域名维护"></el-popover>
            <el-button v-popover:popover1 type="text" class="el-icon-info"></el-button>
            <span class="title">渠道归属人</span>
        </el-col>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="归属人名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">新增</el-button>
                <!-- <el-button type="primary" @click="isDbatch">导出</el-button> -->
            </el-form-item>

        </el-form>

        <el-table :data="pageData" min-width="100%" :border="true">
            <!-- <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column> -->
            <el-table-column prop="name" label="渠道归属人" align="center"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
        </el-table>

        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

        <el-dialog title="新增渠道归属人" :visible.sync="dialogAdd" width="500px">
            <el-form>
                <!-- <el-form-item label="项目" label-width="100px">
                    <el-select v-model="addInfo.pid" placeholder="请选择项目" style="width:110px">
                        <template v-for="item in pidList">
                            <el-option :key="item.pid" :label="item.name" :value="item.pid" v-if="item.pid!=undefined"></el-option>
                        </template>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="归属人名称" label-width="100px">
                    <el-input type="textarea" v-model="addInfo.name" :rows="2" placeholder="请输入归属人名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd=false">取消</el-button>
                <el-button type="primary" @click="addOne">确定</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>

<script>
import { getPartnerMany, insertOnePartnerdata } from '@/api/channel';
import { pidList } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {

    data() {
        return {

            page: 1,
            count: 10,
            totalCount: 0,

            pidList: pidList,

            pageData: [],

            search: {},

            dialogAdd: false,
            addInfo: {},
        };
    },

    created() {
        this.search.pid=CURRENTPID;
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


        searchData() {
            this.page = 1;
            this.loadData();
        },


        async loadData() {
            let res = await this.$http(getPartnerMany, { page: this.page, count: this.count, ...this.search });
            // console.log('res = ', res);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        showAdd() {
            this.addInfo={pid:CURRENTPID};
            this.dialogAdd = true;
        },

        async addOne() {
            if (this.addInfo.name.trim() == "") {
                this.$message.error("名称不能为空");
                return;
            }

            let res = await this.$http(insertOnePartnerdata, this.addInfo);

            if (res.code == 200) {

                this.$message.success("添加成功！");
                this.loadData();
                this.addInfo.name = "";
                this.dialogAdd = false;
                return;
            }
        }
    }

}
</script>

<style>
</style>
