export const STATUS_STYLE: Record<string, string> = {
	'To-do': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	Approved: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
};

export const ROWS_PER_PAGE = [20, 50, 70, 120, 190];

export const ATTENDANCE_STYLE: Record<string, string> = {
	'Late Arrival': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	'Early Leave': 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
};

export const JOB_STATUS_STYLE: Record<string, string> = {
	PENDING: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	CLOSED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	OPENING: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
};

export enum CandidateStage {
	APPLIED = 'APPLIED',
	'1ST_INTERVIEW' = '1ST_INTERVIEW',
	'2ND_INTERVIEW' = '2ND_INTERVIEW',
	HIRED = 'HIRED',
	REJECTED = 'REJECTED',
}

export const candidateStages = Object.values(CandidateStage).map((value) => ({
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
