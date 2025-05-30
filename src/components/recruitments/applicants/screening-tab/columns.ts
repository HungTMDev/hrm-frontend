import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import File from '@/assets/icons/Outline/File.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { APPLICANT_STATUS_STYLE } from '@/constants';
import type { IActionGroupType, IApplicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import { cn } from '@/lib/utils';

export const screeningColumn = (payload: {
	handleOpenSheet?: (payload?: IApplicant, view?: boolean) => void;
	handleOpenAlert?: (payload: IApplicant) => void;
	handleStage?: (action: string, payload: IApplicant) => void;
	handleOpenDialog?: (payload: IApplicant) => void;
}): ColumnDef<IApplicant>[] => [
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
		accessorKey: 'email',
		header: 'Email address',
		cell: ({ row }) => row.original.candidate.email,
		enableHiding: false,
	},
	{
		accessorKey: 'phone',
		header: 'Phone number',
		cell: ({ row }) => row.original.candidate.phone_number,
		enableHiding: false,
	},
	{
		accessorKey: 'job',
		header: 'Job',
		cell: ({ row }) => row.original.job.title,
	},
	{
		accessorKey: 'cv',
		header: 'CV',
		cell: ({ row }) => {
			return h(
				'a',
				{
					onClick: (event: any) => event.stopPropagation(),
					href: row.original.resume_url,
					target: '_blank',
					class: 'text-blue-500 p-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center',
				},
				[h(IconFromSvg, { icon: File }), 'CV'],
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.application_status,
				class: APPLICANT_STATUS_STYLE[row.original.application_status],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] =
				row.original.current_stage === 'APPLIED'
					? [
							{
								label: 'View',
								icon: Eye,
								style: 'text-slate-600',
							},
							{
								label: 'Pass',
								icon: CheckCircle,
								style: 'text-green-500 ',
							},
							{
								label: 'Fail',
								icon: CloseCircle,
								style: 'text-red-500 ',
							},
						]
					: [
							{
								label: 'View',
								icon: Eye,
								style: 'text-slate-600',
							},
							{
								label: 'Schedule interview',
								icon: Calendar,
								style: 'text-slate-600',
							},
							{
								label: 'Send email',
								icon: Letter,
								style: 'text-slate-600',
							},
						];

			const onView = () => {
				payload.handleOpenSheet?.(row.original, true);
			};

			const onPass = () => {
				payload.handleStage?.('PASS', row.original);
			};

			const onFail = () => {
				payload.handleStage?.('FAIL', row.original);
			};

			const onEdit = () => {
				payload.handleOpenSheet?.(row.original);
			};

			const onDelete = () => {
				payload.handleOpenAlert?.(row.original);
			};

			const onSendEmail = () => {
				console.log(111);
			};

			const onScheduleInterview = () => {
				payload.handleOpenDialog?.(row.original);
			};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
				onView,
				onPass,
				onFail,
				onScheduleInterview,
				onSendEmail,
				class: cn(row.original.current_stage === 'SCREENING' && 'w-[200px]'),
			});
		},
	},
];
