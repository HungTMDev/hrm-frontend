import type { JobPayloadType } from '@/components/recruitments/jobs/job.schema';
import { useCustomToast } from '@/lib/customToast';
import {
	createJob,
	deleteJob,
	updateJob,
	updateJobStatus,
	uploadApplicantForJob,
} from '@/services/recruitment/job';
import type { IApplicantFilter, IJobFilter } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { jobKey } from './key';

export const useCreateJob = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IJobFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: JobPayloadType) => await createJob(payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});

			queryClient.invalidateQueries({
				queryKey: [jobKey.base, pagination, filter],
			});
		},
		onError: () => {
			return;
		},
	});
};

export const useUpdateJob = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IJobFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { id: string; payload: JobPayloadType }) =>
			await updateJob(data.id, data.payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [jobKey.base, pagination, filter],
			});
		},
	});
};

export const useUpdateJobStatus = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IJobFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { id: string; status: string }) =>
			await updateJobStatus(data.id, data.status),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [jobKey.base, pagination, filter],
			});
		},
	});
};

export const useDeleteJob = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IJobFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteJob(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [jobKey.base, pagination, filter],
			});
		},
	});
};

export const useUpLoadApplicantForJob = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: { job_id: string; file: File }) =>
			await uploadApplicantForJob(payload.job_id, payload.file),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [jobKey.base, , filter.value.stage, pagination, filter],
			});
		},
	});
};
