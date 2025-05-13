export enum APPLICANT_API {
	BASE = '/applications',
	BY_ID = '/applications/%s',
	UPDATE_STATUS = '/applications/%s/status',
	UPDATE_STAGE = '/applications/%s/stage',
}

export enum CANDIDATE_API {
	BASE = '/candidates',
	BY_ID = '/candidates/%s',
}

export enum NOTIFICATION_API {
	SEND_EMAIL = '/notifications/send-mail',
}
