<?php
/**
 * @link https://github.com/studiometa/wp-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\Twig\Helpers;

use Twig\Loader\FilesystemLoader;

/**
 * Template helper class.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
class Template
{
    /**
     * Add the component's path to the given Twig file system loader.
     * @param \Twig\Loader\FilesystemLoader $loader The loader to extend.
     */
    public static function addMetaNamespace(FilesystemLoader $loader):void
    {
        $loader->addPath(__DIR__ . '/../../templates', 'meta');
    }
}
