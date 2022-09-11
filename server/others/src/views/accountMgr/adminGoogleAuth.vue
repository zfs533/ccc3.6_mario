<template>
    <el-card class="dashboard-second">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%">
            <el-table-column prop="name" label="账号" align="center" />
            <el-table-column prop="role" label="角色名" align="center" />
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="getQrUrl(scope.row._id)">获取谷歌验证二维码</el-button>
                    <el-button type="text" @click="resetCode(scope.row.name)">重置谷歌验证</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pager" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="谷歌验证二维码" :visible.sync="dialogVisibele" width="500px">
            <el-image v-if="imageUrl" style="width:400px;margin:0 auto;display:block" :src="imageUrl">
                <div slot="error" class="image-slot">
                    加载失败
                </div>
            </el-image>
        </el-dialog>

    </el-card>
</template>
<script>
import { removeInvalid } from '@/utils/formatter';
import { getUsers, googleAuth, getUserUrl } from '@/api/account';
import QRCode from "qrcode";

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
            formObj: {},
            imageUrl: "",
            dialogVisibele: false
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
            let query = { ...this.search, page: this.page, count: this.count };
            query = removeInvalid(query);
            let res = await this.$http(getUsers, query, true);
            if (res.code === 200) {
                this.pageData = res.msg.data;
                this.totalCount = res.msg.totalCount;
            }
        },
        imgFormatter(url) {
            let result;
            if (url) {
                QRCode.toDataURL(url, { with: 400, height: 400, type: 'image/jpeg', }, (err, res) => {
                    if (err) {
                        this.$message.error(`生成二维码错误${err}`);
                    }
                    result = res;
                });
            }
            return result;
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
        async getQrUrl(id) {
            let prompt = await this.$prompt("请输入该账号对应的登录密码", `获取谷歌验证二维码`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(getUserUrl, { id: id, pwd: prompt.value });
            if (res.code === 200) {
                this.imageUrl = this.imgFormatter(res.msg);
                this.dialogVisibele = true;
            }
        },
        async resetCode(name) {
            let res = await this.$http(googleAuth, { name: name });
            if (res.code === 200) {
                this.$alert('谷歌验证重置成功', '提示', {
                    confirmButtonText: '确定'
                });
                this.loadData();
            }
        }
    }
}
</script>