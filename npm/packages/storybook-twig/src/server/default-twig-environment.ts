import { TwingEnvironment, TwingLoaderRelativeFilesystem } from 'twing';
import { Extension, ExtensionName } from '@studiometa/twig-toolkit';

const loader: TwingLoaderRelativeFilesystem = new TwingLoaderRelativeFilesystem();
const twig: TwingEnvironment = new TwingEnvironment(loader);

twig.addExtension(new Extension(), ExtensionName);

// Using `export default twig` is not working
module.exports = twig;
