import type { Decorator } from '@storybook/vue3';
import { getCurrentInstance } from 'vue';
import {
	createRouter,
	createWebHashHistory,
	type Router,
	type RouteLocationNormalizedLoaded,
} from 'vue-router';

type MockRouter = Router & { isMocked?: boolean };
type MockRoute = RouteLocationNormalizedLoaded & { isMocked?: boolean };

function withVueRouter(): Decorator {
	return () => ({
		setup() {
			/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
			const { app } = getCurrentInstance()!.appContext;
			let router;

			const existingRouter = app.config.globalProperties.$router as MockRouter;
			const existingRoute = app.config.globalProperties.$route as MockRoute;
			if (
				(!existingRouter || existingRouter.isMocked === true) &&
				(!existingRoute || existingRoute.isMocked === true)
			) {
				router = createRouter({
					history: createWebHashHistory(),
					routes: [],
				});
				app.use(router);
			} else {
				router = existingRouter;
			}
		},
		template: '<story/>',
	});
}
export { withVueRouter };
