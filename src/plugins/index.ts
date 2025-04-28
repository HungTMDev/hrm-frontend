import axios from 'axios';
import { axiosConfig } from '@/plugins/axiosConfig.ts';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/routers';
import type { IApiResponseV1, ITokenResponse } from '@/types';
import { useCustomToast } from '@/lib/customToast';

NProgress.configure({ showSpinner: false });

const axiosClient = axios.create({
	baseURL: axiosConfig.baseURL,
});

axiosClient.interceptors.request.use(
	function (config) {
		NProgress.start();
		config.headers['Content-Type'] = 'application/json';
		config.headers['Accept'] = 'application/json';
		config.headers['Access-Control-Allow-Origin'] = '*';

		const accessToken = localStorage.getItem(axiosConfig.key.accessToken);
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

const isAllowRefreshToken = (error: any) => {
	return (
		error.response &&
		!error.config._retry &&
		axiosConfig.retryStatusCodes.includes(error.response.status) &&
		!error.config?.url?.includes('/login') &&
		!error.config?.url?.includes('/refresh-token')
	);
};

const refreshToken = async () => {
	const authStore = useAuthStore();
	const refresh_token = localStorage.getItem(axiosConfig.key.refreshToken);

	const { data, status } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
		axiosConfig.path.refreshToken,
		{
			refresh_token,
		},
	);

	if (status >= 400) {
		authStore.clearLocalStorage();
		router.push('/auth');
		return false;
	}

	const token = data.data;
	authStore.setToken(token.access_token, token.refresh_token);
	return true;
};

axiosClient.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	async (error) => {
		if (isAllowRefreshToken(error)) {
			const originalRequest = error.config;
			const authStore = useAuthStore();

			originalRequest._retry = true;

			const isSuccess = await refreshToken();
			if (isSuccess) {
				axiosClient.defaults.headers.common['Authorization'] =
					`Bearer ${authStore.access_token}`;
				return axiosClient(originalRequest);
			}

			authStore.clearLocalStorage();
			router.push('/auth');
		}

		const { showToast } = useCustomToast();
		showToast({
			message: error.response.data.message,
			type: 'error',
		});

		NProgress.done();
		return error.response;
	},
);
export default axiosClient;
