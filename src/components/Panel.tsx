import React, { memo } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useResultCache } from '../controllers/useResultCache';

interface PanelProps {
	active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function OutlinePanel(props: PanelProps) {
	const { results } = useResultCache();

	return (
		<AddonPanel active={props.active ?? false}>
			<>{JSON.stringify(results)}</>
		</AddonPanel>
	);
});
