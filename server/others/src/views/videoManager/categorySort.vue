<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item style="color:#ff0000;">
                <el-button type="primary" @click="loadAll">各分类推送数量统计</el-button>
                注意：当前页面已弃用，相关操作请前往 【基本分类配置】 页面。
            </el-form-item>
        </el-form>
        <el-dialog title="排序" :visible.sync="dialogEditVisible" width="600px">
            <el-form label-width="100px">
                <el-form-item label="当前排序">
                    <el-input v-model="search.index" placeholder="请输入排序序号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditSort">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="推送数量统计" :visible.sync="dialogPushVisible" width="65%">
            <el-table :data="totals" :border="true" min-width="100%" ref="table" max-height="600px">
                <el-table-column prop="categoryId" label="分类ID" align="center" min-width="120"></el-table-column>
                <el-table-column prop="name" label="分类名称" align="center" min-width="250"></el-table-column>
                <el-table-column prop="count" label="推送数量" align="center" min-width="50"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="视频列表" :visible.sync="dialogVideoVisible" width="90%">
            <div>当前分类 : {{curCategory.name}}</div>
            <el-table :data="pageData" :border="true" min-width="100%" ref="table" @selection-change="handleSelectionChange" max-height="600px">
                <el-table-column type="selection" width="55" fixed="left">
                </el-table-column>
                <el-table-column v-if="showColumns.includes('_id')" prop="_id" label="视频id" align="center" min-width="220" fixed="left"></el-table-column>

                <el-table-column v-if="showColumns.includes('createdDate')" prop="createdDate" label="创建时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                <el-table-column v-if="showColumns.includes('optCreate')" prop="optCreate" label="审核时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                <el-table-column v-if="showColumns.includes('releaseDate')" prop="releaseDate" label="前端上线时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                <el-table-column v-if="showColumns.includes('updatedDate')" prop="updatedDate" label="修改时间" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                <el-table-column v-if="showColumns.includes('name')" prop="name" label="视频名称" align="center" min-width="160"></el-table-column>
                <el-table-column v-if="showColumns.includes('summary')" prop="summary" label="简介" align="center" min-width="200"></el-table-column>
                <el-table-column v-if="showColumns.includes('coverURL')" prop="coverURL" label="封面" align="center" min-width="150">
                    <template slot-scope="scope">
                        <el-image v-if="scope.row.coverURLView"  :src="scope.row.coverURLView" :preview-src-list="[scope.row.coverURLView]">
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
                <el-table-column v-if="showColumns.includes('price')" prop="price" label="价格" align="center">
                </el-table-column>
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
                    </template>
                </el-table-column>
            </el-table>
            <el-col class="toolbar2">
                <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :current-page="page2" :page-sizes="[10,20,30,50,100,200,500]" :page-size="count2" :total="totalCount2"></el-pagination>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog2Visible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormAddVideo">确 定</el-button>
            </div>
        </el-dialog>

        <div style="display:flex; justify-content:space-between;">
            <div :border="true" style="display: inline-block !important;margin: 0 0px;border:1px solid #000;width:25%">
                <el-tree style="display: inline-block !important;margin: 10px 10px 0 0;" :data="datatree" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" :expand-on-click-node="false" node-key="treeid" accordion :default-expanded-keys="[1]"></el-tree>
            </div>

            <div :border="true" style="display: inline-block !important;margin: 0 0px;border:1px solid #000;width:75%">
                <el-button style="margin: 5px" type="primary" @click="showAddCategary">添加分类</el-button>
                <el-button style="margin: 5px" type="primary" @click="massDelete">批量移除</el-button>
                <el-button style="margin: 5px" type="primary" @click="submitSort" v-if="sortData.length>0">提交排序</el-button>
                <el-table @selection-change="handleSelectionChange2" :data="sortData" :border="true" min-width="100%" ref="table" max-height="800px">
                    <el-table-column type="selection" width="55" fixed="left"></el-table-column>
                    <el-table-column prop="_id" label="视频id" align="center" min-width="200">
                    </el-table-column>
                    <el-table-column prop="createdDate" label="创建时间" sortable="false" align="center" :formatter="$dateTimeFm" min-width="170"></el-table-column>
                    <el-table-column prop="name" label="视频名称" align="center" min-width="160"></el-table-column>
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
                    <el-table-column prop="publisherId" label="发布人" align="center" min-width="200"></el-table-column>
                    <el-table-column prop="playURL" label="播放地址" align="center" min-width="300" :formatter="urlFormat"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="play(scope.row.playURL)">播放</el-button>
                            <el-button type="text" @click="editSort(scope.row)">编辑</el-button>
                            <el-button type="text" @click="delVideo(scope.row._id)">移出推送</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col class="toolbar2">
                    <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
                </el-col>
            </div>
        </div>

        <!-- <div class="bootom">
            <el-button type="primary" @click="submitSort" v-if="sortData.length>0">提交排序</el-button>
        </div> -->
        <el-dialog title="视频播放" :visible.sync="dialogVideo" width="790px" @close="closePlayer(true)">
            <Video :url="videoUrl" />
        </el-dialog>
    </el-card>
</template>
<script>
import { getAllSort, getManyVideos, addManySort, updateSortSort, deleteOneSort, getStatisticsSort, videoDeleteMany } from '@/api/videoManager';
import { timeTypeList, payTypeList } from '@/utils/baseConst';
import draggable from 'vuedraggable';
import { getCategorieLabel } from '@/utils/formatter';
import { getSession } from '@/utils/auth';
import video from './components/video';
import { deepClone, secToString, setImgView } from '@/utils/formatter';
import { sizeFormat, getCategories, getWholeCategorieLabelArr } from '@/utils/formatter';
export default {
    components: {
        draggable,
        Video: video
    },
    data() {
        return {
            treeId: 0,
            page: 1,
            count: 10,
            page2: 1,
            count2: 10,
            totalCount: 1,
            totalCount2: 1,
            drag: false,
            search: {},
            sortData: [],
            totals: [],
            dialogVideo: false,
            videoUrl: '',
            vidsArr: [],
            dialogVisible: false,
            checkAll: false,
            isIndeterminate: false,
            checkedVids: [],//选中的数据源
            vidArrLength: 0,
            selectVids: [],//数据源
            datatree: [],
            defaultProps: {
                children: 'children',
                name: 'label'
            },
            curCategory: {},
            dialogVideoVisible: false,
            dialogPushVisible: false,
            dialogEditVisible: false,
            showColumns: [
                '_id', 'createdDate', 'optCreate', 'name', 'summary', 'coverURL', 'publisherId', 'uploadId', 'time', 'size', 'price', 'payType', 'timeType', 'playURL', 'playCnt', 'likedCnt', 'hot', 'commentCnt', 'state', 'opt', 'categorie', 'tags', 'releaseDate', 'updatedDate', 'pullCategorie', 'from', 'index', 'collectedCnt'
            ],
            pageData: [],
            selectData: [],
            selectData2: [],
            curCategoryName: "",
        };
    },
    computed: {
        categorieList() {
            console.log(this.$store.getters.categorieList);
            let list = this.$store.getters.categorieList;
            for (let i = 0; i < list.length; i++) {
                var obj = { treeid: this.treeId, label: list[i].name, data: list[i], children: [] };
                this.treeId++;
                this.datatree.push(obj);
                if (list[i].children && list[i].children.length > 0) {
                    this.initCategoireList(list[i].children, obj);
                }
            }
            return this.$store.getters.categorieList;
        },
        tagsList() {
            return this.$store.getters.tagsList;
        }
    },
    filters: {
        timeTypeFormat(val) {
            let item = timeTypeList.find(i => i.value === val);
            return item ? item.label : val;
        },
        payTypeFormat(val) {
            let item = payTypeList.find(i => i.value === val);
            return item ? item.label : val;
        }
    },
    async created() {
        this.categorieList;
    },
    methods: {
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
        handleSelectionChange(val) {
            this.selectData = val;
        },
        handleSelectionChange2(val) {
            this.selectData2 = val;
        },
        showAddCategary() {
            console.log(this.curCategory);
            if (!this.curCategory.name) {
                this.$message.error("请先选择视频分类");
                return;
            }
            this.loadVideoData();
            this.dialogVideoVisible = true;
        },

        initCategoireList(list, obj) {
            for (let i = 0; i < list.length; i++) {
                var item = { treeid: this.treeId, label: list[i].name, data: list[i], children: [] };
                this.treeId++;
                obj.children.push(item);
                if (list[i].children && list[i].children.length > 0) {
                    this.initCategoireList(list[i].children, item);
                }
            }
        },
        handleNodeClick(data) {
            console.log(data);
            if (data.children.length < 1) {
                this.curCategory = data.data;
                this.loadData();
            }
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span >
                    </span>
                </span>);
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        handleSizeChange2(val) {
            this.count2 = val;
            this.loadVideoData();
        },
        handleCurrentChange2(val) {
            this.page2 = val;
            this.loadVideoData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        urlFormat(row, column, cellValue) {
            return cellValue ? `${getSession("src")[0] || ""}/${cellValue}` : cellValue;
        },
        getCategorieFormat(val) {
            return getCategorieLabel(val, this.categorieList);
        },
        async loadData() {
            let query = { page: this.page, count: this.count, categorie: this.curCategory.id };
            query.categorie = query.categorie ? query.categorie : undefined;
            let res = await this.$http(getAllSort, query);
            if (res.code === 200) {
                this.selectVids = res.msg.pageData.map(it => {
                    return it._id;
                });
                this.vidArrLength = res.msg.totalCount;
                this.totalCount = res.msg.totalCount;
                this.sortData = res.msg.pageData;
                this.sortData = deepClone(await setImgView(res.msg.pageData, "coverURL"));
            }
        },

        async loadVideoData() {
            let res = await this.$http(getManyVideos, { page: this.page2, count: this.count2 });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount2 = res.msg.totalCount;
                this.pageData = deepClone(await setImgView(res.msg.pageData, "coverURL"));

            }
        },
        async loadAll() {
            let res = await this.$http(getStatisticsSort);
            if (res.code === 200) {
                this.totals = res.msg;
            }
            for (let i = 0; i < this.totals.length; i++) {
                let name = this.getCategorieFormat(this.totals[i].categoryId);
                this.totals[i].name = name;
            }
            this.dialogPushVisible = true;
        },
        async submitFormAddVideo() {
            this.vidsArr.splice(0);
            for (let i = 0; i < this.selectData.length; i++) {
                this.vidsArr.push(this.selectData[i]._id);
            }
            if (this.vidsArr.length < 1) {
                this.$message.error("视频ID不能为空");
            }
            let res = await this.$http(addManySort, { vids: this.vidsArr, categorie: this.curCategory.id, index: 1 });
            if (res.code === 200) {
                this.$message.success("批量添加成功");
                this.dialogVideoVisible = false;
                this.vidsArr = [];
                this.loadData();
            }
        },
        onStart() {
            this.drag = true;
        },
        onEnd() {
            this.drag = false;
        },

        async submitSort() {
            let query = {
                categorie: this.curCategory.id,
                videos: this.sortData.map(i => i.contentId)
            };
            // console.log(query.videos, "%%%%%%%%%%%%%%%%%%");
            let res = await this.$http(updateSortSort, query);
            if (res.code === 200) {
                this.$message.success("排序编辑成功");
                this.loadData();
            }
        },
        editSort(row) {
            this.dialogEditVisible = true;
            console.log(row);
            this.search = row;
        },
        confirmEditSort() {
            this.dialogEditVisible = false;
            for (let i = 0; i < this.sortData.length; i++) {
                if (this.sortData[i]._id == this.search._id) {
                    this.sortData[i].index = this.search.index;
                    break;
                }
            }
            this.sortData.sort((a, b) => { return a.index - b.index; });
        },
        async delVideo(id) {
            let res = await this.$http(deleteOneSort, { id: id });
            if (res.code === 200) {
                this.$message.success("视频已从分类推送中移除");
                this.loadData();
            }
        },
        async editIndex(row, index) {
            let prompt = await this.$prompt("请输入排序位置", `提示`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: "number"
            });
            this.sortData.splice(index, 1);
            this.sortData.splice(parseInt(prompt.value) - 1, 0, row);
        },
        async massDelete() {
            await this.$confirm(`确认批量移除吗？`, `提醒`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            });
            this.checkedVids.splice(0);
            for (let i = 0; i < this.selectData2.length; i++) {
                this.checkedVids.push(this.selectData2[i]._id);
            }
            let res = await this.$http(videoDeleteMany, { ids: this.checkedVids });
            if (res.code === 200) {
                this.$message.success("批量移除成功");
                this.loadData();
            }
        },
        play(url) {
            this.videoUrl = `${getSession("src")[0] || ""}/${url}`;
            this.dialogVideo = true;
            console.log(url, this.videoUrl);
        },
        closePlayer() {
            this.videoUrl = '';
        },
        handleCheckAllChange(val) {
            this.checkedVids = val ? this.selectVids : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = this.checkedVids.length;
            this.checkAll = checkedCount === this.vidArrLength;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.vidArrLength;
        },
        copy(e) {
            navigator.clipboard.writeText(e);
            this.$message.success("复制成功");
        }
    }
}
</script>
<style>
.my_label {
    width: 80px;
}
.my_content {
    width: 190px;
}
</style>
<style lang="scss" scoped>
.name {
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.contentBox {
    display: flex;
    justify-content: space-between;
    .contentItem {
        h3 {
            font-size: 16px;
            font-weight: normal;
        }
    }
}
.bootom {
    margin-top: 20px;
}
.categoryVideos {
    div {
        display: inline-block;
        margin-right: 30px;
        line-height: 30px;
        strong {
            font-weight: normal;
            color: #666;
            margin-right: 6px;
        }
    }
}
</style>