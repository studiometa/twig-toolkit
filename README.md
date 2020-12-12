# Twig toolkit

> A set of useful extension and components for Twig.

## Installation

```bash
composer require studiometa/twig-toolkit
```

## Usage

Add the `Studiometa\Twig\Extension` to your Twig instance:

```php
$loader = new \Twig\Loader\FilesystemLoader();
$twig = new \Twig\Environment($loader);
$twig->addExtension(new \Studiometa\Twig\Extension());
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

#### `{{ class(<classes>) }}`

A function to manage classes more easily. 

**Params**
- `classes` (`String | Array | Object`) 

**Examples**
```twig
{# The following examples will render the same HTML #}
<div class="{{ class('foo bar') }}"></div>
<div class="{{ class(['foo', 'bar']) }}"></div>
<div class="{{ class({ foo: true, bar: true, baz: false }) }}"></div>
<div class="{{ class(['foo', { bar: true, baz: false }]) }}"></div>

{# HTML #}
<div class="foo bar"></div>
```


### Tags

#### `{% element '<tag>' with attrs %}`

Render an HTML element with the given attributes. Useful to avoid setting dynamic HTML element tags with the `<{{ tag }}>...</{{ tag }}>` pattern.

**Examples**
```twig
{# Twig #}
{% element 'h1' with { class: 'block' } %}
  Hello world
{% endelement %}

{# HTML #}
<h1 class="block">
  Hello world
</h1>
```
