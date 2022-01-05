import { ExtendTagOptions } from 'twig';
import { AbstractTag } from './AbstractTag.js';

/**
 * EndHtmlElement class.
 */
export class EndHtmlElement extends AbstractTag implements ExtendTagOptions {
    type = 'end_html_element';

    regex = /^end_html_element/;

    next = [];

    open = false;
}
