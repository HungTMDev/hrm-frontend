import { z } from 'zod';

export const recruitmentRequestSchema = z.object({
	branch_id: z.string(),
	department_id: z.string(),
	position_id: z.string(),
	title: z.string().min(1, 'This field is required'),
	level: z.string(),
	employment_type: z.string(),
	quantity: z.coerce
		.number()
		.min(1, 'Quantity must be at least 1')
		.max(1000, 'Quantity is too high'),
	justification: z.string(),
	expected_start_date: z.string(),
	description: z.string(),
	skills_required: z.array(z.string()),
	recruiter_id: z.string(),
});

export type RecruitmentRequestPayload = z.infer<typeof recruitmentRequestSchema>;
