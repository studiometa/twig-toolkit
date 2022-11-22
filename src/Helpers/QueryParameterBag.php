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
        $keyValuePairs = Arr::map($this->parameters, function ($value, $key) {
            return "{$key}=$value";
        });

        return implode('&', $keyValuePairs);
    }
}
