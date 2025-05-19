import { talentPoolKey } from '@/composables/recruitment/talent-pool/key';
import { DATA_TIME } from '@/constants';
import { getCandidates } from '@/services/recruitment/talent-pool';
import type { ICandidateFilter } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';

export const useTalentPool = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<ICandidateFilter>>,
) => {
	return useQuery({
		queryKey: [talentPoolKey.base, pagination, filter],
		queryFn: async () =>
			await getCandidates({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				...filter.value,
			}),
		staleTime: DATA_TIME.TABLE,
		retry: false,
		gcTime: DATA_TIME.DELETE,
	});
};
