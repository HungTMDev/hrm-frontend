export interface Candidate {
	name: string;
	email: string;
	phone: string;
	cv: string;
	job: string;
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

export interface Job {
	position: string;
	status: string;
	level: string;
	branch: string;
	cadidates: number;
	created_date: string;
}
