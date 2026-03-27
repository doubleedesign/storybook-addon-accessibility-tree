import { type AriaRole } from 'react';

export type ParsedNode = {
	role: AriaRole;
	name: string;
	description?: string;
	children?: ParsedNode[];
};