<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <!-- <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="渠道">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道类型">
                <el-select v-model="search.type" placeholder="全部">
                    <el-option v-for="item in ChannelTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="父渠道">
                <el-select v-model="search.fatherChannel" placeholder="全部">
                    <el-option v-for="(item, index) in fatherChannels" :key="index" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="状态">
                <el-select v-model="search.status" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <!-- <el-button type="primary" @click="exportData">导出</el-button> -->
                <el-button type="primary" @click="isDbatch">批量修改</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top:10px;">
            <span style="margin:5px 50px 0 0">主页修改:</span>
            <span>原域名:</span>
            <el-input v-model="oldWebDomain" style="width:200px; margin:5px 10px"></el-input>
            <span>新域名:</span>
            <el-input v-model="newWebDomain" style="width:200px; margin:5px 10px"></el-input>
            <el-button type="primary" @click="changeChannelWebDomain">修改</el-button>
            <el-button type="primary" @click="delChannelDomain">删除</el-button>
            <br />
        </div>
        <el-table :data="pageData" :border="true" min-width="100%">
            <!-- <el-table-column prop="pid" label="项目" min-width="80" align="center" :formatter="$pidFormat" /> -->
            <el-table-column prop="channel" label="渠道" min-width="100" align="center" :formatter="$channelFormat" />
            <el-table-column prop="web" label="主页" min-width="280" align="center" />
            <el-table-column prop="enableTyShield" label="天御" min-width="100" align="center" :formatter="tYStateFormat" />
            <el-table-column prop="enableShield" label="屏蔽" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableStatusJmp" label="渠道跳转" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableBanMaster" label="屏蔽全民代理" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableReportAgent" label="举报开关" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableRechargeEnforce" label="充值策略" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableOnlineRecharge" label="在线支付开关" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="enableLowerBonus" label="使用低奖励" min-width="50" align="center" :formatter="enableFormat" />
            <el-table-column prop="state" label="状态" min-width="100" align="center" :formatter="stateFormat" />
            <!-- <el-table-column prop="father" label="父渠道" min-width="100" align="center" /> -->
            <el-table-column prop="type" label="渠道类型" min-width="100" align="center" :formatter="typeFormat" />
            <el-table-column prop="wxs" label="微信" min-width="150" align="center" :formatter="wxsFormat" />
            <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="editLine(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" style="margin-left:20px;" @click="deleteOne(scope.row)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog :visible.sync="dialogEditVisible">
            <el-form :inline="true" class="small-space" style="width: 600px; margin-left:50px;">
                <!-- <el-form-item label="项目" style="margin-right:30px">
                 <el-select disabled placeholder="请选择项目" /> 
                    {{$pidFormat(formObj.pid)}}
                </el-form-item> -->
                <el-form-item label="渠道">
                    <span>{{$channelFormat(formObj.channel)}}</span>
                </el-form-item>
                <el-form-item label="主页">
                    <el-input v-model="formObj.web"></el-input>
                    <span style="color:red">若修改、请勾选渠道跳转</span>
                </el-form-item>
                <br />
                <el-checkbox v-model="formObj.enableTyShield" style="margin:10px;" label="关闭天御" border />
                <el-checkbox v-model="formObj.enableShield" style="margin:10px;" label="屏蔽" border />
                <el-checkbox v-model="formObj.enableStatusJmp" style="margin:10px;" label="渠道跳转" border />
                <el-checkbox v-model="formObj.enableBanMaster" style="margin:10px;" label="屏蔽全民代理" border />
                <el-checkbox v-model="formObj.enableReportAgent" style="margin:10px;" label="举报开关" border />
                <el-checkbox v-model="formObj.enableRechargeEnforce" style="margin:10px;" label="充值策略" border />
                <el-checkbox v-model="formObj.enableOnlineRecharge" style="margin:10px;" label="在线支付开关" border />
                <el-checkbox v-model="formObj.enableLowerBonus" style="margin:10px;" label="使用低奖励" border />
                <!-- <el-form-item label="渠道跳转"> <el-checkbox   v-model="curGo"/></el-form-item> -->
                <!-- <el-form-item label="代理切换开关"><el-checkbox  v-model="curSwitch"/> </el-form-item> -->
                <el-form-item label="微信">
                    <el-input type="textarea" :rows="3" v-model="formObj.curWX" style="width:600px; margin:0 10px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="父渠道">
                    <el-input v-model="curFather"></el-input>
                </el-form-item> -->
                <el-form-item label="渠道类型">
                    <span>{{typeFormat({type:formObj.type})}}</span>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formObj.state" placeholder="全部" style="margin:0 10px;">
                        <el-option v-for="item in curStates" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogBatch">
            <el-form :inline="true" class="small-space" label-position="left" label-width="120px" style="width:800px; margin-left:30px;">
                <!-- <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="渠道">
                    <el-input type="textarea" :rows="20" v-model="formObj.channel" style="width:600px; margin:0 10px" placeholder="多个渠道用英文逗号分开，使用all修改全部渠道" />
                </el-form-item>
                <br />
                <div>
                    <span>主页域名修改</span>
                    <el-input type="text" v-model="formObj.web" style="width:200px; margin:0  10px 0 35px"></el-input>若配置,请勾选渠道跳转
                    <el-button type="primary" style="margin:10px 20px;" @click="confirmWebUrl">确认</el-button>
                </div>
                <el-checkbox v-model="formObj.enableTyShield" style="margin:10px 20px;" label="关闭天御" border></el-checkbox>
                <el-button type="primary" style="margin:10px 20px;" @click="confirmBoolen({enableTyShield:formObj.enableTyShield})">确认</el-button>
                <el-checkbox v-model="formObj.enableShield" style="margin:10px 20px;" label="屏蔽" border></el-checkbox>
                <el-button type="primary" style="margin:10px 84px;" @click="confirmBoolen({enableShield:formObj.enableShield})">确认</el-button>
                <br />
                <el-checkbox v-model="formObj.enableStatusJmp" style="margin:10px 20px;" label="渠道跳转" border></el-checkbox>
                <el-button type="primary" style="margin:10px 20px;" @click="confirmBoolen({enableStatusJmp:formObj.enableStatusJmp})">确认</el-button>
                <el-checkbox v-model="formObj.enableBanMaster" style="margin:10px 20px;" label="屏蔽全民代理" border></el-checkbox>
                <el-button type="primary" style="margin:10px 25px;" @click="confirmBoolen({enableBanMaster:formObj.enableBanMaster})">确认</el-button>
                <br />
                <el-checkbox v-model="formObj.nableReportAgent" style="margin:10px 20px;" label="举报开关" border></el-checkbox>
                <el-button type="primary" style="margin:10px 20px;" @click="confirmBoolen({nableReportAgent:formObj.nableReportAgent})">确认</el-button>
                <el-checkbox v-model="formObj.nableRechargeEnforce" style="margin:10px 20px;" label="充值策略" border></el-checkbox>
                <el-button type="primary" style="margin:10px 54px;" @click="confirmBoolen({nableRechargeEnforce:formObj.nableRechargeEnforce})">确认</el-button>
                <br />
                <el-checkbox v-model="formObj.nableOnlineRecharge" style="margin:10px 20px;" label="在线支付开关" border></el-checkbox>
                <el-button type="primary" style="margin:10px -7px;" @click="confirmBoolen({nableOnlineRecharge:formObj.nableOnlineRecharge})">确认</el-button>
                <el-checkbox v-model="formObj.enableLowerBonus" style="margin:10px 45px;" label="使用低奖励" border></el-checkbox>
                <el-button type="primary" style="margin:10px 20px;" @click="confirmBoolen({enableLowerBonus:formObj.enableLowerBonus})">确认</el-button>
                <br />
                <el-form-item label="微信">
                    <el-input type="textarea" :rows="3" v-model="formObj.wxs" style="width:600px; margin:0 10px"></el-input>
                </el-form-item>
                <el-button type="primary" @click="confirmBoolen({wxs:formObj.wxs})">确认</el-button>
            </el-form>
            <!-- <el-button style="margin:0px 0px 10px 300px" @click="cancelBatch">取 消</el-button> -->
        </el-dialog>
    </el-card>
</template>
<script>
import { batchChangeByChannels, batchChangeWeb, batchDelWeb, deleteOne, getManyChannelInfo, updateOne } from '@/api/channel';
import { channelStatusList, ChannelTypeList, CurChannelStates, pidList } from '@/utils/channelShield';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {
                status: -1,
            },
            pageData: [],
            formObj: {},
            statusList: channelStatusList,
            curStates: CurChannelStates,

            fatherChannels: [{ value: '', label: "全部" }],

            oldWebDomain: '',
            newWebDomain: '',

            dialogEditVisible: false,
            dialogBatch: false,
            pidList: pidList,
            ChannelTypeList: ChannelTypeList,
        };
    },
    created() {
        this.search.pid=CURRENTPID;
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        //批量处理
        isDbatch() {
            this.formObj = {};
            this.dialogBatch = true;
        },
        async loadData() {
            let res = await this.$http(getManyChannelInfo, { page: this.page, count: this.count, ...this.search });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        async exportData() {
            let res = await this.$http(usersListExcel, { ...this.search });
            if (res.code === 200) {
                this.$message.success("导出任务创建成功");
                // await this.$confirm('导出任务创建成功，是否跳转到任务管理页面下载', '提示', {
                //     confirmButtonText: '跳转',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // });
                // this.$router.push({ path: '/index' });
            }
        },
        async changeChannelWebDomain() {
            if (!this.oldWebDomain || !this.newWebDomain) {
                this.$message.error("原域名和新域名必填");
                return;
            }
            this.$confirm("此操作将修改主页,是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let data = {
                        oldDomain: this.oldWebDomain,
                        newDomain: this.newWebDomain,
                    };

                    let res = await this.$http(batchChangeWeb, data);

                    if (res.code === 200) {
                        this.$message.success("修改成功");
                        // this.dialogBatch = false;
                        this.loadData();
                        return;
                    }
                    this.$message.error(`操作失败${this.channelShield.msg}`);
                })
                .catch(() => {
                    this.$message.info("已取消修改");
                });
        },
        async delChannelDomain() {
            if (!this.oldWebDomain) {
                this.$message.error("原域名必填");
                return;
            }
            this.$confirm("此操作将修改主页,是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let data = {
                    oldDomain: this.oldWebDomain,
                };

                let res = await this.$http(batchDelWeb, data);

                if (res.code === 200) {
                    this.$message.success("修改成功");
                    // this.dialogBatch = false;
                    this.loadData();
                    return;
                }

                this.$message.error(`操作失败${this.channelShield.msg}`);
            })
                .catch(() => {
                    this.$message.info("已取消修改");
                });
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
        async submitForm() {
            let query = this.formObj;
            query.id = query._id;
            delete query._id;
            let res = {};
            if (query.id) {
                res = await this.$http(updateOne, query);
            }
            else {
                res = await this.$http(createUser, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.dialogEditVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = { ...row };
            delete this.formObj.pid;
            this.dialogEditVisible = true;
        },
        async deleteOne(row) {
            this.$confirm("此操作将永久删除该渠道, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = {};
                res = await this.$http(deleteOne, { id: row._id });

                if (res.code === 200) {
                    this.$message.success("操作成功");
                    this.dialogEditVisible = false;
                    this.loadData();
                }

            }).catch(() => {
                this.$message.info("已取消删除");
            });

        },

        async editChannel(row) {
            let prompt = await this.$prompt("请输入新渠道", `修改渠道`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            if (prompt.value) {
                let res = await this.$http(updateChannel, { id: row._id, channel: prompt.value == "官方" ? "" : prompt.value });
                if (res.code === 200) {
                    this.$message.success("渠道修改成功");
                    this.loadData();
                }
            }

        },
        tYStateFormat(row, column) {
            return row.enableTyShield ? "未开启" : "已开启";
        },
        enableFormat(row, column, cellValue) {
            return cellValue ? '开' : '关';

        },
        wxsFormat(row, column) {
            if (row.wxs && row.wxs.length) {
                return row.wxs.join(",");
            } else {
                return "-";
            }
        },
        stateFormat(row, column) {
            if (row.state === 0) {
                return "未启用";
            } else if (row.state === 1) {
                return "已启用";
            } else if (row.state === 2) {
                return "已停用";
            }
        },
        typeFormat(row) {
            if (row.type === 1) {
                return "代理渠道";
            } else if (row.type === 0) {
                return "普通渠道";
            } else {
                return "全部";
            }
        },
        confirmWebUrl() {
            if (!this.formObj.pid) {
                this.$message.error('未选择项目');
                return;
            }
            if (!this.formObj.channel) {
                this.$message.error("渠道未填写");
                return;
            }
            if (!this.formObj.web) {
                this.$message.error("域名未填写");
                return;
            }

            this.$confirm("此操作将批量修改主页,是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let channels = this.formObj.channel.split(",");
                    let data = {
                        pid: this.formObj.pid,
                        channels: channels,
                        web: this.formObj.web.trim(),
                    };

                    let res = await this.$http(batchChangeByChannels, data);

                    if (res.code === 200) {
                        this.$message.success("渠道修改成功");
                        this.loadData();
                        return;

                    }
                });

        },


        confirmBoolen(data) {
            if (!this.formObj.pid) {
                this.$message.error('未选择项目');
                return;
            }
            if (!this.formObj.channel) {
                this.$message.error("渠道未填写");
                return;
            }


            this.$confirm("此操作将批量修改主页,是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let channels = this.formObj.channel.split(",");
                data.pid = this.formObj.pid;
                data.channels = channels;


                let res = await this.$http(batchChangeByChannels, data);

                if (res.code === 200) {
                    this.$message.success("渠道修改成功");
                    this.loadData();
                    return;
                }
            });
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
