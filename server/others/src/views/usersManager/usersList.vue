<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="search.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-select v-model="search.type" placeholder="请选择用户类型">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="search.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="最后登陆ip">
                <el-input v-model="search.loginIp" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="注册ip">
                <el-input v-model="search.registerIp" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="search.status" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="总充值范围">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.rechargeTotalMin" placeholder="起" style="width:120px">
                        </el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.rechargeTotalMax" placeholder="止" style="width:120px">
                        </el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="钻石范围">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.diamondMin" placeholder="起" style="width:120px">
                        </el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.diamondMax" placeholder="止" style="width:120px">
                        </el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="注册时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="最后登陆时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="vip到期时间">
                <el-date-picker v-model="dateArr3" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button v-if="!isKefu" type="primary" @click="exportData">导出</el-button>
                <el-button v-if="!isKefu" type="primary" @click="showAdd">添加用户</el-button>
            </el-form-item>
        </el-form>
        <div class="showColumns" style="margin-bottom:20px">
            <h4>表格显示列</h4>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="showColumns" @change="handleCheckedCitiesChange">
                <el-checkbox class="checkbox" v-for="(item, index) in columns" :label="item.value" :key="index">
                    {{ item.label }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :data="pageData" :border="true" min-width="100%" ref="table" max-height="800">
            <el-table-column v-if="showColumns.includes('pid')" prop="pid" label="项目" align="center" fixed width="100" :formatter="$pidFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('uid')" prop="uid" label="用户id" align="center" fixed width="150">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="showUidView(scope.row)">{{ scope.row.uid }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('username')" prop="username" label="用户昵称" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" sortable align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column v-if="showColumns.includes('lastLoginDate')" prop="lastLoginDate" label="最后登陆时间" sortable align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column v-if="showColumns.includes('vipLevel') && isKefu" prop="vipLevel" label="vip等级" align="center" width="120"></el-table-column>
            <el-table-column v-else-if="showColumns.includes('vipLevel')" prop="vipLevel" label="vip等级" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="showEditVipView(scope.row)">
                        {{ scope.row.vipLevel }}</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('vipEffectiveTime')" prop="vipEffectiveTime" label="vip到期时间" sortable align="center" width="170" :formatter="$dateTimeFm"></el-table-column>
            <!--   <el-table-column prop="activatedDate" label="激活时间" align="center" width="170" :formatter="$dateTimeFm"></el-table-column> -->
            <el-table-column v-if="showColumns.includes('invitedDate')" prop="invitedDate" label="邀请时间" align="center" width="170" :formatter="$dateTimeFm">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('email')" prop="email" label="邮箱" align="center" width="120">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('phone')" prop="phone" label="手机号" align="center" width="120">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('registerIp')" prop="registerIp" label="注册ip" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('ip')" prop="ip" label="最近登陆ip" align="center" width="120">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('videoCnt')" prop="videoCnt" label="发布量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('commentCnt')" prop="commentCnt" label="评论数" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('followCnt')" prop="followCnt" label="关注量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('followerCnt')" prop="followerCnt" label="被关注量" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="showFollowerView(scope.row)">
                        {{ scope.row.followerCnt }}</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('inviteCnt')" prop="inviteCnt" label="邀请数量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('invitedUid')" prop="invitedUid" label="邀请人" align="center" width="150"></el-table-column>
            <el-table-column v-if="showColumns.includes('likedCnt')" prop="likedCnt" label="获赞数量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('followTagCnt')" prop="followTagCnt" label="关注标签量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('collectCnt')" prop="collectCnt" label="收藏数量" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('status')" prop="status" label="用户状态" align="center" width="120" :formatter="statusFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('channel') && isKefu" prop="channel" label="渠道" align="center" width="120" :formatter="$channelFormat">
            </el-table-column>
            <el-table-column v-else-if="showColumns.includes('channel')" prop="channel" label="渠道" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="editChannel(scope.row)">
                        {{ scope.row.channel ? scope.row.channel : "官方" }}</el-button>
                </template>
            </el-table-column>

            <el-table-column v-if="showColumns.includes('avatarURL')" prop="avatarURL" label="头像" align="center" width="150">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.avatarURLView" style="width: 100px; height: 100px" :src="scope.row.avatarURLView" :preview-src-list="[scope.row.avatarURLView]">
                        <div slot="error" class="image-slot">
                            加载失败：<br />{{ scope.row.avatarURLView }}
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('sex')" prop="sex" label="性别" align="center" width="120" :formatter="sexFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('identifyCard')" prop="identifyCard" label="身份卡" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.identifyCard}}</span>
                    <div v-qr="
                    {
                        text:scope.row.identifyCard,
                        width:100,
                        height:100
                        }
                    " />
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('introduce')" prop="introduce" label="个人介绍" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('rechargeTotal')" prop="rechargeTotal" label="总充值" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('diamond')" prop="diamond" label="钻石" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('watchedTime')" prop="watchedTime" label="观影时长" align="center" width="120" :formatter="secondFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('watchCount')" prop="watchCount" label="观影次数" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('totalVipChargeMoney')" prop="totalVipChargeMoney" label="vip充值" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('totalDiamondChargeMoney')" prop="totalDiamondChargeMoney" label="钻石充值" align="center" width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('type') && isKefu" prop="type" label="用户类型" align="center" width="120" :formatter="typeFormat">
            </el-table-column>
            <el-table-column v-else-if="showColumns.includes('type')" prop="type" label="用户类型" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="showEditTypeView(scope.row)">
                        {{ typeFormat(0, 0, scope.row.type) }}</el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button v-if="!isKefu" type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑
                    </el-button>

                    <el-button type="text" style="margin:0 10px 0 0" @click="showAmountDetailView(scope.row)">流水详情
                    </el-button>
                    <!-- <el-button type="text" style="margin:0 10px 0 0" @click="bindInviter(scope.row.uid)">绑定邀请人</el-button> -->
                    <br>
                    <el-button v-if="!isKefu" type="text" style="margin:0 10px 0 0" @click="showEditDiamondView(scope.row)">上下分</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px">
            <el-form label-width="80px">
                <el-form-item label="项目" v-if="!formObj.id">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="formObj.username" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formObj.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="渠道号">
                    <el-input v-model="formObj.channel" placeholder="不输入默认是官方"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formObj.sex" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建类型" v-if="!formObj.id">
                    <el-select v-model="formObj.type" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formObj.remark" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <ImgUpload :imageUrl="formObj.avatarURLView" :path="UploadPath.HeadImage" @success="uploaded" />
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" :rows="3" v-model="formObj.introduce" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`流水详情:${this.uname}`" :visible.sync="openDialog" width="75%">
            <userAmountDetailDialog :uid="uid" :uname="uname" />
        </el-dialog>
        <el-dialog :title="`粉丝列表:${this.uname}`" :visible.sync="followDialog" width="75%">
            <followListDialog :uid="uid" />
        </el-dialog>
        <el-dialog :title="`用户id:${this.uid},用户昵称:${this.uname}`" :visible.sync="userDataDialog" width="75%">
            <attributionDialog :uid="uid" />
        </el-dialog>
        <el-dialog :title="`编辑vip等级:${this.username}`" :visible.sync="editVipVisible" width="600px" @close="closeEditVipView">
            <el-form label-width="80px" ref="editVipModel" :model="editVipModel">
                <el-form-item label="vip等级">
                    <el-input v-model="editVipModel.vipLevel" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="到期时间" v-show="vipEffectiveTimePicker">
                    <!--  <el-date-picker v-model="editVipModel.vipEffectiveTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker> -->
                    <el-date-picker v-model="editVipModel.vipEffectiveTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="描述" prop="description" :rules="{ required: true, message: '描述必填', trigger: 'blur' }">
                    <el-input v-model="editVipModel.description" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVipVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormEditVip">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`上下分:${this.username},目前分数:${this.diamond}`" :visible.sync="editDiamondVisible" width="600px">
            <el-form label-width="80px">
                <el-form-item label="钻石">
                    <el-input-number v-model="editDiamondModel.diamond"></el-input-number>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editDiamondModel.description" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click="submitFormEditDiamond('add')">上分钻石</el-button>
                <el-button type="warning" @click="submitFormEditDiamond('sub')" style="margin-left:120px">下分钻石
                </el-button>
            </div>
        </el-dialog>
        <el-dialog :title="`编辑用户类型:${this.username}`" :visible.sync="editTypeVisible" width="600px" @close="closeEditTypeView">
            <el-form label-width="80px" ref="editTypeModel" :model="editTypeModel">
                <el-form-item label="用户类型">
                    <el-select v-model="editTypeModel.type" placeholder="请选择用户类型" style="width:220px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description" :rules="{ required: true, message: '描述必填', trigger: 'blur' }">
                    <el-input v-model="editTypeModel.description" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editTypeVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormEditType">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addDiamond, bindInviter, createUser, getManyUserInfo, subDiamond, updateChannel, updateOne, updateType, updateVip, usersListExcel } from '@/api/usersManager';
import attributionDialog from "@/components/attribution.vue";
import followListDialog from "@/components/followList.vue";
import imgUpload from '@/components/imgUpload.vue';
import { pidList, sexList, UploadPath, userStatusList, UserTypeNew } from '@/utils/baseConst';
import { deepClone, secToString, setImgView } from '@/utils/formatter';
import userAmountDetailDialog from "./userAmountDetail.vue";
export default {
    components: {
        ImgUpload: imgUpload,
        userAmountDetailDialog: userAmountDetailDialog,
        followListDialog: followListDialog,
        attributionDialog: attributionDialog,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            pageData: [],
            formObj: {},
            dialogVisible: false,
            UploadPath: UploadPath,
            dialogTitle: "添加用户",
            statusList: userStatusList,
            sexList: sexList,
            typeList: UserTypeNew,
            pidList: pidList,
            editVipModel: {},
            editVipVisible: false,
            username: "",
            editDiamondVisible: false,
            editDiamondModel: {},
            diamond: "",
            openDialog: false,
            uid: '',
            uname: '',
            vipEffectiveTimePicker: false,
            columns: [],
            showColumns: [
                'pid',
                'uid',
                'username',
                'createdDate',
                'lastLoginDate',
                'vipLevel',
                'vipEffectiveTime',
                'email',
                'phone',
                'registerIp',
                'ip',
                'videoCnt',
                'commentCnt',
                'followCnt',
                'followerCnt',
                'inviteCnt',
                'likedCnt',
                'followTagCnt',
                'status',
                'channel',
                'avatarURL',
                'sex',
                'identifyCard',
                'introduce',
                'invitedUid',
                'invitedDate',
                'rechargeTotal',
                'diamond',
                'watchedTime',
                'watchCount',
                'totalVipChargeMoney',
                'totalDiamondChargeMoney',
                'type',
                'collectCnt',
            ],
            isIndeterminate: false,
            checkAll: true,
            followDialog: false,
            userDataDialog: false,
            editTypeVisible: false,
            editTypeModel: {},
            isKefu: false,
        };
    },
    created() {
        this.isKefu = this.$route.name.includes('kefu');
        this.loadData();
    },
    mounted() {
        for (let i of this.$refs.table.columns) {
            if (i.property && i.label) {
                this.columns.push({ value: i.property, label: i.label });
            }
        }
        this.showColumns = this.columns.map(i => i.value);
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createdDateStart = this.dateArr1[0];
                query.createdDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.lastLoginDateStart = this.dateArr2[0];
                query.lastLoginDateEnd = this.dateArr2[1];
            }
            if (this.dateArr3 && this.dateArr3.length > 1) {
                query.vipEffectiveTimeStart = this.dateArr3[0];
                query.vipEffectiveTimeEnd = this.dateArr3[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getManyUserInfo, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;

                this.pageData = deepClone(await setImgView(res.msg.pageData, "avatarURL"));
            }
        },
        async exportData() {
            await this.$confirm('确认导出吗？', '提示', {
                confirmButtonText: '跳转',
                cancelButtonText: '取消',
                type: 'warning'
            });
            let res = await this.$http(usersListExcel, { ...this.getQuery() });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
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

        statusFormat(row, column, cellValue) {
            let item = this.statusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        sexFormat(row, column, cellValue) {
            let item = sexList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        uploaded(path) {
            this.formObj.avatarURL = path;
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = {};
            if (query.id) {
                res = await this.$http(updateOne, query);
            }
            else {
                res = await this.$http(createUser, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        showAdd() {
            this.formObj = { pid: "A" };
            this.dialogTitle = "添加用户";
            this.dialogVisible = true;
        },
        editLine(row) {
            this.formObj = {
                id: row._id,
                username: row.username,
                phone: row.phone,
                sex: row.sex,
                introduce: row.introduce,
                avatarURLView: row.avatarURLView
            };
            this.dialogTitle = "编辑用户";
            this.dialogVisible = true;
        },
        async editChannel(row) {
            let prompt = await this.$prompt("请输入新渠道", `修改渠道`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            if (prompt.value) {
                let res = await this.$http(updateChannel, { id: row._id, channel: prompt.value });
                if (res.code === 200) {
                    this.$message.success("渠道修改成功");
                    this.loadData();
                }
            }

        },
        async showEditVipView(row) {
            this.username = row.username;
            if (row.vipLevel != 0) {
                this.vipEffectiveTimePicker = true;
            } else {
                this.vipEffectiveTimePicker = false;
            }
            this.editVipModel = { vipLevel: row.vipLevel, uid: row.uid, vipEffectiveTime: this.$dateTimeFm(row.vipEffectiveTime) };
            this.editVipVisible = true;
        },
        async submitFormEditVip() {
            this.$refs['editVipModel'].validate(async (valid) => {
                if (valid) {
                    let editModel = { ...this.editVipModel };
                    let res = await this.$http(updateVip, editModel);
                    if (res.code === 200) {
                        this.$message.success("vip等级修改成功");
                        this.loadData();
                        this.editVipVisible = false;
                    }
                } else {
                    this.$message.error("验证未通过，请按提示填写正确数据");
                    return;
                }
            });
        },
        async closeEditVipView() {
            await this.$refs['editVipModel'].resetFields();
        },
        async showEditTypeView(row) {
            this.username = row.username;
            this.editTypeModel = { uid: row.uid };
            this.editTypeVisible = true;
        },
        async submitFormEditType() {
            this.$refs['editTypeModel'].validate(async (valid) => {
                if (valid) {
                    let editModel = { ...this.editTypeModel };
                    let res = await this.$http(updateType, editModel);
                    if (res.code === 200) {
                        this.$message.success("用户类型修改成功");
                        this.loadData();
                        this.editTypeVisible = false;
                    }
                } else {
                    this.$message.error("验证未通过，请按提示填写正确数据");
                    return;
                }
            });
        },
        async closeEditTypeView() {
            await this.$refs['editTypeModel'].resetFields();
        },
        async bindInviter(uid) {
            let prompt = await this.$prompt("请输入邀请人的用户id", `绑定邀请人`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            if (prompt.value) {
                let res = await this.$http(bindInviter, { uid: uid, invitedUid: prompt.value });
                if (res.code === 200) {
                    this.$message.success("邀请人绑定成功");
                    this.loadData();
                }
            }
        },
        async showEditDiamondView(row) {
            this.username = row.username;
            this.diamond = row.diamond;
            this.editDiamondModel = { uid: row.uid };
            this.editDiamondVisible = true;
        },
        async submitFormEditDiamond(action) {
            let editDiamondModel = { ...this.editDiamondModel };
            let res = {};
            if (!editDiamondModel.diamond) {
                this.$message.error("请输入钻石数量");
                return;
            }
            if (!editDiamondModel.description) {
                this.$message.error("请输入描述");
                return;
            }
            if (action === "add") {
                if (editDiamondModel.diamond <= 0) {
                    this.$message.error("请输入大于0的数");
                    return;
                }
                res = await this.$http(addDiamond, editDiamondModel);
            } else {
                if (editDiamondModel.diamond >= 0) {
                    this.$message.error("请输入小于0的数");
                    return;
                }
                res = await this.$http(subDiamond, editDiamondModel);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
                this.editDiamondVisible = false;
            }

        },
        typeFormat(row, column, cellValue) {
            let item = this.typeList.find(i => i.value == cellValue);
            return item ? item.label : "普通用户";
        },

        showAmountDetailView(row) {
            this.uname = row.username;
            this.uid = row.uid;
            this.openDialog = true;
            /*  this.$nextTick(() => {
                 this.$refs.userAmountDetailDialog.init({ uid: row.uid, username: row.username });
             }); */
        },
        vipSelectChange(value) {
            if (value == 0) {
                this.vipEffectiveTimePicker = false;
            } else {
                this.vipEffectiveTimePicker = true;
            }
        },
        handleCheckAllChange(val) {
            this.showColumns = val ? this.columns.map(i => i.value) : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.columns.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
        },
        showFollowerView(row) {
            this.uname = row.username;
            this.uid = row.uid;
            this.followDialog = true;
        }
        , showUidView(row) {
            this.uname = row.username;
            this.uid = row.uid;
            this.userDataDialog = true;
        }
    }
};
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
