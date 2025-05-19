import { useCustomToast } from '@/lib/customToast';
import {
	approveRecruitmentRequest,
	createRecruitmentRequest,
	editRecruitmentRequest,
	rejectRecruitmentRequest,
	submitRecruitmentRequest,
} from '@/services/recruitment/recruitment-request';
import type { IRecruitmentRequestFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { recruitmentRequestKey } from './key';
import type { RecruitmentRequestPayload } from '@/components/recruitments/recruitment-request/recruitment-request.schema';

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
		mutationFn: async (payload: { id: string; reason: string }) =>
			await rejectRecruitmentRequest(payload.id, payload.reason),
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

export const useCreateRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: RecruitmentRequestPayload) =>
			await createRecruitmentRequest(payload),
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

export const useEditRecruitmentRequest = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IRecruitmentRequestFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { id: string; data: RecruitmentRequestPayload }) =>
			await editRecruitmentRequest(payload.id, payload.data),
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
