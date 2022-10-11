
function copy(text) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
    document.body.removeChild(input);

}

function getQuery(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const result = window.location.search.substr(1).match(reg);
    if (result != null) {
        return decodeURI(result[2]);
    } else {
        return null;
    }
}

/*
   *格式化参数
   */
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}

/*
  *ajax封装
  */
window.ajax = (options) => {
    options = options || {};
    options.type = (options.method || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';

    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };
    if (options.type == 'GET') {
        var url = options.url;
        if (options.data) {
            if (options.url.includes("?")) {
                options.url + '&' + formatParams(options.data);
            } else {
                options.url + '?' + formatParams(options.data);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    } else if (options.type == 'POST') {
        xhr.open('POST', options.url, true);
        if (options.headers) {
            for (const key in options.headers) {
                if (options.headers.hasOwnProperty(key)) {
                    const val = options.headers[key];
                    xhr.setRequestHeader(key, val);
                }
            }
        }
        xhr.send(JSON.stringify(options.data));
    }
};

window.jsonp = (url, callbackId) => {
    if (!url) {
        console.error('请传入一个url参数');
        return Promise.resolve("");
    }
    return new Promise((resolve, reject) => {
        window[callbackId] = function (result) {
            return resolve({ data: result });
        };
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = `${url}&callback=` + callbackId;
        JSONP.onerror = (e) => {
            e.config = {
                url: JSONP.src
            };
            return reject(e);
        };
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP);
        }, 500);
    });
};

window.addEventListener('error', (event) => {
    if (event.filename && event.filename.startsWith("blob:")) return;

    let target = event.target || event.srcElement;
    let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
    if (isElementTarget) {
        let url = target.src || target.href;
        let tagName = target.tagName.toLowerCase();
        console.warn("load resource error", tagName, url);
        if (url.includes("version.js")) return;

        window.$nuxt && window.$nuxt.$logger.reportError({
            message: "load resource error",
            filename: url
        }, window.location.href, event.lineno, event.colno);
    } else {
        if (!event.message) return;
        if (event.message.includes("debug-evaluate")) return;
        if (event.message.includes("of input")) return;
        if (event.message.includes("Unexpected identifier")) return;
        if (event.message.includes("unexpected token")) return;
        if (event.message.includes("reportError")) return;

        console.warn('error 捕获到异常：', event);
        window.$nuxt && window.$nuxt.$logger.reportError(event, window.location.href, event.lineno, event.colno);
    }
}, true);

window.addEventListener("unhandledrejection", function (e) {
    console.log('[onunhandledrejection 错误处理]: ', event, event.reason);
    if (!e.reason) {
        e.preventDefault();
        return;
    }
    if (e.reason.message && (e.reason.message.includes('was aborted') || e.reason.message.includes('interrupted') || e.reason.message.includes('fullscreen error'))) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    window.$nuxt && window.$nuxt.$logger.reportError(new Error(e.reason), window.location.href);
});

(function () {
    let from = getQuery("from");
    if (['clip', 'pwa', 'h5'].includes(from)) {
        document.documentElement.classList.add("in-app");
    }
    document.documentElement.classList.add("in-app");
})();