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
