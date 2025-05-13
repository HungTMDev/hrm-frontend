import type { JobPayloadType } from '@/components/recruitments/jobs/job.schema';
import { JOB_API } from '@/constants/api/recruitment/job.api';
import { createApiEndpoint } from '@/lib/utils';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IFilterRequest, IJob, IJobFilter } from '@/types';

export const getJob = async (filter?: Partial<IFilterRequest<IJobFilter>>) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<IJob[]>>(JOB_API.BASE, {
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

export const createJob = async (payload: JobPayloadType) => {
	const { data, status } = await axiosClient.post(JOB_API.BASE, payload);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const updateJob = async (id: string, payload: JobPayloadType) => {
	const { data, status } = await axiosClient.put(createApiEndpoint(JOB_API.BY_ID, id), payload);
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const deleteJob = async (id: string) => {
	const { data, status } = await axiosClient.delete(createApiEndpoint(JOB_API.BY_ID, id));
	if (status >= 400) {
		throw new Error();
	}
	return data;
};

export const uploadApplicantForJob = async (job_id: string, file: File) => {
	console.log(job_id, file);
	const formData = new FormData();
	formData.append('file', file);

	const { data, status } = await axiosClient.post(
		createApiEndpoint(JOB_API.UPLOAD_APPLICANT_FOR_JOB, job_id),
		formData,
	);

	if (status >= 400) {
		throw new Error();
	}

	return data;
};
