import { sha1, urlJoin } from "~/assets/js/utils";

export default (context, inject) => {
    console.log("plugin api init");

    function checkResonseData(res, err) {
        let retData;
        if (err) {
            retData = {
                errorCode: 500,
                message: err.message
            };
            return retData;
        }

        if (!res || !res.data) {
            console.warn("checkResonseData res null", api);
            retData = {
                errorCode: 500,
                message: "未知网络请求错误"
            };
        } else {
            if (typeof(res.data) === 'string') {
                try {
                    retData = JSON.parse(res.data);
                } catch {
                    retData = {
                        errorCode: 500,
                        message: "数据格式错误"
                    };
                }
            } else {
                retData = res.data;
            }
            if (retData.data) {
                if (context.$env.isProd()) {
                    if (retData) {
                        retData.data = context.$crypto.decryptionObject(retData.data);
                    }
                }
            }
        }
        return retData;
    }

    async function sendImg(paramdata) {
        const axios = context.$axios;
        let data;
        let fullUrl = urlJoin(context.$checkLine.getApiBaseUrl(), '/users/uploadAvatar');
        res = await axios({
            url: fullUrl,
            method: 'post',
            data: paramdata,
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
        if (res.data.code === 200) {
            return data.data;
        } else {
            console.warn('上传失败!');
            return null;
        }
    }

    async function sendAxiosPost(api, paramdata, isAnonymous = false) {
        let baseUrl = context.$checkLine.getApiBaseUrl();
        if (!baseUrl) {
            console.warn("reportError apiBaseUrl not init");
            return {
                errorCode: 500,
                message: "apiBaseUrl not init"
            };
        }
        let version;
        if (context.$version) {
            version = await context.$version.getClientVersion();
        }
        return new Promise(async(resolve) => {
            const axios = context.$axios;
            let reqRet;
            if (context.$env.isProd()) {
                // 加密
                paramdata = {
                    'en': context.$crypto.encrypt(paramdata)
                };
            }
            let token = isAnonymous ? "" : context.$userStore.getToken();

            let fullUrl = urlJoin(baseUrl, api);
            axios({
                url: fullUrl,
                method: 'post',
                data: paramdata,
                headers: {
                    'token': token,
                    'version': version,
                }
            }).then((res) => {
                resolve(checkResonseData(res));
            }).catch((err) => {
                resolve(checkResonseData(undefined, err));
            });
        });
    }

    async function sendAxiosGet(api, paramdata, cache) {
        let baseUrl = context.$checkLine.getApiBaseUrl();
        if (!baseUrl) {
            console.warn("reportError apiBaseUrl not init");
            return {
                errorCode: 500,
                message: "apiBaseUrl not init"
            };
        }
        let version;
        if (context.$version) {
            version = await context.$version.getClientVersion();
        }

        let token = context.$userStore.getToken();
        let fullUrl = urlJoin(baseUrl, api);

        let params = {
            url: fullUrl,
            method: 'get',
            params: paramdata,
            headers: {
                'token': token,
                'version': version,
            }
        };
        let cacheId = 'cache-' + sha1(JSON.stringify(params));
        let promiseFunc = () => new Promise(async(resolve) => {
            const axios = context.$axios;
            // if (context.$env.isProd()){
            //   paramdata = {
            //     'en': context.$crypto.encrypt(paramdata)
            //   } 
            // }   
            console.log("sendAxiosGet start", fullUrl, token, paramdata);
            axios(params).then((res) => {
                let ret = checkResonseData(res);
                if (cache) {
                    if (ret.errorCode === 0) {
                        if (isNaN(cache)) {
                            context.$storage.set(cacheId, ret);
                        } else {
                            context.$storage.set(cacheId, ret, cache);
                        }
                    }
                }
                resolve(ret);
            }).catch((err) => {
                resolve(checkResonseData(undefined, err));
            });
        });
        if (cache) {
            if (!context.$storage.isExpire(cacheId)) {
                let cacheData = context.$storage.getObject(cacheId);
                if (cacheData) {
                    promiseFunc();
                    return Promise.resolve(cacheData);
                }
            }
        }
        return promiseFunc();
    }

    async function sendAxiosDelete(api, paramdata) {
        let baseUrl = context.$checkLine.getApiBaseUrl();
        if (!baseUrl) {
            console.warn("reportError apiBaseUrl not init");
            return {
                errorCode: 500,
                message: "apiBaseUrl not init"
            };
        }
        let version;
        if (context.$version) {
            version = await context.$version.getClientVersion();
        }

        return new Promise(async(resolve) => {
            const axios = context.$axios;
            if (context.$env.isProd()) {
                paramdata = {
                    'en': context.$crypto.encrypt(paramdata)
                };
            }
            let token = context.$userStore.getToken();
            let fullUrl = urlJoin(baseUrl, api);
            axios({
                url: fullUrl,
                method: 'delete',
                params: paramdata,
                headers: {
                    'token': token,
                    'version': version,
                }
            }).then((res) => {
                resolve(checkResonseData(res));
            }).catch((err) => {
                resolve(checkResonseData(undefined, err));
            });
        });
    };

    async function sendAxiosPut(api, paramdata) {
        let baseUrl = context.$checkLine.getApiBaseUrl();
        if (!baseUrl) {
            console.warn("reportError apiBaseUrl not init");
            return {
                errorCode: 500,
                message: "apiBaseUrl not init"
            };
        }
        let version;
        if (context.$version) {
            version = await context.$version.getClientVersion();
        }

        return new Promise(async(resolve) => {
            const axios = context.$axios;
            if (context.$env.isProd()) {
                paramdata = {
                    'en': context.$crypto.encrypt(paramdata)
                };
            }
            let token = context.$userStore.getToken();
            let fullUrl = urlJoin(baseUrl, api);

            axios({
                url: fullUrl,
                method: 'put',
                data: paramdata,
                headers: {
                    'token': token,
                    'version': version,
                }
            }).then((res) => {
                resolve(checkResonseData(res));
            }).catch((err) => {
                resolve(checkResonseData(undefined, err));
            });
        });
    }

    function reportError(paramdata) {
        const axios = context.$axios;
        if (context.$env.isProd()) {
            // 加密
            paramdata = {
                'en': context.$crypto.encrypt(paramdata)
            };
        }
        let apiBaseUrl = context.$checkLine.getApiBaseUrl();
        if (!apiBaseUrl) {
            console.warn("reportError apiBaseUrl not init");
            return;
        }
        let token = context.$userStore.getToken();
        let fullUrl = urlJoin(apiBaseUrl, "reportError");

        axios.ajax({
            url: fullUrl,
            method: 'post',
            data: paramdata,
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
    }

    function getAppModule(paramdata) {
        return sendAxiosGet("app/module", paramdata);
    }

    // 获取播放视频的信息
    function getPlayVideoInfo(paramdata) {
        return sendAxiosGet("videos/" + paramdata);
    }

    // 获取验证码
    function getPhoneCode(paramdata) {
        paramdata.pid = context.$env.pid;
        return sendAxiosPost("users/smscode", paramdata);
    }

    // 获取个人信息
    async function updateMyInfo() {
        let res = await sendAxiosGet("users/info");
        if (res) {
            if (res.errorCode === 0 && res.data) {
                let data = res.data;
                if (data) {
                    context.$userStore.updateUserInfo(data);
                    if (data.customerUrls) {
                        context.$customer.setUrls(data.customerUrls);
                    }
                }
            }
        }
        return res;
    }

    // 更新个人信息
    function changeMyInfo(paramdata) {
        return sendAxiosPut("users/updateInfo", paramdata);
    }

    // 登录
    async function signin(paramdata, isAnonymous = false) {
        paramdata.pid = context.$env.pid;
        let res = await sendAxiosPost("users/signin", paramdata, isAnonymous);
        if (res.errorCode === 0 && res.data) {
            let resToken = res.data.resToken.token;
            if (resToken) {
                context.$userStore.setToken(resToken, isAnonymous);
                await updateMyInfo();
            }
        }
        window.$nuxt.$emit("login");
        return res;
    }

    // 获取首页关注
    function getFollowPageData(paramdata) {
        return sendAxiosGet("tab/module/myFollow", paramdata);
    }

    // 获取一级分类信息
    function getFristCategoriesData(id, paramdata) {
        return sendAxiosGet("tab/module/" + id, paramdata);
    }

    // 获取二级分类信息
    function getSecondCategoriesData(id, paramdata) {
        return sendAxiosGet("categories/" + id, paramdata);
    }

    // 获取已关注主播
    function getFollowUps(paramdata) {
        return sendAxiosGet("users/follows", paramdata);
    }
    // 获取未关注主播
    function getUnfollowUps(paramdata) {
        return sendAxiosGet("users/unfollows", paramdata);
    }
    // 关注主播
    async function followUp(uid) {
        let res = await sendAxiosPost("users/" + uid + "/follow");
        if (res.errorCode === 0) {
            let myInfo = context.$userStore.getMyInfo();
            context.$userStore.updateUserInfo({ followCnt: myInfo.followCnt + 1 });
        }
        return res;
    }
    // 取消关注主播
    async function unfollowUp(uid) {
        let res = await sendAxiosDelete("users/" + uid + "/follow");
        if (res.errorCode === 0) {
            let myInfo = context.$userStore.getMyInfo();
            context.$userStore.updateUserInfo({ followCnt: myInfo.followCnt - 1 });
        }
        return res;
    }
    // 获取其他用户主页信息
    function getUserVideos(uid, paramdata) {
        return sendAxiosGet("users/" + uid + "/videos", paramdata);
    }
    // 获取其他用户主页信息
    function getUserInfo(uid, paramdata) {
        return sendAxiosGet("users/" + uid + "/info", paramdata);
    }

    // 点赞视频
    function likeVideo(vid) {
        if (!context.$userStore.isLogin()) {
            context.app.router.push({ path: "/login" });
            return;
        }
        return sendAxiosPost("videos/" + vid + "/like");
    }
    // 取消点赞视频
    function unLikeVideo(vid) {
        if (!context.$userStore.isLogin()) {
            context.app.router.push({ path: "/login" });
            return;
        }
        return sendAxiosDelete("videos/" + vid + "/like");
    }



    let lastCommentData = 0;
    // 创建评论
    function sendComment(source, paramdata) {
        let curCommentTime = new Date();
        let interTime = Math.floor((curCommentTime - lastCommentData) / 1000);
        if (interTime < 30) {

            let message = `评论太快了，${30 - interTime} 秒后，可再次回复`;
            return { errorCode: 1, message: message };
        }
        lastCommentData = curCommentTime;
        let apiStr = `comments/${source}`;
        console.log('apiStr', apiStr);
        return sendAxiosPost(apiStr, paramdata);
    }
    // 点赞评论
    function sendLikeComment(source, commentId, paramdata) {
        let apiStr = `comments/${source}/comment/${commentId}/like`;
        console.log('apiStr', apiStr);
        return sendAxiosPost(apiStr, paramdata);
    }


    // 取消点赞评论
    function sendUnlikeComment(source, commentId) {
        let apiStr = `comments/${source}/comment/${commentId}/like`;
        console.log('apiStr', apiStr);
        return sendAxiosDelete(apiStr);
    };




    // 一级评论列表
    function getFirstComments(source, sourceId, lastCommentId, paramdata) {
        let apiStr = `comments/${source}/${sourceId}/${lastCommentId}?limit=${paramdata}`;
        console.log('apiStr', apiStr);
        return sendAxiosGet(apiStr);
    }


    // 二级评论列表
    function getSecondComments(source, commentId, lastCommentId, paramdata) {
        let apiStr = `comments/${source}/comment/${commentId}/${lastCommentId}?limit=${paramdata}`;
        console.log('apiStr', apiStr);
        return sendAxiosGet(apiStr);
    }


    // 搜索主播或视频
    function searchUpOrVideo(paramdata) {
        return sendAxiosGet("search", paramdata);
    }

    // 进入一个标签的页面
    function getOneTagInfo(tagid) {
        return sendAxiosGet("tags/" + tagid);
    }

    // 关注标签
    function followTag(vid) {
        if (!context.$userStore.isLogin()) {
            context.app.router.push({ path: "/login" });
            return;
        }
        return sendAxiosPost("tags/" + vid + "/follow");
    }
    // 取消关注标签
    function unFollowTag(vid) {
        if (!context.$userStore.isLogin()) {
            context.app.router.push({ path: "/login" });
            return;
        }
        return sendAxiosDelete("tags/" + vid + "/follow");
    }
    // 所有关注人的视频
    function followedVideos(paramdata) {
        return sendAxiosGet("users/followedVideos", paramdata);
    }
    // 筛选单个标签下的视频
    function tagVideos(id, paramdata) {
        return sendAxiosGet("tag/" + id + "/videos", paramdata);
    }

    // 获取筛选标签
    function getFillterAllTag() {
        return sendAxiosGet("tags/all/info");
    }

    // 获取根据标签筛选视频
    function getFillterVideo(paramdata) {
        return sendAxiosGet("videos/filter", paramdata);
    }

    // 获取vip页面视频
    function getVipPageVideo(paramdata) {
        return sendAxiosGet("tab/module/vip", paramdata);
    }

    // 获取钻石页面视频
    function getDiamondPageVideo(paramdata) {
        return sendAxiosGet("tab/module/diamond", paramdata, );
    }

    // 获取自己收藏的视频
    // function getMyLikeVideos(paramdata) {
    //     return sendAxiosGet("users/like", paramdata);
    // }

    // 获取自己收藏的视频
    function getMyCollectVideos(paramdata) {
        return sendAxiosGet("users/collections", paramdata);
    }


    // 获取自己购买的视频
    function getMyBuyVideos(paramdata) {
        return sendAxiosGet("user/boughtVideos", paramdata);
    }

    // 获取钻石流水明细
    function getDiamondConsumeRecord(paramdata) {
        return sendAxiosGet('user/diamondConsumeRecord', paramdata);
    }

    // 获取充值配置
    function getRechargeCfg(paramdata) {
        return sendAxiosGet("recharge/payEnforce/getRechargeCfg", paramdata);
    }
    // 
    function recharge(paramdata) {
        return sendAxiosPost("recharge/commodity", paramdata);
    }

    // VIP充值
    function getRechargeHistory(paramdata) {
        return sendAxiosGet("user/rechargeHistory", paramdata);
    }

    // 兑换码兑换VIP

    function exchangeCode(paramdata) {
        return sendAxiosPost("activity/exchangeCode", paramdata);
    }
    // function getVipRedemption(paramdata) {
    //     return sendAxiosGet("user/vipRedemption", paramdata);
    // }

    // 用户关注哪些人
    function getUserFollow(paramdata) {
        return sendAxiosGet("users/follows", paramdata);
    }

    // 用户有哪些粉丝
    function getUserFans(paramdata) {
        return sendAxiosGet("users/followers", paramdata);
    }
    // 用户邀请的人
    function getInvitationRecord(paramdata) {
        return sendAxiosGet("user/invitationRecord", paramdata);
    }

    // 绑定邀请码
    function bindInviteCode(paramdata) {
        return sendAxiosPost("users/bindInviteCode", paramdata);
    }

    // 获取短视频
    function getShortVideos(paramdata) {
        return sendAxiosGet("videos/short", paramdata);
    }

    // 猜你喜欢
    function getCanLikeVideos(paramdata) {
        return sendAxiosGet("user/canLikeVideos", paramdata);
    }

    // 获取视频历史记录
    function getVideoHistory(paramdata) {
        return sendAxiosGet("users/history", paramdata);
    }

    // 更新历史记录时间
    function updateVideoHistory(id, paramdata) {
        return sendAxiosPost("users/history/" + id, paramdata);
    }

    function getDomains() {
        return sendAxiosGet("system/domains", { pid: context.$env.pid });
    }

    async function buyVideo(vid) {
        let res = await sendAxiosPost("users/" + vid + "/buyVideo");
        if (res.errorCode === 0 && res.data) {
            let newDiamond = res.data.diamond;
            if (!isNaN(newDiamond)) {
                context.$userStore.updateUserInfo({ diamond: newDiamond });
            }
        }
        return res;
    }

    // 收藏/取消视频
    function collectVideo(vid) {
        return sendAxiosPost(`videos/${vid}/collect`);
    }

    // 收藏/取消视频
    function unCollectVideo(vid) {
        return sendAxiosDelete(`videos/${vid}/collect`);
    }

    //获取签到活动配置
    function getCheckinConfig() {
        return sendAxiosGet("/activity/checkInCfg");
    }

    //签到，获取新人限时活动配置
    function getLimitedActivityCfg() {
        return sendAxiosGet("activity/newUserRewardCfg", null, false);
    }

    //签到
    function startCheckin() {
        return sendAxiosPost("activity/checkIn");
    }

    //签到，领取新用户限时福利
    function getNewUserReward(actId, taskId) {
        return sendAxiosPost("task/receiveReward", { actId: actId, taskId: taskId });
    }


    function promoteBasicInfo() {
        return sendAxiosGet(`agent/basicInfo`);
    }

    function promoteApply() {
        return sendAxiosGet(`agent/applyPromote`);
    }

    function promoteProfitDetail(paramdata) {
        return sendAxiosGet(`agent/profitDetail`, paramdata);
    }

    function promoteRecord(paramdata) {
        return sendAxiosGet(`agent/promoteRecord`, paramdata);
    }

    function promoteModifyBank(paramdata) {
        return sendAxiosPost(`agent/modifyBank`, paramdata);
    }

    function promoteWithdraw(paramdata) {
        let res = sendAxiosPost(`agent/withdraw`, paramdata);
        if (res.errorCode === 0) {
            updateMyInfo();
        }
        return res;
    }

    async function getHttpAvator(url) {
        const axios = context.$axios;
        let xurl = context.$checkLine.getResBaseUrl() + "/" + url;

        let names = xurl.split('/');
        let fileName = names[names.length - 1];

        let localAvatarName = context.$storage.getString("avatarName");

        if (localAvatarName == fileName) {
            let avatar = context.$storage.getString('avatar');
            if (avatar) {
                return avatar;
            }
        }
        let data = await axios({
            method: "get",
            url: xurl,
            responseType: "arraybuffer"
        });

        let bf = Buffer.from(data.data);
        let base64da = bf.toString('base64');
        let img = context.$crypto.decryption(base64da);

        context.$storage.set("avatarName", fileName);
        context.$storage.set("avatar", img);

        return img;
    }

    function getAllADData(pid) {
        return sendAxiosGet("ad/all", { pid });
    }

    inject("api", {
        sendImg,
        getAppModule,
        getPlayVideoInfo,
        getPhoneCode,
        updateMyInfo,
        changeMyInfo,
        signin,
        getFollowPageData,
        getFristCategoriesData,
        getSecondCategoriesData,
        getFollowUps,
        getUnfollowUps,
        followUp,
        unfollowUp,
        getUserVideos,
        getUserInfo,
        likeVideo,
        unLikeVideo,
        searchUpOrVideo,
        getOneTagInfo,
        followTag,
        unFollowTag,
        followedVideos,
        tagVideos,
        getFillterAllTag,
        getFillterVideo,
        getVipPageVideo,
        getDiamondPageVideo,
        getMyCollectVideos,
        getMyBuyVideos,
        getDiamondConsumeRecord,
        getRechargeCfg,
        recharge,
        getRechargeHistory,
        exchangeCode,
        getUserFollow,
        getUserFans,
        bindInviteCode,
        getShortVideos,
        getCanLikeVideos,
        getVideoHistory,
        updateVideoHistory,
        getDomains,
        buyVideo,
        collectVideo,
        unCollectVideo,
        getHttpAvator,
        getAllADData,
        reportError,
        startCheckin,
        getNewUserReward,
        updateMyInfo,
        getLimitedActivityCfg,
        getCheckinConfig,
        getInvitationRecord,

        promoteBasicInfo,
        promoteApply,
        promoteProfitDetail,
        promoteRecord,
        promoteModifyBank,
        promoteWithdraw,


        getFirstComments,
        getSecondComments,
        sendComment,
        sendLikeComment,
        sendUnlikeComment,
    });
};