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
}
