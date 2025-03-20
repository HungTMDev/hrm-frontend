import type { Employee } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import EmployeeActionGroup from './EmployeeActionGroup.vue';
import { h } from 'vue';

export const employeeColumn = (
	handleEdit: () => void,
	handleDelete: () => void,
): ColumnDef<Employee>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => row.original.id,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: () => h(EmployeeActionGroup, { onEdit: handleEdit, onDelete: handleDelete }),
	},
];
