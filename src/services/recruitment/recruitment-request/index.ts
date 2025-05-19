import type { RecruitmentRequestPayload } from '@/components/recruitments/recruitment-request/recruitment-request.schema';
import { RECRUITMENT_REQUEST_API } from '@/constants/api/recruitment/recruitment-request.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type {
	IApiResponseV1,
	IFilterRequest,
	IRecruitmentRequest,
	IRecruitmentRequestFilter,
} from '@/types';

export const getAllRecruitmentRequest = async (
	filter?: Partial<IFilterRequest<IRecruitmentRequestFilter>>,
) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IRecruitmentRequest[]>>(
		RECRUITMENT_REQUEST_API.BASE,
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

export const submitRecruitmentRequest = async (id: string) => {
	const { data, status } = await axiosClient.patch(
		createApiEndpoint(RECRUITMENT_REQUEST_API.SUBMIT, id),
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};

export const approveRecruitmentRequest = async (id: string) => {
	const { data, status } = await axiosClient.patch(
		createApiEndpoint(RECRUITMENT_REQUEST_API.APPROVE, id),
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};

export const rejectRecruitmentRequest = async (id: string, reason: string) => {
	const { data, status } = await axiosClient.patch<IApiResponseV1<any>>(
		createApiEndpoint(RECRUITMENT_REQUEST_API.REJECT, id),
		{ comments: reason },
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};

export const createRecruitmentRequest = async (payload: RecruitmentRequestPayload) => {
	const { data, status } = await axiosClient.post<IApiResponseV1<any>>(
		RECRUITMENT_REQUEST_API.BASE,
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const editRecruitmentRequest = async (id: string, payload: RecruitmentRequestPayload) => {
	const { data, status } = await axiosClient.put<IApiResponseV1<any>>(
		createApiEndpoint(RECRUITMENT_REQUEST_API.BY_ID, id),
		payload,
	);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};
