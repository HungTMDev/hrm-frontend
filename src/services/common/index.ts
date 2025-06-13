import { COMMON_API } from '@/constants/api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IUploadFileResponse } from '@/types';

export const uploadFile = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	const { data, status } = await axiosClient.post<IApiResponseV1<IUploadFileResponse>>(
		COMMON_API.UPLOAD,
		formData,
	);

	if (status >= 400) {
		throw new Error();
	}

	return data.data;
};
