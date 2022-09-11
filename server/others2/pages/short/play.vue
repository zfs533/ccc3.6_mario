<template>
    <div class="full-container">
        <player ref="player" :tabbar="false" />
        <div class="flex-safe-bottom"></div>
    </div>
</template>
<script> 
import { pageMixin } from "~/assets/js/mixins";
import player from './player.vue';
export default {
    name: 'shortPlay',
    layout: 'keepalive',
    components: {
        player
    },
    mixins: [pageMixin],
    data() {
        return {
        };
    },
    created() {
        console.log("short play created");
    },
    mounted() {
        console.log("short play mounted");
        this.$parent.showTabbar = false;

        document.documentElement.classList.remove("safe-top");

        this.$refs.player.updateHeight();
    },
    activated() {
        console.log("short play activated");
        this.$parent.showTabbar = false;

        document.documentElement.classList.remove("safe-top");
        document.documentElement.classList.add("short-view");
        this.$refs.player.updateHeight();
    },

    deactivated() {
        document.documentElement.classList.add("safe-top");
        document.documentElement.classList.remove("short-view");
    }
}
</script>

<style lang="less" scoped>
.flex-safe-bottom {
    height: var(--safe-bottom);
    position: fixed;
    width: 100%;
    background: @bottom-bar-color;
    bottom: 0;
}
</style>