import type { Preview } from '@storybook/react-vite';
import { sb } from 'storybook/test';
import { addons } from 'storybook/preview-api';
import events from 'storybook/internal/core-events';

// Log all Storybook events to the browser console if running in debug mode
const channel = addons.getChannel();
// @ts-expect-error TS2339: Property env does not exist on type ImportMeta. Because it actually does.
const isDebugMode = Boolean(import.meta.env.STORYBOOK_DEBUG);
if(isDebugMode) {
	Object.values(events).forEach((event) => {
		channel.on(event, (data) => {
			console.debug(event, data);
		});
	});
}

// Register @storybook/manager-api as a mocked module.
// All its exports become Vitest mock functions, so we can inject results in the stories that test the addon.
sb.mock(import('storybook/manager-api'), { spy: true });

const preview: Preview = {
	initialGlobals: {
		background: { value: 'light' },
	},
};

export default preview;
