import { useCustomToast } from '@/lib/customToast';
import { sendEmail, updateStage } from '@/services/recruitment/applicant';
import type { IApplicantFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { applicantKey } from './key';

export const useSendEmail = () => {
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: { email: string; html: string }) =>
			await sendEmail(payload.email, payload.html),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};

export const useUpdateStage = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { id: string; data: { to_state: string; outcome: string } }) =>
			await updateStage(payload.id, payload.data),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base, pagination, filter],
			});
		},
	});
};
