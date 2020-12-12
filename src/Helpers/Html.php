<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\Twig\Helpers;

use Twig\Environment;
use Jawira\CaseConverter\Convert;

/**
 * Html manipulation helper.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
class Html
{
    /**
     * Render an array, object or string as a class.
     *
     * @example
     * The following usages will all return the same value `foo bar`:
     * ```php
     * Html::renderClass('foo bar');
     * Html::renderClass(['foo', 'bar']);
     * Html::renderClass(['foo' => true, 'bar' => true, 'baz' => false]);
     * Html::renderClass(['foo', ['bar' => true, 'baz' => false]]);
     * ```
     *
     * @param  array<string|array>|string $class The class description.
     * @return string                            A string of classes.
     */
    public static function renderClass($class):string
    {
        if (is_string($class)) {
            return $class;
        }

        $renderedClass = [];

        foreach ($class as $key => $value) {
            if (is_int($key)) {
                if (is_array($value)) {
                    $renderedClass[] = self::renderClass($value);
                    continue;
                }

                $renderedClass[] = $value;
                continue;
            }

            if ($value) {
                $renderedClass[] = $key;
            }
        }

        return implode(' ', $renderedClass);
    }

    /**
     * Prepare an attributes array to be used with \Windwalker\Dom\Builder::buildAttributes.
     * This method will json_encode any nested array.
     *
     * @param  array  $attrs A list of attributes.
     * @return array         A formatted list of attributes.
     */
    public static function prepareAttributes(Environment $env, array $attrs):array
    {
        $preparedAttrs = [];
        foreach ($attrs as $key => $value) {
            $key = (new Convert($key))->toKebab();
            $value = is_array($value) ? json_encode($value) : $value;

            $preparedAttrs[$key] = twig_escape_filter($env, $value, 'html_attr', $env->getCharset());
        }

        return $preparedAttrs;
    }
}
