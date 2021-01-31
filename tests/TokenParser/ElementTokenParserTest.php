<?php

beforeEach(function () {
    $loader = new \Twig\Loader\ArrayLoader(['index' => 'index']);
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    $this->loader = $loader;
    $this->twig = $twig;
});

test('The `{% html_element %}` Twig tag should render without attributes.', function () {
    $tpl = <<<EOD
    {% html_element 'p' %}Hello world!{% end_html_element %}
    EOD;
    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe('<p>Hello world!</p>');
});

test('The `{% html_element %}` Twig tag should render with attributes.', function () {
    $tpl = <<<EOD
    {% set bar = "bar" %}
    {% html_element "p" with { class: "foo", id: "baz" } %}
        {{ bar }}
    {% end_html_element %}
    EOD;

    $html = <<<EOD
    <p class="foo" id="baz">
        bar
    </p>
    EOD;

    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe($html);
});

test('The `{% html_element %}` Twig tag should be able to render single elements.', function () {
    $tpl = <<<EOD
    {% set tag = 'br' %}
    {% html_element tag with { class: "foo", id: "baz" } %}{% end_html_element %}
    EOD;

    $html = <<<EOD
    <br class="foo" id="baz" />
    EOD;

    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe($html);
});

test('The `{% html_element %}` Twig tag should be able to render dynamic elements.', function () {
    $tpl = <<<EOD
    {% set tag = 'p' %}
    {% html_element tag %}
        Hello world
    {% end_html_element %}
    EOD;

    $html = <<<EOD
    <p>
        Hello world
    </p>
    EOD;

    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe($html);
});

test('The `{% html_element %}` Twig tag should be able to render complex attributes.', function () {
    $tpl = <<<EOD
    {% html_element 'div' with { aria_hidden: 'true', dataOptions: { log: true } } %}
        Hello world
    {% end_html_element %}
    EOD;

    $html = <<<EOD
    <div aria-hidden="true" data-options="&#x7B;&quot;log&quot;&#x3A;true&#x7D;">
        Hello world
    </div>
    EOD;

    $this->loader->setTemplate('index', $tpl);
    expect($this->twig->render('index'))->toBe($html);
});