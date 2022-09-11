<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-select style="margin: 5px" v-model="pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="searchData">刷新</el-button>
                <el-button type="primary" @click="showAdd">创建标签</el-button>
                <el-button type="primary" @click="submitIndex">提交排序</el-button>
            </el-form-item>
        </el-form>
        <div class="x-flex-container">
            <div style="width:20%;border:1px solid #ccc;overflow:auto;" :border="true" :style="{height: (mainHeight-190)+'px' }">
                <draggable v-model="pageData" chosenClass="chosen" group="true" @end="dragFinish">
                    <transition-group>
                        <template v-for="(item,index) in pageData">
                            <el-tag :key="index" closable :disable-transitions="false" @close="handleClose(item)" @click="editLine(item)">
                                {{item.name}}({{item.videoCnt}})
                            </el-tag>
                        </template>
                    </transition-group>
                </draggable>
            </div>
            <div style="width:80%;border:1px solid #ccc;" :style="{height: (mainHeight-190)+'px' }">
                <div style="margin: 5px;">
                    <el-input style="width:200px" v-model="searchT.id" placeholder="请输入搜索id"></el-input>
                    <el-button style="margin: 5px" type="primary" @click="searchData2">查询/刷新</el-button>
                    <el-button style="margin: 5px;font-weight:bold;" type="primary" @click="addVideos">添加视频</el-button>
                    <span style="margin: 5px;font-weight:bold;">当前标签 :{{currentTag.name}}</span>
                </div>
                <el-table :style="{width: (mainWidth - 290)+ 'px' }" :data="pageData2" :border="true" max-height="100%" :height="mainHeight - 300">
                    <el-table-column v-if="showColumns.includes('_id')" prop="_id" label="视频id" align="center" min-width="220" fixed="left"></el-table-column>

                    <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                    <el-table-column v-if="showColumns.includes('optCreate')" prop="optCreate" label="审核时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                    <el-table-column v-if="showColumns.includes('releaseDate')" prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                    <el-table-column v-if="showColumns.includes('updatedDate')" prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                    <el-table-column v-if="showColumns.includes('name')" prop="name" label="视频名称" align="center" min-width="160"></el-table-column>
                    <el-table-column v-if="showColumns.includes('summary')" prop="summary" label="简介" align="center" min-width="200"></el-table-column>
                    <el-table-column v-if="showColumns.includes('coverURL')" prop="coverURL" label="封面" align="center" min-width="150">
                        <template slot-scope="scope">
                            <el-image v-if="scope.row.coverURLView" style="max-width: 100px; max-height: 100px" :src="scope.row.coverURLView" :preview-src-list="[scope.row.coverURLView]">
                                <div slot="error" class="image-slot">
                                    加载失败
                                </div>
                            </el-image>
                            <div style="max-width: 100px; max-height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('state')" prop="state" label="状态" align="center" :formatter="stateFormat">
                        <!--  <template slot-scope="scope">
                    <el-button type="text" style="margin:0 10px 0 0" @click="checkState(scope.row)">{{stateFormat(null,null,scope.row.state)}}</el-button>
                </template> -->
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('publisherId')" prop="publisherId" label="发布人" align="center">
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('uploadId')" prop="uploadId" label="上传人" align="center">
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('time')" prop="time" label="时长" align="center" :formatter="secondFormat" min-width="120"></el-table-column>
                    <el-table-column v-if="showColumns.includes('size')" prop="size" label="体积大小" align="center" :formatter="sizeFormat" min-width="120"></el-table-column>
                    <el-table-column v-if="showColumns.includes('price')" prop="price" label="价格" align="center">
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('payType')" prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column>
                    <el-table-column v-if="showColumns.includes('timeType')" prop="timeType" label="长短类型" align="center" :formatter="timeTypeFormat"></el-table-column>
                    <el-table-column v-if="showColumns.includes('playURL')" prop="playURL" label="播放地址" align="center" min-width="300" :formatter="urlFormat"></el-table-column>
                    <el-table-column v-if="showColumns.includes('playCnt')" prop="playCnt" label="播放次数" align="center">
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('collectedCnt')" prop="collectedCnt" label="收藏数量" align="center"></el-table-column>
                    <el-table-column v-if="showColumns.includes('likedCnt')" prop="likedCnt" label="点赞次数" align="center">
                    </el-table-column>
                    <el-table-column v-if="showColumns.includes('hot')" prop="hot" label="热度" align="center"></el-table-column>
                    <el-table-column v-if="showColumns.includes('commentCnt')" prop="commentCnt" label="评论数" align="center">
                    </el-table-column>

                    <el-table-column v-if="showColumns.includes('opt')" prop="opt" label="审核人" align="center"></el-table-column>

                    <el-table-column show-overflow-tooltip v-if="showColumns.includes('categorie')" prop="categorie" label="分类" align="center" :formatter="categorieFormat" min-width="200"></el-table-column>
                    <el-table-column v-if="showColumns.includes('pullCategorie')" prop="pullCategorie" label="推送分类" align="center" :formatter="arrFormat" min-width="200"></el-table-column>
                    <el-table-column v-if="showColumns.includes('tags')" prop="tags" label="标签" align="center" :formatter="tagsFormat" min-width="200"></el-table-column>
                    <el-table-column v-if="showColumns.includes('from')" prop="from" label="视频来源" align="center"></el-table-column>
                    <el-table-column v-if="showColumns.includes('index')" prop="index" label="排序索引" align="center" min-width="100"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150" align="center">
                        <template slot-scope="scope">
                            <!-- <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button> -->
                            <!-- <el-button type="text" :disabled=(!scope.row.m3u8Preview) style="margin:0 10px 0 0" @click="play(scope.row.m3u8Preview)">播放预览</el-button> -->
                            <el-button type="text" @click="delVideo(scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col class="toolbar2">
                    <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :current-page="page2" :page-sizes="[10, 20, 30, 50]" :page-size="count2" :total="totalCount2"></el-pagination>
                </el-col>
            </div>
        </div>

        <el-dialog title="编辑标签" :visible.sync="dialogUpdate" width="400px">
            <el-form label-width="80px">
                <el-form-item label="标签名">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" :rows="3" v-model="formObj.summary" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量添加标签" :visible.sync="dialogVisible" width="800px">
            <el-form :inline="false">
                <div class="hint">多个标签换行隔开，每一行的标签可以加简介(不加也行)，标签名与其简介用逗号隔开，格式为:标签名,简介</div>
                <el-form-item>
                    <el-input type="textarea" :autosize="{ minRows: 5}" v-model="tags" placeholder="巨乳,简介文字简介文字简介文字" style="width:750px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMany">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="视频列表" top="30px" left :visible.sync="dialogVideoVisible" width="90%">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="视频id">
                    <el-input v-model="search.id" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="视频名称">
                    <el-input v-model="search.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="上传人">
                    <el-input v-model="search.uploadId" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-autocomplete class="inline-input" v-model="search.publisherId" value-key="label" :fetch-suggestions="publisherSearch" placeholder="请输入内容"></el-autocomplete>
                </el-form-item>
                <el-form-item label="视频审核人">
                    <el-input v-model="search.opt" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="视频来源">
                    <el-select v-model="search.from" filterable allow-create default-first-option placeholder="请输入">
                        <el-option label="全部" :value="undefined">
                        </el-option>
                        <el-option label="来源缺失" value="none">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频分类">
                    <el-cascader v-model="search.categorie" :options="[{ name: '全部', id: undefined },{ name: '分类缺失', id: 'none' },...categorieList]" :props="{ expandTrigger: 'hover',value:'id',label:'name',checkStrictly:true }" @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="视频标签">
                    <el-select filterable v-model="search.tags" placeholder="请选择" style="width:160px">
                        <el-option label="全部" :value="undefined"></el-option>
                        <el-option label="标签缺失" value="none"></el-option>
                        <el-option v-for="item in tagsList" :key="item.value" :label="item.label" :value="item.value">
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
                <el-form-item label="长短类型">
                    <el-select v-model="search.timeType" placeholder="请选择" style="width:160px">
                        <el-option label="全部" :value="undefined"></el-option>
                        <el-option v-for="item in timeTypeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频状态">
                    <el-select v-model="search.state" placeholder="请选择" style="width:160px">
                        <el-option label="全部" :value="undefined"></el-option>
                        <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否推送">
                    <el-select v-model="search.isPull" placeholder="请选择" style="width:160px">
                        <el-option label="全部" :value="undefined"></el-option>
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
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
                <el-form-item label="播放量范围">
                    <div class="zoneBox">
                        <div class="inputs">
                            <el-input type="number" v-model="search.playCntMin" placeholder="起" style="width:120px">
                            </el-input>
                        </div>
                        <div class="line">—</div>
                        <div class="inputs">
                            <el-input type="number" v-model="search.playCntMax" placeholder="止" style="width:120px">
                            </el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="点赞范围">
                    <div class="zoneBox">
                        <div class="inputs">
                            <el-input type="number" v-model="search.likedCntMin" placeholder="起" style="width:120px">
                            </el-input>
                        </div>
                        <div class="line">—</div>
                        <div class="inputs">
                            <el-input type="number" v-model="search.likedCntMax" placeholder="止" style="width:120px">
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
                    <el-button type="primary" @click="loadVideoData">查询</el-button>
                </el-form-item>
            </el-form>
            <div v-if="currentTag">当前标签 : {{currentTag.name}}></div>
            <div class="x-flex-container" style="display:flex;  justify-content:space-between;" v-if="currentTag">
                <div style="width:84.8%;!important">
                    <el-table :data="pageData3" :border="true" min-width="100%" ref="table" @header-click="handleHeaderClick" @selection-change="handleSelectionChange" max-height="500px">
                        <el-table-column type="selection" width="55" fixed="left">
                        </el-table-column>
                        <el-table-column prop="_id" label="视频id" align="center" min-width="220" fixed="left"></el-table-column>

                        <el-table-column prop="createdDate" sortable="false" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="optCreate" sortable="false" label="审核时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="name" label="视频名称" align="center" min-width="160"></el-table-column>
                        <el-table-column prop="summary" label="简介" align="center" min-width="200"></el-table-column>
                        <el-table-column prop="coverURL" label="封面" align="center" min-width="150">
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
                        <el-table-column prop="publisherId" label="发布人" align="center">
                        </el-table-column>
                        <el-table-column prop="uploadId" label="上传人" align="center">
                        </el-table-column>
                        <el-table-column class-name="" prop="time" label="时长" align="center" :formatter="secondFormat" min-width="120"></el-table-column>
                        <el-table-column prop="size" label="体积大小" align="center" :formatter="sizeFormat" min-width="120"></el-table-column>
                        <el-table-column prop="price" label="价格" align="center">
                        </el-table-column>
                        <el-table-column prop="playURL" label="播放地址" align="center" min-width="300" :formatter="urlFormat"></el-table-column>
                        <el-table-column prop="playCnt" label="播放次数" align="center">
                        </el-table-column>
                        <el-table-column prop="collectedCnt" label="收藏数量" align="center"></el-table-column>
                        <el-table-column prop="likedCnt" label="点赞次数" align="center">
                        </el-table-column>
                        <el-table-column prop="hot" label="热度" align="center"></el-table-column>
                        <el-table-column prop="commentCnt" label="评论数" align="center">
                        </el-table-column>

                        <el-table-column prop="opt" label="审核人" align="center"></el-table-column>

                        <el-table-column show-overflow-tooltip prop="categorie" label="分类" align="center" :formatter="categorieFormat" min-width="200"></el-table-column>
                        <el-table-column prop="pullCategorie" label="推送分类" align="center" :formatter="arrFormat" min-width="200"></el-table-column>
                        <el-table-column prop="tags" label="标签" align="center" :formatter="tagsFormat" min-width="200"></el-table-column>
                        <el-table-column prop="from" label="视频来源" align="center"></el-table-column>
                        <el-table-column prop="index" label="排序索引" align="center" min-width="100"></el-table-column>
                        <!-- <el-table-column fixed="right" label="操作" width="150" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>
                <div style="width:15%;!important;overflow:auto;height:500px;border: 1px solid #dcdfe6">
                    已选择视频：
                    <template v-for="(item,index) in selectedVideos">
                        <el-tag :key="index" closable :disable-transitions="false" @close="handleClose(item)">
                            {{item.name.substr(0,5)}}
                        </el-tag>
                    </template>
                </div>
            </div>
            <el-col class="toolbar2">
                <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange3" @size-change="handleSizeChange3" :current-page="page3" :page-sizes="[10,20,30,50,100,200,500]" :page-size="count3" :total="totalCount3"></el-pagination>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVideoVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormAddVideo">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
import { getManyTags, insertTags, updateTags, getManyVideos, updateVideos, getPublisher, blukUpdateVideos, deleteTags, sortManyTags } from '@/api/videoManager';
import draggable from 'vuedraggable';
import { deepClone, getCategories, getWholeCategorieLabelArr, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { payTypeList, sortList, timeTypeList, UploadPath, videoStateList, pidList } from '@/utils/baseConst';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import video from './video';
export default {
    components: {
        draggable,
        Video: video,
        ImgUpload: imgUpload
    },
    data() {
        return {
            searchPublisherArr: [],
            restaurants: [],
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            dateArr4: [],
            tempSubData: {},
            dialogVideoVisible: false,
            search: {},
            UploadPath: UploadPath,
            sortList: sortList,
            payTypeList: payTypeList,
            timeTypeList: timeTypeList,
            stateList: videoStateList,
            mainWidth: 0,
            mainHeight: 0,
            page: 1,
            page3: 1,
            page2: 1,
            count: 100,
            totalCount: 0,
            count2: 10,
            totalCount2: 0,
            count3: 10,
            totalCount3: 0,
            pageData: [],
            pageData2: [],
            pageData3: [],
            formObj: {},
            tags: "",
            dialogVisible: false,
            dialogUpdate: false,
            inputVisible: false,
            inputValue: '',
            currentTag: {},
            showColumns: [
                '_id',
                'createdDate',
                'optCreate',
                'name',
                'summary',
                'coverURL',
                'publisherId',
                'uploadId',
                'time',
                'size',
                'price',
                'payType',
                'timeType',
                'playURL',
                'playCnt',
                'likedCnt',
                'hot',
                'commentCnt',
                'state',
                'opt',
                'categorie',
                'tags',
                'releaseDate',
                'updatedDate',
                'pullCategorie',
                'from',
                'index',
                'collectedCnt'
            ],
            selectedVideos: [],
            tempSelectedVideos: [],
            sortT: {},
            searchT: {},
            formObj: {},
            pidList: pidList,
            pid: "A",
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.mainHeight = document.querySelector('.app-main').clientHeight;
            this.mainWidth = document.querySelector('.app-main').clientWidth;
        });
    },
    computed: {
        categorieList() {
            return this.$store.getters.categorieList;
        },
        tagsList() {
            return this.$store.getters.tagsList;
        }
    },
    created() {
        this.loadData();
        this.loadUsers();
    },
    methods: {
        publisherSearch(queryString, cb) {
            var searchPublisherArr = this.searchPublisherArr;
            var results = queryString ? searchPublisherArr.filter(this.createFilter(queryString)) : searchPublisherArr;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        searchData2() {
            this.page2 = 1;
            this.loadTagVideoData();
        },
        async loadTagVideoData() {
            this.pageData2.splice(0);
            var obj = { type: "video", pid: this.pid, page: this.page2, count: this.count2, tags: this.currentTag._id, ...this.searchT };
            console.log(obj);
            let res = await this.$http(getManyVideos, obj);
            if (res && res.code === 200) {
                this.pageData2 = res.msg.pageData;
                this.totalCount2 = res.msg.totalCount;
                this.pageData2 = deepClone(await setImgView(res.msg.pageData, "coverURL"));
            }
        },
        dragFinish(e) {
            // this.submitIndex();
        },
        async delVideo(row) {
            var tags = row.tags;
            for (let i = 0; i < tags.length; i++) {
                if (tags[i] == this.currentTag._id) {
                    tags.splice(i, 1);
                    break;
                }
            }
            let query = {
                pids: row.pids,
                id: row._id,
                name: row.name,
                categorie: row.categorie.map(i => i.id),
                tags: tags,
                payType: row.payType,
                timeType: row.timeType,
                state: row.state,
                summary: row.summary,
                coverURLView: row.coverURLView,
                coverURL: row.coverURL,
                publisherId: row.publisherId,
                from: row.from,
                price: row.price,
                location: row.location
            };
            let res = await this.$http(updateVideos, query);
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadTagVideoData();
            }
        },
        addVideos() {
            if (!this.currentTag) {
                this.$message.error("请先选择标签");
                return;
            }
            this.loadVideoData();
            this.dialogVideoVisible = true;
            this.tempSelectedVideos = [];
            this.selectedVideos = [];
        },
        async loadVideoData() {
            let res = await this.$http(getManyVideos, { pid: this.pid, type: "video", page: this.page3, count: this.count3, ...this.getQuery(), ...this.sortT });
            if (res.code === 200) {
                this.pageData3 = res.msg.pageData;
                this.totalCount3 = res.msg.totalCount;
                this.pageData3 = deepClone(await setImgView(res.msg.pageData, "coverURL"));

            }
        },
        handleChange(val) { console.log(val, this.formObj.categorie); },
        handleHeaderClick(column, event) {
            this.sortT = {};
            switch (column.property) {
                case "createdDate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[4].value;
                    } else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[5].value;
                    }
                    this.loadVideoData();
                    break;
                case "optCreate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[12].value;
                    }
                    else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[13].value;
                    }
                    this.loadVideoData();
                    break;
            }
        },
        handleSelectionChange(val) {
            this.selectData = val;
            var page = this.page3;
            var item = { idx: page, list: val };
            var bool = false;
            for (let i = 0; i < this.tempSelectedVideos.length; i++) {
                if (item.idx == this.tempSelectedVideos[i].idx) {
                    this.tempSelectedVideos[i].list = val;
                    bool = true;
                }
            }
            if (!bool) {
                this.tempSelectedVideos.push(item);
            }

            this.setSelectedData();
        },
        setSelectedData(item) {
            this.selectedVideos.splice(0);
            var list = this.tempSelectedVideos;
            for (let i = 0; i < list.length; i++) {
                for (let j = 0; j < list[i].list.length; j++) {
                    this.selectedVideos.push(list[i].list[j]);
                }
            }
        },
        handleCurrentChange2(val) {
            this.page2 = val;
            this.loadTagVideoData();
        },
        handleCurrentChange3(val) {
            this.page3 = val;
            this.loadVideoData();
        },
        //每页显示数据量变更
        handleSizeChange2(val) {
            this.count2 = val;
            this.loadTagVideoData();
        },
        handleSizeChange3(val) {
            this.count3 = val;
            this.loadVideoData();
        },
        searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getManyTags, { pid: this.pid }, true);
            if (res.code === 200) {
                res.msg.pageData.sort(function (a, b) {
                    return a.index - b.index;
                });
                this.currentTag = {};
                this.pageData2 = [];
                this.pageData = res.msg.pageData;
                if (this.pageData.length > 0) {
                    this.currentTag = this.pageData[0];
                    setTimeout(() => {
                        this.loadTagVideoData();
                    }, 500);
                }
            }
        },
        async handleClose(row) {
            await this.$confirm(`即将删除标签： ${row.name}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteTags, { id: row._id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
                this.$store.dispatch("baseData/setTags");
                if (row._id == this.currentTag._id) {
                    this.loadTagVideoData();
                }
            }
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        async handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                let res = await this.$http(insertTags, { items: [{ name: inputValue }] });
                if (res.code === 200) {
                    this.$message.success("添加成功");
                    this.loadData();
                    this.$store.dispatch("baseData/setTags");
                }
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(updateTags, query);
            if (res.code === 200) {
                this.$message.success("编辑成功");
                this.dialogUpdate = false;
                this.loadData();
                this.$store.dispatch("baseData/setTags");
            }
        },
        async submitMany() {
            let tags = this.tags.split("\n");
            let items = tags.map(i => {
                let arr = i.split(/[\s+,，；;]/g);
                let obj = { name: arr[0] };
                if (arr.length > 1) {
                    obj.summary = arr[1];
                }
                return obj;
            });
            let res = await this.$http(insertTags, { items: items });
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.loadData();
                this.$store.dispatch("baseData/setTags");
            }
        },
        editLine(row) {
            if (row._id == this.currentTag._id) {
                this.formObj = { id: row._id, name: row.name, summary: row.summary };
                this.dialogUpdate = true;
            }
            else {
                this.currentTag = row;
                this.searchT = {};
                this.loadTagVideoData();
            }
        },
        showAdd() {
            this.tags = "";
            this.dialogVisible = true;
        },
        async submitIndex() {

            this.$confirm("确定提交排序吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(sortManyTags, { items: this.pageData.map(i => i.name) });
                    if (res.code === 200) {
                        this.$message.success("操作成功");
                        this.loadData();
                        this.$store.dispatch("baseData/setTags");
                    }
                })
                .catch(() => {
                    this.$message.info("已取消操作");
                });
        },
        async editIndex(row, index) {
            let prompt = await this.$prompt("请输入排序位置", `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            this.sortData.splice(index, 1);
            this.sortData.splice(parseInt(prompt.value) - 1, 0, row);
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
                        this.$store.dispatch("baseData/setTags");
                    }
                }
            }
            return str ? str : cellValue;
        },
        publisherIdFormat(row, column, cellValue) {
            let item = this.searchPublisherArr.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        urlFormat(row, column, cellValue) {
            return cellValue ? `${getSession("src")[0] || ""}/${cellValue}` : cellValue;
        },
        async submitFormAddVideo() {
            let vidsArr = [];
            for (let i = 0; i < this.selectedVideos.length; i++) {
                vidsArr.push(this.selectedVideos[i]._id);
            }
            if (vidsArr.length < 1) {
                this.$message.error("视频ID不能为空");
                return;
            }
            let updateModel = {
                pid: this.pid,
                tags: [this.currentTag._id],
                ids: vidsArr,
            };
            let res = await this.$http(blukUpdateVideos, updateModel);
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.loadTagVideoData();
                this.dialogVideoVisible = false;
            }
        },

        async loadUsers() {
            let res = await this.$http(getPublisher, {});
            if (res.code === 200 && res.msg) {
                this.restaurants = res.msg.map(i => {
                    return { value: i.uid, label: i.username };
                });
                this.restaurants.unshift({ value: -1, label: '随机分配' });
                this.searchPublisherArr = res.msg.map(i => {
                    return { value: i.uid, label: i.username };
                });
                this.searchPublisherArr.unshift({ value: -1, label: '发布人缺失' });
            }
        },

        getQuery() {
            let query = { ...this.search };
            query.sizeMin = query.sizeMin ? query.sizeMin * 1024 * 1024 : undefined;
            query.sizeMax = query.sizeMax ? query.sizeMax * 1024 * 1024 : undefined;
            query.categorie = query.categorie ? query.categorie[query.categorie.length - 1] : undefined;
            let item = this.searchPublisherArr.find(i => i.label === query.publisherId);
            query.publisherId = item ? item.value : query.publisherId;
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

    }
}
</script>
<style lang="scss" scoped>
.el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.hint {
    line-height: 30px;
    color: #f00;
}
.toolbar2 {
    clear: both;
    margin-top: 20px;
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

.chosen {
    background: #4ab7bd;
}
</style>