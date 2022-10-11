import request from '@/utils/request';

//获取用户列表
export function getManyUserInfo(data) {
    return request.get(`api/admin/usersManager/userInfo/getMany`, { params: data });
}

//用户列表导出
export function usersListExcel(data) {
    return request.get(`api/admin/export/usersMgr/usersListExcel`, { params: data });
}


// 新增绑定邀请人
export function bindInviter(data) {
    return request.post(`api/admin/usersManager/userInfo/bindInviter`, data);
}




//获取用户观影记录
export function getVideoHistory(data) {
    return request.get(`api/admin/usersManager/videoHistory/log/getMany`, { params: data });
}


// 更改单个用户渠道
export function updateChannel(data) {
    return request.post(`api/admin/usersManager/userInfo/updateChannel`, data);
}
// 更改单个用户状态
export function updateStatus(data) {
    return request.post(`api/admin/usersManager/userInfo/updateStatus`, data);
}
// 修改单个用户基本信息
export function updateOne(data) {
    return request.post(`api/admin/usersManager/userInfo/updateOne`, data);
}
// 创建一个用户
export function createUser(data) {
    return request.post(`api/admin/usersManager/userInfo/createUser`, data);
}
// 更改用户vip等级
export function updateVip(data) {
    return request.post(`api/admin/usersManager/userInfo/updateVip`, data);
}
// 更改用户类型
export function updateType(data) {
    return request.post(`api/admin/usersManager/userInfo/updateUserType`, data);
}
// 用户上分
export function addDiamond(data) {
    return request.post(`api/admin/usersManager/userInfo/addDiamond`, data);
}
// 用户下分
export function subDiamond(data) {
    return request.post(`api/admin/usersManager/userInfo/subDiamond`, data);
}
// UP主列表
export function bloggerGet(data) {
    return request.get(`api/admin/usersManager/blogger/getMany`, { params: data });
}

// UP主数据修改
export function bloggerUpdate(data) {
    return request.post(`api/admin/usersManager/blogger/updateOne`, data);
}

// 流水详情
export function moneyChange(data) {
    return request.get(`api/admin/usersManager/userInfo/moneyChange`, { params: data });
}

// 获取粉丝列表
export function moneyFollowers(data) {
    return request.get(`api/admin/usersManager/userInfo/followers`, { params: data });
}

// 玩家总数据和今日总数据
export function getAttributionData(data) {
    return request.get(`api/admin/usersManager/userInfo/attribution`, { params: data });
}
// 玩家总数据和今日总数据
export function videoHistoryLogExcel(data) {
    return request.get(`api/admin/export/videoHistory/logExcel`, { params: data });
}