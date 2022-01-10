<?php

use function Spatie\Snapshots\assertMatchesSnapshot;

beforeEach(function () {
    $loader = new \Twig\Loader\ArrayLoader(['index' => 'index']);
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    test()->loader = $loader;
    test()->twig = $twig;
});

test('The extension should add the `merge_html_attributes` filter.', function () {
    $tpl = <<<EOD
    {{ html_attributes({ id: 'foo' }|merge_html_attributes({ id: 'bar' }, { id: 'baz' })) }}
    EOD;
    test()->loader->setTemplate('index', $tpl);
    expect(test()->twig->render('index'))->toEqual(' id="baz"');
});
