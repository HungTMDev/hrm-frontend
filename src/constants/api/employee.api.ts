export enum EMPLOYEE_API {
	BASE = '/employees',
	BY_ID = '/employees/%s',
	RESTORE = '/employees/%s/restore',
	ARCHIVED = '/employees/%s/archived',

	PERSONAL_INFORMATION = '/employees/%s/personal-information',

	WORK_INFORMATION = '/employees/%s/work-information',
	WORK_INFORMATION_HISTORY = '/employees/%s/work-information/history',
	WORK_INFORMATION_BY_ID = '/employees/%s/work-information/%s',

	SALARY = '/employees/%s/salary',
	SALARY_BY_ID = '/employees/%s/salary/%s',
	SALARY_HISTORY = '/employees/%s/salary/histories',

	BANK_INFORMATION = '/employees/%s/bank-information',
	BANK_INFORMATION_BY_ID = '/employees/%s/bank-information/%s',

	CONTRACT_INFORMATION = '/employees/%s/contract-information',
	CONTRACT_INFORMATION_STATUS = '/employees/%s/contract-information/status',
	CONTRACT_INFORMATION_BY_ID = '/employees/%s/contract-information/%s',

	INSURANCE_INFORMATION = '/employees/%s/insurance-information',
	INSURANCE_INFORMATION_BY_ID = '/employees/%s/insurance-information/%s',
}
