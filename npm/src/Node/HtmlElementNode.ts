/**
 * @link https://github.com/studiometa/twig-toolkit
 * @copyright Studio Meta
 * @license https://github.com/studiometa/twig-toolkit/blob/master/LICENSE
 */

import { TwingCompiler, TwingNode, TwingNodeCaptureInterface } from 'twing';
// eslint-disable-next-line import/no-unresolved
import { ExtensionName } from '../Extension.js';

/**
 * Class ElementNode
 *
 * @author Studio Meta <agence@studiometa.fr>
 * @since 1.0.0
 */
export class HtmlElementNode extends TwingNode implements TwingNodeCaptureInterface {
  TwingNodeCaptureInterfaceImpl;

  /**
   * @inheritdoc
   */
  public compile(compiler: TwingCompiler): void {
    if (this.getAttribute('capture')) {
      compiler.write('outputBuffer.start();');

      if (this.getNode('body').getTemplateLine() > this.getTemplateLine()) {
        compiler.write('outputBuffer.echo(`\n`);\n');
      }

      compiler.subcompile(this.getNode('body'));
      compiler.write('const tmp = outputBuffer.getAndClean();');
      compiler.raw('\n');
      compiler.write(
        'const body = tmp ? new this.Markup(tmp, this.environment.getCharset()) : "";',
      );
      compiler.raw('\n');
    } else {
      compiler.write('const body = "";').raw('\n');
    }

    // Element
    compiler
      //  @todo import Html class.
      .write(`const { Html } = this.environment.getExtension('${ExtensionName}');`)
      .raw('\n')
      .write('const dom = await Html.renderTag(this, ')
      .subcompile(this.getNode('element'))
      .raw(', ');

    if (this.hasNode('attrs')) {
      compiler.subcompile(this.getNode('attrs'));
    } else {
      compiler.raw(' []');
    }

    compiler.raw(', body);').raw('\n');
    compiler.write('outputBuffer.echo(dom);\n');
  }
}
