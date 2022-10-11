export const EVN_STATUS = {
    OFFICIAL: "production", // 正式
    LOCAL_DEV: "development",
    OUT_DEV: "test"
};

export const AppModuleTypes = {
    homeCategories: 11,
    vipCategories: 12,
    topicCategories: 13,
    avCategories: 14,
    myFollow: 15,
    hotSearchWords: 16,
    ads: 17,
    shorts: 18,
    tags: 19,
    newUserRewardCfg: 20,
    shareCfg: 21,
    checkIn: 22,
    videoCnt: 23,
    myInfo: 24,
    notice: 25,
    announcement: 26,
    vipCfg: 27,
    resImgs: 28
};

export const AppResImgCodes = {
    defaultPageBg: "def_page_bg", //   我的页面背景图
    myPageBg: "my_page_bg", //   我的页面背景图
    rechargePageBg: "recharge_page_bg", //充值页面背景图
    vipPageBg: "vip_page_bg", //vip页面背景图
    myDefvipBg: "my_defvip_bg", // 我的页面默认VIP默认背景图
    myWalletBg: "my_wallet_bg", // 我的页面钱包背景图
    homePageBg: "home_page_bg", // 我的页面钱包背景图
    topicPageBg: "topic_page_bg",
};


const defaultDefaultIcon = require("~/assets/img/default/defaultImgBgIcon.png");
const defaultDefaultImg = require("~/assets/img/default/defaultImgBg.png");
export const defaultRes = {
    videoCoverDefault: defaultDefaultImg,
    videoCoverDefaultIcon: defaultDefaultIcon,
    userAvatorDefault: require("~/assets/img/default/defaultAvator.png"),
    adCoverDefault: defaultDefaultImg,
    moduleBgDefault: require('~/assets/img/default/defaultModuleBg.png')
};