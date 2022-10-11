<template>
    <el-card class="dashboard-second">
        <el-upload ref="upload" class="upload-demo" :show-file-list="false" action="https://jsonplaceholder.typicode.com/posts/" :on-progress="uploading" :on-preview="handlePreview" multiple :limit="10" :on-change="handleChange" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传主流视频格式文件，且每批次上传不超过10个</div>
        </el-upload>
        <el-table :data="uplist" style="width: 100%">
            <el-table-column prop="percent" label="上传进度" width="180" />
            <el-table-column prop="name" label="文件名" width="180" />
            <el-table-column prop="time" label="总时长" />
            <el-table-column prop="size" label="文件体积" />
            <!-- <el-table-column label="预览">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-caret-right" @click="play(scope.row.uid)"></el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }],
            uplist: []
        };
    },
    created() {
        this.uplist = [];
    },
    methods: {
        submitUpload() {
            // console.log(this.fileList, "**************");
            this.$refs.upload.submit();
        },
        handleChange(file, fileList) {
            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            if (file.raw.type.includes('audio') || file.raw.type.includes('video')) {
                const item = this.uplist.find(i => i.id === file.raw.uid);
                if (!item) {
                    const url = URL.createObjectURL(file.raw);
                    this.uplist.push({ name: file.name, url: url, id: file.raw.uid, percent: '0', size: (file.size / 1024 / 1024).toFixed(2) + 'M' });
                }
                if (file.raw.type.includes('video')) {
                    this.fileValue(file);
                }
            }
        },
        handlePreview(file) {
            // 选择文件后的勾子
            console.log(file, '***************');
        },
        uploading(event, file, fileList) {
            console.log(this.uplist, '**************');
            const percent = event.percent.toFixed(2);
            const item = this.uplist.find(i => i.id === file.raw.uid);
            if (item) {
                item.percent = percent;
            }
        },
        fileValue(file) {
            const url = URL.createObjectURL(file.raw);
            this.url = url;
            const videoEle = new Audio(url);
            let duration = 0;
            videoEle.addEventListener('loadedmetadata', _event => {
                duration = videoEle.duration;
                const index = this.uplist.findIndex(i => i.id === file.raw.uid);

                if (index >= 0) {
                    this.$set(this.uplist[index], 'time', duration);
                }
            });
        }
    }
}
</script>
