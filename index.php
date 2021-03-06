<?php

/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

use \BearFramework\App;

$app = App::get();
$context = $app->contexts->get(__DIR__);

$context->assets->addDir('assets/public');

$app->clientPackages
    ->add('lightbox', function (IvoPetkov\BearFrameworkAddons\ClientPackage $package) use ($context) {
        $package->addJSCode(include $context->dir . '/assets/jsLightbox.min.js.php');
        //$package->addJSCode(file_get_contents($context->dir . '/dev/jsLightbox.js'));

        $code = '.ipjslghtbc{opacity:0;position:fixed;z-index:10010000;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8);-webkit-transition:opacity 300ms;transition:opacity 300ms;}'
            . '.ipjslghtbcv{opacity:1;}'
            . '.ipjslghtbc > div{width:100vw;height:100vh;overflow:hidden;display:flex;align-items:center;}'
            . '.ipjslghtbc > div > div{overflow:auto;width:100vw;max-height:100vh;overscroll-behavior:contain;display:flex;flex-flow:wrap;justify-content:center;}'
            . '.ipjslghtbc > div > div > div{max-width:100vw;box-sizing:border-box;overflow:hidden;}'
            . '.ipjslghtbx{display:block;width:42px;height:42px;position:fixed;right:0;top:0;cursor:pointer;overflow:hidden;z-index:20000001;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;}'
            . '.ipjslghtbx span{display:block;width:42px;height:42px;font-size:25px;color:rgba(255,255,255,0.8);transform:rotate(45deg);margin-top:9px;margin-left:5px;}'
            . '.ipjslghtbcl{animation:ipjslghtbw 1.5s infinite linear;position:absolute;width:36px;height:36px;margin-top:-22px;margin-left:-22px;border-radius:50%;border:4px solid rgba(255,255,255,0.2);cursor:default;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;opacity:0;-webkit-transition:opacity 300ms;transition:opacity 300ms;border-right:4px solid rgba(255,255,255,0.8);}'
            . '.ipjslghtbclv{opacity:1;}'
            //                    . '@-moz-keyframes ipjslghtbw{from{-moz-transform:rotate(0deg);}to{-moz-transform:rotate(360deg);}}'
            //                    . '@-webkit-keyframes ipjslghtbw{from{-webkit-transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);}}'
            //                    . '@-ms-keyframes ipjslghtbw{from{-ms-transform:rotate(0deg);}to{-ms-transform:rotate(360deg);}}'
            //                    . '@-o-keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}'
            . '@keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
        $package->addCSSCode($code);

        $package->get = 'return ivoPetkov.bearFrameworkAddons.jsLightbox;';
    })
    ->add('-ivopetkov-js-lightbox-html5domdocument', function (IvoPetkov\BearFrameworkAddons\ClientPackage $package) use ($context) {
        $package->addJSFile($context->assets->getURL('assets/public/HTML5DOMDocument.min.js', ['cacheMaxAge' => 999999999, 'version' => 1]));
        $package->get = 'return html5DOMDocument;';
    });
