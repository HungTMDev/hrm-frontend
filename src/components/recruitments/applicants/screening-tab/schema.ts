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
	fullname: z.string(),
	phoneNumber: z.string(),
	email: ZUtils.email(),
	branch: z.string(),
	job: z.string(),
	stage: z.string(),
	dob: z.string(),
	gender: z.string(),
	workExperience: z.string(),
	educationLevel: z.string(),
	expectedSalary: z.number(),
	coverLetter: z.string(),
	preliminaryAssessment: z.string(),
	cv: z.string(),
	photo: z.string(),
});
