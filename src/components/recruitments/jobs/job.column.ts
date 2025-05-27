import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { JOB_STATUS_STYLE } from '@/constants';
import type { IActionGroupType, IJob } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import Pen2 from '@/assets/icons/Outline/Pen 2.svg';
import Eye from '@/assets/icons/Outline/Eye.svg';
import CheckCircel from '@/assets/icons/Outline/Check Circle.svg';
import CloseCircel from '@/assets/icons/Outline/Check Circle.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import Pause from '@/assets/icons/Outline/Pause Circle.svg';
import { formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';

export const jobColumn = (
	handleOpenSheet: (payload?: IJob, view?: boolean) => void,
	handleOpenAlert: (payload: IJob) => void,
	handleUpdateStatus: (id: string, status: string) => void,
): ColumnDef<IJob>[] => [
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
	// 				class: 'data-[state=checked]:bg-blue-500 border-gray-300 data-[state=checked]:text-white data-[state=checked]:border-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:text-white ',
	// 			},
	// 			() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
	// 		),
	// 	cell: ({ row }) =>
	// 		h(Checkbox, {
	// 			onClick: (event: any) => event.stopPropagation(),
	// 			modelValue: row.getIsSelected(),
	// 			'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
	// 			ariaLabel: 'Select row',
	// 			class: 'data-[state=checked]:bg-blue-500 border-gray-300 data-[state=checked]:text-white data-[state=checked]:border-blue-500 ',
	// 		}),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position.title,
		enableHiding: false,
	},

	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => formatStatus(row.original.level as string),
	},
	{
		accessorKey: 'branch',
		header: 'Branch',
		cell: ({ row }) => row.original.branch.name,
	},
	{
		accessorKey: 'candidates',
		header: 'Candidates',
		cell: ({ row }) => row.original.application_count,
	},
	{
		accessorKey: 'created_at',
		header: 'Created date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.created_at).date,
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
		accessorKey: 'candidates',
		header: 'Candidates',
		cell: ({ row }) => row.original.application_count,
	},
	{
		accessorKey: 'created_date',
		header: 'Created date',
		cell: ({ row }) => formatISOStringToLocalDateTime(row.original.created_at).date,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			const actions = (): IActionGroupType[] => {
				if (row.original.status === 'DRAFT') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Edit',
							icon: Pen2,
							style: 'text-yellow-500',
						},
						{
							label: 'Open',
							icon: CheckCircel,
							style: 'text-green-500',
						},
						{
							label: 'Delete',
							icon: Trash,
							style: 'text-red-500 ',
						},
					];
				}

				if (row.original.status === 'OPENING') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Pending',
							icon: Pause,
							style: 'text-yellow-500',
						},
						{
							label: 'Close',
							icon: CloseCircel,
							style: 'text-red-500 ',
						},
					];
				}

				if (row.original.status === 'PENDING') {
					return [
						{
							label: 'View',
							icon: Eye,
							style: 'text-slate-600',
						},
						{
							label: 'Open',
							icon: CheckCircel,
							style: 'text-green-500',
						},
						{
							label: 'Close',
							icon: CloseCircel,
							style: 'text-red-500 ',
						},
					];
				}

				return [
					{
						label: 'View',
						icon: Eye,
						style: 'text-slate-600',
					},
					{
						label: 'Open',
						icon: CheckCircel,
						style: 'text-green-500',
					},
					{
						label: 'Delete',
						icon: Trash,
						style: 'text-red-500 ',
					},
				];
			};

			const onView = () => {
				handleOpenSheet(row.original);
			};

			const onOpen = () => {
				handleUpdateStatus(row.original.id, 'OPENING');
			};

			const onPending = () => {
				handleUpdateStatus(row.original.id, 'PENDING');
			};

			const onClose = () => {
				handleUpdateStatus(row.original.id, 'CLOSED');
			};

			const onEdit = () => {
				handleOpenSheet(row.original);
			};
			const onDelete = () => {
				handleOpenAlert(row.original);
			};

			return h(ActionGroupCommon, {
				actions: actions(),
				onEdit,
				onDelete,
				onView,
				onOpen,
				onPending,
				onClose,
			});
		},
	},
];
