module.exports = {
  extends: '@studiometa/eslint-config',
  rules: {
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.vue', '.mjs', '.jsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            project: __dirname,
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': [
          2,
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
          },
        ],
      },
    },
  ],
};
