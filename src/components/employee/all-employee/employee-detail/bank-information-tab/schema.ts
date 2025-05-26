import { z } from 'zod';

export const bankInformationSchema = z.object({
	bank_name: z.string().min(1, 'This field is required'),
	account_number: z.string().min(1, 'This field is required'),
	account_holder_name: z.string().min(1, 'This field is required'),
	bank_branch: z.string().optional(),
});
