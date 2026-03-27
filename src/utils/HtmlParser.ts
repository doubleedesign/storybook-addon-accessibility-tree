import { getRole, computeAccessibleName } from 'dom-accessibility-api';
import type { ParsedNode } from '../types';

export class HtmlParser {
	nodes: HTMLElement[] = [];

	constructor(element: HTMLElement) {
		this.nodes = Array.from(element.childNodes as NodeListOf<HTMLElement>);
	}

	parseNode(node: HTMLElement): ParsedNode {
		return {
			role: getRole(node) || 'generic',
			name: computeAccessibleName(node),
			children: this.parseChildren(node),
		};
	}

	parseChildren(node: HTMLElement): ParsedNode[] {
		return Array.from(node.childNodes as NodeListOf<HTMLElement>).map((child) => {
			if (child instanceof HTMLElement) {
				return this.parseNode(child);
			}

			return undefined;
		}).filter((child): child is ParsedNode => child !== undefined);
	}

	getTree(): ParsedNode[] {
		// TODO: Filter out hidden elements, see https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility
		// TODO: Filter out presentational roles, other generic containers etc that screen readers ignore

		return this.nodes.map((node) => this.parseNode(node));
	}
}