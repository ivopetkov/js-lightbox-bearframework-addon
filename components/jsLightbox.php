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
    </head>
    <body>
        <script src="<?= $context->assets->getUrl('assets/swiper.min.js') ?>"></script>
        <script src="<?= $context->assets->getUrl('assets/jsLightbox.js') ?>"></script>
        <?php
        if (!empty($component->onload)) {
            echo '<script>' . $component->onload . '</script>';
        }
        ?>
    </body>
</html>