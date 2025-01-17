<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\Node;

use Twig\Compiler;
use Twig\Node\Node;
use Twig\Node\NodeCaptureInterface;

/**
 * Class ElementNode
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
#[\Twig\Attribute\YieldReady]
class ElementNode extends Node implements NodeCaptureInterface
{
    /**
     * @inheritdoc
     */
    public function compile(Compiler $compiler)
    {
        if ($this->getAttribute('capture')) {
            $compiler->write('$body = ');
            $node = new \Twig\Node\CaptureNode(
                $this->getNode('body'),
                $this->getNode('body')->lineno,
                $this->getNode('body')->tag
            );
            $node->setAttribute('with_blocks', true);
            $compiler->subcompile($node);
            $compiler->raw("\n");
        } else {
            $compiler->write('$body = null;')->raw("\n");
        }

        // Element
        $compiler
            ->addDebugInfo($this)
            ->write('yield $dom = \Studiometa\TwigToolkit\Helpers\Html::renderTag($this->env, ')
            ->subcompile($this->getNode('element'))
            ->raw(', ');

        if ($this->hasNode('attrs')) {
            $compiler->subcompile($this->getNode('attrs'));
        } else {
            $compiler->raw('[]');
        }

        $compiler->raw(', ');
        if ($this->getNode('body')->lineno > $this->lineno) {
            $compiler->write('"\n" . ');
        }
        $compiler->raw('$body);')->raw("\n");
    }
}
