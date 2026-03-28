import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../components/Panel';
import { convert, ThemeProvider, themes } from 'storybook/theming';
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
					<div style={{ backgroundColor: themes.light.appBg, fontFamily: themes.light.fontBase, minHeight: '300px' }}>
						<Story />
					</div>
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
				id: crypto.randomUUID(),
				role: 'alert',
				name: 'Mock alert',
				children: [
					{ id: crypto.randomUUID(), role: 'heading', name: 'Mock alert heading' },
					{ id: crypto.randomUUID(), role: 'button', name: 'Mock button' },
					{ id: crypto.randomUUID(), role: 'generic', children: [
						{ id: crypto.randomUUID(), role: 'paragraph', children: [{ id: crypto.randomUUID(), role: 'text leaf', name: 'Example paragraph text' }] }
					] }
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