import { getSession } from "./auth";

//资源库-视频排序
export const sortList = [
    { value: 1, label: "视频时长-正序" },
    { value: 2, label: "视频时长-倒叙" },
    { value: 3, label: "视频大小-正序" },
    { value: 4, label: "视频大小-倒叙" },
    { value: 5, label: "视频创建时间-正序" },
    { value: 6, label: "视频创建时间-倒叙" },
    { value: 7, label: "视频播放次数-正序" },
    { value: 8, label: "视频播放次数-倒叙" },
    { value: 9, label: "视频点赞次数-正序" },
    { value: 10, label: "视频点赞次数-倒叙" },
    { value: 11, label: "视频热度次数-正序" },
    { value: 12, label: "视频热度次数-倒叙" },
    { value: 13, label: "视频审核时间-正序" },
    { value: 14, label: "视频审核时间-倒叙" },
    { value: 15, label: "视频价格-正序" },
    { value: 16, label: "视频价格-倒叙" }
];
//数据统计-视频每日数据排序
export const todayVideoSortList = [
    { value: 1, label: "充值金额-正序" },
    { value: 2, label: "充值金额-倒叙" },
    { value: 3, label: "购买次数-正序" },
    { value: 4, label: "购买次数-倒叙" },
    { value: 5, label: "观看次数-正序" },
    { value: 6, label: "观看次数-倒叙" },
    { value: 7, label: "观看人数-正序" },
    { value: 8, label: "观看人数-倒叙" },
    { value: 9, label: "点赞次数-正序" },
    { value: 10, label: "点赞次数-倒叙" },
];

//支付类型
export const payTypeList = [
    { label: "免费", value: 2 },
    { label: "vip", value: 3 },
    { label: "钻石", value: 4 }
];

//视频长短类型
export const timeTypeList = [
    { label: "长视频", value: 2 },
    { label: "短视频", value: 3 },
];

//视频状态
export const videoStateList = [
    { label: "上架", value: 1 },
    { label: "下架", value: 2 },
    { label: "等待复审", value: 3 },
];

//审核状态
export const auditStateList = [
    { value: 0, label: "等待审核" },
    { value: 1, label: "正在审核" },
    { value: 2, label: "审核通过" },
    { value: 3, label: "审核未通过" },
    { value: 4, label: "暂存" }

];

//审核-视频排序
export const auditSortList = [
    { value: 1, label: "视频时长-正序" },
    { value: 2, label: "视频时长-倒叙" },
    { value: 3, label: "视频大小-正序" },
    { value: 4, label: "视频大小-倒叙" },
    { value: 5, label: "视频创建时间-正序" },
    { value: 6, label: "视频创建时间-倒叙" },
    { value: 13, label: "视频审核时间-倒叙" },
    { value: 14, label: "视频审核时间-倒叙" }
];
//审核-图集排序
export const atlasSortList = [
    { value: 1, label: "图集时长-正序" },
    { value: 2, label: "图集时长-倒叙" },
    // { value: 3, label: "图集大小-正序" },
    // { value: 4, label: "图集大小-倒叙" },
    { value: 5, label: "图集创建时间-正序" },
    { value: 6, label: "图集创建时间-倒叙" },
    { value: 13, label: "图集审核时间-倒叙" },
    { value: 14, label: "图集审核时间-倒叙" }
];

//用户状态
export const userStatusList = [
    // { value: 1, label: "未激活" },
    { value: 2, label: "已激活" },
    { value: 3, label: "已冻结" },
];

//性别
export const sexList = [
    { value: 1, label: "男" },
    { value: 2, label: "女" },
    { value: 3, label: "未知" },
];

//vip卡类型
export const vipTypeList = [
    { value: 1, label: "黄金季卡" },
    { value: 2, label: "钻石年卡" },
    { value: 3, label: "新用户月卡" },
    { value: 4, label: "至尊卡" },
    { value: 5, label: "体验周卡" },
];

//充值兑换类型
export const payTypes = [
    { value: 'wx_pay', label: '微信' },
    { value: 'ali_pay', label: '支付宝' },
    { value: 'union_pay', label: '银联' },
    { value: "qq_pay", label: "QQ红包" },
    { value: 'yun_pay', label: '云闪付' },
];

//充值订单状态
export const orderPayStates = [
    { value: "ordering", label: "开始下订单" },
    { value: "ordered", label: "下订单成功" },
    { value: "paid", label: "支付成功" },
    { value: "delivered", label: "充值到账" }
];

//充值-物品类型
export const goodsTypeList = [
    { label: "钻石", value: 1 },
    { label: "VIP", value: 2 },
];
//充值-物品类型
export const goodsType =
{
    DIAMOND: 1,
    VIP: 2,
};

//审核拒绝原因
export const reasonList = [
    "视频侵权不予使用",
    "用户评价低",
    "点赞数低",
    "收藏量低",
    "视频质量不符合条件",
    "视频带有不正当言论或图片",
    "视频内容使人反感",
    "视频清晰度不足",
    "视频时间过长",
    "视频插入竞品广告过多",
    "视频解码错误",
    "视频无法播放",
    "视频拼接不流畅",
];


//用户类型
export const userTypes = [
    { label: "普通玩家", value: "nomal" },
    { label: "官方", value: "official" },
    { label: "合作方", value: "partner" },
    { label: "博主", value: "blogger" }
];
export const UserTypeNew = [
    { label: "普通用户", value: 1 },
    { label: "博主", value: 2 },
    { label: "官方", value: 3 },
    { label: "合作方", value: 4 }
];
//pid平台集合
export const pidList = getSession("pidList");


//后台类型
export const accountTypes = [
    { label: "主后台", value: "admin" },
    { label: "渠道后台", value: "channel" }
];


//登录方式
export const loginMethods = [
    { label: "手机登录", value: "phone" },
    { label: "游客登录", value: "anonymous" }
];
//支付类型
export const ChangeMoneyType = [
    { label: "钻石", value: "buy_diamond" },
    { label: "vip", value: "buy_vip" },
    { label: "视频", value: "buy_video" }
];

export const ChannelPageUrlType = [
    { label: "入口地址", value: "1" },
    { label: "web域名", value: "2" },
    { label: "安卓下载域名", value: "3" },
    { label: "ios轻量版下载地址", value: "4" },
    { label: "iosTf下载地址", value: "5" },
    { label: "落地页模版", value: "6" },
    { label: "跳转域名", value: "7" },
];
//操作平台
export const platFormType = [
    { label: "ios", value: "ios" },
    { label: "android", value: "android" },
    { label: "web", value: "web" },
];
//广告类型
export const PosType = [
    { label: "启动页", value: 1 },
    { label: "首页弹窗", value: 2 },
    { label: "分类顶部banner", value: 3 },
    { label: "二级分类分割", value: 4 },
    { label: "视频流", value: 5 },
    { label: "长视频初始页下方", value: 6 },
    { label: "vip顶部banner", value: 7 },
    { label: "我的", value: 8 },
    { label: "浮动广告", value: 9 },
];
export const AdType = [
    { label: "普通", value: "ordinary" },
    { label: "新人倒计时", value: "newUser" },
];
/* export enum PosType {
    enterApp = 1,  //进入app
    afterEnterApp = 2, //进入app后，主界面弹窗广告
    categoryTop = 3, //分类顶部banner
    categoryMid = 4, //分类中间穿插的广告
    inVideos = 5, //多个视频中穿插的广告（默认4个）
    playVideo = 6 //播放时下方的广告
} */

//广告类型
export const JumpType = [
    { label: "客户页面", value: 1 },
    { label: "播放视频页面", value: 2 },
    { label: "vip", value: 3 },
    { label: "钻石充值", value: 4 },
    { label: "VIP充值", value: 5 },
];

//分类类型
export const CategoryType = [
    { label: "基本类型", value: 'basic' },
    { label: "vip类型", value: 'vip' },
    { label: "专题", value: 'topic' },
    { label: "Av", value: 'av' },
    { label: "标签分类", value: 'tag' },
];

//兑换码类型
export const exchangeTypes = [
    { label: "多用户", value: 'anyUser' },
    { label: "单用户", value: 'oneUser' }
];
//兑换码类型
export const codeTypes = [
    { label: "钻石", value: 'diamond' },
    { label: "vip", value: 'vip' },
    { label: "观影券", value: 'watchTicket' },
];
//任务类型
export const TaskType = [
    { label: "充值钻石", value: 'rechargeDiamond' },
    { label: "开通会员", value: 'openVip' },
    { label: "首次消耗钻石", value: 'firstConsumeDiamond' },
    { label: "首次消耗钻石", value: 'invitedFriendsSuccess' },
];
//任务状态
export const TaskStatusType = [
    { label: "未完成", value: 'unfinished' },
    { label: "完成", value: 'finished' },
    { label: "已领取", value: 'received' },
];
//奖励类型
export const RewardType = [
    { label: "奖励钻石", value: 'diamond' },
    { label: "奖励vip", value: 'vip' },
];
//活动类型
export const ActivityType = [
    { label: "新人限时活动", value: 'newUserLimitDate' },
    { label: "签到", value: 'signIn' },
];



//推广审核状态
export const promoteAuditStates = [
    { label: "等待审核", value: 1 },
    { label: "审核通过", value: 2 },
    { label: "拒绝", value: 3 }
];

//推广支付类型
export const withdrawTypes = [
    { label: "支付宝", value: "alipay" },
    { label: "银行卡", value: "unionpay" },
    { label: "USDT", value: "usdtpay" },
    { label: "实物", value: "giftCard" }
];

//推广提现订单状态
export const withDrawStatus = [
    { value: 'success', label: "成功" },
    { value: 'fail', label: "失败" },
    { value: 'transfer', label: "转账中" },
    { value: 'await', label: "等待审核" },
    { value: 'refund', label: "退款" }
];

//操作记录类型
export const promoteOptType = [
    { value: "create", label: "创建推广" },
    { value: "bankInfo", label: "银行卡信息" },
    { value: "aliInfo", label: "支付宝信息" },
    { value: "usdtInfo", label: "usdt信息" },
    { value: "contact", label: "联系信息" },
    { value: "allowSetPromote", label: "推广开关" },
    { value: "banSettlement", label: "提现开关" },
    { value: "upScroe", label: "上分" },
    { value: "downScroe", label: "下分" }
];


//兑换订单状态
export const billOrderState = [
    { value: "ordering", label: "开始下订单" },
    { value: "ordered", label: "下订单成功" },
    { value: "paid", label: "支付成功" },
    { value: "delivered", label: "发货成功" }
];

//兑换订单退款状态
export const refStatus = [
    { value: "refunding", label: "退款中" },
    { value: "refunded", label: "退款完成" },
];

//流水类型
export const moneyChangeTypes = [
    { label: "收入", value: "income" },
    { label: "奖励", value: "reward" },
    { label: "兑换", value: "withdraw" },
    { label: "退款", value: "refund" },
    { label: "上下分", value: "upDownScore" },
];
// 图片位置

export const categoryImgLocation = [
    { label: "左边", value: "left" },
    { label: "右边", value: "right" }
];

//付费类型
export const ChargeType = [
    { label: "全部", value: 1 }, //付费类型(全部)
    { label: "免费", value: 2, },// 免费
    { label: "VIP", value: 3 }, // VIP
    { label: "钻石", value: 4 }, // 钻石
];

//内容审核类型
export const ContentEntityType = [
    { label: "图集", value: "atlas" },
    { label: "视频", value: "video" },
];
// vip卡的活动配置
export const VipCfgTacticsTypeEnum = [
    { label: "新人倒计时活动", value: "Newcomer_Countdown_Activity" },
    { label: "范围时间活动", value: "Range_Time_Activity" },
    { label: "定时周期活动", value : "Timed_Period_Activity"},
];

export const PayTypesEnum=[
    {value:"ali_fix",label:"支付宝固定"},
    {value:"ali_pay",label:"支付宝支付"},
    {value:"wx_fix",label:"微信固定"},
    {value:"wx_pay",label:"微信支付"},
    {value:"diamond_pay",label:"钻石支付"},
]

export const UploadPath={
     // 静态资源资源
     WebStatic : "web/static",
     // 视频预览图
     VideoImage : "web/img/vimg",
     // 广告图
     AdsImage : "web/img/promoteImg",
     // 头像
     HeadImage : "web/img/head",
     // 图集
     AtlasImage : "web/img/atlas",
     // 图标
     IconImage : "web/img/icons",
     // 充值购买图
     PayInfoImage : "web/img/payinfo",
     // 用户自定义头像
     UserAvatar : "web/img/userAvater",
     // 分类
     CategorieImg : "web/img/categorie",
}
