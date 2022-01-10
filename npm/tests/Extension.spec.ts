import { describe, it, expect, beforeEach } from 'vitest';
import Twig from 'twig';
import { extension } from '../src/Extension.js';

const { twig, extend } = Twig;

beforeEach(() => {
  extend(extension);
});

describe('The {{ html_classes() }} function', () => {
  it('should accept a string parameter.', async () => {
    const tpl = twig({ data: '{{ html_classes("block m-4") }}' });
    expect(tpl.render().trim()).toBe('block&#x20;m-4');
  });

  it('should accept an array of string parameter.', async () => {
    const tpl = twig({ data: '{{ html_classes(["block", "m-4"]) }}' });
    expect(tpl.render().trim()).toBe('block m-4');
  });

  it('should accept an object parameter', async () => {
    const tpl = twig({
      data: '{{ html_classes({ block: true, hidden: null, relative: false }) }}',
    });
    expect(tpl.render().trim()).toBe('block');
  });

  it('should work with dynamic test values.', async () => {
    const tpl = twig({
      data: `
      {% set is_block = true %}
      {{ html_classes({ block: is_block, hidden: null, relative: false }) }}
    `,
    });
    expect(tpl.render().trim()).toBe('block');
  });

  it('should work with an array of string and object parameter.', async () => {
    const tpl = twig({
      data: '{{ html_classes(["block", { foo: true, bar: false, }, "m-4"]) }}',
    });
    expect(tpl.render().trim()).toBe('block foo m-4');
  });
});

describe('The `{{ html_styles() }}` Twig function', () => {
  it('should render inline CSS.', async () => {
    const tpl = twig({
      data: '{{ html_styles({ display: "none", marginRight: "", overflow: 0 != 0, margin_top: "10px" }) }}',
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });
});

describe('The `{{ html_attributes() }}` Twig function', () => {
  it('should render attributes', async () => {
    const tpl = twig({
      data: '{{ html_attributes({ id: "foo", class: ["block", { foo: true, bar: false }], required: true, aria_hidden: "true" }) }}',
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });

  it('should not render falsy attributes', async () => {
    const tpl = twig({
      data: '{{ html_attributes({ checked: true, autofocus: true, selected: false }) }}',
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });

  it('should encode as JSON complex attributes', async () => {
    const tpl = twig({
      data: '{{ html_attributes({ dataOptions: { log: true } }) }}',
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });
});

describe('The `{{ attr|merge_html_attributes() }}` Twig filter', () => {
  it('should merge default attributes', () => {
    let tpl = twig({
      data: `
        {% set attributes = { id: 'foo', class: 'block' } %}
        {{ html_attributes(
            attributes|merge_html_attributes({
                id: 'bar',
                class: 'bg-red'
            })
        ) }}
      `,
    });
    expect(tpl.render().trim()).toMatchSnapshot();

    tpl = twig({
      data: `
        {% set attributes = { id: 'foo', class: 'block' } %}
        {{ html_attributes(
            attributes|merge_html_attributes({
                id: 'bar',
            })
        ) }}
    `,
    });
    expect(tpl.render().trim()).toMatchSnapshot();

    tpl = twig({
      data: `
        {% set attributes = { data_component: 'foo' } %}
        {{ html_attributes(
            attributes|merge_html_attributes({
                id: 'bar',
                class: 'default'
            })
        ) }}
      `,
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });

  it('should merge required attributes', () => {
    const tpl = twig({
      data: `
        {% set attributes = { id: 'foo', class: ['block', { foo: true, bar: false }] } %}
        {{ html_attributes(
            attributes|merge_html_attributes({}, {
                id: 'bar',
                class: 'my-component'
            })
        ) }}
      `,
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });

  it('should merge default and required attributes', () => {
    const tpl = twig({
      data: `
        {% set attributes = { id: 'foo', class: 'block' } %}
        {% set default_attributes = { id: 'bar', class: 'bg-red' } %}
        {% set required_attributes = { id: 'baz', class: 'my-component' } %}
        {{ html_attributes(attributes|merge_html_attributes(default_attributes, required_attributes)) }}
      `,
    });
    expect(tpl.render().trim()).toMatchSnapshot();
  });
});
