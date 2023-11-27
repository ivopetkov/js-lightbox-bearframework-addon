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
    var showWaitingTimeout = null;
    var hideWaitingTimeout = null;
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

    var inertElements = [];
    var lastSetContainerVisiblity = null;
    var setContainerVisibility = function (visible) {
        if (container === null) {
            return;
        }
        if (lastSetContainerVisiblity === visible) {
            return;
        }
        lastSetContainerVisiblity = visible;
        if (visible) {
            container.setAttribute('class', 'ipjslghtbc ipjslghtbcv');
            if (container.parentNode !== null) {
                var siblings = container.parentNode.childNodes;
                for (var i = 0; i < siblings.length; i++) {
                    var sibling = siblings[i];
                    if (sibling !== container) {
                        if (typeof sibling.setAttribute !== 'undefined') {
                            sibling.setAttribute('inert', 'true');
                            inertElements.push(sibling);
                        }
                    }
                }
            }
        } else {
            container.setAttribute('class', 'ipjslghtbc');
            for (var i = 0; i < inertElements.length; i++) {
                try {
                    inertElements[i].removeAttribute('inert');
                } catch (e) {

                }
            }
        }
    }

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
        var isClosing = closeTimeout !== null;
        window.clearTimeout(closeTimeout);
        closeTimeout = null;
        if (typeof options === 'undefined') {
            options = {};
        }
        var spacing = typeof options.spacing !== 'undefined' ? options.spacing : '15px';
        var showCloseButton = typeof options.showCloseButton !== 'undefined' ? options.showCloseButton : true;
        var onOpen = typeof options.onOpen !== 'undefined' ? options.onOpen : null;
        var closeOnEscKey = typeof options.closeOnEscKey !== 'undefined' ? options.closeOnEscKey : true;
        var onBeforeEscKeyClose = typeof options.onBeforeEscKeyClose !== 'undefined' ? options.onBeforeEscKeyClose : null;
        var resolveBeforeHTMLAdded = typeof options.resolveBeforeHTMLAdded !== 'undefined' ? options.resolveBeforeHTMLAdded : false;

        var addCloseOnEscKeyHandler = false;
        if (container === null) {
            var documentBody = document.body;
            container = document.createElement('div');
            setContainerVisibility(false);
            container.setAttribute('data-lightbox-component', 'container');
            container.innerHTML = '<div><div><div></div></div></div>';
            container.innerHTML += '<a class="ipjslghtbx" role="button" tabindex="0" data-lightbox-component="close-button" aria-label="' + closeButtonText + '" title="' + closeButtonText + '"></a>';
            container.lastChild.addEventListener('click', close);
            documentBody.appendChild(container);
            openTimeout = window.setTimeout(function () {
                setContainerVisibility(true);
                openTimeout = null;
                disableBodyScrollbars();
            }, 16);
            addCloseOnEscKeyHandler = true;
        } else {
            setContainerVisibility(true);
        }
        if (isClosing) {
            addCloseOnEscKeyHandler = true;
        }
        if (addCloseOnEscKeyHandler) {
            escapeKey.addHandler(closeOnEscKeyHandler);
        }
        container.lbCloseOnEscKey = closeOnEscKey;
        container.lbOnBeforeEscKeyClose = onBeforeEscKeyClose;
        container.lastChild.style.display = showCloseButton ? 'block' : 'none';
        var target = container.firstChild.firstChild.firstChild;
        target.setAttribute('data-lightbox-component', 'content');

        return new Promise(function (resolve, reject) {
            if (html === waitingHTML) {
                var waitingElement = target.querySelector('.ipjslghtbcl');
                if (waitingElement === null) {
                    target.style.padding = spacing;
                    target.innerHTML = html;
                    showWaitingTimeout = window.setTimeout(function () {
                        var element = document.querySelector('.ipjslghtbcl');
                        if (element !== null) {
                            element.setAttribute('class', 'ipjslghtbcl ipjslghtbclv');
                        }
                    }, 1000);
                } else {
                    waitingElement.setAttribute('class', 'ipjslghtbcl ipjslghtbclv');
                }
                resolve();
            } else {
                var showHtml = function () {
                    (function (_contextID) {
                        clientPackages.get('html5DOMDocument')
                            .then(function (html5DOMDocument) {
                                if (_contextID === contextID) {
                                    window.clearTimeout(showWaitingTimeout);
                                    showWaitingTimeout = null;
                                    target.style.padding = spacing;
                                    html5DOMDocument.insert(html, [target]);
                                    if (onOpen !== null) {
                                        onOpen(target);
                                    }
                                    if (!resolveBeforeHTMLAdded) {
                                        resolve();
                                    }
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
                    waitingElement.setAttribute('class', 'ipjslghtbcl'); // wait for waiting to hide
                    hideWaitingTimeout = window.setTimeout(showHtml, 300);
                }
                if (resolveBeforeHTMLAdded) {
                    resolve();
                }
            }
        });
    };

    var close = function (escapeKeyMode) {
        if (escapeKeyMode && container !== null) {
            if (container.lbCloseOnEscKey === false) {
                return false;
            }
            if (container.lbOnBeforeEscKeyClose !== null) {
                var escKeyCloseResult = container.lbOnBeforeEscKeyClose();
                if (escKeyCloseResult === false) {
                    return false; // for the esc handlers
                }
            }
        }
        window.clearTimeout(openTimeout);
        openTimeout = null;
        window.clearTimeout(showWaitingTimeout);
        showWaitingTimeout = null;
        window.clearTimeout(hideWaitingTimeout);
        hideWaitingTimeout = null;
        if (container !== null) {
            setContainerVisibility(false);
            if (closeTimeout === null) {
                closeTimeout = window.setTimeout(function () {
                    container.parentNode.removeChild(container);
                    container = null;
                    lastSetContainerVisiblity = null;
                    enableBodyScrollbars();
                    closeTimeout = null;
                }, 300);
                escapeKey.removeHandler(closeOnEscKeyHandler);
            }
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

    var closeOnEscKeyHandler = function () {
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