import type {
  ParseContext,
  CompiledToken,
  ExtendTagOptions,
  TagToken,
  TagParseOutput,
} from 'twig';
import { renderTag } from '../Helpers/Html.js';
import { AbstractTag } from './AbstractTag.js';

export interface TagTokenWithStack extends TagToken {
  withStack: CompiledToken[];
}

/**
 * HtmlElement class.
 */
export class HtmlElement extends AbstractTag implements ExtendTagOptions {
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
    const content = this.parse(token.output, context, chain);
    const output = renderTag(this.instance, tag, attributes, content);

    return {
      chain,
      output,
    };
  }
}
