<template>
    <div class="emptybox">
        <div class="pic">
            <img src="~/assets/img/empty.png" alt="" />
        </div>
        <div class="text">空空乳液</div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.emptybox {
    width: 100%;
    padding-top: 70px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.emptybox .pic {
    width: 100%;
    text-align: center;
}
.emptybox .pic img {
    width: 30%;
    border: none;
    vertical-align: top;
}
.emptybox .text {
    text-align: center;
    font-size: 14px;
    color: #808184;
    margin-top: 20px;
}
</style>