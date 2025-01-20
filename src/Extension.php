<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit;

use Studiometa\TwigToolkit\Helpers\Html;
use Studiometa\TwigToolkit\Helpers\Url;
use Studiometa\TwigToolkit\TokenParser\ElementTokenParser;
use Twig\Extension\AbstractExtension;
use Twig\TokenParser\TokenParserInterface;
use Twig\TwigFunction;

/**
 * Twig extension class.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
class Extension extends AbstractExtension
{
    /**
     * Returns the token parser instances to add to the existing list.
     *
     * @return TokenParserInterface[]
     */
    public function getTokenParsers()
    {
        return [
            new ElementTokenParser(),
        ];
    }

    /**
     * Returns a list of functions to add to the existing list.
     *
     * @return TwigFunction[]
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('html_classes', [Html::class, 'renderClass']),
            new TwigFunction('html_styles', [Html::class, 'renderStyleAttribute']),
            new TwigFunction(
                'html_attributes',
                [Html::class, 'renderAttributes'],
                ['needs_environment' => true, 'is_safe' => ['html']]
            ),
            new TwigFunction(
                'merge_html_attributes',
                [Html::class, 'mergeAttributes']
            ),
            new TwigFunction(
                'twig_toolkit_url',
                [Url::class, 'fromString'],
            ),
        ];
    }
}
