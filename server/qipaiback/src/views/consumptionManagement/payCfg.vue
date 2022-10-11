<template>
    <el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="vip配置" name="first">
                <vipCfg :payTypes="payTypes" />
            </el-tab-pane>
            <el-tab-pane label="钻石配置" name="second">
                <diamondCfg :payTypes="diamondPayTypes" />
            </el-tab-pane>
            <el-tab-pane label="充值通道" name="three">
                <payChannels :payTypes="payTypes" />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import { PayTypesEnum } from '@/utils/baseConst';
import diamondCfg from './components/diamondCfg.vue';
import payChannels from './components/payChannels.vue';
import vipCfg from './components/vipCfg.vue';
export default {
    components: {
        diamondCfg,
        payChannels,
        vipCfg,
    },
    data() {

        return {
            activeName: "first",
            payTypes: [],
            diamondPayTypes: [],
            payTypesEnum:PayTypesEnum,
        };
    },
    async created() {
        this.payTypes=this.payTypesEnum;
        this.diamondPayTypes = this.payTypesEnum.filter(function (value, index, arr) {
            return value.value != "diamond_pay";
        });
    }
};
</script>