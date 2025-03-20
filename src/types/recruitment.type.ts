export interface Candidate {
	name: string;
	email: string;
	phone: string;
	cv: string;
	stage: string;
}

export interface RecruitmentRequest {
	position: string;
	quantity: number;
	level: string;
	request_from: string;
	expected_date: string;
	status: string;
}
