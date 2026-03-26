import React from 'react';
import { HtmlParser } from './HtmlParser';

function generateMockCanvas(numberOfRootNodes: number, nestingLevel: number) {
	const mockCanvas = document.createElement('div');
	let html = '';

	for (let i = 0; i < numberOfRootNodes; i++) {
		html += '<ul>';
		for (let j = 0; j < 2; j++) {
			html += `<li>List ${i + 1} item ${j + 1}`;
			if (nestingLevel > 1) {
				html += generateNestedList(nestingLevel - 1, `${i + 1}.${j + 1}`);
			}
			html += '</li>';
		}
		html += '</ul>';
	}

	mockCanvas.innerHTML = html;
	return mockCanvas;
}

function generateNestedList(level: number, prefix: string) {
	if (level === 0) return '';

	let html = '<ul>';
	for (let i = 0; i < 2; i++) {
		html += `<li>List ${prefix} item ${i + 1}`;
		html += generateNestedList(level - 1, `${prefix}.${i + 1}`);
		html += '</li>';
	}
	html += '</ul>';

	return html;
}


describe('HtmlParser', () => {
	test('with one root node', () => {
		const mockCanvas = generateMockCanvas(1, 2);

		const result = new HtmlParser(mockCanvas).getTree();

		// TODO assertions
	});

	test('with multiple root nodes', () => {
		const mockCanvas = generateMockCanvas(2, 2);

		const result = new HtmlParser(mockCanvas).getTree();

		// TODO assertions
	});

	test('with 3 levels of nesting', () => {
		const mockCanvas = generateMockCanvas(1, 3);

		const result = new HtmlParser(mockCanvas).getTree();

		// TODO assertions
	});

	test('with very deep nesting', () => {
		const mockCanvas = generateMockCanvas(1, 50);

		const result = new HtmlParser(mockCanvas).getTree();

		// TODO assertions
	});

	test('with different amounts of nesting', () => {
		const mockCanvas = document.createElement('div');
		mockCanvas.innerHTML = `
			<ul>
				<li>Item 1</li>
				<li>Item 2
					<ul>
						<li>Subitem 2.1</li>
						<li>Subitem 2.2
							<ul>
								<li>Subsubitem 2.2.1</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>Item 3</li>
			</ul>
		`;

		const result = new HtmlParser(mockCanvas).getTree();

		// TODO assertions
	});
});