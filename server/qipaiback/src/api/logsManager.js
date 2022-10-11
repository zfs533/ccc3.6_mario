import request from '@/utils/request';

// 配置修改记录
export function getServerCfg(data) {
    return request.get(`api/admin/logMgr/serverCfg/getMany`, { params: data });
}


// 获取后台操作日志模块枚举
export function adminOptLogEnum(data) {
    return request.get(`api/admin/logMgr/serverCfg/adminOptLogEnum`, { params: data });
}

// 后台创建用户记录
export function getCreateUser(data) {
    return request.get(`api/admin/logMgr/createUser/getMany`, { params: data });
}

//获取导出任务
export function getExportInfo(data) {
    return request.get(`api/admin/logMgr/exportTask/getExportInfo`, { params: data });
}

//删除导出任务
export function delExport(data) {
    return request.post(`api/admin/logMgr/exportTask/deleteTask`, data);
}


//获取后台账号登陆日志
export function getBackstageLoginlog(data) {
    return request.get(`api/admin/logMgr/getBackstageLoginlog`, { params: data });
}


//用户注册日志
export function registerLog(data) {
    return request.get(`api/admin/logMgr/log/register`, { params: data });
}

//用户登录日志
export function userLoginLog(data) {
    return request.get(`api/admin/logMgr/log/login`, { params: data });
}

//用户绑定日志
export function bindLog(data) {
    return request.get(`api/admin/logMgr/log/bind`, { params: data });
}

//视频点赞记录
export function getVideoLikedCnt(data) {
    return request.get(`api/admin/logMgr/log/videoLikedCnt`, { params: data });
}
//视屏播放记录
export function getVideoPlayCnt(data) {
    return request.get(`api/admin/logMgr/log/videoPlayCnt`, { params: data });
}


//广告日志
export function getAdsLog(data) {
    return request.get(`api/admin/logMgr/log/ads`, { params: data });
}

//广告日志
export function getAdsIds(data) {
    return request.get(`api/admin/serverCfg/ads/getAdsIds`, { params: data });
}

//视频收藏日志
export function getVideoCollectedCnt(data) {
    return request.get(`api/admin/logMgr/log/videoCollectedCnt`, { params: data });
}



//兑换码兑换记录
export function exchangeCodeRecord(data) {
    return request.get(`api/admin/logMgr/exchangeCodeRecord`, { params: data });
}
//导出
export function getExchangeCodeRecord(data) {
    return request.get(`api/admin/export/exchangeCode/getExchangeCodeExcel`, { params: data });
}

// 审核记录
export function getAuditLogs(data) {
    return request.get(`api/admin/logMgr/auditLogs`, { params: data });
}
