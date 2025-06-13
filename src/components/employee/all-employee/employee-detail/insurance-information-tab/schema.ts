import { z } from 'zod';

export const insuranceInformationSchema = z.object({
	insurance_number: z.string().optional(),
	insurance_provider: z.string().optional(),
	insurance_type: z.string().optional(),
	insurance_contribution: z.number().optional(),
	start_date: z.string().optional(),
	end_date: z.string().optional(),
});

export type InsuranceInformationPayload = z.infer<typeof insuranceInformationSchema>;
