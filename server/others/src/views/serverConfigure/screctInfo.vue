<template>
    <div class="outBox">
        <el-card class="cardItem">
            <el-form ref="formName" class="demo-form-inline" style="width:500px" :model="formObj">
                <el-form-item label="项目">
                    <el-input disabled v-model="formObj.pid"></el-input>
                </el-form-item>
                <el-form-item label="渠道前缀">
                    <el-input disabled v-model="formObj.channelPrefix"></el-input>
                </el-form-item>
                <el-form-item prop="domains" :rules="officialUrl" label="媒体资源域名地址(多个按行分开)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.domains"></el-input>
                </el-form-item>
                <el-form-item prop="webDomains" :rules="officialUrl" label="前端资源域名地址(多个按行分开)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.webDomains"></el-input>
                </el-form-item>
                <el-form-item prop="apkUpdateDomains" :rules="officialUrl" label="安卓更新域名(多个按行分开)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.apkUpdateDomains"></el-input>
                </el-form-item>
                <el-form-item prop="apiDomains" :rules="officialUrl" label="API接口域名(多个按行分开)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.apiDomains"></el-input>
                </el-form-item>
                <el-form-item label="短视频预览时长(秒)">
                    <el-input type="number" v-model="formObj.previewShortTime"></el-input>
                </el-form-item>
                <el-form-item label="长视频预览时长(秒)">
                    <el-input type="number" v-model="formObj.previewLongTime"></el-input>
                </el-form-item>
                <el-form-item prop="officialDownloadUrl" :rules="officialUrl" label="官网地址">
                    <el-input v-model="formObj.officialDownloadUrl"></el-input>
                </el-form-item>
                <el-form-item prop="officialContactUrl" :rules="officialUrl" label="官方交流群">
                    <el-input v-model="formObj.officialContactUrl"></el-input>
                </el-form-item>
                <el-form-item label="登录限制(同一个账号,多端登陆个数)">
                    <el-input type="number" v-model="formObj.loginLimit"></el-input>
                </el-form-item>
                <el-form-item label="每日观影次数(-1:不做限制,0:免费观影次数为0)">
                    <el-input type="number" v-model="formObj.dailyVideoTimes"></el-input>
                </el-form-item>
                <el-form-item label="验证码开关">
                    <el-switch v-model="formObj.smsCodeActive" />
                </el-form-item>
                <el-form-item label="用户名前缀">
                    <el-input v-model="formObj.userNamePre"></el-input>
                </el-form-item>
                <el-form-item label="新人倒计时">
                    <el-input v-model="formObj.countdown"></el-input>
                </el-form-item>
                <el-form-item label="时间范围内注册用户数">
                    <br>
                    <el-button type="primary" @click="addCfg()">添加</el-button>
                </el-form-item>
                <div style="overflow-y:auto;height:270px">
                    <div v-for="(item, index) in formObj.registerLimit" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                        时间
                        <el-input v-model="item.time" style="margin-left:10px;width:6rem;" />
                        <span style="padding:0px 10px">用户数</span>
                        <el-input v-model="item.count" style="width:4rem;" />
                        <i class="el-icon-delete" @click="delCfg(index)" style="margin-left:10px;color:#005CF9"></i>
                    </div>
                </div>
            </el-form>

        </el-card>
        <el-card class="cardItem">
            <el-form class="demo-form-inline" style="width:800px">
                <el-form-item label="公告(跑马灯)">
                    <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.notice"></el-input>
                </el-form-item>
                <el-form-item label="默认头像(点图上传)">
                    <ImgUpload :imageUrl="formObj.defaultAvatarURLView" :path="UploadPath.HeadImage" :isCompress="true" @success="uploaded" />
                </el-form-item>
                <el-form-item label="弹窗公告">
                    <tinymce v-model="formObj.announcement" :height="300" :editorImage="true" />
                </el-form-item>
                <el-form-item label="弹窗公告开关">
                    <el-switch v-model="formObj.announcementActive" />
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="delData">删除</el-button>
                    <el-button type="primary" @click="searchData">读取</el-button>
                    <el-button type="success" @click="submitForm">提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { secretMgrDel, secretMgrGet, secretMgrUpdate } from '@/api/serverConfigure';
import imgUpload from '@/components/imgUpload.vue';
import tinymce from '@/components/Tinymce/serverConfigIndex.vue';
import { setSession } from "@/utils/auth";
import { UploadPath } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
export default {
    props: {
        resData: {},
        pid: '',
    },
    // watch: {
    //     resData(newVal) {

    //         this.dataFormart(newVal);
    //     },
    // },
    components: {
        ImgUpload: imgUpload,
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
            formObj: {},
            content: '',
            UploadPath:UploadPath,
            officialUrl: [
                { validator: checkHttps, trigger: 'blur' },
            ],
        };
    },
    created() {
        this.dataFormart(this.resData);
        // this.formObj = this.data_form;
        // this.loadData();

    },
    methods: {
        searchData() {
            this.loadData();

        },
        async loadData() {
            let res = await this.$http(secretMgrGet, { pid: this.pid });
            if (res.code === 200 && res.msg) {
                let data = res.msg?.data || [];
                this.dataFormart(data[0]);
                // 刷新pid的session
                let pidList = (res.msg?.pidList || []);
                setSession("pidList", pidList);
            }
        },
        async delData() {
            let pid = this.formObj.pid;
            let res = await this.$http(secretMgrDel, { pid });
            if (res.code === 200) {
                this.$message.success("操作成功");
                setSession("pidList", res.msg);
                this.$emit("systemsetting");
            }
        },
        async submitForm() {

            this.$refs["formName"].validate(async (valid) => {
                if (valid) {
                    let query = { ...this.formObj };
                    var regexp = /^(http|https):\/\//;
                    if (query.officialDownloadUrl && !regexp.test(query.officialDownloadUrl)) {
                        this.$message.error("跳转地址需以http://或者https://开头");
                        return;
                    }
                    query.domains = this.$splitStr(query.domains);
                    query.webDomains = this.$splitStr(query.webDomains);
                    query.apkUpdateDomains = this.$splitStr(query.apkUpdateDomains);
                    query.apiDomains = this.$splitStr(query.apiDomains);
                    delete query.defaultAvatarURLView;
                    let res = await this.$http(secretMgrUpdate, query);
                    if (res.code === 200) {
                        this.$message.success("操作成功");
                        this.dataFormart(res.msg);
                    }
                } else {
                    return false;
                }
            });


        },
        uploaded(path) {
            this.formObj.defaultAvatarURL = path;
        },
        async dataFormart(data) {
            if (!data) {
                return;
            }
            let imgArr = [];
            imgArr.push(data);
            data = deepClone(await setImgView(imgArr, "defaultAvatarURL"))[0];
            this.formObj = {
                id: data._id,
                pid: data.pid,
                channelPrefix: data.channelPrefix,
                siteName: data.siteName,
                smsCodeActive: data.smsCodeActive,
                domains: data.domains.join("\n"),
                webDomains: data.webDomains.join("\n"),
                apkUpdateDomains: data.apkUpdateDomains.join("\n"),
                apiDomains: data.apiDomains.join("\n"),
                previewShortTime: data.previewShortTime,
                previewLongTime: data.previewLongTime,
                officialDownloadUrl: data.officialDownloadUrl,
                officialContactUrl: data.officialContactUrl,
                defaultAvatarURLView: data.defaultAvatarURLView,
                defaultAvatarURL: data.defaultAvatarURL,
                countdown: data.countdown,
                loginLimit: data.loginLimit,
                notice: data.notice,
                dailyVideoTimes: data.dailyVideoTimes,
                announcement: data.announcement,
                announcementActive: data.announcementActive,
                userNamePre: data.userNamePre,
                registerLimit: data.registerLimit,
            };
        },
        addCfg() {
            let item = { time: 0, count: 0 };
            this.formObj.registerLimit.push(item);
        },
        delCfg(index) {
            this.formObj.registerLimit.splice(index, 1);
        },
    }
};
</script>
<style lang="scss" scoped>
.outBox {
    margin-top: 10px;
    min-height: 500px;
    display: flex;

    .cardItem {
        flex: 1;
        margin-right: 20px;

        &:nth-child(2) {
            flex: 2;
        }
    }
}
</style>
