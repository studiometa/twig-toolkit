// eslint-disable-next-line import/no-extraneous-dependencies
import type { extend } from 'twig';
import {
  renderStyleAttribute,
  renderAttributes,
  renderClass,
  mergeAttributes,
} from './Helpers/Html.js';
import { HtmlElement } from './Tags/HtmlElement.js';
import { EndHtmlElement } from './Tags/EndHtmlElement';

/**
 * Extend Twig.
 *
 * @param {import('twig').Twig} instance
 */
export const extension: Parameters<typeof extend>[0] = (instance) => {
  instance.exports.extendFunction('html_styles', (value) => renderStyleAttribute(instance, value));

  instance.exports.extendFunction('html_attributes', (value) => renderAttributes(instance, value));

  instance.exports.extendFunction('html_classes', (value) => renderClass(instance, value));

  instance.exports.extendFilter(
    'merge_html_attributes',
    // @ts-ignore
    (attributes, args) => {
      let defaultAttributes;
      let requiredAttributes;

      if (Array.isArray(args)) {
        [defaultAttributes, requiredAttributes] = args;
      }

      // @ts-ignore
      return mergeAttributes(attributes, defaultAttributes, requiredAttributes)
    }
  );

  instance.exports.extendTag(new EndHtmlElement(instance));
  instance.exports.extendTag(new HtmlElement(instance));
};
