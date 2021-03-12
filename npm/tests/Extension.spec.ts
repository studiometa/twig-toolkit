import { TwingLoaderFilesystem, TwingEnvironment } from 'twing';
import { Extension } from '../src/Extension.js';

test('The extension should add the `@meta` namespace when given a `loader`.', () => {
  const loader = new TwingLoaderFilesystem();
  const twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(loader), '@studiometa/twig-toolkit');
  expect(loader.getNamespaces()).toContain('meta');
});

test('The extension should *not* add the `@meta` namespace when *not* given a `loader`.', () => {
  const loader = new TwingLoaderFilesystem();
  const twig = new TwingEnvironment(loader);
  twig.addExtension(new Extension(), '@studiometa/twig-toolkit');
  expect(loader.getNamespaces()).not.toContain('meta');
});
