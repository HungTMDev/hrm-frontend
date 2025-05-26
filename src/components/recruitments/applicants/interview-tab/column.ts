import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { INTERVIEW_STATUS_STYLE } from '@/constants';
import { cn, formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IActionGroupType, IApplicantInterview } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';

export const interviewColumn = (
	handleComplete?: (payload: IApplicantInterview) => void,
	handleOpenAlert?: (payload: IApplicantInterview) => void,
	handleOpenSheet?: (payload: IApplicantInterview) => void,
	handleOpenDialog?: (payload: IApplicantInterview) => void,
): ColumnDef<IApplicantInterview>[] => [
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
		cell: ({ row }) => row.original.participants[0].name,
		enableHiding: false,
	},
	{
		accessorKey: 'interview_date',
		header: 'Interview date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.scheduled_time).date,
		enableHiding: false,
	},
	{
		accessorKey: 'interview_time',
		header: 'Interview time',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.scheduled_time).time,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [INTERVIEW_STATUS_STYLE[row.original.status]],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions = (): IActionGroupType[] => {
				if (row.original.status === 'SCHEDULED') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Complete',
							icon: CheckCircle,
							style: 'text-green-500',
						},
						{
							label: 'Cancel',
							icon: CloseCircle,
							style: 'text-red-500',
						},
					];
				}
				if (row.original.status === 'CANCELED') {
					const arr = [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Reject',
							icon: CloseCircle,
							style: 'text-red-500',
						},
					];
					return row.original.stage === 'INTERVIEW_1'
						? [
								...arr,
								{
									label: 'Schedule interview',
									icon: Calendar,
									style: 'text-slate-600',
								},
							]
						: arr;
				}
				const arr = [
					{
						label: 'View',
						icon: Eye,
						style: 'text-slate-600',
					},
					{
						label: 'Hire',
						icon: CheckCircle,
						style: 'text-green-500',
					},
				];
				return row.original.stage === 'INTERVIEW_1'
					? [
							...arr,
							{
								label: 'Schedule interview',
								icon: Calendar,
								style: 'text-slate-600',
							},
						]
					: arr;
			};

			const onView = () => {
				handleOpenSheet?.(row.original);
			};

			const onComplete = () => {
				handleComplete?.(row.original);
			};

			const onCancel = () => {
				handleOpenAlert?.(row.original);
			};

			const onScheduleInterview = () => {
				handleOpenDialog?.(row.original);
			};

			return h(ActionGroupCommon, {
				actions: actions(),
				onComplete,
				onCancel,
				onView,
				onScheduleInterview,
				class: cn(row.original.status === 'CANCELED' && 'w-[200px]'),
			});
		},
	},
];
