import request from '@/utils/request';

// 创建账号
export function create(data) {
    return request.post(`api/admin/accManager/account/create`, data);
}

// 修改密码 
export function changePwd(data) {
    return request.post(`api/admin/accManager/account/changePwd`, data);
}

// 修改角色 
export function grantRole(data) {
    return request.post(`api/admin/accManager/account/grantRole`, data);
}

// 删除角色 
export function acdelete(data) {
    return request.post(`api/admin/accManager/account/delete`, data);
}

// 获取账号 
export function getUsers(data) {
    return request.post(`api/admin/accManager/account/getUsers`, data);
}
// 获取账号url 
export function getUserUrl(data) {
    return request.post(`api/admin/accManager/googleAuth/getUserUrl`, data);
}
// 谷歌验证
export function googleAuth(data) {
    return request.post(`api/admin/accManager/googleAuth/googleAuth`, data);
}



// 获取全角色配置
export function privileges(data) {
    return request.get(`api/admin/accManager/role/privileges`, { params: data });
}
// 创建角色
export function createRole(data) {
    return request.post(`api/admin/accManager/role/create`, data);
}
// 修改角色
export function updateRole(data) {
    return request.post(`api/admin/accManager/role/update`, data);
}
// 获取父角色列表
export function getByType(data) {
    return request.post(`api/admin/accManager/role/getByType`, data);
}
// 获取子角色列表
export function getByParent(data) {
    return request.post(`api/admin/accManager/role/getByParent`, data);
}