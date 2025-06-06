import { useQueries, useQuery } from '@tanstack/vue-query';
import { applicantKey } from './key';
import { computed, type Ref } from 'vue';
import type { PaginationState } from '@tanstack/vue-table';
import type {
	IApplicant,
	IApplicantFilter,
	IApplicantInterview,
	IApplicantInterviewFilter,
} from '@/types';
import {
	getApplicant,
	getApplicantById,
	getApplicantByJobId,
	getApplicantInterview,
	getApplicantInterviewById,
	getFeedback,
	getInterviewByApplicantId,
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

export const useAllApplicant = () => {
	return useQuery({
		queryKey: [applicantKey.base, 'all'],
		queryFn: async (): Promise<IApplicant[]> => {
			const list: IApplicant[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getApplicant({
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
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetApplicantById = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: [applicantKey.base, id],
		queryFn: async () => await getApplicantById(id.value || ''),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: computed(() => !!id.value),
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetInterviewByApplicantId = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: [applicantKey.interview, id],
		queryFn: async () => await getInterviewByApplicantId(id.value || ''),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: computed(() => !!id.value),
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

export const useAllApplicantInterview = () => {
	return useQuery({
		queryKey: [applicantKey.base, 'INTERVIEW', 'all'],
		queryFn: async (): Promise<IApplicantInterview[]> => {
			const list: IApplicantInterview[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getApplicantInterview({
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
		staleTime: DATA_TIME.TABLE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetApplicantInterviewById = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: [applicantKey.base, id],
		queryFn: async () => await getApplicantInterviewById(id.value || ''),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: computed(() => !!id.value),
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetApplicantsByJobId = (id: Ref<string | undefined>) => {
	return useQuery({
		queryKey: [applicantKey.base, id],
		queryFn: async () => await getApplicantByJobId(id.value || ''),
		enabled: computed(() => !!id.value),
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetInterviewFeedback = (id: Ref<string>) => {
	const isEnabled = computed(() => id.value !== '');
	return useQuery({
		queryKey: [applicantKey.feedback, id],
		queryFn: async () => await getFeedback(id.value),
		enabled: isEnabled,
		retry: false,
		staleTime: DATA_TIME.LESS_CHANGE,
		gcTime: DATA_TIME.DELETE,
	});
};

export const useGetListFeedback = (listInterview: Ref<IApplicantInterview[]>) => {
	const queries = computed(() =>
		listInterview.value.map((item) => {
			return {
				queryKey: [applicantKey.feedback, item.id],
				queryFn: () => getFeedback(item.id),
			};
		}),
	);

	return useQueries({
		queries: queries,
	});
};
