
export default (context, inject) => {
    console.log("plugin storage load");

    let inited = false;
    const storageSettingKey = "storageSetting";
    const systemKeys = [storageSettingKey];
    const storageSetting = {
        lifecycle: {}
    };

    function isSystemKey(key) {
        return systemKeys.includes(key);
    }

    function isExpire(key) {
        let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;

        let keyLife = storageSetting["lifecycle"][dataKey];
        if (keyLife) {
            if (keyLife.expireTime === -1) return false;
            if (Date.now() > keyLife.expireTime) {
                // 返回过期
                return true;
            }
        }
        return false;
    }

    function getString(key) {
        try {
            if (isExpire(key)) { return ""; }
            let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;
            let data = localStorage.getItem(dataKey);
            if (data) {
                return data;
            }
        } catch (error) {
        }
        return "";
    }

    function getObject(key) {
        try {
            if (isExpire(key)) { return undefined; }

            let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;

            let data = localStorage.getItem(dataKey);
            if (data) {
                data = JSON.parse(data);
                return data;
            }
        } catch (error) {
        }
        return undefined;
    }

    function getArray(key) {
        try {
            if (isExpire(key)) { return []; }

            let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;

            let data = localStorage.getItem(dataKey);
            if (data) {
                data = JSON.parse(data);
                return data;
            }
        } catch (error) {
        }
        return [];
    }

    /**
     * 设置存储
     * @param {*} key 
     * @param {*} val 
     * @param {*} time 过期时间 秒为单位
     */
    function set(key, val, time) {
        console.log("set", key, val);
        if (isSystemKey(key)) {
            return;
        }
        let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;
        {
            let createTime = new Date().getTime();
            let expireTime = -1;
            if (time) {
                expireTime = createTime + time * 1000;
            }
            storageSetting["lifecycle"][key] = {
                createTime,
                expireTime
            };
            saveStorageSetting();
        }
        try {
            localStorage.setItem(dataKey, typeof (val) === "string" ? val : JSON.stringify(val));
        } catch (e) {
            console.warn("set localStorage", key, e.message, val);
        }
    }

    function remove(key) {
        if (isSystemKey(key)) {
            return;
        }

        let dataKey = context.$env.isProd() ? key : context.$env.env + "-" + key;

        delete storageSetting["lifecycle"][dataKey];
        saveStorageSetting();

        localStorage.removeItem(dataKey);
    }

    function clear() {
        localStorage.clear();
    }

    function saveStorageSetting() {
        let dataKey = context.$env.isProd() ? storageSettingKey : context.$env.env + "-" + storageSettingKey;
        localStorage.setItem(dataKey, JSON.stringify(storageSetting));
    }

    function initStorageSetting() {
        if (inited) return;
        let dataKey = context.$env.isProd() ? storageSettingKey : context.$env.env + "-" + storageSettingKey;

        let setting = getObject(dataKey);
        if (setting) {
            Object.keys(setting).forEach(x => storageSetting[x] = setting[x]);
        }
        inited = true;
    }

    function setCookie(name, value, expireDays) {
        let dataKey = name;
        if (!context.$env.isProd()) {
            if (!name.startsWith(context.$env.env + "-")) {
                dataKey = context.$env.env + "-" + name;
            }
        }
        if (expireDays > 0) {
            let date = new Date();
            data.setDate(data.getDate() + expireDays);
            document.cookie = dataKey + '=' + value + ';expires=' + date + ';path=' + context.$env.baseUrl + ';';
        } else {
            document.cookie = dataKey + '=' + value + ';path=' + context.$env.baseUrl + ';';
        }
    };

    // 取cookie
    function getCookie(name) {
        let dataKey = context.$env.isProd() ? name : context.$env.env + "-" + name;

        let cookies = document.cookie;
        let cookieArr = cookies.split(';') || [];
        if (!cookieArr.length) return '';
        for (let i = 0; i < cookieArr.length; i++) {
            let arr = cookieArr[i].split('=');
            if (dataKey == arr[0]) {
                return arr[1];
            }
        }
        return false;
    };

    //  删除 cookie
    function removeCookie(name) {
        let dataKey = context.$env.isProd() ? name : context.$env.env + "-" + name;
        // 通过建立 cookie 的时间设置，将时间设置提前一天，从而强行让 cookie 失效，最后达到删除cookie 的目的
        setCookie(dataKey, '', '-1');
    }

    initStorageSetting();

    console.log("plugin storage end");

    inject("storage", {
        set,
        remove,
        clear,
        isExpire,
        getString,
        getObject,
        getArray,

        setCookie,
        getCookie,
        removeCookie
    });
};


