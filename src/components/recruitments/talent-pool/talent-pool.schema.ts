import { z } from 'zod';

export const talentPoolSchema = z.object({
	name: z.string(),
	job_title: z.string(),
	level: z.string(),
	branch: z.string(),
	email: z.string(),
	phone_number: z.string(),
	dob: z.string(),
	gender: z.string(),
	work_experience: z.string(),
	education_level: z.string(),
	attachment: z.array(z.string()).optional(),
	photo: z.string().optional(),
});
