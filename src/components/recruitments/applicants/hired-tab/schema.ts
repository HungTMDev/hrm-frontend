import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const createEmployeeFromApplicantSchema = z.object({
	email: ZUtils.email(),
	personal_email: ZUtils.email(),
	phone_number: ZUtils.phoneNumber(),
	name: z.string().min(1, 'This field is required'),
	avatar: z.union([z.string(), z.instanceof(File)]).optional(),
	date_of_birth: z.string().optional(),
	gender: z.string(),
	employee_number: z.string(),
	address: z.string().optional(),
	hometown: z.string().optional(),
	permanent_residence: z.string().optional(),
	nationality: z.string().optional(),
	emergency_contact_name: z.string().optional(),
	emergency_contact: z.string().optional(),
	marital_status: z.string().optional(),
});

export type CreateEmployeeFromApplicantPayload = z.infer<typeof createEmployeeFromApplicantSchema>;
