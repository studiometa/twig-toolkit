import { TwingLoaderFilesystem } from 'twing';
import { resolve } from 'path';
import { Template } from '../../src/Helpers/Template.js';

let loader;

beforeEach(() => {
  loader = new TwingLoaderFilesystem();
});

test('The `Template.addMetaNamespace` method should add the `@meta` Twig namespace.', () => {
  Template.addMetaNamespace(loader);
  expect(loader.getNamespaces()).toContain('meta');
});

test('The `@meta` Twig namespace should resolve to the `templates/` folder.', () => {
  Template.addMetaNamespace(loader);
  expect(loader.getPaths('meta')).toEqual([ resolve(__dirname, '../../templates/') ]);
});
