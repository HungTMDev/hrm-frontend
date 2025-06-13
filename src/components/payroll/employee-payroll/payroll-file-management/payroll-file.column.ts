import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { PayrollFileManagement } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import PayrollFileActionGroup from './PayrollFileActionGroup.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { PAYROLL_FILE_STATUS_STYLE } from '@/constants';

export const payrollFileColumn = (
	handleOpenSheet: (payload?: PayrollFileManagement, view?: boolean) => void,
	handleOpenAlert: (payload?: PayrollFileManagement) => void,
): ColumnDef<PayrollFileManagement>[] => [
	{
		id: 'select',
		header: ({ table }) =>
			h(
				Checkbox,
				{
					onClick: (event: any) => event.stopPropagation(),
					modelValue:
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate'),
					'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
					ariaLabel: 'Select all',
					class:
						'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
				},
				() => (table.getIsSomePageRowsSelected() ? h(Minus, { size: 14 }) : h(Check, { size: 14 })),
			),
		cell: ({ row }) =>
			h(
				Checkbox,
				{
					onClick: (event: any) => event.stopPropagation(),
					modelValue: row.getIsSelected(),
					'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
					ariaLabel: 'Select row',
					class:
						' data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
				},
				() => h(Check, { size: 14 }),
			),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'fileName',
		header: 'File Name',
		cell: ({ row }) => row.original.fileName,
	},
	{
		accessorKey: 'payrollOf',
		header: 'Payroll Of',
		cell: ({ row }) => row.original.payrollOf,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [PAYROLL_FILE_STATUS_STYLE[row.original.status], 'w-fit'],
			}),
	},
	{
		accessorKey: 'createBy',
		header: 'Create By',
		cell: ({ row }) => row.original.createBy,
	},
	{
		accessorKey: 'uploadDate',
		header: 'Upload Date',
		cell: ({ row }) => row.original.uploadDate,
	},
	{
		accessorKey: 'payrollPeroid',
		header: 'Payroll Peroid',
		cell: ({ row }) => row.original.payrollPeroid,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const onEdit = () => {
				handleOpenSheet(row.original);
			};

			const onDelete = () => {
				handleOpenAlert(row.original);
			};
			return h(PayrollFileActionGroup, { onEdit, onDelete });
		},
	},
];
