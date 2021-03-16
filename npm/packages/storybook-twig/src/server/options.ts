import { sync } from 'read-pkg-up';

export default {
  packageJson: sync({ cwd: __dirname }).packageJson,
  framework: 'twig',
  frameworkPath: '@studiometa/storybook-twig',
  frameworkPresets: [ require.resolve('./framework-preset-twig.js') ],
};
