import { useState, useCallback, useEffect } from 'react';
import type { ParsedNode } from '../types';
import { addons } from 'storybook/manager-api';
import { EVENTS } from '../constants';


export function useResultCache() {
	const channel = addons.getChannel();
	const [results, setResults] = useState<ParsedNode[]>([]);

	const maybeUpdateResults = useCallback((newResults: ParsedNode[]) => {
		// Only update the state if the results are different to avoid unnecessary re-renders
		if (JSON.stringify(newResults) !== JSON.stringify(results)) {
			setResults(newResults);
		}
	}, [results]);

	useEffect(() => {
		channel.on(EVENTS.A11Y_TREE_RESPONSE, maybeUpdateResults);

		return () => {
			channel.off(EVENTS.A11Y_TREE_RESPONSE, maybeUpdateResults);
		};
	}, [channel]);

	return {
		results
	};
}