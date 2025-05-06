import { useCustomToast } from '@/lib/customToast';
import {
	approveRecruitmentRequest,
	rejectRecruitmentRequest,
	submitRecruitmentRequest,
} from '@/services/recruitment/recruitment-request';
import type { IRecruitmentRequestFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { recruitmentRequestKey } from './key';

export const useSubmitRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await submitRecruitmentRequest(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [recruitmentRequestKey.base, pagination, filter],
			});
		},
	});
};

export const useApproveRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await approveRecruitmentRequest(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [recruitmentRequestKey.base, pagination, filter],
			});
		},
	});
};

export const useRejectRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await rejectRecruitmentRequest(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [recruitmentRequestKey.base, pagination, filter],
			});
		},
	});
};
