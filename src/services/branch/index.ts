import { BRANCH_API } from '@/constants/api/branch.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IBranch } from '@/types';

export const getAllBranch = async () => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IBranch[]>>(BRANCH_API.BASE);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};
