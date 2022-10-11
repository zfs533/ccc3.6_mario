<template>
    <div class="box-card" :style="{height: mainHeight+'px' }">
        <div class="flex-container">
            <div class="top">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="primary" @click="searchData">查询</el-button>
                        <el-button type="primary" @click="showAdd">添加分类</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="content" style="display:flex;  justify-content:space-between;">
                <div class="x-flex-container">
                    <div class="left" :border="true" style="border:1px solid #ccc; min-width: 260px;overflow:auto;">
                        <el-tree :load="loadTreeNode" lazy ref="treeNode" :style="{height: (mainHeight - 100) + 'px'}" :data="datatree" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :default-expanded-keys="[1]" @node-expand="nodeExpand" :expand-on-click-node="false" :highlight-current="true" node-key="id"></el-tree>
                    </div>
                    <div :border="true" class="content" style="padding-left: 2px;">
                        <div class="flex-container">
                            <div class="top">
                                <el-input style="width:200px" v-model="sortT.vid" placeholder="请输入搜索id"></el-input>
                                <el-button style="margin: 5px" type="primary" @click="searchData2">查询</el-button>
                                <el-button style="margin: 5px" type="primary" @click="showAddVideo">添加视频</el-button>
                                <el-button v-if="currentCategoryType == 'feed'" style="margin: 5px" type="primary" @click="showAddAtlas">添加图集</el-button>
                                <div style="margin: 5px" v-if="tempSubData.data && currentCategoryType != 'feed'">当前分类 : {{tempSubData.parentData.name +">"+tempSubData.data.name}}， 视频总数 : {{totalCount2}}， 推送视频总数 : {{totalPublish}}</div>
                                <div style="margin: 5px" v-if="tempSubData.data && currentCategoryType == 'feed'">当前分类 : {{tempSubData.parentData.name +">"+tempSubData.data.name}}， 视频/图集总数 : {{totalCount2}}， 推送视频总数 : {{totalPublish}}</div>
                            </div>
                            <div class="content">
                                <el-table @header-click="handleHeaderClick" @selection-change="handleSelectionChange2" :style="{width: (mainWidth - 290)+ 'px' }" :data="pageData2" :border="true" max-height="100%" :height="mainHeight - 190">
                                    <!-- <el-table-column type="selection" width="55" fixed="left"></el-table-column> -->
                                    <el-table-column v-if="currentCategoryType != 'feed'" prop="contentId" fixed="left" label="视频id" align="center" min-width="200"></el-table-column>
                                    <el-table-column v-if="currentCategoryType == 'feed'" prop="contentId" fixed="left" label="图集/视频id" align="center" min-width="200"></el-table-column>
                                    <el-table-column prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                                    <el-table-column prop="index" v-if="currentCategoryType != 'feed'" label="推送序号" sortable="false" align="center" min-width="160"></el-table-column>
                                    <el-table-column v-if="currentCategoryType != 'feed'" prop="name" label="视频名称" align="center" min-width="160"></el-table-column>
                                    <el-table-column v-if="currentCategoryType == 'feed'" prop="freeImgCnt" label="免费展示图片数量" align="center"></el-table-column>
                                    <el-table-column prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column>
                                    <el-table-column v-if="currentCategoryType == 'feed'" prop="name" label="图集/视频名称" align="center" min-width="160"></el-table-column>
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
                                    <el-table-column v-if="currentCategoryType == 'feed'" prop="imageUrls" label="图集" align="center" min-width="150">
                                        <template slot-scope="scope" v-if="scope.row.imageUrlsView">
                                            <div style="width: 100%; height: 220px;overflow:auto;">
                                                <div v-for="itemimg in scope.row.imageUrlsView" :key="itemimg.id">
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
                                    <el-table-column prop="publisherId" label="发布人" align="center" min-width="200"></el-table-column>
                                    <el-table-column v-if="currentCategoryType != 'feed'" prop="playURL" label="播放地址" align="center" min-width="300" :formatter="urlFormat"></el-table-column>
                                    <el-table-column prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                                    <el-table-column v-if="currentCategoryType != 'feed'" fixed="right" label="操作" width="200" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="play(scope.row.playURL)">播放</el-button>
                                            <el-button v-if="scope.row.index" type="text" @click="editSort(scope.row)">排序</el-button>
                                            <el-button v-if="scope.row.index" type="text" @click="delVideo(scope.row.contentId)">移出推送</el-button>
                                            <el-button v-if="!scope.row.index " type="text" @click="editSort(scope.row)">推送</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-col class="toolbar2">
                                    <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :current-page="page2" :page-sizes="[10, 20, 30, 50]" :page-size="count2" :total="totalCount2"></el-pagination>
                                </el-col>
                            </div>
                        </div>
                    </div>
                    <div class="right"></div>
                </div>
            </div>

        </div>
        <!-- <div>-------------------------------------------------------------------------------------</div> -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" @close="closeDialog">
            <el-form label-width="120px">
                <el-form-item label="上级分类" v-if="parentData.name">
                    <span>{{ parentData.name }}</span>
                </el-form-item>
                <el-form-item label="项目" v-if="!parentData.name && !isUpdate">
                    <el-select disabled="true" v-model="formObj.pid" placeholder="请选择项目">
                        <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="formObj.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="封面图(点图上传)" label-width="150px" v-if="parentData.name">
                    <ImgUpload :imageUrl="formObj.coverUrlView" :path="UploadPath.CategorieImg" @success="uploaded" v-if="dialogVisible" />
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
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="视频播放" :visible.sync="dialogVideo" width="790px" @close="closePlayer(true)">
            <Video :url="videoUrl" />
        </el-dialog>
        <el-dialog title="排序" :visible.sync="dialogEditVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="推送序号">
                    <el-input v-model="stIndex" placeholder="请输入排序序号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditSort">确 定</el-button>
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
            <div v-if="tempSubData.data">当前分类 : {{tempSubData.parentData.name +">"+tempSubData.data.name}}></div>
            <div class="x-flex-container" style="display:flex;  justify-content:space-between;" v-if="tempSubData.data">
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
                        <el-table-column fixed="right" label="操作" width="150" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" style="margin:0 10px 0 0" @click="play(scope.row.playURL)">播放</el-button>
                            </template>
                        </el-table-column>
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
                <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange3" @size-change="handleSizeChange3" :current-page="page3" :page-sizes="[10,20,30,50,100,200,500]" :page-size="count2" :total="totalCount3"></el-pagination>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVideoVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormAddVideo">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="图集列表" top="30px" left :visible.sync="dialogAtlasVisible" width="90%">
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
                <el-form-item label="发布人">
                    <el-autocomplete class="inline-input" v-model="search.publisherId" value-key="label" :fetch-suggestions="publisherSearch" placeholder="请输入内容"></el-autocomplete>
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
                    <el-button type="primary" @click="loadAtlasData">查询</el-button>
                </el-form-item>
            </el-form>

            <div v-if="tempSubData.data">当前分类 : {{tempSubData.parentData.name +">"+tempSubData.data.name}}></div>
            <div class="x-flex-container" style="display:flex;  justify-content:space-between;" v-if="tempSubData.data">
                <div style="width:84.8%;!important">

                    <el-table :data="pageData4" :border="true" min-width="100%" ref="table" @header-click="handleHeaderClick2" @selection-change="handleSelectionChange" max-height="550px">
                        <el-table-column type="selection" width="55" fixed="left">
                        </el-table-column>
                        <el-table-column prop="_id" label="图集id" align="center" min-width="220" fixed="left"></el-table-column>

                        <el-table-column prop="createdDate" sortable="false" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="optCreate" sortable="false" label="审核时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                        <el-table-column prop="name" label="图集名称" align="center" min-width="160"></el-table-column>
                        <el-table-column prop="summary" label="简介" align="center" min-width="200"></el-table-column>
                        <el-table-column prop="imageUrls" label="图集" align="center" min-width="150">
                            <template slot-scope="scope" v-if="scope.row.imageUrlsView">
                                <div style="width: 100%; height: 220px;overflow:auto;">
                                    <div v-for="itemimg in scope.row.imageUrlsView" :key="itemimg.id">
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

                        <el-table-column prop="state" label="状态" align="center" :formatter="stateFormat">
                        </el-table-column>
                        <el-table-column prop="publisherId" label="发布人" align="center">
                        </el-table-column>
                        <el-table-column prop="uploadId" label="上传人" align="center">
                        </el-table-column>
                        <el-table-column prop="price" label="价格" align="center">
                        </el-table-column>
                        <el-table-column prop="payType" label="付费类型" align="center" :formatter="payTypeFormat"></el-table-column>
                        <el-table-column prop="collectedCnt" label="收藏数量" align="center"></el-table-column>
                        <el-table-column prop="likedCnt" label="点赞次数" align="center">
                        </el-table-column>
                        <el-table-column prop="hot" label="热度" align="center"></el-table-column>
                        <el-table-column prop="commentCnt" label="评论数" align="center">
                        </el-table-column>
                        <el-table-column prop="opt" label="审核人" align="center"></el-table-column>

                        <el-table-column show-overflow-tooltip prop="categorie" label="分类" align="center" :formatter="categorieFormat" min-width="200"></el-table-column>
                        <el-table-column prop="pullCategorie" label="推送分类" align="center" :formatter="arrFormat" min-width="200"></el-table-column>
                        <el-table-column prop="from" label="图集来源" align="center"></el-table-column>
                        <el-table-column prop="index" label="排序索引" align="center" min-width="100"></el-table-column>
                    </el-table>
                </div>
                <div style="width:15%;!important;overflow:auto;height:550px;border: 1px solid #dcdfe6">
                    已选择图集：
                    <template v-for="(item,index) in selectedVideos">
                        <el-tag :key="index" closable :disable-transitions="false" @close="handleClose(item)">
                            {{item.name.substr(0,5)}}
                        </el-tag>
                    </template>
                </div>
            </div>
            <el-col class="toolbar2">
                <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange4" @size-change="handleSizeChange4" :current-page="page4" :page-sizes="[10,20,30,50,100,200,500]" :page-size="count4" :total="totalCount4"></el-pagination>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAtlasVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormAddAtlas">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { blukUpdateVideos, deleteCategories, getAllSort, getManyFirst, getManySub, getManyVideos, getPublisher, insertCategories, updateCategories, updateOneSort, updateSortSort } from '@/api/videoManager';
import imgUpload from '@/components/imgUpload.vue';
import { getSession } from '@/utils/auth';
import { categoryImgLocation, CategoryType, payTypeList, pidList, sortList, timeTypeList, UploadPath, videoStateList } from '@/utils/baseConst';
import { deepClone, getCategories, getWholeCategorieLabelArr, secToString, setImgView, sizeFormat } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
import video from './components/video';
export default {
    components: {
        ImgUpload: imgUpload,
        Video: video
    },
    data() {
        return {
            mainWidth: 0,
            mainHeight: 0,
            subId: "",
            pid: "A",
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            page2: 1,
            count2: 10,
            totalCount2: 0,
            page3: 1,
            count3: 10,
            totalCount3: 0,
            page4: 1,
            count4: 10,
            totalCount4: 0,
            pageData2: [],
            pageData3: [],
            pageData4: [],
            UploadPath,
            formObj: { props: { showMode: "horizontal", firstLarge: true } },
            dialogVisible: false,
            dialogVisible2: false,
            dialogTitle: "添加分类",
            isUpdate: false,
            parentData: {},
            CategoryType: CategoryType,
            currentCategoryType: "basic",
            pidList: pidList,
            categoryImgLocation: categoryImgLocation,
            datatree: [],
            defaultProps: {
                children: 'children',
                name: 'label',
                isLeaf: 'leaf'
            },
            isEditClick: false,
            tempParentData: {},
            tempSubData: {},
            sortT: {},
            selectVids: [],
            selectData: [],
            vidsArr: [],
            selectData2: [],
            videoUrl: "",
            dialogVideo: false,
            dialogEditVisible: false,
            dialogVideoVisible: false,
            dialogAtlasVisible: false,
            totalPublish: 0,
            search: {},
            stIndex: 0,
            payTypeList: payTypeList,
            stateList: videoStateList,
            searchPublisherArr: [],
            restaurants: [],
            timeTypeList: timeTypeList,
            dateArr1: [],
            dateArr2: [],
            dateArr3: [],
            dateArr4: [],
            sortList: sortList,
            tempSelectedVideos: [],
            selectedVideos: [],
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
    created() {
        if (this.$route.name.includes("VIP")) {
            this.currentCategoryType = "vip";
        }
        else if (this.$route.name.includes("Collection")) {
            this.currentCategoryType = "topic";
        }
        else if (this.$route.name.includes("Feed")) {
            this.currentCategoryType = "feed";
        }
        else if (this.$route.name.includes("Av")) {
            this.currentCategoryType = "av";
        } else {
            this.currentCategoryType = "basic";
        }
        this.loadData();
    },
    mounted() {
        this.$nextTick(() => {
            this.mainHeight = document.querySelector('.app-main').clientHeight - 20;
            this.mainWidth = document.querySelector('.app-main').clientWidth;
        });

        window.onresize = () => {
            return (() => {
                this.mainHeight = document.querySelector('.app-main').clientHeight - 20;
                this.mainWidth = document.querySelector('.app-main').clientWidth;
            })();
        };
    },
    methods: {
        handleChange(val) { console.log(val, this.formObj.categorie); },
        publisherSearch(queryString, cb) {
            var searchPublisherArr = this.searchPublisherArr;
            var results = queryString ? searchPublisherArr.filter(this.createFilter(queryString)) : searchPublisherArr;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        publisherIdFormat(row, column, cellValue) {
            let item = this.searchPublisherArr.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
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
        async submitFormAddAtlas() {
            this.vidsArr.splice(0);
            for (let i = 0; i < this.selectedVideos.length; i++) {
                this.vidsArr.push(this.selectedVideos[i]._id);
            }
            if (this.vidsArr.length < 1) {
                this.$message.error("图集ID不能为空");
            }
            this.addVideoToCategorie(this.vidsArr);
        },
        async submitFormAddVideo() {
            this.vidsArr.splice(0);
            for (let i = 0; i < this.selectedVideos.length; i++) {
                this.vidsArr.push(this.selectedVideos[i]._id);
            }
            if (this.vidsArr.length < 1) {
                this.$message.error("视频ID不能为空");
            }
            this.addVideoToCategorie(this.vidsArr);
        },
        async addVideoToCategorie(idArr) {
            let updateModel = { ids: idArr, pid: CURRENTPID };
            updateModel.categorie = [this.subId];
            let res = await this.$http(blukUpdateVideos, updateModel);
            if (res.code === 200) {
                this.$message.success("添加成功");
                this.loadKindsData();
                this.dialogVideoVisible = false;
                this.dialogAtlasVisible = false;
            }
        },

        async pushVideo(id, idx) {
            let res = await this.$http(updateOneSort, { vid: id, categorie: this.subId, index: idx });
            if (res.code === 200) {
                this.$message.success("推送成功");
                this.dialogVideoVisible = false;
                this.vidsArr = [];
                this.loadKindsData();
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
        handleClose(item) {
            for (let i = 0; i < this.selectedVideos.length; i++) {
                if (this.selectedVideos[i]._id == item._id) {
                    this.selectedVideos.splice(i, 1);
                    return;
                }
            }
        },
        async loadVideoData() {
            let res = await this.$http(getManyVideos, { pid: CURRENTPID, type: "video", page: this.page3, count: this.count3, ...this.getQuery(), ...this.sortT });
            if (res.code === 200) {
                this.pageData3 = res.msg.pageData;
                this.totalCount3 = res.msg.totalCount;
                this.pageData3 = deepClone(await setImgView(res.msg.pageData, "coverURL"));

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

        async loadAtlasData() {
            let res = await this.$http(getManyVideos, { pid: CURRENTPID, type: "atlas", page: this.page3, count: this.count3, ...this.sortT, ...this.getQuery() }, true);
            if (res.code === 200) {
                this.isCheckedTags = false;
                this.pageData4 = res.msg.pageData;
                this.totalCount4 = res.msg.totalCount;
                this.pageData4 = deepClone(await setImgView(res.msg.pageData, "imageUrls"));
            }
        },
        showAddVideo() {
            if (this.subId.length < 1) {
                this.$message.error("请先选择视频分类");
                return;
            }
            this.loadVideoData();
            this.dialogVideoVisible = true;
            this.tempSelectedVideos = [];
            this.selectedVideos = [];
        },
        showAddAtlas() {
            if (this.subId.length < 1) {
                this.$message.error("请先选择图集分类");
                return;
            }
            this.loadAtlasData();
            this.dialogAtlasVisible = true;
            this.tempSelectedVideos = [];
            this.selectedVideos = [];
        },
        async submitSort() {
            let query = {
                categorie: this.subId,
                videos: this.pageData2.map(i => i.contentId)
            };
            let res = await this.$http(updateSortSort, query);
            if (res.code === 200) {
                this.$message.success("排序编辑成功");
                this.loadKindsData();
            }
        },
        confirmEditSort() {
            this.dialogEditVisible = false;
            this.pushVideo(this.search.contentId, this.stIndex);
        },
        editSort(row) {
            this.stIndex = 0;
            this.dialogEditVisible = true;
            this.search = row;
        },
        async delVideo(id) {
            let res = await this.$http(updateOneSort, { vid: id, categorie: this.subId, index: 0 });
            if (res.code === 200) {
                this.$message.success("视频已从分类推送中移除");
                this.loadKindsData();
            }
        },
        closePlayer() {
            this.videoUrl = '';
        },
        play(url) {
            this.videoUrl = `${getSession("src")[0] || ""}/${url}`;
            this.dialogVideo = true;
            console.log(url, this.videoUrl);
        },
        handleSelectionChange2(val) {
            this.selectData2 = val;
        },
        arrFormat(row, column, cellValue) {
            return typeof cellValue == "object" ? cellValue.join('，') : cellValue;
        },
        payTypeFormat(row, column, cellValue) {
            let item = this.payTypeList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
        },
        stateFormat(row, column, cellValue) {
            let item = this.stateList.find(i => i.value === cellValue);
            return item ? item.label : cellValue;
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
        urlFormat(row, column, cellValue) {
            return cellValue ? `${getSession("src")[0] || ""}/${cellValue}` : cellValue;
        },
        getCategorieFormat(val) {
            return getCategorieLabel(val, this.categorieList);
        },
        sizeFormat(row, column, cellValue) {
            return sizeFormat(cellValue);
        },
        secondFormat(row, column, cellValue) {
            return cellValue ? secToString(cellValue) : cellValue;
        },
        categorieFormat(row, column, cellValue) {
            let v = getCategories(cellValue, this.categorieList);
            v = getWholeCategorieLabelArr(v, this.categorieList);
            return v;
        },
        nodeExpand(data, node, self) {
            this.tempParentData = data.data;
        },
        handleNodeClick(data) {
            if (this.isEditClick) {
                this.isEditClick = false;
                return;
            }

            if (data.isChild) {
                this.subId = data.data._id;
                this.tempParentData = data.parentData;
                this.tempSubData = data;
                this.loadKindsData();
            } else {
                this.tempParentData = data.data;
            }
        },
        async loadTreeNode(node, resolve) {
            var pData = node.data.data;
            if (!pData) { return; }
            let tempCount = 0;
            var obj = [];
            var index = 0;
            let res = await this.$http(getManySub, { pid: CURRENTPID, page: 1, count: 10000, parentId: pData._id }, true);
            if (res && res.code === 200) {
                let data = deepClone(await setImgView(res.msg.pageData, "coverUrl"));

                for (let i = 0; i < data.length; i++) {
                    let sun = {
                        id: 100 + i,
                        isChild: true,
                        data: data[i],
                        leaf: true,
                        label: this.handleString(data[i].name),
                        parentData: pData
                    };
                    obj.push(sun);
                }
                if (index == tempCount) {
                    if (data.length > 0) {
                        this.subId = data[0]._id;
                        this.page2 = 1;
                        var sd = { data: data[0], parentData: pData };
                        this.tempSubData = sd;
                        await this.loadKindsData();
                    }
                    else {
                        tempCount++;
                    }
                }
            }
            resolve(obj);
        },
        edit(data) {
            this.isEditClick = true;
            if (data.isParent) {
                this.parentData = {};
                this.editLine(data.data);
            } else if (data.isChild) {
                this.parentData = this.tempParentData;
                this.editLine(data.data);
            }
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

        remove(node, data) {
            this.isEditClick = true;
            if (data.isParent) {
                this.delLine(data.data);
            }
            else if (data.isChild) {
                this.delLineSub(data.data);
            }
        },
        renderContent(h, { node, data, store }) {
            if (data.isChild) {
                return (
                    <div class="custom-tree-node">
                        <span class="label">{node.label}</span>
                        <span class="action">
                            <el-button size="mini" type="text" on-click={() => this.edit(data)}>编辑</el-button>
                            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
                        </span>
                    </div>);
            }
            else {
                return (
                    <div class="custom-tree-node">
                        <span class="label">{node.label}</span>
                        <span class="action">
                            <el-button size="mini" type="text" on-click={() => this.edit(data)}>编辑</el-button>
                            <el-button size="mini" type="text" on-click={() => this.addkids(data)}>添加下级分类</el-button>
                            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
                        </span>
                    </div>);
            }
        },
        closeDialog: function () {
            this.dialogVisible = false;
            this.parentData = {};
        },
        searchData() {
            this.page = 1;
            this.loadData();
        },
        searchData2() {
            this.page2 = 1;
            console.log(this.sortT);
            this.loadKindsData();
        },
        async loadData() {
            let res = await this.$http(getManyFirst, { pid: CURRENTPID, page: this.page, count: 100000, type: this.currentCategoryType }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.datatree = [];
                for (let i = 0; i < this.totalCount; i++) {
                    let item = this.pageData[i];
                    var obj = {
                        id: i + 1,
                        isParent: true,
                        data: item,
                        label: this.handleString(item.name),
                        children: []
                    };
                    // await this.loadAllSub(item, obj, i);
                    this.datatree.push(obj);
                }
                this.tempParentData = this.pageData[0];
            }
            this.$refs.treeNode.setCurrentKey(1);
        },

        isChinese(str) {
            if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
                return 6;
            }
            else {
                return 10;
            }
        },

        handleString(str) {
            // let len = this.isChinese(str);
            // if (str.length > len) {
            //     return str.substr(0, len) + "...";
            // }
            return str;
        },
        async loadAllSub(item, obj, index) {
            let tempCount = 0;
            let res = await this.$http(getManySub, { pid: CURRENTPID, page: 1, count: 10000, parentId: item._id });
            if (res && res.code === 200) {
                let data = deepClone(await setImgView(res.msg.pageData, "coverUrl"));

                for (let i = 0; i < data.length; i++) {
                    let sun = {
                        id: 100 + i,
                        isChild: true,
                        data: data[i],
                        label: this.handleString(data[i].name),
                        parentData: item
                    };
                    obj.children.push(sun);
                }
                if (index == tempCount) {
                    if (data.length > 0) {
                        this.subId = data[0]._id;
                        this.page2 = 1;
                        var sd = { data: data[0], parentData: item };
                        this.tempSubData = sd;
                        await this.loadKindsData();
                    }
                    else {
                        tempCount++;
                    }
                }
            }
        },
        handleHeaderClick(column, event) {
            this.sortT = {};
            switch (column.property) {
                case "index":
                    if (column.order == "ascending") {
                        this.sortT.sort = 1;
                    } else if (column.order == "descending") {
                        this.sortT.sort = 2;
                    }
                    this.loadKindsData();
                    break;
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
        handleHeaderClick2(column, event) {
            this.sortT = {};
            switch (column.property) {
                case "createdDate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[4].value;
                    } else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[5].value;
                    }
                    this.loadAtlasData();
                    break;
                case "optCreate":
                    if (column.order == "ascending") {
                        this.sortT.sort = this.sortList[12].value;
                    }
                    else if (column.order == "descending") {
                        this.sortT.sort = this.sortList[13].value;
                    }
                    this.loadAtlasData();
                    break;
            }
        },
        async loadKindsData() {
            let query = { page: this.page2, count: this.count2, categorie: this.subId, ...this.sortT };
            query.categorie = query.categorie ? query.categorie : undefined;
            let res = await this.$http(getAllSort, query);
            if (res && res.code === 200) {
                this.totalCount2 = res.msg.totalCount;
                this.totalPublish = res.msg.pullCount;
                this.pageData2 = deepClone(await setImgView(res.msg.pageData, "coverURL"));
                this.pageData2 = deepClone(await setImgView(res.msg.pageData, "imageUrls"));
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
        handleCurrentChange2(val) {
            this.page2 = val;
            this.loadKindsData();
        },
        handleCurrentChange3(val) {
            this.page3 = val;
            this.loadVideoData();
        },
        handleCurrentChange4(val) {
            this.page4 = val;
            this.loadAtlasData();
        },
        //每页显示数据量变更
        handleSizeChange2(val) {
            this.count2 = val;
            this.loadKindsData();
        },
        handleSizeChange3(val) {
            this.count3 = val;
            this.loadVideoData();
        },
        handleSizeChange4(val) {
            this.count4 = val;
            this.loadAtlasData();
        },
        timeFormat(row, column, cellValue) {//时间格式化
            return this.$dateTimeFm(cellValue);
        },
        uploaded(path) {
            this.formObj.coverUrl = path;
        },
        async submitForm() {
            let query = { ...this.formObj };
            delete query.coverUrlView;
            if (this.parentData && this.parentData.name && (!this.isPositiveInteger(query.props.row) || query.props.row < 1 || query.props.row > 8)) {
                return this.$message.error("行必须为整数并且范围是1-8");
            }
            if (this.parentData && this.parentData.name && (!this.isPositiveInteger(query.props.colunm) || query.props.colunm < 1 || query.props.colunm > 20)) {
                return this.$message.error("列必须为整数并且范围是1-20");
            }
            if (!query.props.colunmWidth) {
                delete query.props.colunmWidth;
            }
            if (!query.props.rowHeight) {
                delete query.props.rowHeight;
            }
            if (this.parentData && this.parentData.name && (!query.instruction || query.instruction.length < 2)) {
                return this.$message.error("分类说明至少输入2个字符");
            }
            let res = {};
            if (query.id) {
                res = await this.$http(updateCategories, { type: this.currentCategoryType, ...query });
            }
            else {
                res = await this.$http(insertCategories, { type: this.currentCategoryType, ...query });
            }
            if (res.code === 200) {
                this.$store.dispatch("baseData/setCategories",CURRENTPID);
                this.$message.success("操作成功");
                this.dialogVisible = false;
                if (this.parentData && this.parentData.name) {
                    this.loadData();
                    this.parentData = {};
                    return;
                }
                this.loadData();
            }
        },
        editLine(row) {
            this.formObj = { ...row };
            if (!this.formObj.props) {
                this.formObj = { props: { firstLarge: true, showBtns: true, imageLocation: "left" }, ...row };
            }
            if (!this.formObj.enableRandom) {
                this.formObj = { enableRandom: true, ...this.formObj };
            }
            this.formObj.parentId = this.parentData ? this.parentData._id : undefined;
            this.formObj.id = row._id;
            this.dialogTitle = "编辑分类";
            this.dialogVisible = true;
            this.isUpdate = true;
        },
        editLineSub(row) {
            this.parentData = this.tempParentData;
            this.editLine(row);
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
                this.$store.dispatch("baseData/setCategories",CURRENTPID);
            }
        },
        async delLineSub(row) {
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
        showSub(row) {
            this.parentData = { ...row };
            this.loadKindsData();
            this.dialogVisible2 = true;
        },
        showAdd() {
            this.parentData = {};
            this.formObj = {
                pid: CURRENTPID,//this.parentData?.pid,
                parentId: this.parentData ? this.parentData._id : undefined,
                active: true,
                enableRandom: true,
                props: { showMode: "horizontal", imageLocation: "left", firstLarge: true, row: 1, colunm: 1, showBtns: true }
            };
            this.dialogTitle = "添加分类";
            this.dialogVisible = true;
            this.isUpdate = false;
        },
        showAddSub() {
            this.parentData = this.tempParentData;
            this.formObj = {
                pid: CURRENTPID,//this.parentData?.pid,
                parentId: this.parentData ? this.parentData._id : undefined,
                active: true,
                enableRandom: true,
                props: { showMode: "horizontal", imageLocation: "left", firstLarge: true, row: 1, colunm: 1, showBtns: true }
            };
            this.dialogTitle = "添加分类";
            this.dialogVisible = true;
            this.isUpdate = false;
        },

        addVideos() {
            console.log("添加视频");
        },

        closeEdit() {
            this.parentData = {};
        },
        activeFormater(row, column, cellValue) {
            return cellValue ? "是" : "否";
        },
        showModeFormater(row, column, cellValue) {
            if (cellValue) {
                return cellValue.showMode == "horizontal" ? "横图模式" : "竖图模式";
            }
        },
        firstLargeFormater(row, column, cellValue) {
            if (cellValue) {
                return cellValue.firstLarge ? "是" : "否";
            }
        },
        prevent(e) {
            var keynum = window.event ? e.keyCode : e.which;   //获取键盘码
            if (keynum == 189 || keynum == 190 || keynum == 109 || keynum == 110) {
                this.$message.warning('禁止输入小数以及负数');
                e.target.value = '';
            }
        },
        isPositiveInteger(s) {//是否为正整数
            var re = /^[0-9]+$/;
            return re.test(s);
        }
    }
};
</script>
<style scoped>
.header {
    margin-bottom: 10px;
}
</style>
<style lang="scss" >
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}

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

.box-card {
    padding: 20px;
}

.flex-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    > .top {
    }

    > .content {
        flex: 1;
    }

    > .bottom {
    }
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
</style>
