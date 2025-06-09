import Calendar from '@/assets/icons/Outline/Calendar.svg';
import CheckCircle from '@/assets/icons/Outline/CheckCircle.svg';
import CloseCircle from '@/assets/icons/Outline/CloseCircle.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import File from '@/assets/icons/Outline/File.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { cn, formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IActionGroupType, IApplicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const screeningColumn = (payload: {
	handleOpenSheet?: (payload?: IApplicant, view?: boolean, isCreateSchedule?: boolean) => void;
	handleOpenAlert?: (payload: IApplicant, action: 'delete' | 'reject') => void;
	handleStage?: (action: string, payload: IApplicant) => void;
	handleOpenDialog?: (payload: IApplicant) => void;
}): ColumnDef<IApplicant>[] => [
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
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.job.title,
	},
	{
		accessorKey: 'cv',
		header: () => h('div', { class: 'w-[100px]' }, 'CV'),
		cell: ({ row }) => {
			if (!row.original.resume_url) {
				return '';
			}
			return h(
				'a',
				{
					onClick: (event: any) => event.stopPropagation(),
					href: row.original.resume_url.url,
					target: '_blank',
					class: 'text-blue-500 px-3 py-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center w-fit',
				},
				[h(IconFromSvg, { icon: File }), 'CV'],
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: 'created_at',
		header: 'Created at',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.created_at).date,
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
							{
								label: 'Delete',
								icon: Trash,
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
								label: 'Reject',
								icon: CloseCircle,
								style: 'text-red-500',
							},
						];

			const onView = () => {
				payload.handleOpenSheet?.(row.original, true);
			};

			const onPass = () => {
				payload.handleStage?.('PASS', row.original);
			};

			const onEdit = () => {
				payload.handleOpenSheet?.(row.original);
			};

			const onDelete = () => {
				payload.handleOpenAlert?.(row.original, 'delete');
			};

			const onFail = () => {
				payload.handleOpenAlert?.(row.original, 'reject');
			};

			const onReject = () => {
				payload.handleOpenAlert?.(row.original, 'reject');
			};

			const onScheduleInterview = () => {
				payload.handleOpenSheet?.(row.original, true, true);
			};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
				onView,
				onPass,
				onScheduleInterview,
				onReject,
				onFail,
				class: cn(row.original.current_stage === 'SCREENING' && 'w-[200px]'),
			});
		},
	},
];
