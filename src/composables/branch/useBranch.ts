import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { branchKey } from './key';
import { getAllBranch } from '@/services/branch';
import type { IBranch } from '@/types';

export const useBranch = (): UseQueryReturnType<IBranch[], Error> => {
	return useQuery<IBranch[], Error>({
		queryKey: [branchKey.base],
		queryFn: async () => await getAllBranch(),
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
		retry: false,
	});
};
