<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="serach.pid" placeholder="请选择">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="奖励类型">
                <el-select v-model="serach.rewardType" placeholder="请选择">
                    <el-option v-for="item in RewardType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动名称">
                <el-input v-model="serach.name"></el-input>
            </el-form-item>

            <el-form-item label="开关">
                <el-switch v-model="serach.active" />
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="searchData">读取</el-button>
                <!-- <el-button type="primary" @click="submitForm">提交修改</el-button> -->
                <el-button type="primary" @click="addOne">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <!-- <el-table-column prop="pid" label="项目" width="100px" align="center" :formatter="$pidFormat">
            </el-table-column> -->
            <el-table-column prop="name" label="活动名称" width="300px" align="center"></el-table-column>
            <el-table-column prop="active" width="100px" label="开关" align="center" :formatter="boolFormat">
            </el-table-column>
            <el-table-column prop="rewardType" width="150px" label="奖励类型" align="center" :formatter="rewardTypeFormat">
            </el-table-column>
            <el-table-column prop="vipLevel" width="200px" label="vip特权等级" align="center" :formatter="vipInfoFomat">
            </el-table-column>
            <el-table-column prop="rewardCntArr" label="奖励配置" :formatter="arrayToStr" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="this.title" :visible.sync="dialogVisible" width="600px">
            <el-form label-position="top" label-width="100px">
                <!-- <el-form-item label="项目" v-if="!isUpdate">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="名称">
                    <el-input v-model="formObj.name"></el-input>
                </el-form-item>
                <el-form-item label="开关">
                    <el-switch v-model="formObj.active" />
                </el-form-item>
                <el-form-item label="奖励类型">
                    <el-select v-model="formObj.rewardType" placeholder="请选择">
                        <el-option v-for="item in RewardType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="vip特权等级" v-if="formObj.rewardType==='vip'">
                    <el-select v-model="formObj.vipLevel" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in (viplevelInfoList).filter(e=>e.pid===formObj.pid)" :key="item.vipLevel" :label="item.pid+'_'+item.name" :value="item.vipLevel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖励列表(多个按逗号,分开,只能设置7个)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.rewardCntArr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addSignIn, getSignIn, updateSignIn } from '@/api/activity';
import { getVipLevelPrivileges } from '@/api/serverConfigure';
import { pidList, RewardType } from '@/utils/baseConst';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            serach: {},
            formObj: {},
            pageData: [],
            totalCount: 0,
            page: 1,
            count: 10,
            pidList: pidList,
            RewardType: RewardType,
            taskList: [],
            title: "编辑",
            dialogVisible: false,
            isUpdate: false,
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
            let ret=await Promise.all([
                this.$http(getSignIn, { pid:CURRENTPID, page: this.page, count: this.count }, true),
                this.$http(getVipLevelPrivileges,{pid:CURRENTPID},true),
            ]);
            // let res = await this.$http(getSignIn, { pid:this.serach.pid, page: this.page, count: this.count }, true);
            if (ret[0].code === 200) {
                this.pageData = ret[0].msg.pageData;
                this.totalCount = ret[0].msg.totalCount;
            }
            if(ret[1].code===200){
               this.viplevelInfoList=(ret[1].msg.pageData||[]).map(e=>{return {pid:e.pid,name:e.name,vipLevel:e.vipLevel}});
            }
        },
        async submitForm() {
            let query = { ...this.formObj };
            query.pid = CURRENTPID;
            query.rewardCntArr = this.$splitStr(query.rewardCntArr);
            if (this.isUpdate) {
                let res = await this.$http(updateSignIn, query);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            } else {
                let res = await this.$http(addSignIn, query);
                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.loadData();
                    this.dialogVisible = false;
                }
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        boolFormat(row, column, cellValue) {
            return cellValue ? "开" : "关";
        },
        arrayToStr(row, column, cellValue) {
            return cellValue && cellValue.length ? cellValue.join(",") : "";
        },
        rewardTypeFormat(row, column, cellValue) {
            let find = this.RewardType.find(e => e.value === cellValue);
            return find ? find.label : cellValue;
        },
        vipInfoFomat(row, column, cellValue) {
            let vipInfo=this.viplevelInfoList.find(e=>e.pid===row.pid&&e.vipLevel===cellValue)
            return vipInfo?vipInfo.pid+"_"+vipInfo.name:cellValue===0?"-":cellValue;
        },
        editLine(row) {
            this.title = "编辑平台:" + row.pid;
            this.formObj = {
                pid: row.pid,
                id: row._id,
                active: row.active,
                name: row.name,
                rewardType: row.rewardType,
                vipLevel: row.vipLevel,
                rewardCntArr: row.rewardCntArr.join(','),
            };
            this.isUpdate = true;
            this.dialogVisible = true;
        },
        addOne() {
            this.title = "新增配置";
            this.formObj = {pid:CURRENTPID};
            this.isUpdate = false;
            this.dialogVisible = true;
        },
    }
};
</script>
