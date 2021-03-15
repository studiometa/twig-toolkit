/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

import { TwingTemplate } from 'twing/dist/es/lib/template.js';
import { escape } from 'twing/dist/es/lib/extension/core/filters/escape.js';
import toKebab from 'lodash/kebabCase.js';

export type Classes = string | Map<string, boolean> | Map<number, Classes>;
export type Styles = Map<string, string | number>;
export type Attributes = Map<
  'class' | 'style' | string,
  Classes | Styles | unknown
>;

/**
 * Html manipulation helper.p
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
export class Html {
  /**
   * List of self closing tags.
   * @source https://sites.google.com/site/getsnippet/html/html5/list-of-html-self-closing-tags
   */
  static readonly SELF_CLOSING_TAGS = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ];

  /**
   * Render an array, object or string as a class.
   *
   * The following usages will all return the same value `foo bar`:
   * @example
   * ```js
   * Html.renderClass('foo bar');
   * Html.renderClass(['foo', 'bar']);
   * Html.renderClass({ foo: true, bar: true, baz: false });
   * Html.renderClass([ 'foo', { bar: true, baz: false } ]);
   * ```
   *
   * @param  {Classes}         classes The class description.
   * @return {Promise<string>}         A string of classes.
   */
  public static async renderClass(classes: Classes): Promise<string> {
    if (typeof classes === 'string') {
      return classes;
    }

    const renderedClasses = [];

    for (const [ key, value ] of classes.entries()) {
      if (typeof key === 'string') {
        if (value) {
          renderedClasses.push(key);
        }
        continue;
      }

      if (typeof value === 'string') {
        renderedClasses.push(value);
        continue;
      }

      renderedClasses.push(Html.renderClass(value as Classes));
    }

    return (await Promise.all(renderedClasses)).join(' ');
  }

  /**
   * Render an array of CSS styles into a valid CSS string.
   *
   * @example
   * ```js
   * Html.renderStyleAttribute(new Map([['display', 'none'], ['pointer-events', 'none']]));
   * Html.renderStyleAttribute(new Map([['display', 'none'], ['pointerEvents', 'none']]));
   * // 'display: none; pointer-events: none;'
   * ```
   *
   * @param  {Styles} styles The styles to render.
   * @return {string}        The rendered styles.
   */
  public static async renderStyleAttribute(styles: Styles): Promise<string> {
    const renderedStyles = [];

    for (const [ key, value ] of styles.entries()) {
      if ((typeof value === 'boolean' && !value) || value === '') {
        continue;
      }

      renderedStyles.push(`${toKebab(key)}: ${value};`);
    }

    return renderedStyles.join(' ');
  }

  /**
   * Render an array of attributes.
   *
   * @example
   * ```twig
   * <div {{ attributes({ id: 'foo', ariaHidden: 'true' }) }}></div>
   * ```
   *
   * @param  {TwingTemplate}   template   A Twing template.
   * @param  {Attributes}      attributes The attributes to render.
   * @return {Promise<string>}            The rendered attributes.
   */
  public static async renderAttributes(
    template: TwingTemplate,
    attributes: Attributes,
  ): Promise<string> {
    const renderedAttributes = [ '' ];

    // @todo improve performance by removing the awaits in the loop
    /* eslint-disable no-await-in-loop */
    for (let [ key, value ] of attributes.entries()) {
      key = toKebab(key);

      if (typeof value === 'boolean') {
        if (value) {
          renderedAttributes.push(key);
        }

        continue;
      }

      if (key === 'class') {
        value = await Html.renderClass(value as Classes);
      }

      if (key === 'style' && typeof value !== 'string') {
        value = await Html.renderStyleAttribute(value as Styles);
      }

      if (typeof value !== 'string') {
        if (value instanceof Map) {
          value = JSON.stringify(Html.mapToObject(value));
        } else {
          value = JSON.stringify(value);
        }
      }

      value = await escape(
        template,
        value,
        'html_attr',
        template.environment.getCharset(),
      );

      renderedAttributes.push(`${key}="${value}"`);
    }
    /* eslint-enable no-await-in-loop */

    return renderedAttributes.join(' ');
  }

  /**
   * Stringify an object or map.
   * @param  {Map<string, unknown>} value The value to stringify.
   * @return {string}
   */
  private static mapToObject(map: Map<string, unknown>): unknown {
    const obj = {};

    for (const [ key, value ] of map.entries()) {
      if (value instanceof Map) {
        obj[key] = Html.mapToObject(value);
      } else {
        obj[key] = value;
      }
    }

    return obj;
  }

  /**
   * Render an HTML tag with attributes and its content.
   *
   * @param  {TwingTempltate} template   The Twig environment.
   * @param  {string}         name       The name of the tag.
   * @param  {Attributes}     attributes A list of attributes.
   * @param  {string}         content    The content of the tag.
   * @return {Promise<string>}           The rendered markup.
   */
  public static async renderTag(
    template: TwingTemplate,
    name: string,
    attributes: Attributes,
    content = '',
  ): Promise<string> {
    const formattedAttributes: string = await Html.renderAttributes(
      template,
      attributes,
    );
    const escapedName: string = await escape(
      template,
      name,
      'html_attr',
      template.environment.getCharset(),
    );

    // Render self closing tags.
    if (Html.SELF_CLOSING_TAGS.includes(escapedName)) {
      return `<${escapedName}${formattedAttributes} />`;
    }

    return `<${escapedName}${formattedAttributes}>${content}</${escapedName}>`;
  }
}
