<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\Helpers;

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
     * List of self closing tags.
     * @source https://sites.google.com/site/getsnippet/html/html5/list-of-html-self-closing-tags
     */
    const SELF_CLOSING_TAGS = [
        'area',
        'base',
        'br',
        'col',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
    ];

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
     * Render an array of CSS styles into a valid CSS string.
     *
     * @example
     * ```php
     * Html::renderStyleAttribute(['display' => 'none', 'pointer-events' => 'none']);
     * // 'display: none; pointer-events: none;'
     * ```
     *
     * @param  array  $styles The styles to render.
     * @return string         The rendered styles.
     */
    public static function renderStyleAttribute(array $styles):string
    {
        $renderedStyle = [];

        foreach ($styles as $property => $value) {
            // Skip boolean values that are not true and empty strings
            if (is_bool($value) && !$value || $value === '') {
                continue;
            }

            // Convert property to kebab-case as it is the only
            // valid case format for CSS properties.
            $property = (new Convert($property))->toKebab();
            $renderedStyle[] = sprintf('%s: %s;', $property, $value);
        }

        return implode(' ', $renderedStyle);
    }

    /**
     * Merge the given array representing HTML attributes.
     *
     * @param  array  $attributes
     *   The user provided attributes.
     * @param  array  $default
     *   The default attributes that should be used when their equivalent is not defined.
     * @param  array  $required
     *   The required attributes that should always be present and can not be overriden.
     *
     * @return array
     */
    public static function mergeAttributes(
        array $attributes,
        array $default = [],
        array $required = []
    ):array {
        // Merge `class` attributes before the others
        $required['class'] = array_filter([
            $default['class'] ?? '',
            $attributes['class'] ?? '',
            $required['class'] ?? '',
        ]);

        // Remove the `class` attribute if empty
        if (empty($required['class'])) {
            unset($required['class']);
        }

        return array_merge($default, $attributes, $required);
    }

    /**
     * Render an array of attributes.
     *
     * @example
     * ```twig
     * <div {{ attributes({ id: 'foo', ariaHidden: 'true' }) }}></div>
     * ```
     *
     * @param  Environment $env        The attributes to render.
     * @param  array       $attributes The attributes to render.
     * @return string                  The rendered attributes.
     */
    public static function renderAttributes(Environment $env, array $attributes):string
    {
        $renderedAttributes = [''];

        foreach ($attributes as $key => $value) {
            // Convert keys to kebab-case
            $key = (new Convert($key))->toKebab();

            // Push boolean attributes without value if true and skip to the next attribute
            if (is_bool($value)) {
                if ($value) {
                    $renderedAttributes[] = $key;
                }
                continue;
            }

            // Format class attributes
            if ($key === 'class') {
                $value = static::renderClass($value);
            }

            // Format style attributes from array to string
            if ($key === 'style' && is_array($value)) {
                $value = static::renderStyleAttribute($value);
            }

            if (is_array($value)) {
                $value = json_encode($value);
            }

            $value = twig_escape_filter($env, $value, 'html_attr', $env->getCharset());

            $renderedAttributes[] = sprintf('%s="%s"', $key, $value);
        }

        return implode(' ', $renderedAttributes);
    }

    /**
     * Render an HTML tag with attributes and its content.
     *
     * @param  Environment $env        The Twig environment.
     * @param  string      $name       The name of the tag.
     * @param  array       $attributes A list of attributes.
     * @param  string|null $content    The content of the tag.
     * @return string                  The rendered markup.
     */
    public static function renderTag(
        Environment $env,
        string $name,
        array $attributes = [],
        string $content = null,
    ):string {
        $attributes = static::renderAttributes($env, $attributes);
        $name = twig_escape_filter($env, $name, 'html_attr', $env->getCharset());

        // Render self closing tags.
        if (in_array($name, self::SELF_CLOSING_TAGS)) {
            return sprintf('<%s%s />', $name, $attributes);
        }

        $openingTag = sprintf('<%s%s>', $name, $attributes);
        $closingTag = sprintf('</%s>', $name);

        $html = [
            $openingTag,
            empty($content) ? '' : $content,
            $closingTag,
        ];

        return implode('', $html);
    }
}
