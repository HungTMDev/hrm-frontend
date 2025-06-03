export enum RECRUITMENT_REQUEST_API {
	BASE = '/requisitions',
	BY_ID = '/requisitions/%s',
	APPROVALS = '/requisitions/%s/approvals',
	CANCEL_REQUEST = '/requisitions/%s/cancel-request',
	CANCEL_APPROVAL = '/requisitions/%s/cancel-approval',
	CANCEL_REJECTION = '/requisitions/%s/cancel-rejection',
	APPROVE = '/requisitions/%s/approve',
	REJECT = '/requisitions/%s/reject',
	SUBMIT = '/requisitions/%s/submit',
	RECALL = '/requisitions/%s/draft',
}
