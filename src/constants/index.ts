import {
	interviewEmailSchema,
	invitationEmailSchema,
	thanksEmailSchema,
} from '@/components/recruitments/applicants/screening-tab/schema';
import { convertEnumToComboboxType } from '@/lib/utils';
import { INTERVIEW_INVITATION_EMAIL, INVITATION_EMAIL, THANKS_EMAIL } from './model';

export const DEFAULT_PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 10,
};

export enum RECRUITMENT_REQUEST_STATUS {
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	DRAFT = 'DRAFT',
	ON_HOLD = 'ON_HOLD',
	CANCELLED = 'CANCELLED',
	PUBLISHED = 'PUBLISHED',
}

export const listRecruitmentRequestStatus = convertEnumToComboboxType(RECRUITMENT_REQUEST_STATUS);

export const RECRUITMENT_REQUEST_STATUS_STYLE: Record<string, string> = {
	APPROVED: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	DRAFT: 'bg-gray-50 text-slate-600 hover:bg-gray-50 hover:text-gray-500',
	ON_HOLD: 'bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500',
	CANCELLED: 'CANCELLED',
	PUBLISHED: 'PUBLISHED',
};

export const STATUS_STYLE: Record<string, string> = {
	'To-do': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	Approved: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	Canceled: 'bg-gray-50 text-slate-600 hover:bg-gray-50 hover:text-gray-500',
};

export const ROWS_PER_PAGE = [20, 50, 70, 120, 190];

export const ATTENDANCE_STYLE: Record<string, string> = {
	'Late Arrival': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	'Early Leave': 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
};

export const JOB_STATUS_STYLE: Record<string, string> = {
	Pending: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	Closed: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	Opening: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	Draft: 'bg-gray-50 text-slate-600 hover:bg-gray-100 hover:text-gray-500',
};

export const PAYROLL_FILE_STATUS_STYLE: Record<string, string> = {
	Confirmed: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	Sent: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	'Needs Editing': 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	'Waiting to Send': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
};

export const CANDIDATE_STATUS_STYLE: Record<string, string> = {
	Passed: '',
	Failed: '',
};

export enum ApplicantStage {
	Applied = 'Applied',
	Screening = 'Screening',
	Interview = 'Interview',
	Hired = 'Hired',
	Rejected = 'Rejected',
}

export const APPLICANT_STAGE_STYLE: Record<string, string> = {
	Applied: 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-500',
	Screening: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	Interview: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	Hired: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
};

export const applicantStages = convertEnumToComboboxType(ApplicantStage);

export enum GENDER {
	male,
	female,
}

export const genderCombobox = Object.keys(GENDER)
	.filter((key) => isNaN(Number(key)))
	.map((key) => ({
		label: key.charAt(0).toUpperCase() + key.slice(1),
		value: GENDER[key as keyof typeof GENDER].toString(),
	}));

export enum JOB_LEVEL {
	INTERN = 'INTERN',
	FRESHER = 'FRESHER',
	JUNIOR = 'JUNIOR',
	MIDDLE = 'MIDDLE',
	SENIOR = 'SENIOR',
	LEADER = 'LEADER',
	MANAGER = 'MANAGER',
	DIRECTOR = 'DIRECTOR',
}

export type JobLevel = `${JOB_LEVEL}`;

export const listJobLevel = convertEnumToComboboxType(JOB_LEVEL);

export enum EMPLOYMENT_TYPE {
	PART_TIME = 'PART_TIME',
	FULL_TIME = 'FULL_TIME',
	CONTRACT = 'CONTRACT',
	INTERN = 'INTERN',
}

export type EmploymentType = `${EMPLOYMENT_TYPE}`;

export const listEmploymentType = convertEnumToComboboxType(EMPLOYMENT_TYPE);

export enum JOB_STATUS {
	DRAFT = 'DRAFT',
	ON_HOLD = 'ON_HOLD',
	OPEN = 'OPEN',
	FILLED = 'FILLED',
	CANCELLED = 'CANCELLED',
	CLOSED = 'CLOSED',
}

export type JobStatus = `${JOB_STATUS}`;

export const listJobStatus = convertEnumToComboboxType(JOB_STATUS);

export const EDUCATION_LEVEL = [
	{
		label: 'University',
		value: 'University',
	},
	{
		label: 'College',
		value: 'College',
	},
];

export const EMAIL_TEMPLATE: Record<
	string,
	{ subject: string; label: string; template: string; schema: object }
> = {
	invitation_email_to_receive_jobs: {
		subject: '[LUTECH.LTD]THƯ MỜI NHẬN VIỆC',
		label: 'THƯ MỜI NHẬN VIỆC',
		template: INVITATION_EMAIL,
		schema: invitationEmailSchema,
	},
	interview_invitation_email: {
		subject: '[THƯ MỜI PHỎNG VẤN - LUTECH.LTD]',
		label: 'THƯ MỜI PHỎNG VẤN',
		template: INTERVIEW_INVITATION_EMAIL,
		schema: interviewEmailSchema,
	},
	email_of_thanks: {
		subject: '[THƯ CẢM ƠN ỨNG TUYỂN - LUTECH.LTD]',
		label: 'THƯ CẢM ƠN ỨNG TUYỂN',
		template: THANKS_EMAIL,
		schema: thanksEmailSchema,
	},
	email_thanks_to_the_interview: {
		subject: '[THƯ CẢM ƠN PHỎNG VẤN - LUTECH.LTD]',
		label: 'THƯ CẢM ƠN PHỎNG VẤN',
		template: THANKS_EMAIL,
		schema: thanksEmailSchema,
	},
};

export const listEmailTemplates = Object.entries(EMAIL_TEMPLATE).map((item) => ({
	label: item[1].label,
	value: item[0],
}));

export enum RECRUITMENT_STAGE {
	APPLIED = 'APPLIED',
	SCREENING = 'SCREENING',
	INTERVIEW_1 = 'INTERVIEW_1',
	INTERVIEW_2 = 'INTERVIEW_2',
	OFFER = 'OFFER',
	HIRED = 'HIRED',
	REJECTED = 'REJECTED',
	WITHDRAWN = 'WITHDRAWN',
}
