<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\TokenParser;

use Studiometa\TwigToolkit\Node\ElementNode;
use Twig\Parser;
use Twig\Token;
use Twig\TokenParser\AbstractTokenParser;
use Twig\TokenStream;

/**
 * Class ElementTokenParser.
 *
 * @example
 * ```twig
 * {% element 'h1' with { class: 'foo', id: 'bar '} %}
 *   Hello world
 * {% endelement %}
 *
 * {% set tag = 'h1' %}
 * {% element tag %}Hello{% end %}
 * ```
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
final class ElementTokenParser extends AbstractTokenParser
{
    /**
     * @inheritdoc
     */
    public function parse(Token $token)
    {
        $stream = $this->parser->getStream();

        // Get element name
        $element = $this->parser->getExpressionParser()->parseExpression();
        $nodes = [
            'element' => $element,
        ];

        // Get attributes
        if ($stream->nextIf(Token::NAME_TYPE, 'with')) {
            $nodes['attrs'] = $this->parser->getExpressionParser()->parseExpression();
        }

        $stream->expect(Token::BLOCK_END_TYPE);

        // @todo detect self-closing tags to avoid parsing the content
        $capture = true;
        if ($capture) {
            $nodes['body'] = $this->parser->subparse([$this, 'decideBlockEnd'], true);
            $stream->expect(Token::BLOCK_END_TYPE);
        }

        return new ElementNode($nodes, ['capture' => $capture], $token->getLine(), $this->getTag());
    }

    /**
     * @inheritdoc
     */
    public function getTag()
    {
        return 'element';
    }

    /**
     * @param Token $token
     * @return bool
     */
    public function decideBlockEnd(Token $token): bool
    {
        return $token->test('endelement');
    }
}
