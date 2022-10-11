const defaultUserInfo = {
    avatarURL: "",
    channel: "",
    createdDate: "0000-00-00 00:00",
    diamond: 0,
    followCnt: 0,
    followTagCnt: 0,
    followerCnt: 0,
    id: "",
    inviteCnt: 0,
    likedCnt: 0,
    location: "中国",
    rechargeTotal: 0,
    selfInviteCode: "0",
    status: 2,
    uid: 0,
    username: "",
    videoCnt: 0,
    vip: 0,
    vipLevel: 0,
    introduce: "",
    headBase64Data: "",
    inviteDate: "",
    isCheckInToDay: false,
    dailyVideoTimes: 0,// 每日总次数
    remainTimes: 0,//剩余次数
    videoHistory: [],
};
var userInfo;
export default (context, inject) => {
    console.log("plugin userStore init");

    let resToken = "";

    function isBind() {
        getToken();
        getMyInfo();
        let isBind = !!resToken && !!userInfo.phone;
        return isBind;
    };

    function isLogin() {
        console.log("userStore isLogin", resToken);
        if (!resToken) return false;
        return true;
    };

    function Logout() {
        setToken("", true);
        clearUserInfo();
    };

    function updateUserInfo(data) {
        if (data) {
            if (!userInfo) userInfo = defaultUserInfo;
            userInfo = { ...userInfo, ...data };
            if (userInfo.uid) {
                let s = JSON.stringify(userInfo);
                context.$storage.set("userInfo", s);
            }
            if (data.customerUrls) {
                context.$customer.setUrls(data.customerUrls);
            }
        }
    };

    function checkLogin(isShowConfirm = true) {
        if (!isLogin()) {
            if (isShowConfirm) {
                window.$nuxt.$dialog.confirm({
                    className: 'fistDialog',
                    title: '您还没有登录',
                    message: '去登陆',
                    confirmButtonColor: "red"
                }).then(() => {
                    context.app.router.push({ path: "/login" });
                }).catch(() => {
                });
            }
            else
                context.app.router.push({ path: "/login" });
            return false;
        }
        return true;
    }

    function clearUserInfo() {
        let s = JSON.stringify(defaultUserInfo);
        context.$storage.remove("userInfo");
        userInfo = defaultUserInfo;
    };

    function getMyInfo() {
        if (!userInfo) {
            let s = context.$storage.getObject("userInfo");
            if (!s || s.uid === defaultUserInfo.uid) {
                if (userInfo) {
                    return userInfo;
                }
            }
            userInfo = s || defaultUserInfo;
        }
        return userInfo;
    };

    function setToken(token, isAnonymous) {
        if (token) {
            console.log("setToken ", token);
            resToken = token;
            context.$storage.setCookie("resToken", token);
            context.$storage.setCookie("isAnonymous", isAnonymous);

            context.$storage.set("resToken", token);
            context.$storage.set("isAnonymous", isAnonymous);
        } else {
            resToken = "";
            context.$storage.remove("resToken");
            context.$storage.remove("isAnonymous");
            context.$storage.removeCookie("resToken");
            context.$storage.removeCookie("isAnonymous");
        }
    }

    function updateCheckInStatus(todayCheckIn, continueDays) {
        if (userInfo) {
            userInfo.isCheckInToDay = todayCheckIn;
            userInfo.checkInDays = continueDays;
        }
    }

    function getTodayCheckIn() {
        if (userInfo) {
            return userInfo.isCheckInToDay;
        }
        return false;
    }

    function getCheckInDays() {
        if (userInfo) {
            return userInfo.checkInDays;
        }
        return 0;
    }

    function getToken() {
        if (resToken) return resToken;
        resToken = context.$storage.getCookie("resToken");
        if (resToken) {
            console.log("getCookie resToken ", resToken);
            return resToken;
        }
        resToken = context.$storage.getString("resToken");
        if (resToken) {
            context.$storage.setCookie("resToken", resToken);
            console.log("storage resToken", resToken);
        }
        return resToken;
    }

    getToken();
    inject("userStore", {
        isBind,
        isLogin,
        Logout,
        updateUserInfo,
        getMyInfo,
        setToken,
        getTodayCheckIn,
        getCheckInDays,
        updateCheckInStatus,
        getToken,
        checkLogin
    });
};