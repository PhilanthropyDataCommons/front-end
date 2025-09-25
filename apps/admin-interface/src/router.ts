import { createWebHistory, createRouter } from 'vue-router';
import LandingView from './views/LandingView.vue';
import NotFoundView from './views/NotFoundView.vue';
import type { Router } from 'vue-router';
import BaseFieldsView from './views/BaseFieldsView.vue';
import EditBaseFieldView from './views/EditBaseFieldView.vue';
import AddBaseFieldView from './views/AddBaseFieldView.vue';
const routes = [
	{ path: '/', component: LandingView },
	{ path: '/basefields', component: BaseFieldsView },
	{ path: '/basefields/:shortCode', component: EditBaseFieldView },
	{ path: '/basefields/add', component: AddBaseFieldView },
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = (): Router =>
	createRouter({
		history: createWebHistory(),
		routes,
	});

export { initRouter };
