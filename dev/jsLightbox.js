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

    var closeButtonText = '';

    var escapeKey = null;
    clientPackages.get('escapeKey').then(function (escapeKeyObject) {
        escapeKey = escapeKeyObject;
    });

    var initialize = function (data) {
        closeButtonText = data[0];
        return this;
    };

    var bodyScrollbarsDisabled = false;
    var disableBodyScrollbars = function () {
        if (!bodyScrollbarsDisabled) {
            var documentBody = document.body;
            documentBody.style.overflow = 'hidden';
            if (documentBody.scrollHeight > window.innerHeight) {
                documentBody.style.marginRight = getBodyScrollbarSize() + 'px';
            }
            bodyScrollbarsDisabled = true;
        }
    };
    var enableBodyScrollbars = function () {
        if (bodyScrollbarsDisabled) {
            var documentBody = document.body;
            documentBody.style.overflow = 'auto';
            documentBody.style.marginRight = 'auto';
            bodyScrollbarsDisabled = false;
        }
    };

    var bodyScroolbarSizeCache = null;
    var getBodyScrollbarSize = function () {
        if (bodyScroolbarSizeCache !== null) {
            return bodyScroolbarSizeCache;
        }

        var documentBody = document.body;

        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "-10000px";
        outer.style.left = "-10000px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        documentBody.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 === w2) {
            w2 = outer.clientWidth;
        }

        documentBody.removeChild(outer);

        return bodyScroolbarSizeCache = w1 - w2;
    };

    var open = function (html, options) {
        window.clearTimeout(closeTimeout);
        closeTimeout = null;
        if (typeof options === 'undefined') {
            options = {};
        }
        var spacing = typeof options.spacing !== 'undefined' ? options.spacing : '15px';
        var showCloseButton = typeof options.showCloseButton !== 'undefined' ? options.showCloseButton : true;
        var onOpen = typeof options.onOpen !== 'undefined' ? options.onOpen : null;
        var onBeforeEscKeyClose = typeof options.onBeforeEscKeyClose !== 'undefined' ? options.onBeforeEscKeyClose : null;

        if (container === null) {
            var documentBody = document.body;
            container = document.createElement('div');
            container.setAttribute('class', 'ipjslghtbc');
            container.setAttribute('data-lightbox-component', 'container');
            container.innerHTML = '<div><div><div></div></div></div>';
            container.innerHTML += '<a class="ipjslghtbx" role="button" tabindex="0" data-lightbox-component="close-button" aria-label="' + closeButtonText + '" title="' + closeButtonText + '"></a>';
            container.lastChild.addEventListener('click', close);
            documentBody.appendChild(container);
            escapeKey.addHandler(closeOnEscKey);
            openTimeout = window.setTimeout(function () {
                container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
                openTimeout = null;
                disableBodyScrollbars();
            }, 16);
        } else {
            container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
        }
        container.onBeforeEscKeyClose = onBeforeEscKeyClose;
        container.lastChild.style.display = showCloseButton ? 'block' : 'none';
        var target = container.firstChild.firstChild.firstChild;
        target.setAttribute('data-lightbox-component', 'content');

        return new Promise(function (resolve, reject) {
            if (html === waitingHTML) {
                if (target.querySelector('.ipjslghtbcl') === null) {
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
                var showHtml = function () {
                    (function (_contextID) {
                        clientPackages.get('html5DOMDocument')
                            .then(function (html5DOMDocument) {
                                if (_contextID === contextID) {
                                    window.clearTimeout(waitingTimeout);
                                    waitingTimeout = null;
                                    target.style.padding = spacing;
                                    html5DOMDocument.insert(html, [target]);
                                    if (onOpen !== null) {
                                        onOpen(target);
                                    }
                                    resolve();
                                } else {
                                    reject();
                                }
                            })
                            .catch(function () {
                                reject();
                            });
                    })(contextID);
                };
                var waitingElement = target.querySelector('.ipjslghtbcl');
                if (waitingElement === null) {
                    showHtml();
                } else {
                    waitingElement.setAttribute('class', 'ipjslghtbcl');
                    window.setTimeout(showHtml, 300);
                }
            }
        });
    };

    var close = function (escapeKeyMode) {
        if (escapeKeyMode && container.onBeforeEscKeyClose !== null) {
            var escKeyCloseResult = container.onBeforeEscKeyClose();
            if (escKeyCloseResult === false) {
                return false; // for the esc handlers
            }
        }
        window.clearTimeout(openTimeout);
        openTimeout = null;
        window.clearTimeout(waitingTimeout);
        waitingTimeout = null;
        if (container !== null) {
            container.setAttribute('class', 'ipjslghtbc');
            if (closeTimeout === null) {
                closeTimeout = window.setTimeout(function () {
                    container.parentNode.removeChild(container);
                    container = null;
                    enableBodyScrollbars();
                    closeTimeout = null;
                }, 300);
            }
            escapeKey.removeHandler(closeOnEscKey);
            return true; // for the esc handlers
        }
    };

    var make = function (options) {
        contextID++;
        open(waitingHTML, options);
        return (function (_contextID) {
            return {
                'isActive': function () { // is not closed
                    if (_contextID === contextID && container !== null) {
                        var containerClassName = container.getAttribute('class');
                        if (containerClassName === null) {
                            containerClassName = '';
                        }
                        return containerClassName.indexOf('ipjslghtbc') !== -1;
                    }
                    return false;
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
                        close(false);
                    }
                }
            };
        })(contextID);
    };

    var closeOnEscKey = function () {
        return close(true);
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
        'close': function () {
            close(false);
        },
        'initialize': initialize
    };
}());