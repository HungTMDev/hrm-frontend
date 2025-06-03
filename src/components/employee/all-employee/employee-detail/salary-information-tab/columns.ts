import type { ColumnDef } from '@tanstack/vue-table';

export const salaryHistoryColumns: ColumnDef<any>[] = [
	{
		accessorKey: 'job_title',
		header: 'Job Title',
	},
	{
		accessorKey: 'old_salary',
		header: 'Old Salary',
	},
	{
		accessorKey: 'new_salary',
		header: 'New Salary',
	},
	{
		accessorKey: 'effective_date',
		header: 'Effective date',
	},
	{
		accessorKey: 'approved_by',
		header: 'Approved by',
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
];
