import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import stylisticPlugin from '@stylistic/eslint-plugin-ts';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	...storybook.configs['flat/recommended'],
	{
		plugins: {
			'@stylistic': stylisticPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'@stylistic/indent': ['error', 'tab', {
				'SwitchCase': 1,
				'FunctionExpression': {
					'parameters': 1,
					'body': 1,
				},
				'MemberExpression': 1,
				'offsetTernaryExpressions': true,
			}],
			'@stylistic/quotes': [
				'error',
				'single',
			],
			'@stylistic/space-in-parens': 'off',
			'@stylistic/array-bracket-spacing': 'off',
			'@stylistic/object-curly-spacing': [
				'error',
				'always',
			],
			'@stylistic/computed-property-spacing': 'off',
			'@stylistic/space-before-function-paren': 'off',
			'@stylistic/no-nested-ternary': 'off',
			'@stylistic/space-unary-ops': 'off',
			'@stylistic/semi': [
				'warn',
				'always',
			],
			'@stylistic/brace-style': [
				'warn',
				'stroustrup',
				{
					'allowSingleLine': false,
				},
			],
		},
		ignores: [
			'.github/dependabot.yml',
			'!.*',
			'*.tgz',
			'dist/',
			'scripts/',
			'coverage/',
			'node_modules/',
			'storybook-static/',
			'build-storybook.log',
			'.DS_Store',
			'.env',
			'.idea',
			'.vscode',
		],
	},
	reactPlugin.configs.flat.recommended,
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
