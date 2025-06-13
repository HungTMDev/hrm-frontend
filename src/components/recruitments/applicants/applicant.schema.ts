import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const applicantSchema = z.object({
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

export const interviewSchema = z.object({
	interview_date: z.string(),
	interview_time: z.string(),
	interview_type: z.string(),
	interview_name: z.string().min(1, 'This field is required'),
	interviewer: z.array(z.string().min(1, 'This field is required')),
	duration_minutes: z.number(),
	location: z.string().optional(),
	meeting_link: z.string().optional(),
});

export type InterviewFormData = z.infer<typeof interviewSchema>;
