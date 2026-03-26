import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import events from 'storybook/internal/core-events';
import { EVENTS } from '../src/constants';

// Log all Storybook preview events to the browser console if running in debug mode
const channel = addons.getChannel();
// @ts-expect-error TS2339: Property env does not exist on type ImportMeta. Because it actually does.
const isDebugMode = Boolean(import.meta.env.STORYBOOK_DEBUG);
if(isDebugMode) {
	console.debug('[PREVIEW] Ready to log events to console');
	Object.values({ ...events, ...EVENTS }).forEach((event) => {
		channel.on(event, (data) => {
			console.debug(`[PREVIEW] ${event}`, data);
		});
	});
}

const preview: Preview = {
	initialGlobals: {
		background: { value: 'light' },
	},
};

export default preview;
