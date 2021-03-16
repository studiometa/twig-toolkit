export { RenderContext } from '@storybook/core';

export type StoryFnTwigReturnType = {
  component?: (props: unknown) => Promise<string>,
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
