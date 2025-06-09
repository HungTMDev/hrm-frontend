import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import Right from '@/assets/icons/Outline/AltArrowRight.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import type { IActionGroupType } from '@/types';

export const contractDetailColumns = (
	handleOpenView: (payload: any, edit?: boolean) => void,
): ColumnDef<any>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			if (!row.original.name) {
				return null;
			}

			const handleExpand = (e: any) => {
				e.stopPropagation();
				row.toggleExpanded();
			};
			return row.getCanExpand()
				? h(
						'button',
						{ onClick: handleExpand, class: 'flex gap-2 items-center w-[120px]' },
						[
							h(IconFromSvg, {
								icon: Right,
								class: [
									'duration-300',
									row.getIsExpanded() ? 'rotate-90' : 'rotate-0',
								],
							}),
							h('p', row.original.name),
						],
					)
				: row.original.name;
		},
	},
	{
		accessorKey: 'contract_type',
		header: 'Contract type',
		cell: ({ row }) => h('p', { class: 'w-[100px]' }, row.original.contract_type),
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'start_date',
		header: 'Start day',
		cell: ({ row }) => h('p', { class: 'w-[100px]' }, row.original.start_date),
	},
	{
		accessorKey: 'end_date',
		header: 'End date',
		cell: ({ row }) => h('p', { class: 'w-[100px]' }, row.original.end_date),
	},
	{
		accessorKey: 'file',
		header: 'File',
	},
	{
		accessorKey: 'created_by',
		header: 'Created by',
		cell: ({ row }) => h('p', { class: 'w-[120px]' }, row.original.created_by),
	},
	{
		accessorKey: 'created_date',
		header: 'Created date',
		cell: ({ row }) => h('p', { class: 'w-[100px]' }, row.original.created_date),
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: ({ row }) => h('p', { class: 'w-[500px]' }, row.original.notes),
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
