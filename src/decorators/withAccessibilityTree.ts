import { useEffect, useChannel } from 'storybook/preview-api';
import type { Args, DecoratorFunction, PartialStoryFn, Renderer, StoryContext } from 'storybook/internal/types';

import { EVENTS } from '../constants';

const parse = (canvas: ParentNode = globalThis.document) => {
	// Get the entire DOM tree of the canvas element
	const tree = canvas.querySelector('#storybook-root')?.innerHTML ?? '';

	return canvas;
};

export const withAccessibilityTree: DecoratorFunction = (
	storyFn: PartialStoryFn<Renderer, Args>,
	context: StoryContext<Renderer, Args>,
) => {
	// skip addon logic on docs pages
	if (context.viewMode === 'docs') {
		return storyFn();
	}

	const emit = useChannel({});

	useEffect(() => {
		emit(EVENTS.RESULT, parse(context.canvasElement as ParentNode));
	}, [context.canvasElement, emit]);

	return storyFn();
};
