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

$app->localization
    ->addDictionary('en', function () use ($context) {
        return include $context->dir . '/locales/en.php';
    })
    ->addDictionary('bg', function () use ($context) {
        return include $context->dir . '/locales/bg.php';
    });

$app->clientPackages
    ->add('lightbox', function (IvoPetkov\BearFrameworkAddons\ClientPackage $package) use ($context) {
        $package->addJSCode(include $context->dir . '/assets/jsLightbox.min.js.php');
        //$package->addJSCode(file_get_contents($context->dir . '/dev/jsLightbox.js'));

        $closeButtonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff"><path d="M11.47 10l7.08-7.08c.4-.4.4-1.06 0-1.47-.4-.4-1.06-.4-1.47 0L10 8.53 2.92 1.45c-.4-.4-1.07-.4-1.47 0-.4.4-.4 1.06 0 1.47L8.53 10l-7.08 7.08c-.4.4-.4 1.07 0 1.47.2.2.47.3.74.3.23 0 .5-.1.7-.3l7.1-7.08 7.07 7.08c.2.2.47.3.73.3.3 0 .56-.1.76-.3.4-.4.4-1.06 0-1.47L11.46 10z"/></svg>';

        $code = '.ipjslghtbc{opacity:0;position:fixed;z-index:10010000;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8);-webkit-transition:opacity 300ms;transition:opacity 300ms;}'
            . '.ipjslghtbcv{opacity:1;}'
            . '.ipjslghtbc > div{width:100vw;height:100vh;overflow:hidden;display:flex;align-items:center;}'
            . '.ipjslghtbc > div > div{overflow:auto;width:100vw;max-height:100vh;overscroll-behavior:contain;display:flex;flex-flow:wrap;justify-content:center;}'
            . '.ipjslghtbc > div > div > div{max-width:100vw;box-sizing:border-box;overflow:hidden;}'
            . '.ipjslghtbx{display:block;width:42px;height:42px;position:fixed;right:0;top:0;cursor:pointer;overflow:hidden;z-index:20000001;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;background-image:url(data:image/svg+xml;base64,' . base64_encode($closeButtonIcon) . ');background-repeat:no-repeat;background-position:center;background-size:16px;}'
            . '.ipjslghtbcl{animation:ipjslghtbw 1.5s infinite linear;position:absolute;width:36px;height:36px;margin-top:-22px;margin-left:-22px;border-radius:50%;border:4px solid rgba(255,255,255,0.2);cursor:default;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;opacity:0;-webkit-transition:opacity 300ms;transition:opacity 300ms;border-right:4px solid rgba(255,255,255,0.8);}'
            . '.ipjslghtbclv{opacity:1;}'
            //                    . '@-moz-keyframes ipjslghtbw{from{-moz-transform:rotate(0deg);}to{-moz-transform:rotate(360deg);}}'
            //                    . '@-webkit-keyframes ipjslghtbw{from{-webkit-transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);}}'
            //                    . '@-ms-keyframes ipjslghtbw{from{-ms-transform:rotate(0deg);}to{-ms-transform:rotate(360deg);}}'
            //                    . '@-o-keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}'
            . '@keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
        $package->addCSSCode($code);

        $data = [__('ivopetkov.js-lightbox.close')];
        $package->get = 'return ivoPetkov.bearFrameworkAddons.jsLightbox.initialize(' . json_encode($data) . ');';
    });
