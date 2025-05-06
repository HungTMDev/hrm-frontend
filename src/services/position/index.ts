import { POSITION_API } from '@/constants/api/position.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IPosition } from '@/types';

export const getAllPosition = async () => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IPosition[]>>(POSITION_API.BASE, {
		params: {
			limit: 100,
		},
	});
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};
