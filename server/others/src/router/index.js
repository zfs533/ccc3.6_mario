/* Layout */
import Layout from '@/layout';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/dashboard',
    //     children: [
    //         {
    //             path: 'dashboard',
    //             component: () => import('@/views/dashboard/index'),
    //             name: 'Dashboard',
    //             meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    //         }
    //     ]
    // },
    // {
    //   path: '/documentation',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/documentation/index'),
    //       name: 'Documentation',
    //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
    //     }
    //   ]
    // },
    // {
    //   path: '/guide',
    //   component: Layout,
    //   redirect: '/guide/index',
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/guide/index'),
    //       name: 'Guide',
    //       meta: { title: 'Guide', icon: 'guide', noCache: true }
    //     }
    //   ]
    // },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/profile/index'),
                name: 'Profile',
                meta: { title: 'Profile', icon: 'user', noCache: true }
            }
        ]
    }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRouterMap = [
    /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,
    {
        path: '/home',
        component: Layout,
        redirect: '/home/home_adminHome',
        alwaysShow: true, // will always show the root menu
        name: 'home',
        meta: {
            title: '首页',
            icon: 'el-icon-s-home'
        },
        children: [
            {
                path: 'home_adminHome',
                component: () => import('@/views/home/adminHome'),
                name: 'home_adminHome',
                meta: { title: '首页' }
            },
            {
                path: 'home_adminPHome',
                component: () => import('@/views/home/adminPHome'),
                name: 'home_adminPHome',
                meta: { title: '首页' }
            }
        ]
    },
    {
        path: '/dataStatic',
        component: Layout,
        redirect: '/dataStatic/dataStatic_gDaySumInfo',
        alwaysShow: true, // will always show the root menu
        name: 'dataStatic',
        meta: {
            title: '数据统计',
            icon: 'el-icon-s-data'
        },
        children: [
            {
                path: 'dataStatic_gDaySumInfo',
                component: () => import('@/views/dataStatic/gDaySumInfo'),
                name: 'dataStatic_gDaySumInfo',
                meta: { title: '数据总汇' }
            },
            {
                path: 'dataStatic_channelStatistics',
                component: () => import('@/views/dataStatic/channelStatistics.vue'),
                name: 'dataStatic_channelStatistics',
                meta: { title: '渠道统计' }
            },
            {
                path: 'dataStatic_dailyRecharge',
                component: () => import('@/views/dataStatic/dailyRecharge.vue'),
                name: 'dataStatic_dailyRecharge',
                meta: { title: '充值每日数据' }
            },
            {
                path: 'dataStatic_todayUsers',
                component: () => import('@/views/dataStatic/todayUsers.vue'),
                name: 'dataStatic_todayUsers',
                meta: { title: '用户每日数据' }
            },
            {
                path: 'dataStatic_todayVideos',
                component: () => import('@/views/dataStatic/todayVideos.vue'),
                name: 'dataStatic_todayVideos',
                meta: { title: '视频每日数据' }
            },
            {
                path: 'dataStatic_cpGuardStat',
                component: () => import('@/views/dataStatic/cpGuardStat.vue'),
                name: 'dataStatic_cpGuardStat',
                meta: { title: '落地页统计' }
            },
            {
                path: 'dataStatic_reletionsStat',
                component: () => import('@/views/dataStatic/reletionsStat.vue'),
                name: 'dataStatic_reletionsStat',
                meta: { title: '每日留存统计' }
            },
            {
                path: 'dataStatic_hotWordsStat',
                component: () => import('@/views/dataStatic/hotWordsStat.vue'),
                name: 'dataStatic_hotWordsStat',
                meta: { title: '热搜统计' }
            },
        ]
    },
    {
        path: '/videoManager',
        component: Layout,
        redirect: '/videoManager/videoManager_resource',
        alwaysShow: true,
        name: 'videoManager',
        meta: {
            title: '内容管理',
            icon: 'el-icon-video-camera-solid'
        },
        children: [
            {
                path: 'videoManager_verify',
                component: () => import('@/views/videoManager/verify.vue'),
                name: 'videoManager_verify',
                meta: { title: '视频资源库' }
            },
            {
                path: 'videoManager_resource',
                component: () => import('@/views/videoManager/resource.vue'),
                name: 'videoManager_resource',
                meta: { title: '线上视频' }
            },
        
            {
                path: 'videoManager_material',
                component: () => import('@/views/videoManager/resource.vue'),
                name: 'videoManager_resource_material',
                meta: { title: '线上视频(素材)' }
            },
            {
                path: 'videoManager_resourceAtlas',
                component: () => import('@/views/videoManager/resourceAtlas.vue'),
                name: 'videoManager_resourceAtlas',
                meta: { title: '图集资源' }
            },

            {
                path: 'videoManager_Tag',
                component: () => import('@/views/videoManager/tags.vue'),
                name: 'videoManager_Tag',
                meta: { title: '标签管理' }
            },
            {
                path: 'videoManager_classification',
                component: () => import('@/views/videoManager/classification.vue'),
                name: 'videoManager_classification',
                meta: { title: '基本分类配置' }
            },
            {
                path: 'videoManager_classificationVIP',
                component: () => import('@/views/videoManager/classification.vue'),
                name: 'videoManager_classificationVIP',
                meta: { title: 'vip分类配置' }
            },
            {
                path: 'videoManager_classificationCollection',
                component: () => import('@/views/videoManager/classification.vue'),
                name: 'videoManager_classificationCollection',
                meta: { title: '专题分类配置' }
            },
            {
                path: 'videoManager_classificationAv',
                component: () => import('@/views/videoManager/classification.vue'),
                name: 'videoManager_classificationAv',
                meta: { title: 'Av分类配置' }
            },
            {
                path: 'videoManager_classificationFeed',
                component: () => import('@/views/videoManager/classification.vue'),
                name: 'videoManager_classificationFeed',
                meta: { title: 'feed分类配置' }
            },
            {
                path: 'videoManager_categorySort',
                component: () => import('@/views/videoManager/categorySort.vue'),
                name: 'videoManager_categorySort',
                meta: { title: '视频分类排序' }
            },
            {
                path: 'videoManager_comments',
                component: () => import('@/views/videoManager/commentsAudit.vue'),
                name: 'videoManager_comments',
                meta: { title: '评论审核' }
            },
        ]
    },
    {
        path: '/usersManager',
        component: Layout,
        redirect: '/usersManager/accountManager_accounts',
        alwaysShow: true,
        name: 'usersManager',
        meta: {
            title: '用户管理',
            icon: 'el-icon-set-up'
        },
        children: [
            {
                path: 'usersManager_usersList',
                component: () => import('@/views/usersManager/usersList.vue'),
                name: 'usersManager_usersList',
                meta: { title: '用户列表' }
            },
            {
                path: 'usersManager_customer',
                component: () => import('@/views/usersManager/usersList.vue'),
                name: 'kefu_usersManager_customer',
                meta: { title: '用户列表(客服)' }
            },
            {
                path: 'usersManager_usersVideoHistory',
                component: () => import('@/views/usersManager/usersVideoHistory.vue'),
                name: 'usersManager_usersVideoHistory',
                meta: { title: '用户观影记录' }
            },
            {
                path: 'usersManager_blogger',
                component: () => import('@/views/usersManager/blogger.vue'),
                name: 'usersManager_blogger',
                meta: { title: 'UP主管理' }
            },

        ]
    },
    {
        path: '/accountManager',
        component: Layout,
        redirect: '/accountManager/accountManager_accounts',
        alwaysShow: true,
        name: 'accountManager',
        meta: {
            title: '账号管理',
            icon: 'el-icon-user'
        },
        children: [
            {
                path: 'accountManager_accounts',
                component: () => import('@/views/accountMgr/accountMgr'),
                name: 'accountManager_accounts',
                meta: { title: '账号信息' }
            },
            {
                path: 'accountManager_adminGoogleAuth',
                component: () => import('@/views/accountMgr/adminGoogleAuth.vue'),
                name: 'accountManager_adminGoogleAuth',
                meta: { title: '谷歌验证' }
            },
            {
                path: 'accountManager_roles',
                component: () => import('@/views/accountMgr/roleMgr.vue'),
                name: 'accountManager_roles',
                meta: { title: '角色编辑' }
            }

        ]
    },
    {
        path: '/adminCfg',
        component: Layout,
        redirect: '/adminCfg/adminCfg_allowLoginIp',
        alwaysShow: true,
        name: 'adminCfg',
        meta: {
            title: '后台配置',
            icon: 'el-icon-setting'
        },
        children: [
            {
                path: 'adminCfg_allowLoginIp',
                component: () => import('@/views/adminCfg/allowLoginIp'),
                name: 'adminCfg_allowLoginIp',
                meta: { title: '后台登录白名单' }
            },
            {
                path: 'adminCfg_setCrossDomain',
                component: () => import('@/views/adminCfg/setCrossDomain.vue'),
                name: 'adminCfg_setCrossDomain',
                meta: { title: '配置跨域域名' }
            },
            {
                path: 'serverConfigure_screct',
                component: () => import('@/views/adminCfg/globalCfg.vue'),
                name: 'serverConfigure_screct',
                meta: { title: '全局配置' }
            },
            {
                path: 'adminCfg_dataCfg',
                component: () => import('@/views/adminCfg/dataCfg.vue'),
                name: 'adminCfg_dataCfg',
                meta: { title: '数据配置' }
            },
        ]
    },
    {
        path: '/logsManager',
        component: Layout,
        redirect: '/logsManager/logsManager_serverCfg',
        alwaysShow: true, // will always show the root menu
        name: 'logsManager',
        meta: {
            title: '日志管理',
            icon: 'el-icon-document'
        },
        children: [
            {
                path: 'logsManager_ad',
                component: () => import('@/views/logsManager/ad.vue'),
                name: 'logsManager_ad',
                meta: { title: '广告日志' }
            },
            {
                path: 'logsManager_backstageLoginlog',
                component: () => import('@/views/logsManager/backstageLoginlog.vue'),
                name: 'logsManager_backstageLoginlog',
                meta: { title: '后台登录日志' }
            },
            {
                path: 'logsManager_login',
                component: () => import('@/views/logsManager/userLoginLog.vue'),
                name: 'logsManager_login',
                meta: { title: '用户登录日志' }
            },
            {
                path: 'logsManager_register',
                component: () => import('@/views/logsManager/registerLog.vue'),
                name: 'logsManager_register',
                meta: { title: '用户注册日志' }
            },
            {
                path: 'logsManager_bind',
                component: () => import('@/views/logsManager/bindLog.vue'),
                name: 'logsManager_bind',
                meta: { title: '用户绑定日志' }
            },
            {
                path: 'logsManager_serverCfg',
                component: () => import('@/views/logsManager/serverCfg.vue'),
                name: 'logsManager_serverCfg',
                meta: { title: '配置修改记录' }
            },
            {
                path: 'logsManager_createUser',
                component: () => import('@/views/logsManager/createUser.vue'),
                name: 'logsManager_createUser',
                meta: { title: '后台创建用户记录' }
            },
            {
                path: 'logsManager_videoLikedCnt',
                component: () => import('@/views/logsManager/videoLikedCnt.vue'),
                name: 'logsManager_videoLikedCnt',
                meta: { title: '视频点赞记录' }
            },
            {
                path: 'logsManager_videoPlayCnt',
                component: () => import('@/views/logsManager/videoPlayCnt.vue'),
                name: 'logsManager_videoPlayCnt',
                meta: { title: '视频播放记录' }
            },
            {
                path: 'logsManager_videoCollectedCnt',
                component: () => import('@/views/logsManager/videoCollectedCnt.vue'),
                name: 'logsManager_videoCollectedCnt',
                meta: { title: '视频收藏记录' }
            },
            {
                path: 'logsManager_ExchangeCodeRecord',
                component: () => import('@/views/logsManager/exchangeCodeRecord.vue'),
                name: 'logsManager_ExchangeCodeRecord',
                meta: { title: '兑换码兑换记录' }
            },
            {
                path: 'logsManager_auditLogs',
                component: () => import('@/views/logsManager/auditLogs.vue'),
                name: 'logsManager_auditLogs',
                meta: { title: '审核记录' }
            },
            {
                path: 'logsManager_export',
                component: () => import('@/views/logsManager/export.vue'),
                name: 'logsManager_export',
                meta: { title: '导出管理' }
            }
        ]
    },
    {
        path: '/consumptionManagement',
        component: Layout,
        redirect: '/consumptionManagement/consumptionManagement_payCfg',
        alwaysShow: true, // will always show the root menu
        name: 'consumptionManagement',
        meta: {
            title: '消费管理',
            icon: 'el-icon-money'
        },
        children: [
            {
                path: 'consumptionManagement_payCfg',
                component: () => import('@/views/consumptionManagement/payCfg.vue'),
                name: 'consumptionManagement_payCfg',
                meta: { title: '支付配置' }
            },
            /*  {
                 path: 'consumptionManagement_vip',
                 component: () => import('@/views/consumptionManagement/vip.vue'),
                 name: 'consumptionManagement_vip',
                 meta: { title: 'vip卡配置' }
             },
             {
                 path: 'consumptionManagement_diamond',
                 component: () => import('@/views/consumptionManagement/diamond.vue'),
                 name: 'consumptionManagement_diamond',
                 meta: { title: '钻石售卖配置' }
             },
             {
                 path: 'consumptionManagement_code',
                 component: () => import('@/views/consumptionManagement/code.vue'),
                 name: 'consumptionManagement_code',
                 meta: { title: '兑换码配置' }
             }, */
            {
                path: 'consumptionManagement_rechargeBalanceLimit',
                component: () => import('@/views/consumptionManagement/rechargeBalanceLimit.vue'),
                name: 'consumptionManagement_rechargeBalanceLimit',
                meta: { title: '外部充值预警配置' }
            },
            {
                path: 'consumptionManagement_rechargeRepeat',
                component: () => import('@/views/consumptionManagement/rechargeRepeat.vue'),
                name: 'consumptionManagement_rechargeRepeat',
                meta: { title: '支付回调' }
            },
            {
                path: 'consumptionManagement_recharge',
                component: () => import('@/views/consumptionManagement/recharge.vue'),
                name: 'consumptionManagement_recharge',
                meta: { title: '充值订单' }
            },
            {
                path: 'consumptionManagement_videos',
                component: () => import('@/views/consumptionManagement/videosOder.vue'),
                name: 'consumptionManagement_videos',
                meta: { title: '视频订单' }
            },
        ]
    },
    {
        path: '/withDrawMgr',
        component: Layout,
        redirect: '/withDrawMgr/withDrawMgr_cfg',
        alwaysShow: true, // will always show the root menu
        name: 'withDrawMgr',
        meta: {
            title: '兑换管理',
            icon: 'el-icon-money'
        },
        children: [
            {
                path: 'withDrawMgr_cfg',
                component: () => import('@/views/withDrawMgr/cfg.vue'),
                name: 'withDrawMgr_cfg',
                meta: { title: '兑换配置' }
            },
            {
                path: 'withDrawMgr_orders',
                component: () => import('@/views/withDrawMgr/orders.vue'),
                name: 'withDrawMgr_orders',
                meta: { title: '兑换订单' }
            }
        ]
    },
    {
        path: '/serverConfigure',
        component: Layout,
        redirect: '/serverConfigure/serverConfigure_allowLoginIp',
        alwaysShow: true, // will always show the root menu
        name: 'serverConfigure',
        meta: {
            title: '应用配置',
            icon: 'el-icon-setting'
        },
        children: [
            {
                path: 'serverConfigure_advertise',
                component: () => import('@/views/serverConfigure/advertise.vue'),
                name: 'serverConfigure_advertise',
                meta: { title: '广告管理' }
            },
            {
                path: 'serverConfigure_inviteRewardCfg',
                component: () => import('@/views/serverConfigure/inviteRewardCfg.vue'),
                name: 'serverConfigure_inviteRewardCfg',
                meta: { title: '邀请奖励配置' }
            },
            {
                path: 'serverConfigure_screct',
                component: () => import('@/views/serverConfigure/screct.vue'),
                name: 'serverConfigure_screct',
                meta: { title: '系统设置' }
            },
            {
                path: 'serverConfigure_content',
                component: () => import('@/views/serverConfigure/sensitive.vue'),
                name: 'serverConfigure_content',
                meta: { title: '文本过滤' }
            }, {
                path: 'serverConfigure_smsCfg',
                component: () => import('@/views/serverConfigure/smsCfg.vue'),
                name: 'serverConfigure_smsCfg',
                meta: { title: '短信配置' }
            }, {
                path: 'serverConfigure_smsCodeWhitelist',
                component: () => import('@/views/serverConfigure/smsCodeWhitelist.vue'),
                name: 'serverConfigure_smsCodeWhitelist',
                meta: { title: '短信白名单' }
            },
            {
                path: 'serverConfigure_csCfg',
                component: () => import('@/views/serverConfigure/csCfg.vue'),
                name: 'serverConfigure_csCfg',
                meta: { title: '客服配置' }
            },
            {
                path: 'serverConfigure_ExchangeCodeCfg',
                component: () => import('@/views/serverConfigure/exchangeCodeCfg.vue'),
                name: 'serverConfigure_ExchangeCodeCfg',
                meta: { title: '兑换码配置' }
            },
            {
                path: 'serverConfigure_userInitDataCfg',
                component: () => import('@/views/serverConfigure/userInitDataCfg.vue'),
                name: 'serverConfigure_userInitDataCfg',
                meta: { title: '用户初始配置' }
            },
            {
                path: 'serverConfigure_vipLevelPrivilegesCfg',
                component: () => import('@/views/serverConfigure/vipLevleProvoleges.vue'),
                name: 'serverConfigure_vipLevelPrivilegesCfg',
                meta: { title: 'vip等级配置' }
            },
            {
                path: 'serverConfigure_clientRes',
                component: () => import('@/views/serverConfigure/clientRes.vue'),
                name: 'serverConfigure_clientRes',
                meta: { title: '前端资源' }
            }
        ]
    },
    {
        path: '/channelMgr',
        component: Layout,
        redirect: '/channelMgr_channelList',
        alwaysShow: true, // will always show the root menu
        name: 'channelMgr',
        meta: {
            title: '渠道管理',
            icon: 'el-icon-s-cooperation'
        },
        children: [
            {
                path: 'channelMgr_channelList',
                component: () => import('@/views/channelMgr/channelList.vue'),
                name: 'channelMgr_channelList',
                meta: { title: '渠道列表' }
            },
            {
                path: 'channelMgr_urlMaintenance',
                component: () => import('@/views/channelMgr/urlMaintenance.vue'),
                name: 'channelMgr_urlMaintenance',
                meta: { title: '域名维护' }
            },
            {
                path: 'channelMgr_partner',
                component: () => import('@/views/channelMgr/partner.vue'),
                name: 'channelMgr_partner',
                meta: { title: '渠道归属人' }
            },
            {
                path: 'channelMgr_accountMgr',
                component: () => import('@/views/channelMgr/accountMgr.vue'),
                name: 'channelMgr_accountMgr',
                meta: { title: '渠道账号' }
            },
            {
                path: 'channelMgr_channelPage',
                component: () => import('@/views/channelMgr/channelPage.vue'),
                name: 'channelMgr_channelPage',
                meta: { title: '落地页页面' }
            },
            {
                path: 'channelMgr_cooperationLog',
                component: () => import('@/views/channelMgr/cooperationLog.vue'),
                name: 'channelMgr_cooperationLog',
                meta: { title: '合作配置修改记录' }
            },
            {
                path: 'channelMgr_channelActLoginRest',
                component: () => import('@/views/channelMgr/channelActLoginRest.vue'),
                name: 'channelMgr_channelActLoginRest',
                meta: { title: '渠道验证重置' }
            },

        ]
    },
    {
        path: '/activityCfg',
        component: Layout,
        redirect: '/activityCfg_activityList',
        alwaysShow: true, // will always show the root menu
        name: 'activityCfg',
        meta: {
            title: '活动管理',
            icon: 'peoples'
        },
        children: [
            {
                path: 'activityCfg_taskManager',
                component: () => import('@/views/activityCfg/taskManager.vue'),
                name: 'activityCfg_taskManager',
                meta: { title: '任务管理' }
            },
            {
                path: 'activityCfg_newUserLimitDate',
                component: () => import('@/views/activityCfg/newUserLimitDate.vue'),
                name: 'activityCfg_newUserLimitDate',
                meta: { title: '新人限时活动' }
            },
            {
                path: 'activityCfg_signIn',
                component: () => import('@/views/activityCfg/signInManager.vue'),
                name: 'activityCfg_signIn',
                meta: { title: '签到活动' }
            },
        ]
    },
    {
        path: '/promoteMgr',
        component: Layout,
        redirect: '/promoteMgr_promoteMgrList',
        alwaysShow: true, // will always show the root menu
        name: 'promoteMgr',
        meta: {
            title: '推广管理',
            icon: 'el-icon-attract'
        },
        children: [
            {
                path: 'promoteMgr_promoteCfg',
                component: () => import('@/views/promoteMgr/promoteCfg.vue'),
                name: 'promoteMgr_promoteCfg',
                meta: { title: '推广配置' }
            },
            {
                path: 'promoteMgr_promoteAudit',
                component: () => import('@/views/promoteMgr/promoteAudit.vue'),
                name: 'promoteMgr_promoteAudit',
                meta: { title: '推广申请' }
            },
            {
                path: 'promoteMgr_promoterMgr',
                component: () => import('@/views/promoteMgr/promoterMgr.vue'),
                name: 'promoteMgr_promoterMgr',
                meta: { title: '推广用户管理' }
            },
            {
                path: 'promoteMgr_promoterWithDraw',
                component: () => import('@/views/promoteMgr/promoterWithDraw.vue'),
                name: 'promoteMgr_promoterWithDraw',
                meta: { title: '推广提现审核' }
            },
            {
                path: 'promoteMgr_promoteLog',
                component: () => import('@/views/promoteMgr/promoteLog.vue'),
                name: 'promoteMgr_promoteLog',
                meta: { title: '推广记录' }
            },
            {
                path: 'promoteMgr_promoterIncomeLog',
                component: () => import('@/views/promoteMgr/promoterIncomeLog.vue'),
                name: 'promoteMgr_promoterIncomeLog',
                meta: { title: '推广收益记录' }
            },
            {
                path: 'promoteMgr_promoterDaySum',
                component: () => import('@/views/promoteMgr/promoterDaySum.vue'),
                name: 'promoteMgr_promoterDaySum',
                meta: { title: '推广每日数据' }
            },
            {
                path: 'promoteMgr_operationRecord',
                component: () => import('@/views/promoteMgr/operationRecord.vue'),
                name: 'promoteMgr_operationRecord',
                meta: { title: '操作记录' }
            }
        ]
    },


    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: constantRoutes
});

