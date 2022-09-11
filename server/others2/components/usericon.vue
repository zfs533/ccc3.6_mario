<template>
    <div class="picbox">
        <div class="van-image van-image--round" style="width: 100%; height: 100%;">
            <img round width="100%" height="100%" :data-src="imgUrl" :src="base64ImgData" style="object-fit: cover;" />
        </div>
    </div>
</template>

<script> 
import { defaultRes } from "~/assets/js/constants";

export default {
    name: "usericon",
    props: {
        imgUrl: ""
    },
    data() {
        return {
            realUrl: this.imgUrl,
            base64ImgData: defaultRes.userAvatorDefault
        };
    },
    watch: {
        imgUrl: {
            deep: true,  // 深度监听
            async handler(newVal, oldVal) {
                this.loadImg(newVal);
            }
        }
    },
    created() {
        this.loadImg(this.imgUrl);
    },
    methods: {
        async loadImg(url) {
            let imgSrc = url;
            if (imgSrc && imgSrc.indexOf(".ceb") > -1) {
                this.$fileloader.dowloadJpegImg(imgSrc, 120, (url, data) => {
                    if (!data) {
                        console.warn("userAvator onLoadImg error");
                        return;
                    }
                    this.base64ImgData = data;
                });
                // return 'this.src='+'"'+tmpImg+'";this.onload=null';
            } else if (imgSrc && imgSrc.indexOf("http") > -1) {
                this.base64ImgData = url;
            }
        },
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
