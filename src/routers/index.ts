import { createRouter, createWebHistory } from 'vue-router';
import { webRoutes } from './web.route';

const routes = [
	...webRoutes,
	{
		path: '/:catchAll(.*)',
		name: '404 NotFound',
		component: () => import('@/pages/error/_404.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'isActive',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

export default router;
