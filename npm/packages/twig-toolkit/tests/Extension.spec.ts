import { TwingLoaderFilesystem, TwingEnvironment, TwingLoaderRelativeFilesystem } from 'twing';
// eslint-disable-next-line import/no-unresolved
import { Extension, ExtensionName } from '../src/Extension.js';
// eslint-disable-next-line import/no-unresolved
import { Template } from '../src/Helpers/Template.js';

test('The extension should add the `@meta` namespace when given a `loader`.', () => {
  const loader = new TwingLoaderFilesystem();
  const twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(loader), ExtensionName);
  expect(loader.getNamespaces()).toContain('meta');
});

test('The extension should *not* add the `@meta` namespace when *not* given a `loader`.', () => {
  const loader = new TwingLoaderFilesystem();
  const twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(), ExtensionName);
  expect(loader.getNamespaces()).not.toContain('meta');
});

test('The extension should *not* add the `@meta` namespace when given a wrong loader.', () => {
  const mock = jest.spyOn(Template, 'addMetaNamespace');
  const loader = new TwingLoaderRelativeFilesystem();
  const twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(loader), ExtensionName);
  expect(mock).not.toHaveBeenCalled();
});
