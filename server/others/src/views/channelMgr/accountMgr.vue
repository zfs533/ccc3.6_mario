<template>
    <el-card>
        <el-col class="toolbar1">
            <el-popover ref="popover1" placement="top" itle="标题" trigger="hover" content="域名维护"></el-popover>
            <el-button v-popover:popover1 type="text" class="el-icon-info"></el-button>
            <span class="title">渠道账号页面</span>
        </el-col>

        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid" style="width:120px">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="渠道账号">
                <el-input v-model="search.act" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="父渠道">
                <el-input v-model="search.parentChannel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道等级">
                <el-select v-model="search.level" style="width:120px">
                    <el-option v-for="item in ChannelLevel" :key="item.pid" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <!-- <el-input v-model="search.channel" placeholder="请输入"></el-input> -->
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd()">新增</el-button>
                <!-- <el-button type="primary" @click="isDbatch">导出</el-button> -->
            </el-form-item>

        </el-form>

        <el-table :data="pageData" :border="true">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
            <el-table-column prop="parentChannel" label="父渠道" align="center"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
            <el-table-column prop="act" label="渠道账号" align="center"></el-table-column>
            <el-table-column prop="cooperationType" label="当日合作方式" align="center" :formatter="formatPriceTitle">
                <template slot-scope="scope">
                    <!-- <el-button type="text" style="width:20px" @click="onclickShowDetail(scope.row)">{{formatPriceTitle(scope.row)}}</el-button> -->
                    <div @click="onclickShowDetail(scope.row)" style="color:#1890ff" underline>
                        {{formatPriceTitle(scope.row)}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="activeDate" label="当前合作方式激活时间" align="center" width="270px" :formatter="$dateTimeFm">
            </el-table-column>

            <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="relegation" label="渠道归属人" align="center"></el-table-column>
            <el-table-column prop="ip" label="最后登陆ip" align="center"></el-table-column>
            <el-table-column prop="loginDate" label="最后登陆时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="allowSetSub" label="是否开设下级" align="center" :formatter="formatBoolen" width="60px"></el-table-column>
            <el-table-column prop="channelState" label="渠道状态" align="center" :formatter="formatBoolenChannelState" width="60px"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="150px" min-height="150px">
                <template slot-scope="scope" style="display:flex; padding:10px 5px">
                    <el-button style="margin:10px 3px" type="primary" v-if="(!scope.row.parentChannel && scope.row.allowSetSub)" @click="showChildrenMember(scope.row)" size="mini">下级</el-button>
                    <el-button style="margin:10px 3px" type="primary" @click="editRow(scope.row)" size="mini">编辑</el-button>
                    <el-button style="margin:10px 3px" type="primary" @click="showCooperationDialog(scope.row)" size="mini">合作方式</el-button>
                    <!-- <el-button type="primary" v-if="scope.row.state==1" @click="closeLine(scope.row)" size="small">关闭</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :title="`${this.curData.channel} 下级渠道`" :visible.sync="dialogVisible" width="1200px" @close="dialogVisible = false">
            <el-button style="margin:10px 3px" type="primary" @click="showAdd(curData.channel)" size="mini">新增下级</el-button>
            <el-button style="margin:10px 3px" type="primary" @click="getChildrenMembers" size="mini">刷新</el-button>
            <el-table :data="pageData2" width="100%" :border="true">
                <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat" width="60px"></el-table-column>
                <el-table-column prop="parentChannel" label="父渠道" align="center"></el-table-column>
                <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
                <el-table-column prop="act" label="渠道账号" align="center"></el-table-column>
                <el-table-column prop="cooperationType" label="当日合作方式" align="center" :formatter="formatPriceTitle"></el-table-column>

                <el-table-column prop="activeDate" label="当前合作方式激活时间" align="center" width="300px" :formatter="$dateTimeFm">
                    <!--   <template slot-scope="scope">
                        <div v-for="(item,index) in scope.row.activeDate" :key="index">
                            方式:{{item.type}}, 生效日:{{$dateTimeFm(item.activeDate)}}
                        </div>
                    </template> -->
                </el-table-column>

                <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="relegation" label="渠道归属人" align="center"></el-table-column>
                <el-table-column prop="ip" label="最后登陆ip" align="center"></el-table-column>
                <el-table-column prop="loginDate" label="最后登陆时间" align="center" :formatter="$dateTimeFm"></el-table-column>
                <el-table-column prop="allowSetSub" label="是否开设下级" align="center" :formatter="formatBoolen" width="60px"></el-table-column>

            </el-table>
            <el-col class="toolbar2">
                <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :current-page="childrenPage" :page-sizes="[10,20,30,50]" :page-size="childrenPage" :total="children_totalCount"></el-pagination>
            </el-col>
        </el-dialog>

        <el-dialog title="新增渠道" :visible.sync="dialog2Visible" width="1200px" @close="closeInsertView">
            <div class="mmain" style="width: 100%;display:flex;justify-content:space-between">
                <el-form :model="form_add" label-width="100px" class="left">
                    <!-- <el-form-item label="app">
                        <el-select v-model="form_add.pid" @change="onPidChange" :disabled="!!form_add.parentChannel">
                            <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                        </el-select>
                    </el-form-item> -->

                    <el-form-item label="账号">
                        <el-input v-model="form_add.act" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form_add.pwd" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form_add.contact" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form_add.remark" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="渠道归属人">
                        <el-select v-model="form_add.relegation" default-first-option filterable :disabled="!!form_add.parentChannel">
                            <el-option v-for="item in data_patner" :key="item.name" :label="item.name" :value="item.name" />
                        </el-select>
                    </el-form-item>

                    <!-- <el-form-item label="渠道功能开关">
                        <el-switch v-model="form_add.channelStatus" />
                    </el-form-item> -->
                    <el-form-item v-if="!form_add.parentChannel" label="开通下级">
                        <el-switch v-model="form_add.allowSetSub" />
                    </el-form-item>
                    <el-form-item label="渠道使用状态">
                        <el-switch v-model="form_add.channelState" />
                    </el-form-item>
                </el-form>
                <el-form class="mid" style="width:300px;">
                    <el-form-item label="渠道号">
                        <el-input v-model="form_add.channel" placeholder="首字符为字母"></el-input>
                    </el-form-item>

                    <el-form-item label="安卓下载域名">
                        <el-autocomplete v-model="form_add.adUrl" value-key="domain" :fetch-suggestions="querySearchDownload" placeholder="请输入域名" class="inline-input" style="width:300px">
                            <template slot-scope="{ item }">
                                <div style="float: left" class="name">{{ item.domain }}</div>
                                <span style="float: right; color: #8492a6; font-size: 13px" class="addr">{{ item.channelsNum }}</span>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="tf下载地址">
                        <el-input v-model="form_add.tfUrl" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="ios轻量下载地址">
                        <el-input v-model="form_add.iosUrl" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="入口域名">
                        <el-autocomplete v-model="form_add.gdDomain" value-key="domain" :fetch-suggestions="querySearchGeneral" placeholder="请输入域名" class="inline-input" style="width:300px">
                            <template slot-scope="{ item }">
                                <div style="float: left" class="name">{{ item.domain }}</div>
                                <span style="float: right; color: #8492a6; font-size: 13px" class="addr">{{ item.channelsNum }}</span>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="web访问地址">
                        <el-autocomplete v-model="form_add.h5Domain" value-key="domain" :fetch-suggestions="querySearchh5domain" placeholder="请输入域名" class="inline-input" style="width:300px">
                            <template slot-scope="{ item }">
                                <div style="float: left" class="name">{{ item.domain }}</div>
                                <span style="float: right; color: #8492a6; font-size: 13px" class="addr">{{ item.channelsNum }}</span>
                            </template>
                        </el-autocomplete>

                    </el-form-item>

                </el-form>
                <showCooperationDialog :cooperationType="form_add.cooperationType" :btnCallBack="this.insertChannel" :_canChangetype="!!form_add.parentChannel" />

            </div>
        </el-dialog>

        <el-dialog :title="`当前合作方式详情${this.curData.channel}`" :visible.sync="dialogDetail" width="440px" @close="dialogDetail = false">
            <div> 生效日期:{{$dateTimeFm(formDetail.activeDate)}}</div>
            <div> 修改日期:{{$dateTimeFm(formDetail.updateDate)}}</div>
            <showCooperationDialog :cooperationType="curCooperationType" :_readOnly="true" :dataVal="formDetail" />
        </el-dialog>
        <el-dialog :title="`编辑:${this.curData.channel}`" :visible.sync="dialogEditor" width="500px">
            <el-form>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="edit_pwd" style="width:200px;margin-right:50px" placeholder="********"></el-input>

                    <el-button type="primary" @click="updatePwd">修改密码</el-button>
                </el-form-item>
                <el-form-item label="联系方式" label-width="80px">
                    <el-input v-model="form_edit.contact"></el-input>
                </el-form-item>
                <el-form-item label="备注" label-width="80px">
                    <el-input v-model="form_edit.remark"></el-input>
                </el-form-item>
                <el-form-item label="开通下级" v-if="form_edit.parentChannel==undefined ?true:false">
                    <el-switch v-model="form_edit.allowSetSub" />
                </el-form-item>
                <el-form-item label="渠道状态">
                    <el-switch v-model="form_edit.channelState" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditor=false">取消</el-button>
                <el-button type="primary" @click="updateFuc">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="`修改当前合作方式${this.curData.channel}`" :visible.sync="dialogDetailEdit" width="440px" @close="onClickCloseDialog">
            <h3 style="color:#f00">任何修改都将在第二天0点生效</h3>
            <div> 生效日期:{{$dateTimeFm(formDetail.activeDate)}}</div>
            <div> 修改日期:{{$dateTimeFm(formDetail.updateDate)}}</div>
            <showCooperationDialog :cooperationType="curCooperationType" :dataVal="formDetail" :btnCallBack="this.editChannelCooperation" />
        </el-dialog>

    </el-card>

</template>

<script>
import { getChannelActLeaders, getChannelActMembers, getCooperation, getPartnerMany, getUrlByType, insertChannelAct, updateCooperation, updateUser } from '@/api/channel';
import { ChannelCooperationType, ChannelCooperationTypeList, ChannelLevel, pidList } from '@/utils/channelShield';
import { CURRENTPID } from '@/utils/myAsyncFn';
import showCooperationDialog from './showCooperation.vue';
export default {
    components: {
        showCooperationDialog,
    },

    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,

            pidList: pidList,
            ChannelLevel: ChannelLevel,
            search: { },
            pageData: [],

            dialogVisible: false,
            curData: {},
            pageData2: [],
            childrenPage: 1,
            cildren_count: 10,
            children_totalCount: 0,

            dialog2Visible: false,
            form_add: { channelState: true, allowSetSub: true },

            addInfo_curPid: "",
            data_url_download: [],
            data_url_general: [],
            data_url_h5domain: [],

            data_patner: [],
            ChannelCooperationTypeList: ChannelCooperationTypeList,

            dialogEditor: false,
            form_edit: {},
            edit_pwd: "",

            dialogDetail: false,
            formDetail: {

            },
            curCooperationType: "",
            dialogCooperation: false,

            dialogDetailEdit: false,
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

        handleCurrentChange2(val) {
            this.childrenPage = val;
            this.loadData();
        },

        //每页显示数据量变更
        handleSizeChange2(val) {
            this.cildren_count = val;
            this.loadData();
        },



        formatBoolen(row, column, cellValue) {
            return cellValue ? '是' : '否';

        },
        formatBoolenChannelState(row, column, cellValue) {
            return cellValue ? '开启' : '关闭';
        },
        formatPriceTitle(row, column) {
            switch (row.cooperationType) {
                case 'CPA':
                    return `CPA 单价:${row.price}`;
                case 'CPS':
                    return `CPS 分成比例:${row.price}`;
                case 'CPT':
                    return `CPT 投放资金:${row.price}`;
            }

        },

        async onclickShowDetail(row) {
            this.curData = row;
            let res = await this.$http(getCooperation, { id: row._id });
            if (res.code === 200) {
                // this.data_patner = res.msg.pageData;
                this.formDetail = res.msg.data;
                this.curCooperationType = res.msg.type;
                this.dialogDetail = true;
            }

        },

        searchData() {
            this.page = 1;
            this.loadData();
        },


        async loadData() {
            let res = await this.$http(getChannelActLeaders, { page: this.page, count: this.count, ...this.search });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },

        showAdd(parChannel) {
            this.addInfo_curPid = "";
            this.data_url_download = [];
            this.data_url_general = [];
            this.data_url_h5domain = [];
            this.data_patner = [];
            this.form_add.parentChannel = undefined;
            this.form_add = { allowSetSub: true, channelState: true, pid: CURRENTPID };

            if (parChannel) {
                this.form_add.pid = this.curData.pid;
                this.form_add.cooperationType = this.curData.cooperationType;
                this.form_add.parentChannel = parChannel;
                this.form_add.relegation = this.curData.relegation;
            }
            this.onPidChange(this.form_add.pid);
            this.loaddata_patner();

            this.dialog2Visible = true;
        },


        querySearchDownload(queryString, cb) {
            var restaurants = this.data_url_download;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        querySearchGeneral(queryString, cb) {
            var restaurants = this.data_url_general;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearchh5domain(queryString, cb) {
            var restaurants = this.data_url_h5domain;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },


        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.domain.toString().includes(queryString));
            };
        },

        showChildrenMember(row) {
            this.dialogVisible = true;
            this.curData = row;
            this.getChildrenMembers();
        },


        async getChildrenMembers(row, column) {
            let res = await this.$http(getChannelActMembers, { parent: this.curData.channel, page: this.childrenPage, count: this.cildren_count });
            if (res.code === 200) {
                this.pageData2 = res.msg.pageData;
                this.children_totalCount = res.msg.totalCount;
            }
        },

        editRow(row) {
            this.curData = row;
            this.form_edit = {
                id: row._id,
                contact: row.contact,
                remark: row.remark,
                allowSetSub: row.allowSetSub,
                channelState: row.channelState,
                parentChannel: row.parentChannel
            };
            this.edit_pwd = "";
            this.dialogEditor = true;
        },

        async updatePwd() {
            if (this.edit_pwd.trim() == "") {
                this.$message.error("域名不能为空");
                return;
            }

            let res = await this.$http(updateUser, { id: this.form_edit.id, pwd: this.edit_pwd });
            if (res.code == 200) {

                this.$message.success("修改成功！");
                this.dialogEditor = false;
                // this.loadData();
            }
        },

        async updateFuc() {
            let res = await this.$http(updateUser, this.form_edit);
            if (res.code == 200) {

                this.$message.success("修改成功！");
                this.dialogEditor = false;
                this.loadData();
            }
        },

        async insertChannel(type, config) {
            let param = {};
            if (type == ChannelCooperationType.CPA || type == ChannelCooperationType.CPS) {
                let addCfg = {
                    price: config.price,
                    config: config.config
                };
                param = { config: addCfg, cooperationType: type, ...this.form_add };
            } else {
                let addCfg = {
                    price: config.price,
                    deliveryCycle: config.deliveryCycle,
                };
                param = { config: addCfg, cooperationType: type, ...this.form_add };
            }
            let res = await this.$http(insertChannelAct, param);
            if (res.code !== 200) {
                return;
            }
            this.$message.success("添加渠道成功");

            this.dialog2Visible = false;
            this.form_add = { channelState: false, allowSetSub: false };

            this.addInfo_curPid = "";
            this.data_url_download = [];
            this.data_url_general = [];
            this.data_url_h5domain = [];
            this.data_patner = [];

            this.loadData();
        },

        async loaddata_patner() {
            let res = await this.$http(getPartnerMany, {pid:CURRENTPID}, true);
            if (res.code === 200) {
                this.data_patner = res.msg.pageData;
            }
        },


        async onPidChange(pid) {
            this.addInfo_curPid = pid;
            await this.loaddata_url();
        },

        async loaddata_url() {
            let res = await this.$http(getUrlByType, { pid: CURRENTPID }, true);
            if (res.code === 200) {
                let data = this.sortUrl(res);
                for (let i = 0; i < data.length; i++)
                    switch (data[i].type) {
                        case 'h5domain':
                            this.data_url_h5domain = data[i].list;
                            break;
                        case 'downloaddomain':
                            this.data_url_download = data[i].list;
                            break;
                        case 'general':
                            this.data_url_general = data[i].list;
                            break;
                    }
            }
        },

        sortUrl(findRet) {
            let data = (findRet.msg || []).map(e => {
                e.list.sort((a1, a2) => {
                    let a = 0;
                    // 使用的排在未使用的前面
                    let sta = a1.state - a2.state;
                    if (sta > 0) a -= 3;
                    if (sta < 0) a += 3;
                    // 创建时间早的在前面
                    let time = Date.parse(a1.createDate) - Date.parse(a2.createDate);
                    if (time > 0) a += 2;
                    if (time < 0) a -= 2;
                    // 数量使用少的在前面
                    let nex = a1.channelsNum - a2.channelsNum;
                    if (nex > 0) a += 1;
                    if (nex < 0) a -= 1;
                    return a;
                });
                return {
                    type: e.type,
                    list: e.list,
                };
            });
            return data;
        },

        async showCooperationDialog(row) {


            this.curData = row;
            let res = await this.$http(getCooperation, { id: row._id, isCurrent: false });
            if (res.code === 200) {
                // this.data_patner = res.msg.pageData;
                this.formDetail = res.msg.data;
                this.curCooperationType = res.msg.type;
                this.dialogDetailEdit = true;
            }

        },

        async editChannelCooperation(type, config) {
            let param = {};
            if (type == ChannelCooperationType.CPA || type == ChannelCooperationType.CPS) {
                let addCfg = {
                    price: config.price,
                    config: config.config
                };
                param = { config: addCfg, type: type, id: this.curData._id };
            } else {
                let addCfg = {
                    price: config.price,
                    deliveryCycle: config.deliveryCycle,
                };
                param = { config: addCfg, type: type, id: this.curData._id };
            }
            let res = await this.$http(updateCooperation, param);
            if (res.code !== 200) {
                return;
            }
            this.$message.success("修改合作方式成功");

            this.dialogDetailEdit = false;
            this.form_add = { channelState: false, allowSetSub: false };

            this.addInfo_curPid = "";
            this.data_url_download = [];
            this.data_url_general = [];
            this.data_url_h5domain = [];
            this.data_patner = [];

            this.loadData();
        },

        onClickCloseDialog() {
            this.dialogDetailEdit = false;
            this.curCooperationType = "";
            this.formDetail = {};

        },
        closeInsertView() {
            this.dialog2Visible = false;
            this.form_add.cooperationType = "";
        }

    }

}
</script>

<style>
</style>
