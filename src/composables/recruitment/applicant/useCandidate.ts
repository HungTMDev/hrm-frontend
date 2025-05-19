import { useQuery } from '@tanstack/vue-query';
import { applicantKey } from './key';
import { getCandidate } from '@/services/recruitment/applicant';
import type { ICandidate } from '@/types';

export const useCandidate = () => {
	return useQuery({
		queryKey: [applicantKey.candidate],
		queryFn: async () => {
			const list: ICandidate[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getCandidate({
					page,
					limit: 100,
				});

				list.push(...data.data);

				page = data.meta.current_page + 1;
				nextPage = data.meta.has_next_page;
			} while (nextPage);

			return list;
		},
		staleTime: 7 * 24 * 60 * 60 * 1000, //Fetch every 7 days
		retry: false,
	});
};
