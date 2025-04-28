import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { formatCurrency } from '@/lib/utils';
import type { ActionGroupType, SalaryDefinition } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';

export const salaryDefinitionColumn = (
	handleOpenSheet: (payload?: SalaryDefinition, view?: boolean) => void,
	handleOpenAlert: (payload?: SalaryDefinition) => void,
): ColumnDef<SalaryDefinition>[] => [
	{
		id: 'select',
		header: ({ table }) =>
			h(
				Checkbox,
				{
					modelValue:
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate'),
					'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
					ariaLabel: 'Select all',
					class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
				},
				() =>
					table.getIsSomePageRowsSelected()
						? h(Minus, { size: 14 })
						: h(Check, { size: 14 }),
			),
		cell: ({ row }) =>
			h(
				Checkbox,
				{
					onClick: (event: any) => event.stopPropagation(),
					modelValue: row.getIsSelected(),
					'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
					ariaLabel: 'Select row',
					class: ' data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
				},
				() => h(Check, { size: 14 }),
			),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'jobTitle',
		header: 'Job title',
		cell: ({ row }) => row.original.jobTitle,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		cell: ({ row }) => row.original.department,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'averageSalary',
		header: 'Average salary',
		cell: ({ row }) => formatCurrency(row.original.averageSalary),
	},
	{
		accessorKey: 'lastUpdate',
		header: 'Last update',
		cell: ({ row }) => row.original.lastUpdate,
	},
	{
		accessorKey: 'quarter',
		header: 'Quarter',
		cell: ({ row }) => row.original.quarter,
	},
	{
		accessorKey: 'createdBy',
		header: 'Created by',
		cell: ({ row }) => row.original.createdBy,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: ActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
				},
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500 ',
				},
			];

			const onEdit = () => {
				handleOpenSheet(row.original);
			};

			const onDelete = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, { actions, onEdit, onDelete });
		},
	},
];
