import { z } from 'zod';

export const insuranceInformationSchema = z.object({
	insurance_number: z.string().optional(),
	insurance_provider: z.string().optional(),
	insurance_type: z.string().optional(),
	insurance_contribution: z.string().optional(),
	insurance_start_date: z.string().optional(),
	insurance_end_date: z.string().optional(),
});
