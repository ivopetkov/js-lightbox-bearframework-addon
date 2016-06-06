/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

var ivoPetkov = ivoPetkov || {};
ivoPetkov.bearFramework = ivoPetkov.bearFramework || {};
ivoPetkov.bearFramework.addons = ivoPetkov.bearFramework.addons || {};

ivoPetkov.bearFramework.addons.jsLightbox = (function () {

    var objectsCounter = 0;

    return function (images, options) {
        objectsCounter++;
        var containerID = 'jslightbox' + objectsCounter;
        var object = this;
        object.imageSizes = [];

        if (typeof options === 'undefined') {
            options = [];
        }
        var defaultOptions = {
            spacing: '1rem',
            containerClassName: '',
            containerStyle: 'background-color:rgba(0,0,0,0.8);',
            nextButtonHtml: '<span style="display:block;width:42px;height:42px;position:fixed;right:0;top:calc((100% - 42px)/2);cursor:pointer;background-size:contain;background-position:center center;background-repeat:no-repeat;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI3Ni44IiB2aWV3Qm94PSIwIDAgNDggNzYuNzk5OTk1Ij48ZGVmcz48ZmlsdGVyIGlkPSJhIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9Ii45IiBmbG9vZC1jb2xvcj0iIzAwMCIgcmVzdWx0PSJmbG9vZCIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUdyYXBoaWMiIGluPSJmbG9vZCIgb3BlcmF0b3I9ImluIiByZXN1bHQ9ImNvbXBvc2l0ZTEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiByZXN1bHQ9ImJsdXIiLz48ZmVPZmZzZXQgcmVzdWx0PSJvZmZzZXQiLz48ZmVDb21wb3NpdGUgaW4yPSJvZmZzZXQiIGluPSJTb3VyY2VHcmFwaGljIiByZXN1bHQ9ImNvbXBvc2l0ZTIiLz48L2ZpbHRlcj48L2RlZnM+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDYuNGwtOCA4IDI0IDI0LTI0IDI0IDggOCAzMi0zMi0zMi0zMnoiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==);"></span>',
            previousButtonHtml: '<span style="display:block;width:42px;height:42px;position:fixed;left:0;top:calc((100% - 42px)/2);cursor:pointer;background-size:contain;background-position:center center;background-repeat:no-repeat;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI3Ni44IiB2aWV3Qm94PSIwIDAgNDggNzYuNzk5OTk1Ij48ZGVmcz48ZmlsdGVyIGlkPSJhIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9Ii45IiBmbG9vZC1jb2xvcj0iIzAwMCIgcmVzdWx0PSJmbG9vZCIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUdyYXBoaWMiIGluPSJmbG9vZCIgb3BlcmF0b3I9ImluIiByZXN1bHQ9ImNvbXBvc2l0ZTEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiByZXN1bHQ9ImJsdXIiLz48ZmVPZmZzZXQgcmVzdWx0PSJvZmZzZXQiLz48ZmVDb21wb3NpdGUgaW4yPSJvZmZzZXQiIGluPSJTb3VyY2VHcmFwaGljIiByZXN1bHQ9ImNvbXBvc2l0ZTIiLz48L2ZpbHRlcj48L2RlZnM+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDYuNGwtOCA4IDI0IDI0LTI0IDI0IDggOCAzMi0zMi0zMi0zMnoiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDQ4IDApIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=);"></span>',
            closeButtonHtml: '<span style="display:block;width:42px;height:42px;position:fixed;right:0;top:0;cursor:pointer;background-size:50%;background-position:center center;background-repeat:no-repeat;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMi4yMjIiIGhlaWdodD0iMzIuMjI0IiB2aWV3Qm94PSIwIDAgMzIuMjIxNzc1IDMyLjIyMzcxNyI+PGRlZnM+PGZpbHRlciBpZD0iYSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIuOSIgZmxvb2QtY29sb3I9IiMwMDAiIHJlc3VsdD0iZmxvb2QiLz48ZmVDb21wb3NpdGUgaW4yPSJTb3VyY2VHcmFwaGljIiBpbj0iZmxvb2QiIG9wZXJhdG9yPSJpbiIgcmVzdWx0PSJjb21wb3NpdGUxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgcmVzdWx0PSJibHVyIi8+PGZlT2Zmc2V0IHJlc3VsdD0ib2Zmc2V0Ii8+PGZlQ29tcG9zaXRlIGluMj0ib2Zmc2V0IiBpbj0iU291cmNlR3JhcGhpYyIgcmVzdWx0PSJjb21wb3NpdGUyIi8+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0ibWF0cml4KC40NjEgMCAwIC40NjEgLTQuODEgMS40ODUpIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik0yMS40LS4yN2wtOCA4IDIzLjk4IDI0LTI0IDI0IDggOCAzMi0zMi0zMi0zMnoiLz48cGF0aCBkPSJNNjkuMzgtLjI3bDggOC0yNCAyNCAyNCAyNC04IDgtMzItMzIgMzItMzJ6Ii8+PC9nPjwvc3ZnPg==);"></span>'
        };
        for (var key in defaultOptions) {
            if (typeof options[key] === 'undefined') {
                options[key] = defaultOptions[key];
            }
        }
        if (images.length < 2) {
            options.previousButtonHtml = '';
            options.nextButtonHtml = '';
        }

        var closeOnEscKey = function (event) {
            if (event.keyCode === 27) {
                object.close();
            }
        };

        var updateSizes = function () {
            var container = document.querySelector('.swiper-container-' + containerID);
            var children = container.firstChild.childNodes;
            var childrenCount = children.length;
            for (var i = 0; i < childrenCount; i++) {
                var child = children[i];
                var computedStyle = window.getComputedStyle(child.firstChild);
                var maxWidth = parseInt(computedStyle.width.replace('px', ''), 10);
                var maxHeight = parseInt(computedStyle.height.replace('px', ''), 10);
                var imageSize = object.imageSizes[i];
                var imageWidth = imageSize[0];
                var imageHeight = imageSize[1];
                if (imageWidth > maxWidth) {
                    imageHeight = maxWidth / imageWidth * imageHeight;
                    imageWidth = maxWidth;
                }

                if (imageHeight > maxHeight) {
                    imageWidth = maxHeight / imageHeight * imageWidth;
                    imageHeight = maxHeight;
                }
                child.firstChild.firstChild.style.maxWidth = imageWidth + 'px';
                child.firstChild.firstChild.style.marginTop = ((maxHeight - imageHeight) / 2) + 'px';
            }
        };

        var onBeforeShowImage = function (index) {
            var image = images[index];
            if (typeof image.onBeforeShow !== 'undefined' && image.onBeforeShow.length > 0) {
                (new Function(image.onBeforeShow))();
            }
        };

        var onShowImage = function (index) {
            var image = images[index];
            if (typeof image.onShow !== 'undefined' && image.onShow.length > 0) {
                (new Function(image.onShow))();
            }
        };

        this.open = function (index) {

            var html = '<div id="' + containerID + '" class="' + options.containerClassName + '" style="position:fixed;z-index:10000;top:0;left:0;width:100%;height:100%;' + options.containerStyle + '">';
            html += '<div class="swiper-container-' + containerID + '" style="width:100%;height:100%;">';
            html += '<div class="swiper-wrapper">';
            for (var i in images) {
                var image = images[i];
                object.imageSizes.push([image.width, image.height]);
                html += '<div class="swiper-slide" style="padding:' + options.spacing + ';box-sizing:border-box;">';
                html += '<div style="width:100%;height:100%;overflow:hidden;"><div style="margin:0 auto;overflow:hidden;">' + image.html + '</div></div>';
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
            html += '<div style="z-index:10001;position:fixed;top:0;left:0;">';
            if (options.nextButtonHtml.length > 0) {
                html += options.nextButtonHtml;
            }
            if (options.previousButtonHtml.length > 0) {
                html += options.previousButtonHtml;
            }
            if (options.closeButtonHtml.length > 0) {
                html += options.closeButtonHtml;
            }
            html += '</div>';
            html += '</div>';
            document.body.insertAdjacentHTML('beforeend', html);
            var container = document.querySelector('#' + containerID);

            object.swiperObject = new Swiper('.swiper-container-' + containerID, {
                direction: 'horizontal',
                loop: false,
                keyboardControl: true,
                mousewheelControl: true
            });
            object.swiperObject.on('slideChangeStart', function (swiper) {
                onBeforeShowImage(swiper.activeIndex);
            });
            object.swiperObject.on('slideChangeEnd', function (swiper) {
                onShowImage(swiper.activeIndex);
            });
            window.addEventListener('resize', updateSizes);
            updateSizes();
            if (typeof index !== 'undefined' && index !== 0) {
                object.swiperObject.slideTo(index, 0);
            } else {
                onBeforeShowImage(0);
                onShowImage(0);
            }

            var buttonIndex = -1;
            if (options.nextButtonHtml.length > 0) {
                buttonIndex++;
                var button = container.childNodes[1].childNodes[buttonIndex];
                button.addEventListener('click', object.swiperObject.slideNext);
            }
            if (options.previousButtonHtml.length > 0) {
                buttonIndex++;
                var button = container.childNodes[1].childNodes[buttonIndex];
                button.addEventListener('click', object.swiperObject.slidePrev);
            }
            if (options.closeButtonHtml.length > 0) {
                buttonIndex++;
                var button = container.childNodes[1].childNodes[buttonIndex];
                button.addEventListener('click', object.close);
            }

            document.body.addEventListener('keydown', closeOnEscKey);
        };

        this.close = function () {
            document.body.removeEventListener('keydown', closeOnEscKey);
            window.removeEventListener('resize', updateSizes);
            var container = document.querySelector('#' + containerID);
            container.remove();
        };

    };
}());