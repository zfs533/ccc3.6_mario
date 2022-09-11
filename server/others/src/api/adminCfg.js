import request from '@/utils/request';


// ## 跨域
// 获取列表
export function getCrosDomain(data) {
    return request.get(`api/admin/adminCfg/crosDomain/get`, { params: data });
}
// 插入
export function insertCrosDomain(data) {
    return request.post(`api/admin/adminCfg/crosDomain/insert`, data);
}
// 删除
export function deleteCrosDomain(data) {
    return request.post(`api/admin/adminCfg/crosDomain/delete`, data);
}

// ## 登陆白名单
// 添加
export function addAllowIp(data) {
    return request.post(`api/admin/adminCfg/allowIp/addAllowIp`, data);
}
// 删除
export function deleteAllowIp(data) {
    return request.post(`api/admin/adminCfg/allowIp/deleteAllowIp`, data);
}
// 获取列表
export function getAllowIp(data) {
    return request.get(`api/admin/adminCfg/allowIp/getAllowIp`, { params: data });
}
// 获取全局配置
export function getGlobalCfg() {
    return request.get(`api/admin/adminCfg/globalCfg/get`);
}
// 修改全局配置
export function updateGlobalCfg(data) {
    return request.post(`api/admin/adminCfg/globalCfg/update`, data);
}
// 获取数据配置
export function getDataCfg(data) {
    return request.get(`api/admin/adminCfg/dataCfg/get`, { params: data });
}
// 修改数据配置
export function updateDataCfg(data) {
    return request.post(`api/admin/adminCfg/dataCfg/update`, data);
}
// 重置统计任务
export function dataCfgReset(data) {
    return request.post(`api/admin/adminCfg/dataCfg/reset`, data);
}
