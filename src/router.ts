import { createWebHistory, createRouter } from 'vue-router';
import LandingView from '@/views/LandingView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
	{ path: '/', component: LandingView },
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = () =>
	createRouter({
		history: createWebHistory(),
		routes,
	});

export { initRouter };
