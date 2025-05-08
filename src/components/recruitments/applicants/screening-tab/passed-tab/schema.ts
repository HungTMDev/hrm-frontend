import { z } from 'zod';

export const interviewSchema = z.object({
	interview_1: z.object({
		interview_date: z.string(),
		interview_time: z.string(),
		interviewer: z.array(z.string()),
	}),
	interview_2: z
		.object({
			interview_date: z.string(),
			interview_time: z.string(),
			interviewer: z.array(z.string()),
		})
		.optional(),
});
