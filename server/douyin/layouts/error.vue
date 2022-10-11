<template>
    <div>
        <div alt="" class="errtbcak" @click="onClickBack">
            <van-icon name="arrow-left" size="28" />
        </div>
        <div class="errorinfo">
            <div class="erroetext">
                <div v-if="error.statusCode === 404">
                    <h1>找不到资源</h1>
                    <h3>{{$route.path}}</h3>
                </div>
                <div v-else>
                    <h1>出现错误啦！</h1>
                    <h3>{{$route.path}}</h3>
                    <h3>错误码: {{error.statusCode}}</h3>
                    <h5>消息: {{error.message}}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    layout: "error",
    props: {
        error: {
            type: Object,
            required: true
        }
    },
    created() {
        if (this.error.statusCode === 404) {
            this.$router.replace({
                path: "/",
            });
        }
    },
    methods: {
        onClickBack() {
            if (this.$route.path === "/home") {
                window.location.replace(window.location.origin);
                return;
            }
            if (this.$env.options && this.$env.options.homePage && this.$env.options.homePage.index) {
                this.$router.replace({
                    path: this.$env.options.homePage.index,
                });
            } else {
                this.$router.replace({
                    path: "/home",
                });
            }
        },
    }
}
</script>
<style lang="less">
.errorinfo {
    position: absolute;
    top: 30%;
    margin-top: -100px;
    width: 100%;
}
.erroetext {
    font-size: 0.5rem;
    color: @text-color;
    margin: auto;
    text-align: center;
}
.errtbcak {
    padding: 0.2rem;
}
</style>