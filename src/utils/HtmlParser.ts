export class HtmlParser {
	nodes: Node[] = [];

	constructor(element: HTMLElement) {
		this.nodes = Array.from(element.childNodes);
		this.parse();
	}

	parse() {
		//console.log(this.nodes);
	}

	getTree() {
		return {};
	}
}