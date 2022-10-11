const device = {};

const changeOrientationList = [];
const documentElement = window.document.documentElement;
const userAgent = window.navigator.userAgent.toLowerCase();
const television = [
    'googletv',
    'viera',
    'smarttv',
    'internet.tv',
    'netcast',
    'nettv',
    'appletv',
    'boxee',
    'kylo',
    'roku',
    'dlnadoc',
    'pov_tv',
    'hbbtv',
    'ce-html'
];

function checkWebpFeature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    try {
        var img = new Image();
        img.onload = function () {
            var result = (img.width > 0) && (img.height > 0);
            callback(feature, result);
        };
        img.onerror = function () {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    } catch (e) {
        console.warn("checkWebpFeature error", e.message);
        callback(feature, false);
    }
}

checkWebpFeature("lossy", function (feature, isSupported) {
    device.webp = window.webpSupported = isSupported;

    if (device.webp) {
        addClass('webp');
    }
    console.log("是否支持 webp", isSupported);
});

/**
 * 获取屏幕缩放比例
 */
device.ratio = function () {
    var ratio = 0;
    var screen = window.screen;
    var ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }

    }
    else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio;
};

device.macos = function () {
    return find('mac');
};

device.ios = function () {
    return device.iphone() || device.ipod() || device.ipad();
};

device.iphone = function () {
    return !device.windows() && find('iphone');
};

device.ipod = function () {
    return find('ipod');
};

device.ipad = function () {
    const iPadOS13Up =
        navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return find('ipad') || iPadOS13Up;
};

device.android = function () {
    return !device.windows() && find('android');
};

device.androidPhone = function () {
    return device.android() && find('mobile');
};

device.androidTablet = function () {
    return device.android() && !find('mobile');
};

device.blackberry = function () {
    return find('blackberry') || find('bb10');
};

device.blackberryPhone = function () {
    return device.blackberry() && !find('tablet');
};

device.blackberryTablet = function () {
    return device.blackberry() && find('tablet');
};

device.windows = function () {
    return find('windows');
};

device.windowsPhone = function () {
    return device.windows() && find('phone');
};

device.windowsTablet = function () {
    return device.windows() && (find('touch') && !device.windowsPhone());
};

device.fxos = function () {
    return (find('(mobile') || find('(tablet')) && find(' rv:');
};

device.fxosPhone = function () {
    return device.fxos() && find('mobile');
};

device.fxosTablet = function () {
    return device.fxos() && find('tablet');
};

device.meego = function () {
    return find('meego');
};

device.cordova = function () {
    return !!window._cordovaNative;
};

device.nodeWebkit = function () {
    return typeof window.process === 'object';
};

device.mobile = function () {
    return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone() ||
        device.blackberryPhone() ||
        device.fxosPhone() ||
        device.meego()
    );
};

device.tablet = function () {
    return (
        device.ipad() ||
        device.androidTablet() ||
        device.blackberryTablet() ||
        device.windowsTablet() ||
        device.fxosTablet()
    );
};

device.desktop = function () {
    return !device.tablet() && !device.mobile();
};

device.television = function () {
    let i = 0;
    while (i < television.length) {
        if (find(television[i])) {
            return true;
        }
        i++;
    }
    return false;
};

device.portrait = function () {
    if (
        screen.orientation &&
        Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
    ) {
        return includes(screen.orientation.type, 'portrait');
    }
    if (
        device.ios() &&
        Object.prototype.hasOwnProperty.call(window, 'orientation')
    ) {
        return Math.abs(window.orientation) !== 90;
    }
    return window.innerHeight / window.innerWidth > 1;
};

device.landscape = function () {
    if (
        screen.orientation &&
        Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
    ) {
        return includes(screen.orientation.type, 'landscape');
    }
    if (
        device.ios() &&
        Object.prototype.hasOwnProperty.call(window, 'orientation')
    ) {
        return Math.abs(window.orientation) === 90;
    }
    return window.innerHeight / window.innerWidth < 1;
};

function includes(haystack, needle) {
    return haystack.indexOf(needle) !== -1;
}
function find(needle) {
    return includes(userAgent, needle);
}
function hasClass(className) {
    return documentElement.className.match(new RegExp(className, 'i'));
}
function addClass(className) {
    let currentClassNames = null;
    if (!hasClass(className)) {
        currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
        documentElement.className = `${currentClassNames} ${className}`;
    }
}
function removeClass(className) {
    if (hasClass(className)) {
        documentElement.className = documentElement.className.replace(
            ` ${className}`,
            ''
        );
    }
}

if (device.ios()) {
    if (device.ipad()) {
        addClass('ios ipad tablet');
    } else if (device.iphone()) {
        addClass('ios iphone mobile');
    } else if (device.ipod()) {
        addClass('ios ipod mobile');
    }
} else if (device.macos()) {
    addClass('macos desktop');
} else if (device.android()) {
    if (device.androidTablet()) {
        addClass('android tablet');
    } else {
        addClass('android mobile');
    }
} else if (device.blackberry()) {
    if (device.blackberryTablet()) {
        addClass('blackberry tablet');
    } else {
        addClass('blackberry mobile');
    }
} else if (device.windows()) {
    if (device.windowsTablet()) {
        addClass('windows tablet');
    } else if (device.windowsPhone()) {
        addClass('windows mobile');
    } else {
        addClass('windows desktop');
    }
} else if (device.fxos()) {
    if (device.fxosTablet()) {
        addClass('fxos tablet');
    } else {
        addClass('fxos mobile');
    }
} else if (device.meego()) {
    addClass('meego mobile');
} else if (device.nodeWebkit()) {
    addClass('node-webkit');
} else if (device.television()) {
    addClass('television');
} else if (device.desktop()) {
    addClass('desktop');
}

if (device.cordova()) {
    addClass('cordova');
}
function handleOrientation() {
    if (device.landscape()) {
        removeClass('portrait');
        addClass('landscape');
        walkOnChangeOrientationList('landscape');
    } else {
        removeClass('landscape');
        addClass('portrait');
        walkOnChangeOrientationList('portrait');
    }
    setOrientationCache();
}

function walkOnChangeOrientationList(newOrientation) {
    for (let index = 0; index < changeOrientationList.length; index++) {
        changeOrientationList[index](newOrientation);
    }
}

device.onChangeOrientation = function (cb) {
    if (typeof cb == 'function') {
        changeOrientationList.push(cb);
    }
};
let orientationEvent = 'resize';
if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
    orientationEvent = 'orientationchange';
}
if (window.addEventListener) {
    window.addEventListener(orientationEvent, handleOrientation, false);
} else if (window.attachEvent) {
    window.attachEvent(orientationEvent, handleOrientation);
} else {
    window[orientationEvent] = handleOrientation;
}

handleOrientation();

function findMatch(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (device[arr[i]]()) {
            return arr[i];
        }
    }
    return 'unknown';
}

device.type = findMatch(['mobile', 'tablet', 'desktop']);
device.os = findMatch([
    'ios',
    'iphone',
    'ipad',
    'ipod',
    'android',
    'blackberry',
    'macos',
    'windows',
    'fxos',
    'meego',
    'television'
]);

function setOrientationCache() {
    device.orientation = findMatch(['portrait', 'landscape']);
}
setOrientationCache();
export default device;