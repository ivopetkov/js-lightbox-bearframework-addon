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

$jsLightboxCssUrl = $context->assets->getUrl('assets/jsLightbox.min.css', ['cacheMaxAge' => 999999, 'version' => 1]);
$swiperJsUrl = $context->assets->getUrl('assets/swiper.min.js', ['cacheMaxAge' => 999999, 'version' => 1]);
$swiperCssUrl = $context->assets->getUrl('assets/swiper.min.css', ['cacheMaxAge' => 999999, 'version' => 1]);
?><html>
    <head>
        <script id="js-lightbox-bearframework-addon-script-1" src="<?= $context->assets->getUrl('assets/jsLightbox.min.js', ['cacheMaxAge' => 999999, 'version' => 2]) ?>"></script>
    </head>
    <body>
        <?php
        echo '<script>';
        echo 'var checkAndExecute=function(b,c){if(b())c();else{var a=function(){b()?(window.clearTimeout(a),c()):window.setTimeout(a,16)};window.setTimeout(a,16)}};';
        echo 'checkAndExecute(function(){return typeof ivoPetkov!=="undefined" && typeof ivoPetkov.bearFrameworkAddons!=="undefined" && typeof ivoPetkov.bearFrameworkAddons.jsLightbox!=="undefined"},function(){ivoPetkov.bearFrameworkAddons.jsLightboxGlobalData={"jsLightboxCssUrl":"' . $jsLightboxCssUrl . '","swiperJsUrl":"' . $swiperJsUrl . '","swiperCssUrl":"' . $swiperCssUrl . '"}' . $component->onload . '});';
        echo '</script>';
        ?>
    </body>
</html>