<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\TokenParser;

use Studiometa\TwigToolkit\Node\ElementNode;
use Twig\Token;
use Twig\TokenParser\AbstractTokenParser;

/**
 * Class ElementTokenParser.
 *
 * @example
 * ```twig
 * {% html_element 'h1' with { class: 'foo', id: 'bar '} %}
 *   Hello world
 * {% end_html_element %}
 *
 * {% set tag = 'h1' %}
 * {% html_element %}Hello{% end_html_element %}
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

        /** @var \Twig\Node\Expression\AbstractExpression */
        $name = method_exists($this->parser, 'parseExpression')
            ? $this->parser->parseExpression()
            : $this->parser->getExpressionParser()->parseExpression();

        /** @var null|\Twig\Node\Expression\AbstractExpression */
        $variables = null;
        if ($stream->nextIf(Token::NAME_TYPE, 'with')) {
            /** @var \Twig\Node\Expression\AbstractExpression */
            $variables = method_exists($this->parser, 'parseExpression')
                ? $this->parser->parseExpression()
                : $this->parser->getExpressionParser()->parseExpression();
        }

        $stream->expect(Token::BLOCK_END_TYPE);
        $body = $this->parser->subparse([$this, 'decideBlockEnd'], true);
        $stream->expect(Token::BLOCK_END_TYPE);

        return new ElementNode($name, $body, $variables, $token->getLine());
    }

    /**
     * @inheritdoc
     */
    public function getTag()
    {
        return 'html_element';
    }

    /**
     * @param Token $token
     * @return bool
     */
    public function decideBlockEnd(Token $token): bool
    {
        return $token->test('end_html_element');
    }
}
