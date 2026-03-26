import { fileURLToPath } from 'node:url';

const isDebugMode = process.env.STORYBOOK_DEBUG?.trim() === '1' || process.env.STORYBOOK_DEBUG?.trim()?.toLowerCase() === 'true';

/**
 * to load the addon in this test Storybook
 */
export function previewAnnotations(entry = []) {
	if(isDebugMode) {
		return [...entry, fileURLToPath(import.meta.resolve('../src/preview.ts'))];
	}

	return [...entry, fileURLToPath(import.meta.resolve('../dist/preview.js'))];
}

export function managerEntries(entry = []) {
	if(isDebugMode) {
		console.log('should load source manager');
		return [...entry, fileURLToPath(import.meta.resolve('../src/manager.tsx'))];
	}

	return [...entry, fileURLToPath(import.meta.resolve('../dist/manager.js'))];
}
