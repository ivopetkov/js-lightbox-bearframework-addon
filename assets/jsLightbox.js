/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

var ivoPetkov = ivoPetkov || {};
ivoPetkov.bearFrameworkAddons = ivoPetkov.bearFrameworkAddons || {};
ivoPetkov.bearFrameworkAddons.jsLightbox = ivoPetkov.bearFrameworkAddons.jsLightbox || (function () {

    var container = null;
    var closeTimeout = null;
    var openTimeout = null;
    var waitingTimeout = null;

    var hideWaiting = function () {
        if (waitingTimeout !== null) {
            window.clearTimeout(waitingTimeout);
        }
        var element = document.querySelector('.ipjslghtbcl');
        if (element !== null) {
            element.setAttribute('class', 'ipjslghtbcl');
        }
    };

    var showContainer = function (options) {
        if (typeof options === 'undefined') {
            options = {};
        }
        var spacing = typeof options.spacing !== 'undefined' ? options.spacing : '15px';
//        if (typeof options.showCloseButton === 'undefined') {
//            options.showCloseButton = true;
//        }
        if (closeTimeout !== null) {
            window.clearTimeout(closeTimeout);
            closeTimeout = null;
        }
        if (container === null) {
            container = document.createElement('div');
            container.setAttribute('class', 'ipjslghtbc');
            var innerHTML = '<div><div></div></div>';
            //if (options.showCloseButton) {
            innerHTML += '<a class="ipjslghtbx"><span>&#10010;</span></a>';
            //}
            container.innerHTML = innerHTML;
            container.firstChild.firstChild.style.padding = spacing;
            //if (options.showCloseButton) {
            container.lastChild.addEventListener('click', close);
            //}
            document.body.appendChild(container);
            document.body.addEventListener('keydown', closeOnEscKey);
            openTimeout = window.setTimeout(function () {
                container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
                openTimeout = null;
            }, 16);
        } else {
            container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
        }
    };

    var hideContainer = function () {
        if (closeTimeout !== null) {
            return;
        }
        if (openTimeout !== null) {
            window.clearTimeout(openTimeout);
            openTimeout = null;
        }
        hideWaiting();
        if (container !== null) {
            container.setAttribute('class', 'ipjslghtbc');
        }
        if (container !== null) {
            closeTimeout = window.setTimeout(function () {
                try { // IE
                    document.body.removeEventListener('keydown', closeOnEscKey);
                } catch (e) {

                }
                container.parentNode.removeChild(container);
                container = null;
                closeTimeout = null;
            }, 300);
        }
    };

    var open = function (html, options) {
        contextID++;
        showContainer(options);
        html5DOMDocument.insert(html, [container.firstChild.firstChild]);
    };

    var close = function () {
        contextID++;
        hideContainer();
    };

    var contextID = 0;

    var wait = function (callback, options) {
        contextID++;
        open('<span class="ipjslghtbcl">&#8228;</span>', options);
        waitingTimeout = window.setTimeout(function () {
            var element = document.querySelector('.ipjslghtbcl');
            if (element !== null) {
                element.setAttribute('class', 'ipjslghtbcl ipjslghtbclv');
            }
        }, 1000);
        if (typeof callback !== 'undefined') {
            callback((function (_contextID) {
                return {
                    'wait': function (callback, options) {
                        if (_contextID === contextID) {
                            wait(callback, options);
                        }
                    },
                    'open': function (html, options) {
                        if (_contextID === contextID) {
                            open(html, options);
                        }
                    },
                    'close': function () {
                        if (_contextID === contextID) {
                            close();
                        }
                    },
                    'isAlive': function () {
                        return _contextID === contextID;
                    }
                };
            })(contextID));
        }
    };

    var closeOnEscKey = function (event) {
        if (event.keyCode === 27) {
            close();
        }
    };

    return {
        'wait': wait,
        'open': open,
        'close': close
    };
}());