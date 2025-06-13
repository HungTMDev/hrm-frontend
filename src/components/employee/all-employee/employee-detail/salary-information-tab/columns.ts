import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { ISalaryInformation } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';

export const salaryHistoryColumns: ColumnDef<ISalaryInformation>[] = [
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
		cell: ({ row }) => {
			return formatISOStringToLocalDateTime(row.original.effective_date).date;
		},
	},
	{
		accessorKey: 'approved_by',
		header: 'Approved by',
		cell: ({ row }) => row.original.approver.name,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
];
