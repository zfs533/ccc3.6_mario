import request from '@/utils/request';

// 获取充值/兑换方式
export function getManyPayCfg_vip(data) {
    return request.get(`api/admin/consumptionMgr/payCfg/vipCfg/getMany`, { params: data });
}
export function getManyPayCfg_diamond(data) {
    return request.get(`api/admin/consumptionMgr/payCfg/diamondCfg/getMany`, { params: data });
}

// 获取支付配置列表
export function getAllChannel(data) {
    return request.get(`api/admin/consumptionMgr/rechargeWithdrawCfg/getAllChannel`, { params: data });
}

// 修改支付信息配置
export function updateOne_vip(data) {
    return request.post(`api/admin/consumptionMgr/payCfg/vipCfg/updateOne`, data);
}

// 添加一个支付配置
export function addOne_vip(data) {
    return request.post(`api/admin/consumptionMgr/payCfg/vipCfg/addOne`, data);
}
// 修改支付信息配置
export function updateOne_diamond(data) {
    return request.post(`api/admin/consumptionMgr/payCfg/diamondCfg/updateOne`, data);
}

// 添加一个支付配置
export function addOne_diamond(data) {
    return request.post(`api/admin/consumptionMgr/payCfg/diamondCfg/addOne`, data);
}
//获取充值方式
export function getPayType() {
    return request.get(`api/admin/consumptionMgr/rechargeWithdrawCfg/getPayType`);
}


//获取充值渠道
export function getManyChannel(data) {
    return request.get(`api/admin/consumptionMgr/payChannel/getMany`, { params: data });
}

// 修改充值渠道
export function updateOneChannel(data) {
    return request.post(`api/admin/consumptionMgr/payChannel/updateOne`, data);
}

// 新增充值渠道
export function addOneChannel(data) {
    return request.post(`api/admin/consumptionMgr/payChannel/addOne`, data);
}

// 删除一个充值渠道
export function deleteOneChannel(data) {
    return request.post(`api/admin/consumptionMgr/payChannel/deleteOne`, data);
}


// 获取配置列表
export function rechargeBalanceLimitCfgGet(data) {
    return request.get(`api/admin/consumptionMgr/rechargeBalanceLimitCfg/getMany`, { params: data });
}

// 修改单个配置
export function rechargeBalanceLimitCfgUpdate(data) {
    return request.post(`api/admin/consumptionMgr/rechargeBalanceLimitCfg/updateOne`, data);
}

// 添加一个配置
export function rechargeBalanceLimitCfgAdd(data) {
    return request.post(`api/admin/consumptionMgr/rechargeBalanceLimitCfg/addOne`, data);
}


// 充值订单
export function billRecordsGet(data) {
    return request.get(`api/admin/consumptionMgr/billRecords/getMany`, { params: data });
}


//获取支付回调列表
export function repeatGet(data) {
    return request.get(`api/admin/consumptionMgr/repeat/getMany`, { params: data });
}

// 修改支付回调状态
export function updateRepeat(data) {
    return request.post(`api/admin/consumptionMgr/repeat/updateRepeat`, data);
}

//用户购片记录
export function buyVideoRecord(data) {
    return request.get(`api/admin/consumptionMgr/buyVideoRecord/getMany`, { params: data });
}
// 导出视频购买记录
export function buyVideoRecordExport(data) {
    return request.get(`api/admin/export/buyVideosRecord/logExcel`, { params: data });
}
//外部充值预警记录
export function outChannelGetMany(data) {
    return request.get(`api/admin/consumptionMgr/outChannel/getMany`, { params: data });
}
//同步提现余额
export function outChannelWithdraw(data) {
    return request.post(`api/admin/consumptionMgr/outChannel/withdraw`, data);
}

//主后台-消费管理-外部充值渠道，新增获取渠道接口
export function getChannels() {
    return request.get(`api/admin/consumptionMgr/rechargeBalanceLimitCfg/getChannels`);
}
//主后台-消费管理-充值订单处理
export function ordersExcel(data) {
    return request.get(`api/admin/export/billRecords/logExcel`, { params: data });
}