<template>
    <div>
        <div id="xg"></div>
        <el-dialog append-to-body title="截图预览" :visible.sync="dialogVisible" width="60%" top="5vh" @close="closeImg">
            <div class="imgBox"><img :src="base64" /></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="downLoad">下载截图</el-button>
                <el-button type="primary" @click="submitForm">添加到封面</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import 'xgplayer';
const HlsJsPlayer = require('xgplayer-hls.js');

export default {
    props: {
        url: '',
        screenShot: Boolean
    },
    data() {
        return {
            player: "",
            dialogVisible: false,
            base64: "",
        };
    },
    mounted() {
        this.player = new HlsJsPlayer({
            cors: true,
            id: 'xg',
            url: this.url,
            width: 750,
            height: 400,
            autoplay: true,
            playbackRate: [0.5, 0.75, 1, 1.5, 2, 4],
            screenShot: {
                saveImg: false,
                quality: 0.92,
                type: 'image/png',
                format: '.png'
            },
            closeVideoStopPropagation: true,
            closeVideoPreventDefault: true,
            closeVideoTouch: true,
            videoInit: true,
            //isLive: true, //直播场景设置为true
            useHls: true,
            //hlsOpts: {
            //  xhrSetup: function(xhr, url) {
            //    xhr.withCredentials = true;
            //  }
            //} //hls.js可选配置项
        });
        this.player.on('screenShot', this.screenShotImg);
        this.player.on('error', error => {
            //事件名称可以在上述查询
            console.error("---error--", error);
        });

    },
    created() {
        // this.playUrl = this.url;
    },
    watch: {
        url(n, o) {
            // console.log(`新的:${n}，旧的:${o}`, "%%%%%%%%%%%%%%%%");
            this.player.src = n;
        }
    },
    methods: {
        screenShotImg(screenShotImg) {
            this.player.pause();
            this.base64 = screenShotImg;
            if (this.screenShot) {
                this.dialogVisible = true;
                return;
            }
            this.downLoad();

        },
        async submitForm() {
            await this.$emit("jietu", this.base64ToBlob(this.base64), this.base64);
            this.dialogVisible = false;
            this.player.play();
        },
        base64ToBlob(base64Data) {
            let arr = base64Data.split(','),
                fileType = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                l = bstr.length,
                u8Arr = new Uint8Array(l);

            while (l--) {
                u8Arr[l] = bstr.charCodeAt(l);
            }
            let theBlob = new Blob([u8Arr], {
                type: "image/png"
            });
            theBlob.lastModifiedDate = new Date();
            theBlob.name = "coverURL";
            return theBlob;
        },
        downLoad() {
            let link = document.createElement('a');
            link.href = this.base64;
            link.download = `jietu${new Date().getTime()}.png`;
            link.click();
            this.dialogVisible = false;
            this.player.play();
        },
        closeImg() {
            this.dialogVisible = false;
            this.player.play();
        }
    }
}
</script>
<style lang="scss" scoped>
.imgBox {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
    }
}
</style>