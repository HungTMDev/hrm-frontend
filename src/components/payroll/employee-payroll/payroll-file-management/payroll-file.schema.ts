import { z } from 'zod';

export const payrollFileSchema = z.object({
	title: z.string(),
	payrollFile: z.string().optional(),
	status: z.string(),
	payrollPeriod: z.string(),
	uploadDate: z.string(),
	createdBy: z.string(),
	fileName: z.string(),
});
