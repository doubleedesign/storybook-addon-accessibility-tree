import { useEffect, useChannel } from 'storybook/preview-api';
import type { DecoratorFunction } from 'storybook/internal/types';

import { EVENTS } from './constants';

const parse = (canvas: ParentNode = globalThis.document) => {
  // Get the entire DOM tree of the canvas element
  const tree = canvas.querySelector('*')?.outerHTML ?? '';
  console.log(tree);

  return tree;
};

export const withRoundTrip: DecoratorFunction = (storyFn, context) => {
  const canvasElement = context.canvasElement as ParentNode;

  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, parse(canvasElement));
    },
  });

  useEffect(() => {
    emit(EVENTS.RESULT, parse(canvasElement));
  });

  return storyFn();
};
