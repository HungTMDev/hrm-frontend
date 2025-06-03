export enum APPLICANT_API {
	BASE = '/applications',
	BY_ID = '/applications/%s',
	UPDATE_STATUS = '/applications/%s/status',
	UPDATE_STAGE = '/applications/%s/stage',
	APPLICANT_INTERVIEW = '/applications/%s/interviews',
}

export enum CANDIDATE_API {
	BASE = '/candidates',
	BY_ID = '/candidates/%s',
}

export enum NOTIFICATION_API {
	SEND_EMAIL = '/notifications/send-mail',
}

export enum INTERVIEW_API {
	BASE = '/interviews',
	BY_ID = '/interviews/%s',
	UPCOMING = '/interviews/upcoming',
	CANCEL = '/interviews/%s/cancel',
	COMPLETE = '/interviews/%s/complete',
	PARTICIPANTS = '/interviews/%s/participants',
	DELETE_PARTICIPANT = '/interviews/%s/participants/%s',
	FEEDBACK = '/interviews/%s/feedback',
	HANDLE_FEEDBACK = '/interviews-feedback/%s',
}
