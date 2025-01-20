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
use Twig\Attribute\YieldReady;
use Twig\Node\Expression\AbstractExpression;

/**
 * Class ElementNode
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
#[YieldReady]
class ElementNode extends Node implements NodeCaptureInterface
{
    public function __construct(
        AbstractExpression $name,
        Node $body,
        ?AbstractExpression $variables,
        int $lineno,
    ) {
        $nodes = [
            'name' => $name,
            'body' => $body,
        ];
        if (null !== $variables) {
            $nodes['variables'] = $variables;
        }

        $capture = $body->count() > 0;

        if ($body->hasAttribute('data')) {
            $data = $body->getAttribute('data');
            $capture = is_string($data) ? !empty(trim($data)) : $capture;
        }

        parent::__construct($nodes, ['capture' => $capture], $lineno);
    }
    /**
     * @inheritdoc
     */
    public function compile(Compiler $compiler)
    {
        $compiler->addDebugInfo($this);

        if ($this->getAttribute('capture')) {
            $compiler->write('$body = ');
            $node = new \Twig\Node\CaptureNode(
                $this->getNode('body'),
                $this->getNode('body')->getTemplateLine()
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
            ->subcompile($this->getNode('name'))
            ->raw(', ');

        if ($this->hasNode('variables')) {
            $compiler->subcompile($this->getNode('variables'));
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
