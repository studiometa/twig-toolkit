import { TwingEnvironment, TwingLoaderArray } from 'twing';
// eslint-disable-next-line import/no-unresolved
import { Extension } from '../../src/Extension.js';

let loader: TwingLoaderArray;
let twig: TwingEnvironment;

beforeEach(() => {
  loader = new TwingLoaderArray({ index: 'index' });
  twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(), '@studiometa/twig-toolkit');
});

describe('The {{ html_classes() }} function', () => {
  it('should accept a string parameter.', async () => {
    const tpl = '{{ html_classes("block m-4") }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('block m-4');
  });

  it('should accept an array of string parameter.', async () => {
    const tpl = '{{ html_classes(["block", "m-4"]) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('block m-4');
  });

  it('should accept an object parameter', async () => {
    const tpl = '{{ html_classes({ block: true, hidden: null, relative: false }) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('block');
  });

  it('should work with dynamic test values.', async () => {
    const tpl = `
      {% set is_block = true %}
      {{ html_classes({ block: is_block, hidden: null, relative: false }) }}
    `;
    loader.setTemplate('index', tpl);
    expect((await twig.render('index')).trim()).toBe('block');
  });

  it('should work with an array of string and object parameter.', async () => {
    const tpl = '{{ html_classes(["block", { foo: true, bar: false, }, "m-4"]) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('block foo m-4');
  });
});

describe('The `{{ html_styles() }}` Twig function', () => {
  it('should render inline CSS.', async () => {
    // eslint-disable-next-line max-len
    const tpl = '{{ html_styles({ display: "none", marginRight: "", overflow: 0 != 0, margin_top: "10px" }) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe('display: none; margin-top: 10px;');
  });
});

describe('The `{{ html_attributes() }}` Twig function', () => {
  it('should render attributes', async () => {
    // eslint-disable-next-line max-len
    const tpl = '{{ html_attributes({ id: "foo", class: ["block", { foo: true, bar: false }], required: true, aria_hidden: "true" }) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe(
      ' id="foo" class="block&#x20;foo" required aria-hidden="true"',
    );
  });

  it('should not render falsy attributes', async () => {
    const tpl = '{{ html_attributes({ checked: true, autofocus: true, selected: false }) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe(' checked autofocus');
  });

  it('should encode as JSON complex attributes', async () => {
    const tpl = '{{ html_attributes({ dataOptions: { log: true } }) }}';
    loader.setTemplate('index', tpl);
    expect(await twig.render('index')).toBe(
      ' data-options="&#x7B;&quot;log&quot;&#x3A;true&#x7D;"',
    );
  });
});
