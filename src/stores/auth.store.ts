import axiosClient from '@/plugins';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { axiosConfig } from '@/plugins/axiosConfig.ts';
import { AUTH_API } from '@/constants/api/auth.api';

export const useAuthStore = defineStore('auth-store', () => {
	//defineState
	const isLoading = ref(false);
	const access_token = ref<string>(
		sessionStorage.getItem(axiosConfig.key.accessToken) ||
			localStorage.getItem(axiosConfig.key.accessToken) ||
			'',
	);
	const refresh_token = ref<string>(
		sessionStorage.getItem(axiosConfig.key.refreshToken) ||
			localStorage.getItem(axiosConfig.key.refreshToken) ||
			'',
	);
	const forgot_password_token = ref<string | undefined>();

	//defineGetters
	const isLoggedIn = computed(() => access_token.value !== '' && refresh_token.value !== '');
	const isForgotPassword = computed(() => forgot_password_token.value !== undefined);

	const clearLocalStorage = () => {
		localStorage.removeItem(axiosConfig.key.accessToken);
		localStorage.removeItem(axiosConfig.key.refreshToken);
		localStorage.removeItem(axiosConfig.key.account);

		access_token.value = '';
		refresh_token.value = '';
	};

	const clearStorage = () => {
		localStorage.removeItem(axiosConfig.key.accessToken);
		localStorage.removeItem(axiosConfig.key.refreshToken);
		localStorage.removeItem(axiosConfig.key.account);

		sessionStorage.removeItem(axiosConfig.key.account);
		sessionStorage.removeItem(axiosConfig.key.accessToken);
		sessionStorage.removeItem(axiosConfig.key.refreshToken);

		access_token.value = '';
		refresh_token.value = '';
	};

	const setToken = (accessToken: string, refreshToken: string, remember?: boolean) => {
		access_token.value = accessToken;
		refresh_token.value = refreshToken;
		if (!remember) {
			sessionStorage.setItem(axiosConfig.key.accessToken, accessToken);
			sessionStorage.setItem(axiosConfig.key.refreshToken, refreshToken);
			return;
		}
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
		setToken,
		clearStorage,
		clearLocalStorage,
		forgotPassword,
		verifyCode,
		resetPassword,
	};
});
