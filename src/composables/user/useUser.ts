import { getUser } from '@/services/user';
import type { IUser } from '@/types';
import { useQuery } from '@tanstack/vue-query';
import { userKey } from './key';
import { DATA_TIME } from '@/constants';

export const useListUser = () => {
	return useQuery({
		queryKey: [userKey.base, 'list'],
		queryFn: async () => {
			const list: IUser[] = [];
			let nextPage = false;
			let page = 1;

			do {
				const data = await getUser({
					page,
					limit: 100,
				});

				list.push(...data.data);

				page = data.meta.current_page + 1;
				nextPage = data.meta.has_next_page;
			} while (nextPage);

			return list;
		},
		staleTime: DATA_TIME.LESS_CHANGE,
		retry: false,
	});
};
