export enum JOB_API {
	BASE = '/jobs',
	BY_ID = '/jobs/%s',
	UPDATE_STATUS = '/jobs/%s/status',
	GET_APPLICANTS_FOR_JOB = '/jobs/%s/applications',
	UPLOAD_APPLICANT_FOR_JOB = '/jobs/%s/applications/upload',
	APPLICANTS = '/jobs/%s/applications',
}
