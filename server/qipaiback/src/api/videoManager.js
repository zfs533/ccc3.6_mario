import request from '@/utils/request';


// 获取视频分类(一级分类)
export function getManyFirst(data) {
    return request.get(`api/admin/serverCfg/categories/getManyFirst`, { params: data });
}
// 获取视频分类子集
export function getManySub(data) {
    return request.get(`api/admin/serverCfg/categories/getManySub`, { params: data });
}
// 新增分类
export function insertCategories(data) {
    return request.post(`api/admin/serverCfg/categories/insert`, data);
}
// 修改
export function updateCategories(data) {
    return request.post(`api/admin/serverCfg/categories/update`, data);
}
// 添加标签到分类下
export function addCategoryTag(data) {
    return request.post(`api/admin/serverCfg/tags/addCategoryTag`, data);
}
// 删除分类下标签
export function delCategoryTag(data) {
    return request.post(`api/admin/serverCfg/tags/delCategoryTag`, data);
}
// 给分类下的标签排序
export function sortCategoryTag(data) {
    return request.post(`api/admin/serverCfg/tags/sortCategoryTag`, data);
}
// 删除
export function deleteCategories(data) {
    return request.post(`api/admin/serverCfg/categories/delete`, data);
}


//获取所有分类
export function categoriesMany(data) {
    return request.get(`api/admin/serverCfg/categories/get`, { params: data });
}



// 获取标签
export function getManyTags(data) {
    return request.get(`api/admin/serverCfg/tags/getMany`, { params: data });
}
// 添加标签
export function insertTags(data) {
    return request.post(`api/admin/serverCfg/tags/insert`, data);
}
// 修改标签
export function updateTags(data) {
    return request.post(`api/admin/serverCfg/tags/update`, data);
}
// 删除标签
export function deleteTags(data) {
    return request.post(`api/admin/serverCfg/tags/delete`, data);
}

// 标签排序
export function sortManyTags(data) {
    return request.post(`api/admin/serverCfg/tags/sortMany`, data);
}

// 获取上线的视频资源
export function getCategoryTags(data) {
    return request.get(`api/admin/serverCfg/tags/getCategoryTags`, { params: data });
}



// 获取上线的视频资源
export function getManyVideos(data) {
    return request.get(`api/admin/videoMananger/gameVideos/getMany`, { params: data });
}
// 上线的视频资源导出
export function videosExcel(data) {
    return request.get(`api/admin/export/gameVideos/videosExcel`, { params: data });
}
// 编辑线上视频信息
export function updateVideos(data) {
    return request.post(`api/admin/videoMananger/gameVideos/updateOne`, data);
}

// 编辑线上视频信息
export function editAtlas(data) {
  return request.post(`api/admin/videoMananger/gameVideos/editAtlas`, data);
}
// 编辑线上视频信息
export function editAtlas1(data) {
  return request.post(`api/admin/videoMananger/verifyVideos/editAtlas`, data);
}
// 克隆
export function cloneContent(data) {
    return request.post(`api/admin/videoMananger/gameVideos/cloneOne`, data);
}
// 上传封面
export function updateCoverURL(data) {
    return request.post(`api/admin/videoMananger/gameVideos/updateCoverURL`, data);
}
// 批量编辑
export function blukUpdateVideos(data) {
    return request.post(`/api/admin/videoMananger/gameVideos/updatePlist`, data);
}

// 批量审核视频
export function updatePlist(data) {
    return request.post(`/api/admin/videoMananger/verifyVideos/updatePlist`, data);
}


//切换上下架
export function updateState(data) {
    return request.post(`/api/admin/videoMananger/gameVideos/updateState`, data);
}


// 获取审核视频列表
export function getManyVerifyVideos(data) {
    return request.get(`api/admin/videoMananger/verifyVideos/getMany`, { params: data });
}

// 审核视频
export function updateVerifyVideos(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/verifyOne`, data);
}
// 发布一个视频
export function releaseVideo(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/releaseOne`, data);
}
// 添加图集
export function atlasInsertContent(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/insertContent`, data);
}


//分配审核任务
export function addVerifyTask(data) {
    return request.get(`api/admin/videoMananger/verifyVideos/addVerifyTask`, { params: data });
}
//刷新审核任务
export function flushVerifyTask(data) {
    return request.get(`api/admin/videoMananger/verifyVideos/flushVerifyTask`, { params: data });
}
//取消单个审核任务,这个删除按钮显示必须是前面两个路由拉取的数据
export function cancelAllVerifyTask(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/cancelAllVerifyTask`, data);
}
//取消全部审核任务
export function cancelOneVerifyTask(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/cancelOneVerifyTask`, data);
}

//通过初审
export function passOne(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/passOne`, data);
}
//暂存
export function waitOne(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/waitOne`, data);
}
//审核不通过
export function delOne(data) {
    return request.post(`api/admin/videoMananger/verifyVideos/delOne`, data);
}

//上传图片
export function uploadImg(data) {
    return request.post(`api/admin/uploadImg`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
//下载电影

export function downVideo(data) {
    return request.get(`api/admin/videoMananger/downVideo`, { params: data });
}



// 获取该分类下所有的推送视频
export function getAllSort(data) {
    return request.get(`api/admin/videoMananger/videoCategorySort/getAll`, { params: data });

}

// 为一个分类添加一个推送视频，可排序
export function addManySort(data) {
    return request.post(`api/admin/videoMananger/videoCategorySort/addMany`, data);
}

export function updateOneSort(data) {
    return request.post(`api/admin/videoMananger/videoCategorySort/updateOne`, data);
}

// 排序推送视频
export function updateSortSort(data) {
    return request.post(`api/admin/videoMananger/videoCategorySort/updateSort`, data);

}

// 删除一分类的推送视频
export function deleteOneSort(data) {
    return request.post(`api/admin/videoMananger/videoCategorySort/deleteOne`, data);

}

// 统计各个分类的当前推送视频数量
export function getStatisticsSort(data) {
    return request.get(`api/admin/videoMananger/videoCategorySort/getStatistics`, { params: data });
}

// 统计各个分类的当前推送视频数量
export function getPublisher(data) {
    return request.get(`api/admin/usersManager/blogger/getPublisher`, { params: data });
}
// 批量移除
export function videoDeleteMany(data) {
    return request.post(`api/admin/videoMananger/videoCategorySort/deleteMany`, data);
}

export function comments_getMany(data) {
    return request.get(`api/admin/videoMananger/commentsAudit/getMany`, { params: data });
}
export function comments_update(data) {
    return request.post(`api/admin/videoMananger/commentsAudit/update`, data);
}

export function clientRes_getMany(data) {
    return request.get(`api/admin/videoMananger/clientResMgr/getMany`, { params: data });
}

export function clientRes_addOne(data) {
    return request.post(`api/admin/videoMananger/clientResMgr/addOne`, data);
}
export function clientRes_update(data) {
    return request.post(`api/admin/videoMananger/clientResMgr/update`, data);
}
