import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [react()],
	server: {
		port: Number.parseInt(process.env.PORT ?? '3000'),
		host: process.env.HOST ?? 'localhost',
	},
	test: {
		environment: 'jsdom',
	},
}));
