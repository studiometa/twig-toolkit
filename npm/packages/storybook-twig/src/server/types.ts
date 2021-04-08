// eslint-disable-next-line import/extensions
import { Options } from '@storybook/core-common';

/**
 * The internal options object, used by Storybook frameworks and addons.
 */
export interface StorybookOptions extends Options {
  twigOptions?: {
    environmentModulePath?: string;
  };
}
