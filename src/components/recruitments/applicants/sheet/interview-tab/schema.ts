import { z } from 'zod';

export const meetingScheduleSchema = z
	.object({
		interview_date: z.string(),
		interview_time: z.string(),
		confirmation_before_time: z.string(),
		confirmation_before_date: z.string(),
		interview_type: z.string(),
		interview_name: z.string().min(1, 'This field is required'),
		interviewer: z.array(z.string().min(1, 'This field is required')),
		location: z.string().optional(),
		coordinator: z.string(),
		duration_minutes: z.number().min(30).optional(),
		meeting_link: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.interview_type === 'IN_PERSON') {
				return !!data.location?.trim();
			}
			return true;
		},
		{
			message: 'Location is required for offline interviews',
			path: ['location'],
		},
	)
	.refine(
		(data) => {
			if (data.interview_type === 'ONLINE') {
				return !!data.meeting_link?.trim();
			}
			return true;
		},
		{
			message: 'Meeting link is required for online interviews',
			path: ['meeting_link'],
		},
	);

export type MeetingSchedulePayload = z.infer<typeof meetingScheduleSchema>;
