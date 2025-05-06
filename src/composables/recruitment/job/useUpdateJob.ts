import type { JobPayloadType } from '@/components/recruitments/jobs/job.schema';
import { useCustomToast } from '@/lib/customToast';
import { createJob, deleteJob, updateJob } from '@/services/recruitment/job';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { jobKey } from './key';
import type { Ref } from 'vue';
import type { PaginationState } from '@tanstack/vue-table';
import type { IJobFilter } from '@/types';

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
