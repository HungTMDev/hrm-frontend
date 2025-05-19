import { useCustomToast } from '@/lib/customToast';
import { deleteCandidate } from '@/services/recruitment/applicant';
import type { ICandidateFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { talentPoolKey } from './key';

export const useDeleteTalentPool = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<ICandidateFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteCandidate(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});

			queryClient.invalidateQueries({
				queryKey: [talentPoolKey.base, pagination, filter],
			});
		},
		onError: () => {
			return;
		},
	});
};
