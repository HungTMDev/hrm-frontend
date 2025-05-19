import router from '@/routers';
import { login, logout } from '@/services/auth';
import { useAuthStore } from '@/stores/auth.store';
import { useMutation } from '@tanstack/vue-query';

export const useLogin = (remember?: boolean) => {
	return useMutation({
		mutationFn: async (payload: { email: string; password: string }) => await login(payload),
		onSuccess: (data) => {
			const authStore = useAuthStore();
			authStore.setToken(data.access_token, data.refresh_token, remember, data.user_id);
			router.push('/');
		},
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: async () => await logout(),
		onSuccess: () => {
			const authStore = useAuthStore();
			authStore.clearStorage();
			router.push('/auth');
		},
	});
};
