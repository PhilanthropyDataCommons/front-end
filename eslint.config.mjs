import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import eslintPluginImport from 'eslint-plugin-import';
import love from 'eslint-config-love';

export default typescriptEslint.config(
	love,
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
				extraFileExtensions: ['.vue'],
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
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-unsafe-type-assertion': 'off',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/switch-exhaustiveness-check': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
			'@typescript-eslint/prefer-destructuring': 'off',
			'@typescript-eslint/no-unnecessary-type-parameters': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
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
