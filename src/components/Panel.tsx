import React, { memo, useState, useEffect } from 'react';
import { addons } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { EVENTS } from '../constants';
import { UPDATE_QUERY_PARAMS, FORCE_REMOUNT, STORY_FINISHED } from 'storybook/internal/core-events';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function OutlinePanel(props: PanelProps) {
	const channel = addons.getChannel();
	const [results, setResults] = useState({});

	const requestResults = (event) => {
		console.log('requesting results on event:', event);
		channel.emit(EVENTS.A11Y_TREE_REQUESTED);
	};

	const handleResults = (newResults) => {
		console.log('Received results in panel:', newResults);
		setResults(newResults);
	};

	useEffect(() => {
		// Refresh on the relevant native events
		[FORCE_REMOUNT, STORY_FINISHED, UPDATE_QUERY_PARAMS].forEach((event) => {
			channel.on(event, () => requestResults(event));
		});

		// Listen for results from the preview decorator
		channel.on(EVENTS.A11Y_TREE_RESPONSE, handleResults);

		// Cleanup - ensures the results don't persist across story changes
		return () => {
			channel.off(FORCE_REMOUNT, requestResults);
			channel.off(STORY_FINISHED, requestResults);
			channel.off(UPDATE_QUERY_PARAMS, requestResults);

			channel.off(EVENTS.A11Y_TREE_RESPONSE, handleResults);
		};
	}, [channel]);

	return (
		<AddonPanel active={props.active ?? false}>
			<>{JSON.stringify(results)}</>
		</AddonPanel>
	);
});
