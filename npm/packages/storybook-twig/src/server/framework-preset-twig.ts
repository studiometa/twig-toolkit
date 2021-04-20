// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';
// eslint-disable-next-line import/no-unresolved
import type { StorybookOptions } from './types.js';

/**
 * Configure Webpack.
 * @param {Configuration} config
 * @param {}
 */
export function webpack(config: Configuration, { twigOptions }: StorybookOptions): Configuration {
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: require.resolve('twing-loader'),
        options: {
          environmentModulePath:
            twigOptions?.environmentModulePath || require.resolve('./default-twig-environment.js'),
        },
      },
    ],
  });
  return config;
}
