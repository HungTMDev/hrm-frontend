import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { IActionGroupType, ICandidate } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import { formatISOStringToLocalDateTime } from '@/lib/utils';

export const talentPoolColumns = (
	handleOpenSheet: (payload?: ICandidate, view?: boolean) => void,
	handleOpenAlert: (payload?: ICandidate) => void,
): ColumnDef<ICandidate>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white border-gray-300',
				},
				() =>
					table.getIsSomePageRowsSelected()
						? h(Minus, { size: 14 })
						: h(Check, { size: 14 }),
			),
		cell: ({ row }) =>
			h(
				Checkbox,
				{
					onClick: (event: any) => event.stopPropagation(),
					modelValue: row.getIsSelected(),
					'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
					ariaLabel: 'Select row',
					class: ' data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
				},
				() => h(Check, { size: 14 }),
			),
		enableSorting: false,
		enableHiding: false,
	},
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
		accessorKey: 'last_modified',
		header: 'Last Modified',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.updated_at).date,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
				},
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
