import { STATUS_STYLE } from '@/constants';
import type { ActionGroupType, RecruitmentRequest } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { Checkbox } from '../../ui/checkbox';
import { Check, Minus } from 'lucide-vue-next';
import Eye from '@/assets/icons/Outline/Eye.svg';
import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Case from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import StatusTag from '@/components/common/StatusTag.vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';

export const recruitmentRequestColumn = (): ColumnDef<RecruitmentRequest>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white border-gray-300',
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
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => row.original.quantity,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'request_from',
		header: 'Request From',
		cell: ({ row }) => row.original.request_from,
	},
	{
		accessorKey: 'expected_date',
		header: 'Expected Date',
		cell: ({ row }) => row.original.expected_date,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				class: [STATUS_STYLE[row.original.status]],
				status: row.original.status,
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: ActionGroupType[] =
				row.original.status !== 'Approved'
					? [
							{
								label: 'View',
								icon: Eye,
								style: 'text-slate-600',
							},
							{
								label: 'Approve',
								icon: CheckCircle,
								style: 'text-green-500',
							},
							{
								label: 'Reject',
								icon: CloseCircle,
								style: 'text-red-500',
							},
						]
					: [
							{
								label: 'View',
								icon: Eye,
								style: 'text-slate-600',
							},
							{
								label: 'Create job',
								icon: Case,
								style: 'text-slate-600',
							},
						];
			return h(ActionGroupCommon, { actions });
		},
	},
];
