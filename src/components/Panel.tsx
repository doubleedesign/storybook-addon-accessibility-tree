import React, { memo } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useResultCache } from '../controllers/useResultCache';
import { Tree, TreeItem, TreeItemContent } from 'react-aria-components';
import type { ParsedNode } from '../types';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function OutlinePanel(props: PanelProps) {
	const { results } = useResultCache();

	return (
		<AddonPanel active={props.active ?? false}>
			<Tree selectionMode="none" aria-label="Document outline">
				{results.map((node, index) => (<TreeItemWithChildren key={index} node={node} />))}
			</Tree>
		</AddonPanel>
	);
});

function TreeItemWithChildren({ node, key }: { node: ParsedNode, key: number }) {
	return (
		<TreeItem key={key} textValue={node.role as string}>
			<TreeItemContent>
				{node.role} {node.name}
			</TreeItemContent>
			{node?.children && node.children.map(((child, index) => {
				return <TreeItemWithChildren key={index} node={child} />;
			}))}
		</TreeItem>
	);
}