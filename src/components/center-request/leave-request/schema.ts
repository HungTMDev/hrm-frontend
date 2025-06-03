import { ZUtils } from '@/lib/validation.utils';
import { z } from 'zod';

export const leaveRequestSchema = z
	.object({
		leave_reason: z.string(),
		leave_time_type: z.string(),
		leave_shift: z.string().optional(),
		start_date: z.string().optional(),
		end_date: z.string().optional(),
		date: z.string().optional(),
		start_time: z.string().optional(),
		end_time: z.string().optional(),
		attached_file: z.string().optional(),
		cc: z.array(ZUtils.email()),
	})
	.refine((data) => data.leave_time_type !== 'FULL_DAY' || !!data.date, {
		message: 'This field is required',
		path: ['date'],
	})
	.refine((data) => data.leave_time_type !== 'HALF_DAY' || !!data.date, {
		message: 'This field is required',
		path: ['date'],
	})
	.refine((data) => data.leave_time_type !== 'HALF_DAY' || !!data.leave_shift, {
		message: 'This field is required',
		path: ['leave_shift'],
	})
	.refine((data) => data.leave_time_type !== 'HOURLY' || !!data.date, {
		message: 'This field is required',
		path: ['date'],
	})
	.refine((data) => data.leave_time_type !== 'HOURLY' || !!data.start_time, {
		message: 'This field is required',
		path: ['start_time'],
	})
	.refine((data) => data.leave_time_type !== 'HOURLY' || !!data.end_time, {
		message: 'This field is required',
		path: ['end_time'],
	})
	.refine((data) => data.leave_time_type !== 'MANY_DAY' || !!data.start_date, {
		message: 'This field is required',
		path: ['start_date'],
	})
	.refine((data) => data.leave_time_type !== 'MANY_DAY' || !!data.end_date, {
		message: 'This field is required',
		path: ['end_date'],
	});
