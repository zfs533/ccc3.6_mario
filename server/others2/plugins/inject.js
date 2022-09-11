Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

export default (context, inject) => {
    console.log("plugin inject load");

    window._open = window.open;
    window.open = (url, target) => {
        if (!url) {
            return;
        }
        if (url.startsWith("/")) {
            if (url.includes('/customer')) {
                context.app.router.push({
                    path: "/frame",
                    query: {
                        target: context.$customer.getCustomerUrl(),
                        from: window.location.pathname,
                        title: "在线客服"
                    },
                });
            }
            else {
                if (!url.includes("?")) {
                    context.app.router.push({
                        path: url
                    });
                }
                else {
                    let str = url.match(/\?(\S*)/)[1];
                    const params = new URLSearchParams(str);
                    let query = {};
                    for (const param of params) {
                        query[param[0]] = param[1];
                    }
                    context.app.router.push({
                        path: url,
                        query: query
                    });
                }
            }
        } else {
            if (target === "_frame") {
                context.app.router.push({
                    path: "/frame",
                    query: {
                        target: url,
                        from: window.location.pathname,
                    },
                });
            } else if (!context.$cordova) {
                if (url.startsWith("https")) {
                    var a1 = document.createElement("a");
                    a1.href = url;
                    a1.target = "_blank";
                    a1.click();
                    // context.app.router.push({
                    //     path: "/frame",
                    //     query: {
                    //         query: context.route.query,
                    //         target: url
                    //     }
                    // });
                } else {
                    var a1 = document.createElement("a");
                    a1.href = url;
                    a1.target = "_blank";
                    a1.click();
                }
            } else {
                context.$cordova.open(url, '_system', 'location=yes');
            }
        }
    };
    console.log("plugin inject load ok");
};