<?php

use function Spatie\Snapshots\assertMatchesSnapshot;

beforeEach(function () {
    $loader = new \Twig\Loader\ArrayLoader(['index' => 'index']);
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    test()->loader = $loader;
    test()->twig = $twig;
});

test('The `{{ html_classes() }}` Twig function should accept a string parameter.', function () {
    $tpl = <<<EOD
    {{ html_classes('block m-4') }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_classes() }}` Twig function should accept an array of string parameter.', function () {
    $tpl = <<<EOD
    {{ html_classes(['block', 'm-4']) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_classes() }}` Twig function should accept an empty array.', function () {
    $tpl = <<<EOD
    {{ html_classes([]) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_classes() }}` Twig function should accept an object parameter', function () {
    $tpl = <<<EOD
    {{ html_classes({ block: true, hidden: null, relative: false }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_classes() }}` Twig function should work with dynamic test values.', function () {
    $tpl = <<<EOD
    {% set is_block = true %}
    {{ html_classes({ block: is_block, relative: not is_block }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_classes() }}` Twig function should work with an array of string and object parameter.', function () {
    $tpl = <<<EOD
    {{ html_classes(['block', { foo: true, bar: false, }, 'm-4']) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_styles() }}` Twig function should render inline CSS.', function () {
    $tpl = <<<EOD
    {{ html_styles({ display: 'none', marginRight: '', overflow: 0 != 0, margin_top: '10px' }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_styles() }}` Twig function should render inline CSS with CSS custom properties.', function () {
    $tpl = <<<EOD
    {{ html_styles({ '--var': 'none', margin_right: '10px' }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_attributes() }}` Twig function should render attributes', function () {
    $tpl = <<<EOD
    {{ html_attributes({
        id: 'foo',
        class: ['block m:hidden', { foo: true, bar: false }],
        required: true,
        aria_hidden: 'true',
        style: { display: 'none' }
    }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_attributes() }}` Twig function should not render falsy attributes', function () {
    $tpl = <<<EOD
    {{ html_attributes({ checked: true, autofocus: true, selected: false }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_attributes() }}` Twig function should not render empty attributes', function () {
    $tpl = <<<EOD
    {{ html_attributes({ empty_string: '', nullish: null, empty_array: [] }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ html_attributes() }}` Twig function should prevent XSS attacks', function () {
    $tpl = <<<EOD
    {{ html_attributes({ class: '" onclick="alert(true)' }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ attr|merge_html_attributes() }}` Twig filter should merge default attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {{ html_attributes(
        attributes|merge_html_attributes({
            id: 'bar',
            class: 'bg-red'
        })
    ) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));

    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {{ html_attributes(
        attributes|merge_html_attributes({
            id: 'bar',
        })
    ) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));

     $tpl = <<<EOD
    {% set attributes = { data_component: 'foo' } %}
    {{ html_attributes(
        attributes|merge_html_attributes({
            id: 'bar',
            class: 'default'
        })
    ) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ attr|merge_html_attributes() }}` Twig filter should merge required attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: ['block', { foo: true, bar: false }] } %}
    {{ html_attributes(
        attributes|merge_html_attributes({}, {
            id: 'bar',
            class: 'my-component'
        })
    ) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ attr|merge_html_attributes() }}` Twig filter should merge required attributes with named argument', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: ['block', { foo: true, bar: false }] } %}
    {{ html_attributes(
        attributes|merge_html_attributes(required={
            id: 'bar',
            class: 'my-component'
        })
    ) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ attr|merge_html_attributes() }}` Twig filter should merge default and required attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {% set default_attributes = { id: 'bar', class: 'bg-red' } %}
    {% set required_attributes = { id: 'baz', class: 'my-component' } %}
    {{ html_attributes(attributes|merge_html_attributes(default_attributes, required_attributes)) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});

test('The `{{ attr|merge_html_attributes() }}` Twig filter should merge default and required attributes with named arguments', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {% set default_attributes = { id: 'bar', class: 'bg-red' } %}
    {% set required_attributes = { id: 'baz', class: 'my-component' } %}
    {{ html_attributes(attributes|merge_html_attributes(required=required_attributes, default=default_attributes)) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(test()->twig->render('index'));
});
