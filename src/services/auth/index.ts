import { AUTH_API } from '@/constants/api/auth.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, ITokenResponse } from '@/types';

export const login = async (payload: { email: string; password: string }) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<ITokenResponse>>(
		AUTH_API.LOGIN,
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}

	return data.data;
};

export const logout = async () => {
	const { status } = await axiosClient.post(AUTH_API.LOGOUT);

	if (status >= 400) {
		throw new Error();
	}

	return;
};
