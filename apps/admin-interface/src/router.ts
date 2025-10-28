import LandingView from './views/LandingView.vue';
import NotFoundView from './views/NotFoundView.vue';
import type { Router } from 'vue-router';
import BaseFieldsView from './views/BaseFieldsView.vue';
import EditBaseFieldView from './views/EditBaseFieldView.vue';
import AddBaseFieldView from './views/AddBaseFieldView.vue';
import { createAppRouter } from '@pdc/utilities';
const routes = [
	{ path: '/', component: LandingView },
	{
		path: '/basefields',
		component: BaseFieldsView,
		meta: { requiresAuth: true },
	},
	{
		path: '/basefields/:shortCode',
		component: EditBaseFieldView,
		meta: { requiresAuth: true },
	},
	{
		path: '/basefields/add',
		component: AddBaseFieldView,
		meta: { requiresAuth: true },
	},
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = (): Router => createAppRouter(routes);

export { initRouter };
