import request from '@/utils/request';

//获取当前可用任务列表
export function getMany(data) {
    return request.get('api/admin/activity/taskMgr/getMany', { params: data });
}

//获取配置
export function getNewUserLimitDate() {
    return request.get('api/admin/activity/newUserLimitDate/get');
}
//修改活动配置
export function updateNewUserLimitDate(data) {
    return request.post('api/admin/activity/newUserLimitDate/update', data);
}

//获取活动记录
export function getLogs(data) {
    return request.get('api/admin/activity/taskMgr/getLogs', { params: data });
}
// 获取签到记录
export function getSignInLogs(data) {
    return request.get('api/admin/activity/signIn/getLogs', { params: data });
}
//获取签到活动配置
export function getSignIn(data) {
    return request.get('api/admin/activity/signIn/get', { params: data });
}
//修改签到活动配置
export function updateSignIn(data) {
    return request.post('api/admin/activity/signIn/update', data);
}
export function addSignIn(data) {
    return request.post('api/admin/activity/signIn/addOne', data);
}