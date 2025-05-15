import {
	APPLICANT_API,
	CANDIDATE_API,
	NOTIFICATION_API,
} from '@/constants/api/recruitment/applicant.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IApplicantFilter, ICandidate, IFilterRequest } from '@/types';

export const getApplicant = async (filter?: IFilterRequest<Partial<IApplicantFilter>>) => {
	const { data, status } = await axiosClient.get(APPLICANT_API.BASE, {
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

export const sendEmail = async (email: string, html: string) => {
	const { data, status } = await axiosClient.post(NOTIFICATION_API.SEND_EMAIL, { email, html });
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

export const updateStage = async (id: string, payload: { to_state: string; outcome: string }) => {
	const { data, status } = await axiosClient.patch<IApiResponseV1<any>>(
		createApiEndpoint(APPLICANT_API.UPDATE_STAGE, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};
