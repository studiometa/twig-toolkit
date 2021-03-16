# Storybook for Twig/Twing

Storybook for Twig/Twing is a UI development environment for your Twig/Twing components.
With it, you can visualize different states of your UI components and develop them interactively.

![Storybook Screenshot](https://github.com/storybookjs/storybook/blob/master/media/storybook-intro.gif)

Storybook runs outside of your app.
So you can develop UI components in isolation without worrying about app specific dependencies and requirements.

## Getting Started

### Step 1: Add dependencies

```sh
cd my-melody-app
npm install @studiometa/storybook-twig --save-dev
```

### Step 2: Add a npm script

In your `package.json`, add the following npm script to start storybook:

```json
{
  "scripts": {
    "storybook": "start-storybook"
  }
}
```

### Step 3: Create the main file

Create the `.storybook/main.js` file to tell Storybook where to find your stories:

```js
module.exports {
    stories: ['../src/**/*.stories.[tj]s'],
    twigOptions: {

    }
};
```

You can also define a custom Twing environment:

```js
// .storybook/main.js
module.exports {
    twigOptions: {
      environmentModulePath: require.resolve('./my-custom-twig-environment.js'),
    },
    stories: ['../src/**/*.stories.[tj]s'],
};

// .storybook/my-custom-twig-environment.js (default environment as example)
const { TwingEnvironment, TwingLoaderRelativeFilesystem } = require('twing');

const loader = new TwingLoaderRelativeFilesystem();
const twig = new TwingEnvironment(loader);

module.exports = twig;
```

### Step 4: Write your stories

```js
import Button from './button.twig';

export default {
  title: 'Button',
  component: Button,
};

export const withText = () => ({
  props: { label 'some text' }
});

export const withEmoji = () => ({
  props: { label '😀 😎 👍 💯' }
});
```

For more information visit: [storybook.js.org](https://storybook.js.org)

---

Storybook also comes with a lot of [addons](https://storybook.js.org/addons/introduction) and a great API to customize as you wish.
You can also build a [static version](https://storybook.js.org/basics/exporting-storybook) of your storybook and deploy it anywhere you want.

Here are some featured storybooks that you can reference to see how Storybook works:

## Docs

-   [Basics](https://storybook.js.org/basics/introduction)
-   [Configurations](https://storybook.js.org/configurations/default-config)
-   [Addons](https://storybook.js.org/addons/introduction)
