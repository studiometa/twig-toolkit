// eslint-disable-next-line import/no-extraneous-dependencies
import type { Twig } from 'twig';
import { renderStyleAttribute, renderAttributes, renderClass } from './Helpers/Html.js';
import { EndHtmlElement, HtmlElement } from './Tags/HtmlElement.js';

/**
 * Extend Twig.
 *
 * @param   {Twig} instance
 * @returns {Twig}
 */
export function extension<T extends Twig>(instance: T): T {
  instance.exports.extendFunction('html_styles', renderStyleAttribute);
  instance.exports.extendFunction('html_attributes', renderAttributes);
  instance.exports.extendFunction('html_classes', renderClass);

  instance.exports.extendTag(new EndHtmlElement(instance));
  instance.exports.extendTag(new HtmlElement(instance));

  return instance;
}
