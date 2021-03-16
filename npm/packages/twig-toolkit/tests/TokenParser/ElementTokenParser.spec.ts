import { TwingLoaderArray, TwingEnvironment, TwingExtension } from 'twing';
// eslint-disable-next-line import/no-unresolved
import { Extension, ExtensionName } from '../../src/Extension.js';

let loader: TwingLoaderArray;
let twig: TwingEnvironment;
let extension: TwingExtension;

beforeEach(() => {
  loader = new TwingLoaderArray({ index: 'index' });
  twig = new TwingEnvironment(loader, { debug: true });
  extension = new Extension();
  twig.addExtension(extension, ExtensionName);
});

describe('The `{% html_element %}` Twig tag', () => {
  it('should render without attributes.', async () => {
    const tpl = '{% html_element \'p\' %}Hello world!{% end_html_element %}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('<p>Hello world!</p>');
  });

  it('should render with attributes.', async () => {
    const tpl = `
    {% set bar = "bar" %}
    {% html_element "p" with { class: "foo", id: "baz" } %}
        {{ bar }}
    {% end_html_element %}
    `;

    const html = `
    <p class="foo" id="baz">
        bar
    </p>
    `;

    loader.setTemplate('index', tpl);
    expect((await twig.render('index')).trim()).toEqual(html.trim());
  });

  it('should be able to render single elements.', async () => {
    const tpl = `
    {% set tag = 'br' %}
    {% html_element tag with { class: "foo", id: "baz" } %}{% end_html_element %}
    `;

    const html = `
    <br class="foo" id="baz" />
    `;

    loader.setTemplate('index', tpl);
    expect((await twig.render('index')).trim()).toBe(html.trim());
  });

  it('should be able to render dynamic elements.', async () => {
    const tpl = `
    {% set tag = 'p' %}
    {% html_element tag %}
        Hello world
    {% end_html_element %}
    `;

    const html = `
    <p>
        Hello world
    </p>
    `;

    loader.setTemplate('index', tpl);
    expect((await twig.render('index')).trim()).toBe(html.trim());
  });

  it('should be able to render complex attributes.', async () => {
    const tpl = `
    {% html_element 'div' with { aria_hidden: 'true', dataOptions: { log: true } } %}
        Hello world
    {% end_html_element %}
    `;

    const html = `
    <div aria-hidden="true" data-options="&#x7B;&quot;log&quot;&#x3A;true&#x7D;">
        Hello world
    </div>
    `;

    loader.setTemplate('index', tpl);
    expect((await twig.render('index')).trim()).toBe(html.trim());
  });
});
