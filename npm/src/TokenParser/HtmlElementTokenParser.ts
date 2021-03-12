/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

import { TwingTokenParser, TwingNode } from 'twing';
import { TwingNodeType } from 'twing/dist/es/lib/node-type.js';
import { Token, TokenType } from 'twig-lexer';
// eslint-disable-next-line import/no-unresolved
import { HtmlElementNode } from '../Node/HtmlElementNode.js';

export const type = new TwingNodeType('html_element');

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
export class HtmlElementTokenParser extends TwingTokenParser {
  /**
   * @inheritdoc
   */
  public parse(token: Token): HtmlElementNode {
    const stream = this.parser.getStream();

    // Get element name
    const element = this.parser.parseExpression();
    const nodes: Map<string | number, TwingNode> = new Map();
    nodes.set('element', element);

    // Get attributes
    if (stream.nextIf(TokenType.NAME, 'with')) {
      nodes.set('attrs', this.parser.parseExpression());
    }

    stream.expect(TokenType.TAG_END);

    // @todo detect self-closing tags to avoid parsing the content
    const capture = true;
    if (capture) {
      nodes.set('body', this.parser.subparse([ this, this.decideBlockEnd ], true));
      stream.expect(TokenType.TAG_END);
    }

    const attributes: Map<string, unknown> = new Map();
    attributes.set('capture', capture);

    return new HtmlElementNode(nodes, attributes, token.line, token.column, this.getTag());
  }

  /**
   * Get the Node type.
   * @return {TwingNodeType}
   */
  get type(): TwingNodeType {
    return type;
  }

  /**
   * Get the opening tag.
   * @return {string}
   */
  public getTag(): string {
    return type.toString();
  }

  /**
   * Test the end of the block.
   * @param  {Token}   token
   * @return {boolean}
   */
  public decideBlockEnd(token: Token): boolean {
    return token.test(TokenType.NAME, 'end_html_element');
  }
}
