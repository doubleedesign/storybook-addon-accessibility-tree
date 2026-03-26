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

	channel.on(EVENTS.REQUEST, () => {
		channel.emit(EVENTS.RESULT, parse(context.canvasElement));
	});

	return storyFn();
};
