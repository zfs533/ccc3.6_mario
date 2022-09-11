

<template>
    <div class="text">
        {{realText}}
        <span class="span">
            {{realText}}
        </span>
        <span @click="onClick" v-if="line > 3 && !state">...</span><span id="collapse-btn" class="collapse-text" data-spread="false"> 展开</span>
        <span @click="onClick" v-if="line > 3 && state" class="collapse-text" data-spread="true">收起</span>
    </div>
</template>

    <script>

export default {

    props: {
        text: ''
    },


    data() {
        return {
            realText: this.text,
            line: 0,
            state: false,
            spanText: null,

        };
    },
    methods: {

        getLength(rects) {

            var line = 0, lastBottom = 0;
            for (var i = 0, len = rects.length; i < len; i++) {
                if (rects[i].bottom == lastBottom) {
                    continue;
                }
                lastBottom = rects[i].bottom;
                line++;
            }
            return line;
        },

        onClick(event) {
            console.log('event = ', event);
            this.state = !this.state;

            return;
            var state = event.dataset.spread;
            if (state === 'false') {
                span1.innerHTML = originalText + '<span id="collapse-btn" class="collapse-text" data-spread="true">收起</span>';
            } else {
                span1.innerHTML = changeText + '<span>...</span><span id="collapse-btn" class="collapse-text" data-spread="false"> 展开</span>';
            }
        }

    },
    mounted() {

        // console.log('this = ', this);

        // 初始化变量定义、赋值
        // var span1 = document.getElementsByClassName('span')[0];
        // return;
        var span1 = this.$el.children[0];
        console.log('span1 = ', span1);
        var originalText = span1.innerHTML; // 源数据存储变量
        var changeText = span1.innerHTML;	// 计算数据变量
        var span1Rects = span1.getClientRects();
        console.log('span1Rects = ', span1Rects);
        this.line = this.getLength(span1Rects); //行数
        return;

        // 预设函数：3
        while (this.line > 3) {
            var step = 1;
            changeText = changeText.slice(0, -step);
            // span1.innerHTML = changeText;// + '<span>...</span><span id="collapse-btn" class="collapse-text" data-spread="false"> 展开</span>';
            this.line = this.getLength(span1.getClientRects());
        }


    },
}
    </script>


<style lang="less" scoped>
.text {
    margin: 0 auto;
    width: 200px;
    background: #ffffff;
    color: #606266;
    word-break: break-word;
    padding: 10px 15px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
}
.collapse-text {
    color: #409eff;
    cursor: pointer;
}
.collapse-text:active {
    color: #3a8ee6;
}
</style>