import { useEffect, addons } from 'storybook/preview-api';
import type { Args, DecoratorFunction, PartialStoryFn, Renderer, StoryContext } from 'storybook/internal/types';
import { HtmlParser } from '../utils/HtmlParser';
import { EVENTS } from '../constants';
import { useDataRefresh } from '../controllers/useDataRefresh';


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

	const { setupRefreshListeners } = useDataRefresh();
	const channel = addons.getChannel();

	useEffect(() => {
		setupRefreshListeners();

		const emitResponse = () => {
			channel.emit(EVENTS.A11Y_TREE_RESPONSE, parse(context.canvasElement));
		};

		// Pick up request events and respond with the parsed results
		channel.on(EVENTS.A11Y_TREE_REQUESTED, emitResponse);

		// Clean up
		return () => {
			channel.off(EVENTS.A11Y_TREE_REQUESTED, emitResponse);
		};
	}, [channel]);

	return storyFn();
};
