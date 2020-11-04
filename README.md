# Twig toolkit

> A set of useful extension and components for Twig.

## Installation

```bash
composer require studiometa/twig-toolkit
```

## Usage

Use the `PathHelper` class to add the components' folder to your Twig environment.

```php
use StudioMeta\Twig\PathHelper;
use Twig\Loader\FilesystemLoader

$fs = new FilesystemLoader(...);
PathHelper::addTemplatePath($fs);
```

You will then be able to include components from this package with the `@meta` alias:

```twig
{% include '@meta/components/signature' %}
```
