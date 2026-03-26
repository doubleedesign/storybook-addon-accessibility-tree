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
	const [results, setResults] = useState(null);

	const requestResults = () => {
		console.log('requesting results');
		channel.emit(EVENTS.REQUEST);
	};

	const handleResults = (newResults) => {
		console.log('Received results in panel:', newResults);
		setResults(newResults);
	};

	useEffect(() => {
		// Refresh on the relevant native events
		channel.on(FORCE_REMOUNT, requestResults);
		channel.on(STORY_FINISHED, requestResults);
		channel.on(UPDATE_QUERY_PARAMS, requestResults);

		// Listen for results from the preview decorator
		channel.on(EVENTS.RESULT, handleResults);

		// Cleanup - ensures the results don't persist across story changes
		return () => {
			channel.off(FORCE_REMOUNT, requestResults);
			channel.off(STORY_FINISHED, requestResults);
			channel.off(UPDATE_QUERY_PARAMS, requestResults);

			channel.off(EVENTS.RESULT, handleResults);
		};
	}, []);

	return (
		<AddonPanel active={props.active ?? false}>
			<p>Stuff will go here</p>
		</AddonPanel>
	);
});
