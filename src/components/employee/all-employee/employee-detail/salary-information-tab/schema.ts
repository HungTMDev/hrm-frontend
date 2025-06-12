import { z } from 'zod';

export const salaryInformationSchema = z.object({
	base_salary: z.number(),
	commission: z.number().optional(),
	salary_type: z.string(),
	allowance: z.object({
		amount: z.number().optional(),
	}),
	deduction: z.object({
		amount: z.number().optional(),
	}),
	benefits: z.object({
		amount: z.number().optional(),
	}),
	insurance: z.array(z.string()),
	effective_date: z.string(),
	end_date: z.string().optional(),
	approver_id: z.string(),
	reason: z.string().optional(),
	note: z.string().optional(),
});

export type SalaryInformationPayload = z.infer<typeof salaryInformationSchema>;
