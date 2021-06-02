<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit;

use Studiometa\TwigToolkit\Helpers\Html;
use Studiometa\TwigToolkit\Helpers\Template;
use Studiometa\TwigToolkit\Node\ElementNode;
use Studiometa\TwigToolkit\TokenParser\ElementTokenParser;

use Twig\Extension\AbstractExtension;
use Twig\Loader\FilesystemLoader;
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
     * Register the `@meta` namespace if the $loader parameter is specifier.
     *
     * @param FilesystemLoader|null $loader The Twig FilesystemLoader instance.
     */
    public function __construct(FilesystemLoader $loader = null)
    {
        if ($loader) {
            Template::addMetaNamespace($loader);
        }
    }

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
            /** @deprecated 1.0.1 Use the `html_classes` function instead. */
            new TwigFunction('class', [Html::class, 'renderClass']),
            /** @deprecated 1.0.1 Use the `html_attributrs` function instead. */
            new TwigFunction(
                'attributes',
                [Html::class, 'renderAttributes'],
                ['needs_environment' => true, 'is_safe' => ['html']]
            ),

            new TwigFunction('html_classes', [Html::class, 'renderClass']),
            new TwigFunction('html_styles', [Html::class, 'renderStyleAttribute']),
            new TwigFunction(
                'html_attributes',
                [Html::class, 'renderAttributes'],
                ['needs_environment' => true, 'is_safe' => ['html']]
            ),
        ];
    }
}
