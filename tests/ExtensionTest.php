<?php

use function Spatie\Snapshots\assertMatchesSnapshot;

beforeEach(function () {
    $loader = new \Twig\Loader\ArrayLoader(['index' => 'index']);
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    test()->loader = $loader;
    test()->twig = $twig;
});

test('The extension should add the `@meta` namespace when given a `$loader`.', function () {
    $loader = new \Twig\Loader\FilesystemLoader();
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension($loader));
    expect($loader->getNamespaces())->toEqual(['meta']);
});

test('The extension should *not* add the `@meta` namespace when *not* given a `$loader`.', function () {
    $loader = new \Twig\Loader\FilesystemLoader();
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    expect($loader->getNamespaces())->not->toEqual(['meta']);
});

test('The extension should add the `merge_html_attributes` filter.', function () {
    $tpl = <<<EOD
    {{ html_attributes({ id: 'foo' }|merge_html_attributes({ id: 'bar' }, { id: 'baz' })) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="baz"');
});

test('The `merge_html_attributes` filter can be used as a function.', function () {
    $tpl = <<<EOD
    {{ html_attributes(merge_html_attributes({ id: 'foo' }, { id: 'bar' }, { id: 'baz' })) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="baz"');
});

test('The `merge_html_attributes` filter can be used with one or multiple undefined parameters.', function () {
    $tpl = <<<EOD
    {{ html_attributes(attr|merge_html_attributes({ id: 'bar' }, { id: 'baz' })) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="baz"');

    $tpl = <<<EOD
    {{ html_attributes(merge_html_attributes(attr, { id: 'bar' }, { id: 'baz' })) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="baz"');

    $tpl = <<<EOD
    {{ html_attributes(merge_html_attributes(attr, { id: 'bar' }, required_attr)) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="bar"');
});

test('The extension should add a `twig_toolkit_url` function', function () {
    $tpl = <<<EOD
    {{ twig_toolkit_url('/foo/bar').withQueryParameter('key', 'value') }}
    EOD;

    test()->loader->setTemplate('index', $tpl);
    assertMatchesSnapshot(expect(test()->twig->render('index')));
});

test('The `twig_toolkit_url` function should not encode URL parameters', function () {
    $tpl = <<<EOD
    {{ twig_toolkit_url('/foo/bar').withQueryParameter('twic', 'v1/output=preview') }}
    EOD;

    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toBe('/foo/bar?twic=v1/output=preview');
});
