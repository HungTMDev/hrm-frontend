import { z } from 'zod';

export const employeePayrollSchema = z.object({
	employeeName: z.string(),
	salary: z.number(),
	salaryStatus: z.string(),
	payrollStatus: z.string(),
	payrollFile: z.string().optional(),
	branch: z.string(),
	department: z.string(),
	role: z.string(),
	level: z.string(),
	employeeId: z.string(),
	workEmail: z.string(),
	workType: z.string(),
	joiningDate: z.string(),
	lineManager: z.string(),
	contractType: z.string(),
	contractFile: z.string().optional(),
});
