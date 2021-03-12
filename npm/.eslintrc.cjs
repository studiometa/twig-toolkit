module.exports = {
  extends: '@studiometa/eslint-config',
  rules: {
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'import/extensions': [ 'error', 'always' ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.ts', '.js', '.vue', '.mjs', '.jsx' ],
      },
    },
  },
  overrides: [
    {
      files: [ 'tests/**/*.spec.ts' ],
      extends: [ 'plugin:jest/recommended', 'plugin:jest/style' ],
    },
    {
      files: [ '**/*.ts' ],
      parser: '@typescript-eslint/parser',
      plugins: [ '@typescript-eslint' ],
      extends: [ 'plugin:@typescript-eslint/recommended' ],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
