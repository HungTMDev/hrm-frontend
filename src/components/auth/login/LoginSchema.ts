import { ZUtils } from '@/lib/validation.utils';
import * as z from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: ZUtils.password(),
});
