import { useEffect } from 'storybook/preview-api';
import type { Args, DecoratorFunction, PartialStoryFn, Renderer, StoryContext } from 'storybook/internal/types';
import { HtmlParser } from '../utils/HtmlParser';
import { EVENTS } from '../constants';
import { addons } from 'storybook/preview-api';

const parse = (canvas: HTMLElement) => {
	return new HtmlParser(canvas).getTree();
};

export const withAccessibilityTree: DecoratorFunction = (
	storyFn: PartialStoryFn<Renderer, Args>,
	context: StoryContext<Renderer, Args>,
) => {
	// skip addon logic on docs pages
	if (context.viewMode === 'docs') {
		return storyFn();
	}

	const channel = addons.getChannel();

	// Emit on initial render
	useEffect(() => {
		channel.emit(EVENTS.REQUEST);
	}, []);

	channel.on(EVENTS.REQUEST, () => {
		console.log(context.canvasElement);
		channel.emit(EVENTS.RESULT, parse(context.canvasElement));
	});

	return storyFn();
};
