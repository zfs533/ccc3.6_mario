<template>
    <div class="btnListBox">
        <section>
            <div class="btnList">
                <div :class="addClass(index)" v-for="(title,index) in titles" :key="index" @click="onClickBtn(index)">{{title}}</div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "btnlistbox",
    props: {
        callBack: { type: Function }
    },
    data() {
        return {
            titles: ["全部", "只看长视频", "只看短视频"],
            curIndex: 0,
            mCallBack: this.callBack
        };
    },
    methods: {
        onClickBtn(index) {
            this.curIndex = index;
            this.mCallBack(index);
        },
        addClass(index) {
            if (index == this.curIndex) {
                return "choosebtn active";
            } else {
                return "choosebtn";
            }
        }
    }
}

</script>

<style lang="less" scoped>
.btnListBox {
    padding: 0 0rem;
}
.btnList {
    padding: 0.2rem 0.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.04rem;
    /* background: @theme-color; */
}
.choosebtn {
    padding: 0.1rem 0.2rem;
    background: @content-color;
    color: @text-color;
    font-size: 0.35rem;
    text-align: center;
    border-radius: 3px;
    margin-right: 0.4rem;
    cursor: pointer;
}
.active {
    background: @button-color;
    color: #fff;
}
</style>