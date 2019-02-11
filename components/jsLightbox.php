<?php
/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

use \BearFramework\App;

$app = App::get();
$context = $app->contexts->get(__FILE__);

$swiperJsUrl = $context->assets->getURL('assets/swiper.min.js', ['cacheMaxAge' => 999999999, 'version' => 1]);
$swiperCssUrl = $context->assets->getURL('assets/swiper.min.css', ['cacheMaxAge' => 999999999, 'version' => 1]);
?><html>
    <head><?php
?><script id="js-lightbox-bearframework-addon-script-1" src="<?= $context->assets->getURL('assets/jsLightbox.min.js', ['cacheMaxAge' => 999999999, 'version' => 3]) ?>" async></script><?php
?></head>
    <body><?php
        echo '<script>';
        echo 'var checkAndExecute=function(b,c){if(b())c();else{var a=function(){b()?(window.clearTimeout(a),c()):window.setTimeout(a,16)};window.setTimeout(a,16)}};';
        echo 'checkAndExecute(function(){return typeof ivoPetkov!=="undefined" && typeof ivoPetkov.bearFrameworkAddons!=="undefined" && typeof ivoPetkov.bearFrameworkAddons.jsLightbox!=="undefined"},function(){ivoPetkov.bearFrameworkAddons.jsLightboxGlobalData={"swiperJsUrl":"' . $swiperJsUrl . '","swiperCssUrl":"' . $swiperCssUrl . '"}' . $component->onload . '});';
        echo '</script>';
        ?></body>
</html>