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

        $html = '<html><head><link rel="client-packages-embed" name="lightbox"></head></html>';
        $result = $app->clientPackages->process($html);

        $this->assertTrue(strpos($result, '<script>var html5DOMDocument=') !== false);
    }
}
