// eslint-disable-next-line max-classes-per-file
import type {
  ParseContext,
  CompiledToken,
  ExtendTagOptions,
  Twig,
  TagToken,
  TagParseOutput,
} from 'twig';
import { renderTag } from '../Helpers/Html.js';

export interface TagTokenWithStack extends TagToken {
  withStack: CompiledToken[];
}

/**
 * ExtendTag class.
 */
class ExtendTag {
  protected instance: Twig;

  /**
   * Class constructor.
   * @param {Twig} instance
   */
  constructor(instance: Twig) {
    this.instance = instance;
  }
}

/**
 * EndHtmlElement class.
 */
export class EndHtmlElement extends ExtendTag implements ExtendTagOptions {
  type = 'end_html_element';

  regex = /^end_html_element/;

  next = [];

  open = false;
}

/**
 * HtmlElement class.
 */
export class HtmlElement extends ExtendTag implements ExtendTagOptions {
  type = 'html_element';

  regex = /^html_element\s+(.+?)(?:\s+|$)(?:with\s+([\S\s]+?))?$/;

  next = ['end_html_element'];

  open = true;

  /**
   * Compile the tag.
   * @param   {TagTokenWithStack} token
   * @returns {TagTokenWithStack}
   */
  compile(token: TagTokenWithStack): TagTokenWithStack {
    const { match } = token;
    const expression = match[1].trim();
    const withContext = match[2];

    delete token.match;

    token.stack = this.instance.expression.compile.call(this, {
      type: this.instance.expression.type.expression,
      value: expression,
    }).stack;

    if (withContext !== undefined) {
      token.withStack = this.instance.expression.compile.call(this, {
        type: this.instance.expression.type.expression,
        value: withContext.trim(),
      }).stack;
    }

    return token;
  }

  /**
   * Parse the tag.
   * @param   {TagTokenWithStack} token
   * @param   {ParseContext} context
   * @param   {boolean} chain
   * @returns {TagParseOutput}
   */
  parse(token: TagTokenWithStack, context: ParseContext, chain: boolean): TagParseOutput {
    const tag = this.instance.expression.parse.call(this, token.stack, context);
    const attributes = token.withStack
      ? this.instance.expression.parse.call(this, token.withStack, context)
      : undefined;
    console.log(token);
    const content = this.parse(token.output, context, chain);
    const output = renderTag(tag, attributes, content);

    return {
      chain,
      output,
    };
  }
}
