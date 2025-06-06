import { z } from 'zod';

export const jobSchema = z.object({
	branch_id: z.string(),
	requisition_id: z.string().optional(),
	department_id: z.string(),
	position_id: z.string(),
	hiring_manager_id: z.string(),
	level: z.union([z.string(), z.array(z.string())]),
	employment_type: z.string(),
	quantity: z.number(),
	due_date: z.string().optional(),
	title: z.string(),
	description: z.string(),
	requirements: z.string(),
	location: z.string().optional(),
	gender: z.string().optional(),
	education_level: z.string().optional(),
	work_experience: z.string().optional(),
});
export type JobPayloadType = z.infer<typeof jobSchema>;
