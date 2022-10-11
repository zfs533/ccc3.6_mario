<template>
    <el-form class="right" style="width:400px">
        <el-form-item label="合作方式">
            <el-select :disabled="(readOnlyVal || canChangetype)" v-model="type" placeholder="CPA/CPS/CPT" style="width:100%;" @change="onChange">
                <el-option v-for=" (item ,index) in ChannelCooperationTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-card class="typeCard" v-if="type == 'CPA'">
            <el-form label-position="top" label-width="82px">
                <el-form-item label="渠道单价">
                    <el-input :disabled="readOnlyVal" v-model="formData.price" style="width:150px;margin-right:5px;" />
                    <el-button v-if="!readOnlyVal" type="primary" style="float:right;margin-left:30px" @click="insertChannel(1)">保存</el-button>
                    <el-button v-if="!readOnlyVal" type="primary" style="float:right;margin-left:30px" @click="addCfg(1)">添加</el-button>
                </el-form-item>
                <div style="overflow-y:auto;height:270px">
                    <el-form-item label="注册数量">
                        <span style="color:#f00">
                            不在范围内，则不扣量
                        </span>
                        <div v-for="(item,index) in formData.config" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                            <el-input :disabled="readOnlyVal" style="width:6em;" v-model="item.value" />
                            <div style="width:10px;background-color:#000;height:1px" />
                            <el-input :value="formData.config[index+1] ? (formData.config[index+1].value -0 - 1) +'' :'∞'" disabled style="width:6rem;" />
                            <span style="padding:0px 10px">扣量比</span>
                            <el-input :disabled="readOnlyVal" v-model="item.rate" style="width:4rem;" />
                            <i class="el-icon-delete" v-if="!readOnlyVal" @click="delCfg(1,index)" style="margin-left:10px;color:#005CF9"></i>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="typeCard" v-if="type == 'CPS'">
            <el-form label-position="top" label-width="82px">
                <el-form-item label="渠道分成">
                    <el-input :disabled="readOnlyVal" v-model="formData.price" style="width:150px;margin-right:5px;" />
                    <el-button v-if="!readOnlyVal" type="primary" style="float:right;margin-left:30px" @click="insertChannel(2)">保存</el-button>
                    <el-button v-if="!readOnlyVal" type="primary" style="float:right;margin-left:30px" @click="addCfg(2)">添加</el-button>
                </el-form-item>
                <div style="overflow-y:auto;height:270px">
                    <el-form-item label="充值">
                        <div v-for="(item,index) in formData.config" :key="index" style="display:flex;align-items:center;margin-bottom:10px">
                            达到
                            <el-input :disabled="readOnlyVal" v-model="item.value" style="margin-left:10px;width:6rem;" />
                            <span style="padding:0px 10px">扣量比</span>
                            <el-input :disabled="readOnlyVal" v-model="item.rate" style="width:4rem;" />
                            <i class="el-icon-delete" v-if="!readOnlyVal" @click="delCfg(2,index)" style="margin-left:10px;color:#005CF9"></i>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="typeCard" v-if="type == 'CPT'">
            <el-form label-position="top" label-width="82px">
                <el-form-item label="CPT投放周期(Day)">
                    <el-input :disabled="readOnlyVal" v-model="formData.deliveryCycle" />
                </el-form-item>
                <el-form-item label="CPT投放金额">
                    <el-input :disabled="readOnlyVal" v-model="formData.price" />
                </el-form-item>
                <el-button v-if="!readOnlyVal" type="primary" style="float:right;margin-left:30px" @click="insertChannel(3)">保存</el-button>
            </el-form>
        </el-card>
    </el-form>
</template>

<script>
import { ChannelCooperationTypeList } from '@/utils/channelShield';
import { deepClone } from '@/utils/formatter';
export default {
    props: {
        cooperationType: "",
        dataVal: {},
        btnCallBack: Function,
        _readOnly: true,
        _canChangetype: true,
    },
    data() {

        let data2 = this.dataVal ? deepClone(this.dataVal) : { config: [] };
        return {
            type: this.cooperationType,
            formData: data2,
            ChannelCooperationTypeList: ChannelCooperationTypeList,

            readOnlyVal: this._readOnly ? true : false,

            canChangetype: this._canChangetype ? true : false,

            callBack: this.btnCallBack,


        };
    },

    watch: {
        cooperationType(newVal) {
            this.type = newVal; //对父组件传过来的值进行监听，如果改变也对子组件内部的值进行改变
        },
        dataVal(newVal) {
            let data2 = newVal ? deepClone(newVal) : { config: [] };
            this.formData = data2;
        },
        _readOnly(newVal) {
            this.readOnlyVal = newVal ? true : false;
        },
        btnCallBack(newVal) {
            this.callBack = newVal;
        },
        _canChangetype(newVal) {
            this.canChangetype = newVal;
        },


    },

    methods: {
        insertChannel() {
            if (this.callBack) {
                this.callBack(this.type, this.formData);

            }
        },

        onChange(data) {
            if (data == "CPA") {
                this.formData = { config: [] };
            }
            if (data == "CPS") {
                this.formData = { config: [] };
            }
            if (data == "CPT") {
                this.formData = {};
            }
        },

        addCfg(type) {


            let item = { rate: 0, value: 0 };
            this.formData.config.push(item);


        },

        delCfg(type, index) {
            this.formData.config.splice(index, 1);

        },
    }
}
</script>

<style>
</style>