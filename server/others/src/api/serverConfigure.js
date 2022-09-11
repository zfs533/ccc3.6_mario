import request from '@/utils/request';

// 获取资源管理配置
export function secretMgrGet(data) {
    return request.get(`api/admin/serverCfg/systemSettingMgr/get`, { params: data });
}


// 修改资源管理配置
export function secretMgrUpdate(data) {
    return request.post(`api/admin/serverCfg/systemSettingMgr/update`, data);
}
export function secretMgrAdd(data) {
    return request.post(`api/admin/serverCfg/systemSettingMgr/addOne`, data);
}
export function secretMgrDel(data) {
    return request.post(`api/admin/serverCfg/systemSettingMgr/delOne`, data);
}


// 获取敏感词
export function sensitiveGet(data) {
    return request.get(`api/admin/serverCfg/sensitiveContent/get`, { params: data });
}


// 修改敏感词
export function sensitiveUpdate(data) {
    return request.post(`api/admin/serverCfg/sensitiveContent/update`, data);
}

//获取短信配置信息
export function getSmsCfgData(data) {
    return request.get(`api/admin/serverCfg/smsCfg/smsCfg`, { params: data });
}

// 修改短信配置
export function smsCfgUpdate(data) {
    return request.post(`api/admin/serverCfg/smsCfg/smsCfg`, data);
}

//获取短信配置信息
export function getSmsCodeWhitelist(data) {
    return request.get(`api/admin/serverCfg/smsCfg/smsCodeWhitelist`, { params: data });
}

// 修改短信配置
export function postSmsCodeWhitelist(data) {
    return request.post(`api/admin/serverCfg/smsCfg/smsCodeWhitelist`, data);
}
// 广告配置
export function getAdvertiseData(data) {
    return request.get(`api/admin/serverCfg/ads/getMany`, { params: data });
}
// 修改广告配置
export function updateAdvertise(data) {
    return request.post(`api/admin/serverCfg/ads/updateOne`, data);
}
// 新增广告配置
export function addAdvertise(data) {
    return request.post(`api/admin/serverCfg/ads/addAds`, data);
}
// 删除广告配置
export function deleteAdvertise(data) {
    return request.post(`api/admin/serverCfg/ads/delOne`, data);
}

// 邀请奖励配置
export function getInvitationData(data) {
    return request.get(`api/admin/serverCfg/invitationRewardCfg/getMany`, { params: data });
}
// 修改邀请奖励配置
export function updateInvitationData(data) {
    return request.post(`api/admin/serverCfg/invitationRewardCfg/updateOne`, data);
}
// 新增邀请配置
export function addInvitationData(data) {
    return request.post(`api/admin/serverCfg/invitationRewardCfg/addOne`, data);
}

//获取客服配置信息
export function getCsCfgData(data) {
    return request.get(`api/admin/serverCfg/csCfg/get`, { params: data });
}

// 修改客服配置
export function updateCsCfg(data) {
    return request.post(`api/admin/serverCfg/csCfg/update`, data);
}



// 兑换码配置
export function getExchangeCode(data) {
    return request.get(`api/admin/serverCfg/exchangeCode/get`, { params: data });
}

export function addExchangeCode(data) {
    return request.post(`api/admin/serverCfg/exchangeCode/add`, data);
}

export function delExchangeCode(data) {
    return request.post(`api/admin/serverCfg/exchangeCode/delOne`, data);
}
//导出
export function getExchangeCodeExcel(data) {
    return request.get(`api/admin/export/exchangeCode/getExchangeCodeExcel`, { params: data });
}

//获取用户昵称
export function getUserInitUrnCfg(data) {
    return request.get(`api/admin/serverCfg/userInitDataCfg/getUrnCfg`, { params: data });
}
export function addUserInitUrn(data) {
    return request.post(`api/admin/serverCfg/userInitDataCfg/addUrn`, data);
}
export function delUserInitUrn(data) {
    return request.post(`api/admin/serverCfg/userInitDataCfg/delUrn`, data);
}
//用户头像
export function getUserAvatar(data) {
    return request.get(`api/admin/serverCfg/userInitDataCfg/getHeadCfg`, { params: data });
}
export function addUserAvatar(data) {
    return request.post(`api/admin/serverCfg/userInitDataCfg/addHead`, data);
}
export function delUserAvatar(data) {
    return request.post(`api/admin/serverCfg/userInitDataCfg/delHead`, data);
}

export function getPrivileges(data) {
    return request.get(`api/admin/serverCfg/vipLevelPrivilegesCfg/privileges/getMany`, { params: data });
}
export function addPrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/privileges/addOne`, data);
}
export function updatePrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/privileges/updateOne`, data);
}
export function delPrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/privileges/delOne`, data);
}
export function getVipLevelPrivileges(data) {
    return request.get(`api/admin/serverCfg/vipLevelPrivilegesCfg/vipLevelCfg/getMany`, { params: data });
}
export function addVipLevelPrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/vipLevelCfg/addOne`, data);
}
export function updateVipLevelPrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/vipLevelCfg/updateOne`, data);
}
export function delVipLevelPrivileges(data) {
    return request.post(`api/admin/serverCfg/vipLevelPrivilegesCfg/vipLevelCfg/delOne`, data);
}
