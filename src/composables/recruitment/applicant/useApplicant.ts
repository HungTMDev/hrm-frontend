import { useQuery } from '@tanstack/vue-query';
import { applicantKey } from './key';
import { computed, type Ref } from 'vue';
import type { PaginationState } from '@tanstack/vue-table';
import type { IApplicantFilter, IApplicantInterviewFilter } from '@/types';
import {
	getApplicant,
	getApplicantInterview,
	getApplicantInterviewById,
} from '@/services/recruitment/applicant';
import { DATA_TIME } from '@/constants';

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
		retry: false,
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useApplicantInterview = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantInterviewFilter>>,
) => {
	return useQuery({
		queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
		queryFn: async () =>
			await getApplicantInterview({
				page: pagination.value.pageIndex + 1,
				limit: pagination.value.pageSize,
				filter: filter.value,
			}),
		retry: false,
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetApplicantById = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: [applicantKey.base, id],
		queryFn: async () => await getApplicantInterviewById(id.value || ''),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: computed(() => !!id.value),
		gcTime: DATA_TIME.DELETE,
	});
};
