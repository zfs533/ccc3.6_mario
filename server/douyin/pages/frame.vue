<template>
    <div class="flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickBack" :title="title" style="z-index: 1000; width: 100%;" :placeholder="true">
                <template v-if="showCopy" #right>
                    <van-button type="primary" size="mini" color="rgb(96 96 96)" @click="onClickCopy">点击复制到浏览器打开</van-button>
                </template>
            </van-nav-bar>
        </div>
        <div class="content">
            <iframe :src="target" frameborder="0" :height="frameHeight" width="100%"></iframe>
        </div>
    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: "frame",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            target: "about:blank",
            title: "",
            showCopy: false,
            frameHeight: 0,
        };
    },
    created() {
        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.add("safe-bottom");

        let target = this.$route.query.target;
        if (target) this.target = target;
        let title = this.$route.query.title;
        if (title) {
            this.title = title;
        } else {
            this.showCopy = true;
            if (this.$route.query.showCopy === "false") {
                this.showCopy = false;
            } else {
                this.showCopy = true;
            }
        }
    },
    mounted() {
        this.$parent.showTabbar = false;


        let screenHeight = (document.documentElement.clientHeight || document.body.clientHeight);
        let frameHeight = screenHeight;

        let cuttop = document.querySelector(".top");
        if (cuttop) {
            frameHeight = screenHeight - (cuttop ? cuttop.clientHeight || 35 : 35);
        }
        this.frameHeight = frameHeight;
    },
    activated() {
        this.$parent.showTabbar = false;
    },
    methods: {
        onClickBack() {
            this.$router.back();
        },
        onClickCopy() {
            this.$copyText(this.target).then(
                (e) => {
                    this.$toast("复制成功, 您可以到浏览器打开页面");
                },
                (e) => {
                    this.$toast("复制失败");
                }
            );
        }
    },

}
</script>
<style lang="less" scoped>
</style>