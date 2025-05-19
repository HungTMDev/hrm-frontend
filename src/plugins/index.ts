import { AUTH_API } from '@/constants/api/auth.api';
import { useCustomToast } from '@/lib/customToast';
import { axiosConfig } from '@/plugins/axiosConfig.ts';
import router from '@/routers';
import { useAuthStore } from '@/stores/auth.store';
import type { IApiResponseV1, ITokenResponse } from '@/types';
import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });
const { showToast } = useCustomToast();

const axiosClient = axios.create({
	baseURL: axiosConfig.baseURL,
});

// Biến để theo dõi trạng thái đang refresh token
let isRefreshing = false;
// Queue để lưu các request đang chờ refresh token hoàn tất
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

axiosClient.interceptors.request.use(
	function (config) {
		NProgress.start();
		if (!(config.data instanceof FormData)) {
			config.headers['Content-Type'] = 'application/json';
		}
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
	const refresh_token =
		sessionStorage.getItem(axiosConfig.key.refreshToken) ||
		localStorage.getItem(axiosConfig.key.refreshToken);

	if (!refresh_token) {
		authStore.clearStorage();
		router.push('/auth');
		return false;
	}

	try {
		const { data } = await axios.post<IApiResponseV1<ITokenResponse>>(
			`${axiosConfig.baseURL}${AUTH_API.REFRESH_TOKEN}`,
			{
				refresh_token,
			},
		);

		const token = data.data;
		authStore.setToken(token.access_token, token.refresh_token, true);
		return true;
	} catch (error) {
		authStore.clearStorage();
		router.push('/auth');
		return false;
	}
};

axiosClient.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	async (error) => {
		NProgress.done();
		const originalRequest = error.config;

		if (isAllowRefreshToken(error)) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers['Authorization'] = `Bearer ${token}`;
						return axiosClient(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const isSuccess = await refreshToken();
				if (isSuccess) {
					const newToken = localStorage.getItem(axiosConfig.key.accessToken);
					axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
					processQueue(null, newToken);
					return axiosClient(originalRequest);
				}
			} catch (refreshError) {
				processQueue(refreshError, null);
				const authStore = useAuthStore();
				authStore.clearStorage();
				router.push('/auth');
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		if (error.response) {
			const errorMessage =
				error.response?.data?.error?.details?.[0]?.message ||
				error.response?.data?.error?.message ||
				error.message;

			if (error.response.status !== 401) {
				showToast({
					message: errorMessage,
					type: 'error',
				});
			}
		}

		return Promise.reject(error);
	},
);

export default axiosClient;
