<?php
/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */
?><html>
    <head>
        <link id="js-lightbox-bearframework-addon-style" rel="stylesheet" href="<?= $context->assets->getUrl('assets/swiper.min.css') ?>">
    </head>
    <body>
        <script id="js-lightbox-bearframework-addon-script-1" src="<?= $context->assets->getUrl('assets/swiper.min.js') ?>"></script>
        <script id="js-lightbox-bearframework-addon-script-2" src="<?= $context->assets->getUrl('assets/jsLightbox.js') ?>"></script>
        <?php
        if (!empty($component->onload)) {
            echo '<script>' . $component->onload . '</script>';
        }
        ?>
    </body>
</html>