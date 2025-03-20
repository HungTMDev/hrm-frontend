import { formatCurrency } from '@/lib/utils';
import type { SalaryDefinition } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';

export const salaryDefinitionColumn: ColumnDef<SalaryDefinition>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => row.original.title,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'salary',
		header: 'Salary',
		cell: ({ row }) => formatCurrency(row.original.salary),
	},
];
