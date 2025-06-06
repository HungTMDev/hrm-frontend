import {
	default as CheckCircle,
	default as CloseCircle,
} from '@/assets/icons/Outline/Close Circle.svg';
import File from '@/assets/icons/Outline/File.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { IActionGroupType, IApplicant } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const offeringColumn = (
	handleHire: (id: string) => void,
	handleOpenAlert: (payload: IApplicant) => void,
	handleOpenSheet: (payload: IApplicant) => void,
): ColumnDef<IApplicant>[] => [
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
			if (row.original.resume_url === 'REFER') {
				return '';
			}
			return h(
				'a',
				{
					onClick: (event: any) => event.stopPropagation(),
					href: row.original.resume_url,
					target: '_blank',
					class: 'text-blue-500 px-3 py-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center w-fit',
				},
				[h(IconFromSvg, { icon: File }), 'CV'],
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
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
				{
					label: 'Reject',
					icon: CloseCircle,
					style: 'text-red-500',
				},
			];

			const onHire = () => {
				handleHire(row.original.id);
			};

			const onView = () => {
				handleOpenSheet(row.original);
			};

			const onReject = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, {
				actions,
				onHire,
				onReject,
				onView,
			});
		},
	},
];
