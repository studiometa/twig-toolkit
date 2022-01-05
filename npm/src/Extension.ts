// eslint-disable-next-line import/no-extraneous-dependencies
import type { extend } from 'twig';
import {
  renderStyleAttribute,
  renderAttributes,
  renderClass,
} from './Helpers/Html.js';
import { HtmlElement } from './Tags/HtmlElement.js';
import { EndHtmlElement } from './Tags/EndHtmlElement';

/**
 * Extend Twig.
 *
 * @param {import('twig').Twig} instance
 */
export const extension: Parameters<typeof extend>[0] = (instance) => {
  const { escape } = instance.exports.filters;

  instance.exports.extendFunction('html_styles', (value) =>
    renderStyleAttribute(instance, value)
  );

  instance.exports.extendFunction('html_attributes', (value) =>
    renderAttributes(instance, value)
  );

  instance.exports.extendFunction('html_classes', (value) =>
    renderClass(instance, value)
  );

  instance.exports.extendTag(new EndHtmlElement(instance));
  instance.exports.extendTag(new HtmlElement(instance));
};
