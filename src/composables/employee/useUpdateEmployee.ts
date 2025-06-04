import type {
	PersonalInformationPayload,
	WorkInformationPayload,
} from '@/components/employee/all-employee/employee.schema';
import { editPersonalInformation, editWorkInformation } from '@/services/employee';
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
