import { z } from 'zod';

export const assetSchema = z.object({
	asset_id: z.string(),
	asset_type: z.string(),
	status: z.string(),
	assign_date: z.string(),
	details: z.array(z.string()),
	notes: z.string().optional(),
});
