<template>
    <el-card>
        <el-button type="primary" @click="searchData" style="margin-bottom:20px">刷新</el-button>
        <el-descriptions class="margin-top" :column="4" :size="size" border>
            <el-descriptions-item label="当前剩余钻石">
                {{user.diamond}}
            </el-descriptions-item>
            <el-descriptions-item label="总充值" :span="3">
                {{user.rechargeTotal}}
            </el-descriptions-item>
            <!-- <el-descriptions-item :span="2" label="推广返利">
                苏州市
            </el-descriptions-item>
 -->
            <el-descriptions-item label="当日充值">
                {{todayUser.totalChargeMoney||0}}
            </el-descriptions-item>
            <el-descriptions-item label="当日观影时长">
                {{todayUser.watchedTime||0}}
            </el-descriptions-item>
            <el-descriptions-item label="当日观影片数">
                {{todayUser.watchedVideoCount||0}}
            </el-descriptions-item>
            <el-descriptions-item label="当日观影次数">
                {{todayUser.watchCount||0}}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>
<script>
import { getAttributionData } from '@/api/usersManager';
export default {
    props: {
        uid: ''
    },
    data() {
        return {
            _uid: this.uid,
            size: '',
            user: {},
            todayUser: {}
        };
    },
    created() {
        this._uid = this.uid;
        this.loadData();
    },
    watch: {
        uid(newVal) {
            this._uid = newVal;
            this.searchData();
        }
    },
    methods: {
        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.logDateStart = this.dateArr1[0];
                query.logDateEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(getAttributionData, { uid: this._uid });
            if (res.code === 200) {
                this.user = res.msg.user;
                this.todayUser = res.msg.todayUser || {};
            }

        }
    }
}
</script>