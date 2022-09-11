
<template >

    <div>
        <!-- <img height="100px" width="100px" :src="newAvatarURL" /> -->
        <el-image v-if="imgUrl" :style="{height:height,width:width}" :src="imgUrl" :preview-src-list="[imgUrl]" @error="errorrr">
            <!-- <div slot="error" class="image-slot">
                加载失败：<br />{{newAvatarURL}}
            </div> -->
        </el-image>
        <div v-else style="background:#ccc, display: inline-block" :style="{height:height,width:width}" v-loading="true" :element-loading-text="`图片加载中..`" element-loading-spinner="el-icon-loading"></div>
    </div>
</template>

<script>
import { jiemi } from '@/utils/getFile';
export default {
    props: {
        avatarURL: "",


        width: {
            type: String,
            default: '100px'
        },
        height: {
            type: String,
            default: '100px'
        }
    },


    data() {
        // let url = await this.onLoadImg(this.avatarURL);
        return {

            imgUrl: "",
            newAvatarURL: this.avatarURL,
        };
    },

    watch: {
        avatarURL(newVal) {
            this.newAvatarURL = newVal;
            this.onLoadImg();
        }

    },

    mounted() {
        this.onLoadImg();

    },
    methods: {



        async onLoadImg() {
            // this.imgUrl = await jiemi(this.newAvatarURL);
            // return this.imgUrl;
            // jiemi;



            let imgSrc = this.newAvatarURL;
            if (imgSrc && imgSrc.indexOf(".ceb") > -1) {
                let tmpImg = await jiemi(imgSrc);
                this.imgUrl = tmpImg;
            } else if (imgSrc && imgSrc.indexOf("http") > -1) {
                this.imgUrl = this.newAvatarURL;
            }
        },

        errorrr(err) {
            console.log('err = ', err);
        }
    },
}
</script>

<style>
.picbox {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>
