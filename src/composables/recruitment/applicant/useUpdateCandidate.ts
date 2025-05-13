import { useCustomToast } from '@/lib/customToast';
import { deleteCandidate } from '@/services/recruitment/applicant';
import type { IApplicantFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { applicantKey } from './key';

export const useDeleteCandidate = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteCandidate(id),
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
