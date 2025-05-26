import { z } from 'zod';

export const workInformationSchema = z.object({
	branch_id: z.string().min(1, 'Branch is required'),
	department_id: z.string().min(1, 'Department is required'),
	position_id: z.string().min(1, 'Position is required'),
	level: z.string().optional(),
	line_manager_id: z.string().min(1, 'Line manager is required'),
	joining_date: z.string().min(1, 'Joining date is required'),
	work_status: z.string().min(1, 'Work status is required'),
	working_hours: z.string().min(1, 'Working hours is required'),
	work_status_end_date: z.string().min(1, 'Work status end date is required'),
	work_location: z.string().min(1, 'Work location is required'),
	job_description: z.array(z.string()).optional(),
});
