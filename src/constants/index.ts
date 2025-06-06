import {
	interviewEmailSchema,
	invitationEmailSchema,
	thanksEmailSchema,
} from '@/components/recruitments/applicants/screening-tab/schema';
import { convertEnumToComboboxType, formatStatus } from '@/lib/utils';
import { INVITATION_EMAIL, THANKS_EMAIL } from './model';

export const DEFAULT_PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 10,
};

export const DATA_TIME = {
	TABLE: 60 * 1000,
	MORE_CHANGE: 60 * 1000,
	LESS_CHANGE: 24 * 60 * 60 * 1000,
	DELETE: 5 * 60 * 1000,
};

export enum RECRUITMENT_REQUEST_STATUS {
	TO_DO = 'TO_DO',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	DRAFT = 'DRAFT',
	ON_HOLD = 'ON_HOLD',
	CANCELED = 'CANCELED',
}

export const listRecruitmentRequestStatus = convertEnumToComboboxType(RECRUITMENT_REQUEST_STATUS);

export const RECRUITMENT_REQUEST_STATUS_STYLE: Record<string, string> = {
	APPROVED: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	DRAFT: 'bg-purple-50 text-purple-500 hover:bg-purple-50 hover:text-purple-500',
	ON_HOLD: 'bg-emerald-50 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-500',
	CANCELED: 'bg-slate-50 text-slate-500 hover:bg-slate-50 hover:text-slate-500',
	TO_DO: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
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
	DRAFT: 'bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600',
	PENDING: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	OPENING: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	CLOSED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
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

export const APPLICANT_STATUS_STYLE: Record<string, string> = {
	ACTIVE: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	WITHDRAW: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	HIRED: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
};

export const APPLICANT_OUTCOME_STYLE: Record<string, string> = {
	PASSED: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	FAILED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
};

export const APPLICANT_STAGE_STYLE: Record<string, string> = {
	APPLIED: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	SCREENING: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	INTERVIEW_1: 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500',
	INTERVIEW_2: 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500',
	OFFER: 'bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-500',
	HIRED: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
};

export const applicantStages = convertEnumToComboboxType(ApplicantStage);

export enum GENDER {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export const genderCombobox = convertEnumToComboboxType(GENDER);

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
	OPENING = 'OPENING',
	PENDING = 'PENDING',
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

// export const EMAIL_TEMPLATE: Record<
// 	string,
// 	{ subject: string; label: string; template: string; schema: object }
// > = {
// 	invitation_email_to_receive_jobs: {
// 		subject: '[LUTECH.LTD]THƯ MỜI NHẬN VIỆC',
// 		label: 'THƯ MỜI NHẬN VIỆC',
// 		template: INVITATION_EMAIL,
// 		schema: invitationEmailSchema,
// 	},
// 	interview_invitation_email: {
// 		subject: '[THƯ MỜI PHỎNG VẤN - LUTECH.LTD]',
// 		label: 'THƯ MỜI PHỎNG VẤN',
// 		template: INTERVIEW_INVITATION_EMAIL,
// 		schema: interviewEmailSchema,
// 	},
// 	email_of_thanks: {
// 		subject: '[THƯ CẢM ƠN ỨNG TUYỂN - LUTECH.LTD]',
// 		label: 'THƯ CẢM ƠN ỨNG TUYỂN',
// 		template: THANKS_EMAIL,
// 		schema: thanksEmailSchema,
// 	},
// 	email_thanks_to_the_interview: {
// 		subject: '[THƯ CẢM ƠN PHỎNG VẤN - LUTECH.LTD]',
// 		label: 'THƯ CẢM ƠN PHỎNG VẤN',
// 		template: THANKS_EMAIL,
// 		schema: thanksEmailSchema,
// 	},
// };

// export const listEmailTemplates = Object.entries(EMAIL_TEMPLATE).map((item) => ({
// 	label: item[1].label,
// 	value: item[0],
// }));

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

export enum INTERVIEW_TYPE {
	IN_PERSON = 'IN_PERSON',
	ONLINE = 'ONLINE',
}

export const listInterviewType = convertEnumToComboboxType(INTERVIEW_TYPE);

export enum INTERVIEW_STATUS {
	SCHEDULED = 'SCHEDULED',
	CANCELED = 'CANCELED',
	COMPLETED = 'COMPLETED',
}

export const listInterviewStatus = convertEnumToComboboxType(INTERVIEW_STATUS);

export const INTERVIEW_STATUS_STYLE: Record<string, string> = {
	SCHEDULED: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	CANCELED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	COMPLETED: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	PENDING_FEEDBACK: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
};

export enum INTERVIEW_ROLE {
	INTERVIEWER = 'INTERVIEWER',
	SCHEDULER = 'SCHEDULER',
	OBSERVER = 'OBSERVER',
}

export const listInterviewRole = convertEnumToComboboxType(INTERVIEW_ROLE);

export const listWorkHour = [
	{
		label: '7:45 AM - 5:15 PM',
		value: '07:45:00-17:15:00',
	},
	{
		label: '8:00 AM - 5:30 PM',
		value: '08:00:00-17:30:00',
	},
	{
		label: '8:15 AM - 5:45 PM',
		value: '08:15:00-17:45:00',
	},
	{
		label: '8:30 AM - 6:00 PM',
		value: '08:30:00-18:00:00',
	},
	{
		label: '8:45 AM - 6:15 PM',
		value: '08:45:00-18:15:00',
	},
];

export enum CONTRACT_TYPE {
	TRAINEE_CONTRACT = 'TRAINEE_CONTRACT',
	PROBATIONARY_CONTRACT = 'PROBATIONARY_CONTRACT',
	DEFINITE_CONTRACT_ONE_YEAR = 'DEFINITE_CONTRACT_ONE_YEAR',
	DEFINITE_CONTRACT_TWO_YEAR = 'DEFINITE_CONTRACT_TWO_YEAR',
	INDEFINITE_CONTRACT = 'INDEFINITE_CONTRACT',
}

export const listContractType = convertEnumToComboboxType(CONTRACT_TYPE);

export enum CONTRACT_STATUS {
	ACTIVE = 'ACTIVE',
	EXPIRING_SOON = 'EXPIRING_SOON',
	PENDING_RENEWAL = 'PENDING_RENEWAL',
	EXPIRED = 'EXPIRED',
}

export const listContractStatus = convertEnumToComboboxType(CONTRACT_STATUS);

export const LEAVE_REQUEST_STATUS = {
	TO_DO: 'TO_DO',
	APPROVED: 'APPROVED',
	REJECTED: 'REJECTED',
	CANCELLED: 'CANCELLED',
};

export const LEAVE_REQUEST_STATUS_STYLE: Record<string, string> = {
	TO_DO: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	APPROVED: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	CANCELLED: 'bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600',
};

export enum RECOMMEND_RECRUITMENT {
	STRONG_HIRE = 'STRONG_HIRE',
	HIRE = 'HIRE',
	WEAK_HIRE = 'WEAK_HIRE',
	NO_HIRE = 'NO_HIRE',
	STRONG_NO_HIRE = 'STRONG_NO_HIRE',
}

export const listRecommendRecruitment = convertEnumToComboboxType(RECOMMEND_RECRUITMENT);

export enum REQUEST_STATUS {
	TO_DO = 'TO_DO',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	CANCELED = 'CANCELED',
	CANCELING = 'CANCELING',
	ON_HOLD = 'ON_HOLD',
	DRAFT = 'DRAFT',
}

export const listRequestStatus = convertEnumToComboboxType(REQUEST_STATUS);

export const REQUEST_STATUS_STYLE: Record<string, string> = {
	TO_DO: 'text-yellow-500 hover:text-yellow-500 bg-yellow-50 hover:bg-yellow-50',
	APPROVED: 'text-green-500 hover:text-green-500 bg-green-50 hover:bg-green-50',
	REJECTED: 'text-red-500 hover:text-red-500 bg-red-50 hover:bg-red-50',
	CANCELED: 'text-slate-500 hover:text-slate-500 bg-slate-50 hover:bg-slate-50',
	ON_HOLD: 'text-emerald-500 hover:text-emerald-500 bg-emerald-50 hover:bg-emerald-50',
	DRAFT: 'text-purple-500 hover:text-purple-500 bg-purple-50 hover:bg-purple-50',
	CANCELING: 'text-indigo-500 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-50',
};

export enum LEAVE_TIME_TYPE {
	FULL_DAY = 'FULL_DAY',
	HALF_DAY = 'HALF_DAY',
	HOURLY = 'HOURLY',
	MANY_DAY = 'MANY_DAY',
}

export const listLeaveTimeType = convertEnumToComboboxType(LEAVE_TIME_TYPE);

export enum LEAVE_SHIFT {
	MORNING = 'MORNING',
	AFTERNOON = 'AFTERNOON',
}

export const listLeaveShift = convertEnumToComboboxType(LEAVE_SHIFT);
