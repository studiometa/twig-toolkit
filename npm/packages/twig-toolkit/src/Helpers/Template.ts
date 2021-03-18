/**
 * @link https://github.com/studiometa/wp-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

import { TwingLoaderFilesystem } from 'twing';
import { resolve } from 'path';
import findUp from 'find-up';

/**
 * Template helper class.
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
export class Template {
  /**
     * Add the component's path to the given Twig file system loader.
     * @param {TwingLoadeFilesystem} $loader The loader to extend.
     */
  public static addMetaNamespace(loader:TwingLoaderFilesystem):void {
    const path = findUp.sync('templates', { cwd: __dirname, type: 'directory' });
    if (path) {
      loader.addPath(path, 'meta');
    }
  }
}
