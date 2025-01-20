<?php
/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

namespace Studiometa\TwigToolkit\Helpers;

use Spatie\Url\Url as UrlCore;

/**
 * Url manipulation helper.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.3.1
 */
class Url extends UrlCore
{
    /**
     * {@inheritdoc}
     */
    public function __construct()
    {
        parent::__construct();
        $this->query = new QueryParameterBag();
    }

    public static function fromString(?string $url, ?array $allowedSchemes = null): static
    {
        $url = parent::fromString($url ?? '', $allowedSchemes);

        if (empty((string)$url)) {
            return $url;
        }

        $parts = parse_url($url);

        if (is_array($parts)) {
            $url->query = QueryParameterBag::fromString($parts['query'] ?? '');
        }

        return $url;
    }

    public function withQuery($query):static
    {
        $url = clone $this;

        $url->query = QueryParameterBag::fromString($query);

        return $url;
    }
}
