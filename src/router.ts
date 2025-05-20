import { createWebHistory, createRouter } from 'vue-router';
import LandingView from '@/views/LandingView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
	{ path: '/', component: LandingView },
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export { router };
