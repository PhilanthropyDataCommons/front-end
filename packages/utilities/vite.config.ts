import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
	plugins: [vue()],
	envDir: path.resolve(__dirname, '../../'),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
