/* eslint-disable no-restricted-syntax, no-continue, no-await-in-loop */
import { paramCase } from 'param-case';
import type { Twig as TwigInterface } from 'twig';

export type Classes = string | Record<string, boolean> | Classes[];
export type Styles = Record<string, string | number>;
export type Attributes = Record<string, Styles | Classes | unknown>;

function stringifyWithoutKey(obj: any) {
  return JSON.stringify(obj, (key, value) =>
    key === '_keys' ? undefined : value
  );
}

/**
 * Convert a map to an object.
 *
 * @param   {Map} map
 * @returns {Record<string, any>}
 */
function mapToObject(map) {
  const obj = {};
  for (const [key, value] of map.entries()) {
    if (value instanceof Map) {
      obj[key] = mapToObject(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

/**
 * Render classes.
 *
 * @param   {TwigInterface} Twig
 * @param   {Classes} classes
 * @returns {string}
 */
export function renderClass(Twig: TwigInterface, classes: Classes): string {
  if (!classes) {
    return '';
  }

  if (typeof classes === 'string') {
    return Twig.exports.filters.escape(classes, ['html_attr']);
  }

  if (Array.isArray(classes)) {
    return classes.map((c) => renderClass(Twig, c)).join(' ');
  }

  const formattedClasses = Object.entries(classes)
    .reduce((acc, [key, value]) => {
      if (value && key !== '_keys') {
        acc.push(key);
      }

      return acc;
    }, []);

  return Twig.exports.filters.escape(formattedClasses.join(' '), ['html_attr']);
}

/**
 * Render a style attribute.
 *
 * @param   {TwigInterface} Twig
 * @param   {Styles} styles
 * @returns {string}
 */
export function renderStyleAttribute(
  Twig: TwigInterface,
  styles: Styles
): string {
  if (!styles) {
    return '';
  }

  const renderedStyles = [];

  for (const [key, value] of Object.entries(styles)) {
    if (
      key === '_keys' ||
      (typeof value === 'boolean' && !value) ||
      value === ''
    ) {
      continue;
    }
    renderedStyles.push(`${paramCase(key)}: ${value};`);
  }
  return Twig.exports.filters.escape(renderedStyles.join(' '), ['html_attr']);
}

/**
 * Render attributes.
 *
 * @param   {TwigInterface} Twig
 * @param   {Attributes} attributes
 * @returns {string}
 */
export function renderAttributes(
  Twig: TwigInterface,
  attributes: Attributes
): string {
  if (!attributes) {
    return '';
  }

  const renderedAttributes = [''];

  for (let [key, value] of Object.entries(attributes)) {
    if (key === '_keys') {
      continue;
    }

    key = paramCase(key);
    if (typeof value === 'boolean') {
      if (value) {
        renderedAttributes.push(key);
      }
      continue;
    }
    if (key === 'class') {
      value = renderClass(Twig, value as Classes);
    }
    if (key === 'style' && typeof value !== 'string') {
      value = renderStyleAttribute(Twig, value as Styles);
    }
    if (typeof value !== 'string') {
      if (value instanceof Map) {
        value = stringifyWithoutKey(mapToObject(value));
      } else {
        value = stringifyWithoutKey(value);
      }

      value = Twig.exports.filters.escape(value, ['html_attr']);
    }

    renderedAttributes.push(`${key}="${value}"`);
  }

  return renderedAttributes.join(' ');
}

const SELF_CLOSING_TAGS = new Set([
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
]);

/**
 * Render a tag.
 *
 * @param   {TwigInterface} Twig
 * @param   {string} name
 * @param   {Attributes} attributes
 * @param   {string} content
 * @returns {string}
 */
export function renderTag(
  Twig: TwigInterface,
  name: string,
  attributes: Attributes,
  content = ''
): string {
  const formattedAttributes = renderAttributes(Twig, attributes);
  if (SELF_CLOSING_TAGS.has(name)) {
    return `<${name}${formattedAttributes} />`;
  }
  return `<${name}${formattedAttributes}>\n${content}\n</${name}>`;
}
