<template>
    <el-card>
        <el-col class="toolbar1">
            <el-popover ref="popover1" placement="top" itle="标题" trigger="hover" content="域名维护"></el-popover>
            <el-button v-popover:popover1 type="text" class="el-icon-info"></el-button>
            <span class="title">渠道验证重置</span>
        </el-col>
        <!-- <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>

        </el-form>

        <el-table :data="pageData" min-width="100%" :border="true">
            <el-table-column prop="act" label="渠道账号" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
            <el-table-column prop="loginHiddenAuthFailCount" label="登录失败次数" align="center"></el-table-column>

        </el-table> -->

        <el-select v-model="search.pid" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
        </el-select>
        <el-button type="primary" @click="loadData" style="margin:0px 0px 10px 10px">搜索</el-button>
        <br />
        <el-table :data="pageData" border highlight-current-row style="width: 100%;margin-bottom:25px">
            <el-table-column type="expand" label="展开" width="100">
                <template slot-scope="props">
                    <el-table :data="props.row.info">
                        <el-table-column prop="act" label="渠道账号" align="center"></el-table-column>
                        <el-table-column label="隐藏验证登陆失败次数" prop="loginHiddenAuthFailCount" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="submitReset(props.row.pid,scope.row.act)">重置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="pid" label="项目" min-width="100" :formatter="$pidFormat"></el-table-column>
        </el-table>

    </el-card>
</template>

<script>
import { pidList } from '@/utils/baseConst';
import { getListLoginHiddenAuth, resetLoginHiddenAuth } from '@/api/channel';
import showCooperationDialog from './showCooperation.vue';
export default {
    components: {
        showCooperationDialog,
    },
    data() {
        return {


            pidList: pidList,

            pageData: [],

            search: {},
        };
    },

    created() {
        this.loadData();
    },

    methods: {


        searchData() {
            this.loadData();
        },

        async loadData() {
            let res = await this.$http(getListLoginHiddenAuth, { ...this.search });
            if (res.code === 200) {
                this.pageData = res.msg;
                console.log('this.pageData = ', this.pageData);
            }
        },


        async submitReset(pid, act) {
            let res = await this.$http(resetLoginHiddenAuth, {
                pid: pid,
                act: act
            });
            if (res.code === 200) {
                this.$message.success('重置成功！');
                this.loadData();
            }
        }





    }

}
</script>

<style>
</style>