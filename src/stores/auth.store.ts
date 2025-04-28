import axiosClient from '@/plugins';
import type { IApiResponseV1, ITokenResponse } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { axiosConfig } from '@/plugins/axiosConfig.ts';
import { AUTH_API } from '@/constants/api/auth.api';

export const useAuthStore = defineStore('auth-store', () => {
	//defineState
	const isLoading = ref(false);
	const access_token = ref<string>(localStorage.getItem(axiosConfig.key.accessToken) || '');
	const refresh_token = ref<string>(localStorage.getItem(axiosConfig.key.refreshToken) || '');
	const forgot_password_token = ref<string | undefined>();

	//defineGetters
	const isLoggedIn = computed(() => access_token.value !== '' && refresh_token.value !== '');
	const isForgotPassword = computed(() => forgot_password_token.value !== undefined);

	//defineActions
	const login = async (payload: { email: string; password: string }, remember?: boolean) => {
		isLoading.value = true;
		const { data, status } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
			AUTH_API.LOGIN,
			payload,
		);
		if (status >= 400) {
			isLoading.value = false;
			return status;
		}

		access_token.value = data.data.access_token;
		refresh_token.value = data.data.refresh_token;

		sessionStorage.setItem('user_id', data.data.user_id);
		sessionStorage.setItem('access_token', data.data.access_token);
		sessionStorage.setItem('refresh_token', data.data.refresh_token);

		if (remember) {
			localStorage.setItem('access_token', data.data.access_token);
			localStorage.setItem('refresh_token', data.data.refresh_token);
			localStorage.setItem('user_id', data.data.user_id);
		}
		isLoading.value = false;
		return status;
	};

	const logout = async () => {
		const { status } = await axiosClient.post(AUTH_API.LOGOUT);
		if (status >= 400) {
			return status;
		}

		sessionStorage.removeItem('user_id');
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('refresh_token');

		clearLocalStorage();
		return status;
	};

	const clearLocalStorage = () => {
		localStorage.removeItem(axiosConfig.key.accessToken);
		localStorage.removeItem(axiosConfig.key.refreshToken);
		localStorage.removeItem(axiosConfig.key.account);

		access_token.value = '';
		refresh_token.value = '';
	};

	const setToken = (accessToken: string, refreshToken: string) => {
		access_token.value = accessToken;
		refresh_token.value = refreshToken;
		localStorage.setItem(axiosConfig.key.accessToken, accessToken);
		localStorage.setItem(axiosConfig.key.refreshToken, refreshToken);
	};

	const forgotPassword = async (email: string) => {
		const { data, status } = await axiosClient.post(AUTH_API.FORGOT_PASSWORD, { email });
		if (status >= 400) {
			return status;
		}

		forgot_password_token.value = data.data.token;
		return status;
	};

	const verifyCode = async (code: string): Promise<number> => {
		const { status } = await axiosClient.post(AUTH_API.VERIFY_PINCODE, {
			pin_code: code,
			token: forgot_password_token.value,
		});
		if (status >= 400) {
			return status;
		}
		return status;
	};

	const resetPassword = async (password: string, confirm_password: string): Promise<number> => {
		const { status } = await axiosClient.post(AUTH_API.RESET_PASSWORD, {
			password,
			confirm_password,
			token: forgot_password_token.value,
		});

		if (status >= 400) {
			return status;
		}

		return status;
	};

	return {
		isLoading,
		isLoggedIn,
		access_token,
		refresh_token,
		isForgotPassword,
		forgot_password_token,
		login,
		logout,
		setToken,
		clearLocalStorage,
		forgotPassword,
		verifyCode,
		resetPassword,
	};
});
