import type { GENDER } from '@/constants';
import type { HTMLAttributes } from 'vue';

export * from './dashboard.type';
export * from './documents.type';
export * from './employee.type';
export * from './payroll.type';
export * from './recruitment.type';

export interface IApiResponseV1<T> {
	status: boolean;
	statusCode: number;
	data: T;
	meta: IMeta;
}

export interface IMeta {
	has_next_page: boolean;
	has_previous_page: boolean;
	limit: number;
	current_page: number;
	total_pages: number;
	total_records: number;
}

export interface ITokenResponse {
	access_token: string;
	refresh_token: string;
	user_id: string;
	token_expires: number;
}

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
	modelValue?: string | number;
	defaultValue?: string | number;
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

export interface IActionGroupType {
	label: string;
	icon: any;
	style?: string;
}

export interface IBaseResponse {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface IDepartment extends IBaseResponse {
	name: string;
	description: string;
	branch_id: string;
	branch_detail_address: string;
	leader_id: string;
}

export interface IBranch extends IBaseResponse {
	name: string;
	address_line1: string;
	address_line2: string | null;
	city: string;
	state_province: string;
	postal_code: string;
	country: string;
	phone_number: string;
	is_active: boolean;
}

export interface IUser extends IBaseResponse {
	email: string;
	personal_email: string | null;
	phone_number: string | null;
	name: string;
	avatar: string | null;
	date_of_birth: string | null;
	gender: GENDER;
	hired_date: string | null;
	termination_date: string | null;
	is_active: boolean;
	is_confirmed: boolean;
}

export interface IPosition extends IBaseResponse {
	title: string;
	description: string;
	level: string;
	common_skills: string[];
}

export interface IFilterRequest<T = any> {
	page: number;
	limit: number;
	filter: T;
}
