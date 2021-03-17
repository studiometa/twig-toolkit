export { RenderContext } from '@storybook/core';

export type TwigTemplate = (props: unknown) => Promise<string>;

export type StoryFnTwigReturnType = {
  component?: TwigTemplate,
  props?: unknown,
};

export interface IStorybookStory {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}
