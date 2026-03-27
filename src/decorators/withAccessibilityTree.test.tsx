import React from 'react';
import type { StoryContext } from 'storybook/internal/types';
import { render, screen } from '@testing-library/react';
import { withAccessibilityTree } from './withAccessibilityTree';
import { EVENTS } from '../constants';

const mockEmit = vitest.fn();
const mockUseChannel = vitest.fn();

vitest.mock('storybook/preview-api', async () => {
	return {
		useEffect: (fn: () => void, deps: unknown[]) => {
			fn();
		},
		useChannel: (handlers: unknown) => {
			mockUseChannel(handlers);
			return mockEmit;
		},
	};
});

const MockStory = () => {
	return (
		<ul>
			<li>List item 1</li>
			<li>List item 2</li>
		</ul>
	);
};

const root = document.createElement('div');
root.id = 'storybook-root';
const mockContext: Partial<StoryContext> = {
	canvasElement: root,
};

describe('withAccessibilityTree', () => {
	it('should render the story', () => {
		render(withAccessibilityTree(MockStory, mockContext as StoryContext));

		expect(screen.getByRole('list')).toBeVisible();
	});

	it('should emit accessibility tree data on initial story render', () => {
		withAccessibilityTree(MockStory, mockContext as StoryContext);

		expect(mockEmit).toHaveBeenCalledWith(EVENTS.A11Y_TREE_RESPONSE, 'some string');
	});
});
