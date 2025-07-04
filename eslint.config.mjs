import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import eslintPluginImport from 'eslint-plugin-import';

export default typescriptEslint.config(
	eslint.configs.recommended,
	typescriptEslint.configs.recommended,
	eslintPluginVue.configs['flat/recommended'],
	eslintPluginStorybook.configs['flat/recommended'],
	{
		plugins: {
			import: eslintPluginImport,
		},
	},
	{ ignores: ['*.d.ts', '**/coverage', '**/dist'] },
	{
		files: ['**/*.{ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: typescriptEslint.parser,
			},
		},
		rules: {
			'import/prefer-default-export': 'off',
			'import/no-default-export': 'error',
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: [
						'**/*.test.{ts,tsx}',
						'src/setupTests.ts',
						'**/*.stories.*',
					],
					optionalDependencies: false,
				},
			],
			'@typescript-eslint/require-await': 'off',
		},
	},
	{
		files: ['**/*.stories.*'],
		rules: {
			'import/no-anonymous-default-export': 'off',
			'import/no-default-export': 'off',
		},
	},
	eslintConfigPrettier,
);
