
import Vue from 'vue';

export default (context, inject) => {
    console.log("plugin logger load");

    /*
      * 合并对象，将配置的参数也一并上报
      */
    function cloneObj(oldObj) { // 复制对象方法
        if (typeof (oldObj) !== 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var prop in oldObj) { newObj[prop] = oldObj[prop]; }
        return newObj;
    };

    function extendObj() { // 扩展对象
        var args = arguments;
        if (args.length < 2) { return; }
        var temp = cloneObj(args[0]); // 调用复制对象方法
        for (var n = 1, len = args.length; n < len; n++) {
            for (var index in args[n]) {
                temp[index] = args[n][index];
            }
        }
        return temp;
    }

    /*
      *  默认上报的错误信息
      */
    var defaults = {
        ua: window.navigator.userAgent,
        browser: context.$env.browser,
        os: context.$env.os.name,
        osVersion: context.$env.os.version,
        errUrl: window.location.href,
        msg: '', // 错误的具体信息
        url: '', // 错误所在的url
        line: '', // 错误所在的行
        col: '' // 错误所在的列
    };

    /**
     * event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error
     */
    const reportError = (error, source, lineno, colno) => {
        setTimeout(() => {
            // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
            colno = colno || (window.event && window.event.errorCharacter) || 0;
            defaults.time = Date.now();
            defaults.url = source;
            defaults.line = String(lineno || "0");
            defaults.col = String(colno || "0");
            defaults.msg = "";
            if (error.filename)
                defaults.msg = error.filename;
            if (error.message)
                defaults.msg += error.message;
            if (error && error.stack) {
                // 如果浏览器有堆栈信息，直接使用
                defaults.msg += error.stack.toString();
            } else {
                try {
                    if (arguments.callee) {
                        // 尝试通过callee拿堆栈信息
                        var ext = [];
                        var fn = arguments.callee.caller;
                        var floor = 3; // 这里只拿三层堆栈信息
                        while (fn && (--floor > 0)) {
                            ext.push(fn.toString());
                            if (fn === fn.caller) {
                                break;// 如果有环
                            }
                            fn = fn.caller;
                        }
                        defaults.msg += ext.join(',');
                    }
                } catch { }
            }
            var reportData = extendObj({
                version: context.$env.version
            }, defaults);
            // 把错误信息发送给后台
            if (reportData.msg) {
                context.$api.reportError(reportData);
                if (context.$env.log) {
                    console.log("reportError", reportData);
                    if (!reportData.msg.includes("timeout")) {
                        window.$nuxt.$dialog({ title: "错误已上报赶快去看看吧", message: reportData.url + "\n" + reportData.msg });
                    }
                }
            }
        }, 0);
        return true; // 错误不会console浏览器上,如需要，可将这样注释
    };

    function injectConsole() {
        if (window.errorReport) {
            return window.errorReport;
        }
        const console = window.console;
        var tempFunction, color,
            output = document.querySelector('#output');
        for (var key in console) {
            if (key.match(/log|debug|error|info|warn|dir/)) {
                tempFunction = console[key];
                switch (key) {
                    case 'log':
                        color = '#1F2D3D';
                        break;
                    case 'debug':
                        color = '#1D8CE0';
                        break;
                    case 'error':
                        color = '#FF4949';
                        break;
                    case 'info':
                        color = 'blue';
                        break;
                    case 'warn':
                        color = '#F7BA2A';
                        break;
                    case 'dir':
                        color = '#58B7FF';
                        break;
                    default:
                        color = '#1F2D3D';
                        break;
                }
                (function (color, tempFunction) {
                    console[key] = function () {
                        let log = context.$env.log || window.log;
                        if (!log) {
                            return;
                        }
                        if (output) {
                            var result = '';
                            for (var i = 0; i < arguments.length; i++) {
                                if ('object' == typeof arguments[i]) {
                                    //TODO
                                    //递归遍历对象控制输出，这里不做演示，在我的ajax-watcher库里是用的jquery插件
                                } else {
                                    result += arguments[i];
                                }
                            }
                            var element = document.createElement("p");
                            element.style.color = color;
                            element.innerText = result;
                            output.appendChild(element);
                        }
                        if (tempFunction.name === "error") {
                            tempFunction.apply(console, arguments);

                        } else {
                            tempFunction.apply(console, arguments);
                        }
                    }.bind(window);
                })(color, tempFunction);
            }
        }
    }


    function writeLog(api, data) {
        let log = context.$env.log || window.log;
        if (log) {
            console.log("--api:---" + api + "-----data:", data);
        }
    }

    injectConsole();

    function init() {
        let defaultErrorHandler = Vue.config.errorHandler;
        Vue.config.errorHandler = function (err, vm, info) {
            console.log("errorHandler", err);
            context.$logger.reportError(err, context.route.path);
            if (defaultErrorHandler) {
                defaultErrorHandler(err, vm, info);
            }
        };
    }
    console.log("plugin logger load ok");

    inject("logger", {
        init,
        reportError,
        writeLog
    });
};
