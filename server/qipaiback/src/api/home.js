import request from '@/utils/request';

//首页


//曲线走势图 (最多五分钟延迟)
export function gRealDayLine(data) {
    return request.get(`api/admin/home/gRealDayLine`, { params: data });
}

//数据
export function gDaySum(data) {
    return request.get(`api/admin/home/gDaySum`, { params: data });
}

//数据
export function pDaySum(data) {
    return request.get(`api/admin/home/pDaySum`, { params: data });
}

//曲线走势图 (最多五分钟延迟)
export function pRealDayLine(data) {
    return request.get(`api/admin/home/pRealDayLine`, { params: data });
}

// // 创建角色
// export function createRole(data) {
//     return request.post(`api/admin/accManager/role/create`, data);
// }
//当日数据总汇
export function getPRealDayStatics(data) {
    return request.get(`api/admin/home/pRealDayStatics`, { params: data });
}
//当日数据走势图
export function getPRealDayLines(data) {
    return request.get(`api/admin/home/pRealDayLines`, { params: data });
}
//数据明显
export function getPRealDays(data) {
    return request.get(`api/admin/home/pRealDays`, { params: data });
}
