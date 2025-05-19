import { useCustomToast } from '@/lib/customToast';
import {
	addParticipant,
	cancelApplicantInterview,
	completeApplicantInterview,
	createInterview,
	removeParticipant,
	sendEmail,
	updateStage,
} from '@/services/recruitment/applicant';
import type { IApplicantInterviewFilter, InterviewPayload } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { applicantKey } from './key';

export const useSendEmail = () => {
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: { email: string; html: string }) =>
			await sendEmail(payload.email, payload.html),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};

export const useUpdateStage = (
	key: string,
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<any>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { id: string; data: { to_stage: string; outcome: string } }) =>
			await updateStage(payload.id, payload.data),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [key, filter.value.stage, pagination, filter],
			});
		},
	});
};

export const useCreateInterview = () => {
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: InterviewPayload) => await createInterview(payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};

export const useCompleteInterview = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantInterviewFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: string) => await completeApplicantInterview(payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, pagination, filter],
			});
		},
	});
};

export const useCancelInterview = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantInterviewFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: string) => await cancelApplicantInterview(payload),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, pagination, filter],
			});
		},
	});
};

export const useAddParticipant = (
	id: Ref<string | undefined>,
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantInterviewFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: {
			interview_id: string;
			participant_id: string;
			role: string;
		}) => {
			const { interview_id, ...data } = payload;
			return await addParticipant(interview_id, data);
		},
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, id],
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, pagination, filter],
			});
		},
	});
};

export const useRemoveParticipant = (
	id: Ref<string | undefined>,
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantInterviewFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { interview_id: string; participant_id: string }) =>
			await removeParticipant(payload.interview_id, payload.participant_id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, id],
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.interview, pagination, filter],
			});
		},
	});
};
