import type { IBaseResponse, IBranch, IDepartment, IPosition, IUser } from '.';

export interface IEmployee extends IBaseResponse {
	name: string;
	email: string;
	avatar: string;
	employee_number: string;
	phone_number?: string;
	work_information: {
		id: string;
		work_status: string;
	};
	branch: IBranch;
	department: IDepartment;
	position: IPosition;
}

export interface IEmployeeFilter {
	keywords?: string;
	order?: 'ASC' | 'DESC';
	branch_id?: string[];
	department_id?: string[];
	position_id?: string[];
	work_status?: string[];
}

export interface IPersonalInformation extends IBaseResponse {
	email: string;
	name: string;
	avatar: string;
	phone_number: string;
	personal_email: string;
	date_of_birth: string;
	gender: string;
	personal_information: {
		id: string;
		employee_number: string;
		address: string;
		hometown: string;
		permanent_residence: string;
		nationality: string;
		emergency_contact_name: string;
		emergency_contact: string;
		marital_status: string;
	};
}

export interface IWorkInformation extends IBaseResponse {
	level: string;
	salary: number;
	start_date: string;
	end_date?: string;
	work_status: string;
	work_location: string;
	shift_start: string;
	shift_end: string;
	is_current: boolean;
	job_description: string;
	change_reason: string;
	branch: IBranch;
	department: IDepartment;
	position: IPosition;
	team: {
		id: string;
		name: string;
	};
	manager: IUser;
}

export interface ISalaryInformation extends IBaseResponse {
	user_id: string;
	base_salary: number;
	commission: number;
	salary_type: string;
	allowance: {
		amount: number;
	};
	deduction: {
		amount: number;
	};
	effective_date: string;
	end_date: string;
	approver_id: string;
	reason: string;
	note: string;
	insurance: string[];
	benefits: {
		amount: number;
	};
	created_by_user_id: string;
	approver: IUser;
	created_by: IUser;
}

export interface IContractDetails extends IBaseResponse {
	user_id: string;
	created_by: IUser;
	contract_type: string;
	start_date: string;
	end_date: string | null;
	termination_date: string | null;
	status: string;
	contract_detail: IDocument;
	appendix: any[] | null;
	notes: string;
}

export interface IInsuranceInformation extends IBaseResponse {
	user_id: string;
	insurance_number: string;
	insurance_provider: string | null;
	start_date: string;
	end_date: string;
	insurance_type: string;
	insurance_contribution: number;
}

export interface IBankInformation extends IBaseResponse {
	bank_name: string;
	account_number: string;
	account_holder_name: string;
	bank_branch: string;
	user_id: string;
}

export interface IDocument {
	user_id: string | null;
	document_name: string;
	document_type: string;
	file_name: string;
	file_type: string;
	file_size: number;
	storage_path: string;
	description: string | null;
}

export interface EmployeePayroll {
	name: string;
	role: string;
	salary: number;
	deduction: number;
	status: string;
	department: string;
	level: string;
}

export interface AttendanceManagement {
	name: string;
	email: string;
	attendance: string;
	date: string;
	time: string;
	status: string;
}

export interface LeaveManagement {
	name: string;
	leaveType: string;
	startDate: string;
	endDate: string;
	totalDays: number;
	leaveReason: string;
	status: string;
}

export interface OvertimeManagement {
	name: string;
	email: string;
	startTime: string;
	endTime: string;
	date: string;
	status: string;
}
