export interface SalaryDefinition {
	jobTitle: string;
	level: string;
	averageSalary: number;
	department: string;
	lastUpdate: string;
	quarter: string;
	createdBy: string;
}

export interface PayrollFileManagement {
	fileName: string;
	payrollOf: string;
	status: string;
	createBy: string;
	uploadDate: string;
	payrollPeroid: string;
}
