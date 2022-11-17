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
