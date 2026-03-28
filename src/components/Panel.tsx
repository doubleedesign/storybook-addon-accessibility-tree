import React, { memo, useMemo, useEffect } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useResultCache } from '../controllers/useResultCache';
import { Collection, Tree, TreeItem, TreeItemContent } from 'react-aria-components';
import type { ParsedNode } from '../types';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function OutlinePanel(props: PanelProps) {
	const { results } = useResultCache();

	// TODO: Make the default expansion level configurable
	return (
		<AddonPanel active={props.active ?? false}>
			<TreeEnhanced expandToLevel={2} nodes={results} />
		</AddonPanel>
	);
});

function TreeEnhanced({ expandToLevel, nodes }: { expandToLevel: number, nodes: ParsedNode[] }) {
	const [renderKey, setRenderKey] = React.useState(0);

	const expandedKeys = useMemo(
		() => getIdsToLevel(nodes, expandToLevel),
		[nodes, expandToLevel]
	);

	useEffect(() => {
		// Force a re-render when the expanded keys change to ensure the Tree component updates its internal state
		setRenderKey(prevKey => prevKey + 1);
	}, [expandedKeys]);

	return (
		<Tree key={renderKey} aria-label="Document Outline" items={nodes} defaultExpandedKeys={expandedKeys}>
			{function renderItem(node: ParsedNode) {
				return (
					<TreeItem key={node.id} textValue={node.role}>
						<TreeItemContent>
							{node.role} {node.name}
						</TreeItemContent>
						{node.children && (
							<Collection items={node.children}>
								{renderItem}
							</Collection>
						)}
					</TreeItem>
				);
			}}
		</Tree>
	);
}

function getIdsToLevel(nodes: ParsedNode[], level: number, depth = 0): string[] {
	if (depth >= level) return [];

	return nodes.flatMap(node =>
		node.children?.length
			? [node.id, ...getIdsToLevel(node.children, level, depth + 1)]
			: []
	);
}