import { z } from 'zod';

export const salaryDefinitionSchema = z.object({
	jobTitle: z.string(),
	level: z.string(),
	averageSalary: z.number(),
	department: z.string(),
	branch: z.string(),
	quarter: z.string(),
});
