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
class ElementNode extends Node implements NodeCaptureInterface
{
    /**
     * @inheritdoc
     */
    public function compile(Compiler $compiler)
    {
        if ($this->getAttribute('capture')) {
            $compiler->write("ob_start();\n");

            if ($this->getNode('body')->lineno > $this->lineno) {
                $compiler->write('echo "\n";');
            }

            $compiler->subcompile($this->getNode('body'));
            $compiler->write(
                '$body = ("" === $tmp = ob_get_clean()) ? null : new Markup($tmp, $this->env->getCharset());'
            );
            $compiler->raw("\n");
        } else {
            $compiler->write('$body = null;')->raw("\n");
        }

        // Element
        $compiler
            ->addDebugInfo($this)
            ->write('echo $dom = \Studiometa\TwigToolkit\Helpers\Html::renderTag($this->env, ')
            ->subcompile($this->getNode('element'))
            ->raw(', ');

        if ($this->hasNode('attrs')) {
            $compiler->subcompile($this->getNode('attrs'));
        } else {
            $compiler->raw(' []');
        }

        $compiler->raw(', $body);')->raw("\n");
    }
}
