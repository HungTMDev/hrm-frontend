import type { ContractDetailPayload } from '@/components/employee/all-employee/employee-detail/contract-detail-tab/schema';
import type { InsuranceInformationPayload } from '@/components/employee/all-employee/employee-detail/insurance-information-tab/schema';
import type { SalaryInformationPayload } from '@/components/employee/all-employee/employee-detail/salary-information-tab/schema';
import type {
	BankInformationPayload,
	CreateEmployeePayload,
	PersonalInformationPayload,
	WorkInformationPayload,
} from '@/components/employee/all-employee/employee.schema';
import {
	createBankInformation,
	createContractInformation,
	createEmployee,
	createInsuranceInformation,
	createSalaryInformation,
	createWorkInformation,
	deleteEmployee,
	editBankInformation,
	editInsuranceInformation,
	editPersonalInformation,
	editSalaryInformation,
	editWorkInformation,
} from '@/services/employee';
import { useMutation } from '@tanstack/vue-query';

export const useEditPersonalInformation = () => {
	return useMutation({
		mutationFn: async (payload: { id: string; payload: PersonalInformationPayload }) =>
			await editPersonalInformation(payload.id, payload.payload),
	});
};

export const useEditWorkInformation = () => {
	return useMutation({
		mutationFn: async (payload: {
			employeeId: string;
			id: string;
			payload: WorkInformationPayload;
		}) => await editWorkInformation(payload.employeeId, payload.id, payload.payload),
	});
};

export const useEditInsuranceInformation = () => {
	return useMutation({
		mutationFn: async (payload: {
			employeeId: string;
			id: string;
			payload: InsuranceInformationPayload;
		}) => await editInsuranceInformation(payload.employeeId, payload.id, payload.payload),
	});
};

export const useEditBankInformation = () => {
	return useMutation({
		mutationFn: async (payload: {
			employeeId: string;
			id: string;
			payload: BankInformationPayload;
		}) => await editBankInformation(payload.employeeId, payload.id, payload.payload),
	});
};

export const useCreateEmployee = () => {
	return useMutation({
		mutationFn: async (payload: CreateEmployeePayload) => await createEmployee(payload),
	});
};

export const useEditSalaryDetails = () => {
	return useMutation({
		mutationFn: async (payload: {
			employeeId: string;
			id: string;
			payload: SalaryInformationPayload;
		}) => await editSalaryInformation(payload.employeeId, payload.id, payload.payload),
	});
};

export const useDeleteEmployee = () => {
	return useMutation({
		mutationFn: async (id: string) => await deleteEmployee(id),
	});
};

export const useCreateWorkInformation = () => {
	return useMutation({
		mutationFn: async (payload: { employeeId: string; payload: WorkInformationPayload }) =>
			await createWorkInformation(payload.employeeId, payload.payload),
	});
};

export const useCreateContractInformation = () => {
	return useMutation({
		mutationFn: async (payload: { employeeId: string; payload: ContractDetailPayload }) =>
			await createContractInformation(payload.employeeId, payload.payload),
	});
};

export const useCreateSalaryInformation = () => {
	return useMutation({
		mutationFn: async (payload: { employeeId: string; payload: SalaryInformationPayload }) =>
			await createSalaryInformation(payload.employeeId, payload.payload),
	});
};

export const useCreateInsuranceInformation = () => {
	return useMutation({
		mutationFn: async (payload: { employeeId: string; payload: InsuranceInformationPayload }) =>
			await createInsuranceInformation(payload.employeeId, payload.payload),
	});
};

export const useCreateBankInformation = () => {
	return useMutation({
		mutationFn: async (payload: { employeeId: string; payload: BankInformationPayload }) =>
			await createBankInformation(payload.employeeId, payload.payload),
	});
};
