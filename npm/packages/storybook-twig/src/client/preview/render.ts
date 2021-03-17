import { document, Node } from 'global';
import dedent from 'ts-dedent';
import { simulatePageLoad, simulateDOMContentLoaded } from '@storybook/client-api';
// eslint-disable-next-line import/no-unresolved
import { RenderContext, TwigTemplate } from './types.js';

const rootElement = document.getElementById('root');

/**
 * Render an element.
 * @param {string|Node} element
 * @param {RenderContext} { showMain, showError,forceRender, kind, name } [description]
 */
function renderElement(
  element: string | Node,
  {
    showMain, showError, forceRender, kind, name,
  }: RenderContext,
) {
  showMain();
  if (typeof element === 'string') {
    rootElement.innerHTML = element;
    simulatePageLoad(rootElement);
  } else if (element instanceof Node) {
    // Don't re-mount the element if it didn't change and neither did the story
    if (rootElement.firstChild === element && forceRender === true) {
      return;
    }

    rootElement.innerHTML = '';
    rootElement.appendChild(element);
    simulateDOMContentLoaded();
  } else {
    showError({
      title: `Expecting an HTML snippet or DOM node from the story: "${name}" of "${kind}".`,
      description: dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `,
    });
  }
}

/**
 * Render a story.
 * @param {RenderContext} context
 */
export default function renderMain(context: RenderContext): void {
  const {
    storyFn, parameters, showError, kind, name,
  } = context;
  const config = storyFn();

  if (!config || !(config.component || context.parameters.component)) {
    showError({
      // eslint-disable-next-line max-len
      title: `Expecting an object with a component property to be returned from the story: "${name}" of "${kind}".`,
      description: dedent`
        Did you forget to return the component from the story?
        Use "() => ({ component: MyComponent, props: { hello: 'world' } })" when defining the story.
      `,
    });

    return;
  }
  const template: TwigTemplate = config.component || parameters.component;
  template(config.props || {})
    .then((renderedElement) => renderElement(renderedElement, context))
    .catch((err) => {
      showError({
        title: err.name,
        description: err.toString(),
      });
    });
}
