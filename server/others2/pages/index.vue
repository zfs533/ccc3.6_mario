<template>
    <div class="index-view container">

    </div>
</template>
<script>  
import { pageMixin } from "~/assets/js/mixins";

export default {
    name: 'indexView',
    mixins: [pageMixin],
    data() {
        return {

        };
    },
    async created() {
        console.log("index created");
        // 防止开发模式重复创建index
        if (!window.app.started) {
            window.app.started = true;

            setTimeout(() => {
                this.$nextTick(() => {
                    this.$main.init();
                    // app 模式才会进入应用模式
                    if (['clip', 'pwa', 'h5'].includes(this.$route.query.from)) {
                        this.$router.replace({
                            path: "/launch"
                        });
                        return;
                    }
                    this.$router.replace({
                        path: "/launch"
                    });
                });
            }, 200);
        }
        console.log("index created end");
    },
    async mounted() {
        console.log("index mounted");
    }
}
</script>

<style lang="less" scoped>
</style>
