import request from '@/utils/request';

//获取用户列表
export function getManyChannelInfo(data) {
    return request.get(`api/admin/channelMgr/channelShield/getMany`, { params: data });
}

//2.修改单个渠道配置
export function updateOne(data) {
    return request.post(`api/admin/channelMgr/channelShield/updateOne`, data);
}
//3.删除一个渠道
export function deleteOne(data) {
    return request.post(`api/admin/channelMgr/channelShield/deleteOne`, data);
}
//4.批量替换主页
export function batchChangeWeb(data) {
    return request.post(`api/admin/channelMgr/channelShield/batchChangeWeb`, data);
}

//5.批量删除主页
export function batchDelWeb(data) {
    return request.post(`api/admin/channelMgr/channelShield/batchDelWeb`, data);
}

//6.根据渠道批量修改
export function batchChangeByChannels(data) {
    return request.post(`api/admin/channelMgr/channelShield/batchChangeByChannels`, data);
}




/********************域名维护界面**************************/

//1.获取域名列表
export function getUrlMaintenance(data) {
    return request.get(`api/admin/channelMgr/urlMaintenance/get`, { params: data });
}

//2.批量添加域名
export function insertUrlMaintenance(data) {
    return request.post(`api/admin/channelMgr/urlMaintenance/insert`, data);
}


//3.修改单个域名
export function updateUrlMaintenance(data) {
    return request.post(`api/admin/channelMgr/urlMaintenance/update`, data);
}


//4.批量删除域名
export function delUrlMaintenance(data) {
    return request.post(`api/admin/channelMgr/urlMaintenance/delete`, data);
}

//5.根据域名类型获取可用域名(该接口用于后续添加渠道账号时用)
export function getUrlByType(data) {
    return request.get(`api/admin/channelMgr/urlMaintenance/getByType`, { params: data });
}

// 5.根据域名类型获取可用域名(该接口用于后续添加渠道账号时用)
// 路由:api/admin/channelMgr/urlMaintenance/getByType post
// 参数:{
//     pid:string // 项目 必传
//     type:string // 域名类型 必传
// }

//6.指定域名被封或者失效时，让这个域名标记关闭，并自动替换使用这个域名的引用
export function invalidOne(data) {
    return request.post(`api/admin/channelMgr/urlMaintenance/invalidOne`, data);
}


// //导出渠道列表
// export function channelsListExcel(data) {
//     return request.get(`api/admin/channelMgr/channelShield/getMany`, { params: data });
// }


/****************************渠道归属人页面**************** */



// 1.获取渠道归属人
export function getPartnerMany(data) {
    return request.get(`api/admin/channelMgr/partner/getMany`, { params: data });
}


//2.添加渠道归属人
export function insertOnePartnerdata(data) {
    return request.post(`api/admin/channelMgr/partner/insertOne`, data);
}

/******************渠道账号页面******************/

// 1.获取一级渠道账号
export function getChannelActLeaders(data) {
    return request.get(`api/admin/channelMgr/channelAct/leaders`, { params: data });
}



// 2.获取下级渠道账号
export function getChannelActMembers(data) {
    return request.get(`api/admin/channelMgr/channelAct/members`, { params: data });
}




// 3.创建一个渠道账号(一级的,二级渠道账号油渠道后台创建)
// 渠道合作方式
export function insertChannelAct(data) {
    return request.post(`api/admin/channelMgr/channelAct/user`, data);
}

// 5.修改渠道账号基本信息
export function updateUser(data) {
    return request.post(`api/admin/channelMgr/channelAct/updateUser`, data);
}



// 6.获取 当前/可修改 的合作配置
// 2.获取下级渠道账号
export function getCooperation(data) {
    return request.get(`api/admin/channelMgr/channelAct/getCooperation`, { params: data });
}



// 7.修改渠道账号合作方式
export function updateCooperation(data) {
    return request.post(`api/admin/channelMgr/channelAct/updateCooperation`, data);
}


/***********渠道落地页页面 */

//1.获取落地页列表
export function getManyChannelPage(data) {
    return request.get(`api/admin/channelMgr/channelPage/getMany`, { params: data });
}

// 2.落地页下载信息配置 

//--添加Post
export function addDlInfo(data) {
    return request.post(`api/admin/channelMgr/channelPage/dlInfo`, data);
}
//--修改put
export function changeDlInfo(data) {
    return request.put(`api/admin/channelMgr/channelPage/dlInfo`, data);
}
//--delete 删除
export function delDlInfo(data) {
    return request.post(`api/admin/channelMgr/channelPage/delDlInfo`, data);
}

// 3.单个落地页的入口地址修改
export function updateQrUrls(data) {
    return request.post(`api/admin/channelMgr/channelPage/updateQrUrls`, data);
}

// 4.单个h5访问地址修改
export function updateH5Urls(data) {
    return request.post(`api/admin/channelMgr/channelPage/updateH5Urls`, data);
}

//5.获取模版列表
export function getDlTmpList(data) {
    return request.get(`api/admin/channelMgr/channelPage/getDlTmpList`, { params: data });
}

// 6.单个跳转域名修改
export function updateDlUrls(data) {
    return request.post(`api/admin/channelMgr/channelPage/updateDlUrls`, data);
}
/*********************合作配置修改记录页面 */

//1.获取修改记录
export function getCooperationLog(data) {
    return request.get(`api/admin/channelMgr/cooperationLog/getMany`, { params: data });
}

/***********************渠道验证充值页面 */
// 1.获取需要重置的账号
export function getListLoginHiddenAuth(data) {
    return request.get(`api/admin/channelMgr/channelAct/loginHiddenAuth/getList`, { params: data });
}


// 2.重置验证
export function resetLoginHiddenAuth(data) {
    return request.post(`api/admin/channelMgr/channelAct/loginHiddenAuth/reset`, data);
}
// 3.批量修改功能
export function updatePlist(data) {
    return request.post(`api/admin/channelMgr/channelPage/updatePlist`, data);
}