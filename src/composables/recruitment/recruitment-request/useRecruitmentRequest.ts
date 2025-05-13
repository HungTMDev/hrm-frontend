import { getAllRecruitmentRequest } from '@/services/recruitment/recruitment-request';
import type { IRecruitmentRequestFilter } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { recruitmentRequestKey } from './key';

export const useRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	return useQuery({
		queryKey: [recruitmentRequestKey.base, pagination, filter],
		queryFn: async () =>
			await getAllRecruitmentRequest({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				filter: filter.value,
			}),
		retry: false,
		staleTime: 1 * 60 * 1000,
		gcTime: 2 * 60 * 1000,
	});
};

export const useListRecruitmentRequest = () => {
	return useQuery({
		queryKey: [recruitmentRequestKey.base, 'list'],
		queryFn: async () =>
			await getAllRecruitmentRequest({
				limit: 100,
			}),
		retry: false,
		staleTime: 3 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
};
