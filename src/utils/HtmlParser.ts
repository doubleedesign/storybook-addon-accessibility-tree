import { getRole, computeAccessibleName } from 'dom-accessibility-api';
import type { ParsedNode } from '../types';

export class HtmlParser {
	nodes: HTMLElement[] = [];

	constructor(element: HTMLElement) {
		this.nodes = Array.from(element.childNodes as NodeListOf<HTMLElement>);
	}

	parseNode(node: HTMLElement): ParsedNode {
		return {
			id: crypto.randomUUID(),
			role: getRole(node) || 'generic',
			name: computeAccessibleName(node),
			children: this.parseChildren(node)
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

	filterTree(nodes: ParsedNode[]): ParsedNode[] {
		return nodes.reduce<ParsedNode[]>((acc, node) => {
			if (['presentation', 'generic', 'none'].includes(node.role) && !node.name) {
				return [...acc, ...this.filterTree(node.children ?? [])];
			}

			return [...acc, { ...node, children: this.filterTree(node.children ?? []) }];
		}, []);
	}

	getTree(): ParsedNode[] {
		// TODO: Filter out hidden elements, see https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility

		const rawTree = this.nodes.map((node) => this.parseNode(node));

		// Recursively filter out nodes with generic roles and no accessible name, but keep their children
		return this.filterTree(rawTree);
	}

}