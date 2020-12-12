<?php

beforeEach(function () {
    $loader = new \Twig\Loader\FilesystemLoader();
    $twig = new \Twig\Environment($loader);
    $this->loader = $loader;
    $this->twig = $twig;
});

test('The `Template::addMetaNamespace` method should add the `@meta` Twig namespace.', function () {
    \Studiometa\Twig\Helpers\Template::addMetaNamespace($this->loader);
    expect($this->loader->getNamespaces())->toEqual(['meta']);
});

test('The `@meta` Twig namespace should resolve to the `templates/` folder.', function () {
    \Studiometa\Twig\Helpers\Template::addMetaNamespace($this->loader);
    $packageRoot = dirname(dirname(__DIR__));
    expect($this->loader->getPaths('meta'))->toEqual([$packageRoot . '/src/Helpers/../../templates']);
});
