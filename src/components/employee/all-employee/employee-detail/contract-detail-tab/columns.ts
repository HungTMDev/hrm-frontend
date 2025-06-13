import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import Right from '@/assets/icons/Outline/AltArrowRight.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import type { IActionGroupType, IContractDetails } from '@/types';
import {
	createPathFromServerDomain,
	formatISOStringToLocalDateTime,
	formatStatus,
} from '@/lib/utils';

export const contractDetailColumns = (
	handleOpenView: (payload: any, edit?: boolean) => void,
): ColumnDef<IContractDetails>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			if (!row.original.contract_detail.document_name) {
				return null;
			}

			const handleExpand = (e: any) => {
				e.stopPropagation();
				row.toggleExpanded();
			};
			return row.getCanExpand()
				? h('button', { onClick: handleExpand, class: 'flex gap-2 items-center' }, [
						h(IconFromSvg, {
							icon: Right,
							class: ['duration-300', row.getIsExpanded() ? 'rotate-90' : 'rotate-0'],
						}),
						h('p', row.original.contract_detail.document_name),
					])
				: h('p', { class: 'w-[200px]' }, row.original.contract_detail.document_name);
		},
	},
	{
		accessorKey: 'contract_type',
		header: 'Contract type',
		cell: ({ row }) =>
			h('p', { class: 'w-[100px]' }, formatStatus(row.original.contract_type ?? '')),
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'start_date',
		header: 'Start day',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.start_date ?? undefined).date,
	},
	{
		accessorKey: 'end_date',
		header: 'End date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.end_date ?? undefined).date,
	},
	{
		accessorKey: 'file',
		header: 'File',
		cell: ({ row }) => {
			return h(
				'a',
				{
					onClick: (event: any) => event.stopPropagation(),
					href: createPathFromServerDomain(row.original.contract_detail.storage_path),
					target: '_blank',
					class:
						'text-blue-500 px-3 py-1 bg-blue-50 rounded-xl flex gap-2 items-center justify-center w-fit',
				},
				'File',
			);
		},
	},
	{
		accessorKey: 'created_by',
		header: 'Created by',
		cell: ({ row }) => h('p', { class: 'w-[120px]' }, row.original.created_by.name),
	},
	{
		accessorKey: 'created_date',
		header: 'Created date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.created_at).date,
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: ({ row }) => h('p', { class: '' }, row.original.notes),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			if (row.depth > 0) return null;

			const actions: IActionGroupType[] = [
				{
					label: 'View',
					icon: Eye,
					style: 'text-slate-600',
				},
				{
					label: 'Edit',
					icon: Pen2,
					style: 'text-slate-600',
				},
			];

			const onView = () => {
				handleOpenView(row.original);
			};

			const onEdit = () => {
				handleOpenView(row.original, true);
			};

			return h(ActionGroupCommon, { actions, onView, onEdit });
		},
	},
];
