import type { EmploymentType, JobLevel, JobStatus } from '@/constants';
import type { IBaseResponse, IBranch, IDepartment, IPosition, IUploadFileResponse, IUser } from '.';

export interface IRecruitmentRequest extends IBaseResponse {
	branch_id: string;
	branch_name: string;
	job_title_id: string;
	hiring_manager_id: string;
	department_id: string;
	title: string;
	level: string | string[];
	employment_type: string | string[];
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
	canceled_by: IUser;
	recruiter: IUser;
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
	status?: string[];
}

export interface IJob extends IBaseResponse {
	branch_id: string;
	requisition_id: string;
	department_id: string;
	position_id: string;
	hiring_manager_id: string;
	created_by: string;
	level: string | string[];
	employment_type: string | string[];
	status: JobStatus;
	quantity: number;
	due_date: string;
	application_count: number;
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
	recruiter_id: string;
	applicationCount: number;
	recruiter: IUser;
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

export interface DataFillInterviewEmail {
	subject: string;
	recipient: string;
	position: string;
	datetime: string;
	work_location: string;
	confirmation_before_date: string;
	confirmation_before_time: string;
}

export interface IApplicantFilter {
	keywords?: string;
	order: 'ASC' | 'DESC';
	candidate_id?: string;
	job_id?: string[];
	stage?: string | string[];
	status?: string[];
}

export interface IApplicant extends IBaseResponse {
	applied_at: string;
	expected_salary: 0;
	source: string;
	resume_url: IUploadFileResponse;
	cover_letter: string;
	attaches: IUploadFileResponse[];
	notes: string;
	current_stage: string;
	application_status: string;
	candidate: ICandidate;
	job: IJob;
	position: IPosition;
	department: IDepartment;
	branch: IBranch;
	created_by_user: IUser;
	referred_by_user: IUser;
}

export interface IApplicantInterview extends IBaseResponse {
	application_id: string;
	stage: string;
	interview_type: string;
	interview_name: string;
	scheduled_time: string;
	duration_minutes: number;
	location: string | null;
	meeting_link: string | null;
	status: string;
	participants: IUser[];
	candidate: ICandidate;
	score: number | null;
}

export interface ICandidate extends IBaseResponse {
	full_name: string;
	email: string;
	phone_number: string;
	avatar?: string;
	address?: string;
	gender: string;
	date_of_birth: string;
	linkedin_profile?: string;
	portfolio_url?: string;
	resume_url?: string;
	parsed_data?: string;
	education?: IEducation;
	work_experience?: IWorkExperience;
	skills?: string[];
	languages?: string[];
	certifications?: string[];
	summary?: string;
	source?: string;
	attaches?: string[];
	notes?: string;
	created_by: IUser;
}

export interface ICandidateFilter {
	keywords?: string;
	order?: 'ASC' | 'DESC';
}

export interface IEducation {
	school: string;
	degree: string;
	major: string;
	start_date: string;
	end_date: string;
}

export interface IWorkExperience {
	company: string;
	position: string;
	start_date: string;
	end_date: string;
	description: string;
}

export interface InterviewPayload {
	application_id: string;
	stage: string;
	interview_type: string;
	interview_name: string;
	scheduled_time: string;
	duration_minutes?: number;
	location?: string;
	meeting_link?: string;
	participant_ids?: string[];
}

export interface IApplicantInterviewFilter {
	keywords?: string;
	order?: 'ASC' | 'DESC';
	status?: string[];
	candidate_id?: string[];
	interviewer_id?: string[];
	from_date?: string;
	to_date?: string;
	department_id?: string[];
	branch_id?: string[];
	stage?: string;
}

export interface IInterviewFeedback extends IBaseResponse {
	interview_id: string;
	interviewer_id: string;
	score: number;
	strengths: string;
	weaknesses: string;
	comments: string;
	recommendation: string;
	submitted_at: string;
	interviewer: IUser;
}
