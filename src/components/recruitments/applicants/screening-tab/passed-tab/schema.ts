import { z } from 'zod';

export const interviewSchema = z.object({
	interview_date: z.string(),
	interview_time: z.string(),
	interview_type: z.string(),
	interview_name: z.string().min(1, 'This field is required'),
	interviewer: z.array(z.string().min(1, 'This field is required')),
	duration_minutes: z.number(),
	location: z.string().optional(),
	meeting_link: z.string().optional(),
});

export type InterviewFormData = z.infer<typeof interviewSchema>;
