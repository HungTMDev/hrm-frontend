import { z } from 'zod';

export const contractDetailSchema = z.object({
	contract_type: z.string().min(1, 'This field is required'),
	contract_name: z.string().min(1, 'This field is required'),
	contract_start_date: z.string().min(1, 'This field is required'),
	contract_end_date: z.string().min(1, 'This field is required'),
	contract_status: z.string().min(1, 'This field is required'),
	contract_file: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'File is required' }),
	contract_notes: z.string().min(1, 'This field is required'),
	appendixes: z
		.array(
			z.object({
				appendix_name: z.string().min(1, 'This field is required'),
				appendix_file: z
					.instanceof(File)
					.refine((file) => file.size > 0, { message: 'File is required' }),
				appendix_start_date: z.string().min(1, 'This field is required'),
				appendix_end_date: z.string().min(1, 'This field is required'),
				appendix_notes: z.string().min(1, 'This field is required'),
			}),
		)
		.optional(),
});
