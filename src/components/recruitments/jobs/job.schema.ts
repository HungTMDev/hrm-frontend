import { z } from 'zod';

export const jobSchema = z.object({
	jobName: z.string(),
	jobStatus: z.string().min(1, 'Job status is required'),
	department: z.string().min(1, 'Department is required'),
	level: z.string().min(1, 'Level is required'),
	quantity: z.coerce
		.number()
		.min(1, 'Quantity must be at least 1')
		.max(1000, 'Quantity is too high'),
	educationLevel: z.string().min(1, 'Education level is required'),
	gender: z.string().optional(),
	branch: z.string().min(1, 'Branch is required'),
	role: z.string().min(1, 'Role is required'),
	employmentType: z.string().min(1, 'Employment type is required'),
	expectedClosingDate: z
		.string()
		.optional()
		.refine(
			(date) => !date || !isNaN(Date.parse(date)),
			'Invalid date format (expected: YYYY-MM-DD)',
		),
	workExperience: z.string().min(1, 'Work experience is required'),
	appearance: z.string().optional(),
});
