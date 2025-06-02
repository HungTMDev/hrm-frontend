import { z } from 'zod';

export const addInterviewerSchema = z.object({
	participant_id: z.string(),
	role: z.string(),
});

export type AddInterviewerPayload = z.infer<typeof addInterviewerSchema>;

export const interviewFeedbackScheama = z.object({
	score: z
		.number({ invalid_type_error: 'Score must be a number' })
		.min(0, 'Score must be at least 0')
		.max(10, 'Score must be at most 10'),
	recommendation: z.string().min(1, 'Recommendation is required'),
	strengths: z.union([z.string().min(1, 'Strengths are required'), z.array(z.string())]),
	weaknesses: z.union([z.string().min(1, 'Weaknesses are required'), z.array(z.string())]),
	comments: z.string().min(1, 'Comments are required'),
});

export type InterviewerFeedbackPayload = z.infer<typeof interviewFeedbackScheama>;
