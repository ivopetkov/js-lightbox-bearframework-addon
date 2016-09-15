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
    window.myGallery = new ivoPetkov.bearFramework.addons.jsLightbox({
        'images': [
            {
                'html'=>'<img src="file1-big.jpg" style="max-width:100%;max-height:100%;"/>',
            },
            {
                'html'=>'<img src="file2-big.jpg" style="max-width:100%;max-height:100%;"/>',
            },
            {
                'html'=>'<img src="file3-big.jpg" style="max-width:100%;max-height:100%;"/>',
            }
        ],
        'options': {
            'paddingTop': '5px',
            'paddingRight': '5px',
            'paddingBottom': '5px',
            'paddingLeft': '5px'
        }
    });
};
</script>
<component src="js-lightbox" onload="createGallery();"/>
<img src="file1-small.jpg" onclick="window.myGallery.open(0);"/>
<img src="file2-small.jpg" onclick="window.myGallery.open(1);"/>
<img src="file3-small.jpg" onclick="window.myGallery.open(1);"/>
```

## JS data schema

`images`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`html`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The HTML code for the fullscreen image.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`onBeforeShow`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript code that will be executed before the image is shown.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`onShow`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript code that will be executed after the image is shown.

`options`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paddingTop`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The space between the fullscreen image and the top window border. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paddingRight`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The space between the fullscreen image and the right window border. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paddingBottom`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The space between the fullscreen image and the bottom window border. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paddingLeft`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The space between the fullscreen image and the left window border. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`containerClassName`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The class name of the fullscreen images container. It's useful for styling the container.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`containerStyle`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A CSS styles list that will be applied to the fullscreen images container.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`nextButtonHtml`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The HTML code for the next button.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`previousButtonHtml`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The HTML code for the previous button.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`closeButtonHtml`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The HTML code for the close button.

## JS API

After you create a jsLightbox object, you can call the following methods:

`open(index)`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open in fullscreen the image with the index specified.

`close()`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Closes the fullscreen preview.

## License
JS lightbox addon for Bear Framework is open-sourced software. It's free to use under the MIT license. See the [license file](https://github.com/ivopetkov/js-lightbox-bearframework-addon/blob/master/LICENSE) for more information.

## Author
This addon is created by Ivo Petkov. Feel free to contact me at [@IvoPetkovCom](https://twitter.com/IvoPetkovCom) or [ivopetkov.com](https://ivopetkov.com).
