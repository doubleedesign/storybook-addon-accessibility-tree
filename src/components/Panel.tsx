import React, { useState, useMemo, useEffect } from 'react';
import { AddonPanel, Bar, Button } from 'storybook/internal/components';
import { addons } from 'storybook/manager-api';
import { useResultCache } from '../controllers/useResultCache';
import { Collection, Tree, TreeItem, TreeItemContent } from 'react-aria-components';
import { ArrowSolidRightIcon, CollapseIcon, ExpandAltIcon, StatusIcon, SyncIcon } from '@storybook/icons';
import type { ParsedNode } from '../types';
import { EVENTS } from '../constants';
import './Panel.styles.css';


interface PanelProps {
	active?: boolean;
}

export const Panel = (props: PanelProps) => {
	const { results } = useResultCache();
	const channel = addons.getChannel();
	const [depth, setDepth] = useState<number>(2);

	const handleExpandAll = () => setDepth(Infinity);
	const handleCollapseAll = () => setDepth(0);
	const allExpanded = depth === Infinity;

	const handleReload = () => {
		channel.emit(EVENTS.A11Y_TREE_REQUESTED);
		setDepth(2);
	};

	// TODO: Make the default expansion level configurable
	return (
		<AddonPanel active={props.active ?? false}>
			<div className="accessibility-tree">
				<Bar className="accessibility-tree__controls">
					<Button
						variant="ghost"
						padding="small"
						onClick={allExpanded ? handleCollapseAll : handleExpandAll}
						ariaLabel={allExpanded ? 'Collapse all results' : 'Expand all results'}
						aria-expanded={allExpanded}
					>
						{allExpanded ? <CollapseIcon /> : <ExpandAltIcon />}
					</Button>
					<Button
						variant="ghost"
						padding="small"
						onClick={handleReload}
						ariaLabel="Reload"
					>
						<SyncIcon />
					</Button>
				</Bar>
				<div className="accessibility-tree__content">
					<TreeEnhanced expandToLevel={depth} nodes={results} />
				</div>
			</div>
		</AddonPanel>
	);
};

function TreeEnhanced({ expandToLevel, nodes }: { expandToLevel: number, nodes: ParsedNode[] }) {
	const [renderKey, setRenderKey] = useState(0);

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
					<TreeItem key={node.id} textValue={node.role} className="accessibility-tree__content__item">
						<TreeItemContent>
							{({ hasChildItems }) => (
								<>
									{hasChildItems ? (
										<Button>
											<ArrowSolidRightIcon className="accessibility-tree__content__item__icon" />
										</Button>
									) : (
										<StatusIcon className="accessibility-tree__content__item__icon" />
									)}
									<span className="accessibility-tree__content__item__role">{node.role}</span>:
									<span className="accessibility-tree__content__item__name">&ldquo;{node.name}&rdquo;</span>
								</>
							)}
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