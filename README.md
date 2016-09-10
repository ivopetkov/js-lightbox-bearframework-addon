# JS Lightbox
Addon for Bear Framework

This addon enables previewing images in fullscreen.

[![Build Status](https://travis-ci.org/ivopetkov/js-lightbox-bearframework-addon.svg)](https://travis-ci.org/ivopetkov/js-lightbox-bearframework-addon)
[![Latest Stable Version](https://poser.pugx.org/ivopetkov/js-lightbox-bearframework-addon/v/stable)](https://packagist.org/packages/ivopetkov/js-lightbox-bearframework-addon)
[![codecov.io](https://codecov.io/github/ivopetkov/js-lightbox-bearframework-addon/coverage.svg?branch=master)](https://codecov.io/github/ivopetkov/js-lightbox-bearframework-addon?branch=master)
[![License](https://poser.pugx.org/ivopetkov/js-lightbox-bearframework-addon/license)](https://packagist.org/packages/ivopetkov/js-lightbox-bearframework-addon)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ae8dc850be464b8da84c0f3168b99ec1)](https://www.codacy.com/app/ivo_2/js-lightbox-bearframework-addon)

## Download and install

**Install via Composer**

```shell
composer require ivopetkov/js-lightbox-bearframework-addon
```

**Download an archive**

Download the [latest release](https://github.com/ivopetkov/js-lightbox-bearframework-addon/releases) from the [GitHub page](https://github.com/ivopetkov/js-lightbox-bearframework-addon) and include the autoload file.
```php
include '/path/to/the/addon/autoload.php';
```

## Enable the addon
Enable the addon for your Bear Framework application.

```php
$app->addons->add('ivopetkov/js-lightbox-bearframework-addon');
```


## Usage

```html
<component src="js-lightbox"/>
```

### Attributes

`onload`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript code that will be executed when the lightbox code is loaded.

### Examples

Multiple images that are opened in fullscreen when clicked.
```html
<script>
var createGallery = function(){
    window.myGallery = new ivoPetkov.bearFramework.addons.jsLightbox([
        {
            'html'=>'<img src="file1-big.jpg"/>',
        },
        {
            'html'=>'<img src="file2-big.jpg"/>',
        }
    ]);
};
</script>
<component src="js-lightbox" onload="createGallery();"/>
<img src="file1-small.jpg" onclick="new ivoPetkov.bearFramework.addons.jsLightbox.open(0);"/>
<img src="file2-small.jpg" onclick="new ivoPetkov.bearFramework.addons.jsLightbox.open(1);"/>
```

## License
JS lightbox addon for Bear Framework is open-sourced software. It's free to use under the MIT license. See the [license file](https://github.com/ivopetkov/js-lightbox-bearframework-addon/blob/master/LICENSE) for more information.

## Author
This addon is created by Ivo Petkov. Feel free to contact me at [@IvoPetkovCom](https://twitter.com/IvoPetkovCom) or [ivopetkov.com](https://ivopetkov.com).
