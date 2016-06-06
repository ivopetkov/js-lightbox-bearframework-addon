<?php

/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) 2016 Ivo Petkov
 * Free to use under the MIT license.
 */

$context->assets->addDir('assets');

$app->components->addAlias('js-lightbox', 'file:' . $context->dir . '/components/jsLightbox.php');
