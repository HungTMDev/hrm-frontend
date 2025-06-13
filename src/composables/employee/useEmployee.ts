import { DATA_TIME } from '@/constants';
import {
	getBankInformation,
	getContractDetails,
	getEmployee,
	getInsuranceInformation,
	getPersonalInformation,
	getSalaryHistory,
	getSalaryInformation,
	getWorkInformation,
} from '@/services/employee';
import type { IEmployee, IEmployeeFilter } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import { type Ref } from 'vue';
import { employeeKey } from './key';

export const useEmployee = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IEmployeeFilter>>,
) => {
	return useQuery({
		queryKey: [employeeKey.base, pagination, filter],
		queryFn: async () =>
			await getEmployee({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				filter: filter.value,
			}),
		retry: false,
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useListEmployee = (isGetAll: Ref<boolean>) => {
	return useQuery({
		queryKey: [employeeKey.base, 'list'],
		queryFn: async () => {
			const list: IEmployee[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getEmployee({
					page,
					limit: 100,
				});

				list.push(...data.data);

				page = data.meta.current_page + 1;
				nextPage = data.meta.has_next_page;
			} while (nextPage);

			return list;
		},
		retry: false,
		enabled: isGetAll,
		gcTime: 60 * 1000,
	});
};

export const useGetPersonalInformation = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.personal, employeeId],
		queryFn: async () => await getPersonalInformation(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetWorkInformation = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.work, employeeId],
		queryFn: async () => await getWorkInformation(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetSalaryInformation = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.salary, employeeId],
		queryFn: async () => await getSalaryInformation(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetSalaryHistory = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.salary_history, employeeId],
		queryFn: async () => await getSalaryHistory(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetContractDetails = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.contract, employeeId],
		queryFn: async () => await getContractDetails(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetInsuranceInformation = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.insurance, employeeId],
		queryFn: async () => await getInsuranceInformation(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetBankInformation = (employeeId: Ref<string>) => {
	return useQuery({
		queryKey: [employeeKey.bank, employeeId],
		queryFn: async () => await getBankInformation(employeeId.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};
