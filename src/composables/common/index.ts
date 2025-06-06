import { uploadFile } from '@/services/common';
import { useMutation } from '@tanstack/vue-query';

export const useUploadFile = () => {
	return useMutation({
		mutationFn: async (file: File) => await uploadFile(file),
	});
};
