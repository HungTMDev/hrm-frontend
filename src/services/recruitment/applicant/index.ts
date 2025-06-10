import type { CreateUserPayload } from '@/components/recruitments/applicants/hired-tab/schema';
import type { InterviewerFeedbackPayload } from '@/components/recruitments/applicants/interview-tab/schema';
import type { AddApplicantPayload } from '@/components/recruitments/applicants/screening-tab/schema';
import {
	APPLICANT_API,
	CANDIDATE_API,
	INTERVIEW_API,
	NOTIFICATION_API,
} from '@/constants/api/recruitment/applicant.api';
import { JOB_API } from '@/constants/api/recruitment/job.api';
import { USER_API } from '@/constants/api/user.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type {
	IApiResponseV1,
	IApplicant,
	IApplicantFilter,
	IApplicantInterview,
	IApplicantInterviewFilter,
	ICandidate,
	IFilterRequest,
	IInterviewFeedback,
	InterviewPayload,
} from '@/types';

export const getApplicant = async (filter?: IFilterRequest<Partial<IApplicantFilter>>) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplicant[]>>(
		APPLICANT_API.BASE,
		{
			params: {
				page: filter?.page,
				limit: filter?.limit,
				...filter?.filter,
			},
		},
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const createApplicant = async (payload: AddApplicantPayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		APPLICANT_API.BASE,
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const editApplicant = async (id: string, payload: AddApplicantPayload) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(APPLICANT_API.BY_ID, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const deleteApplicant = async (id: string) => {
	const { data, status } = await axiosClient.delete(createApiEndpoint(APPLICANT_API.BY_ID, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const getApplicantById = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplicant>>(
		createApiEndpoint(APPLICANT_API.BY_ID, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const sendEmail = async (email: string, content: string, subject: string) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		NOTIFICATION_API.SEND_EMAIL,
		{
			email,
			content,
			subject,
		},
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const getCandidate = async (payload: { page: number; limit: number }) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<ICandidate[]>>(
		CANDIDATE_API.BASE,
		{
			params: payload,
		},
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const deleteCandidate = async (id: string) => {
	const { data, status } = await axiosClient.delete(createApiEndpoint(CANDIDATE_API.BY_ID, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const updateStage = async (id: string, payload: { to_stage: string; outcome: string }) => {
	const { data, status } = await axiosClient.patch<IApiResponseV1<IApplicant>>(
		createApiEndpoint(APPLICANT_API.UPDATE_STAGE, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createInterview = async (payload: InterviewPayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		INTERVIEW_API.BASE,
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getInterviewByApplicantId = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplicantInterview[]>>(
		createApiEndpoint(APPLICANT_API.APPLICANT_INTERVIEW, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getApplicantInterview = async (
	filter?: IFilterRequest<Partial<IApplicantInterviewFilter>>,
) => {
	const { data, status } = await axiosClient.get(INTERVIEW_API.BASE, {
		params: {
			page: filter?.page,
			limit: filter?.limit,
			...filter?.filter,
		},
	});
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const getApplicantInterviewById = async (id: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplicantInterview>>(
		createApiEndpoint(INTERVIEW_API.BY_ID, id),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const completeApplicantInterview = async (id: string) => {
	const { data, status } = await axiosClient.patch(createApiEndpoint(INTERVIEW_API.COMPLETE, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const cancelApplicantInterview = async (id: string) => {
	const { data, status } = await axiosClient.patch(createApiEndpoint(INTERVIEW_API.CANCEL, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const addParticipant = async (
	interviewId: string,
	payload: { participant_id: string; role: string },
) => {
	const { data, status } = await axiosClient.post(
		createApiEndpoint(INTERVIEW_API.PARTICIPANTS, interviewId),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const removeParticipant = async (participantId: string, interviewId: string) => {
	const { data, status } = await axiosClient.delete(
		createApiEndpoint(INTERVIEW_API.DELETE_PARTICIPANT, participantId, interviewId),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const createInterviewFeedback = async (id: string, payload: InterviewerFeedbackPayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		createApiEndpoint(INTERVIEW_API.FEEDBACK, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const getApplicantByJobId = async (jobId: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IApplicant[]>>(
		createApiEndpoint(JOB_API.APPLICANTS, jobId),
	);

	if (status >= 400) {
		throw new Error();
	}

	return data.data;
};

export const getFeedback = async (interviewId: string) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IInterviewFeedback[]>>(
		createApiEndpoint(INTERVIEW_API.FEEDBACK, interviewId),
	);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};

export const createUser = async (payload: CreateUserPayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(USER_API.BASE, payload);
	if (status >= 400) {
		throw new Error();
	}
	return data.data;
};
