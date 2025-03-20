export const APPROVAL_STATUS_STYLE: Record<string, string> = {
	'TO-DO': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	REJECTED: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	APPROVED: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
};

export const ROWS_PER_PAGE = [20, 50, 70, 120, 190];

export const ATTENDANCE_STATUS_STYLE: Record<string, string> = {
	'LATE ARRIVAL': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	ABSENT: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
	PRESENT: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
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

export const CORE_CAPACITY_LABEL = [
	['Communication skills'],
	['Personal development', 'and management'],
	['Teamwork'],
	['Presentation skills'],
	['Analytical skills,', 'problem-solving,', 'and decision-making'],
	['Organizational and', 'time management skills'],
	['Negotiation and', 'persuasion skills'],
	['Integrity'],
	['Proactiveness,', 'positivity'],
	['Results-oriented'],
	['Detail-oriented,', 'careful'],
	['Persistent and resilient'],
	['Creativity and innovation'],
];

export const PROFESSIONAL_CAPACITY_LABEL = [
	['Hiểu biết về công ty'],
	['Hiểu về chuyên môn', 'nghiệp vụ'],
	['Hiểu biết về ngành', 'và sản phẩm'],
	['Chuyên môn tư vấn bán hàng'],
	['Chuyên môn thu ngân'],
];
export const MANAGEMENT_CAPACITY_LABEL = [
	['Kỹ năng xây dựng', 'và phát triển đội nhóm'],
	['Khả năng giải quyết xung đột'],
	['Tư duy chiến lược'],
	['Kỹ năng quản trị rủi ro'],
	['Kỹ năng tạo ảnh hưởng'],
	['Kỹ năng đào tạo'],
	['Nhạy bén'],
	['Tinh thần khởi nghiệp'],
];
