<?php

/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

BearFramework\Addons::register('ivopetkov/js-lightbox-bearframework-addon', __DIR__, [
    'require' => [
        'bearframework/localization-addon',
        'ivopetkov/escape-key-js-bearframework-addon',
        'ivopetkov/client-packages-bearframework-addon',
        'ivopetkov/html5-dom-document-js-bearframework-addon'
    ]
]);
