Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 数组分组
 * @param {*} array 
 * @param {*} f ()=> x.tag
 */
Array.prototype.groupBy = function (f) {
    const groups = {};
    this.forEach(function (o) {
        const group = o[f];
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return groups;
};

/**
 * 字符串格式化
 * @param {*} args  format("loogn",22) format({name:"loogn",age:22})
 */
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

export const trim = (str) => {
    if (!str) {
        return '';
    }
    return str.replace(/^\s+|\s+$/g, '');
};

export const replaceIgnoreCase = (str, substr, replacement) => {
    if (!str) {
        return '';
    }
    return str.replace(substr, replacement);
};

export const countToK = (count) => {
    if (!count) {
        return 0;
    }
    if (count < 1000) {
        return count;
    }
    let k = count / 100;
    k = (parseInt(k) + Math.ceil(k - parseInt(k))) / 10;
    return k;
};

export const readDuration = (wordCount) => {
    return parseInt((wordCount / 300 * 60), 10) + '分钟';
};

export const displayPrice = (price) => {
    return (price / 100).toFixed(2);
};

export const clone = (obj) => {
    var o;
    if (typeof obj === 'object') {
        if (obj === null) {
            o = null;
        }
        else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            }
            else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    }
    else {
        o = obj;
    }
    return o;
};

export const query = (name) => {
    var search = search || window.location.search.substr(1) || window.location.hash.split("#")[1];
    if (!search) return "";
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = search.match(reg);
    if (r != null) return unescape(r[2]); return "";
};

export function formatNumber(nb) {
    if (nb > 10000) {
        return Math.floor(nb / 1000) / 10 + "w";
    }
    return nb || 0;
}

export function formatSeconds(time) {
    time = Math.floor(time);
    if (time <= 0) {
        return "00:00";
    }
    let m = Math.floor(time / 60) % 60;
    let mStr = m.toString();
    if (m < 10) {
        mStr = "0" + m;
    }
    let s = time % 60;
    let sStr = s.toString();
    if (s < 10) {
        sStr = "0" + s;
    }
    let h = Math.floor(time / 60 / 60);
    let hStr = h.toString();
    if (h == 0) {
        hStr = "";
    } else if (h < 10) {
        hStr = "0" + h;
    }
    if (hStr) {
        return hStr + ":" + mStr + ":" + sStr;
    }
    else {
        return mStr + ":" + sStr;
    }
}


export function formatSecondsToDay(time) {
    time = Math.floor(time);
    if (time <= 0) {
        return "00:00";
    }
    let m = Math.floor(time / 60) % 60;
    let mStr = m.toString();
    if (m < 10) {
        mStr = "0" + m;
    }
    let s = time % 60;
    let sStr = s.toString();
    if (s < 10) {
        sStr = "0" + s;
    }
    let h = Math.floor(time / 60 / 60) % 24;
    let hStr = h.toString();
    if (h == 0) {
        hStr = "00";
    } else if (h < 10) {
        hStr = "0" + h;
    }

    let d = Math.floor(time / 60 / 60 / 24);
    let dStr = d.toString();
    if (d == 0) {
        dStr = "";
    } else {
        dStr = d + '天 ';
    }

    // if (dStr) {
    //     return dStr + hStr + ":" + mStr;
    // }
    // else
    if (hStr) {
        return hStr + ":" + mStr + ":" + sStr;
    }
    else {
        return mStr + ":" + sStr;
    }
}

export function formatSeconds2(time) {
    time = Math.floor(time);
    if (time <= 0) {
        return "00:00:00";
    }
    let m = Math.floor(time / 60);
    let mStr = m.toString();
    if (m < 10) {
        mStr = "0" + m;
    }
    let s = time % 60;
    let sStr = s.toString();
    if (s < 10) {
        sStr = "0" + s;
    }
    return mStr + ":" + sStr;
}

export function injectScript(url, onload, onerror) {
    var script = document.createElement('script');
    script.async = true;
    // onload fires even when script fails loads with an error.
    script.onload = onload;
    // onerror fires for malformed URLs.
    script.onerror = onerror;
    script.src = url;
    document.head.appendChild(script);
}

export function urlJoin(...args) {
    const strArray = Array.from(Array.isArray(args[0]) ? args[0] : args);

    const resultArray = [];
    if (strArray.length === 0) { return ''; }

    if (typeof strArray[0] !== 'string') {
        console.warn('Url must be a string. Received ' + strArray[0]);
        return "";
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
        strArray[0] = strArray.shift() + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }

    for (let i = 0; i < strArray.length; i++) {
        let component = strArray[i];

        if (typeof component !== 'string') {
            throw new TypeError('Url must be a string. Received ' + component);
        }

        if (component === '') { continue; }

        if (i > 0) {
            // Removing the starting slashes for each component but the first.
            component = component.replace(/^[\/]+/, '');
        }
        if (i < strArray.length - 1) {
            // Removing the ending slashes for each component but the last.
            component = component.replace(/[\/]+$/, '');
        } else {
            // For the last component we will combine multiple slashes to a single one.
            component = component.replace(/[\/]+$/, '/');
        }
        if (component) {
            resultArray.push(component);
        }
    }
    let str = resultArray.join('/');
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    const parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');

    return str;
}

//base64转blob
export function dataURItoBlob(dataURI) {
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(dataURI.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图

    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
}

export const versionCompare = (preVersion = '', lastVersion = '') => {
    var sources = preVersion.split(/-|\./);
    var dests = lastVersion.split(/-|\./);
    var maxL = Math.max(sources.length, dests.length);
    var result = 0;
    for (let i = 0; i < maxL; i++) {
        let preValue = sources.length > i ? sources[i] : 0;

        let preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
        let lastValue = dests.length > i ? dests[i] : 0;
        let lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
        if (preNum < lastNum) {
            result = -1;
            break;
        } else if (preNum > lastNum) {
            result = 1;
            break;
        }
    }
    return result;
};

export function isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const {
        top,
        right,
        bottom,
        left,
    } = element.getBoundingClientRect();

    return (
        top >= 0 &&
        left >= 0 &&
        right <= viewWidth &&
        bottom <= viewHeight
    );
}

/**
   *  discuss at: http://locutus.io/php/sha1/
   * original by: Webtoolkit.info (http://www.webtoolkit.info/)
   * improved by: Michael White (http://getsprink.com)
   * improved by: Kevin van Zonneveld (http://kvz.io)
   *    input by: Brett Zamir (http://brett-zamir.me)
   *      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
   *      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
   *      note 1: in a steaming fashion for faster and more efficient hashing
   *   example 1: sha1('Kevin van Zonneveld')
   *   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
   */
export function sha1(str) {

    let _rotLeft = function (n, s) {
        let t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    let _cvtHex = function (val) {
        let str = "";
        let i;
        let v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };

    let blockstart;
    let i, j;
    let W = new Array(80);
    let H0 = 0x67452301;
    let H1 = 0xEFCDAB89;
    let H2 = 0x98BADCFE;
    let H3 = 0x10325476;
    let H4 = 0xC3D2E1F0;
    let A, B, C, D, E;
    let temp;

    // utf8_encode
    str = /*unescape*/(encodeURIComponent(str));
    let strLen = str.length;

    let wordArray = [];
    for (i = 0; i < strLen - 3; i += 4) {
        j = str.charCodeAt(i) << 24 |
            str.charCodeAt(i + 1) << 16 |
            str.charCodeAt(i + 2) << 8 |
            str.charCodeAt(i + 3);
        wordArray.push(j);
    }

    switch (strLen % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = str.charCodeAt(strLen - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000;
            break;
        case 3:
            i = str.charCodeAt(strLen - 3) << 24 |
                str.charCodeAt(strLen - 2) << 16 |
                str.charCodeAt(strLen - 1) <<
                8 | 0x80;
            break;
    }

    wordArray.push(i);

    while ((wordArray.length % 16) !== 14) {
        wordArray.push(0);
    }

    wordArray.push(strLen >>> 29);
    wordArray.push((strLen << 3) & 0x0ffffffff);

    for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = wordArray[blockstart + i];
        }
        for (i = 16; i <= 79; i++) {
            W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = _rotLeft(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = _rotLeft(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = _rotLeft(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = _rotLeft(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4);
    return temp.toLowerCase();
}

/**
 * RFC4122 compliant UUID v4 generator.
 */
export function uuid4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}