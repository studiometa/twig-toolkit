<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\Twig;

use Studiometa\Twig\Helpers\Html;
use Studiometa\Twig\Helpers\Template;
use Studiometa\Twig\Node\ElementNode;
use Studiometa\Twig\TokenParser\ElementTokenParser;

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
            new TwigFunction('class', [Html::class, 'renderClass']),
        ];
    }
}
