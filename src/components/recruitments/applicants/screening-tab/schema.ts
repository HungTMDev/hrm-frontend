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

export const candidateSchema = z.object({
	full_name: z.string().min(1, 'This field is required'),
	email: ZUtils.email(),
	phone_number: ZUtils.phoneNumber(),
	avatar: z.string().optional(),
	gender: z.string().optional(),
	date_of_birth: z.string(),
	job_id: z.string(),
	applied_at: z.string(),
	expected_salary: z.number(),
	cover_letter: z.string(),
	notes: z.string().optional(),
	attaches: z.array(z.string()).optional(),
	resume_url: z.string().default('REFER'),
	referred_by: z.string().optional(),
});
