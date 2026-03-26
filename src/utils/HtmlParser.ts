import {
	computeAccessibleName,
	computeAccessibleDescription,
} from 'dom-accessibility-api';

export class HtmlParser {
	nodes: Node[] = [];

	constructor(element: HTMLElement) {
		this.nodes = Array.from(element.childNodes);
	}

	parseNode(node: Node) {
		console.log(node);

		return node;
	}

	getTree() {
		console.log('called getTree');
		return this.nodes.map((node) => this.parseNode(node));
	}
}