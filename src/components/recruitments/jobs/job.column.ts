import Eye from '@/assets/icons/Outline/Eye.svg';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import { listJobStatus } from '@/constants';
import { formatISOStringToLocalDateTime, formatStatus } from '@/lib/utils';
import type { IActionGroupType, IJob } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import JobStatusCell from './JobStatusCell.vue';
import CopyValue from '@/components/common/CopyValue.vue';

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
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => h(CopyValue, { value: row.original.id }),
		enableHiding: false,
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.title,
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
		accessorKey: 'hiring_manager_id',
		header: 'Hiring manager',
		cell: ({ row }) => row.original.hiring_manager.name,
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
		cell: ({ row }) => {
			const onUpdate = (status: string) => {
				handleUpdateStatus(row.original.id, status);
			};

			return h(JobStatusCell, {
				list: listJobStatus,
				modelValue: row.original.status,
				onUpdate,
			});
		},
	},
	// {
	// 	accessorKey: 'action',
	// 	header: 'Action',
	// 	cell: ({ row }) => {
	// 		const actions: IActionGroupType[] = [
	// 			{
	// 				label: 'View',
	// 				icon: Eye,
	// 				style: 'text-slate-600',
	// 			},
	// 		];

	// 		const onView = () => {
	// 			handleOpenSheet(row.original, true);
	// 		};

	// 		return h(ActionGroupCommon, {
	// 			actions,
	// 			onView,
	// 		});
	// 	},
	// },
];
