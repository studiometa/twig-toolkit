import { sync } from 'read-pkg-up';
import { LoadOptions } from '@storybook/core-common';

export default {
  packageJson: sync({ cwd: __dirname }).packageJson,
  framework: 'twig',
  frameworkPath: '@studiometa/storybook-twig',
  frameworkPresets: [ require.resolve('./framework-preset-twig.js') ],
} as LoadOptions;
