if (typeof jsLightboxUtilities === 'undefined') {
    var jsLightboxUtilities = {};
    jsLightboxUtilities.counter = 0;
}

var jsLightbox = function (images) {
    jsLightboxUtilities.counter++;
    var id = jsLightboxUtilities.counter;
    var containerID = 'jslightbox' + id;
    var object = this;
    this.sizes = [];

    this.open = function (index) {
        var html = '<div id="' + containerID + '" class="swiper-container2">';
        html += '<div class="swiper-container" style="width:100%;height:100%;">';
        html += '<div class="swiper-wrapper">';
        for (var i in images) {
            var image = images[i];
            object.sizes.push([image.width, image.height]);
            html += '<div class="swiper-slide" style="padding:1rem;box-sizing:border-box;">';
            html += '<div style="width:100%;margin:0 auto;">' + image.html + '</div>';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        html += '<div>';
        html += '<a style="position: fixed;top:10px;left:10px;z-index:110;background-color:#fff;padding:10px;">NEXT</a>';
        html += '<a style="position: fixed;top:50px;left:10px;z-index:110;background-color:#fff;padding:10px;">PREV</a>';
        html += '<a style="position: fixed;top:90px;left:10px;z-index:110;background-color:#fff;padding:10px;">CLOSE</a>';
        html += '</div>';
        document.body.insertAdjacentHTML('beforeend', html);
        var buttons = document.querySelectorAll('#' + containerID + ' a');
        var nextButton = buttons[0];
        var previousButton = buttons[1];
        var closeButton = buttons[2];

        object.swiperObject = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            keyboardControl: true,
            mousewheelControl: true
        });
        object.swiperObject.on('slideChangeEnd', function () {
            responsivelyLazy.run();
        });
        window.addEventListener('resize', object.updateSizes);
        responsivelyLazy.run();
        object.updateSizes();
        if (typeof index !== 'undefined') {
            object.swiperObject.slideTo(index, 0);
        }

        nextButton.addEventListener('click', object.swiperObject.slideNext);
        previousButton.addEventListener('click', object.swiperObject.slidePrev);

        closeButton.addEventListener('click', object.close);
    };

    this.close = function () {
        var container = document.querySelector('#' + containerID);
        container.remove();
    };



    this.updateSizes = function () {
        var container = document.querySelector('.swiper-container');
        var children = container.firstChild.childNodes;
        var childrenCount = children.length;
        var maxWidth = window.innerHeight;
        var maxHeight = window.innerHeight;
        for (var i = 0; i < childrenCount; i++) {
            var imageSize = object.sizes[i];
            var imageWidth = imageSize[0];
            var imageHeight = imageSize[1];
            if (imageHeight > maxHeight) {
                imageWidth = maxHeight / imageHeight * imageWidth;
            }
            var child = children[i];
            child.firstChild.style.maxWidth = imageWidth + 'px';
        }
    };

};