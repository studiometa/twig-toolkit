<?php

test('The extension should add the `@meta` namespace when given a `$loader`.', function() {
    $loader = new \Twig\Loader\FilesystemLoader();
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension($loader));
    expect($loader->getNamespaces())->toEqual(['meta']);
});

test('The extension should *not* add the `@meta` namespace when *not* given a `$loader`.', function() {
    $loader = new \Twig\Loader\FilesystemLoader();
    $twig = new \Twig\Environment($loader);
    $twig->addExtension(new \Studiometa\TwigToolkit\Extension());
    expect($loader->getNamespaces())->not->toEqual(['meta']);
});
