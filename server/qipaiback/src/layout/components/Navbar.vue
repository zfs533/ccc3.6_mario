<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <template v-if="device!=='mobile'">
                <search id="header-search" class="right-menu-item" />

                <error-log class="errLog-container right-menu-item hover-effect" />

                <screenfull id="screenfull" class="right-menu-item hover-effect" />

                <el-tooltip content="Global Size" effect="dark" placement="bottom">
                    <size-select id="size-select" class="right-menu-item hover-effect" />
                </el-tooltip>
                <span class="right-menu-item hover-effect">当前项目</span>
                <el-select class="right-menu-item hover-effect" v-model="curPid" placeholder="当前项目" @change="checkPlatform">
                    <el-option v-for="item in pidList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                </el-select>
            </template>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/index">
                        <el-dropdown-item>home</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';
import ErrorLog from '@/components/ErrorLog';
import Hamburger from '@/components/Hamburger';
import Search from '@/components/HeaderSearch';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import { getSession } from '@/utils/auth';
import { CURRENTPID, setCurrentPid } from '@/utils/myAsyncFn';
import { mapGetters } from 'vuex';
import { logout } from "../../api/user";

export default {
    components: {
        Breadcrumb,
        Hamburger,
        ErrorLog,
        Screenfull,
        SizeSelect,
        Search
    },
    data() {
        return {
            pidList: [],
            curPid: CURRENTPID,
        };
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'device'
        ])
    },
    created() {
        this.pidList = getSession("pidList");
        setCurrentPid();
        this.curPid = CURRENTPID;
    },
    methods: {
        async checkPlatform(param) {
            setCurrentPid(param);
            console.log('加载新平台:'+param);
            await Promise.all([
                this.$store.dispatch("baseData/setCategories",param),
                this.$store.dispatch("baseData/setTags",param)
            ]);
            
            // clientEvent.dispatchEvent(clientEvent.EVENT_TYPE.changePid);
             location.reload();
        },
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        async logout() {
            let res = await this.$http(logout);

            if (res.code === 200) {
                sessionStorage.clear();
                this.$router.push(`/login`);

                location.reload();
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: #000;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
