import { useAuthStore } from '@/stores/auth.store';
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

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();

	const isLoggedIn = authStore.isLoggedIn;
	const isAuthRoute = to.matched.some((record) => record.meta.requiresAuth);
	const isHR = to.matched.some((record) => record.meta.requiresHR);
	const isAuthForgotPassword = to.matched.some((record) => record.meta.requiresForgotPassword);

	if (isAuthForgotPassword && !authStore.isForgotPassword) {
		next('/auth/forgot-password');
		return;
	}

	if (isAuthRoute && !isLoggedIn) {
		authStore.clearStorage();
		next('/auth');
		return;
	}

	if (isLoggedIn && !isAuthRoute) {
		next('/');
		return;
	}

	if (isHR && !authStore.isHR) {
		next('/not-found');
		return;
	}

	next();
});

export default router;
