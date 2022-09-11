<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道名称">
                <el-input v-model="search.channel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="渠道类型">
                <el-select v-model="search.channelType" placeholder="全部">
                    <el-option v-for="item in ChannelTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="父渠道">
                <el-select v-model="search.fatherChannel" placeholder="全部">
                    <el-option v-for="(item, index) in fatherChannels" :key="index" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item label="入口地址域名">
                <el-input v-model="search.qrdomain" placeholder="请输入域名"></el-input>
            </el-form-item>
            <el-form-item label="安卓下载域名">
                <el-input v-model="search.downdomain" placeholder="请输入域名"></el-input>
            </el-form-item>
            <el-form-item label="tf下载地址">
                <el-input v-model="search.tfUrl" placeholder="请输入全地址"></el-input>
            </el-form-item>
            <el-form-item label="ios轻量版下载地址">
                <el-input v-model="search.iosUrl" placeholder="请输入全地址"></el-input>
            </el-form-item>
            <el-form-item label="跳转地址">
                <el-input v-model="search.dlUrl" placeholder="请输入域名"></el-input>
            </el-form-item>
            <el-form-item label="短域名">
                <el-input v-model="search.host" placeholder="域名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showBlubView">批量修改</el-button>
                <!-- <el-button type="primary" @click="exportData">导出</el-button> -->
            </el-form-item>
        </el-form>

        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="pid" label="项目" min-width="80" align="center" :formatter="$pidFormat" />
            <el-table-column prop="channel" label="渠道名称" align="center" />
            <el-table-column prop="type" label="渠道类型" align="center" :formatter="typeFormat" />
            <el-table-column prop="urls" label="web访问地址" align="center" width="270px">
                <template slot-scope="scope">
                    <div v-for="(item, index) in scope.row.h5Urls" :key="index">
                        <p>{{ item.longUrl }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="urls" label="跳转域名" align="center" width="270px">
                <template slot-scope="scope">
                    <div v-for="(item, index) in scope.row.dlUrls" :key="index">
                        <p>{{ item }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="qrUrls" label="入口地址" align="center" width="270px">
                <template slot-scope="scope">
                    <div v-for="(item, index) in scope.row.qrUrls" :key="index">
                        <!--  <p>域名：{{item.url}}</p> -->
                        <p>{{ item.longUrl }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="qrUrls" label="跳转地址" align="center" width="270px">
                <template slot-scope="scope">
                    <div v-for="(item,index) in scope.row.dlUrls" :key="index">
                        域名:{{item}}
                    </div>
                </template>
            </el-table-column> -->

            <el-table-column label="下载地址配置" align="center" type="expand" width="80px">
                <template slot-scope="props">
                    <el-card>
                        <el-button type="success" @click="showAdd(props.row)" style="margin-bottom:10px">添加下载地址
                        </el-button>
                        <el-table :data="props.row.dlInfos" :border="true" :stripe="true" style="width:100%">
                            <el-table-column prop="iosUrl" label="ios轻量版下载地址" align="center" />
                            <el-table-column prop="iosTfUrl" label="TF下载地址" align="center" />
                            <el-table-column prop="adrUrl" label="安卓下载地址" align="center" />
                            <el-table-column prop="dlTmpl" label="落地页模版" align="center" />
                            <el-table-column prop="host" label="短域名" align="center" />
                            <el-table-column prop="htmlPath" label="兼容路径" align="center" />
                            <el-table-column label="操作" min-width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="showEditDownloadUrl(props.row, scope.row)">
                                        <i class="el-icon-edit"></i>
                                    </el-button>
                                    <el-button type="text" style="margin-left:20px;" @click="delDownloadUrl(props.row, scope.row)">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </template>
                            </el-table-column>

                            <!-- <el-table-column prop="host" label="短域名" align="center" />
                            <el-table-column prop="htmlPath" label="路径匹配" align="center" />
                            <el-table-column prop="secret" label="标识符" align="center" /> -->
                        </el-table>
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="showEditUrl(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>

        <!-- <el-dialog title="新增下载地址" :visible.sync="dialogAdd" width="1200px" @close="dialogAdd = false">
        </el-dialog> -->

        <el-dialog :visible.sync="dialogAdd" @close="dialogAdd = false" width="700px">
            <el-form :inline="false" class="small-space" label-position="left" label-width="160px" style="width:500px; margin-left:30px;">
                <el-form-item label="项目:">
                    <span>{{ $pidFormat(curRowInfo.pid) }}</span>
                </el-form-item>
                <el-form-item label="渠道类型:">
                    <span>{{ typeFormat(curRowInfo) }}</span>
                </el-form-item>
                <el-form-item label="渠道名称:">
                    <span>{{ $channelFormat(curRowInfo.channel) }}</span>
                </el-form-item>
                <el-form-item label="模版名称:">
                    <el-select v-model="form_dialog.dlTmpl" placeholder="请选择">
                        <el-option v-for="item in dlTmpList" :key="item._id" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="ios轻量版下载地址:">
                    <el-input type="text" v-model="form_dialog.iosUrl"></el-input>
                </el-form-item>
                <el-form-item label="短域名:">
                    <el-autocomplete v-model="form_dialog.host" value-key="domain" :fetch-suggestions="querySearchGeneral" placeholder="请输入域名" class="inline-input" style="width:300px">
                        <template slot-scope="{ item }">
                            <div style="float: left" class="name">{{ item.domain }}</div>
                            <span style="float: right; color: #8492a6; font-size: 13px" class="addr">{{ item.channelsNum
                            }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="TF签下载地址:">
                    <el-input type="text" v-model="form_dialog.iosTfUrl"></el-input>
                </el-form-item>
                <el-form-item label="安卓下载地址:">
                    <el-input type="text" v-model="form_dialog.adrUrl"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="margin:0px 0px 10px 520px" @click="addConfirm">确定</el-button>
        </el-dialog>

        <el-dialog :visible.sync="dialogEditVisible" width="600px" @close="dialogEditVisible = false">
            <el-form :inline="true" class="small-space" label-position="left" label-width="120px" style="width: 100%;">
                <el-form-item label="项目">
                    <el-select v-model="form_dialog.pid" disabled placeholder="请选择项目">
                        <el-option :label="$pidFormat(curRowInfo.pid)" :value="form_dialog.pid"></el-option>
                        <!-- <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="渠道名称">
                    <span>{{ $channelFormat(curRowInfo.channel) }}</span>
                </el-form-item>
                <el-form-item label="h5域名">
                    <el-input type="textarea" :rows="3" v-model="form_dialog.h5Urls"></el-input>以英文逗号分隔
                </el-form-item>
                <el-button type="primary" @click="editUrl(1, form_dialog.h5Urls)">修改h5域名</el-button>
                <el-form-item label="入口域名">
                    <el-input type="textarea" :rows="3" v-model="form_dialog.qrUrls"></el-input>以英文逗号分隔
                </el-form-item>
                <el-button type="primary" @click="editUrl(2, form_dialog.qrUrls)">修改入口域名</el-button>
                <el-form-item label="跳转域名">
                    <el-input type="textarea" :rows="3" v-model="form_dialog.dlUrls"></el-input>以英文逗号分隔
                </el-form-item>
                <el-button type="primary" @click="editUrl(3, form_dialog.dlUrls)">修改跳转域名</el-button>
            </el-form>
        </el-dialog>

        <el-dialog title="批量修改" :visible.sync="dialogUpdate" width="500px" @close="closeView">
            <el-form>
                <el-form-item label="项目" label-width="100px">
                    <el-select v-model="addArr.pid" placeholder="请选择项目" @change="onPidChange">
                        <template v-for="item in pidList">
                            <el-option :key="item.pid" :label="item.name" :value="item.pid" v-if="item.pid != undefined">
                            </el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="域名类型" label-width="100px">
                    <el-select v-model="addArr.type" placeholder="请选择域名类型" @change="typeChange">
                        <template v-for="item in ChannelPageUrlType">
                            <el-option :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="dlTmplDialog" label="旧模版名称" label-width="100px">
                    <el-select v-model="addArr.dlTmpl" placeholder="请选择">
                        <el-option v-for="item in dlTmpList" :key="item._id" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="newDlTmplDialog" label="新模版名称" label-width="100px">
                    <el-select v-model="addArr.newDlTmpl" placeholder="请选择">
                        <el-option v-for="item in dlTmpList" :key="item._id" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="旧地址" label-width="100px" v-if="oldValDialog">
                    <el-input type="text" v-model="addArr.oldVal"></el-input>
                </el-form-item>
                <el-form-item label="新地址" label-width="100px" v-if="newValDialog">
                    <el-input type="text" v-model="addArr.newVal"></el-input>
                </el-form-item>
                <el-form-item label="新地址" label-width="100px" v-if="gdDomainDialog">
                    <el-autocomplete class="inline-input" style="width:360px" v-model="addArr.gdDomain" value-key="domain" :fetch-suggestions="querySearch" placeholder="请输入域名"></el-autocomplete>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="warning" icon="el-icon-question" @click="help(addArr.type)">帮助</el-button>
                <el-button @click="dialogUpdate = false">取消</el-button>
                <el-button type="primary" @click="updateFuc">确定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addDlInfo, changeDlInfo, delDlInfo, getDlTmpList, getManyChannelPage, getUrlByType, updateDlUrls, updateH5Urls, updatePlist, updateQrUrls } from '@/api/channel';
import { ChannelPageUrlType } from '@/utils/baseConst';
import { ChannelTypeList, pidList } from '@/utils/channelShield';
import { deepClone } from '@/utils/formatter';

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
            tmpList: [],
            pidList: pidList,
            ChannelTypeList: ChannelTypeList,
            curRowInfo: {},
            dialogAdd: false,
            form_dialog: {},
            dialogEditVisible: false,
            dlTmpList: [],
            dialogUpdate: false,
            ChannelPageUrlType: ChannelPageUrlType,
            addArr: {},
            dlTmplDialog: false,
            data_url_general: [],
            gdDomainDialog: false,
            oldValDialog: false,
            newValDialog: false,
            newDlTmplDialog: false,
            dateArr2: [],
            restaurants: [],
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getManyChannelPage, { page: this.page, count: this.count, ...this.search });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        async getDlTmpList(pid) {
            let res = await this.$http(getDlTmpList, { pid: pid }, true);
            if (res.code === 200) {
                this.dlTmpList = res.msg.tmpl;
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
        help(type) {
            let msg = '';
            const h = this.$createElement;
            // QrUrl = 1, // 入口域名/落地页域名
            // H5Url = 2, // web域名
            // AndroidUrl = 3, // 安卓下载域名
            // IosUrl = 4, // ios下载地址
            // TfUrl = 5, // iosTf 下载地址
            // Template = 6, // 落地页模版
            if (type === "1") {
                msg = `
                <div>
                    <h3>入口域名/落地页访问地址:</h3>
                    <h5>1.旧地址填写带域名的地址,会自动配置该域名的所有匹配项;</h5>
                    <h5>2.新地址,选择新的入口域名,没有请添加对应的域名类型到域名库，不填则自动匹配可用域名;</h5>
                    <h5>3.替换规则:老的域名地址会被新的域名地址替换,其他内容不变;</h5>
                </div>`;
            } else if (type === "2") {
                msg = `
                web访问地址，暂时无法使用
                `;
            } else if (type === "3") {
                msg = `
                <div>
                    <h3>安卓下载地址:</h3>
                    <h5>1.旧地址填写带域名的地址,会自动配置该域名的所有匹配项;</h5>
                    <h5>2.新地址,选择新的安卓下载域名,没有请添加对应的域名类型到域名库，不填则自动匹配可用域名;</h5>
                    <h5>3.替换规则:老的域名地址会被新的域名地址替换,其他内容不变;</h5>
                </div>`;
            } else if (type === "4") {
                msg = `
                <div>
                    <h3>ios轻量下载地址：</h3>
                    <h5>1.旧地址全匹配规则</h5>
                    <h5>2.新地址直接替换匹配到的老地址</h5>
                </div>`;
            } else if (type === "5") {
                msg = `
                <div>
                    <h3>iosTF下载地址：</h3>
                    <h5>1.旧地址全匹配规则</h5>
                    <h5>2.新地址直接替换匹配到的老地址</h5>
                </div>`;
            } else if (type === "6") {
                msg = `
                <div>
                    <h3>落地页模版:</h3>
                    <h5>1.老模版名称全匹配</h5>
                    <h5>2.新模版直接替换设置的老模版地址</h5>
                </div>`;
            }else if (type === "7") {
                msg = `
                <div>
                    <h3>跳转域名:</h3>
                    <h5>1</h5>
                   
                </div>`;
            }
            else {
                msg = '请选择类型,才会有操作说明';
            }
            this.$notify({
                title: '操作提示',
                dangerouslyUseHTMLString: true,
                message: msg
            });
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
        async showAdd(row) {
            await this.loaddata_url(row.pid);
            this.form_dialog = {};
            this.curRowInfo = row;
            this.getDlTmpList(row.pid);
            this.dialogAdd = true;
        },
        async addConfirm() {
            if (this.form_dialog.secret) {
                let res = await this.$http(changeDlInfo, { id: this.curRowInfo._id, ...this.form_dialog });
                if (res.code == 200) {
                    this.$message.success("修改成功！");
                    this.dialogAdd = false;
                    this.loadData();
                }
            } else {
                let res = await this.$http(addDlInfo, { id: this.curRowInfo._id, ...this.form_dialog });
                if (res.code == 200) {
                    this.$message.success("添加成功！");
                    this.dialogAdd = false;
                    this.loadData();
                }

            }
        },
        async showEditDownloadUrl(row, curRow) {
            await this.loaddata_url(row.pid);
            this.getDlTmpList(row.pid);
            this.form_dialog = {};
            this.curRowInfo = row;
            this.dialogAdd = true;
            this.form_dialog = deepClone(curRow);
        },
        delDownloadUrl(row1, curRow) {

            this.$confirm(`此操作将删除选中该行数据, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await this.$http(delDlInfo, { id: row1._id, secret: curRow.secret });
                if (res.code == 200) {
                    this.$message.success("删除成功!");
                    this.loadData();
                    return;
                }
            }).catch(() => {
                this.$message.info("已取消删除");
            });


        },

        showEditUrl(row) {
            // this.form_dialog = row;
            this.dialogEditVisible = true;

            this.curRowInfo = row;
            let qrUrls = [];
            let h5Urls = [];
            let urls = [];

            if (row.qrUrls) {
                for (let i = 0; i < row.qrUrls.length; i++) {
                    let element = row.qrUrls[i].url;
                    qrUrls.push(element);
                }
            }
            this.curDownloadUrl = qrUrls.join(",");
            if (row.h5Urls) {
                for (let i = 0; i < row.h5Urls.length; i++) {
                    let element = row.h5Urls[i].url;
                    h5Urls.push(element);
                }
            }
            if (row.dlUrls) {
                for (let i = 0; i < row.dlUrls.length; i++) {
                    let element = row.dlUrls[i];
                    urls.push(element);
                }
            }
            // console.log("--------11--------");
            // console.log(row);
            this.form_dialog = {
                _id: row._id,
                qrUrls: qrUrls.join(","),
                h5Urls: h5Urls.join(","),
                dlUrls: urls.join(","),
            };


        },

        async editUrl(type, urls) {

            if (urls.trim() == "" && type == 2) {
                this.$message.error("域名不能为空");
                return;
            }
            if (urls.trim() == "") {
                urls = [];
            }
            else {
                urls = urls.split(",");
            }

            function checkDuplicationNormal(arr) {
                return arr.some((val, idx) => {
                    return arr.includes(val, idx + 1);
                });
            }
            if (checkDuplicationNormal(urls)) {
                this.$message.error("域名有重复");
                return;
            }

            if (type == 1) {
                let res = await this.$http(updateH5Urls, { id: this.form_dialog._id, urls: urls });
                if (res.code == 200) {
                    this.$message.success("修改成功!");
                    this.loadData();
                    return;
                }
            }
            else if (type == 3) {
                let res = await this.$http(updateDlUrls, { id: this.form_dialog._id, urls: urls });
                if (res.code == 200) {
                    this.$message.success("修改成功!");
                    this.loadData();
                    return;
                }
            }
            else {
                let res = await this.$http(updateQrUrls, { id: this.form_dialog._id, urls: urls });
                if (res.code == 200) {
                    this.$message.success("修改成功!");
                    this.loadData();
                    return;
                }
            }
        },
        showBlubView() {
            this.dialogUpdate = true;
        },
        async updateFuc() {
            let type = this.addArr.type;
            let updateModel = { pid: this.addArr.pid, type: type, oldVal: "", newVal: "" };
            if (type == 1 || type == 2 || type == 3) {
                updateModel.oldVal = this.addArr.oldVal;
                updateModel.newVal = this.addArr.gdDomain;
            } else if (type == 4 || type == 5) {
                updateModel.oldVal = this.addArr.oldVal;
                updateModel.newVal = this.addArr.newVal;
            } else if(type == 6){
                updateModel.oldVal = this.addArr.dlTmpl;
                updateModel.newVal = this.addArr.newDlTmpl;
            }else if(type == 7){
                updateModel.oldVal = this.addArr.oldVal;
                updateModel.newVal = this.addArr.gdDomain;
            }
            let res = await this.$http(updatePlist, updateModel);
            if (res.code == 200) {
                this.$message.success("修改成功！");
                this.dialogUpdate = false;
                this.loadData();
            }
        },
        closeView() {
            this.addArr = {};
        },
        async onPidChange(pid) {
            this.addArr.pid = pid;
            await this.loaddata_url(pid);
            this.getDlTmpList(pid);
        },
        async loaddata_url(pid) {
            let res = await this.$http(getUrlByType, { pid: pid }, true);
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
                        case 'dl':
                            this.data_url_dl= data[i].list;
                            break;
                    }
            }
        },
        typeChange(type) {
            if (type == 1 || type == 2 || type == 3||type == 7) {
                this.gdDomainDialog = true;
                this.oldValDialog = true;
                this.dlTmplDialog = false;
                this.newValDialog = false;
                this.newDlTmplDialog = false;
            }
            if (type == 1) {
                this.dateArr2 = this.data_url_general;
            } else if (type == 2) {
                this.dateArr2 = this.data_url_h5domain;
            }
            else if (type == 3) {
                this.dateArr2 = this.data_url_download;
            }
            else if (type == 5 || type == 4) {
                this.oldValDialog = true;
                this.gdDomainDialog = false;
                this.dlTmplDialog = false;
                this.newValDialog = true;
                this.newDlTmplDialog = false;
            } else if (type == 6) {
                this.dlTmplDialog = true;
                this.oldValDialog = false;
                this.gdDomainDialog = false;
                this.newValDialog = false;
                this.newDlTmplDialog = true;
            }else if (type == 7) {
                this.dateArr2 = this.data_url_dl;
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
        querySearch(queryString, cb) {
            var restaurants = this.dateArr2;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.domain.toString().includes(queryString));
            };
        }, querySearchGeneral(queryString, cb) {
            var restaurants = this.data_url_general;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
    },

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
