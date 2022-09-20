<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="formObj = {};dialogAct=true">添加账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="name" label="账号" align="center" />
            <el-table-column prop="role" label="角色名" align="center" />
            <el-table-column prop="pwd" label="密码" align="center" />
            <el-table-column prop="pids" label="项目" :formatter="pidFormat" align="center" />
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="showUpdate(scope.row,1)">修改角色</el-button>
                    <el-button type="text" @click="showUpdate(scope.row,2)">修改密码</el-button>
                    <el-button type="text" @click="showUpdate(scope.row,3)">编辑</el-button>
                    <!-- <el-button type="text" @click="delLine(scope.row.name)">删除账号</el-button> -->
                    <!-- <el-button type="text" @click="resetCode(scope.row.act)" v-if="scope.row.loginDate">重置谷歌验证</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="添加账号" :visible.sync="dialogAct" width="400px">
            <el-form label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formObj.pwd" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="formObj.role" placeholder="请选择">
                        <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目">
                    <el-select multiple v-model="formObj.pids" placeholder="请选择">
                        <el-option v-for="(item,index) in pidList" :key="index" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAct = false">取 消</el-button>
                <el-button type="primary" @click="submitAct">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改角色" :visible.sync="dialogRole" width="400px">
            <el-form>
                <el-form-item label="账号" label-width="80px">
                    {{formObj.name}}
                </el-form-item>
                <el-form-item label="新角色" label-width="80px">
                    <el-select v-model="formObj.role" placeholder="请选择">
                        <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRole = false">取 消</el-button>
                <el-button type="primary" @click="submitRole">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改登录密码" :visible.sync="dialogPwd" width="400px">
            <el-form>
                <el-form-item label="账号" label-width="80px">
                    {{formObj.name}}
                </el-form-item>
                <el-form-item label="新密码" label-width="80px">
                    <el-input v-model="formObj.pwd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPwd = false">取 消</el-button>
                <el-button type="primary" @click="submitPwd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="项目编辑" :visible.sync="dialogPids" width="400px">
            <el-form>
                <el-form-item label="账号" label-width="80px">
                    {{formObj.id}}
                </el-form-item>
                <el-form-item label="项目">
                    <el-select multiple v-model="formObj.pids" placeholder="请选择">
                        <el-option v-for="(item,index) in pidList" :key="index" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPids = false">取 消</el-button>
                <el-button type="primary" @click="submitChannel">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { removeInvalid } from '@/utils/formatter';
import { create, changePwd, grantRole, changePids, acdelete, getUsers, getPidList, getByType } from '@/api/account';
import { clientEvent } from '@/api/eventManager';
import { getSession } from '@/utils/auth';

export default {
    data() {
        return {
            search: {},
            dateArr: [],
            page: 1,
            count: 10,
            totalCount: 10,
            pageData: [],
            roleList: [],
            statusList: [
                { label: "启用", value: true },
                { label: "禁用", value: false }
            ],
            dialogRole: false,
            dialogPwd: false,
            dialogAct: false,
            formObj: { role: undefined },
            pidList: [],
            dialogPids: false,
        };
    },
    created() {
        clientEvent.off(clientEvent.EVENT_TYPE.changePid);
        clientEvent.on(clientEvent.EVENT_TYPE.changePid, () => {
            this.loadData();
        }, this);
        this.loadData();
        this.loadRoleNames();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadRoleNames() {
            let type = getSession("role").type;
            let res = await this.$http(getByType, { type: type, page: 1, count: 1000 }, true);
            if (res.code === 200) {
                this.roleList = res.msg.data;
            }
        },
        async loadData() {
            let query = { ...this.search, page: this.page, count: this.count };
            query = removeInvalid(query);
            let res = await this.$http(getUsers, query, true);
            if (res.code === 200) {
                this.pageData = res.msg.data;
                this.totalCount = res.msg.totalCount;
            }
            res = await this.$http(getPidList, query, true);
            if (res.code === 200) {
                this.pidList = res.msg;
            }

        },
        pidFormat(row) {
            let res = "";
            for (let i = 0; i < row.pids.length; i++) {
                for (let j = 0; j < this.pidList.length; j++) {
                    if (row.pids[i] == this.pidList[j].pid) {
                        if (i == row.pids.length - 1) {
                            res += this.pidList[j].name;
                        }
                        else {
                            res += this.pidList[j].name + "/";
                        }
                    }
                }
            }
            return res;
        },

        statusFormat(row, column, cellValue) {
            let item = this.statusList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        //页码变更
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        showUpdate(row, type) {
            this.formObj = { name: row.name, role: undefined, id: row._id, pids: row.pids };
            if (type === 1) {
                this.formObj.role = row.role;
                this.dialogRole = true;
            }
            else if (type === 2) {
                this.dialogPwd = true;
            }
            else if (type === 3) {
                this.dialogPids = true;
            }
        },
        async delLine(name) {
            await this.$confirm(`即将删除账号 ${name}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(acdelete, { name: name });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
        },
        async submitRole() {
            let query = this.formObj;
            let res = await this.$http(grantRole, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.loadData();
                this.dialogRole = false;
            }
        },
        async submitPwd() {
            let query = this.formObj;
            let res = await this.$http(changePwd, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogPwd = false;
            }
        },
        async submitChannel() {
            let query = this.formObj;
            let res = await this.$http(changePids, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogPids = false;
            }
        },
        async submitAct() {
            let query = this.formObj;
            console.log(query);
            let res = await this.$http(create, query);
            if (res.code === 200) {
                this.loadData();
                this.dialogAct = false;
            }
        },
        updateStatus(row) {
            let bool = row.status;
            this.$confirm(`账号：${row.act}`, `当前账号状态为${bool ? "启用" : "禁用"}，即将修改为${bool ? "禁用" : "启用"}`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                let res = await this.$http(updateStatus, { act: row.act, status: !bool });
                if (res.code === 200) {
                    this.$message.success("状态切换成功");
                    this.loadData();
                }
            }).catch(error => {
                this.$message({
                    type: 'info',
                    message: error == "cancel" ? "取消操作" : error
                });
            });

        },
        async resetCode(act) {
            let res = await this.$http(resetLogin, { act: act });
            if (res.code === 200) {
                this.$alert('谷歌验证重置成功，请在登录时重新绑定二维码验证', '提示', {
                    confirmButtonText: '确定'
                });
            }
        }
    }
}
</script>