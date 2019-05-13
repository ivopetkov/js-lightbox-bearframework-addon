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

$context->assets->addDir('assets/public');

$app->clientPackages
        ->add('lightbox', 3, function(IvoPetkov\BearFrameworkAddons\ClientPackage $package) use ($context) {
            $package->addJSCode(include $context->dir . '/assets/jsLightbox.min.js.php');
            //$package->addJSCode(file_get_contents($context->dir . '/dev/jsLightbox.js'));

            $code = '.ipjslghtbc{opacity:0;position:fixed;z-index:10010000;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8);-webkit-transition:opacity 300ms;transition:opacity 300ms;}'
                    . '.ipjslghtbcv{opacity:1;}'
                    . '.ipjslghtbc > div{width:100vw;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;}'
                    . '.ipjslghtbc > div > div{overflow:auto;max-width:100vw;max-height:100vh;box-sizing:border-box;}'
                    . '.ipjslghtbx{display:block;width:42px;height:42px;position:fixed;right:0;top:0;cursor:pointer;overflow:hidden;z-index:20000001;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;}'
                    . '.ipjslghtbx span{display:block;width:42px;height:42px;font-size:25px;color:rgba(255,255,255,0.8);transform:rotate(45deg);margin-top:9px;margin-left:5px;}'
                    . '.ipjslghtbcl{color:rgba(255,255,255,0.8);font-size:70px;line-height:10px;-webkit-animation:ipjslghtbw 1s infinite linear;animation:ipjslghtbw 1s infinite linear;position:absolute;width:40px;height:40px;margin-top:-25px;margin-left:-25px;border-radius:50%;border:5px solid rgba(255,255,255,0.8);cursor:default;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;opacity:0;-webkit-transition:opacity 300ms;transition:opacity 300ms;}'
                    . '.ipjslghtbclv{opacity:1;}'
                    . '@-moz-keyframes ipjslghtbw{from{-moz-transform:rotate(0deg);}to{-moz-transform:rotate(360deg);}}'
                    . '@-webkit-keyframes ipjslghtbw{from{-webkit-transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);}}'
                    . '@-ms-keyframes ipjslghtbw{from{-ms-transform:rotate(0deg);}to{-ms-transform:rotate(360deg);}}'
                    . '@-o-keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}'
                    . '@keyframes ipjslghtbw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
            $package->addCSSCode($code);

            $package->preparePackage('-ivopetkov-js-lightbox-html5domdocument');

            $package->get = 'return ivoPetkov.bearFrameworkAddons.jsLightbox;';
        })
        ->add('-ivopetkov-js-lightbox-html5domdocument', 1, function(IvoPetkov\BearFrameworkAddons\ClientPackage $package) use ($context) {
            $package->requirements[] = [
                'type' => 'file',
                'url' => $context->assets->getURL('assets/public/HTML5DOMDocument.min.js', ['cacheMaxAge' => 999999999, 'version' => 1]),
                'mimeType' => 'text/javascript'
            ];
            $package->get = 'return html5DOMDocument;';
        });
