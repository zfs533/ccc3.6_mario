<template>
    <div class="loading">
        <van-popup v-model="show" :closeOnClickOverlay="false">
            <van-loading size="40px" type="circular" vertical text-size="15px" color="#ddd">Loading...</van-loading>
        </van-popup>
    </div>
</template>



<script>

export default {
    data() {
        return {
            show: true
        };
    }

}

</script>


<style lang="less">
.loading {
    .van-popup {
        background: transparent;
    }
}
</style>