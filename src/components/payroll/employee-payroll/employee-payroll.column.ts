import { formatCurrency } from '@/lib/utils';
import type { EmployeePayroll } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';

export const employeePayrollColumn: ColumnDef<EmployeePayroll>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => row.original.role,
	},
	{
		accessorKey: 'salary',
		header: 'Salary',
		cell: ({ row }) => formatCurrency(row.original.salary),
	},
	{
		accessorKey: 'deduction',
		header: 'Deduction',
		cell: ({ row }) => {
			if (row.original.deduction === 0) {
				return '-';
			}
			return formatCurrency(row.original.deduction);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => row.original.status,
	},
];
