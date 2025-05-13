import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { jobKey } from './key';
import type { IApiResponseV1, IJob, IJobFilter } from '@/types';
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
		retry: false,
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
};

export const useListJob = () => {
	return useQuery({
		queryKey: [jobKey.base, 'list'],
		queryFn: async () => {
			const list: IJob[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getJob({
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
		staleTime: 10 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
};
