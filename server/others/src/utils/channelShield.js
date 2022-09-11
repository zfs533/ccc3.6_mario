import { getSession } from "./auth";

//渠道状态
export const channelStatusList = [
    {
        value: -1,
        label: "全部"
    },
    {
        value: 0,
        label: "未启用"
    },
    {
        value: 1,
        label: "已启用"
    },
    {
        value: 2,
        label: "已停用"
    }
];


export const CurChannelStates = [
    {
        value: 0,
        label: "未启用"
    },
    {
        value: 1,
        label: "已启用"
    },
    {
        value: 2,
        label: "已停用"
    }
];


export const UrlStateList = [

    { label: "全部", value: undefined },
    { label: "未使用", value: 0 },
    { label: "已使用", value: 1 },
    { label: "已关闭", value: 2 }

];

export const UrlTypeList = [
    // { label: "全部", value: undefined },
    { label: "入口域名", value: "general" },
    // { label: "跳转域名", value: "dl" },
    // { label: "独立域名", value: "independent" },
    // { label: "地推域名", value: "groundpushdomain" },
    { label: "安卓下载域名", value: "downloaddomain" },
    { label: "web访问地址", value: "h5domain" },
    { label: "跳转域名", value: "dl" },
];


export const ChannelCooperationTypeList = [
    { label: "CPA", value: 'CPA' },
    { label: "CPS", value: 'CPS' },
    { label: "CPT", value: 'CPT' },
];

export const ChannelLevel = [
    { label: "全部", value: undefined },
    { label: "一级账号", value: 1 },
    { label: "下级账号", value: 2 },
];

export const ChannelCooperationType = {
    CPA: "CPA",// 
    CPS: "CPS",
    CPT: "CPT",
};


export const ChannelTypeList = [
    { label: "全部", value: undefined },
    { label: "普通渠道", value: 0 },
    { label: "代理渠道", value: 1 },
];


/**
 * export enum ChannelUrlType {
    General = "general",// 入口域名
    Dl = "dl",// 跳转域名
    Independent = "independent",// 独立域名
    Groundpushdomain = "groundpushdomain",// 地推域名
    downloadDomain = "downloaddomain", // 下载域名
    h5Domain = "h5domain",  // h5访问域名
}
 */


export const pidList = getSession("pidList");


