import { useQuery } from '@tanstack/vue-query';
import { departmentKey } from './key';
import { getAllDepartment } from '@/services/department';

export const useDepartment = () => {
	return useQuery({
		queryKey: [departmentKey.base],
		queryFn: async () => await getAllDepartment(),
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
	});
};
