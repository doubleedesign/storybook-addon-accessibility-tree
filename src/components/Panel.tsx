import React, { memo, useState, useEffect } from 'react';
import { addons } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { EVENTS } from '../constants';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function OutlinePanel(props: PanelProps) {
	const channel = addons.getChannel();
	const [results, setResults] = useState(null);

	useEffect(() => {
		channel.emit(EVENTS.REQUEST);
	}, []);

	channel.on(EVENTS.RESULT, (newResults) => {
		console.log('Received results in panel:', newResults);
		setResults(newResults);
	});

	return (
		<AddonPanel active={props.active ?? false}>
			<p>Stuff will go here</p>
		</AddonPanel>
	);
});
