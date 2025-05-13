import { useQuery } from '@tanstack/vue-query';
import { applicantKey } from './key';
import type { Ref } from 'vue';
import type { PaginationState } from '@tanstack/vue-table';
import type { IApplicantFilter } from '@/types';
import { getApplicant } from '@/services/recruitment/applicant';

export const useApplicant = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	return useQuery({
		queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
		queryFn: async () =>
			await getApplicant({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				filter: filter.value,
			}),
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
		retry: false,
	});
};
