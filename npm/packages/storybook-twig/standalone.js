const build = require('@storybook/core/standalone');
const frameworkOptions = require('./dist/server/options').default;

/**
 * Build the standalone version.
 * @param {StorybookOptions} options
 */
async function buildStandalone(options) {
  return build(options, frameworkOptions);
}

module.exports = buildStandalone;
