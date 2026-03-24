import React, { Fragment, memo } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';

import { EVENTS } from '../constants';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props: PanelProps) {
	useChannel({
		[EVENTS.RESULT]: (newResults) => {
			console.log(newResults);
		},
	});

	return (
		<AddonPanel active={props.active ?? false}>
			<Fragment>
				<p>Stuff will go here</p>
			</Fragment>
		</AddonPanel>
	);
});
