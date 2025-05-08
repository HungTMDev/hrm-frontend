import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { ActionGroupType } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import Eye from '@/assets/icons/Outline/Eye.svg';
import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';

export const screeningColumn = (
	tab: string,
	handleOpenDialog?: (payload?: any) => void,
	handleOpenSheet?: (payload?: any, isView?: boolean) => void,
): ColumnDef<any>[] => [
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
		accessorKey: 'email',
		header: 'Email address',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone number',
		cell: ({ row }) => row.original.phone_number,
	},
	{
		accessorKey: 'job',
		header: 'Job',
		cell: ({ row }) => row.original.job,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => row.original.status,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: ActionGroupType[] =
				tab === 'applied'
					? [
							{
								label: 'View',
								icon: Eye,
							},
							{
								label: 'Pass',
								icon: CheckCircle,
								style: 'text-green-500',
							},
							{
								label: 'Fail',
								icon: CloseCircle,
								style: 'text-red-500',
							},
						]
					: [
							{
								label: 'View',
								icon: Eye,
							},
							{
								label: 'Schedule interview',
								icon: Calendar,
							},
							{
								label: 'Send email',
								icon: Letter,
							},
						];

			const onScheduleInterview = () => {
				handleOpenDialog!(row.original);
			};
			return h(ActionGroupCommon, { class: 'w-48', actions, onScheduleInterview });
		},
	},
];
