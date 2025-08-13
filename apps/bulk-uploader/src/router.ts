import { createWebHistory, createRouter } from 'vue-router';
import LandingView from './views/LandingView.vue';
import NotFoundView from './views/NotFoundView.vue';
import type { Router } from 'vue-router';
import BulkUploadsView from './views/BulkUploadsView.vue';
import BulkUploadView from './views/BulkUploadView.vue';

const routes = [
	{ path: '/', component: LandingView },
	{ path: '/bulk-uploads', component: BulkUploadsView },
	{ path: '/bulk-uploads/:id', component: BulkUploadView },
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = (): Router =>
	createRouter({
		history: createWebHistory(),
		routes,
	});

export { initRouter };
