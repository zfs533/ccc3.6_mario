import request from '@/utils/request';

//兑换配置
export function getCfg(data) {
    return request.get(`api/admin/withdrawMgr/withdraw_cfg/getList`, { params: data });
}

export function updateOneCfg(data) {
    return request.post(`api/admin/withdrawMgr/withdraw_cfg/updateOne`, data);
}

export function addOneCfg(data) {
    return request.post(`api/admin/withdrawMgr/withdraw_cfg/addOne`, data);
}

export function delOneCfg(data) {
    return request.post(`api/admin/withdrawMgr/withdraw_cfg/delOne`, data);
}



//兑换订单
export function ordersList(data) {
    return request.get(`api/admin/withdrawMgr/orders/getList`, { params: data });
}
