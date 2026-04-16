import LandingView from './views/LandingView.vue';
import NotFoundView from './views/NotFoundView.vue';
import type { Router } from 'vue-router';
import BulkUploadsView from './views/bulk-upload/BulkUploadsView.vue';
import BulkUploadView from './views/bulk-upload/BulkUploadView.vue';
import AddDataView from './views/bulk-upload/AddDataView.vue';
import PermissionsView from './views/permissions/PermissionsView.vue';
import AddPermissionView from './views/permissions/AddPermissionView.vue';
import EditPermissionView from './views/permissions/EditPermissionView.vue';
import { createAppRouter } from '@pdc/utilities';
const routes = [
	{ path: '/', component: LandingView },
	{
		path: '/bulk-uploads',
		component: BulkUploadsView,
		meta: { requiresAuth: true },
	},
	{
		path: '/bulk-uploads/add',
		component: AddDataView,
		meta: { requiresAuth: true },
	},
	{
		path: '/bulk-uploads/:id',
		component: BulkUploadView,
		meta: { requiresAuth: true },
	},
	{
		path: '/permissions',
		component: PermissionsView,
		meta: { requiresAuth: true },
	},
	{
		path: '/permissions/add',
		component: AddPermissionView,
		meta: { requiresAuth: true },
	},
	{
		path: '/permissions/:id',
		component: EditPermissionView,
		meta: { requiresAuth: true },
	},
	{ path: '/:pathMatch(.*)', component: NotFoundView },
];

const initRouter = (): Router => createAppRouter(routes);

export { initRouter };
