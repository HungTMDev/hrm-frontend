import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { jobKey } from './key';
import type { IJobFilter } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import { getJob } from '@/services/recruitment/job';

export const useJob = (pagination: Ref<PaginationState>, filter: Ref<Partial<IJobFilter>>) => {
	return useQuery({
		queryKey: [jobKey.base, pagination, filter],
		queryFn: async () =>
			await getJob({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				filter: filter.value,
			}),
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
};
