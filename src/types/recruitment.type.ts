import type { EmploymentType, JobLevel, JobStatus } from '@/constants';
import type { IBaseResponse, IBranch, IDepartment, IPosition, IUser } from '.';

export interface Applicant {
	name: string;
	email: string;
	phone: string;
	cv: string;
	job: string;
	stage: string;
	status?: string;
}

export interface IRecruitmentRequest extends IBaseResponse {
	branch_id: string;
	branch_name: string;
	job_title_id: string;
	title: string;
	level: JobLevel | JobLevel[];
	employment_type: EmploymentType | EmploymentType;
	quantity: number;
	justification: string;
	expected_start_date: string;
	description: string;
	skills_required: string[];
	status: string;
	submitted_at: string | null;
	approved_at: string | null;
	rejected_at: string | null;
	cancelled_at: string | null;
	cancelled_by: string | null;
	cancelled_reason: null;
	branch: IBranch;
	department: IDepartment;
	job_title: any;
	hiring_manager: IUser;
}

export interface IRecruitmentRequestFilter {
	keywords?: string;
	order?: 'ASC' | 'DESC';
	branch_id?: string[];
	hiring_manager_id?: string[];
	department_id?: string[];
	job_title_id?: string[];
	level?: string[];
	employment_type?: string[];
}

export interface IJob extends IBaseResponse {
	branch_id: string;
	requisition_id: string;
	department_id: string;
	position_id: string;
	hiring_manager_id: string;
	created_by: string;
	level: JobLevel | JobLevel[];
	employment_type: EmploymentType | EmploymentType[];
	status: JobStatus;
	quantity: number;
	due_date: string;
	applicationCount: number;
	title: string;
	description: string;
	requirements: string;
	location: string;
	gender: number;
	education_level: string;
	work_experience: string;
	branch: IBranch;
	department: IDepartment;
	position: IPosition;
	hiring_manager: IUser;
	created_by_user: IUser;
	[key: string]: any;
}

export interface IJobFilter {
	keywords?: string;
	order?: 'ASC' | 'DESC';
	branch_id?: string[];
	requisition_id?: string[];
	department_id?: string[];
	position_id?: string[];
	hiring_manager_id?: string[];
	level?: string[];
	employmentType?: string[];
	status?: string[];
}

export interface TalentPool {
	name: string;
	email: string;
	phone: string;
	job: string;
	level: string;
	last_modified: string;
}

export interface DataFillInterviewEmail {
	subject: string;
	recipient: string;
	position: string;
	datetime: string;
	work_location: string;
	confirmation_before_date: string;
	confirmation_before_time: string;
}
