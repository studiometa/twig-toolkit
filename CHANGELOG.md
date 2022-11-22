# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## v1.3.2 (2022-11-22)

### Fixed
- Fix query parameters being encoded ([cb3a820](https://github.com/studiometa/twig-toolkit/commit/cb3a820))

## v1.3.1 (2022-11-17)

### Fixed

- Fix `twig_toolkit_url` function throwing an error when used with a `null` value ([#16](https://github.com/studiometa/twig-toolkit/pull/16))

## v1.3.0 (2022-11-17)

### Added

- Add a `twig_toolkit_url` function to wrap a string in a `Spatie\Url\Url` instance from the [`spatie/url` package](https://github.com/spatie/url) ([#15](https://github.com/studiometa/twig-toolkit/pull/15))

## v1.2.2

## Fixed

- Fix `renderAttributes` to be compliant with PHP 8.1 ([#14](https://github.com/studiometa/twig-toolkit/pull/14))

## v1.2.1

## Fixed

- Do not render empty attributes ([#12](https://github.com/studiometa/twig-toolkit/pull/12))

## Changed

- Improve readability of rendered HTML ([#12](https://github.com/studiometa/twig-toolkit/pull/12))

## v1.2.0

## Added

- Add support for null parameters for the `merge_html_attributes` filter (4230c37, #10)
- Add a `merge_html_attributes` function based on the filter of the same name (fdddef2, #10)

## Fixed

- Fix warnings when using `html_classes` with an empty array ([#9](https://github.com/studiometa/twig-toolkit/pull/9))

## v1.1.0

## Added

- Add a `merge_html_attributes(default, required)` filter ([#7](https://github.com/studiometa/twig-toolkit/pull/7))
- Add a `html_styles()` function ([#3](https://github.com/studiometa/twig-toolkit/pull/3))
- Add test coverage

## v1.0.1

## Changed

- Rename the `class()` and `attributes()` Twig functions to `html_classes()` and `html_attributes()` (815cd6c)

## Fixed

- Fix a bug where falsy attributes were still added to the rendered attributes (e445a35)

## v1.0.0

## Added

- Add a `{% html_element 'div'%}` tag ([#1](https://github.com/studiometa/twig-toolkit/pull/1))
- Add a `{{ class() }}` function ([#1](https://github.com/studiometa/twig-toolkit/pull/1))
- Add a `{{ attributes() }}` function ([#1](https://github.com/studiometa/twig-toolkit/pull/1))
