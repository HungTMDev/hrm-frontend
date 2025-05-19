import { USER_API } from '@/constants/api/user.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IFilterRequest, IUser, IUserFilter } from '@/types';

export const getUser = async (filter?: IFilterRequest<Partial<IUserFilter>>) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IUser[]>>(USER_API.BASE, {
		params: {
			page: filter?.page,
			limit: filter?.limit,
			...filter?.filter,
		},
	});

	if (status >= 400) {
		throw new Error();
	}

	return data;
};
