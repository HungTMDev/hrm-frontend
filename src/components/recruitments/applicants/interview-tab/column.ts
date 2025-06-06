import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircle from '@/assets/icons/Outline/Close Circle.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import { INTERVIEW_STATUS_STYLE } from '@/constants';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IActionGroupType, IApplicantInterview } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const interviewColumn = (
	handleOpenAlert?: (payload: IApplicantInterview, action: 'cancel' | 'reject') => void,
	handleOpenSheet?: (payload: IApplicantInterview) => void,
	handleHire?: (payload: IApplicantInterview) => void,
): ColumnDef<IApplicantInterview>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.candidate.full_name,
		enableHiding: false,
	},
	{
		accessorKey: 'interviewer',
		header: 'Interviewer',
		cell: ({ row }) => row.original.participants[0]?.name,
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
		accessorKey: 'score',
		header: 'Score',
		cell: ({ row }) => row.original.score,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [INTERVIEW_STATUS_STYLE[row.original.status], 'w-fit'],
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
							label: 'Cancel',
							icon: CloseCircle,
							style: 'text-red-500',
						},
					];
				}
				if (row.original.status === 'CANCELED') {
					return [
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
						// {
						// 	label: 'Schedule interview',
						// 	icon: Calendar,
						// 	style: 'text-slate-600',
						// },
					];
				}
				const arr = [
					{
						label: 'View',
						icon: Eye,
						style: 'text-slate-600',
					},
					{
						label: 'Offer',
						icon: CheckCircle,
						style: 'text-green-500',
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
							// {
							// 	label: 'Schedule interview',
							// 	icon: Calendar,
							// 	style: 'text-slate-600',
							// },
						]
					: arr;
			};

			const onView = () => {
				handleOpenSheet?.(row.original);
			};

			const onCancel = () => {
				handleOpenAlert?.(row.original, 'cancel');
			};

			const onReject = () => {
				handleOpenAlert?.(row.original, 'reject');
			};

			const onOffer = () => {
				handleHire?.(row.original);
			};

			return h(ActionGroupCommon, {
				actions: actions(),
				onCancel,
				onView,
				onReject,
				onOffer,
			});
		},
	},
];
