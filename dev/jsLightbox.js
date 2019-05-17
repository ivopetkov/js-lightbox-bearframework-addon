/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

/* global clientPackages */

var ivoPetkov = ivoPetkov || {};
ivoPetkov.bearFrameworkAddons = ivoPetkov.bearFrameworkAddons || {};
ivoPetkov.bearFrameworkAddons.jsLightbox = ivoPetkov.bearFrameworkAddons.jsLightbox || (function () {

    var container = null;
    var closeTimeout = null;
    var openTimeout = null;
    var waitingTimeout = null;
    var waitingHTML = '<span class="ipjslghtbcl"></span>';
    var contextID = 0;

    var open = function (html, options) {
        contextID++;
        window.clearTimeout(closeTimeout);
        if (typeof options === 'undefined') {
            options = {};
        }
        var spacing = typeof options.spacing !== 'undefined' ? options.spacing : '15px';

        if (container === null) {
            container = document.createElement('div');
            container.setAttribute('class', 'ipjslghtbc');
            container.innerHTML = '<div><div></div></div>';
            container.innerHTML += '<a class="ipjslghtbx"><span>&#10010;</span></a>';
            container.lastChild.addEventListener('click', close);
            document.body.appendChild(container);
            document.body.addEventListener('keydown', closeOnEscKey);
            openTimeout = window.setTimeout(function () {
                container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
                openTimeout = null;
            }, 16);
        } else {
            container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
        }
        var target = container.firstChild.firstChild;

        return new Promise(function (resolve, reject) {
            if (html === waitingHTML) {
                if (target.innerHTML.indexOf('<span class="ipjslghtbcl') !== 0) {
                    target.style.padding = spacing;
                    target.innerHTML = html;
                    waitingTimeout = window.setTimeout(function () {
                        var element = document.querySelector('.ipjslghtbcl');
                        if (element !== null) {
                            element.setAttribute('class', 'ipjslghtbcl ipjslghtbclv');
                        }
                    }, 1000);
                }
            } else {
                (function (_contextID) {
                    clientPackages.get('-ivopetkov-js-lightbox-html5domdocument')
                            .then(function (html5DOMDocument) {
                                if (_contextID === contextID) {
                                    window.clearTimeout(waitingTimeout);
                                    target.style.padding = spacing;
                                    html5DOMDocument.insert(html, [target]);
                                    resolve();
                                } else {
                                    reject();
                                }
                            })
                            .catch(function () {
                                reject();
                            });
                })(contextID);
            }
        });
    };

    var close = function () {
        contextID++;
        window.clearTimeout(openTimeout);
        window.clearTimeout(waitingTimeout);
        if (container !== null) {
            container.setAttribute('class', 'ipjslghtbc');
            closeTimeout = window.setTimeout(function () {
                try { // IE
                    document.body.removeEventListener('keydown', closeOnEscKey);
                } catch (e) {

                }
                container.parentNode.removeChild(container);
                container = null;
            }, 300);
        }
    };

    var make = function (options) {
        open(waitingHTML, options);
        return (function (_contextID) {
            return {
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
                }
            };
        })(contextID);
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
        'make': make,
        'close': close
    };
}());