import { useQuery } from '@tanstack/vue-query';
import { branchKey } from './key';
import { getAllBranch } from '@/services/branch';

export const useBranch = () => {
	return useQuery({
		queryKey: [branchKey.base],
		queryFn: async () => await getAllBranch(),
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
	});
};
