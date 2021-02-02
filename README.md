# Twig toolkit

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

If you pass a `Twig\Loader\FilesystemLoader` instance to the extension constructor, a `meta` namespace pointing to the `templates/` folder of this package will be added. You will then be able to include components from this package with the `@meta` alias:

```twig
{% include '@meta/components/signature' %}
```

## Reference

### Namespace

When provided with a `\Twig\Loader\FilesystemLoader` parameter, the extension will register a `@meta` namespace referring to the `templates` folder of this package. You will be able to import file in this folder directly from you project's templates:

```twig
{% include '@meta/components/signature.twig' %}
```

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
