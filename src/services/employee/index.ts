import type {
	PersonalInformationPayload,
	WorkInformationPayload,
} from '@/components/employee/all-employee/employee.schema';
import { EMPLOYEE_API } from '@/constants/api/employee.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type {
	IApiResponseV1,
	IEmployee,
	IEmployeeFilter,
	IFilterRequest,
	IPersonalInformation,
	IWorkInformation,
} from '@/types';

export const getEmployee = async (filter?: Partial<IFilterRequest<IEmployeeFilter>>) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IEmployee[]>>(EMPLOYEE_API.BASE, {
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

export const getPersonalInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IPersonalInformation>>(
		createApiEndpoint(EMPLOYEE_API.PERSONAL_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editPersonalInformation = async (id: string, payload: PersonalInformationPayload) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.PERSONAL_INFORMATION, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getWorkInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IWorkInformation>>(
		createApiEndpoint(EMPLOYEE_API.WORK_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editWorkInformation = async (
	employeeId: string,
	id: string,
	payload: WorkInformationPayload,
) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.WORK_INFORMATION_BY_ID, employeeId, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getBankInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IPersonalInformation>>(
		createApiEndpoint(EMPLOYEE_API.BANK_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};
