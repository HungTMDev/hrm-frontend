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

export const applicantStages = Object.values(ApplicantStage).map((value) => ({
	label: value.replace(/_/g, ' '), // Chuyển "_" thành khoảng trắng để hiển thị đẹp hơn
	value,
}));

export enum Gender {
	male,
	female,
}

export const genderCombobox = Object.keys(Gender)
	.filter((key) => isNaN(Number(key)))
	.map((key) => ({
		label: key.charAt(0).toUpperCase() + key.slice(1),
		value: Gender[key as keyof typeof Gender].toString(),
	}));

export const JOB_LEVEL = [
	{
		label: 'Intern',
		value: 'Intern',
	},
	{
		label: 'Junior',
		value: 'Junior',
	},
	{
		label: 'Mid',
		value: 'Mid',
	},
	{
		label: 'Senior',
		value: 'Senior',
	},
];

export const DEPARTMENTS = [
	{
		label: 'Design',
		value: 'Design',
	},
	{
		label: 'Development',
		value: 'Development',
	},
	{
		label: 'Marketing',
		value: 'Marketing',
	},
	{
		label: 'Product',
		value: 'Product',
	},
];

export const EMPLOYMENT_TYPE = [
	{
		label: 'Full-time',
		value: 'Full-time',
	},
	{
		label: 'Part-time',
		value: 'Part-time',
	},
	{
		label: 'Freelance',
		value: 'Freelance',
	},
];

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
