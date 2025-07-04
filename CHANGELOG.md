# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## v2.1.1 (2025-06-19)

### Changed

- Do not render empty `class` or `style` attribute ([#38](https://github.com/studiometa/twig-toolkit/pull/38), [65e5693](https://github.com/studiometa/twig-toolkit/commit/65e5693))

## v2.1.0 (2025-06-17)

### Added

- Add a `twig_toolkit_without` filter ([#36](https://github.com/studiometa/twig-toolkit/pull/36), [b2842a2](https://github.com/studiometa/twig-toolkit/commit/b2842a2))

### Fixed

- Fix Twig 3.21 deprecations ([#35](https://github.com/studiometa/twig-toolkit/pull/35), [6687590](https://github.com/studiometa/twig-toolkit/commit/6687590))

## v2.0.1 (2025-01-27)

### Changed

- Prefer the `html` escape mode to the `html_attr` ([#33](https://github.com/studiometa/twig-toolkit/pull/33), [c093446](https://github.com/studiometa/twig-toolkit/commit/c093446))
- Update composer.lock file ([15c83b4](https://github.com/studiometa/twig-toolkit/commit/15c83b4))

## v2.0.0 (2025-01-20)

### Changed

- ⚠️ Update minimum Twig version to 3.0 ([#30](https://github.com/studiometa/twig-toolkit/pull/30))
- ⚠️ Update minimum PHP version to 8.1 ([#30](https://github.com/studiometa/twig-toolkit/pull/30), [6134a42](https://github.com/studiometa/twig-toolkit/commit/6134a42))
- Update spatie/url to ^2.4 ([ffcf361](https://github.com/studiometa/twig-toolkit/commit/ffcf361))

### Removed

- ⚠️ Removes the `merge_html_attributes()` Twig filter, use the `merge_html_attributes` function instead ([#31](https://github.com/studiometa/twig-toolkit/pull/31))
- ⚠️ Removes the `class` Twig function, use the `html_classes` function instead ([#31](https://github.com/studiometa/twig-toolkit/pull/31))
- ⚠️ Removes the `attributes` Twig function, use the `html_attributes` function instead ([#31](https://github.com/studiometa/twig-toolkit/pull/31))
- ⚠️ Removes the `@meta` alias without replacement ([#31](https://github.com/studiometa/twig-toolkit/pull/31))

## v1.3.7 (2024-09-18)

### Fixed

- Fix attribute rendering by omitting `null` or `false` attributes instead of empty attributes ([#26](https://github.com/studiometa/twig-toolkit/pull/26))

## v1.3.6 (2024-04-18)

### Fixed

- Fix the `html_element` tag with Twig 3.9.0 ([#23](https://github.com/studiometa/twig-toolkit/pull/23))

## v1.3.5 (2023-07-13)

### Fixed

- Fix handling of CSS custom properties by the `html_styles` function ([2ce4f36](https://github.com/studiometa/twig-toolkit/commit/2ce4f36))

## v1.3.4 (2022-12-06)

### Fixed

- Fixed mismatch of version number ([41693ef](https://github.com/studiometa/twig-toolkit/commit/41693ef))

## v1.3.3 (2022-12-06)

### Fixed

- Fix parsing of URLs with Browsersync ([54b0833](https://github.com/studiometa/twig-toolkit/commit/54b0833))

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
