/* eslint-disable prefer-destructuring */
import { start } from '@storybook/core/client.js';
import { ClientStoryApi, Loadable } from '@storybook/addons';

/* eslint-disable import/no-unresolved */
import './globals.js';
import render from './render.js';
import { StoryFnTwigReturnType, IStorybookSection } from './types.js';
/* eslint-enable import/no-unresolved */

const framework = 'twig';

interface ClientApi extends ClientStoryApi<StoryFnTwigReturnType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAddon(addon: any): void;
  configure(loader: Loadable, module: NodeModule): void;
  getStorybook(): IStorybookSection[];
  clearDecorators(): void;
  forceReRender(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: () => any; // todo add type
}

const api = start(render);

// eslint-disable-next-line max-len
export const storiesOf: ClientApi['storiesOf'] = (kind, m) => (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
  framework,
});

export const configure: ClientApi['configure'] = (...args) => api.configure(framework, ...args);
export const addDecorator: ClientApi['addDecorator'] = api.clientApi
  .addDecorator as ClientApi['addDecorator'];
export const addParameters: ClientApi['addParameters'] = api.clientApi
  .addParameters as ClientApi['addParameters'];
export const clearDecorators: ClientApi['clearDecorators'] = api.clientApi.clearDecorators;
export const setAddon: ClientApi['setAddon'] = api.clientApi.setAddon;
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const getStorybook: ClientApi['getStorybook'] = api.clientApi.getStorybook;
export const raw: ClientApi['raw'] = api.clientApi.raw;
