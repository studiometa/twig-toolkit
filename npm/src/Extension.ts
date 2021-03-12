/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

import {
  TwingExtension, TwingLoaderFilesystem, TwingTokenParser, TwingFunction,
} from 'twing';
// eslint-disable-next-line import/no-unresolved
import { Html } from './Helpers/Html.js';
// eslint-disable-next-line import/no-unresolved
import { Template } from './Helpers/Template.js';
// eslint-disable-next-line import/no-unresolved
import { HtmlElementTokenParser } from './TokenParser/HtmlElementTokenParser.js';

export const ExtensionName = '@studiometa/twig-toolkit';

/**
 * Twig extension class.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
export class Extension extends TwingExtension {
  /**
   * Register the `@meta` namespace if the $loader parameter is specifier.
   *
   * @param {FilesystemLoader|null} $loader The Twig FilesystemLoader instance.
   */
  constructor(loader: TwingLoaderFilesystem = null) {
    super();
    if (loader) {
      Template.addMetaNamespace(loader);
    }
  }

  /**
   * Returns the token parser instances to add to the existing list.
   * @return {TwingTokenParser[]}
   */
  public getTokenParsers(): TwingTokenParser[] {
    return [ new HtmlElementTokenParser() ];
  }

  /**
   * Returns a list of functions to add to the existing list.
   * @return {TwingFunction[]}
   */
  public getFunctions(): TwingFunction[] {
    /* eslint-disable camelcase */
    return [
      /** @deprecated 1.0.1 Use the `html_classes` function instead. */
      new TwingFunction('class', Html.renderClass, [{ name: 'classes' }], { deprecated: true }),
      /** @deprecated 1.0.1 Use the `html_attributrs` function instead. */
      new TwingFunction('attributes', Html.renderAttributes, [], {
        is_safe: [ 'html' ],
        needs_template: true,
        deprecated: true,
      }),
      new TwingFunction('html_classes', Html.renderClass, [{ name: 'classes' }]),
      new TwingFunction('html_styles', Html.renderStyleAttribute, []),
      new TwingFunction(
        'html_attributes',
        Html.renderAttributes,
        [{ name: 'attributes' }],
        {
          is_safe: [ 'html' ],
          needs_template: true,
        },
      ),
    ];
    /* eslint-enable camelcase */
  }

  /**
   * Get the Html helper class.
   * @return {Html}
   */
  public get Html():Html {
    return Html;
  }
}
