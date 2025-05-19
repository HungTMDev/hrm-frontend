import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { JOB_STATUS_STYLE } from '@/constants';
import type { IActionGroupType, IJob } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';

export const jobColumn = (
	handleOpenSheet: (payload?: IJob, view?: boolean) => void,
	handleOpenAlert: (payload: IJob) => void,
): ColumnDef<IJob>[] => [
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
					class: 'data-[state=checked]:bg-blue-500 border-gray-300 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white ',
				},
				() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
			),
		cell: ({ row }) =>
			h(Checkbox, {
				onClick: (event: any) => event.stopPropagation(),
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class: 'data-[state=checked]:bg-blue-500 border-gray-300 data-[state=checked]:text-white data-[state=checked]:border-blue-500 ',
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position.title,
		enableHiding: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: JOB_STATUS_STYLE[row.original.status],
			}),
	},

	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'branch',
		header: 'Branch',
		cell: ({ row }) => row.original.branch.name,
	},
	{
		accessorKey: 'employmentType',
		header: 'Employment type',
		cell: ({ row }) => row.original.employment_type,
	},
	{
		accessorKey: 'hiring_manager',
		header: 'Hiring manager',
		cell: ({ row }) => row.original.hiring_manager.name,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions: IActionGroupType[] = [
				{
					label: 'Edit',
					icon: Pen2,
					style: '',
				},
				{
					label: 'Delete',
					icon: Trash,
					style: 'text-red-500 ',
				},
			];

			const onEdit = () => {
				handleOpenSheet(row.original);
			};
			const onDelete = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
			});
		},
	},
];
