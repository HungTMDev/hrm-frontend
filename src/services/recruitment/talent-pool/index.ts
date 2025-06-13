import { CANDIDATE_API } from '@/constants/api/recruitment/applicant.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, ICandidate, ICandidateFilter, IFilterRequest } from '@/types';

export const getCandidates = async (filter?: Partial<IFilterRequest<ICandidateFilter>>) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<ICandidate[]>>(CANDIDATE_API.BASE, {
		params: filter,
	});
	if (status >= 400) {
		throw new Error();
	}
	return data;
};
