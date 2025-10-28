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

const setupAuthGuard = (
	router: Router,
	keycloak: { authenticated?: boolean },
): void => {
	router.beforeEach((to, _from, next) => {
		const isAuthenticated = keycloak.authenticated ?? false;
		if (to.meta.requiresAuth === true && !isAuthenticated) {
			next('/');
		} else {
			next();
		}
	});
};

export { createAppRouter, setupAuthGuard };
