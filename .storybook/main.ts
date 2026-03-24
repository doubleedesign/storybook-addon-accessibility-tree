import { defineMain } from '@storybook/react-vite/node';

const config = defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [import.meta.resolve('./local-preset.ts'), '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
});

export default config;
