import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const employeeSchema = [
	z.object({
		employee_name: z.string().min(1, 'This field is required'),
		employee_id: z.string().min(1, 'This field is required'),
		date_of_birth: z.string().min(1, 'This field is required'),
		gender: z.string().min(1, 'This field is required'),
		phone_number: ZUtils.phoneNumber(),
		personal_email: ZUtils.email(),
		employee_email: ZUtils.email(),
		address: z.string().min(1, 'This field is required').optional(),
		emergency_contact: ZUtils.phoneNumber(),
		emergency_contact_name: z.string().min(1, 'This field is required').optional(),
		hometown: z.string().min(1, 'This field is required').optional(),
	}),
	z.object({
		branch_id: z.string().min(1, 'This field is required'),
		department_id: z.string().min(1, 'This field is required'),
		position_id: z.string().min(1, 'This field is required'),
		level: z.string().optional(),
		line_manager_id: z.string().min(1, 'This field is required'),
		salary: z.number(),
		joining_date: z.string().min(1, 'This field is required'),
		work_status: z.string().min(1, 'This field is required'),
		working_hours: z.string().min(1, 'This field is required'),
		work_status_end_date: z.string().min(1, 'This field is required'),
		job_description: z.string().min(1, 'This field is required').optional(),
	}),
	z.object({
		bank_name: z.string().min(1, 'This field is required'),
		account_number: z.string().min(1, 'This field is required'),
		account_holder_name: z.string().min(1, 'This field is required'),
		bank_branch: z.string().min(1, 'This field is required').optional(),
	}),
	z.object({
		contract_type: z.string().min(1, 'This field is required'),
		contract_start_date: z.string().min(1, 'This field is required'),
		contract_end_date: z.string().min(1, 'This field is required'),
		contract_status: z.string().min(1, 'This field is required'),
		contract_file: z
			.instanceof(File)
			.refine((file) => file.size > 0, { message: 'File is required' }),
	}),
	z.object({
		photo: z.instanceof(File).refine((file) => file.size > 0, { message: 'File is required' }),
		cv: z.instanceof(File).refine((file) => file.size > 0, { message: 'File is required' }),
		degree_or_certificate: z
			.instanceof(File)
			.refine((file) => file.size > 0, { message: 'File is required' }),
		id: z.instanceof(File).refine((file) => file.size > 0, { message: 'File is required' }),
	}),
];
