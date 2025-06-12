import type { ContractDetailPayload } from '@/components/employee/all-employee/employee-detail/contract-detail-tab/schema';
import type { InsuranceInformationPayload } from '@/components/employee/all-employee/employee-detail/insurance-information-tab/schema';
import type { SalaryInformationPayload } from '@/components/employee/all-employee/employee-detail/salary-information-tab/schema';
import type {
	BankInformationPayload,
	CreateEmployeePayload,
	PersonalInformationPayload,
	WorkInformationPayload,
} from '@/components/employee/all-employee/employee.schema';
import { EMPLOYEE_API } from '@/constants/api/employee.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type {
	IApiResponseV1,
	IBankInformation,
	IContractDetails,
	IEmployee,
	IEmployeeFilter,
	IFilterRequest,
	IInsuranceInformation,
	IPersonalInformation,
	ISalaryInformation,
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

export const createWorkInformation = async (
	employeeId: string,
	payload: WorkInformationPayload,
) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.WORK_INFORMATION, employeeId),
		payload,
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

export const getSalaryInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<ISalaryInformation>>(
		createApiEndpoint(EMPLOYEE_API.SALARY, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editSalaryInformation = async (
	employeeId: string,
	id: string,
	payload: SalaryInformationPayload,
) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.SALARY_BY_ID, employeeId, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createSalaryInformation = async (
	employeeId: string,
	payload: SalaryInformationPayload,
) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.SALARY, employeeId),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getSalaryHistory = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<ISalaryInformation[]>>(
		createApiEndpoint(EMPLOYEE_API.SALARY_HISTORY, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getContractDetails = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IContractDetails[]>>(
		createApiEndpoint(EMPLOYEE_API.CONTRACT_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createContractInformation = async (
	employeeId: string,
	payload: ContractDetailPayload,
) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.CONTRACT_INFORMATION, employeeId),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getInsuranceInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IInsuranceInformation[]>>(
		createApiEndpoint(EMPLOYEE_API.INSURANCE_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editInsuranceInformation = async (
	employeeId: string,
	id: string,
	payload: InsuranceInformationPayload,
) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.INSURANCE_INFORMATION_BY_ID, employeeId, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createInsuranceInformation = async (
	employeeId: string,
	payload: InsuranceInformationPayload,
) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.INSURANCE_INFORMATION, employeeId),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getBankInformation = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IBankInformation>>(
		createApiEndpoint(EMPLOYEE_API.BANK_INFORMATION, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createBankInformation = async (
	employeeId: string,
	payload: BankInformationPayload,
) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.BANK_INFORMATION, employeeId),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editBankInformation = async (
	employeeId: string,
	id: string,
	payload: BankInformationPayload,
) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.BANK_INFORMATION_BY_ID, employeeId, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createEmployee = async (payload: CreateEmployeePayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(EMPLOYEE_API.BASE, payload);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const deleteEmployee = async (id: string) => {
	const { data, status } = await axiosClient.delete<IApiResponseV1<any>>(
		createApiEndpoint(EMPLOYEE_API.BY_ID, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};
