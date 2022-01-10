# Twig toolkit

[![NPM Version](https://img.shields.io/npm/v/@studiometa/twig-toolkit?style=flat-square)](https://www.npmjs.com/package/@studiometa/twig-toolkit)
[![License MIT](https://img.shields.io/packagist/l/studiometa/twig-toolkit?style=flat-square)](https://github.com/studiometa/twig-toolkit/blob/master/LICENSE)

> A set of useful extension and components for Twig.

## Installation

```bash
npm install @studiometa/twig-toolkit --save-dev
```

## Usage

Use `Twig.extend` to register the extension:

```js
import Twig from 'twig';
import { extension } from '@studiometa/twig-toolkit';

Twig.extend(extension);
```

## Reference

### Functions

#### `{{ html_classes(<classes>) }}`

A function to manage classes more easily.

**Params**
- `classes` (`String | Array | Object`)

**Examples**
```twig
{# The following examples will render the same HTML #}
<div class="{{ html_classes('foo bar') }}"></div>
<div class="{{ html_classes(['foo', 'bar']) }}"></div>
<div class="{{ html_classes({ foo: true, bar: true, baz: false }) }}"></div>
<div class="{{ html_classes(['foo', { bar: true, baz: false }]) }}"></div>

{# HTML #}
<div class="foo bar"></div>
```

#### `{{ html_styles(<styles>) }}`

A function to manage style attributes more easily.

**Params**
- `styles` (`Object`)

**Examples**
```twig
<div style="{{ html_styles({ display: 'none', margin_top: '10px' }) }}"></div>
<div style="display: none; margin-top: 10px"></div>

<div style="{{ html_styles({ display: false, opacity: 0 }) }}"></div>
<div style="opacity: 0;"></div>
```

#### `{{ html_attributes(<attrs>) }}`

A function to render HTML attributes more easily with the following features:

- The `class` attribute will automatically be processed by the `class` method described above
- Array and objects will be converted to JSON
- Attributes keys will be converted from any format to kebab-case
- Values will be escaped to prevent XSS attacks

**Params**
- `attrs` (`Object`): The attributes to render

**Examples**
```twig
<div {{ html_attributes({ id: 'one', data_options: { label: 'close' }, required: true }) }}></div>

{# HTML #}
<div id="one" data-options="{\"label\":\"close\"}" required></div>
```

### Filters

### `{{ attr|merge_html_attributes(default, required) }}`

Merge HTML attributes smartly, useful to define default and required attributes at the component level and allow users to add custom ones.

**Params**
- `attr` (`Object`): The user provided attributes
- `default` (`Object`): The default attributes
- `required` (`Object`): The required attributes

**Examples**

You can define default and required attributes in a component's template:

```twig
{#
/**
 * @file
 * component
 *
 * @param array $attr
 *   Custom attributes to apply to the root element.
 */
#}

{% set attributes = attr|default({}) %}
{% set default_attributes = { class: 'bar' } %}
{% set required_attributes = { data_component: 'Component' } %}

{# Merge all attributes #}
{% set final_attributes = attributes|merge_html_attributes(default_attributes, required_attributes)}

<div {{ html_attributes(final_attributes)) }}></div>
{# or #}
{% html_element 'div' with final_attributes %}
```

And then include your component with custom attributes:

```twig
{% include 'component.twig' with {
  attr: {
    class: 'mb-10',
    aria_hidden: 'true'
  }
} %}
```

### Tags

#### `{% html_element '<tag>' with attrs %}`

Render an HTML element with the given attributes. Useful to avoid setting dynamic HTML element tags with the `<{{ tag }}>...</{{ tag }}>` pattern.

**Params**
- `tag` (`String`): The name of the tag
- `attrs` (`Object`): An object describing the element's attribues

**Examples**
```twig
{# Twig #}
{% html_element 'h1' with { class: 'block' } %}
  Hello world
{% end_html_element %}

{# HTML #}
<h1 class="block">
  Hello world
</h1>
```
