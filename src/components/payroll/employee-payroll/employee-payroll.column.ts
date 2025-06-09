import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { formatCurrency } from '@/lib/utils';
import type { IActionGroupType, EmployeePayroll } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';

export const employeePayrollColumn = (
	handleOpenSheet: (payload?: EmployeePayroll, view?: boolean) => void,
	handleOpenAlert: (payload: EmployeePayroll) => void,
): ColumnDef<EmployeePayroll>[] => [
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
		accessorKey: 'salary',
		header: 'Salary',
		cell: ({ row }) => formatCurrency(row.original.salary),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [
					row.original.status === 'Processed'
						? 'bg-green-50 hover:bg-green-50 text-green-500'
						: 'bg-red-50 hover:bg-red-50 text-red-500',
				],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
				},
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500',
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
