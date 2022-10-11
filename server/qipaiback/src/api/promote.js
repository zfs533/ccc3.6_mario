import request from '@/utils/request';

// 获取当前生效的配置
export function getCurCfg(data) {
    return request.get(`api/admin/promoteMgr/promoteCfg/getCurCfg`, { params: data });
}
// 获取可修改的配置
export function getNextCfg(data) {
    return request.get(`api/admin/promoteMgr/promoteCfg/nextCfg`, { params: data });
}

// 修改推广配置
export function updateNextCfg(data) {
    return request.post(`api/admin/promoteMgr/promoteCfg/nextCfg `, data);
}


// 获取等待审核列表
export function getAuditList(data) {
    return request.get(`api/admin/promoteMgr/promoteAudit/getList`, { params: data });
}


// 审核(通过，拒绝)
export function audit(data) {
    return request.post(`api/admin/promoteMgr/promoteAudit/audit`, data);
}


// 修改推广信息
export function updateInfo(data) {
    return request.post(`api/admin/promoteMgr/promoteAudit/updateInfo`, data);
}


// 推广用户列表
export function getPromoterList(data) {
    return request.get(`api/admin/promoteMgr/promoterList/getList`, { params: data });
}


// 编辑支付信息
export function updatePayInfo(data) {
    return request.post(`api/admin/promoteMgr/promoterList/updatePayInfo`, data);
}


// 编辑联系方式
export function updateContactInfo(data) {
    return request.post(`api/admin/promoteMgr/promoterList/updateInfo`, data);
}


// 创建推广账号
export function addPromoter(data) {
    return request.post(`api/admin/promoteMgr/promoterList/addOne`, data);
}


// 封禁/解封 ,该功能请弹出二级框确认操作
export function banSettlement(data) {
    return request.post(`api/admin/promoteMgr/promoterList/banSettlement`, data);
}
// 上分
export function upScore(data) {
    return request.post(`api/admin/promoteMgr/promoterList/upScore`, data);
}
// 下分
export function downScore(data) {
    return request.post(`api/admin/promoteMgr/promoterList/downScore`, data);
}

//推广用户流水
export function moneyChangeLog(data) {
    return request.get(`api/admin/promoteMgr/promoterList/moneyChangeLog`, { params: data });
}


// ***推广提现订单

// 获取列表
export function promoteWithDrawList(data) {
    return request.get(`api/admin/promoteMgr/promoteWithDraw/getList`, { params: data });
}


// 审核通过
export function withDrawAuditPass(data) {
    return request.post(`api/admin/promoteMgr/promoteWithDraw/auditPass`, data);
}


// 拒绝订单
export function withDrawAuditFail(data) {
    return request.post(`api/admin/promoteMgr/promoteWithDraw/auditFail`, data);
}


//***推广记录

// 记录列表
export function promoteLogList(data) {
    return request.get(`api/admin/promoteMgr/promoteLog/getList`, { params: data });
}


//***推广收益记录

// 记录列表
export function promoteIncomeList(data) {
    return request.get(`api/admin/promoteMgr/promoteIncome/getList`, { params: data });
}


//***推广每日数据

// 数据列表
export function promoteDaySumList(data) {
    return request.get(`api/admin/promoteMgr/promoteDaySum/getList`, { params: data });
}


//***操作记录

// 操作记录列表
export function promoteOptLogList(data) {
    return request.get(`api/admin/promoteMgr/promoteOptLog/getList`, { params: data });
}
