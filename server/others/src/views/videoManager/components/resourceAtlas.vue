<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
             <el-form-item label="项目">
                <el-select v-model="search.pid" placeholder="请选择项目">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排除项目">
                <el-select v-model="search.npid" placeholder="请选择项目">
                    <el-option label="无" :value="undefined"></el-option>
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图集id">
                <el-input v-model="search.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图集名称">
                <el-input v-model="search.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上传人">
                <el-input v-model="search.uploadId" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-select v-model="search.publisherId" filterable placeholder="请选择">
                    <el-option-group
                      v-for="group in searchPublisherArr"
                      :key="group.value"
                      :label="group.label">
                      <el-option
                        v-for="item in group.children"
                        :key="item.uid"
                        :label="item.name"
                        :value="item.uid">
                      </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="图集审核人">
                <el-input v-model="search.opt" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图集来源">
                <el-select v-model="search.from" filterable allow-create default-first-option placeholder="请输入">
                    <el-option label="全部" :value="undefined">
                    </el-option>
                    <el-option label="来源缺失" value="none">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付费方式">
                <el-select v-model="search.payType" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图集状态">
                <el-select v-model="search.state" placeholder="请选择" style="width:160px">
                    <el-option label="全部" :value="undefined"></el-option>
                    <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="价格范围">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.priceMin" placeholder="起" style="width:120px">
                        </el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.priceMax" placeholder="止" style="width:120px">
                        </el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="热度范围">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.hotMin" placeholder="起" style="width:120px"></el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.hotMax" placeholder="止" style="width:120px"></el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间">
                <el-date-picker v-model="dateArr2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="上线时间">
                <el-date-picker v-model="dateArr3" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="修改时间">
                <el-date-picker v-model="dateArr4" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button v-if="!isMaterial" type="primary" @click="exportData">导出</el-button>
                <el-button v-if="!isMaterial" type="primary" @click="refreshData">刷新</el-button>
            </el-form-item>
        </el-form>
        <div class="showColumns">
            <h4>表格显示列</h4>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="showColumns" @change="handleCheckedCitiesChange">
                <el-checkbox class="checkbox" v-for="(item,index) in columns" :label="item.value" :key="index">
                    {{item.label}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div style="margin: 5px 5px; padding:20px;">
            <el-button v-if="!isMaterial" type="primary" @click="bulkEdit">批量编辑</el-button>
            <el-button type="danger"  @click="clearSelect()" style="padding-left:20px">清空选中</el-button>
            <el-badge :value="selectList.length" class="item" type="primary" style="padding-left:20px">
                <el-popover ref="popover" 
                    placement="right"
                    width="1000px"
                    trigger="click">
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

        <el-table :data="pageData" :border="true" min-width="100%" ref="table" @header-click="handleHeaderClick" @selection-change="handleSelectionChange" max-height="800px">
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('_id')" prop="_id" label="图集id" align="center" min-width="220" fixed="left"></el-table-column>
            <el-table-column v-if="showColumns.includes('pids')" prop="pids" label="项目列表"  align="center" :formatter="pidListArr" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" sortable="false" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('optCreate')" prop="optCreate" label="审核时间" sortable="false" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('releaseDate')" prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('updatedDate')" prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
            <el-table-column v-if="showColumns.includes('name')" prop="name" label="图集名称" align="center" min-width="160"></el-table-column>
            <el-table-column v-if="showColumns.includes('price')" prop="price" label="免费展示数量" align="center" min-width="160"></el-table-column>
            <el-table-column v-if="showColumns.includes('summary')" prop="summary" label="简介" align="center" min-width="200"></el-table-column>
            <el-table-column v-if="showColumns.includes('imageUrls')" prop="imageUrls" label="图集" align="center" min-width="150">
                <template slot-scope="scope" v-if="scope.row.imageUrlsView">
                    <div style="width: 100%; height: 220px;overflow:auto;">
                        <div v-for="{itemimg,index} in scope.row.imageUrlsView" :key="index">
                            <el-image v-if="itemimg" style="width: 100px; height: 100px;display: inline-block;" :src="itemimg" :preview-src-list="[itemimg]">
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

            <el-table-column v-if="showColumns.includes('state')" prop="state" label="状态" align="center" :formatter="stateFormat">
                <!--  <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="checkState(scope.row)">{{stateFormat(null,null,scope.row.state)}}</el-button>
                </template> -->
            </el-table-column>
            <el-table-column v-if="showColumns.includes('publisherId')" prop="publisherId" label="发布人" align="center" :formatter="publisherIdFormat">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('uploadId')" prop="uploadId" label="上传人" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('price')" prop="price" label="价格" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('payType')" prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column>
            <el-table-column v-if="showColumns.includes('collectedCnt')" prop="collectedCnt" label="收藏数量" align="center"></el-table-column>
            <el-table-column v-if="showColumns.includes('likedCnt')" prop="likedCnt" label="点赞次数" align="center">
            </el-table-column>
            <el-table-column v-if="showColumns.includes('hot')" prop="hot" label="热度" align="center"></el-table-column>
            <el-table-column v-if="showColumns.includes('commentCnt')" prop="commentCnt" label="评论数" align="center">
            </el-table-column>

            <el-table-column v-if="showColumns.includes('opt')" prop="opt" label="审核人" align="center"></el-table-column>

            <el-table-column show-overflow-tooltip v-if="showColumns.includes('categorie')" prop="categorie" label="分类" align="center" :formatter="categorieFormat" min-width="200"></el-table-column>
            <el-table-column v-if="showColumns.includes('from')" prop="from" label="图集来源" align="center"></el-table-column>
            <el-table-column v-if="showColumns.includes('index')" prop="index" label="排序索引" align="center" min-width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button>
                    <el-button type="text" :disabled=(!scope.row.m3u8Preview) style="margin:0 10px 0 0" @click="play(scope.row.m3u8Preview)">播放预览</el-button> -->
                    <el-button type="text" style="margin:0 10px 0 0" @click="editLine(scope.row)">编辑</el-button>
                    <!-- <el-button type="text" style="margin:0 10px 0 0" @click="checkState(scope.row)">状态</el-button> -->
                    <!-- <el-button type="text" style="margin:0 10px 0 0" @click="delLine(scope.row)">删除</el-button> -->
                    <!-- <el-button type="text" style="margin:0 10px 0 0" @click="downVideo(scope.row)">下载</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50,100,200,500]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
        <el-dialog title="图集播放" @keyup.native.27="dialogVideo=false" :visible.sync="dialogVideo" width="790px" :close-on-click-modal="true" @close="closePlayer">
            <Video ref="video" :url="videoUrl" />
        </el-dialog>
        <el-dialog title="编辑信息" top="5%" :visible.sync="dialogVisible" width="600px">
            <div class="x-flex-container" style="display:flex;  justify-content:space-between;">
                <div style="width:450px">
                    <el-form label-width="80px" :inline="true">
                        <el-form-item  label="项目列表">
                            <el-select multiple v-model="formObj.pids" placeholder="请选择项目">
                                <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图集名称">
                            <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="付费方式">
                            <el-select v-model="formObj.payType" placeholder="请选择" style="width:160px">
                                <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图集价格" v-if="formObj.payType===4">
                            <el-input type="number" v-model="formObj.price" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="排序" v-if="formObj.payType==4||formObj.payType==3">
                            <el-input type="number" v-model="formObj.index" placeholder="不填则使用默认排序"></el-input>
                        </el-form-item>
                        <el-form-item label="发布城市">
                            <el-input v-model="formObj.location" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="图集来源">
                            <el-input type="text" v-model="formObj.from" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-radio-group v-model="formObj.state" style="width:300px">
                                <el-radio :label="1">上架</el-radio>
                                <el-radio :label="2">下架</el-radio>
                                <el-radio :label="3">等待复审</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <br>
                        <el-form-item label="发布人">
                            <el-select v-model="formObj.publisherId" filterable placeholder="请选择">
                                <el-option-group
                                    v-for="group in restaurants"
                                    :key="group.value"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in group.children"
                                        :key="item.uid"
                                        :label="item.name"
                                        :value="item.uid">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input type="textarea" style="width:300px" :rows="5" v-model="formObj.summary" placeholder="请输入">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="width:320px;overflow:auto;height:600px">上传图集
                    <template v-if="formObj.imageUrls">
                        <ImgListUpload @success="uploadedAtlas" :path='UploadPath.AtlasImage' :fileList="imgList" @delete="deleteImage" />
                    </template>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改封面图" :visible.sync="dialogVisible2" width="600px">
            <el-form label-width="80px" :inline="true">
                <el-form-item label="图集名称">
                    <el-input readonly v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="付费方式">
                    <el-select disabled v-model="formObj.payType" placeholder="请选择" style="width:160px">
                        <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图集价格" v-if="formObj.payType===4">
                    <el-input readonly type="number" v-model="formObj.price" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="排序" v-if="formObj.payType==4||formObj.payType==3">
                    <el-input readonly type="number" v-model="formObj.index" placeholder="不填则使用默认排序"></el-input>
                </el-form-item>
                <el-form-item label="图集地址">
                    <el-input disabled v-model="formObj.location" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="发布人">
                    <el-input readonly class="inline-input" v-model="formObj.publisherId" value-key="label" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="封面图(点图上传)" label-width="150px">
                    <ImgUpload :imageUrl="formObj.coverURLView" :path="UploadPath.AtlasImage" :isCompress="true" @success="uploaded" />
                </el-form-item>
                <el-form-item label="简介">
                    <el-input readonly type="textarea" style="width:300px" :rows="5" v-model="formObj.summary" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitForm2">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="批量编辑" :visible.sync="blukDialogVisible" width="600px" @close="closeBlukView">
            <el-form label-width="80px" :inline="true">
                <el-form-item label="付费方式">
                    <el-select v-model="blukEditObj.payType" placeholder="请选择" style="width:300px">
                        <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" @click="updatePayType('1')" style="margin-left:20px">修改付费方式</el-button>
                </el-form-item>
                <el-form-item label="图集价格" v-if="blukEditObj.payType===4">
                    <el-input type="number" v-model="blukEditObj.price" placeholder="请输入" style="width:300px">
                    </el-input>
                </el-form-item>
                <br>
                <el-form-item label="状态">
                    <el-radio-group v-model="blukEditObj.state" style="width:300px">
                        <el-radio :label="1">上架</el-radio>
                        <el-radio :label="2">下架</el-radio>
                        <el-radio :label="3">等待复审</el-radio>
                    </el-radio-group>
                    <el-button type="primary" @click="updatePayType('5')" style="margin-left:20px">修改图集状态</el-button>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-select v-model="blukEditObj.publisherId" filterable placeholder="请选择">
                        <el-option-group
                            v-for="group in restaurants"
                            :key="group.value"
                            :label="group.label">
                            <el-option
                                v-for="item in group.children"
                                :key="item.uid"
                                :label="item.name"
                                :value="item.uid">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <el-button type="primary" @click="updatePayType('6')" style="margin-left:20px;width:126px">修改发布人
                    </el-button>
                </el-form-item>
                <el-form-item label="图集来源">
                    <el-input type="text" v-model="blukEditObj.from" placeholder="请输入" style="width:300px"></el-input>
                    <el-button type="primary" @click="updatePayType('7')" style="margin-left:20px;width:126px">修改图集来源
                    </el-button>
                </el-form-item>
                 <el-form-item  label="添加平台">
                    <el-select multiple v-model="blukEditObj.pids" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                    </el-select>
                    <el-button type="primary" @click="updatePayType('8')" style="margin-left:20px;width:126px">添加平台</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="blukDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { blukUpdateVideos, downVideo, getManyVideos, getPublisher, updateCoverURL, updateState, updateVideos, videosExcel } from '@/api/videoManager';
import imgListUpload from '@/components/imgListUpload.vue';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import { payTypeList, pidList, sortList, timeTypeList, UploadPath, UserTypeNew, videoStateList } from '@/utils/baseConst';
import { deepClone, getCategories, getWholeCategorieLabelArr, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
import video from './video';
export default {
    components: {
        Video: video,
        ImgUpload: imgUpload,
        ImgListUpload: imgListUpload,
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        size: String,
    },
    data() {
        return {
            isshowTags: true,
            mtags: [],
            UploadPath: UploadPath,
            origintags: [],
            mtagsgroup: [],
            newTag: '',
            innerTags: [...this.value],
            checked: 1,
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            dateArr4: [],
            pageData: [],
            formObj: {},
            dialogVisible: false,
            dialogVisible2: false,
            dialogVideo: false,
            videoUrl: '',
            sortList: sortList,
            pidList,
            UserTypeNew,
            payTypeList: payTypeList,
            timeTypeList: timeTypeList,
            stateList: videoStateList,
            columns: [],
            isMaterial: false,
            showColumns: [
                '_id',
                "pids",
                'createdDate',
                'optCreate',
                'name',
                'summary',
                'imageUrls',
                'publisherId',
                'uploadId',
                'price',
                'payType',
                'likedCnt',
                'hot',
                'commentCnt',
                'state',
                'opt',
                'categorie',
                'releaseDate',
                'updatedDate',
                'pullCategorie',
                'from',
                'price',
                'index',
                'collectedCnt'
            ],
            blukDialogVisible: false,
            blukEditObj: {},
            isIndeterminate: false,
            checkAll: true,
            restaurants: [],
            isCheckedTags: true,
            searchPublisherArr: [],
            sortT: {},
            imgList: [],
            isChangedAtlas: false,
            selectList:[],
            isUpdateSelect:true,
        };
    },
    computed: {
        categorieList() {
            return this.$store.getters.categorieList;
        },
        tagsList() {
            if (this.origintags.length < 1) {
                let list = this.$store.getters.tagsList;
                this.mtags.splice(0);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    this.mtags.push(item);
                    this.origintags.push(item);
                }
            }
            return this.$store.getters.tagsList;
        }
    },
    async created() {
        this.loadData();
        this.loadUsers();
        this.isMaterial = this.$route.name.includes('material');
    },
    watch: {
        value() {
            this.innerTags = [...this.value];
        }
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
        uploadedAtlas(path) {
            this.isChangedAtlas = true;
            this.formObj.imageUrls.push(path);
        },
        deleteImage(path) {
            this.isChangedAtlas = true;
            var list = this.formObj.imageUrls;
            for (let i = 0; i < list.length; i++) {
                if (path == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
        },
        focusTagInput() {
            if (this.readOnly || !this.$el.querySelector('.tag-input')) {
                return;
            } else {
                this.$el.querySelector('.tag-input').focus();
            }
        },
        inputTag(ev) {
            this.newTag = ev.target.value;
            let value = ev.target.value;
            if (value.length > 0) {
                let tags = [];
                for (let i = 0; i < this.origintags.length; i++) {
                    if (this.origintags[i].label.includes(value)) {
                        tags.push(this.origintags[i]);
                    }
                }
                this.mtags = tags;
            }
            else {
                this.mtags = this.origintags;
            }

        },
        addTag(tag) {
            tag = tag.trim();
            if (tag && !this.innerTags.includes(tag)) {
                this.innerTags.push(tag);
                return true;
            }
            return false;
        },
        remove(index) {
            let item = this.getItemTagByLabel(this.innerTags[index]);
            this.removeTagByValue(item.value);
            this.innerTags.splice(index, 1);
            this.tagChange();

        },
        removeLastTag() {
            if (this.newTag) {
                return;
            }
            let item = this.getItemTagByLabel(this.innerTags[this.innerTags.length - 1]);
            this.removeTagByValue(item.value);
            this.innerTags.pop();
            this.tagChange();
        },
        removeTagByValue(value) {
            let list = this.mtagsgroup;
            for (let i = 0; i < list.length; i++) {
                if (value == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
        },
        tagChange() {
            this.$emit('input', this.innerTags);
        },

        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            query.sizeMin = query.sizeMin ? query.sizeMin * 1024 * 1024 : undefined;
            query.sizeMax = query.sizeMax ? query.sizeMax * 1024 * 1024 : undefined;
            query.categorie = query.categorie ? query.categorie[query.categorie.length - 1] : undefined;
            query.publisherId = query.publisherId;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createdDateStart = this.dateArr1[0];
                query.createdDateEnd = this.dateArr1[1];
            }
            if (this.dateArr2 && this.dateArr2.length > 1) {
                query.optCreateStart = this.dateArr2[0];
                query.optCreateEnd = this.dateArr2[1];
            }
            if (this.dateArr3 && this.dateArr3.length > 1) {
                query.releaseDateStart = this.dateArr3[0];
                query.releaseDateEnd = this.dateArr3[1];
            }
            if (this.dateArr4 && this.dateArr4.length > 1) {
                query.updateDateStart = this.dateArr4[0];
                query.updateDateEnd = this.dateArr4[1];
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
                case "optCreate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[12].value;
                    }
                    else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[13].value;
                    }
                    this.loadData2();
                    break;
            }
        },
        async loadData2() {
            let res = await this.$http(getManyVideos, { type: "atlas", page: this.page, count: this.count, ...this.sortT });
            if (res.code === 200) {
                this.isCheckedTags = false;
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.pageData = deepClone(await setImgView(res.msg.pageData, "coverURL"));
            }
        },
        async loadData() {
            let res = await this.$http(getManyVideos, { type: "atlas", page: this.page, count: this.count, ...this.getQuery() });
            if (res.code === 200) {
                this.isCheckedTags = false;
                this.isUpdateSelect=false;
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.pageData = deepClone(await setImgView(res.msg.pageData, "imageUrls"));
                 this.$nextTick(() => {
                    // 指定选中状态
                    if(this.selectList.length){
                        let selectItems=[];
                        this.pageData.forEach(e=>{
                            let find=this.selectList.find(s=>s._id===e._id);
                            if(find){
                                selectItems.push(e);
                            }
                        });
                        if(selectItems.length){
                            selectItems.forEach(e=>{
                                this.$refs.table.toggleRowSelection(e,true);
                            });
                        } 
                    }
                    this.isUpdateSelect=true;
                }); 
            }
        },
        async exportData() {
            let res = await this.$http(videosExcel, { page: this.page, count: this.count, ...this.getQuery() });
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
        async refreshData() {
            await this.loadData();
        },
        handleChange(val) { console.log(val, this.formObj.categorie); },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
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

        initSelectCheckBox() {
            this.mtagsgroup.splice(0);


        },

        handleCheckedCitiesChange1(value) {
            this.innerTags.splice(0);
            for (let i = 0; i < value.length; i++) {
                let item = this.getItemTag(value[i]);
                this.innerTags.push(item.label);
            }
        },
        getItemTag(value) {
            var list = this.origintags;
            for (let i = 0; i < list.length; i++) {
                if (list[i].value == value) {
                    return list[i];
                }
            }
            return {};
        },
        getItemTagByLabel(label) {
            var list = this.origintags;
            for (let i = 0; i < list.length; i++) {
                if (list[i].label == label) {
                    return list[i];
                }
            }
            return {};
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
        stateFormat(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        categorieFormat(row, column, cellValue) {
            let v = getCategories(cellValue, this.categorieList);
            v = getWholeCategorieLabelArr(v, this.categorieList);
            return v;
        },
        pidListArr(row, column, cellValue) {
            let str='';
            (cellValue||[]).forEach(e=>{
                let item = this.pidList.find(i => i.pid === e);
                let name=item ? item.name : e;
                if(!str){
                    str+=name;
                }else{
                    str+=","+name;
                }
            });
            return str;
        },

        // categorieFormat(row, column, cellValue) {
        //     if (Array.isArray(cellValue) && cellValue.length != 0) {
        //         let v = getWholeCategorieLabelByIds(cellValue, this.categorieList);
        //         return v;
        //     }
        // },
        arrFormat(row, column, cellValue) {
            return typeof cellValue == "object" ? cellValue.join('，') : cellValue;
        },
        tagsFormat(row, column, cellValue) {
            let str = '';
            if (cellValue && cellValue.length > 0) {
                for (let j of cellValue) {
                    let item = this.tagsList.find(i => i.value === j);
                    str += (item ? item.label : j) + " ";
                    if (!item && !this.isCheckedTags) {
                        this.isCheckedTags = true;
                        this.$message('标签未解析，已更新，请重新查询');
                        this.$store.dispatch("baseData/setTags",CURRENTPID);
                    }
                }
            }
            return str ? str : cellValue;
        },
        publisherIdFormat(row, column, cellValue) {
            let name="";
            for(let i=0;i<this.searchPublisherArr.length;i++){
                let item = this.searchPublisherArr[i].children.find(i => i.uid === cellValue);
                if(item){
                    name=item.name;
                    break
                }
            }
            return name ? name : cellValue;
        },
        urlFormat(row, column, cellValue) {
            return cellValue ? `${getSession("src")[0] || ""}/${cellValue}` : cellValue;
        },
        uploaded(path) {
            this.formObj.coverURL = path;
        },
        async submitForm() {
            this.formObj.tags = this.mtagsgroup;
            let query = { ...this.formObj };
            query.publisherId = query.publisherId;
            // query.categorie = query.categorie ? query.categorie.map(i => i[i.length - 1]) : [];
            delete query.imageUrlsView;
            if (!this.isChangedAtlas) {
                delete query.imageUrls;
            }
            let res = await this.$http(updateVideos, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogVisible = false;
                this.loadData();
            }
        },
        async submitForm2() {
            let query = { id: this.formObj.id, coverURL: this.formObj.coverURL };
            let res = await this.$http(updateCoverURL, query);
            if (res.code === 200) {
                this.$message.success("修改成功");
                this.dialogVisible2 = false;
                this.loadData();
            }
        },
        editLine(row) {
            this.isChangedAtlas = false;
            this.imgList.splice(0);
            if (row.imageUrlsView) {
                for (let i = 0; i < row.imageUrlsView.length; i++) {
                    this.imgList.push({ name: i, url: row.imageUrlsView[i], path: row.imageUrls[i] });
                }
            }
            this.formObj = {
                id: row._id,
                pids: row.pids,
                name: row.name,
                payType: row.payType,
                state: row.state,
                summary: row.summary,
                imageUrls: row.imageUrls,
                publisherId: row.publisherId,
                from: row.from,
                price: row.price,
                location: row.location,
                categorie: [],
            };
            let list = row.categorie;
            for (let i = 0; i < list.length; i++) {
                this.formObj.categorie.push(list[i].id);
            }
            if (this.isMaterial) {
                this.dialogVisible2 = true;
            }
            else {
                this.dialogVisible = true;
            }
            this.mtagsgroup.splice(0);
        },
        play(url) {
            this.videoUrl = this.urlFormat(null, null, url);
            this.dialogVideo = true;
        },
        async checkState(row) {
            let come = row.state == 1 ? 2 : 1;
            let prompt = await this.$prompt("请输入操作理由", `即将切换该用户状态为 ${this.stateFormat(null, null, come)}，是否确定？`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(updateState, { id: row._id, state: row.state === 1 ? 2 : 1, reason: prompt.value });
            if (res.code === 200) {
                this.$message.success("状态修改成功");
                this.loadData();
            }
        },
        closePlayer() {
            this.videoUrl = '';
        },
        bulkEdit() {
            if (this.selectList.length == 0) {
                this.$message.error("请选择图集资源");
            }
            else {
                this.blukEditObj = { payType: 2, timeType: 3, state: 1, from: "9527" };
                this.blukDialogVisible = true;
            }
        },
        async updatePayType(action) {
            let query = { ...this.blukEditObj };
            let idArr = [];
            this.selectList.forEach(element => {
                idArr.push(element._id);
            });
            // id去重复
            idArr=[...new Set(idArr)];
            let updateModel = { ids: idArr };
            if (action == 1) {
                updateModel.payType = query.payType;
                if (query.payType == 4) {
                    updateModel.price = query.price;
                }
            } else if (action == 2) {
                query.categorie = query.categorie ? query.categorie.map(i => i[i.length - 1]) : [];
                await this.$confirm(`图集分类未选择，确认修改吗？`, `提醒`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                });
                updateModel.categorie = query.categorie;
            }
            else if (action == 3) {
                await this.$confirm(`图集标签未选择，确认修改吗？`, `提醒`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                });
                updateModel.tags = query.tags ? query.tags : [];
            } else if (action == 4) {
                updateModel.timeType = query.timeType;
            } else if (action == 5) {
                updateModel.state = query.state;
            }
            else if (action == 6) {
                updateModel.publisherId = query.publisherId;
            }
            else if (action == 7) {
                updateModel.from = query.from;
            }
            else if (action == 8) {
                updateModel.pids = query.pids;
            }
            let res = await this.$http(blukUpdateVideos, updateModel);
            if (res.code === 200) {
                this.$message.success("修改成功");
            }
        },
        async closeBlukView() {
            if(!this.selectList.length){
                this.loadData();
                return
            };
            await this.$confirm(`确定清空选中的内容吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }) .then(async () => {
                // 先处理当前界面被选中的，
                let curSelect=[];
                this.pageData.forEach(e=>{
                    let f=this.selectList.find(s=>s._id===e._id);
                    if(f)curSelect.push(e)
                });
                // 同步刷新
                for(let i=0;i<curSelect.length;i++){
                    this.$refs.table.toggleRowSelection(curSelect[i],false);
                }
                // 清空
                this.selectList=[];
                this.loadData();
            })
        },
         delSelect(id){
            // 如果当前页面有选中的也要取消
            let find=this.pageData.find(e=>e._id===id);
            if(find){
                this.$refs.table.toggleRowSelection(find,false);
            }else{
                let index=this.selectList.findIndex(s=>s._id===id);
                if(index>=0){
                    this.selectList.splice(index,1);
                }
            }
        },
        async clearSelect(){
            if(!this.selectList.length){
                return
            };
            await this.$confirm(`确定清空选中的内容吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }) .then(async () => {
                // 先处理当前界面被选中的，
                let curSelect=[];
                this.pageData.forEach(e=>{
                    let f=this.selectList.find(s=>s._id===e._id);
                    if(f)curSelect.push(e)
                });
                // 同步刷新
                for(let i=0;i<curSelect.length;i++){
                    this.$refs.table.toggleRowSelection(curSelect[i],false);
                }
                // 清空
                this.selectList=[];
            })
            
        },
        goBack(){
            this.$refs.popover.doClose()
        },
        handleSelectionChange(val) {
            if(!this.isUpdateSelect)return 
            if(this.selectList.length>500){
                this.$message.error("选中的数量超过500,不能再添加了");
                return
            }
            let curList=this.pageData.map(e=>{return {_id:e._id,name:e.name,playURL:e.playURL}});
            if(Array.isArray(val)){
                let curSelectIds=this.selectList.map(e=>e._id);
                if(val.length){
                    let addIds=new Set();
                    let lessIds=new Set();
                    // 新加的
                    val.forEach(e=>{
                        if(!curSelectIds.includes(e._id)){
                            addIds.add(e._id);
                        }
                    });
                    // 取消的
                    curList.forEach(e=>{
                        // 已存在选中列表
                        if(curSelectIds.includes(e._id)){
                            // 当前是否选中该视频
                            let find=val.find(choose=>choose._id===e._id);
                            if(!find){
                                lessIds.add(e._id)
                            }
                        }
                    });
                    if(addIds.size){
                        addIds.forEach(e=>{
                            let item=val.find(i=>i._id===e);
                            if(item){
                                this.selectList.push({_id:item._id,name:item.name,playURL:item.playURL});
                            }
                        });
                    }
                    if(lessIds.size){
                        lessIds.forEach(e=>{
                            // 删除
                            let index=this.selectList.findIndex(s=>s._id===e);
                            if(index>=0){
                                this.selectList.splice(index,1);
                            }
                        });
                    }
                    console.log("添加选中:"+addIds.size+"取消选中:"+lessIds.size);
                }else{
                    // 可能取消全部
                    let lessIds=new Set();
                    curList.forEach(e=>{
                        // 已存在选中列表
                        if(curSelectIds.includes(e._id)){
                            lessIds.add(e._id)
                        }
                    });
                    if(lessIds.size){
                        lessIds.forEach(e=>{
                            // 删除
                            let index=this.selectList.findIndex(s=>s._id===e);
                            if(index>=0){
                                this.selectList.splice(index,1);
                            }
                        });
                    }
                    console.log("取消选中:"+lessIds.size);
                }
            }
        },
        
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.label.toString().includes(queryString));
            };
        },
        async loadUsers() {
            let res = await this.$http(getPublisher, {}, true);
            if (res.code === 200 && res.msg) {
                this.restaurants = res.msg.map(i => {
                    let userType=UserTypeNew.find(ut=>ut.value===i.type)
                    return { value: i.type, label: userType.label ,children:i.list};
                });
                this.restaurants.unshift({ value: -1, label: '随机分配',children:[{uid:-1,name:"随机分配"}]});
                this.searchPublisherArr = res.msg.map(i => {
                    let userType=UserTypeNew.find(ut=>ut.value===i.type)
                    return { value: i.type, label: userType.label ,children:i.list};
                });
                this.searchPublisherArr.unshift({ value: -1, label: '发布人缺失',children:[{uid:-1,name:"发布人缺失"}]});
                this.searchPublisherArr.unshift({ value:0, label: '不搜索' ,children:[{uid:undefined,name:"无"}]});
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
        }
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

.showColumns {
    margin: 20px 0;

    .checkbox {
        margin-bottom: 10px;
    }
}

.el-form-item.is-error .el-input-tag {
    border-color: #f56c6c;
}
.input-tag-wrapper {
    position: relative;
    font-size: 14px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: none;
    padding: 0 10px 0 5px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}
.el-tag {
    margin-right: 4px;
}

.tag-input {
    background: transparent;
    border: 0px;
    font-size: inherit;
    outline: none;
    padding-left: 0px;
    width: 100px;
}
.el-input-tag {
    min-height: 42px;
}
.el-input-tag--mini {
    min-height: 28px;
    line-height: 28px;
    font-size: 12px;
}

.el-input-tag--small {
    min-height: 32px;
    line-height: 32px;
}

.el-input-tag--medium {
    min-height: 36px;
    line-height: 36px;
}

.x-flex-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    > .left {
        width: 1px;
    }

    > .content {
        flex: 1;
    }

    > .right {
        width: 0px;
    }
}
</style>