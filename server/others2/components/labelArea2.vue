 <template>
    <div class="wrapper">
        <input :id="input_id" class="exp" type="checkbox">
        <div class="text">
            <label class="btn" :for="input_id"></label>
            <slot>
            </slot>
        </div>
    </div>

</template>
 
 <script>
export default {
    props: {
        id: '',
    },

    data() {
        return {
            input_id: "ext-" + this.id,
            checked: false,

        };
    }

}
 </script>
 
<style lang="less" scoped>
.wrapper {
    display: flex;
    overflow: hidden;
    padding: 0 5px;
    color: @text-color;
}
.text {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    position: relative;
    line-height: 24px;
    max-height: 72px;
    transition: 0.3s max-height;
}

.text::before {
    content: "";
    // height: calc(100% - 24px);
    height: 100%;
    margin-bottom: -24px;
    float: right;
}
.text::after {
    content: "";
    width: 999vw;
    height: 999vh;
    position: absolute;
    box-shadow: inset calc(100px - 999vw) calc(24px - 999vh) 0 0 @content-color;
    margin-left: -100px;
}
.btn {
    position: relative;
    float: right;
    clear: both;
    margin-left: 20px;
    font-size: 16px;
    padding: 0 8px;
    line-height: 24px;
    border-radius: 4px;
    color: @button-color;
    cursor: pointer;
}
.btn::after {
    content: "展开";
}
.exp {
    display: none;
}
.exp:checked + .text {
    max-height: none;
}
.exp:checked + .text::after {
    visibility: hidden;
}
.exp:checked + .text .btn::before {
    visibility: hidden;
}
.exp:checked + .text .btn::after {
    content: "收起";
}
.btn::before {
    content: "...";
    position: absolute;
    left: -5px;
    color: @text-color;
    transform: translateX(-100%);
}
</style>