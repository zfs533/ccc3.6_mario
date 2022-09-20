<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户id">
                <el-input v-model="search.uid" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="search.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-select v-model="search.userType" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布视频数">
                <div class="zoneBox">
                    <div class="inputs">
                        <el-input type="number" v-model="search.videoCntMin" placeholder="起" style="width:120px">
                        </el-input>
                    </div>
                    <div class="line">—</div>
                    <div class="inputs">
                        <el-input type="number" v-model="search.videoCntMax" placeholder="止" style="width:120px">
                        </el-input>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateArr1" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table @header-click="handleHeaderClick" :data="pageData" :border="true" min-width="100%" :height="mainHeight - 190">
            <el-table-column prop="uid" label="玩家id" align="center"></el-table-column>
            <el-table-column prop="username" label="用户呢称" align="center"></el-table-column>
            <el-table-column prop="createdDate" label="账号创建时间" sortable="false" align="center" :formatter="$dateTimeFm"></el-table-column>
            <el-table-column prop="avatarURL" label="头像" align="center">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.avatarURLView" style="width: 100px; height: 100px" :src="scope.row.avatarURLView" :preview-src-list="[scope.row.avatarURLView]">
                        <div slot="error" class="image-slot">
                            加载失败：<br />{{ scope.row.avatarURLView }}
                        </div>
                    </el-image>
                    <div style="width: 100px; height: 100px;background:#ccc;display: inline-block;" v-else v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="用户类型" align="center" :formatter="typeFormat"></el-table-column>
            <el-table-column prop="videoCnt" label="发布视频数量" align="center"></el-table-column>
            <el-table-column prop="followerCnt" label="粉丝数量" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="update(scope.row, 'followerCnt')">{{ scope.row.followerCnt }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="likedCnt" label="获赞数量" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="update(scope.row, 'likedCnt')">{{ scope.row.likedCnt }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import { bloggerGet, bloggerUpdate } from '@/api/usersManager';
import { UserTypeNew } from '@/utils/baseConst';
import { deepClone, setImgView } from '@/utils/formatter';
import { CURRENTPID } from '@/utils/myAsyncFn';
export default {
    components: {
    },
    data() {
        return {
            mainWidth: 0,
            mainHeight: 0,
            page: 1,
            count: 10,
            totalCount: 0,
            search: {},
            sortT: {},
            dateArr1: [],
            pageData: [],
            typeList: UserTypeNew.filter(item => {
                return item.value != 1;
            })
        };
    },
    created() {
        this.loadData();
    },
    mounted() {
        this.$nextTick(() => {
            this.mainHeight = document.querySelector('.app-main').clientHeight;
            this.mainWidth = document.querySelector('.app-main').clientWidth;
        });
    },
    methods: {
        handleHeaderClick(column, event) {
            this.sortT = { sort: {} };
            switch (column.property) {
                case "createdDate":
                    if (column.order == "ascending") {
                        this.sortT.sort.createdDate = 1;
                    } else if (column.order == "descending") {
                        this.sortT.sort.createdDate = -1;
                    }
                    this.loadData();
                    break;
            }
        },

        searchData() {
            this.page = 1;
            this.loadData();
        },
        getQuery() {
            let query = { ...this.search };
            query.pid=CURRENTPID;
            if (this.dateArr1 && this.dateArr1.length > 1) {
                query.createTimeStart = this.dateArr1[0];
                query.createTimeEnd = this.dateArr1[1];
            }
            return query;
        },
        async loadData() {
            let res = await this.$http(bloggerGet, { page: this.page, count: this.count, ...this.getQuery(), ...this.sortT });
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
                this.pageData = deepClone(await setImgView(res.msg.pageData, "avatarURL"));
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

        async update(row, input) {
            let name = '';
            let query = { id: row._id };
            if (input == "videoCnt") {
                name = "发布视频数量";
            }
            if (input == "followerCnt") {
                name = "粉丝数量";
            }
            if (input == "likedCnt") {
                name = "获赞数量";
            }
            let prompt = await this.$prompt(`请输入增加的${name}`, `累加${name}(负数表示减少数量)`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'number'
            });
            if (prompt.value) {
                query[input] = prompt.value;
                let res = await this.$http(bloggerUpdate, query);
                if (res.code === 200) {
                    this.$message.success("修改成功");
                    this.loadData();
                }
            }

        },
        typeFormat(row, column, cellValue) {
            let item = this.typeList.find(i => i.value == cellValue);
            return item ? item.label : cellValue;
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

.box-card {
    padding: 20px;
}

.flex-container {
    height: 100%;
    width: 100%;
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
</style>
