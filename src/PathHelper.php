<?php

namespace Studiometa\Twig;

class PathHelper
{
    /**
     * Add the component's path to the given Twig loader.
     * @param \Twig\Loader\FilesystemLoader $fs The loader to extend.
     */
    public static function addTemplatePath(\Twig\Loader\FilesystemLoader $fs):void
    {
        $fs->addPath(__DIR__ . '/../templates', 'meta');
    }
}
