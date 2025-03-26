import StatusTag from '@/components/common/StatusTag.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { JOB_STATUS_STYLE } from '@/constants';
import type { Job } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { Check, Minus } from 'lucide-vue-next';
import { h } from 'vue';
import JobActionGroup from './JobActionGroup.vue';

export const jobColumn = (handleOpenAlert: (payload: any) => void): ColumnDef<Job>[] => [
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
				() => (table.getIsSomePageRowsSelected() ? h(Minus) : h(Check)),
			),
		cell: ({ row }) =>
			h(Checkbox, {
				modelValue: row.getIsSelected(),
				'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class: 'data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-blue-500 border-gray-300',
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position,
		enableHiding: false,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: JOB_STATUS_STYLE[row.original.status.toLocaleUpperCase()],
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
		cell: ({ row }) => row.original.branch,
	},
	{
		accessorKey: 'cadidates',
		header: 'Candidates',
		cell: ({ row }) => row.original.cadidates,
	},
	{
		accessorKey: 'created_date',
		header: 'Created Date',
		cell: ({ row }) => row.original.created_date,
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: () =>
			h(JobActionGroup, {
				onDelete: handleOpenAlert,
			}),
	},
];
