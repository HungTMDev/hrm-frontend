import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const invitationEmailSchema = z.object({
	recipient: z.string(),
	position: z.string(),
	title: z.string(),
	work_location: z.string(),
	start_date: z.string(),
	start_time: z.string(),
	salary: z.number(),
	offer_letter: z.string().optional(),
});

export const interviewEmailSchema = z.object({
	recipient: z.string(),
	position: z.string(),
	interview_date: z.string(),
	interview_time: z.string(),
	confirmation_before_date: z.string(),
	confirmation_before_time: z.string(),
	work_location: z.string(),
});

export const thanksEmailSchema = z.object({
	recipient: z.string(),
});

export const addApplicantSchema = z.object({
	full_name: z.string().min(1, 'This field is required'),
	email: ZUtils.email(),
	phone_number: ZUtils.phoneNumber(),
	avatar: z
		.union([
			z.object({
				original_filename: z.string(),
				filename: z.string(),
				format: z.string(),
				resource_type: z.string(),
				url: z.string(),
				path: z.string(),
				bytes: z.number(),
			}),
			z.instanceof(File),
		])
		.optional(),
	resume: z.union([
		z.object({
			original_filename: z.string(),
			filename: z.string(),
			format: z.string(),
			resource_type: z.string(),
			url: z.string(),
			path: z.string(),
			bytes: z.number(),
		}),
		z.instanceof(File),
	]),
	gender: z.string().optional(),
	date_of_birth: z.string().optional(),
	job_id: z.string(),
	applied_at: z.string(),
	expected_salary: z.number().optional(),
	cover_letter: z.string().optional(),
	recruiter_id: z.string().optional(),
	notes: z.string().optional(),
	attaches: z
		.union([
			z.array(z.instanceof(File)),
			z.array(
				z.object({
					original_filename: z.string(),
					filename: z.string(),
					format: z.string(),
					resource_type: z.string(),
					url: z.string(),
					path: z.string(),
					bytes: z.number(),
				}),
			),
		])
		.optional(),
	referred_by: z.string().optional(),
});

export type AddApplicantPayload = z.infer<typeof addApplicantSchema>;
