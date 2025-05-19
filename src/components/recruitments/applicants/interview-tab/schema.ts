import { z } from 'zod';

export const addInterviewerSchema = z.object({
	participant_id: z.string(),
	role: z.string(),
});

export type AddInterviewerPayload = z.infer<typeof addInterviewerSchema>;
