<?php
/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

?><html>
    <head>
        <link rel="stylesheet" href="<?= $context->assets->getUrl('assets/swiper.min.css') ?>">
        <style>
            .swiper-container2 {
                position:fixed;
                z-index:100;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background-color:rgba(0,0,0,0.8);
            }
        </style>
    <body>

        <script src="<?= $context->assets->getUrl('assets/swiper.min.js') ?>"></script>
        <script src="<?= $context->assets->getUrl('assets/jsLightbox.js') ?>"></script>
    </body>
</html>