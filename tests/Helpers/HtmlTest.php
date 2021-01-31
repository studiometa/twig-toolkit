<?php

beforeEach(function () {
    $loader = new \Twig\Loader\ArrayLoader(['index' => 'index']);
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    $this->loader = $loader;
    $this->twig = $twig;
});

test('The `{{ class() }}` Twig function should accept a string parameter.', function () {
    $tpl = <<<EOD
    {{ class('block m-4') }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('block m-4');
});

test('The `{{ class() }}` Twig function should accept an array of string parameter.', function () {
    $tpl = <<<EOD
    {{ class(['block', 'm-4']) }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('block m-4');
});

test('The `{{ class() }}` Twig function should accept an object parameter', function () {
    $tpl = <<<EOD
    {{ class({ block: true, hidden: null, relative: false }) }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('block');
});

test('The `{{ class() }}` Twig function should work with dynamic test values.', function () {
    $tpl = <<<EOD
    {% set is_block = true %}
    {{ class({ block: is_block, relative: not is_block }) }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('block');
});

test('The `{{ class() }}` Twig function should work with an array of string and object parameter.', function () {
    $tpl = <<<EOD
    {{ class(['block', { foo: true, bar: false, }, 'm-4']) }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('block foo m-4');
});

test('The `{{ attributes() }}` Twig function should render attributes', function() {
    $tpl = <<<EOD
    {{ attributes({ id: 'foo', class: ['block', { foo: true, bar: false }], required: true, aria_hidden: 'true' }) }}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe(' id="foo" class="block&#x20;foo" required aria-hidden="true"');
});
