# studiometa/twig-toolkit

[![Packagist Version](https://img.shields.io/github/v/release/studiometa/twig-toolkit?style=flat&colorB=3e63dd&colorA=414853&label=packagist)](https://packagist.org/packages/studiometa/twig-toolkit)
[![Downloads](https://img.shields.io/packagist/dm/studiometa/twig-toolkit?style=flat&colorB=3e63dd&colorA=414853)](https://packagist.org/packages/studiometa/twig-toolkit)
[![Dependency Status](https://img.shields.io/librariesio/github/studiometa/twig-toolkit?style=flat&colorB=3e63dd&colorA=414853)](https://packagist.org/packages/studiometa/twig-toolkit)
![Codecov](https://img.shields.io/codecov/c/github/studiometa/twig-toolkit?style=flat&colorB=3e63dd&colorA=414853)
[![License MIT](https://img.shields.io/packagist/l/studiometa/twig-toolkit?style=flat&colorB=3e63dd&colorA=414853)](https://github.com/studiometa/twig-toolkit/blob/master/LICENSE)

> A set of useful extension and components for Twig.

## Installation

```bash
composer require studiometa/twig-toolkit
```

## Usage

Add the `Studiometa\TwigToolkit\Extension` to your Twig instance:

```php
$loader = new \Twig\Loader\FilesystemLoader();
$twig = new \Twig\Environment($loader);
$twig->addExtension(new \Studiometa\TwigToolkit\Extension());
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

#### `{{ merge_html_attributes(attr, default_attr, required_attr) }}`

Merge HTML attributes smartly, useful to define default and required attributes at the component level and allow users to add custom ones.

This filter can also be used as a function.

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

{% set default_attributes = { class: 'bar' } %}
{% set required_attributes = { data_component: 'Component' } %}

{# Merge all attributes #}
{% set attributes = merge_html_attributes(attr, default_attributes, required_attributes)}

<div {{ html_attributes(attributes) }}></div>
{# or #}
{% html_element 'div' with attributes %}
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

You can take advantage of [named arguments](http://twig.symfony.com/doc/3.x/templates.html#named-arguments) to avoid passing a value for the default attributes argument:

```twig
{% set required_attributes = { id: 'block' } %}
{% set merged_attributes = merge_html_attributes(attr, required=required_attribute) %}
```

#### `{{ twig_toolkit_url(string) }}`

Wrapper for the `Spatie\Url\Url` class to easily manipulate URLs. See the [`spatie/url` documentation](https://github.com/spatie/url) for details on its API.

**Params**

- `url` (`string`): The URL to parse for manipulation

**Examples**

```twig
{# Change host #}
{% set url = twig_toolkit_url(url).withHost('cdn.fqdn.com') %}

{# Change/add query parameters #}
{% set url = twig_toolkit_url(url).withQueryParameter('key', 'value') %}
```

### Filters

#### `{{ object|twig_toolkit_without('key', 'other_key') }}`

Returns the given hash without the specified keys.

**Params**

- `value` (`array`): the hash to remove the key from
- `...keys` (`string[]`): the keys to remove

**Examples**

```twig
{# Twig #}
{{ { foo: 1, bar: 2, baz: 3 }|twig_toolkit_without('bar')|keys|join(', ') }}

{# HTML #}
foo, baz
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
