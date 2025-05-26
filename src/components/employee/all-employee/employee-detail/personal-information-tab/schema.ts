import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const personalInformationSchema = z.object({
	employee_name: z.string().min(1, 'This field is required'),
	employee_id: z.string().min(1, 'This field is required'),
	date_of_birth: z.string(),
	gender: z.string().min(1, 'This field required'),
	emergency_contact: z.string().min(1, 'This field is required'),
	emergency_contact_name: z.string().optional(),
	personal_email: ZUtils.email(),
	phone_number: ZUtils.phoneNumber(),
	employee_email: ZUtils.email(),
	nationality: z.string().optional(),
	address: z.string().optional(),
	marital_status: z.string().optional(),
});
