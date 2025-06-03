import type { ColumnDef } from '@tanstack/vue-table';

export const trainingTabColumn: ColumnDef<any>[] = [
	{
		accessorKey: 'training_program',
		header: 'Training program',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'start_day',
		header: 'Start day',
	},
	{
		accessorKey: 'end_day',
		header: 'End date',
	},
	{
		accessorKey: 'training_type',
		header: 'Training type',
	},
	{
		accessorKey: 'skill_acquired',
		header: 'Skill acquired',
	},
	{
		accessorKey: 'certification',
		header: 'Certification',
	},
	{
		accessorKey: 'mentorship_or_coaching',
		header: 'Mentorship / Coaching',
	},
];
