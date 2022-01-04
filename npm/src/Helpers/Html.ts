/* eslint-disable no-restricted-syntax, no-continue, no-await-in-loop */
import { paramCase } from 'param-case';

export type Classes = string | Record<string, boolean> | Classes[];

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
 * @param   {Classes} classes
 * @returns {string}
 */
export function renderClass(classes:Classes):string {
  if (!classes) {
    return '';
  }

  if (typeof classes === 'string') {
    return classes;
  }

  if (Array.isArray(classes)) {
    return classes.map((c) => renderClass(c)).join(' ');
  }

  return Object.entries(classes)
    .reduce((acc, [key, value]) => {
      if (value && key !== '_keys') {
        acc.push(key);
      }

      return acc;
    }, [])
    .join(' ');
}

export type Styles = Record<string, string|number>;

/**
 * Render a style attribute.
 * @param   {Styles} styles
 * @returns {string}
 */
export function renderStyleAttribute(styles:Styles):string {
  if (!styles) {
    return '';
  }

  const renderedStyles = [];

  for (const [key, value] of Object.entries(styles)) {
    if (key === '_keys' || (typeof value === 'boolean' && !value) || value === '') {
      continue;
    }
    renderedStyles.push(`${paramCase(key)}: ${value};`);
  }
  return renderedStyles.join(' ');
}

export type Attributes = Record<string, Styles|Classes|unknown>;

/**
 * Render attributes.
 *
 * @param   {Attributes} attributes
 * @returns {string}
 */
export function renderAttributes(attributes:Attributes):string {
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
      value = renderClass(value as Classes);
    }
    if (key === 'style' && typeof value !== 'string') {
      value = renderStyleAttribute(value as Styles);
    }
    if (typeof value !== 'string') {
      if (value instanceof Map) {
        value = JSON.stringify(mapToObject(value));
      } else {
        value = JSON.stringify(value);
      }
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
 * @param   {string} name
 * @param   {Attributes} attributes
 * @param   {string} content
 * @returns {string}
 */
export function renderTag(name:string, attributes:Attributes, content = ''):string {
  const formattedAttributes = renderAttributes(attributes);
  if (SELF_CLOSING_TAGS.has(name)) {
    return `<${name}${formattedAttributes} />`;
  }
  return `<${name}${formattedAttributes}>\n${content}\n</${name}>`;
}
