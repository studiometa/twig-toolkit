<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\Helpers;

use Twig\Environment;
use Spatie\Url\Url as UrlCore;

/**
 * Url manipulation helper.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.3.1
 */
class Url extends UrlCore
{
    /**
     * @return self
     */
    public static function fromString(?string $url)
    {
        return parent::fromString($url ?? '');
    }
}
