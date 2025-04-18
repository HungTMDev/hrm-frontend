import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { STATUS_STYLE } from '@/constants';
import type { ActionGroupType, LeaveManagement } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';

export const leaveColumns = (
	handleOpenSheet: (payload: LeaveManagement) => void,
	handleOpenAlert: (payload: LeaveManagement) => void,
): ColumnDef<LeaveManagement>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white border-gray-300 data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
				},
				() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
			),
		cell: ({ row }) =>
			h(Checkbox, {
				onClick: (event: any) => event.stopPropagation(),
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'leaveType',
		header: 'Leave type',
		cell: ({ row }) => h('div', { class: 'text-slate-600' }, row.original.leaveType),
	},
	{
		accessorKey: 'startDate',
		header: 'From',
		cell: ({ row }) => row.original.startDate,
	},
	{
		accessorKey: 'endDate',
		header: 'To',
		cell: ({ row }) => row.original.endDate,
	},
	{
		accessorKey: 'totalDays',
		header: 'Total',
		cell: ({ row }) =>
			`${row.original.totalDays} ${row.original.totalDays > 1 ? 'Days' : 'Day'}`,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [STATUS_STYLE[row.original.status]],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: ActionGroupType[] = [
				{
					label: 'Approve',
					icon: Pen2,
					style: '',
				},
				{
					label: 'Reject',
					icon: Trash,
					style: 'text-red-500 ',
				},
			];

			const onApprove = () => {
				handleOpenSheet(row.original);
			};
			const onReject = () => {
				handleOpenAlert(row.original);
			};

			return h(
				'div',
				{ class: 'flex justify-end pr-2' },
				h(ActionGroupCommon, {
					actions,
					onApprove,
					onReject,
				}),
			);
		},
	},
];
