import type { HTMLAttributes } from 'vue';

export * from './dashboard.type';
export * from './recruitment.type';
export * from './employee.type';
export * from './payroll.type';
export * from './documents.type';

export interface RouteType {
	id: string;
	path: string;
	name: string;
	icon?: any;
	activeIcon?: any;
	children?: RouteType[];
}

export interface ComboboxType {
	label: string;
	value: string;
}

export interface FormFieldCommon {
	name: string;
	label: string;
	placeholder?: string;
	class?: HTMLAttributes['class'];
	icon?: any;
	required?: boolean;
}

export interface FilterAccordion {
	value: string;
	title: string;
	items?: ComboboxType[];
	icon: any;
	type: 'list' | 'numberSlider' | 'timeRange';
	min?: number;
	max?: number;
	step?: number;
}

export interface FilterData {
	field: string;
	filters: ComboboxType[];
}

export interface ActionGroupType {
	label: string;
	icon: any;
	style?: string;
}
