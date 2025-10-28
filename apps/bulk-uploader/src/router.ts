import LandingView from './views/LandingView.vue';
import NotFoundView from './views/NotFoundView.vue';
import type { Router } from 'vue-router';
import BulkUploadsView from './views/BulkUploadsView.vue';
import BulkUploadView from './views/BulkUploadView.vue';
import AddDataView from './views/AddDataView.vue';
import { createAppRouter } from '@pdc/utilities';
const routes = [
	{ path: '/', component: LandingView },
	{ path: '/bulk-uploads', component: BulkUploadsView },
	{ path: '/add-data', component: AddDataView },
	{ path: '/bulk-uploads/:id', component: BulkUploadView },
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = (): Router => createAppRouter(routes);

export { initRouter };
