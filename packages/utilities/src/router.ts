import { createWebHistory, createRouter } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth?: boolean;
	}
}

const createAppRouter = (routes: RouteRecordRaw[]): Router =>
	createRouter({
		history: createWebHistory(),
		routes,
	});

export { createAppRouter };
