<template>
    <div>
        <div class="vipBox">
            <div class="boxIn img-share-video-spr img-share-video-spr-invalidName" @click.stop>
                <div class="centerText"></div>
                <div class="btns">
                    <nuxt-link class="btn" to="/my/share">去分享</nuxt-link>
                    <nuxt-link class="btn" to='/recharge?type=vip'>开通VIP</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.randomCover();
            }
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.vipBox {
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .boxIn {
        width: 307px;
        height: 362px;
        position: relative;
        .centerText {
            margin: 288px auto 70px auto;
        }
        .btns {
            width: 272px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;

            .btn {
                display: block;
                width: 125px;
                height: 35px;
                line-height: 35px;
                background-image: @common-btnBG-color1;
                color: @common-btnText-color1;
                border-radius: 30px;
                text-align: center;
                font-size: 16px;
            }
        }
    }
}
</style>