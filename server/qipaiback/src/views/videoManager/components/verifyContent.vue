<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="视频id">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-input v-model="search.categorie" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="search.tag" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="视频来源">
                <el-select v-model="search.from" filterable allow-create default-first-option placeholder="请输入">
                    <el-option label="全部" :value="undefined">
                    </el-option>
                    <el-option label="来源缺失" value="none">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频审核人">
                <el-input v-model="search.opt" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序方式">
                <el-select v-model="search.sort" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="横竖屏幕">
                <el-select v-model="search.screenType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in screenTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="长短类型">
                <el-select v-model="search.timeType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="search.status" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时长范围(秒)">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.timeMin" placeholder="起" style="width:120px"></el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.timeMax" placeholder="止" style="width:120px"></el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="体积范围(M)">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.sizeMin" placeholder="起" style="width:120px"></el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.sizeMax" placeholder="止" style="width:120px"></el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询全部</el-button>
                <!-- <el-button type="success" @click="onClickBatchPass">批量修改</el-button> -->
                <!-- <el-button type="primary" @click="showAdd">添加标签</el-button> -->
            </el-form-item>
            <br />
            <!-- <el-form-item>
                <el-collapse>
                    <el-collapse-item title="审核任务相关功能(点击展开/收拢)" name="1">
                        <div>
                            <el-button type="primary" @click="addList">添加审核任务</el-button>
                            <el-button type="primary" @click="refreshList">刷新审核任务</el-button>
                            <el-button type="primary" @click="cancelList">取消全部审核任务</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-form-item> -->
        </el-form>
        <div class="showColumns">
            <h4>表格显示列</h4>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="showColumns" @change="handleCheckedCitiesChange">
                <el-checkbox class="checkbox" v-for="(item, index) in columns" :label="item.value" :key="index">
                    {{ item.label }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div style="margin: 5px 5px; padding:20px;">
            <el-button type="primary" @click="bulkEdit">批量编辑</el-button>
            <el-button type="danger" @click="clearSelect()" style="padding-left:20px">清空选中</el-button>
            <el-badge :value="selectList.length" class="item" type="primary" style="padding-left:20px">
                <el-popover ref="popover" placement="right" width="1000px" trigger="click">
                    <el-container>
                        <el-header style="text-align: center; font-size: 25px; color: burlywood;">
                            <el-page-header @back="goBack" :content="`选中内容列表(数量:${selectList.length})`"></el-page-header>
                        </el-header>
                        <el-main style="height: 660px;">
                            <el-table :data="selectList">
                                <el-table-column width="300px" property="_id" label="视频id"></el-table-column>
                                <el-table-column width="500px" property="name" label="视频名称"></el-table-column>
                                <el-table-column fixed="right" label="操作" width="150" align="center">
                                    <template slot-scope="scope" style="margin: 5px 0; padding:20px;">
                                        <!-- <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button> -->
                                        <el-button type="text" style="margin:0 10px 0 0" @click="delSelect(scope.row._id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                    </el-container>
                    <el-button slot="reference">查看选中视频</el-button>
                </el-popover>
            </el-badge>
        </div>
        <el-table :data="pageData" :border="true" min-width="100%" @header-click="handleHeaderClick" ref="table" @selection-change="handleSelectionChange" max-height="800px">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('_id')" prop="_id" fixed label="仓库内容id" align="center" min-width="200">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('name')" prop="name" fixed label="名称" align="center" min-width="160"></el-table-column>
            <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" sortable="false" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('optCreate')" prop="optCreate" label="审核时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('releaseDate')" prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column> -->
            <el-table-column v-if="showColumns.includes('summary')" prop="summary" label="简介" align="center" min-width="200"></el-table-column>
            <el-table-column v-if="showColumns.includes('coverURL')" prop="coverURL" label="封面" align="center" min-width="150">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.coverURLView" :src="scope.row.coverURLView" :preview-src-list="[scope.row.coverURLView]">
                        <div slot="error" class="image-slot">
                            加载失败
                        </div>
                    </el-image>
                    <div style="max-width: 100px; max-height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('publisherId')" prop="publisherId" label="发布人" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('uploadId')" prop="uploadId" label="上传人" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('time')" prop="time" label="时长" align="center" :formatter="secondFormat" min-width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('size')" prop="size" label="体积大小" align="center" :formatter="sizeFormat" min-width="120"></el-table-column>
            <!-- <el-table-column v-if="showColumns.includes('price')" prop="price" label="价格" align="center"></el-table-column> -->
            <!-- <el-table-column v-if="showColumns.includes('payType')" prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column> -->
            <el-table-column v-if="showColumns.includes('timeType')" prop="timeType" label="长短类型" align="center" :formatter="timeTypeFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('screenType')" prop="screenType" label="横竖类型" align="center" :formatter="screenTypeFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('categorie')" prop="categorie" label="分类" align="center" :formatter="tagsFormat" min-width="200">
                <!-- <template slot-scope="data">
                    <el-popover placement="top-start"
                        title="分类" width="200px" trigger="hover"
                        :content="data.row.categorie">
                        <div slot="reference" class="twoLineCls">{{data.row.categorie}}</div>
                    </el-popover>
                </template> -->
            </el-table-column>
            <el-table-column v-if="showColumns.includes('tags')" prop="tags" label="标签" align="center" :formatter="tagsFormat" min-width="200"></el-table-column>
            <el-table-column v-if="showColumns.includes('from')" prop="from" label="视频来源" align="center">
            </el-table-column>
            <!-- <el-table-column v-if="showColumns.includes('isPull')" prop="isPull" label="是否推送" align="center" :formatter="boolFormat"></el-table-column> -->
            <el-table-column v-if="showColumns.includes('status')" prop="status" label="状态" align="center" :formatter="statusFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('opt')" prop="opt" label="审核人" align="center"></el-table-column>
            <el-table-column v-if="showColumns.includes('reason')" prop="reason" label="审核拒绝原因" align="center" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;" @click="play(scope.row.playURL)">播放正片</el-button>
                    <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;" @click="downVideo(scope.row)">下载</el-button>
                    <el-button type="primary" :disabled=(!scope.row.m3u8Preview) style="width:78px;padding:12px 10px;margin:3px;" @click="play(scope.row.m3u8Preview)">播放预览
                    </el-button>
                    <el-button type="primary" disabled style="width:78px;padding:12px 10px;margin:3px;" @click="downVideo(scope.row)">下载</el-button>
                    <el-button type="success" style="width:78px;padding:12px 10px;margin:3px;" @click="onClickPass(scope.row)" v-if="scope.row.status!==2">通过</el-button>
                    <el-button type="warning" style="width:78px;padding:12px 10px;margin:3px;" @click="onClickWait(scope.row)" v-if="scope.row.status===0">暂存</el-button>
                    <el-button type="danger" style="width:78px;padding:12px 10px;margin:3px;" @click="onClickDel(scope.row)" v-if="scope.row.status===0">不通过</el-button>
                    <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;" @click="editLine(scope.row)">编辑</el-button>
                    <el-button type="success" style="width:164px;padding:12px 10px;margin:3px;" @click="onClickRelease(scope.row)" v-if="!scope.row.isUsed">发布</el-button>
                    <el-button type="info" style="width:164px;padding:12px 10px;margin:3px;" @click="delTask(scope.row)" v-if="isSelf">取消审核任务</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="视频播放" :visible.sync="dialogVideo" width="790px" :close-on-click-modal="true" @keyup.native.27="dialogVideo = false" @close="closePlayer(true)">
            <Video :url="videoUrl" v-if='!dialogVisible' />
        </el-dialog>
        <el-dialog title="审核信息" :visible.sync="dialogVisible" width="1000px" top="5vh" @close="closePlayer">
            <template>
                <div class="videoBox"><Video :url="videoUrl" :screenShot="true" @jietu="setImg" /></div>
                <el-form class="demo-form-inline" label-width="80px">
                    <el-form-item label="视频id">
                        {{ formObj.id }}
                    </el-form-item>
                    <el-form-item label="视频名称" style="width:360px">
                        <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="视频分类" style="width:600px">
                        <el-input readonly type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.categorie" placeholder="标签手动填,使用逗号分隔"></el-input>
                    </el-form-item>
                    <el-form-item label="视频标签" style="width:600px">
                        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="formObj.tags" placeholder="标签手动填,使用逗号分隔"></el-input>
                    </el-form-item>
                    <el-form-item label="长短类型">
                        <el-select v-model="formObj.timeType" placeholder="请选择" style="width:260px">
                            <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="横竖类型">
                        <el-select v-model="formObj.screenType" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in screenTypeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formObj.status" placeholder="请选择" style="width:260px">
                            <el-option v-for="item in statusList2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="拒绝原因" v-if="formObj.status === 3">
                        <el-select v-model="formObj.reason" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in reasonList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="封面图(点图上传)" label-width="150px">
                        <ImgUpload v-loading="imgLoading" :element-loading-text="`拼命上传中...`" :imageUrl="formObj.coverURLView" :path="UploadPath.VideoImage" ref="imgUpload" @success="uploaded" :isCompress="true" />
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" style="width:600px" :rows="5" v-model="formObj.summary" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">提交审核信息</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog title="通过视频" :visible.sync="passVideoVistable" width="500px">
            <template>
                <el-form :inline="true">
                    <el-form-item label="视频id">
                        {{ passVideoData.id }}
                    </el-form-item>
                    <el-form-item label="来源:">
                        <el-input v-model="passVideoData.from"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="上线时间">
                        <el-date-picker v-model="passVideoData.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发布城市">
                        <el-input v-model="passVideoData.location" placeholder="请输入"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item  label="发布项目">
                        <el-select multiple v-model="passVideoData.pid" placeholder="请选择项目">
                            <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="toPass">审核通过</el-button>
                    <!-- <el-button type="primary" @click="toPass">通过</el-button> -->
                </div>
            </template>
        </el-dialog>
        <el-dialog title="发布视频" :visible.sync="releaseVisible" width="500px">
            <el-form :inline="true">
                <el-form-item label="上线时间">
                    <el-date-picker v-model="formObj.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="位置">
                    <el-input v-model="formObj.location"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="releaseVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">发布</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量编辑" :visible.sync="blukDialogVisible" width="800px" @close="closeBlukView">
            <el-form label-width="80px" :inline="true">
                <el-form-item label="长短类型">
                    <el-select v-model="blukEditObj.timeType" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" @click="updateplist('1')" style="margin-left:20px">修改长短类型</el-button>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="blukEditObj.status" placeholder="请选择">
                        <el-option v-for="item in (statusList2.filter(e=>e.value!==0))" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" @click="updateplist('2')" style="margin-left:20px">修改审核状态</el-button>
                </el-form-item>
                <el-form-item label="视频来源">
                    <el-input type="text" v-model="blukEditObj.from" placeholder="请输入" style="width:300px"></el-input>
                    <el-button type="primary" @click="updateplist('3')" style="margin-left:20px;width:126px">修改视频来源
                    </el-button>
                </el-form-item>
                <el-form-item :inline="false" label="发布平台">
                    <el-select disabled v-model="blukEditObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                    <el-form-item v-if="blukEditObj.pid" label="上线时间">
                        <el-date-picker v-model="blukEditObj.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item v-if="blukEditObj.pid" label="发布地址">
                       <el-input type="text" v-model="blukEditObj.location" placeholder="请输入" style="width:300px"></el-input>
                    </el-form-item> -->
                    <el-button type="primary" @click="updateplist('4')" style="margin-left:20px;width:126px">发布平台</el-button>
                </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="blukDialogVisible = false">取 消</el-button>
            </div> -->
        </el-dialog>
    </el-card>
</template>
<script>
import { addVerifyTask, cancelAllVerifyTask, cancelOneVerifyTask, delOne, downVideo, flushVerifyTask, getManyVerifyVideos, passOne, releaseVideo, updatePlist, updateVerifyVideos, uploadImg, waitOne } from '@/api/videoManager';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import { auditSortList, auditStateList, payTypeList, pidList, reasonList, screenTypeList, timeTypeList, UploadPath } from '@/utils/baseConst';
import { getRandomCity, getRandomCityList } from '@/utils/city';
import { dateStartTimeFm, deepClone, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
import ImageCompressor from 'image-compressor.js';
import tagsCheckBox from './tagsCheckBox.vue';
import video from './video';


export default {
    components: {
        Video: video,
        ImgUpload: imgUpload,
        TagsCheckBox: tagsCheckBox
    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            dateArr2: [],
            pageData: [],
            formObj: {},
            pidList,
            dialogVisible: false,
            dialog2Visible: false,
            dialogVideo: false,
            releaseVisible: false,
            videoUrl: '',
            sortList: auditSortList,
            payTypeList: payTypeList,
            timeTypeList: timeTypeList,
            statusList: auditStateList,
            screenTypeList,
            UploadPath: UploadPath,
            statusList2: [
                { value: 0, label: "等待审核" },
                { value: 2, label: "审核通过" },
                { value: 3, label: "审核未通过" },
                { value: 4, label: "暂存" }
            ],
            restaurants: [],
            reasonList: reasonList,
            isSelf: false,
            imgLoading: false,
            columns: [],
            showColumns: [
                '_id',
                'createdDate',
                'name',
                'summary',
                'coverURL',
                // 'publisherId',
                // 'uploadId',
                'time',
                'size',
                'playURL',
                'status',
                'from',
                'timeType',
                'screenType',
                'reason',
                'opt',
                'categorie',
                'tags',
            ],
            isIndeterminate: false,
            checkAll: true,
            loadType: 0,
            passVideoData: {},
            passVideoVistable: false,
            sortT: {},
            optType: "",
            ////////////// 批量修改 //////////////////////
            selectList: [],
            isUpdateSelect: true,
            blukDialogVisible: false,
            blukEditObj: { pid: CURRENTPID },
            /////////////////////////////
        };
    },
    computed: {
        categorieList() {
            return this.$store.getters.categorieList;
        },
        tagsList() {
            return this.$store.getters.tagsList;
        }
    },
    async created() {
        this.$store.dispatch("baseData/setCategories",CURRENTPID);
        this.loadData();
        // this.loadUsers();
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
            query.pid = CURRENTPID;
            query.sizeMin = query.sizeMin ? query.sizeMin * 1024 * 1024 : undefined;
            query.sizeMax = query.sizeMax ? query.sizeMax * 1024 * 1024 : undefined;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createdDateStart = this.dateArr1[0];
                query.createdDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.optDateStart = this.dateArr2[0];
                query.optDateEnd = this.dateArr2[1];
            }
            return query;
        },
        handleHeaderClick(column, event) {
            this.sortT = {};
            switch (column.property) {
                case "createdDate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[4].value;
                    } else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[5].value;
                    }
                    this.loadData2();
                    break;
            }
        },

        async loadData2() {
            let res = await this.$http(getManyVerifyVideos, { page: this.page, count: this.count, type: "video", ...this.sortT }, true);
            if (res.code === 200) {
                this.isSelf = false;
                await this.setData(res);
                this.loadType = 0;
            }
        },
        async loadData() {
            let res = await this.$http(getManyVerifyVideos, { pid: CURRENTPID, page: this.page, count: this.count, type: "video", ...this.getQuery() }, true);
            if (res.code === 200) {
                this.isSelf = false;
                this.isUpdateSelect = false;
                await this.setData(res);
                this.loadType = 0;
                this.$nextTick(() => {
                    // 指定选中状态
                    if (this.selectList.length) {
                        let selectItems = [];
                        this.pageData.forEach(e => {
                            let find = this.selectList.find(s => s._id === e._id);
                            if (find) {
                                selectItems.push(e);
                            }
                        });
                        if (selectItems.length) {
                            selectItems.forEach(e => {
                                this.$refs.table.toggleRowSelection(e, true);
                            });
                        }
                    }
                    this.isUpdateSelect = true;
                });
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
        isShow(row) {
            if (this.isSelf) {
                return row.status === 0 || row.status === 3 || row.status === 1;
            }
            return row.status === 0 || row.status === 3;
        },
        async setData(res) {
            this.pageData = res.msg.pageData;
            this.totalCount = res.msg.totalCount;
            this.pageData = deepClone(await setImgView(res.msg.pageData, "coverURL"));

        },
        handleChange(val) { console.log(val); },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },

        sizeFormat(row, column, cellValue) {
            return sizeFormat(cellValue);
        },
        payTypeFormat(row, column, cellValue) {
            let item = this.payTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        timeTypeFormat(row, column, cellValue) {
            let item = this.timeTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        screenTypeFormat(row, column, cellValue) {
            let item = this.screenTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        statusFormat(row, column, cellValue) {
            let item = auditStateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        boolFormat(row, column, cellValue) {
            return cellValue ? "是" : "否";
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        urlFormat(row, column, cellValue) {
            return cellValue ? `${getSession("src")[0] || ""}/${cellValue}` : cellValue;
        },
        categorieFormat(cellValue) {
            if (cellValue instanceof Array) {
                let str = '';
                cellValue.forEach(e => {
                    str += e + "\n";
                });
                return str;
            }
            return cellValue;
        },
        // tagsFormatUnit(val) {
        //     let item = this.tagsList.find(i => i.value === val);
        //     return item ? item.label : val;
        // },
        tagsFormat(row, column, cellValue) {
            if (cellValue instanceof Array) {
                return cellValue.join(',');
            }
            return cellValue;
        },
        checkTags(data) {
            this.formObj.tags = data;
        },
        uploaded(path) {
            // console.log(path);
            this.formObj.coverURL = path;
        },
        async submitForm() {
            let query = deepClone(this.formObj);
            if (this.optType === 'update') {
                query.tags = query.tags?.split(",");
                delete query.coverURLView;
                let res = await this.$http(updateVerifyVideos, query);
                if (res.code === 200) {
                    this.optType = '';
                    this.$message.success("修改成功");
                    this.dialogVisible = false;
                    if (this.loadType) {
                        this.refreshList();
                    }
                    else {
                        this.loadData();
                    }
                }
            } else if (this.optType === 'release') {
                query.pid=CURRENTPID;
                let res = await this.$http(releaseVideo, query);
                if (res.code === 200) {
                    this.optType = '';
                    this.$message.success("操作成功");
                    this.releaseVisible = false;
                    if (this.loadType) {
                        this.refreshList();
                    } else {
                        this.loadData();
                    }
                }
            }
        },
        editLine(row) {
            this.optType = "update";
            this.formObj = {
                id: row._id,
                name: row.name,
                tags: (row.tags || []).join(','),
                categorie: (row.categorie || []).join(','),
                timeType: row.timeType ? row.timeType : (row.time > 5 * 60 ? 2 : 3),
                screenType: row.screenType,
                status: row.status,
                summary: row.summary,
                coverURLView: row.coverURLView,
                coverURL: row.coverURL,
                playURL: row.playURL,
                reason: row.reason || ""
            };
            this.videoUrl = this.urlFormat(null, null, row.playURL);
            this.dialogVisible = true;
        },
        async delTask(row) {
            // await this.$confirm(`即将取消审核任务： ${row._id}，是否确定？`, `提醒`, {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            // });
            let res = await this.$http(cancelOneVerifyTask, { id: row._id });
            if (res.code === 200) {
                this.$message.success("取消审核任务成功");
                this.refreshList();
            }
        },
        async onClickPass(row) {
            this.passVideoData = { id: row._id, from: row.from || "9527" };
            this.passVideoVistable = true;
        },
        async toPass() {
            let res = await this.$http(passOne, {
                id: this.passVideoData.id,
                from: this.passVideoData.from,
                // releaseDate: this.passVideoData.releaseDate, // 时间转换
                // location: this.passVideoData.location,
            });
            if (res.code === 200) {
                this.$message.success("视频已通过审核");
                this.passVideoVistable = false;
                if (this.loadType) {
                    this.refreshList();
                }
                else {
                    this.loadData();
                }
            }
        },
        async onClickWait(row) {
            await this.$confirm(`是否暂存 ${row._id}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(waitOne, { id: row._id });
            if (res.code === 200) {
                this.$message.success("视频已被暂存");
                if (this.loadType) {
                    this.refreshList();
                }
                else {
                    this.loadData();
                }
            }
        },

        async onClickDel(row) {
            await this.$confirm(`是否拒绝审核 ${row._id}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delOne, { id: row._id });
            if (res.code === 200) {
                this.$message.success("视频已被拒绝通过");
                if (this.loadType) {
                    this.refreshList();
                }
                else {
                    this.loadData();
                }
            }

        },
        async onClickRelease(row) {
            this.optType = "release";
            this.formObj = {
                id: row._id,
                location: getRandomCity(),
                pid: "",
                releaseDate: dateStartTimeFm(new Date()),
            };
            this.releaseVisible = true;
        },
        async downVideo(row) {
            await this.$confirm(`确认下载吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(downVideo, { id: row._id });
            if (res.code === 200) {
                let link = document.createElement('a');
                link.href = res.msg;
                link.download = res.msg;
                link.click();
            }
        },
        play(url) {
            this.videoUrl = this.urlFormat(null, null, url);
            this.dialogVideo = true;
        },
        showAdd() {
            this.formObj = {};
            this.dialogTitle = "添加标签";
            this.dialogVisible = true;
        },
        async addList() {
            let prompt = await this.$prompt("请输入要添加的审核任务数量", `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: "number"
            });
            let res = await this.$http(addVerifyTask, { type: "video", needCnt: prompt.value, page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.isSelf = true;
                await this.setData(res);
                this.loadType = 1;
            }
        },
        async refreshList() {
            let res = await this.$http(flushVerifyTask, { type: "video", page: this.page, count: this.count });
            if (res.code === 200) {
                this.isSelf = true;
                await this.setData(res);
                this.loadType = 1;
                return;
            }

            this.pageData = [];
        },
        async cancelList() {
            let res = await this.$http(cancelAllVerifyTask, {});
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
            }
        },

        onClickBatchPass() {
            let citys = getRandomCityList(20);
            this.formObj = {
                releaseDate: dateStartTimeFm(new Date()),
                location: citys,
            };
            this.dialog2Visible = true;
            // from;
        },
        async onClickSubmit() {
            let query = deepClone(this.formObj);
            let res = await this.$http(updatePlist, query);
            if (res.code === 200) {
                let msg = '本次修改条数:' + res.msg.count + ',剩余可操作条数:' + res.msg.leaveCount || 0;
                console.log('msg = ', msg);
                this.$message.success(msg);
                this.dialog2Visible = false;
                if (this.loadType) {
                    this.refreshList();
                }
                else {
                    this.loadData();
                }

            }
        },

        async setImg(e, base64) {
            let file2 = await this.compressFile(e);
            e = e.size > file2.size ? file2 : e;

            let formData = new FormData();
            formData.append("file", e);
            formData.append("path", this.UploadPath.VideoImage);
            this.imgLoading = true;
            try {
                let res = await this.$http(uploadImg, formData, true);
                if (res.code === 200) {
                    this.$message.success("图片上传成功！");
                    this.formObj.coverURL = `${res.msg.path}/${res.msg.fileName}`;
                    this.formObj.coverURLView = base64;
                }
            } catch (error) {

            } finally {
                this.imgLoading = false;
                return;
            }
        },

        compressFile(file) {
            return new Promise((resolve, reject) => {

                new ImageCompressor(file, {
                    quality: 0.8,
                    width: 240,
                    success(result) {
                        resolve(result);
                    },
                    error(e) {
                        this.$message(e);
                        reject();
                    }
                });
            });
        },

        closePlayer() {
            this.videoUrl = "";
            // this.formObj.playURL = '';
            // console.log("关闭弹窗", this.$refs.video, this.dialogVisible);
        },
        async loadUsers() {
            // let res = await this.$http(getPublisher, {});
            // if (res.code === 200 && res.msg) {
            //     this.restaurants = res.msg.map(i => {
            //         return { value: i.uid, label: i.username };
            //     });
            // }
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.label.toString().includes(queryString));
            };
        },
        handleSelect(item) {
            // console.log(this.formObj.publisherId);
        },
        //////////////////////////////////////////////批量修改/////////////////////////////////////////
        async closeBlukView() {
            if (!this.selectList.length) {
                this.loadData();
                return;
            };
            await this.$confirm(`确定清空选中的内容吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                // 先处理当前界面被选中的，
                let curSelect = [];
                this.pageData.forEach(e => {
                    let f = this.selectList.find(s => s._id === e._id);
                    if (f) curSelect.push(e);
                });
                // 同步刷新
                for (let i = 0; i < curSelect.length; i++) {
                    this.$refs.table.toggleRowSelection(curSelect[i], false);
                }
                // 清空
                this.selectList = [];
                this.loadData();
            }).catch(() => {
                this.$message.info("已取消清空");
            });
        },
        delSelect(id) {
            // 如果当前页面有选中的也要取消
            let find = this.pageData.find(e => e._id === id);
            if (find) {
                this.$refs.table.toggleRowSelection(find, false);
            } else {
                let index = this.selectList.findIndex(s => s._id === id);
                if (index >= 0) {
                    this.selectList.splice(index, 1);
                }
            }
        },
        async clearSelect() {
            if (!this.selectList.length) {
                return;
            };
            await this.$confirm(`确定清空选中的内容吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async () => {
                // 先处理当前界面被选中的，
                let curSelect = [];
                this.pageData.forEach(e => {
                    let f = this.selectList.find(s => s._id === e._id);
                    if (f) curSelect.push(e);
                });
                // 同步刷新
                for (let i = 0; i < curSelect.length; i++) {
                    this.$refs.table.toggleRowSelection(curSelect[i], false);
                }
                // 清空
                this.selectList = [];
            }).catch(() => {
                this.$message.info("已取消删除");
            });

        },
        goBack() {
            this.$refs.popover.doClose();
        },
        handleSelectionChange(val) {
            if (!this.isUpdateSelect) return;
            if (this.selectList.length > 500) {
                this.$message.error("选中的数量超过500,不能再添加了");
                return;
            }
            let curList = this.pageData.map(e => { return { _id: e._id, name: e.name, playURL: e.playURL }; });
            if (Array.isArray(val)) {
                let curSelectIds = this.selectList.map(e => e._id);
                if (val.length) {
                    let addIds = new Set();
                    let lessIds = new Set();
                    // 新加的
                    val.forEach(e => {
                        if (!curSelectIds.includes(e._id)) {
                            addIds.add(e._id);
                        }
                    });
                    // 取消的
                    curList.forEach(e => {
                        // 已存在选中列表
                        if (curSelectIds.includes(e._id)) {
                            // 当前是否选中该视频
                            let find = val.find(choose => choose._id === e._id);
                            if (!find) {
                                lessIds.add(e._id);
                            }
                        }
                    });
                    if (addIds.size) {
                        addIds.forEach(e => {
                            let item = val.find(i => i._id === e);
                            if (item) {
                                this.selectList.push({ _id: item._id, name: item.name, playURL: item.playURL });
                            }
                        });
                    }
                    if (lessIds.size) {
                        lessIds.forEach(e => {
                            // 删除
                            let index = this.selectList.findIndex(s => s._id === e);
                            if (index >= 0) {
                                this.selectList.splice(index, 1);
                            }
                        });
                    }
                    console.log("添加选中:" + addIds.size + "取消选中:" + lessIds.size);
                } else {
                    // 可能取消全部
                    let lessIds = new Set();
                    curList.forEach(e => {
                        // 已存在选中列表
                        if (curSelectIds.includes(e._id)) {
                            lessIds.add(e._id);
                        }
                    });
                    if (lessIds.size) {
                        lessIds.forEach(e => {
                            // 删除
                            let index = this.selectList.findIndex(s => s._id === e);
                            if (index >= 0) {
                                this.selectList.splice(index, 1);
                            }
                        });
                    }
                    console.log("取消选中:" + lessIds.size);
                }
            }
        },
        bulkEdit() {
            if (this.selectList.length == 0) {
                this.$message.error("请选择视频资源");
            }
            else {
                let citys = getRandomCityList(20);
                this.blukEditObj = {
                    pid: CURRENTPID,
                    timeType: 2, status: 2,
                    releaseDate: dateStartTimeFm(new Date()),
                    location: citys, from: "9527",
                };
                this.blukDialogVisible = true;
            }
        },
        async updateplist(action) {
            let query = { ...this.blukEditObj };
            let idArr = [];
            this.selectList.forEach(element => {
                idArr.push(element._id);
            });
            // id去重复
            idArr = [...new Set(idArr)];
            let updateModel = { ids: idArr };
            // 长短类型
            if (action == 1) {
                updateModel.timeType = query.timeType;
            }
            // 审核状态 
            else if (action == 2) {
                updateModel.status = query.status;
            }
            // 视频来源
            else if (action == 3) {
                updateModel.from = query.from;
            }
            // 发布平台
            else if (action == 4) {
                updateModel.pid = CURRENTPID;
                updateModel.releaseDate = query.releaseDate;
                updateModel.location = query.location;
            }
            let res = await this.$http(updatePlist, updateModel);
            if (res.code === 200) {
                this.$message.success("修改成功");
            }
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

.videoBox {
    width: 680px;
    height: 380px;
    margin: 0 auto 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.showColumns {
    margin: 20px 0;

    .checkbox {
        margin-bottom: 10px;
    }
}
.twoLineCls {
    text-overflow: -o-ellipsis-lasetline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    line-clamp: 6;
    -webkit-box-orient: vertical;
}
.optBtn {
    // display: inline-block;
    line-height: 1;
    white-space: nowrap;
    // cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #fff;
    // -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 10px;
    font-size: 14px;
    border-radius: 4px;
    width: 80px;
}
</style>