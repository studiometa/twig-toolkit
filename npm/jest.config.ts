/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export default {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A set of global variables that need to be available in all test environments
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "diagnostics": true
    }
  },

  moduleNameMapper: {
    // Map js import from source to TS files
    '/Helpers/Html.js$': '<rootDir>/src/Helpers/Html.ts',
    '/Helpers/Template.js$': '<rootDir>/src/Helpers/Template.ts',
    '/Node/HtmlElementNode.js$': '<rootDir>/src/Node/HtmlElementNode.ts',
    '/TokenParser/HtmlElementTokenParser.js$': '<rootDir>/src/TokenParser/HtmlElementTokenParser.ts',
    '/Extension.js$': '<rootDir>/src/Extension.ts',
  },

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(j|t)sx?$': 'esbuild-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [],
};
