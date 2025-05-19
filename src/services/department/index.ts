import { DEPARTMENT_API } from '@/constants/api/department.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IDepartment } from '@/types';

export const getAllDepartment = async () => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IDepartment[]>>(
		DEPARTMENT_API.BASE,
	);
	if (status >= 400) {
		return;
	}
	return data.data;
};
