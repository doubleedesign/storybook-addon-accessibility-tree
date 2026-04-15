import { useCallback } from 'storybook/preview-api';
import { UPDATE_QUERY_PARAMS, STORY_ARGS_UPDATED, FORCE_REMOUNT, STORY_FINISHED } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { EVENTS } from '../constants';

export function useDataRefresh() {
	const channel = addons.getChannel();

	const setupRefreshListeners = useCallback(() => {
		let timeout: ReturnType<typeof setTimeout>;

		const handleEvent = () => {
			// Wait for a short period after the last event call before emitting the tree request
			// so we just do it once, after all the native events are done
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				channel.emit(EVENTS.A11Y_TREE_REQUESTED);
			}, 200);
		};

		channel.on(STORY_FINISHED, handleEvent);
		channel.on(STORY_ARGS_UPDATED, handleEvent);
		channel.on(UPDATE_QUERY_PARAMS, handleEvent);
		channel.on(FORCE_REMOUNT, handleEvent);

		return () => {
			clearTimeout(timeout);
			channel.off(STORY_FINISHED, handleEvent);
			channel.off(STORY_ARGS_UPDATED, handleEvent);
			channel.off(UPDATE_QUERY_PARAMS, handleEvent);
			channel.off(FORCE_REMOUNT, handleEvent);
		};
	}, [channel]);

	return { setupRefreshListeners };
}