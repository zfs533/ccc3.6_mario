<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型">
                <el-select v-model="search.pos" placeholder="请选择广告类型">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in PosType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告名称">
                <el-select v-model="search.id" placeholder="请选择广告类型">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in adsID" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日志时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pos" label="广告类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="logDate" label="日志时间" align="center" width="160" :formatter="$dateTimeFm">
            </el-table-column>

            <el-table-column prop="adsInfo" label="广告信息" align="center">
                <el-table-column prop="adsInfo.pid" label="项目" width="60" align="center" :formatter="$pidFormat">
                </el-table-column>
                <el-table-column prop="adsInfo.createdDate" label="创建时间" width="160" align="center"
                    :formatter="$dateTimeFm"></el-table-column>
                <el-table-column prop="adsInfo.updatedDate" label="修改时间" width="160" align="center"
                    :formatter="$dateTimeFm"></el-table-column>
                <el-table-column prop="adsInfo.name" label="名称" align="center"></el-table-column>
                <el-table-column prop="adsInfo.pos" label="广告类型" align="center" :formatter="typeFormat">
                </el-table-column>
                <el-table-column prop="adsInfo.url" label="跳转地址" align="center" width="300"></el-table-column>
                <el-table-column prop="adsInfo.coverUrl" label="封面图片" align="center">

                    <template slot-scope="scope">
                        <imageShow :avatarURL="scope.row.adsInfo.coverUrl" :width="'100px'" :height="'100px'">
                        </imageShow>
                        <!-- <el-image v-if="scope.row.coverUrlView" :src="scope.row.coverUrlView" :preview-src-list="[scope.row.coverUrlView]">
                            <div slot="error" class="image-slot">
                                加载失败
                            </div>
                        </el-image> -->
                        <!-- <div style="max-width: 100px; max-height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading"></div> -->
                    </template>
                </el-table-column>
                <el-table-column prop="adsInfo.index" label="排序" align="center" width="60"></el-table-column>
                <el-table-column prop="adsInfo.enable" label="是否开启" align="center" :formatter="formatBoolean"
                    width="60"></el-table-column>
                <el-table-column prop="adsInfo.opt" label="操作人" align="center" width="100"></el-table-column>
            </el-table-column>

        </el-table>

        <!-- <el-table :data="pageData" :border="true" min-width="100%" max-height="800">
            <el-table-column prop="pid" label="项目" align="center" :formatter="$pidFormat"></el-table-column>
            <el-table-column prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="pos" label="广告类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="url" label="跳转地址" align="center" width="300"></el-table-column>
            <el-table-column prop="coverUrl" label="封面图片" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.coverUrlView"  :src="scope.row.coverUrlView" :preview-src-list="[scope.row.coverUrlView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="max-width: 100px; max-height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading"></div>
                </template>
            </el-table-column>
            <el-table-column prop="index" label="排序" align="center" width="100"></el-table-column>
            <el-table-column prop="enable" label="是否开启" align="center" :formatter="formatBoolean" width="100"></el-table-column>
            <el-table-column prop="opt" label="操作人" align="center" width="100"></el-table-column>

        </el-table> -->
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
                :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { getAdsIds, getAdsLog } from '@/api/logsManager';
import imageShow from "@/components/imageShow/imageShow.vue";
import { pidList, PosType } from '@/utils/baseConst';
import { isArray } from '@/utils/validate';
export default {
    components: {

        imageShow: imageShow,
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            pageData: [],
            pidList: pidList,
            PosType: PosType,
            adsID: [],
            posSumObj: {}
        };
    },
    async created() {
        await this.loadData();
        await this.loadADsIds();

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
            let res = await this.$http(getAdsLog, { page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                // this.pageData = deepClone(await setImgView(res.msg.pageData, "coverUrl"));
                this.totalCount = res.msg.totalCount;
                this.posSumObj = { enterApp: 0, afterEnterApp: 0, categoryTop: 0, categoryMid: 0, inVideos: 0, playVideo: 0, vipBanner: 0 };
                if (isArray(res.msg.posSum) && res.msg.posSum.length > 0) {
                    res.msg.posSum.forEach(element => {
                        switch (element.pos) {
                            case 1: this.posSumObj.enterApp = element.sum; break;
                            case 2: this.posSumObj.afterEnterApp = element.sum; break;
                            case 3: this.posSumObj.categoryTop = element.sum; break;
                            case 4: this.posSumObj.categoryMid = element.sum; break;
                            case 5: this.posSumObj.inVideos = element.sum; break;
                            case 6: this.posSumObj.playVideo = element.sum; break;
                            case 7: this.posSumObj.vipBanner = element.sum; break;
                        }
                    });
                }
            }
        },
        async loadADsIds() {
            let res = await this.$http(getAdsIds, {});
            if (res.code === 200) {
                this.adsID = res.msg;
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
        typeFormat(row, column, cellValue) {
            let item = this.PosType.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        formatBoolean(row, column, cellValue) {
            let ret = '';
            if (cellValue) {
                ret = "是";
            } else {
                ret = "否";
            }
            return ret;
        },
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