<?php

use function Spatie\Snapshots\assertMatchesSnapshot;
use Studiometa\TwigToolkit\Helpers\Url;

test('The `Url` class should work with null given as $url', function () {
    expect(function () {
        Url::fromString(null);
    })->not->toThrow('type string, null given');

    expect((string)Url::fromString(null))->toBe('');
    expect((string)Url::fromString(null)->withHost('fqdn.tld'))->toBe('//fqdn.tld');
});


test('The `Url` class should not encode URL parameters', function () {
    expect((string)Url::fromString('http://localhost/?key=value&foo=1/2'))->toBe('http://localhost?key=value&foo=1/2');
});

test('The `Url::withQuery` method should replace the current query', function() {
    expect((string)Url::fromString('http://localhost/?key=value&foo=1/2')->withQuery('foo=bar'))->toBe('http://localhost?foo=bar');
});
