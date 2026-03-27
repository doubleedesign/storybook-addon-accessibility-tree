import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../components/Panel';
import { convert, ThemeProvider, themes } from 'storybook/theming';
import { ADDON_ID } from '../constants';
import { DiProvider, injectable } from 'react-magnetic-di';
import { useResultCache } from '../controllers/useResultCache';

const meta: Meta<typeof Panel> = {
	title: 'Addon/Panel',
	component: Panel,
	tags: [],
	decorators: [
		(Story) => {
			// Wrap the story in the ThemeProvider in the same way as the manager so the expected variables are available to the AddonPanel inside
			return (
				<ThemeProvider theme={convert(themes.light)}>
					<Story />
				</ThemeProvider>
			);
		}
	]
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Basic: Story = {
	args: {
		active: true,
	},
	render: (args) => {
		const mockResults = {
			results: [{
				role: 'alert',
				name: 'Mock alert',
				children: [
					{ role: 'heading', name: 'Mock alert heading' },
					{ role: 'button', name: 'Mock button' }
				]
			}]
		};

		return (
			<DiProvider use={[injectable(useResultCache, () => (mockResults))]}>
				<Panel {...args} />
			</DiProvider>
		);
	}
};