import File from '@/assets/icons/Outline/File.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import type { IActionGroupType, ICandidate } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const talentPoolColumns = (
	handleOpenSheet: (payload?: ICandidate, view?: boolean) => void,
	handleOpenAlert: (payload?: ICandidate) => void,
): ColumnDef<ICandidate>[] => [
	// {
	// 	id: 'select',
	// 	header: ({ table }) =>
	// 		h(
	// 			Checkbox,
	// 			{
	// 				modelValue:
	// 					table.getIsAllPageRowsSelected() ||
	// 					(table.getIsSomePageRowsSelected() && 'indeterminate'),
	// 				'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
	// 				ariaLabel: 'Select all',
	// 				class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white border-gray-300',
	// 			},
	// 			() =>
	// 				table.getIsSomePageRowsSelected()
	// 					? h(Minus, { size: 14 })
	// 					: h(Check, { size: 14 }),
	// 		),
	// 	cell: ({ row }) =>
	// 		h(
	// 			Checkbox,
	// 			{
	// 				onClick: (event: any) => event.stopPropagation(),
	// 				modelValue: row.getIsSelected(),
	// 				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
	// 				ariaLabel: 'Select row',
	// 				class: ' data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
	// 			},
	// 			() => h(Check, { size: 14 }),
	// 		),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.full_name,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.original.email,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		cell: ({ row }) => row.original.phone_number,
	},
	{
		accessorKey: 'cv',
		header: () => h('div', { class: 'w-[100px]' }, 'CV'),
		cell: ({ row }) => {
			if (row.original.resume_url === 'REFER') return '';
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
	// {
	// 	accessorKey: 'job',
	// 	header: 'Job',
	// 	cell: ({ row }) => '',
	// },
	// {
	// 	accessorKey: 'level',
	// 	header: 'Level',
	// 	cell: ({ row }) => '',
	// },
	{
		accessorKey: 'created_by',
		header: 'Created by',
		cell: ({ row }) => row.original.created_by?.name,
	},
	{
		accessorKey: 'updated_at',
		header: 'Last updated',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.updated_at).date,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				// {
				// 	label: 'Edit',
				// 	icon: Pen2,
				// },
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500',
				},
			];

			const onEdit = () => {
				handleOpenSheet(row.original);
			};

			const onDelete = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, { actions, onEdit, onDelete });
		},
	},
];
