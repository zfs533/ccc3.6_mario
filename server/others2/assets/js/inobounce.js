
(function (global) {
    var startX = 0, startY = 0;
    var enabled = false;
    var supportsPassiveOption = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) { }
    var handleTouchmove = function (evt) {
        var el = evt.target;
        var zoom = window.innerWidth / window.document.documentElement.clientWidth;
        if (evt.touches.length > 1 || zoom !== 1) {
            return;
        }
        while (el !== document.body && el !== document) {
            var style = window.getComputedStyle(el);
            if (!style) {
                break;
            }
            if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
                return;
            }
            {
                var overflowY = style.getPropertyValue('overflow-y');
                var isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay');
                if (isScrollable) {
                    var height = parseInt(style.getPropertyValue('height'), 10);

                    var canScroll = el.scrollHeight > el.offsetHeight;
                    if (canScroll) {
                        var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;
                        var isAtTop = (startY <= curY && el.scrollTop === 0);
                        var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

                        if (isAtTop || isAtBottom) {
                            evt.preventDefault();
                        }
                        return;
                    }
                }
            }
            {
                var overflowX = style.getPropertyValue('overflow-x');
                var isScrollable = (overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'overlay');
                if (isScrollable) {
                    // let moveEndX = evt.changedTouches[0].pageX;
                    // let moveEndY = evt.changedTouches[0].pageY;
                    let moveEndX = evt.changedTouches[0].screenX;
                    let moveEndY = evt.changedTouches[0].screenY;
                    let X = moveEndX - startX;
                    let Y = moveEndY - startY;
                    if (Math.abs(X) > Math.abs(Y) && X > 0) {
                        return;
                    }
                    else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                        return;
                    }
                    else if (Math.abs(X) < Math.abs(Y) && Y > 0) {
                    }
                    else if (Math.abs(X) < Math.abs(Y) && Y < 0) {

                    }
                }
            }
            el = el.parentNode;
        }
        evt.preventDefault();
    };

    var handleTouchstart = function (evt) {
        startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
        startX = evt.touches ? evt.touches[0].screenX : evt.screenX;
    };

    var handleElasticity = function (e) {
        e.preventDefault();
    };

    var enable = function () {
        window.addEventListener('touchstart', handleTouchstart, supportsPassiveOption ? { passive: false } : false);
        window.addEventListener('touchmove', handleTouchmove, supportsPassiveOption ? { passive: false } : false);
        window.addEventListener('scroll.elasticity', handleElasticity);
        window.addEventListener('touchmove.elasticity', handleElasticity);

        enabled = true;
    };

    var disable = function () {
        window.removeEventListener('touchstart', handleTouchstart, false);
        window.removeEventListener('touchmove', handleTouchmove, false);
        window.removeEventListener('scroll.elasticity', handleElasticity);
        window.removeEventListener('touchmove.elasticity', handleElasticity);

        enabled = false;
    };

    var isEnabled = function () {
        return enabled;
    };

    var testDiv = document.createElement('div');
    document.documentElement.appendChild(testDiv);
    testDiv.style.WebkitOverflowScrolling = 'touch';
    var isScrollSupported = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
    document.documentElement.removeChild(testDiv);

    if (isScrollSupported) {
        enable();
    }

    var iNoBounce = {
        enable: enable,
        disable: disable,
        isEnabled: isEnabled,
        isScrollSupported: isScrollSupported
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = iNoBounce;
    }
    if (typeof global.define === 'function') {
        (function (define) {
            define('iNoBounce', [], function () { return iNoBounce; });
        }(global.define));
    }
    else {
        global.iNoBounce = iNoBounce;
    }
}(this));