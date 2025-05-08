export interface Applicant {
	name: string;
	email: string;
	phone: string;
	cv: string;
	job: string;
	stage: string;
	status?: string;
}

export interface RecruitmentRequest {
	position: string;
	quantity: number;
	level: string;
	request_from: string;
	expected_date: string;
	status: string;
	reason?: string;
}

export interface Job {
	position: string;
	status: string;
	level: string;
	branch: string;
	cadidates: number;
	created_date: string;
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
