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
			// Unicode regex literals are exclusive to ES2024+. For the time being we are still targeting ES2022
			'require-unicode-regexp': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-useless-default-assignment': 'off',
		},
	},
	{
		files: ['**/*.vue'],
		rules: {
			// Vue templates expect assignment to variables which then appear unused
			// to eslint
			'no-useless-assignment': 'off',

			// Vue's `ref<T>(value: T)` overload preserves literal narrowing of the
			// initializer, so `ref(1)` yields `Ref<1>` and `ref('hours')` yields
			// `Ref<'hours'>` — explicit type arguments are load-bearing for reassignment.
			'@typescript-eslint/no-unnecessary-type-arguments': 'off',
		},
	},
	{
		files: ['**/*.stories.*'],
		rules: {
			'import/no-anonymous-default-export': 'off',
			'import/no-default-export': 'off',
		},
	},
	{
		files: ['apps/**'],
		rules: {
			'import/no-extraneous-dependencies': [
				1,
				{
					devDependencies: true,
					packageDir: ['.', '../..'],
				},
			],
		},
	},
	eslintConfigPrettier
);
