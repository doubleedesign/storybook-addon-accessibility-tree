import { addons } from 'storybook/manager-api';
import events from 'storybook/internal/core-events';
import { EVENTS } from '../src/constants';

// Log all Storybook preview events to the browser console if running in debug mode
const channel = addons.getChannel();
const isDebugMode = process.env.STORYBOOK_DEBUG?.trim() === '1' || process.env.STORYBOOK_DEBUG?.trim()?.toLowerCase() === 'true';

if(isDebugMode) {
	console.debug('[MANAGER] Ready to log events to console');
	Object.values({ ...events, ...EVENTS }).forEach((event) => {
		channel.on(event, (data) => {
			console.debug(`[MANAGER] ${event}`, data);
		});
	});
}
