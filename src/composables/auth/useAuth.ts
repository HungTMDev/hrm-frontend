import { DATA_TIME } from '@/constants';
import router from '@/routers';
import { getUser, login, logout } from '@/services/auth';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, shallowRef, watchEffect } from 'vue';
import UserGroup from '@/assets/icons/Outline/UsersGroupTwoRounded.svg';
import UserGroupBold from '@/assets/icons/Bold/UsersGroupTwoRounded.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import CaseBold from '@/assets/icons/Bold/Case.svg';
import Widget from '@/assets/icons/Outline/Widget5.svg';
import WidgetBold from '@/assets/icons/Bold/Widget5.svg';

export const useLogin = (remember?: boolean) => {
	return useMutation({
		mutationFn: async (payload: { email: string; password: string }) => await login(payload),
		onSuccess: (data) => {
			const authStore = useAuthStore();
			authStore.setToken(data.access_token, data.refresh_token, remember);
			router.push('/');
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationFn: async () => await logout(),
		onSuccess: () => {
			queryClient.clear();
			authStore.clearStorage();
			router.push('/auth');
		},
	});
};

export const useGetAccount = () => {
	const query = useQuery({
		queryKey: ['account'],
		queryFn: async () => await getUser(),
		enabled: computed(() => !!localStorage.getItem('access_token')),
		retryDelay: 60 * 1000,
		staleTime: DATA_TIME.MORE_CHANGE,
	});

	const appStore = useAppStore();

	watchEffect(() => {
		if (query.data.value) {
			localStorage.setItem('account', JSON.stringify(query.data.value));
			const isHR = query.data.value.roles.some(
				(role) => role === 'ADMIN' || role === 'HR_LEADER' || role === 'HR' || role === 'CEO',
			);

			appStore.isHR = isHR;

			appStore.routeList = [
				{
					id: '10000',
					path: '/dashboard',
					name: 'Dashboard',
					icon: shallowRef(Widget),
					activeIcon: shallowRef(WidgetBold),
				},
				{
					id: '20000',
					path: '/recruitments',
					name: 'Recruitments',
					hidden: !isHR,
					icon: shallowRef(Case),
					activeIcon: shallowRef(CaseBold),
					children: [
						// {
						// 	id: '20001',
						// 	path: '/recruitments/overview',
						// 	name: 'Overview',
						// },
						{
							id: '20002',
							path: '/recruitments/requests',
							name: 'Recruitment requests',
						},
						{
							id: '20003',
							path: '/recruitments/jobs',
							name: 'Jobs',
						},
						{
							id: '20003',
							path: '/recruitments/applicants',
							name: 'Applicants',
						},
						{
							id: '20004',
							path: '/recruitments/talent-pool',
							name: 'Talent pool',
						},
					],
				},
				{
					id: '30000',
					path: '/employees',
					name: 'Employees',
					icon: shallowRef(UserGroup),
					activeIcon: shallowRef(UserGroupBold),
					children: [
						// {
						// 	id: '30001',
						// 	path: '/employees/overview',
						// 	name: 'Overview',
						// },
						{
							id: '30002',
							path: '/employees/all-employee',
							name: 'All employees',
						},
						// {
						// 	id: '30003',
						// 	path: '/employees/work-hours-management',
						// 	name: 'Work hours',
						// },
					],
				},
				// {
				// 	id: '80000',
				// 	path: '/center-request',
				// 	name: 'Center request',
				// 	icon: shallowRef(DocumentAdd),
				// 	activeIcon: shallowRef(DocumentAddBold),
				// 	children: [
				// 		// {
				// 		// 	id: '30001',
				// 		// 	path: '/employees/overview',
				// 		// 	name: 'Overview',
				// 		// },
				// 		{
				// 			id: '80002',
				// 			path: '/center-request/leave-request',
				// 			name: 'Leave request',
				// 		},
				// 		{
				// 			id: '80003',
				// 			path: '/center-request/late-early-request',
				// 			name: 'Late/Early request',
				// 		},
				// 		{
				// 			id: '80004',
				// 			path: '/center-request/overtime-request',
				// 			name: 'Overtime request',
				// 		},
				// 		{
				// 			id: '80005',
				// 			path: '/center-request/correction-request',
				// 			name: 'Correction request',
				// 		},
				// 	],
				// },
				// {
				// 	id: '40000',
				// 	path: '/payroll',
				// 	name: 'Payroll',
				// 	icon: shallowRef(Payroll),
				// 	activeIcon: shallowRef(PayrollBold),
				// },
				// {
				// 	id: '50000',
				// 	path: '/training',
				// 	name: 'Training',
				// 	icon: shallowRef(Training),
				// 	activeIcon: shallowRef(TrainingBold),
				// },
				// {
				// 	id: '60000',
				// 	path: '/documents',
				// 	name: 'Documents',
				// 	icon: shallowRef(Document),
				// 	activeIcon: shallowRef(DocumentBold),
				// },
				// {
				// 	id: '70000',
				// 	path: '/meeting-schedule',
				// 	name: 'Meeting Schedule',
				// 	icon: shallowRef(Calendar),
				// 	activeIcon: shallowRef(CalendarBold),
				// },
			];
		}
	});

	return query;
};
