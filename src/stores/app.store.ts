import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import Widget from '@/assets/icons/Outline/Widget 5.svg';
import WidgetBold from '@/assets/icons/Bold/Widget 5.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import CaseBold from '@/assets/icons/Bold/Case.svg';
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

export const useAppStore = defineStore('app-store', () => {
	//defineState
	const routeList = ref([
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
		},
		{
			id: '30000',
			path: '/employees',
			name: 'Employees',
			icon: shallowRef(UserGroup),
			activeIcon: shallowRef(UserGroupBold),
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

	const isSmallSidebar = ref(false);

	//defineActions
	const handleSmallSidebar = () => {
		isSmallSidebar.value = !isSmallSidebar.value;
	};

	return {
		routeList,
		isSmallSidebar,
		handleSmallSidebar,
	};
});
