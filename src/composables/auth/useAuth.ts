import { DATA_TIME } from '@/constants';
import router from '@/routers';
import { getUser, login, logout } from '@/services/auth';
import { useAuthStore } from '@/stores/auth.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, watchEffect } from 'vue';

export const useLogin = (remember?: boolean) => {
	return useMutation({
		mutationFn: async (payload: { email: string; password: string }) => await login(payload),
		onSuccess: (data) => {
			const authStore = useAuthStore();
			authStore.setToken(data.access_token, data.refresh_token, remember);
			router.push('/');
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationFn: async () => await logout(),
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ['account'],
			});
			authStore.clearStorage();
			router.push('/auth');
		},
	});
};

export const useGetAccount = () => {
	const query = useQuery({
		queryKey: ['account'],
		queryFn: async () => await getUser(),
		enabled: computed(() => !!localStorage.getItem('access_token')),
		retryDelay: 60 * 1000,
		staleTime: DATA_TIME.MORE_CHANGE,
	});

	watchEffect(() => {
		if (query.data.value) {
			localStorage.setItem('account', JSON.stringify(query.data.value));
		}
	});

	return query;
};
