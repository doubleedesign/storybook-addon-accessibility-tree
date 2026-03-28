import { type AriaRole } from 'react';

/**
 * The raw data of a parsed HTML node.
 */
export type ParsedNode = {
	/** Unique ID for under-the-hood tracking, not related to the DOM id attribute **/
	id: string;
	/** The interpreted semantic role  **/
	role: AriaRole;
	/** The interpreted accessible name **/
	name?: string;
	/** The interpreted accessible description **/
	description?: string;
	/** Child nodes **/
	children?: ParsedNode[];
};