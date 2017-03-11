<?php
/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

use \BearFramework\App;

$app = App::get();
$context = $app->context->get(__FILE__);
?><html>
    <head>
        <link id="js-lightbox-bearframework-addon-style-1" rel="stylesheet" href="<?= $context->assets->getUrl('assets/jsLightbox.min.css', ['cacheMaxAge' => 999999, 'version' => 1]) ?>">
        <link id="js-lightbox-bearframework-addon-style-2" rel="stylesheet" href="<?= $context->assets->getUrl('assets/swiper.min.css', ['cacheMaxAge' => 999999, 'version' => 1]) ?>">
        <script id="js-lightbox-bearframework-addon-script-1" src="<?= $context->assets->getUrl('assets/swiper.min.js', ['cacheMaxAge' => 999999, 'version' => 1]) ?>"></script>
        <script id="js-lightbox-bearframework-addon-script-2" src="<?= $context->assets->getUrl('assets/jsLightbox.min.js', ['cacheMaxAge' => 999999, 'version' => 1]) ?>"></script>
    </head>
    <body>
        <?php
        if (!empty($component->onload)) {
            echo '<script>' . $component->onload . '</script>';
        }
        ?>
    </body>
</html>