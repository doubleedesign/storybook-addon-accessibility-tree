# Storybook Accessibility Tree Addon

See an outline of your component's semantic structure as understood by browsers, assistive technologies, and search engines.

Utilises [dom-accessibility-api](https://www.npmjs.com/package/dom-accessibility-api) by Sebastian Silbermann for determining the relevant element properties.

> [!NOTE]  
> This addon has been developed for and tested with Storybook 10. It might work with earlier versions, it might not. ¯\\_(ツ)_/¯

> [!IMPORTANT]
> This addon should be used as part of a comprehensive accessibility testing strategy. It provides insights into the accessibility tree structure but does not automatically identify or fix accessibility issues. Always combine it with other tools and manual testing to ensure your components are accessible to all users.

---
## Setup

First, install the package in your project:

```sh
npm install --save-dev @doubleedesign/storybook-addon-accessibility-tree
```

Then, register it as an addon in `.storybook/main.js`:

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    // ... other addons
    '@doubleedesign/storybook-addon-accessibility-tree', 
  ],
};

export default config;
```

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for instructions on how to set up a development environment for the addon, run Storybook in dev mode, and troubleshoot common issues.