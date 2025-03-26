import type { HTMLAttributes } from 'vue';

export * from './dashboard.type';
export * from './recruitment.type';
export * from './employee.type';
export * from './payroll.type';
export * from './documents.type';

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
	items: ComboboxType[];
	icon: any;
}

export interface FilterData {
	field: string;
	filters: ComboboxType[];
}

export interface ActionGroupType {
	label: string;
	icon: any;
	style: string;
}
