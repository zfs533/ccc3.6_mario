<template>
    <el-card>
        <el-button type="primary" @click="addPid">添加平台</el-button>
        <el-tabs v-model="activeName" >
            <el-tab-pane v-for="item in formObj" :key="item.pid" :label="$pidFormat(item.pid)" :value="item.pid">
                <screctInfo :pid="item.pid" :resData="item" v-on:systemsetting="loadData"> </screctInfo>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="新增平台" :visible.sync="dialogVisible">
            <el-form ref="formName" class="demo-form-inline" :model="addObj">
                <el-form-item label="项目">
                    <el-input v-model="addObj.pid" placeholder="项目使用大写字母或数字最少2个字符"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="addObj.siteName" placeholder="项目名称最少2个字符"></el-input>
                </el-form-item>
                <el-form-item label="渠道前缀">
                    <el-input v-model="addObj.channelPrefix" placeholder="渠道前缀为小写字母最少2个字符"></el-input>
                </el-form-item>
                <el-form-item label="短视频预览时长(秒)">
                    <el-input type="number" v-model="addObj.previewShortTime"></el-input>
                </el-form-item>
                <el-form-item label="长视频预览时长(秒)">
                    <el-input type="number" v-model="addObj.previewLongTime"></el-input>
                </el-form-item>
                <el-form-item prop="officialDownloadUrl" :rules="officialUrl" label="官网地址">
                    <el-input v-model="addObj.officialDownloadUrl" placeholder="官网地址必须为对应平台入口域名"></el-input>
                </el-form-item>
                <el-form-item prop="officialContactUrl" :rules="officialUrl" label="官方交流群">
                    <el-input v-model="addObj.officialContactUrl"></el-input>
                </el-form-item>
                <el-form-item label="登录限制(同一个账号,多端登陆个数)">
                    <el-input type="number" v-model="addObj.loginLimit"></el-input>
                </el-form-item>
                <el-form-item label="每日观影次数(-1:不做限制,0:免费观影次数为0)">
                    <el-input type="number" v-model="addObj.dailyVideoTimes"></el-input>
                </el-form-item>
                <el-form-item label="验证码开关">
                    <el-switch v-model="addObj.smsCodeActive" />
                </el-form-item>
                <el-form-item label="用户名前缀">
                    <el-input v-model="addObj.userNamePre"></el-input>
                </el-form-item>
                <el-form-item label="弹窗公告开关">
                    <el-switch v-model="addObj.announcementActive" />
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
import { secretMgrAdd, secretMgrGet } from '@/api/serverConfigure';
import tinymce from '@/components/Tinymce/serverConfigIndex.vue';
import { setSession } from "@/utils/auth";
import { pidList } from '@/utils/baseConst';
import screctInfo from './screctInfo.vue';
export default {
    components: {
        screctInfo,
        tinymce: tinymce
    },

    data() {
        const checkHttps = (rule, value, cb) => {
            const pattern = /(https):\/\/([\w.]+\/?)\S*/;
            let arr = value.split("\n");
            if (arr.length > 0) {
                if (arr.length == 1 && arr[0] == "") {
                    return cb();
                }

                for (let i = 0; i < arr.length; i++) {
                    var v = arr[i];
                    if (!pattern.test(v)) {
                        return cb(new Error("必须https://开头"));
                    }
                }
                return cb();
            }
        };
        return {
            pidList: pidList,
            formObj: [],
            addObj: {},
            activeName: '',
            dialogVisible: false,
            officialUrl: [
                { validator: checkHttps, trigger: 'blur' },
            ],
        };
    },
    created() {
        this.loadData();
    },

    methods: {
        async loadData() {
            let res = await this.$http(secretMgrGet, {});
            if (res.code === 200) {
                let data = (res.msg?.data || []);
                this.formObj = data;
                let pidList = (res.msg?.pidList || []);
                setSession("pidList", pidList);
            }
        },
        addPid() {
            this.addObj = {
                pid: "",
                channelPrefix: "",
                siteName: "",
                domains: [],
                webDomains: [],
                previewShortTime: 5,
                previewLongTime: 20,
                loginLimit: 2,
                smsCodeActive: false,
                officialDownloadUrl: "",
                officialContactUrl: "",
                defaultAvatarURL: "",
                dailyVideoTimes: "3",
                apkUpdateDomains: [],
                apiDomains: [],
                notice: "",
                userNamePre: "",
                announcement: "",
                announcementActive: false,
                registerLimit: []
            };
            this.dialogVisible = true;
        },
        async submitForm() {
            this.$refs["formName"].validate(async (valid) => {
                if (valid) {
                    let res = await this.$http(secretMgrAdd, this.addObj);
                    if (res.code === 200) {
                        this.dialogVisible = false;
                        setSession("pidList", res.msg);
                        this.loadData();
                    }
                } else {
                    return false;
                }
            });
        },
        addCfg() {
            let item = { time: 0, count: 0 };
            this.addObj.registerLimit.push(item);
        },
        delCfg(index) {
            this.addObj.registerLimit.splice(index, 1);
        },
        uploaded(path) {
            this.addObj.defaultAvatarURL = path;
        },
       
    }
};
</script>
