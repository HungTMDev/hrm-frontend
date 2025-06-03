import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import Widget from '@/assets/icons/Outline/Widget 5.svg';
import WidgetBold from '@/assets/icons/Bold/Widget 5.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import CaseBold from '@/assets/icons/Bold/Case.svg';
import DocumentAdd from '@/assets/icons/Outline/Document Add.svg';
import DocumentAddBold from '@/assets/icons/Bold/Document Add.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import UserGroupBold from '@/assets/icons/Bold/Users Group Two Rounded.svg';
import Payroll from '@/assets/icons/Outline/Dollar Minimalistic.svg';
import PayrollBold from '@/assets/icons/Bold/Dollar Minimalistic.svg';
import Training from '@/assets/icons/Outline/Presentation Graph.svg';
import TrainingBold from '@/assets/icons/Bold/Presentation Graph.svg';
import Document from '@/assets/icons/Outline/File Text.svg';
import DocumentBold from '@/assets/icons/Bold/File Text.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CalendarBold from '@/assets/icons/Bold/Calendar.svg';
import type { RouteType } from '@/types';

export const useAppStore = defineStore('app-store', () => {
	//defineState
	const routeList = ref<RouteType[]>([
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
					name: 'All employee',
				},
				{
					id: '30003',
					path: '/employees/work-hours-management',
					name: 'Work hours',
				},
			],
		},
		{
			id: '80000',
			path: '/center-request',
			name: 'Center request',
			icon: shallowRef(DocumentAdd),
			activeIcon: shallowRef(DocumentAddBold),
			children: [
				// {
				// 	id: '30001',
				// 	path: '/employees/overview',
				// 	name: 'Overview',
				// },
				{
					id: '80002',
					path: '/center-request/leave-request',
					name: 'Leave request',
				},
				{
					id: '80003',
					path: '/center-request/late-early-request',
					name: 'Late/Early request',
				},
				{
					id: '80004',
					path: '/center-request/overtime-request',
					name: 'Overtime request',
				},
				{
					id: '80005',
					path: '/center-request/correction-request',
					name: 'Correction request',
				},
			],
		},
		{
			id: '40000',
			path: '/payroll',
			name: 'Payroll',
			icon: shallowRef(Payroll),
			activeIcon: shallowRef(PayrollBold),
		},
		{
			id: '50000',
			path: '/training',
			name: 'Training',
			icon: shallowRef(Training),
			activeIcon: shallowRef(TrainingBold),
		},
		{
			id: '60000',
			path: '/documents',
			name: 'Documents',
			icon: shallowRef(Document),
			activeIcon: shallowRef(DocumentBold),
		},
		{
			id: '70000',
			path: '/meeting-schedule',
			name: 'Meeting Schedule',
			icon: shallowRef(Calendar),
			activeIcon: shallowRef(CalendarBold),
		},
	]);
	const isSmallSidebar = ref(
		localStorage.getItem('smallSidebar')
			? localStorage.getItem('smallSidebar') === 'true'
			: false,
	);

	//defineActions
	const toggleSidebar = () => {
		isSmallSidebar.value = !isSmallSidebar.value;
		localStorage.setItem('smallSidebar', String(isSmallSidebar.value));
	};

	return {
		routeList,
		isSmallSidebar,
		toggleSidebar,
	};
});
