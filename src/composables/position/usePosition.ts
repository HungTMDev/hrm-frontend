import { useQuery } from '@tanstack/vue-query';
import { positionKey } from './key';
import { getAllPosition } from '@/services/position';

export const usePosition = () => {
	return useQuery({
		queryKey: [positionKey.base],
		queryFn: async () => await getAllPosition(),
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
		retry: false,
	});
};
