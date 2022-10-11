import device from "~/assets/js/device";
import safeAreaInsets from "~/assets/js/sefa-area";

export default (context, inject) => {
    const env = context.env.NODE_ENV;
    console.log("====front env====", env);
    /**
   获取浏览器类型
  */
    function getBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  


        var isIE11 = userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/); // IE 11中userAgent已经不包含'msie'所以用'msie'不能判断IE 11  
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
        var isIE = (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) || isIE11; //判断是否IE浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

        if (isIE) {
            return "IE";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isFF) {
            return "Firefox";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        return '--';
    }

    /**
     获取设备是安卓、IOS  还是PC端
    */
    function getOsInfo() {
        var userAgent = navigator.userAgent.toLowerCase();
        var name = 'Unknown';
        var version = 'Unknown';
        if (userAgent.indexOf('win') > -1) {
            name = 'Windows';
            if (userAgent.indexOf('windows nt 5.0') > -1) {
                version = 'Windows 2000';
            } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
                version = 'Windows XP';
            } else if (userAgent.indexOf('windows nt 6.0') > -1) {
                version = 'Windows Vista';
            } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
                version = 'Windows 7';
            } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
                version = 'Windows 8';
            } else if (userAgent.indexOf('windows nt 6.3') > -1) {
                version = 'Windows 8.1';
            } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
                version = 'Windows 10';
            } else {
                version = 'Unknown';
            }
        } else if (userAgent.indexOf('iphone') > -1) {
            name = 'IOS';
            var verinfo = userAgent.match(/OS [\d._]*/gi);
            version = 'IOS' + (verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
        } else if (userAgent.indexOf('mac') > -1) {

            name = 'Mac';
        } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
            name = 'Unix';
        } else if (userAgent.indexOf('linux') > -1) {
            if (userAgent.indexOf('android') > -1) {
                name = 'Android';
                var match = userAgent.match(/android\s([0-9\.]*)/);
                version = match ? match[1] : false;
            } else {
                name = 'Linux';
            }
        } else {
            name = 'Unknown';
        }
        return { name, version };
    }

    const os = getOsInfo();
    const browser = getBrowser();
    const pwa = context.route.query.from === "pwa";
    const webclip = context.route.query.from === "webclip";

    inject("env", {
        env: env,
        log: context.isDev || context.env.LOG,  // 开发环境需要打印日志
        isDev: () => { return context.isDev || env === "development"; },
        isProd: () => { return env === "production"; },
        isTest: () => { return env === "test"; },
        pid: context.env.PID,
        baseUrl: window.__NUXT__.config._app.basePath,
        apiUrls: context.env.API_URLS || [],
        webUrls: context.env.WEB_URLS || [],
        version: context.env.VERSION,
        options: context.env.OPTIONS,
        buildTime: context.env.BUILDTIME,
        isPreprod: context.env.PREPROD,
        inPwa: pwa,
        inWebclip: webclip,
        inCordova: device.cordova(),
        browser: browser,
        os: os,
        device: device,
        safeAreaInsets,
    });
};