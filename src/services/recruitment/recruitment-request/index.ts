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

export const rejectRecruitmentRequest = async (id: string) => {
	const { data, status } = await axiosClient.patch(
		createApiEndpoint(RECRUITMENT_REQUEST_API.REJECT, id),
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};
