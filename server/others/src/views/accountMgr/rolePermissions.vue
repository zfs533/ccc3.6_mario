<template>
    <el-form :inline="false" class="formBox" label-position="right" label-width="120px">
        <el-form-item label="角色名">
            <el-input v-model="name" placeholder="请输入" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="项目">
            <el-select v-model="pidArr" multiple>
                <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="数据限制开关">
            <el-switch v-model="dataAuth"></el-switch>
        </el-form-item>
        <h3 style="margin-left:40px">权限设置</h3>
        <el-form-item>
            <el-tree ref="tree" show-checkbox node-key="id" :check-strictly="true" default-expand-all
                :props="defaultProps" :default-checked-keys="defaultKeys" :data="data"></el-tree>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitRole">提交</el-button>
        </el-form-item>
    </el-form>

</template>
<script>
import { createRole, privileges, updateRole } from '@/api/account';
import { getSession } from '@/utils/auth';
export default {
    props: {
        roleData: Object,
    },
    data() {
        return {
            data: [],//控件数据（改造后的权限数据）
            defaultKeys: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            name: "",
            pidArr: [],
            dataAuth: false,
            permissions: [],//权限原始结构数据
            chekedRoles: [],
            tmpData: [],
            type: 0, //0 新增 1编辑
            pidList: []
        };
    },
    async created() {

        await this.loadTemp();

        if (this.roleData && this.roleData.name) {
            this.type = 1;
            this.name = this.roleData.name;
            let permissions = this.roleData.permissions;
            this.setDefault(permissions);
            this.defaultKeys = JSON.parse(JSON.stringify(this.defaultKeys));
            this.pidArr = this.roleData.pidList;
            this.dataAuth = this.roleData.dataAuth;
        }
        else {
            this.type = 0;
            this.defaultKeys = JSON.parse('[]');

        }


    },
    methods: {
        setDefault(arr) {
            for (let i of arr) {
                this.defaultKeys.push(i.id);
                if (i.children) {
                    for (let j of i.children) {
                        this.defaultKeys.push(j.id);
                    }
                }
            }
        },
        async loadTemp() {
            let res = await this.$http(privileges);
            if (res.code === 200 && res.msg) {
                this.pidList = res.msg.pidList;
                this.permissions = res.msg.pages;
                this.data = this.digui(this.permissions);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        // handleCheckChange(data, checked, sub) {
        //     //通过控件数据操作改变权限原始结构数据
        //     let hasMenu = this.chekedRoles.some(i => i.id === data.id);
        //     if (!data.parentId && !hasMenu) {
        //         if (checked) {
        //             console.log(data, checked);
        //             this.chekedRoles.push({ id: data.id, name: data.name, children: [] });
        //         }
        //         else {
        //             let index = this.chekedRoles.find(i => i.id === data.id);
        //             if (index >= 0) {
        //                 delete this.chekedRoles[index];
        //             }
        //         }

        //     }
        //     else if (data.parentId) {
        //         let item = this.chekedRoles.find(i => i.id === data.parentId);
        //         let hasSub = item.children.some(i => i.id === data.id);
        //         if (!hasSub) {
        //             if (checked) {
        //                 item.children.push({ id: data.id, name: data.name });
        //             }
        //             else {
        //                 let index = item.children.find(i => i.id === data.id);
        //                 if (index >= 0) {
        //                     delete item.children[index];
        //                 }
        //             }

        //         }

        //     }
        //     // console.log(data, "&&&&&&&&&&&");

        // },
        async submitRole() {
            if (this.pidArr.length == 0) {
                // this.$message.error("请选择项目");
                // return;
                this.pidArr = [];
            }
            let chekedRoles = this.$refs.tree.getCheckedNodes();
            let newRoles = [];
            chekedRoles.forEach((item, index) => {
                if (!item.parentId) {
                    newRoles.push({ id: item.id, name: item.name, children: [] });
                }
                else {
                    let idx = newRoles.findIndex(i => i.id === item.parentId);
                    if (idx >= 0) {
                        newRoles[idx].children.push({ id: item.id, name: item.name });
                    }
                }
            });
            let parentName = getSession("role").name;
            let query = {
                name: this.name,
                // parentName: parentName || undefined,
                pages: JSON.stringify(newRoles),
                pidList: this.pidArr,
                dataAuth: this.dataAuth
            };
            let res = {};
            if (this.type === 0) {
                res = await this.$http(createRole, query);
            }
            else if (this.type === 1) {
                query.id = this.roleData.id;
                res = await this.$http(updateRole, query);
            }
            if (res.code === 200) {
                this.$message.success("操作成功");
                this.$emit('close');
            }
        },
        digui(arr, parentId) {
            return arr.map((item, index) => {
                let obj = {};
                if (item.children) {
                    obj.children = this.digui(item.children, item.id);

                }
                // obj.index = thisIndex.toString();
                if (parentId) {
                    obj.parentId = parentId;
                }
                obj.id = item.id;
                obj.name = item.name;

                return obj;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.formBox {
    height: 600px;
    overflow-y: auto;
}
</style>