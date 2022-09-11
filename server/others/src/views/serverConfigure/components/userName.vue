<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
                <!-- 批量导入 -->
                <el-button type="primary" @click="$refs.excelBtn.click()">批量导入</el-button>
                <el-button type="primary" @click="deleteList">批量删除</el-button>
                <a style="color:blue" href="userName.xlsx" download="userName.xlsx">下载模版</a>
            </el-form-item>
        </el-form>
        <div class="function-point-container">
            <el-upload v-show="false" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" action :auto-upload="false" :show-file-list="false" :on-change="importData">
                <span ref="excelBtn">导入EXCEL</span>
            </el-upload>
        </div>
        <el-table :data="pageData" :border="true" min-width="100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
        </el-table>
        <el-col class="toolbar2">
            <el-pagination layout="total,sizes,prev, pager, next,jumper" class="pag" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="count" :total="totalCount"></el-pagination>
        </el-col>
    </el-card>
</template>
<script>
import * as XLSX from 'xlsx';

import { getUserInitUrnCfg, addUserInitUrn, delUserInitUrn } from '@/api/serverConfigure';
export default {
    props: {
        pid: '',
    },
    components: {

    },
    data() {
        return {
            page: 1,
            count: 10,
            totalCount: 0,
            pageData: [],
            multipleSelection: [],
        };
    },
    async searchData() {
        this.page = 1;
        this.loadData();

    },
    async created() {
        this.loadData();
    },
    methods: {
        async searchData() {
            this.page = 1;
            this.loadData();
        },
        async loadData() {
            let res = await this.$http(getUserInitUrnCfg, { page: this.page, count: this.count, pid: this.pid }, true);
            if (res.code === 200) {
                this.pageData = res.msg.pageData;
                this.totalCount = res.msg.totalCount;
            }
        },
        handleCurrentChange(val) {
            this.page = val;
            this.loadData();
        },
        handleSizeChange(val) {
            this.count = val;
            this.loadData();
        },
        async submitForm() {
            let query = { ...this.formObj };
            let res = await this.$http(updateCsCfg, query);
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.loadData();
            }
        },
        deleteList() {
            let ids = [];
            for (let index = 0; index < this.multipleSelection.length; index++) {
                const element = this.multipleSelection[index];
                ids.push(element._id);
            }
            this.$confirm(`此操作将批量删除选中数据, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let res = await this.$http(delUserInitUrn, { ids: ids });
                    if (res.code == 200) {
                        this.$message.success("删除成功!");
                        this.loadData();
                        return;
                    }
                })
                .catch(() => {
                    this.$message.info("已取消删除");
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 批量导入
        async importData(file, fileList) {
            // 拿取文件对象
            const f = file.raw;
            // 用 FileReader 来读取
            let reader = new FileReader();
            // 重写 FileReader 上的 readAsBinaryString 方法
            FileReader.prototype.readAsBinaryString = f => {
                let binary = '';
                let wb; // 读取完成的数据
                let outdata; // 你需要的数据
                let reader = new FileReader();
                reader.onload = async e => {
                    // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
                    let bytes = new Uint8Array(reader.result);
                    let length = bytes.byteLength;
                    for (let i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // 接下来就是xlsx了，具体可看api
                    wb = XLSX.read(binary, {
                        type: 'binary',
                        cellDates: false
                    });
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    const result = this.generateParam(outdata);
                    if (result.length > 0) {
                        let res = await this.$http(addUserInitUrn, { pid: this.pid, names: result });
                        if (res.code === 200) {
                            this.$message.success("操作成功");
                            this.loadData();
                        }
                    }
                    else {
                        this.$message.error("没有导入数据，请按照模版导入数据");
                    }
                };
                reader.readAsArrayBuffer(f);
            };
            reader.readAsBinaryString(f);
        },
        // 生成导入参数
        generateParam(data) {
            const params = [];
            const parse = {
                名称: 'names',
            };
            data.forEach(item => {
                let obj = {};
                const keys = Object.keys(parse);
                const itemKeys = Object.keys(item);
                itemKeys.forEach(key => {
                    const val = item[key];
                    if (keys.includes(key)) {
                        //obj[parse[key]] = val
                        params.push(val);
                    }
                });
                // params.push(obj);
            });
            return params;
        }
    }
}
</script>
