import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const personalInformationSchema = z.object({
	email: ZUtils.email(),
	personal_email: ZUtils.email(),
	phone_number: ZUtils.phoneNumber(),
	name: z.string().min(1, 'This field is required'),
	avatar: z.union([z.string(), z.instanceof(File)]).optional(),
	date_of_birth: z.string().min(1, 'This field is required'),
	gender: z.string(),
	employee_number: z.string().min(1, 'This field is required'),
	address: z.string().min(1, 'This field is required').optional(),
	hometown: z.string().min(1, 'This field is required').optional(),
	permanent_residence: z.string().min(1, 'This field is required').optional(),
	nationality: z.string().min(1, 'This field is required').optional(),
	emergency_contact: ZUtils.phoneNumber().optional(),
	emergency_contact_name: z.string().min(1, 'This field is required').optional(),
	marital_status: z.string().optional(),
});

export type PersonalInformationPayload = z.infer<typeof personalInformationSchema>;
export const personalInformationKeys = Object.keys(
	personalInformationSchema.shape,
) as (keyof PersonalInformationPayload)[];

export const workInformationSchema = z.object({
	branch_id: z.string().min(1, 'This field is required'),
	department_id: z.string().min(1, 'This field is required'),
	position_id: z.string().min(1, 'This field is required'),
	team_id: z.string().min(1, 'This field is required').optional(),
	level: z.string().optional(),
	manager_id: z.string().min(1, 'This field is required'),
	salary: z.number(),
	start_date: z.string().min(1, 'This field is required'),
	end_date: z.string().min(1, 'This field is required').optional(),
	work_status: z.string().min(1, 'This field is required'),
	work_location: z.string().min(1, 'This field is required').optional(),
	work_hour: z.string().min(1, 'This field is required'),
	shift_start_time: z.string().min(1, 'This field is required').optional(),
	shift_end_time: z.string().min(1, 'This field is required').optional(),
	job_description: z
		.union([z.string().min(1, 'This field is required'), z.array(z.string())])
		.optional(),
	change_reason: z.string().optional(),
});

export type WorkInformationPayload = z.infer<typeof workInformationSchema>;
export const workInformationKeys = Object.keys(
	workInformationSchema.shape,
) as (keyof WorkInformationPayload)[];

export const bankInformationSchema = z.object({
	bank_name: z.string().min(1, 'This field is required'),
	account_number: z.string().min(1, 'This field is required'),
	account_holder_name: z.string().min(1, 'This field is required'),
	bank_branch: z.string().min(1, 'This field is required'),
});

export type BankInformationPayload = z.infer<typeof bankInformationSchema>;
export const bankInformationKeys = Object.keys(
	bankInformationSchema.shape,
) as (keyof BankInformationPayload)[];

export const contractInformationSchema = z.object({
	contract_type: z.string().min(1, 'This field is required'),
	start_date: z.string().min(1, 'This field is required').optional(),
	end_date: z.string().min(1, 'This field is required').optional(),
	contract_start_date: z.string().min(1, 'This field is required'),
	contract_end_date: z.string().min(1, 'This field is required').optional(),
	status: z.string().min(1, 'This field is required'),
	contract_detail: z.object({
		user_id: z.string().optional(),
		document_name: z.string().min(1, 'This field is required'),
		document_type: z.string().min(1, 'This field is required').default('EMPLOYEE_CONTRACT'),
		file_name: z.string().min(1, 'This field is required').optional(),
		file_type: z.string().min(1, 'This field is required').optional(),
		file_size: z.number().optional(),
		storage_path: z.string().min(1, 'This field is required').optional(),
		description: z.string().min(1, 'This field is required').optional(),
		file: z.instanceof(File),
	}),
});

export type ContractInformationPayload = z.infer<typeof contractInformationSchema>;
export const contractInformationKeys = Object.keys(
	contractInformationSchema.shape,
) as (keyof ContractInformationPayload)[];

export const documentSchema = z.array(
	z.object({
		user_id: z.string().optional(),
		document_name: z.string().min(1, 'This field is required'),
		document_type: z.string().min(1, 'This field is required'),
		file_name: z.string().min(1, 'This field is required').optional(),
		file_type: z.string().min(1, 'This field is required').optional(),
		file_size: z.number().optional(),
		storage_path: z.string().min(1, 'This field is required').optional(),
		description: z.string().min(1, 'This field is required').optional(),
		file: z.instanceof(File).optional(),
	}),
);
export type DocumentPayload = z.infer<typeof documentSchema>;

export const employeeSchema = [
	personalInformationSchema,
	workInformationSchema,
	bankInformationSchema,
	contractInformationSchema,
	z.object({
		documents: documentSchema,
	}),
];

export type CreateEmployeePayload = {
	personal_information: PersonalInformationPayload;
	work_information: WorkInformationPayload;
	bank_information: BankInformationPayload;
	contract_information: ContractInformationPayload;
	documents: z.infer<typeof documentSchema>;
};
