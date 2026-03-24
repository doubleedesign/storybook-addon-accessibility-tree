# Storybook Accessibility Tree Addon

See an outline of your component's semantic structure as understood by browsers, assistive technologies, and search engines.

---
## Prerequisites
- Storybook* set up in your project.

_*This addon has been developed for and tested with Storybook 10. It might work with earlier versions, it might not._  ¯\_(ツ)_/¯

---
## Usage

First, install the package in your project:

```sh
npm install --save-dev storybook-addon-accessibility-tree
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
    'storybook-addon-accessibility-tree', // 👈 register the addon like this
  ],
};

export default config;
```

---
## Development

After forking/cloning this repository, run `npm install` to install dependencies. Then:
- `pnpm run start` runs babel in watch mode and starts Storybook
- `pnpm run build` builds and packages the addon code
- `pnpm run test` runs all unit tests.

### Troubleshooting

- Changes to the addon code not reflecting in Storybook:
  - Rebuild and restart. Hot reload capabilities for addons are limited.
- `npm run start` erroring with "module not found": 
  - Use `pnpm` instead of `npm`
  - Run `npm run build:watch` and then `npm run storybook` separately (or `pnpm` equivalents)


### Resources

For more information about developing addons, see:
- [Addon kit template repo](https://github.com/storybookjs/addon-kit)
- [Addon development docs](https://storybook.js.org/docs/addons/writing-addons)