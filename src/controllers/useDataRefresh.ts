import { useState, useCallback, useEffect } from 'react';
import { UPDATE_QUERY_PARAMS, STORY_ARGS_UPDATED, FORCE_REMOUNT, STORY_FINISHED } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { EVENTS } from '../constants';

export function useDataRefresh() {
	const channel = addons.getChannel();
	const [eventCalls, setEventCalls] = useState<number>(0);

	// Track event calls to batch updates
	const registerEventCall = useCallback(() => {
		setEventCalls((prev) => prev + 1);
	}, []);

	const setupRefreshListeners = useCallback(() => {
		channel.on(STORY_FINISHED, registerEventCall);
		channel.on(STORY_ARGS_UPDATED, registerEventCall);
		channel.on(UPDATE_QUERY_PARAMS, registerEventCall);
		channel.on(FORCE_REMOUNT, registerEventCall);

		return () => {
			channel.off(STORY_FINISHED, registerEventCall);
			channel.off(STORY_ARGS_UPDATED, registerEventCall);
			channel.off(UPDATE_QUERY_PARAMS, registerEventCall);
			channel.off(FORCE_REMOUNT, registerEventCall);
		};
	}, [channel, registerEventCall]);

	// Wait for a short period after the last event call before emitting the tree request
	// so we just do it once, after all the native events are done
	useEffect(() => {
		setTimeout(() => {
			if (eventCalls > 0) {
				channel.emit(EVENTS.A11Y_TREE_REQUESTED);
				setEventCalls(0); // reset so the next batch of events will trigger a refresh too
			}
		}, 200);
	}, [eventCalls]);

	return { setupRefreshListeners };
}