<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="图集id">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图集名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上传人">
                <el-input v-model="search.uploadId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图集来源">
                <el-select v-model="search.from" filterable allow-create default-first-option placeholder="请输入">
                    <el-option label="全部" :value="undefined">
                    </el-option>
                    <el-option label="来源缺失" value="none">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图集审核人">
                <el-input v-model="search.opt" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="search.status" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
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
                <el-button type="primary" @click="onClickAdd">添加</el-button>
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
        <el-table :data="pageData" :border="true" @header-click="handleHeaderClick" min-width="100%" ref="table" @selection-change="handleSelectionChange" max-height="800px">
            <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column v-if="showColumns.includes('_id')" prop="_id" label="图集id" align="center" min-width="200">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" sortable="false" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('name')" prop="name" label="图集名称" align="center" min-width="160"></el-table-column>
            <el-table-column v-if="showColumns.includes('price')" prop="price" label="免费展示数量" align="center" min-width="160"></el-table-column>
            <el-table-column v-if="showColumns.includes('summary')" prop="summary" label="简介" align="center" min-width="200"></el-table-column>
            <el-table-column v-if="showColumns.includes('imageUrls')" prop="imageUrls" label="图集" align="center" min-width="150">
                <template slot-scope="scope" v-if="scope.row.imageUrlsView">
                    <div style="width: 100%; height: 220px;overflow:auto;">
                        <div v-for="itemimg in scope.row.imageUrlsView" :key="itemimg">
                            <el-image v-if="itemimg" style="width: 100px; height: 100px" :src="itemimg" :preview-src-list="[itemimg]">
                                <div slot="error" class="image-slot">
                                    加载失败
                                </div>
                            </el-image>
                            <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="showColumns.includes('publisherId')" prop="publisherId" label="发布人" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('uploadId')" prop="uploadId" label="上传人" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('time')" prop="time" label="时长" align="center" :formatter="secondFormat" min-width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('size')" prop="size" label="体积大小" align="center" :formatter="sizeFormat" min-width="120"></el-table-column>
            <el-table-column v-if="showColumns.includes('status')" prop="status" label="状态" align="center" :formatter="statusFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('from')" prop="from" label="图集来源" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('reason')" prop="reason" label="审核拒绝原因" align="center" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="primary" style="width:78px;padding:12px 10px;margin:3px;" @click="downVideo(scope.row)">下载</el-button>
                    <el-button type="primary" disabled style="width:78px;padding:12px 10px;margin:3px;" @click="downVideo(scope.row)">下载</el-button> -->
                    <el-button type="success" style="width:164px;padding:12px 10px;margin:3px;" @click="onClickPass(scope.row)" v-if="scope.row.status!==2">通过</el-button>
                    <el-button type="warning" style="width:164px;padding:12px 10px;margin:3px;" @click="onClickWait(scope.row)" v-if="scope.row.status===0">暂存</el-button>
                    <el-button type="danger" style="width:164px;padding:12px 10px;margin:3px;" @click="onClickDel(scope.row)" v-if="scope.row.status===0">不通过</el-button>
                    <!-- <el-button type="info" style="width:164px;padding:12px 10px;margin:3px;" @click="delTask(scope.row)" v-if="isSelf">取消审核任务</el-button> -->
                    <el-button type="primary" style="width:164px;padding:12px 10px;margin:3px;" @click="editLine(scope.row)">编辑</el-button>
                    <el-button type="success" style="width:164px;padding:12px 10px;margin:3px;" @click="onClickRelease(scope.row)" v-if="!scope.row.isUsed">发布</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="审核信息" :visible.sync="dialogVisible" width="1000px" top="5vh" @close="closePlayer">
            <template>
                <div class="videoBox"><Video :url="videoUrl" :screenShot="true" @jietu="setImg" /></div>
                <el-form :inline="true" label-width="80px">
                    <el-form-item label="图集id">
                        {{ formObj.id }}
                    </el-form-item>
                    <el-form-item label="图集名称">
                        <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="付费方式">
                        <el-select v-model="formObj.payType" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图集价格" v-if="formObj.payType === 4">
                        <el-input type="number" v-model="formObj.price" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" v-if="formObj.payType == 4 || formObj.payType == 3">
                        <el-input type="number" v-model="formObj.index" placeholder="不填则使用默认排序"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="发布人">
                        <el-autocomplete class="inline-input" v-model="formObj.publisherId" value-key="label" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                        </el-autocomplete>
                    </el-form-item> -->

                    <!-- <el-form-item label="图集分类">
                        <el-cascader v-model="formObj.categorie" :options="categorieList" :props="{ expandTrigger: 'hover', multiple: true, checkStrictly: true, value: 'id', label: 'name' }" @change="handleChange"></el-cascader>
                    </el-form-item> -->
                    <el-form-item label="图集标签">
                        <el-popover placement="top" trigger="hover">
                            <TagsCheckBox :checked="formObj.tags" @check="checkTags" />
                            <el-button slot="reference" type="text">
                                {{ formObj.tags && formObj.tags.length > 0 ? tagsFormat(null, null, formObj.tags) :
                                        '请选择'
                                }}
                            </el-button>
                        </el-popover>
                    </el-form-item>
                    <!-- <el-form-item label="长短类型">
                        <el-select v-model="formObj.timeType" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="审核状态">
                        <el-select v-model="formObj.status" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in statusList2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="拒绝原因" v-if="formObj.status === 3">
                        <el-select v-model="formObj.reason" placeholder="请选择" style="width:160px">
                            <el-option v-for="item in reasonList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="前端上线时间" label-width="120px" v-if="formObj.status === 2">
                        <el-date-picker v-model="formObj.releaseDate" type="date" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="是否推送" v-if="formObj.status === 2">
                        <el-switch v-model="formObj.isPull"></el-switch>
                    </el-form-item>
                    <br /> -->
                    <el-form-item label="封面图(点图上传)" label-width="150px">
                        <ImgUpload v-loading="imgLoading" :element-loading-text="`拼命上传中...`" :imageUrl="formObj.coverURLView" :path="UploadPath.AtlasImage" ref="imgUpload" @success="uploaded" :isCompress="true" />
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" style="width:300px" :rows="5" v-model="formObj.summary" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">提交审核信息</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog title="批量修改" :visible.sync="dialog2Visible" width="500px">
            <template>
                <el-form :inline="true">
                    <h4 style="color:#f00">等待审核的图集才能被修改</h4>
                    <el-form-item label="图集来源(搜索条件)">
                        <el-input v-model="formObj.from" placeholder="不填则该条件无效"></el-input>
                    </el-form-item>
                    <h4 style="color:#f00;font-size: large;">修改结果:</h4>
                    <el-form-item label="审核状态(调整为)">
                        <el-select v-model="formObj.status" placeholder="请选择">
                            <el-option v-for="item in statusList2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formObj.status === 2" label="上线时间">
                        <el-date-picker v-model="formObj.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :inline="false" label="发布平台">
                        <el-select v-model="blukEditObj.pid" placeholder="请选择项目">
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
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog2Visible = false">取 消</el-button>
                    <el-button type="primary" @click="onClickSubmit">提交审核信息</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog title="通过图集" :visible.sync="passVideoVistable" width="500px">
            <template>
                <el-form :inline="true">
                    <el-form-item label="图集id">
                        {{ passVideoData.id }}
                    </el-form-item>
                    <el-form-item label="来源:">
                        <el-input v-model="passVideoData.from"></el-input>
                    </el-form-item>
                    <el-form-item label="上线时间">
                        <el-date-picker v-model="passVideoData.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发布城市">
                        <el-input v-model="passVideoData.location" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="toPass">审核通过</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog title="编辑信息" top="10%" :visible.sync="dialogEditVisible" width="600px">
            <div class="x-flex-container" style="display:flex;  justify-content:space-between;">
                <div style="width:450px">
                    <el-form ref="formName1" label-width="100px" :inline="true" :model="editimg">
                        <el-form-item label="图集id">
                            <el-input type="string" v-model="editimg.id" placeholder="请输入图集id"></el-input>
                        </el-form-item>
                        <el-form-item label="图集名称">
                            <el-input type="string" v-model="editimg.name" placeholder="请输入图集名称"></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input type="string" :rows="5" v-model="editimg.summary" placeholder="请输入简介">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="tags" :rules="{ required: true, message: '标签不能为空', trigger: 'blur' }" label="标签">
                            <el-tooltip class="item" effect="dark" content="多个标签用逗号,隔开" placement="top">
                                <el-input type="string" v-model="editimg.tags" placeholder="请输入标签名称"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="免费展示数量">
                            <el-input type="number" v-model="editimg.freeImgCnt" placeholder="请输入数量"></el-input>
                        </el-form-item>
                        <el-form-item label="审核状态">
                            <el-select v-model="editimg.status" placeholder="请选择" style="width:160px">
                                <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="width:320px;overflow:auto;height:300px">上传图集
                    <template v-if="editimg.imageUrls">
                        <ImgListUpload @success="uploadedAtlas1" :path='UploadPath.AtlasImage' :fileList="imgList1" @delete="deleteImage1" />
                    </template>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加图集" :visible.sync="dialog3Visible" width="600px">
            <el-form ref="formName" label-width="100px" :model="addNewObj">
                <el-form-item label="用户昵称">
                    <el-input v-model="addNewObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="上传人">
                    <el-input v-model="addNewObj.uploadId" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="addNewObj.from" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="免费展示数量" prop="freeImgCnt" :rules="freeRules">
                    <el-input type="number" v-model="addNewObj.freeImgCnt" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input type="number" v-model="addNewObj.price" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="特点">
                    <el-input v-model="addNewObj.opt" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="付费类型">
                    <el-select v-model="addNewObj.payType" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in chargeType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主体类型" v-if="!formObj.id">
                    <el-select v-model="addNewObj.type" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in contentEntityType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" :rows="3" v-model="addNewObj.summary" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="上传图集">
                    <template v-if="addNewObj.imageUrls">
                        <ImgListUpload @success="uploadedAtlas" :path='UploadPath.AtlasImage' :fileList="imgList" @delete="deleteImage" />
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog3Visible = false">取 消</el-button>
                <el-button type="primary" @click="submitAtlas">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="发布图集" :visible.sync="releaseVisible" width="500px">
            <el-form :inline="true">
                <el-form-item label="上线时间">
                    <el-date-picker v-model="formObj.releaseDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置">
                    <el-input v-model="formObj.location"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="releaseVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">发布</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { addVerifyTask, atlasInsertContent, cancelAllVerifyTask, cancelOneVerifyTask, delOne, downVideo, editAtlas1, flushVerifyTask, getManyVerifyVideos, passOne, releaseVideo, updatePlist, updateVerifyVideos, uploadImg, waitOne } from '@/api/videoManager';
import imgListUpload from '@/components/imgListUpload.vue';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import { atlasSortList, auditStateList, ChargeType, ContentEntityType, payTypeList, pidList, reasonList, timeTypeList, UploadPath } from '@/utils/baseConst';
import { getRandomCity } from '@/utils/city';
import { dateStartTimeFm, deepClone, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
import ImageCompressor from 'image-compressor.js';
import tagsCheckBox from './tagsCheckBox.vue';
import video from './video';


export default {
    components: {
        Video: video,
        ImgUpload: imgUpload,
        TagsCheckBox: tagsCheckBox,
        ImgListUpload: imgListUpload,
    },
    data() {
        const checkFreeNumber = (rule, value, cb) => {
            console.log(value);
            if (value > 0) {
                return cb();
            }
            else {
                return cb(new Error("免费次数必须大于等于0"));
            }
        };
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            search: {
                status: 2,
            },
            dateArr1: [],
            dateArr2: [],
            pageData: [],
            formObj: {},
            pidList,
            dialogVisible: false,
            dialog2Visible: false,
            releaseVisible: false,
            videoUrl: '',
            sortList: atlasSortList,
            UploadPath: UploadPath,
            payTypeList: payTypeList,
            timeTypeList: timeTypeList,
            statusList: auditStateList,
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
                'imageUrls',
                // 'publisherId',
                'uploadId',
                'playURL',
                'status',
                'price',
                'from',
                'reason',
                'opt',
                'tags',
            ],
            isIndeterminate: false,
            checkAll: true,
            loadType: 0,
            passVideoData: {},
            passVideoVistable: false,

            dialog3Visible: false,
            addNewObj: {},
            editimg: {},
            contentEntityType: ContentEntityType,
            chargeType: ChargeType,
            sortT: {},
            imgList: [],
            imgList1: [],
            freeRules: [
                { validator: checkFreeNumber, trigger: 'blur' },
            ],
            loadType: '',
            ////////////// 批量修改 //////////////////////
            selectList: [],
            isUpdateSelect: true,
            blukDialogVisible: false,
            blukEditObj: {},

            dialogEditVisible: false,
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
        uploadedAtlas1(path) {
            this.isChangedAtlas = true;
            this.editimg.imageUrls.push(path);
        },
        deleteImage1(path) {
            this.isChangedAtlas = true;
            var list = this.editimg.imageUrls;
            for (let i = 0; i < list.length; i++) {
                if (path == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
        },
        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            query.pid = CURRENTPID;
            query.sizeMin = query.sizeMin ? query.sizeMin * 1024 * 1024 : undefined;
            query.sizeMax = query.sizeMax ? query.sizeMax * 1024 * 1024 : undefined;
            query.categorie = query.categorie ? query.categorie[query.categorie.length - 1] : undefined;
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
            let res = await this.$http(getManyVerifyVideos, { page: this.page, count: this.count, type: "atlas", ...this.sortT }, true);
            if (res.code === 200) {
                this.isSelf = false;
                await this.setData(res);
                this.loadType = 0;
            }
        },
        async loadData() {
            let res = await this.$http(getManyVerifyVideos, { pid: CURRENTPID, page: this.page, count: this.count, type: "atlas", ...this.getQuery() }, true);
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
            this.pageData = deepClone(await setImgView(res.msg.pageData, "imageUrls"));


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
        categorieFormat(row, column, cellValue) {
            return typeof cellValue == "object" ? cellValue.map(i => i.name).join("，") : cellValue;
        },
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
            console.log(path);
            this.formObj.coverURL = path;
        },
        uploadedAtlas(path) {
            this.addNewObj.imageUrls.push(path);
        },
        deleteImage(path) {
            var list = this.addNewObj.imageUrls;
            for (let i = 0; i < list.length; i++) {
                if (path == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
            console.log(this.addNewObj.imageUrls);
        },
        async submitEditForm() {
            this.$refs["formName1"].validate(async (valid) => {
                if (valid) {
                    let tags = this.editimg.tags;
                    let query = deepClone(this.editimg);
                    query.pid = CURRENTPID;
                    query.tags = tags.split(",");
                    delete query.coverURLView;
                    let res = await this.$http(editAtlas1, query);
                    if (res.code === 200) {
                        this.optType = '';
                        this.$message.success("编辑成功");
                        this.dialogEditVisible = false;
                        this.loadData();
                    }
                } else {
                    return false;
                }
            });
        },
        async submitForm() {
            let query = deepClone(this.formObj);
            // let item = this.restaurants.find(i => i.label === query.publisherId);
            // query.publisherId = item ? item.value : query.publisherId;
            // query.categorie = this.formObj.categorie ? this.formObj.categorie.map(i => i[i.length - 1]) : [];
            // delete query.coverURLView;
            // let res = await this.$http(updateVerifyVideos, query);
            // if (res.code === 200) {
            //     this.$message.success("修改成功");
            //     this.dialogVisible = false;
            //     if (this.loadType) {
            //         this.refreshList();
            //     }
            //     else {
            //         this.loadData();
            //     }

            // }
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
        async submitAtlas() {
            this.$refs["formName"].validate(async (valid) => {
                if (valid) {
                    let query = deepClone(this.addNewObj);
                    let res = await this.$http(atlasInsertContent, query);
                    if (res.code === 200) {
                        this.$message.success("添加成功");
                        this.dialog3Visible = false;
                        if (this.loadType) {
                            this.refreshList();
                        }
                        else {
                            this.loadData();
                        }
                    }
                } else {
                    return false;
                }
            });
        },
        editLine(row) {
            this.imgList1.splice(0);
            if (row.imageUrlsView) {
                for (let i = 0; i < row.imageUrlsView.length; i++) {
                    this.imgList1.push({ name: i, url: row.imageUrlsView[i], path: row.imageUrls[i] });
                }
            }
            this.editimg = {
                status: row.status,
                id: row._id,
                name: row.name,
                summary: row.summary,
                tags: "",
                freeImgCnt: row.freeImgCnt,
                imageUrls: row.imageUrls,
            };
            this.dialogEditVisible = true;
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
            let nexDay = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000);
            let dedaultDay = dateStartTimeFm(nexDay);
            let location = getRandomCity();
            this.passVideoData = { id: row._id, from: row.from || "9527", releaseDate: dedaultDay, location };
            this.passVideoVistable = true;
        },
        async toPass() {
            let res = await this.$http(passOne, {
                id: this.passVideoData.id,
                from: this.passVideoData.from,
                releaseDate: this.passVideoData.releaseDate, // 时间转换
                location: this.passVideoData.location,
                pids: this.passVideoData.pids,
            });
            if (res.code === 200) {
                this.$message.success("图集已通过审核");
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
                this.$message.success("图集已被暂存");
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
        async onClickDel(row) {
            await this.$confirm(`是否拒绝审核 ${row._id}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delOne, { id: row._id });
            if (res.code === 200) {
                this.$message.success("图集已被拒绝通过");
                if (this.loadType) {
                    this.refreshList();
                }
                else {
                    this.loadData();
                }
            }
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
            let res = await this.$http(addVerifyTask, { type: "atlas", needCnt: prompt.value, page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.isSelf = true;
                this.setData(res);
                this.loadType = 1;
            }
        },
        async refreshList() {
            let res = await this.$http(flushVerifyTask, { type: "atlas", page: this.page, count: this.count });
            if (res.code === 200) {
                this.isSelf = true;
                this.setData(res);
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
            this.formObj = {};
            this.dialog2Visible = true;
            // from;
        },
        onClickAdd() {
            this.imgList = [];
            this.dialog3Visible = true;
            this.addNewObj = {
                name: "",
                summary: "",
                uploadId: "",
                from: "",
                price: "",
                payType: "",
                opt: "",
                imageUrls: [],
                type: ""
            };
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
            formData.append("path", this.UploadPath.AtlasImage);
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
        },
        async loadUsers() {
            // let res = await this.$http(getPublisher, {});
            // if (res && res.code === 200 && res.msg) {
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
                updateModel.pid = query.pid;
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
