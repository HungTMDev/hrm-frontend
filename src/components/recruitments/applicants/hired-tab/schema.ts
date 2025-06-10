import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string(),
	email: ZUtils.email(),
	password: ZUtils.password(),
	avatar: z
		.union([
			z.object({
				original_filename: z.string(),
				filename: z.string(),
				format: z.string(),
				resource_type: z.string(),
				url: z.string(),
				path: z.string(),
				bytes: z.number(),
			}),
			z.instanceof(File),
		])
		.optional(),
});

export type CreateUserPayload = z.infer<typeof createUserSchema>;
