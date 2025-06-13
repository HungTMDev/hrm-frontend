import { DOCUMENT_TYPE } from '@/constants';
import { z } from 'zod';

export const contractDetailSchema = z.object({
	contract_type: z.string().min(1, 'This field is required'),
	start_date: z.string().min(1, 'This field is required'),
	end_date: z.string().min(1, 'This field is required').optional(),
	status: z.string(),
	contract_detail: z.object({
		user_id: z.string().optional(),
		document_name: z.string().min(1, 'This field is required'),
		document_type: z.string().default(DOCUMENT_TYPE.EMPLOYMENT_CONTRACT),
		file_name: z.string().min(1, 'This field is required').optional(),
		file_type: z.string().min(1, 'This field is required').optional(),
		file_size: z.number().optional(),
		storage_path: z.string().min(1, 'This field is required').optional(),
		description: z.string().min(1, 'This field is required').optional(),
		file: z.instanceof(File),
	}),
	notes: z.string().optional(),
	appendixes: z
		.array(
			z.object({
				user_id: z.string().optional(),
				document_name: z.string().min(1, 'This field is required').optional(),
				document_type: z.string().default(DOCUMENT_TYPE.EMPLOYMENT_CONTRACT).optional(),
				file_name: z.string().min(1, 'This field is required').optional(),
				file_type: z.string().min(1, 'This field is required').optional(),
				file_size: z.number().optional(),
				storage_path: z.string().min(1, 'This field is required').optional(),
				description: z.string().min(1, 'This field is required').optional(),
				file: z.instanceof(File).optional(),
			}),
		)
		.optional(),
});

export type ContractDetailPayload = z.infer<typeof contractDetailSchema>;
