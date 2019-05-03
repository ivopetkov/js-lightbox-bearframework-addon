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
    var waitingHTML = '<span class="ipjslghtbcl">&#8228;</span>';

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
        container.firstChild.firstChild.style.padding = spacing;
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
        return new Promise(function (resolve, reject) {
            if (html === waitingHTML) {
                container.firstChild.firstChild.innerHTML = html;
            } else {
                clientShortcuts.get('-ivopetkov-js-lightbox-html5domdocument')
                        .then(function (html5DOMDocument) {
                            if (container !== null) {
                                html5DOMDocument.insert(html, [container.firstChild.firstChild]);
                                resolve();
                            }
                        })
                        .catch(function () {
                            reject();
                        });
            }
        });
    };

    var close = function () {
        contextID++;
        hideContainer();
    };

    var contextID = 0;

    var wait = function (callback, options) {
        contextID++;
        open(waitingHTML, options);
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
                            return open(html, options);
                        } else {
                            return new Promise(function (resolve, reject) {
                                reject();
                            });
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

    Promise = window.Promise || function (callback) {
        var thenCallbacks = [];
        var catchCallback = null;
        this.then = function (f) {
            thenCallbacks.push(f);
            return this;
        };
        this.catch = function (f) {
            if (catchCallback === null) {
                catchCallback = f;
            }
            return this;
        };
        var resolve = function () {
            for (var i in thenCallbacks) {
                thenCallbacks[i].apply(null, arguments);
            }
        };
        var reject = function () {
            if (catchCallback !== null) {
                catchCallback.apply(null, arguments);
            }
        };
        window.setTimeout(function () {
            callback(resolve, reject);
        }, 16);
    };

    return {
        'wait': wait,
        'open': open,
        'close': close
    };
}());