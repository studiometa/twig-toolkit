<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\Helpers;

use Twig\Environment;
use Spatie\Url\Helpers\Arr;
use Spatie\Url\QueryParameterBag as QueryParameterBagCore;

/**
 * QueryParameterBag manipulation helper.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.3.2
 */
class QueryParameterBag extends QueryParameterBagCore
{
    /**
     * Do not encode values.
     * @return string
     */
    public function __toString()
    {
        /** @var string[] */
        $parts = [];

        /** @var array<string, string>  */
        $parameters = $this->parameters;

        foreach ($parameters as $key => $value) {
            $parts[] = "{$key}={$value}";
        }

        return implode('&', $parts);
    }
}
