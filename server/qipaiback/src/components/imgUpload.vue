<template>
    <el-upload v-loading="loading" :element-loading-text="`拼命上传中`" element-loading-spinner="el-icon-loading" class="avatar-uploader" :action="actionUrl" :headers="headers" :on-error="showErr" :data="{path,ftp:'img'}" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept=".jpg,.jpeg,.gif,.png,.JPG,.JPEG,.GIF">
        <el-image v-if="imageUrl||newImg" class="avatar" :src="newImg">
            <div slot="error" class="image-slot">
                {{newImg}}
            </div>
        </el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import { getSession } from '@/utils/auth';
import ImageCompressor from 'image-compressor.js';
export default {
    props: ['imageUrl', 'path', 'isCompress'],
    data() {
        return {
            actionUrl: '',
            newImg: "",
            headers: { "x-token": getSession('x-token').token },
            loading: false,
            needCompress: this.isCompress,
        };
    },
    watch: {
        imageUrl(n, o) {
            this.newImg = n;
        },

        isCompress(v) {
            this.needCompress = v;
        },

    },
    created() {
        this.newImg = this.imageUrl;
        let baseUrl = getSession("x-baseurl") || "";
        this.actionUrl = `${baseUrl}/api/admin/uploadImg`;
    },
    methods: {
        showErr(err) {
            console.error(err);
            this.$message.error(`图片上传失败，${JSON.stringify(err)}`);
        },
        requestFn(option) {
            const self = this;
            const reader = new FileReader();
            reader.readAsDataURL(option.file);
            reader.onload = function (e) {
                self.newImg = this.result;
            };
        },
        handleAvatarSuccess(res, file) {
            if (res.msg) {
                this.newImg = URL.createObjectURL(file.raw);
                this.$message.success("图片上传成功！");
                let path = `${res.msg.path}/${res.msg.fileName}`;
                this.$emit("success", path);
            } else {
                this.$message.error("图片上传失败！" + res.err);
            }

            this.loading = false;
        },
        async beforeAvatarUpload(file) {
            console.log('file = ', file);
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            const isLt2M = file.size / 1024 < 500;
            if (!isJPG) {
                this.$message.error('上传图片只能是 jpg/png/gif 格式!');
                return Promise.reject(false);
            }
            else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 500k!');
                return Promise.reject(false);

            }
            // file;

            // if (this.needCompress) {
            //     let file2 = await this.compressFile(file);
            //     file = file.size > file2.size ? file2 : file;
            // }
            this.loading = true;
            return isJPG && isLt2M && (file || true);
        },

        compressFile(file) {
            return new Promise((resolve, reject) => {

                new ImageCompressor(file, {
                    quality: 0.6,
                    // width: 240,
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
    }
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #999;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.image-slot {
    color: #f00;
}
</style>