import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { ATTENDANCE_STYLE, STATUS_STYLE } from '@/constants';
import type { IActionGroupType, AttendanceManagement } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import StatusTag from '@/components/common/StatusTag.vue';

export const attendanceColumns = (
	handleOpenSheet: (payload: AttendanceManagement) => void,
	handleOpenAlert: (payload: AttendanceManagement) => void,
): ColumnDef<AttendanceManagement>[] => [
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
					class:
						'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white border-gray-300 data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
				},
				() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
			),
		cell: ({ row }) =>
			h(Checkbox, {
				onClick: (event: any) => event.stopPropagation(),
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class:
					'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
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
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'attendance',
		header: 'Attendance',
		cell: ({ row }) =>
			h(
				Badge,
				{
					class: [ATTENDANCE_STYLE[row.original.attendance], 'py-1 px-2 text-sm font-normal'],
				},
				() => row.original.attendance,
			),
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => row.original.date,
	},
	{
		accessorKey: 'time',
		header: 'Time',
		cell: ({ row }) => row.original.time,
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
			const actions: IActionGroupType[] = [
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
