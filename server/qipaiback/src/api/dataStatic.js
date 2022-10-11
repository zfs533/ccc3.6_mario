import request from '@/utils/request';

//首页


//曲线走势图 (最多五分钟延迟)
export function getGDaySum(data) {
    return request.get(`api/admin/statistics/gDaySum`, { params: data });
}
//曲线走势图 (最多五分钟延迟)
export function getPDaySum(data) {
    return request.get(`api/admin/statistics/pDaySum`, { params: data });
}

//曲线走势图 (最多五分钟延迟)
export function exportGDaySum(data) {
    return request.get(`api/admin/export/statistics/gDaySum`, { params: data });
}

//曲线走势图 (最多五分钟延迟)
export function exportpDaySum(data) {
    return request.get(`api/admin/export/statistics/pDaySum`, { params: data });
}



// 充值渠道每日统计
export function getDaySum(data) {
    return request.get(`api/admin/statistics/rechargeChannelPDaySum/daySum`, { params: data });
}
// 充值渠道每日统计导出
export function daySumExport(data) {
    return request.get(`api/admin/export/rechargeChannelPDaySum/logExcel`, { params: data });
}
//充值渠道每日时间段统计
export function getRealDay(data) {
    return request.get(`api/admin/statistics/rechargeChannelPDaySum/realDay`, { params: data });
}
//获取统计数据
export function getChannelDetailStat(data) {
    return request.get(`api/admin/statistics/channel/channelDetailStat`, { params: data });
}
//获取渠道统计列表明细
export function getChannelDetail(data) {
    return request.get(`api/admin/statistics/channel/channelDetail`, { params: data });
}

//获取渠道数据总计
export function getDetailStat(data) {
    return request.get(`api/admin/statistics/channel/channelDetailStat`, { params: data });
}

// 用户每日数据
export function getTodayUsers(data) {
    return request.get(`api/admin/statistics/todayUsers/getMany`, { params: data });
}

// 视频每日数据
export function getTodayVideos(data) {
    return request.get(`api/admin/statistics/todayVideos/getMany`, { params: data });
}

// 视频每日数据
export function todayVideosExport(data) {
    return request.get(`api/admin/export/todayVideos/logExcel`, { params: data });
}
//获取渠道统计-详情数据
export function getChannelDiscountDetail(data) {
    return request.get(`api/admin/statistics/channel/channelDiscountDetail`, { params: data });
}

//获取渠道汇总
export function getChannelStat(data) {
    return request.get(`api/admin/statistics/channel/channelStat`, { params: data });
}
//数据明细页面导出
export function allChannelDaySumExcel(data) {
    return request.get(`api/admin/export/channel/allChannelDaySumExcel`, { params: data });
}
//数据统计页面导出
export function mainChannelDaySumExcel(data) {
    return request.get(`api/admin/export/channel/mainChannelDaySumExcel`, { params: data });
}
//渠道汇总页面导出
export function mainChannelTotalExcel(data) {
    return request.get(`api/admin/export/channel/mainChannelTotalExcel`, { params: data });
}
// 用户每日数据导出
export function todayUsersExcel(data) {
    return request.get(`api/admin/export/usersMgr/todayUsersExcel`, { params: data });
}
// 落地页统计获取
export function getCpGuardStatData(data) {
    return request.get(`api/admin/statistics/cpGuardStat/cnzzstatQuery`, { params: data });
}
// 导出落地页统计
export function exportCpGuardStatData(data) {
    return request.get(`api/admin/export/cpGuardStat/exportLogs`, { params: data });
}
// 留存统计数据
export function getReletionStat(data) {
    return request.get(`api/admin/statistics/reletionsStat/getMany`, { params: data });
}
export function exportUserReletionStatData(data) {
    return request.get(`api/admin/export/userReletionStatExcel`, { params: data });
}
export function getHotWordsStat(data) {
    return request.get(`api/admin/statistics/hotSearchWords/getMany`, { params: data });
}
export function delHotWords(data) {
    return request.post(`api/admin/statistics/hotSearchWords/delOne`, data);
}
export function addHotWords(data) {
    return request.post(`api/admin/statistics/hotSearchWords/addOne`, data);
}
export function updateHotWords(data) {
    return request.post(`api/admin/statistics/hotSearchWords/updateOne`, data);
}