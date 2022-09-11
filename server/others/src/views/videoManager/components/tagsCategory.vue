<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目">
                <el-select v-model="pid" placeholder="请选择项目">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="showAdd">添加分类</el-button>
            </el-form-item>
        </el-form>
        <div class="x-flex-container">
            <div style="width:20%;border:1px solid #ccc;overflow:auto;" :border="true" :style="{height: (mainHeight-190)+'px' }">
                <el-tree :load="loadTreeNode" style="width:100%;height:45%;border:0px solid #ccc;overflow:auto;" lazy ref="treeNode" :data="datatree" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :default-expanded-keys="[1]" @node-expand="nodeExpand" :expand-on-click-node="false" :highlight-current="true" node-key="id"></el-tree>
                <el-divider v-if="sortData.length>0" content-position="center">点击标签加载视频</el-divider>
                <el-divider v-if="sortData.length==0" content-position="center">没有关联的标签</el-divider>
                <div style="width:100%;height:45%;border:0px solid #ccc;overflow:auto;" :border="true">
                    <draggable :border="true" style="display: inline-block ;width:100%" v-model="sortData" chosenClass="chosen" :sort="true" group="sort">
                        <transition-group>
                            <template v-for="(item,index) in sortData">
                                <el-tag :key="index" closable :disable-transitions="false" @close="handleClose(item)" @click="editLine(item)">
                                    {{item.tagName}}({{item.videoCnt}})
                                </el-tag>
                            </template>
                        </transition-group>
                    </draggable>
                </div>
                <el-button type="primary" size="mini" style="width:100%;" @click="confirmSort">提交排序（拖动标签排序）</el-button>
            </div>
            <div style="width:80%;border:1px solid #ccc;" :style="{height: (mainHeight-190)+'px' }">
                <div style="margin: 5px;">
                    <el-input style="width:200px" v-model="searchT.id" placeholder="请输入搜索id"></el-input>
                    <el-button style="margin: 5px" type="primary" @click="searchData2">查询/刷新</el-button>
                    <el-button style="margin: 5px;font-weight:bold;" type="primary" @click="addVideos">添加视频</el-button>
                    <span v-if="currentTag" style="margin: 5px;font-weight:bold;">当前标签 :{{currentTag.tagName}}</span>
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
                            <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button>
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
                <el-button @click="dialogUpdate = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="800px">
            <el-form label-width="120px">
                <el-form-item label="项目">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input type="number" v-model="formObj.sequence" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="分类是否开启">
                    <el-switch v-model="formObj.active"></el-switch>
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
            <div v-if="currentTag">当前标签 : {{currentTag.tagName}}</div>
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
        <el-dialog title="全部标签" :visible.sync="dialogTagListVisible" width="90%" top="30px">
            <el-form label-width="100px" style="margin-left:-15px" :inline="true">
                <el-form-item label="当前分类：">
                    <span style="margin: 5px;font-weight:bold;">{{curParentTag.label}}</span>
                </el-form-item>
                <el-form-item label="筛选标签：">
                    <el-input style="width:200px" v-model="filterStr" @input="inputing" placeholder="请输入标签"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <span style="margin: 5px;font-weight:bold;">已选标签：</span>
            </div>
            <div style="width:100%;height:100px;border:1px solid #ccc;overflow:auto;margin:0px;padding:2px" :border="true">
                <el-tag v-for="(tag, idx) in innerTags" v-bind="$attrs" :key="tag" :size="size" :closable="!readOnly" :disable-transitions="false" @close="remove(idx)">
                    {{tag}}
                </el-tag>
            </div>
            <br />
            <div style="height:600px;width:100%;overflow:auto;border:1px solid #ccc;margin:0px;padding:2px">
                <el-checkbox-group v-model="mtagsgroup" @change="handleCheckedCitiesChange1">
                    <el-checkbox class="checkbox" v-for="(item,index) in mtags" :label="item.name" :key="index">
                        {{item.label}}</el-checkbox>
                </el-checkbox-group>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTagListVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitTagsForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加二级分类" :visible.sync="dialogTwoVisible" width="600px" top="30px">
            <el-form label-width="120px">
                <el-form-item label="上级分类" v-if="parentData.name">
                    <span>{{ parentData.name }}</span>
                </el-form-item>
                <el-form-item label="项目" v-if="!parentData.name">
                    <el-select v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="封面图(点图上传)" label-width="150px" v-if="parentData.name">
                    <ImgUpload :imageUrl="formObj.coverUrlView" :path="UploadPath.CategorieImg" @success="uploaded" />
                </el-form-item>
                <el-form-item label="分类说明" v-if="parentData.name">
                    <el-input v-model="formObj.instruction" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input type="number" v-model="formObj.sequence" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="图片模式" v-if="parentData.name">
                    <el-select v-model="formObj.props.showMode">
                        <el-option label="横图模式" value="horizontal">
                        </el-option>
                        <el-option label="竖图模式" value="vertical">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片位置" v-if="parentData.name">
                    <el-select v-model="formObj.props.imageLocation">
                        <el-option v-for="item in categoryImgLocation" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首个是否大图" v-if="parentData.name">
                    <el-switch v-model="formObj.props.firstLarge"></el-switch>
                </el-form-item>
                <el-form-item label="是否随机" v-if="parentData.name">
                    <el-switch v-model="formObj.enableRandom"></el-switch>
                </el-form-item>
                <el-form-item label="分类是否开启">
                    <el-switch v-model="formObj.active"></el-switch>
                </el-form-item>
                <el-form-item label="行" v-if="parentData.name">
                    <el-input type="number" v-model="formObj.props.row" placeholder="请输入" @mousewheel.native.prevent @keyup.native="prevent($event)"></el-input>
                    <span>行为1表示横向滚动,如果列设置,返回（行 * 列）条数据,如果没有设置,最少5条数据</span>
                </el-form-item>
                <el-form-item label="列" v-if="parentData.name">
                    <el-input type="number" v-model="formObj.props.colunm" placeholder="请输入" @mousewheel.native.prevent @keyup.native="prevent($event)"></el-input>
                    <span>列为1表示为单列大图模式,如果行设置,返回（行 * 列）条数据,如果没有设置,则最少5条数据</span>
                </el-form-item>
                <el-form-item label="行高" v-if="parentData.name">
                    <el-input type="number" v-model="formObj.props.rowHeight" placeholder="请输入" @mousewheel.native.prevent @keyup.native="prevent($event)"></el-input>
                    <span>
                        可为空，不设置横版行高默认为117，竖版杭高默认为180
                    </span>
                </el-form-item>
                <el-form-item label="列宽" v-if="parentData.name">
                    <el-input type="number" v-model="formObj.props.colunmWidth" placeholder="请输入" @mousewheel.native.prevent @keyup.native="prevent($event)"></el-input>
                    <span>可为空，不设置横版行高默认为180，竖版杭高默认为110</span>
                </el-form-item>
                <el-form-item label="更多和换一换按钮是否开启" v-if="parentData.name">
                    <el-switch v-model="formObj.props.showBtns"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTwoVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitMany">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="标签排序" :visible.sync="dialogSortVisible" width="600px">
            <el-form label-width="80px">
                <span style="margin: 5px;font-weight:bold;">拖动标签排序</span>
            </el-form>
            <draggable :border="true" style="display: inline-block ;margin:15px 5px ;border:1px solid #ddd;width:100%" v-model="sortData" chosenClass="chosen" :sort="true" group="sort">
                <transition-group>
                    <template v-for="(item,index) in sortData">
                        <el-tag :key="index" :disable-transitions="false">
                            {{item.tagName}}({{item.videoCnt}})
                        </el-tag>
                    </template>
                </transition-group>
            </draggable>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSortVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmSort">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="视频播放" :visible.sync="dialogVideo" width="790px" @close="closePlayer(true)">
            <Video :url="videoUrl" />
        </el-dialog>
    </el-card>
</template>
<script>
import { getManyFirst, getManyTags, deleteCategories, getManySub, insertCategories, addCategoryTag, getCategoryTags, insertTags, updateTags, getManyVideos, updateVideos, getPublisher, blukUpdateVideos, delCategoryTag, sortCategoryTag } from '@/api/videoManager';
import draggable from 'vuedraggable';
import { deepClone, getCategories, getWholeCategorieLabelArr, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { payTypeList, sortList, timeTypeList, pidList, UploadPath, videoStateList, CategoryType, categoryImgLocation } from '@/utils/baseConst';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import video from './video';
export default {
    components: {
        draggable,
        Video: video,
        ImgUpload: imgUpload
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        addTagOnKeys: {
            type: Array,
            default: () => [13, 188, 9]
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        size: String,
    },
    data() {
        return {
            filterStr: "",
            innerTags: [],
            activeNames: [],
            collapseArr: {},
            pid: "A",
            pidList: pidList,
            searchPublisherArr: [],
            restaurants: [],
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            dateArr4: [],
            tempSubData: {},
            dialogVideoVisible: false,
            dialogVideo: false,
            videoUrl: "",
            search: {},
            UploadPath: UploadPath,
            sortList: sortList,
            payTypeList: payTypeList,
            categoryImgLocation: categoryImgLocation,
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
            currentTag: null,
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
            mtags: [],
            sortT: {},
            searchT: {},
            formObj: {},
            isInit: false,
            isEditClick: false,
            isDelete: false,
            dialogTagListVisible: false,
            mtagsgroup: [],
            mtags: [],
            origintags: [],
            innerTags: [...this.value],
            curParentTag: {},
            defaultProps: {
                children: 'children',
                name: 'label',
                isLeaf: 'leaf'
            },
            datatree: [],
            tempParentData: {},
            parentData: {},
            dialogTwoVisible: false,
            idIndex: 0,
            sortData: [],
            dialogSortVisible: false,
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
    async created() {
        await this.loadData();
        await this.loadAllTags();
        await this.loadUsers();
    },
    methods: {
        closePlayer() {
            this.videoUrl = '';
        },
        play(url) {
            this.videoUrl = `${getSession("src")[0] || ""}/${url}`;
            this.dialogVideo = true;
        },
        uploaded(path) {
            this.formObj.coverUrl = path;
        },
        addkids(data) {
            this.isEditClick = true;
            if (data.isParent) {
                this.tempParentData = data.data;
                this.showAddSub();
            }
            else if (data.isChild) {
                this.$message.warning('当前分类不能添加子类');
            }
        },
        showAddSub() {
            this.parentData = this.tempParentData;
            this.formObj = {
                pid: this.pid,
                parentId: this.parentData ? this.parentData._id : undefined,
                active: true,
                enableRandom: true,
                props: { showMode: "horizontal", imageLocation: "left", firstLarge: true, row: 1, colunm: 1, showBtns: true }
            };
            this.dialogTwoVisible = true;
        },
        nodeExpand(data, node, self) {
            this.tempParentData = data.data;
            this.sortData = data.kids ? data.kids.map(i => i.data) : [];
        },
        renderContent(h, { node, data, store }) {
            if (data.isTag) {
                return (
                    <div class="custom-tree-node">
                        <span class="label">{node.label}</span>
                        <span class="action">
                            <el-button size="mini" icon="el-icon-edit" type="text" on-click={() => this.edit(node, data)}>编辑</el-button>
                            <el-button size="mini" icon="el-icon-delete" type="text" on-click={() => this.removeContent(node, data)}>删除</el-button>
                        </span>
                    </div>);
            }
            else if (data.isChild) {
                return (
                    <div class="custom-tree-node">
                        <span class="label">{node.label}</span>
                        <span class="action">
                            <el-button size="mini" icon="el-icon-document-add" type="text" on-click={() => this.addNewTagToList(data)}>添加标签</el-button>
                            <el-button size="mini" icon="el-icon-delete" type="text" on-click={() => this.removeContent(node, data)}>删除</el-button>
                        </span>
                    </div>);
            }
            else {
                return (
                    <div class="custom-tree-node">
                        <span class="label">{node.label}</span>
                        <span class="action">
                            <el-button size="mini" icon="el-icon-document-add" type="text" on-click={() => this.addkids(data)}>添加下级分类</el-button>
                            <el-button size="mini" icon="el-icon-delete" type="text" on-click={() => this.removeContent(node, data)}>删除</el-button>
                        </span>
                    </div>);
            }
        },
        edit(node, data) {
            this.isEditClick = true;
            if (data.isTag) {
                this.editLine(data.data);
            }
            else if (data.isChild) {
                this.formObj = { ...data.data };
                this.dialogTwoVisible = true;
            }
        },
        sortTags(node, data) {
            this.isEditClick = true;
            if (data.isChild) {
                this.sortData = data.kids ? data.kids.map(i => i.data) : [];
                if (this.sortData.length > 0) {
                    this.dialogSortVisible = true;
                } else {
                    this.$message.warning("分类下无标签");
                }
            }
        },
        removeContent(node, data) {
            this.isDelete = true;
            if (data.isTag) {
                this.handleClose(data);
            }
            this.delLine(data.data);
        },

        handleNodeClick(data) {
            if (this.isEditClick) {
                this.isEditClick = false;
                return;
            }
            if (this.isDelete) {
                this.isDelete = false;
                return;
            }

            if (data.isChild) {
                this.sortData = data.kids ? data.kids.map(i => i.data) : [];
            }
            //  else {
            //     this.tempParentData = data.data;
            // }
            if (data.isTag) {
                this.currentTag = data.data;
                this.loadTagVideoData();
            }
        },

        async loadSubTags(resolve, pData) {
        },
        async loadTreeNode(node, resolve) {
            if (!node.data.kids) {
                node.data.kids = [];
            }
            var pData = node.data.data;
            if (node.data.isChild) {
                this.curParentTag = pData;
                let res = await this.$http(getCategoryTags, { categoryId: pData._id, }, true);
                if (res.code === 200) {
                    let data = res.msg;
                    var obj = [];
                    for (let i = 0; i < data.length; i++) {
                        this.idIndex++;
                        let sun = {
                            id: this.idIndex,
                            isTag: true,
                            data: data[i],
                            leaf: true,
                            label: data[i].tagName + ` (${data[i].videoCnt})`,
                            parentData: pData
                        };
                        obj.push(sun);
                        if (i == 0 && !this.currentTag) {
                            this.currentTag = data[i];
                            await this.loadTagVideoData();
                        }
                    }
                    node.data.kids = obj;
                    this.sortData = res.msg;
                    resolve(obj.length > 0 ? [obj[0]] : obj);
                    // resolve(obj);
                    return;
                }
            }
            if (!pData) { return; }
            let tempCount = 0;
            var obj = [];
            var index = 0;
            let res = await this.$http(getManySub, { pid: this.pid, page: 1, count: 10000, parentId: pData._id }, true);
            if (res && res.code === 200) {
                let data = deepClone(await setImgView(res.msg.pageData, "coverUrl"));
                for (let i = 0; i < data.length; i++) {
                    this.idIndex++;
                    let sun = {
                        id: this.idIndex++,
                        isChild: true,
                        data: data[i],
                        leaf: false,
                        label: data[i].name,
                        parentData: pData
                    };
                    obj.push(sun);
                    node.data.kids = obj;
                }
                if (index == tempCount) {
                    if (data.length > 0) {
                        this.subId = data[0]._id;
                        this.page2 = 1;
                        var sd = { data: data[0], parentData: pData };
                        this.tempSubData = sd;
                    }
                    else {
                        tempCount++;
                    }
                }
            }
            resolve(obj);
        },
        async submitTagsForm() {
            var tags = this.mtagsgroup;
            let ids = [];
            for (let i = 0; i < tags.length; i++) {
                let item = this.getItemTag(tags[i]);
                ids.push(item._id);
            }
            let res = await this.$http(addCategoryTag, { categoryId: this.curParentTag.data._id, tagId: ids, index: 0 });
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.loadData();
                this.dialogTagListVisible = false;
            }
        },
        inputing(e) {
            let value = this.filterStr;
            if (value.length > 0) {
                let tags = [];
                for (let i = 0; i < this.origintags.length; i++) {
                    if (this.origintags[i].name.includes(value)) {
                        tags.push(this.origintags[i]);
                    }
                }
                this.mtags = tags;
            }
            else {
                this.mtags = this.origintags;
            }
        },
        handleCheckedCitiesChange1(value) {
            this.innerTags.splice(0);
            for (let i = 0; i < value.length; i++) {
                let item = this.getItemTag(value[i]);
                if (item) {
                    this.innerTags.push(item.name);
                }
            }
        },
        remove(index) {
            let item = this.getItemTagByLabel(this.innerTags[index]);
            this.removeTagByValue(item.name);
            this.innerTags.splice(index, 1);
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
        getItemTagByLabel(label) {
            var list = this.mtags;
            for (let i = 0; i < list.length; i++) {
                if (list[i].name == label) {
                    return list[i];
                }
            }
            return {};
        },
        getItemTag(value) {
            var list = this.mtags;
            for (let i = 0; i < list.length; i++) {
                if (list[i].name == value) {
                    return list[i];
                }
            }
            return null;
        },
        handleChangeCollapse(val, a, b) {
            this.loadSubTags();
        },
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
        async loadTagVideoData(data) {
            return new Promise(async resolve => {
                this.pageData2.splice(0);
                var obj = { pid: this.pid, type: "video", page: this.page2, count: this.count2, tags: this.currentTag.tagId, ...this.searchT };
                let res = await this.$http(getManyVideos, obj);
                if (res && res.code === 200) {
                    this.pageData2 = res.msg.pageData;
                    this.totalCount2 = res.msg.totalCount;
                    this.pageData2 = deepClone(await setImgView(res.msg.pageData, "coverURL"));
                }
                resolve("");
            });
        },
        async delVideo(row) {
            var tags = row.tags;
            for (let i = 0; i < tags.length; i++) {
                if (tags[i] == this.currentTag.tagId) {
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
            let res = await this.$http(getManyVideos, { type: "video", page: this.page3, count: this.count3, ...this.getQuery(), ...this.sortT });
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
        async loadAllTags() {
            return new Promise(async resolve => {
                let res = await this.$http(getManyTags, {}, true);
                if (res.code === 200) {
                    res.msg.pageData.sort(function (a, b) {
                        return a.index - b.index;
                    });
                    this.mtags = res.msg.pageData;
                    this.origintags = res.msg.pageData;
                }
                resolve("");
            });
        },
        async loadData() {
            this.activeNames.splice(0);
            this.pageData.splice(0);
            this.datatree = [];
            this.sortData = [];
            this.collapseArr = {};

            let res = await this.$http(getManyFirst, { pid: this.pid, type: "tag", page: 1, count: 100000 }, true);
            if (res.code === 200) {
                res.msg.pageData.sort(function (a, b) {
                    return a.index - b.index;
                });

                if (res.msg.pageData.length < 1) return;
                /*** */
                for (let i = 0; i < res.msg.totalCount; i++) {
                    this.idIndex++;
                    let item = res.msg.pageData[i];
                    var obj = {
                        id: this.idIndex,
                        isParent: true,
                        data: item,
                        label: item.name,
                        children: []
                    };
                    this.datatree.push(obj);
                }
            }
        },

        async handleClose(data) {
            let row = data;
            await this.$confirm(`即将删除标签： ${row.tagName}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(delCategoryTag, { ids: [row.id] });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
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
            let query = { ...this.formObj };
            let res = await this.$http(insertCategories, { type: "tag", ...query });
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.dialogTwoVisible = false;
                this.loadData();
            }
        },
        editLine(row) {
            if (row.id == this.currentTag.id) {
                this.formObj = { id: row.tagId, name: row.tagName, summary: row.summary };
                this.dialogUpdate = true;
            } else {
                this.currentTag = row;
                this.loadTagVideoData(row);
            }
        },
        showAdd() {
            this.tags = "";
            this.dialogVisible = true;
        },
        addNewTagToList(parentTag) {
            this.curParentTag = parentTag;
            this.mtagsgroup.splice(0);
            this.innerTags.splice(0);
            this.dialogTagListVisible = true;
        },
        async submitIndex(parentTag) {
            this.curParentTag = parentTag;
            this.$confirm("确定提交排序吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(sortCategoryTag, {
                        categoryId: this.curParentTag._id,
                        tagIds: this.collapseArr[this.curParentTag._id].map(i => i.id),
                    });
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
        async confirmSort(row, index) {
            if (this.sortData.length < 1) {
                this.$message.warning("没有关联的标签");
                return;
            }
            this.$confirm("确定提交排序吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(sortCategoryTag, {
                        categoryId: this.curParentTag._id,
                        tagIds: this.sortData.map(i => i.id),
                    });
                    if (res.code === 200) {
                        this.$message.success("操作成功");
                        this.loadData();
                        this.dialogSortVisible = false;
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
        async delLine(row) {
            await this.$confirm(`即将删除分类： ${row.name}，是否确定？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            let res = await this.$http(deleteCategories, { id: row._id });
            if (res.code === 200) {
                this.$message.success("删除成功");
                this.loadData();
            }
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
                tags: [this.currentTag.tagId],
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
            if (res && res.code === 200 && res.msg) {
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
<style lang="scss" >
.custom-tree-node {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    width: 90%;
    .label {
        flex: 1;
        line-height: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .action {
        text-align: right;
        padding-right: 10px;
    }
}
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
    width: 10px;
}

.tag-idiv {
    border: 1px;
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
.chosen {
    background: #4ab7bd;
}
.el-tree-node .el-tree-node .el-tree-node {
    display: none;
}
</style>