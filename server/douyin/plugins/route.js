export default (context) => {
    console.log("plugin route init");

    context.app.router.beforeEach(async(to, from, next) => {
        console.log("route beforeEach ", from.path, to.path);
        // 强制访问比如从首页进入
        // if (!context.$env.isDev()) {
        if (to.path !== "/" && (window.app && !window.app.started)) {
            window.go = context.route;
            return next("/");
        }
        // }
        if (to.path === "/update") {
            let apiBaseUrl = context.$checkLine.getApiBaseUrl();
            let webBaseUrl = context.$checkLine.getWebBaseUrl();
            if (!apiBaseUrl || !webBaseUrl) {
                return next("/");
            }
        } else {
            let apiBaseUrl = context.$checkLine.getApiBaseUrl();
            if ((!apiBaseUrl) &&
                to.path !== "/" &&
                to.path !== "/launch") {
                return next("/");
            }

            context.$ga.pageview(to.fullPath);
            if (apiBaseUrl) {
                context.$userStore.getMyInfo();
                if (to.path !== "/login") {
                    if (!context.$userStore.isLogin()) {
                        context.$userStore.Logout();

                        if (to.path === "/") {
                            let channel = context.$channel.getChannel();
                            if (!channel) {
                                if (!channel || channel == "") {
                                    try {
                                        let clipboardVal = await navigator.clipboard.readText();
                                        if (!!clipboardVal) {
                                            channel = v;
                                        }
                                    } catch {}
                                }
                                if (!channel || channel == "") {
                                    channel = context.route.query.channel ? context.route.query.channel : "";
                                }
                                context.$channel.setChannel(channel);
                            }
                            let promote = context.$channel.getPromoteCode();
                            if (!promote) {
                                if (!promote || promote == "") {
                                    try {
                                        let clipboardVal = await navigator.clipboard.readText();
                                        if (!!clipboardVal) {
                                            promote = v;
                                        }
                                    } catch {}
                                    if (promote.indexOf("promote=") != -1) {
                                        let str = promote.split("promote=");
                                        promote = str[1];
                                    }
                                }
                                if (!promote) {
                                    promote = context.route.query.q ? context.route.query.q : "";
                                }
                                if (promote) {
                                    context.$channel.setPromoteCode(promote);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (to.path === "/recharge/vipRecharge") {
            return next('/recharge?type=vip');

        } else if (to.path === "/recharge/diamondRecharge") {
            return next('/recharge?type=diamond');
        }

        return next();
    });
};