import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { Panel } from './components/Panel';
import { ADDON_ID, PANEL_ID } from './constants';

// Register the addon and its panel
addons.register(ADDON_ID, (api) => {
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: 'Outline',
		match: ({ viewMode }) => viewMode === 'story',
		render: ({ active }) => <Panel active={active} />,
		paramKey: ADDON_ID
	});
});
