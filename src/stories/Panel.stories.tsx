import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../components/Panel';
import { HtmlParser } from '../utils/HtmlParser';
import { convert, ThemeProvider, themes } from 'storybook/theming';
import { fn } from 'storybook/test';
import { ADDON_ID } from '../constants';

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
	],
	parameters: {
		[ADDON_ID]: {
			disable: true,
		},
	}
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
	args: {
		active: true,
	},
	beforeEach: async() => {
		mockTreeData({ some: 'data' });
	},
	afterEach: () => {
		mockTreeData(null)();
	}
};

function mockTreeData(data) {
	const original = HtmlParser.prototype.getTree;

	HtmlParser.prototype.getTree = fn(() => {
		return data;
	});

	return () => {
		HtmlParser.prototype.getTree = original;
	};
}