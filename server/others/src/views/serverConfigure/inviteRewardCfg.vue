<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addOne">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <!-- <el-table-column prop="pid" label="项目" width="100px" align="center" :formatter="$pidFormat">
            </el-table-column> -->
            <el-table-column prop="active" width="100px" label="开关" align="center" :formatter="boolFormat">
            </el-table-column>
            <el-table-column prop="vipLevel" width="200px" label="vip特权等级" align="center" :formatter="vipInfoFomat">
            </el-table-column>
            <el-table-column prop="invitedRewardVipDays" width="200px" label="被邀请人vip奖励天数" align="center">
            </el-table-column>
            <el-table-column prop="inviteRewards" min-width="400px" label="邀请人奖励" align="center">
                <template slot-scope="scope">
                    <div v-for="(item, idx2) in (scope.row.inviteRewards)" :key="'info+' + idx2">
                        <span> 邀请人数:{{ item.inviteCnt }}</span>
                        <span> vip奖励天数:{{ item.inviteRewardVipDays }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="this.title" :visible.sync="dialogVisible" width="600px">
            <el-form label-position="top" label-width="100px">
                <!-- <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="开关">
                    <el-switch v-model="formObj.active" />
                </el-form-item>
                <!-- <el-form-item label="vip等级" >
                    <el-input v-model="formObj.vipLevel" />
                </el-form-item> -->
                <el-form-item label="vip特权等级">
                    <el-select v-model="formObj.vipLevel" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in (viplevelInfoList).filter(e=>e.pid===formObj.pid)" :key="item.vipLevel" :label="item.pid+'_'+item.name" :value="item.vipLevel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="被邀请人vip奖励天数">
                    <el-input v-model="formObj.invitedRewardVipDays" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="邀请人奖励">
                    <!-- <el-button type="primary" style="float:right;margin-left:30px" @click="addLine()">添加</el-button> -->
                    <div v-for="(item, index) in formObj.inviteRewards" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                        邀请人数
                        <el-input v-model="item.inviteCnt" style="margin-left:10px;width:6rem;" />
                        <span style="padding:0px 10px">vip奖励天数</span>
                        <el-input v-model="item.inviteRewardVipDays" style="width:4rem;" />
                        <i class="el-icon-delete" @click="delLine(index)" style="margin-left:10px;color:#005CF9"></i>
                    </div>
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
import { addInvitationData, getInvitationData, getVipLevelPrivileges, updateInvitationData } from '@/api/serverConfigure';
import { JumpType, pidList, PosType, timeTypeList } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    components: {
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            pageData: [],
            dateArr1: [],
            pidList: pidList,
            formObj: {},
            dialogVisible: false,
            dateArr1: [],
            PosType: PosType,
            JumpType: JumpType,
            timeTypeList: timeTypeList,
            isPlay: false,
            title: "新增",
            playType: 2,
            JumpModel: undefined,
            vid: '',
            isDisabled: false,
            copyUrl: "",
            viplevelInfoList: [],
        };
    },
    async created() {
        this.search.pid = CURRENTPID;
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();

        },

        async loadData() {
            let ret = await Promise.all([
                this.$http(getInvitationData, { page: this.page, count: this.count, ...this.search }),
                this.$http(getVipLevelPrivileges, {pid:CURRENTPID}, true),
            ]);
            // let errRet=ret.find(e=>e.code!==200);
            // let res=await this.$http(getInvitationData, { page: this.page, count: this.count, ...this.search });

            if (ret[0].code === 200) {
                this.pageData = deepClone(await setImgView(ret[0].msg.pageData, "coverUrl"));
                this.totalCount = ret[0].msg.totalCount;
            }
            if (ret[1].code === 200) {
                this.viplevelInfoList = (ret[1].msg.pageData || []).map(e => { return { pid: e.pid, name: e.name, vipLevel: e.vipLevel }; });
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
        vipInfoFomat(row, column, cellValue) {
            let vipInfo = this.viplevelInfoList.find(e => e.pid === row.pid && e.vipLevel === cellValue);
            return vipInfo ? vipInfo.pid + "_" + vipInfo.name : cellValue === 0 ? "-" : cellValue;
        },
        vipInfoFomatByVipLevel(pid, vipLevel) {
            let vipInfo = this.viplevelInfoList.find(e => e.pid === pid && e.vipLevel === vipLevel);
            return vipInfo ? vipInfo.name : vipLevel === 0 ? "-" : vipLevel;
        },
        async submitForm() {
            let query = { ...this.formObj };
            query.pid = CURRENTPID;
            let res = {};
            // console.log("---------", query);
            if (query.id) {
                // 修改
                res = await this.$http(updateInvitationData, query);
            } else {
                // 添加
                res = await this.$http(addInvitationData, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.formObj = {};
                this.loadData();
            }
        },
        boolFormat(row, column, cellValue) {
            return cellValue ? "开" : "关";
        },
        editLine(row) {
            this.title = "编辑";
            this.formObj = {
                pid: row.pid,
                id: row._id,
                active: row.active,
                vipLevel: row.vipLevel,
                invitedRewardVipDays: row.invitedRewardVipDays,
                inviteRewards: row.inviteRewards,
            };
            this.dialogVisible = true;
        },
        addOne() {
            this.title = "新增";
            this.formObj = {
                pid: "A",
                active: false,
                invitedRewardVipDays: 0,
                inviteRewards: [],
            };
            this.dialogVisible = true;
        },
        addLine() {
            let item = { inviteCnt: 0, inviteRewardVipDays: 0 };
            this.formObj.inviteRewards.push(item);
        },
        delLine(index) {
            this.formObj.inviteRewards.splice(index, 1);

        },

    }
};
</script>
