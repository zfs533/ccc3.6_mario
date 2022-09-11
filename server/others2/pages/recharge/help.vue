<template>
    <div class="help flex-container">
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickBack" title="支付报毒解决方案" style="width: 100%;" :placeholder="true">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="scroll-container">
                <div style=" margin: 0 20px;">
                    <div class="help part1">
                        由于政策原因，部分安卓手机将成人类APP识别为病毒，我们有正当广告收益，承若绝不放置任何恶意程序，请您放心安装使用！
                    </div>
                    <div class="help">
                        <h3>支付报毒解决方法</h3>
                        每个机型的具体操作方式可能不同，解决方法是关闭系统“支付保护”即可。下面以华为为例，其他机型可参考。

                    </div>

                    <div class="steps">
                        <div class="leftLine box1">
                            <div class="node-icon">1</div>
                            <div class="title"> 进入系统设置-点击“安全” </div>

                            <img style="" src="~/assets/img/pay/picture1.png" alt="" />
                        </div>
                        <div class="leftLine box1">
                            <div class="node-icon">2</div>
                            <div class="title"> 点击“支付保护中心” </div>
                            <img style="" src="~/assets/img/pay/picture2.png" alt="" />

                        </div>
                        <div class="box1">
                            <div class="node-icon">3 </div>
                            <div class="title"> 关闭“支付保护” </div>
                            <img style="" src="~/assets/img/pay/picture3.png" alt="" />

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import { pageMixin } from "~/assets/js/mixins";
export default {
    name: "help",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
        };
    },
    methods: {
        onClickBack() {
            this.$router.back();
        },
    },

}
</script>
<style lang="less" scoped>
.help {
    line-height: 24px;
    font-size: 14px;
    color: @text-color;
}
.part1 {
    color: @active-color;
}

.steps ul div {
    list-style: none;
}

.steps {
    margin: 20px;
    padding-left: 5px;
    position: relative;
}

.leftLine {
    border-left: 2px solid @recharge-bg-color6;
    padding-bottom: 20px;
}

.box1 {
    position: relative;
    padding-left: 40px;
    line-height: 18px;
    color: #999;
}

.steps div .node-icon {
    position: absolute;
    left: -15px;
    top: 0;
    line-height: 30px;
    width: 30px;
    height: 30px;
    text-align: center;
    background: @recharge-bg-color6;
    font-size: 18px;
    color: @recharge-font-color7;
    border-radius: 50%;
    padding: 0;
    border: 0;
}

.steps div .title {
    position: relative;
    margin-bottom: 20px;
    width: 250px;
    text-align: center;
    color: @theme-color2;
    font-size: 16px;
}

.steps div .txt {
    max-width: 600px;
    position: relative;
    top: 4px;
    display: inline-block;
    vertical-align: middle;
}
</style>