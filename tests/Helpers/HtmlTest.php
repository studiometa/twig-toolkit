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
    expect(test()->twig->render('index'))->toBe('block m-4');
});

test('The `{{ html_classes() }}` Twig function should accept an array of string parameter.', function () {
    $tpl = <<<EOD
    {{ html_classes(['block', 'm-4']) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toBe('block m-4');
});

test('The `{{ html_classes() }}` Twig function should accept an object parameter', function () {
    $tpl = <<<EOD
    {{ html_classes({ block: true, hidden: null, relative: false }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe('block');
});

test('The `{{ html_classes() }}` Twig function should work with dynamic test values.', function () {
    $tpl = <<<EOD
    {% set is_block = true %}
    {{ html_classes({ block: is_block, relative: not is_block }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe('block');
});

test('The `{{ html_classes() }}` Twig function should work with an array of string and object parameter.', function () {
    $tpl = <<<EOD
    {{ html_classes(['block', { foo: true, bar: false, }, 'm-4']) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe('block foo m-4');
});

test('The `{{ html_styles() }}` Twig function should render inline CSS.', function () {
    $tpl = <<<EOD
    {{ html_styles({ display: 'none', marginRight: '', overflow: 0 != 0, margin_top: '10px' }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe('display: none; margin-top: 10px;');
});

test('The `{{ html_attributes() }}` Twig function should render attributes', function () {
    $tpl = <<<EOD
    {{ html_attributes({ id: 'foo', class: ['block', { foo: true, bar: false }], required: true, aria_hidden: 'true' }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe(' id="foo" class="block foo" required aria-hidden="true"');
});

test('The `{{ html_attributes() }}` Twig function should not render falsy attributes', function () {
    $tpl = <<<EOD
    {{ html_attributes({ checked: true, autofocus: true, selected: false }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe(' checked autofocus');
});

test('The `{{ html_attributes() }}` Twig function should merge default attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {{ html_attributes(attributes, {
      default: {
        id: 'bar',
        class: 'bg-red'
      }
    }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe(' id="foo" class="bg-red block"');
});

test('The `{{ html_attributes() }}` Twig function should merge required attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: ['block', { foo: true, bar: false }] } %}
    {{ html_attributes(attributes, {
      required: {
        id: 'bar',
        class: 'my-component'
      }
    }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe(' id="bar" class="block foo my-component"');
});

test('The `{{ html_attributes() }}` Twig function should merge default and required attributes', function () {
    $tpl = <<<EOD
    {% set attributes = { id: 'foo', class: 'block' } %}
    {{ html_attributes(attributes, {
      default: {
        id: 'bar',
        class: 'bg-red'
      },
      required: {
        id: 'bar',
        class: 'my-component'
      }
    }) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    $result = html_entity_decode(test()->twig->render('index'));
    expect($result)->toBe(' id="bar" class="bg-red block my-component"');
});
