import Eye from '@/assets/icons/Outline/Eye.svg';
import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { IActionGroupType, IApplicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';

export const interviewColumn = (): ColumnDef<IApplicant>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 border-gray-300 overflow-hidden data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white',
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
		cell: ({ row }) => row.original.candidate.full_name,
		enableHiding: false,
	},
	{
		accessorKey: 'interviewer',
		header: 'Interviewer',
		cell: ({ row }) => '',
		enableHiding: false,
	},
	{
		accessorKey: 'interview_date',
		header: 'Interview date',
		cell: ({ row }) => '',
		enableHiding: false,
	},
	{
		accessorKey: 'interview_time',
		header: 'Interview time',
		cell: ({ row }) => '',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => '',
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'View',
					icon: Eye,
					style: '',
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
			];

			return h(ActionGroupCommon, {
				actions,
			});
		},
	},
];
