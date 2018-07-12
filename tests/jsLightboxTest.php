<?php

/*
 * JS lightbox for Bear Framework
 * https://github.com/ivopetkov/js-lightbox-bearframework-addon
 * Copyright (c) Ivo Petkov
 * Free to use under the MIT license.
 */

/**
 * @runTestsInSeparateProcesses
 */
class JSLightboxTest extends BearFramework\AddonTests\PHPUnitTestCase
{

    /**
     * 
     */
    public function testOutput()
    {
        $app = $this->getApp();

        $result = $app->components->process('<component src="js-lightbox" onload="alert(1);"/>');
        $this->assertTrue(strpos($result, 'swiper.min.js') !== false);
        $this->assertTrue(strpos($result, 'jsLightbox.min.js') !== false);
        $this->assertTrue(strpos($result, 'alert(1);') !== false);
    }

}
