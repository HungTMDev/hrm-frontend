import type { CreateEmployeeFromApplicantPayload } from '@/components/recruitments/applicants/hired-tab/schema';
import type { InterviewerFeedbackPayload } from '@/components/recruitments/applicants/interview-tab/schema';
import type { AddApplicantPayload } from '@/components/recruitments/applicants/screening-tab/schema';
import { useCustomToast } from '@/lib/customToast';
import {
	addParticipant,
	cancelApplicantInterview,
	completeApplicantInterview,
	createApplicant,
	createEmployeeFromApplicant,
	createInterview,
	createInterviewFeedback,
	deleteApplicant,
	editApplicant,
	rejectManyApplicant,
	removeParticipant,
	sendEmail,
	undoApplicant,
	updateInterview,
	updateStage,
} from '@/services/recruitment/applicant';
import type { IApplicantFilter, IApplicantInterviewFilter, InterviewPayload } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { PaginationState } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { applicantKey } from './key';

export const useCreateApplicant = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const queryClient = useQueryClient();
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: AddApplicantPayload) => await createApplicant(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
			});
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};

export const useEditApplicant = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const queryClient = useQueryClient();
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: { id: string; data: AddApplicantPayload }) =>
			await editApplicant(payload.id, payload.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
			});
			showToast({
				message: 'Success!',
				type: 'success',
			});
		},
	});
};

export const useDeleteApplicant = (
	pagination: Ref<PaginationState>,
	filter: Ref<Partial<IApplicantFilter>>,
) => {
	const { showToast } = useCustomToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteApplicant(id),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
			});
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
			});
		},
	});
};

export const useSendEmail = () => {
	return useMutation({
		mutationFn: async (payload: { email: string; content: string; subject: string }) =>
			await sendEmail(payload.email, payload.content, payload.subject),
	});
};

export const useUpdateStage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { id: string; data: { to_stage: string; outcome: string } }) =>
			await updateStage(payload.id, payload.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [applicantKey.base],
			});
		},
	});
};

export const useCreateInterview = () => {
	return useMutation({
		mutationFn: async (payload: InterviewPayload) => await createInterview(payload),
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
				queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
			});
		},
	});
};

export const useCreateInterviewFeedback = () => {
	const { showToast } = useCustomToast();
	return useMutation({
		mutationFn: async (payload: { id: string; data: InterviewerFeedbackPayload }) =>
			await createInterviewFeedback(payload.id, payload.data),
		onSuccess: () => {
			showToast({
				message: 'Success!',
				type: 'success',
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
				queryKey: [applicantKey.base, filter.value.stage, pagination, filter],
			});
		},
	});
};

export const useAddParticipant = () => {
	return useMutation({
		mutationFn: async (payload: { interview_id: string; participant_id: string; role: string }) => {
			const { interview_id, ...data } = payload;
			return await addParticipant(interview_id, data);
		},
	});
};

export const useRemoveParticipant = () => {
	return useMutation({
		mutationFn: async (payload: { interview_id: string; participant_id: string }) =>
			await removeParticipant(payload.interview_id, payload.participant_id),
	});
};

export const useCreateEmployeeFromApplicant = () => {
	return useMutation({
		mutationFn: async (payload: { id: string; data: CreateEmployeeFromApplicantPayload }) =>
			await createEmployeeFromApplicant(payload.id, payload.data),
	});
};

export const useRejectManyApplicant = () => {
	return useMutation({
		mutationFn: async (payload: string[]) => await rejectManyApplicant(payload),
	});
};

export const useUpdateInterview = () => {
	return useMutation({
		mutationFn: async (payload: { id: string; data: InterviewPayload }) =>
			await updateInterview(payload.id, payload.data),
	});
};

export const useUndoApplicant = () => {
	return useMutation({
		mutationFn: async (id: string) => await undoApplicant(id),
	});
};
