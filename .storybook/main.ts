import { defineMain } from '@storybook/react-vite/node';

const config = defineMain({
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		import.meta.resolve('./local-preset.ts'),
		'@storybook/addon-a11y',
		'@storybook/addon-docs'
	],
	framework: '@storybook/react-vite',
	viteFinal: async (config) => {
		config.build = {
			...config.build,
			sourcemap: true,
		};
		config.esbuild = {
			...config.esbuild,
			sourcemap: true,
		};
		config.css = {
			...config.css,
			devSourcemap: true,
		};
		config.optimizeDeps = {
			...config.optimizeDeps,
			esbuildOptions: {
				...config.optimizeDeps?.esbuildOptions,
				sourcemap: true,
			},
		};

		return config;
	},
});

export default config;