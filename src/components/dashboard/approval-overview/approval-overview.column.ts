import StatusTag from '@/components/common/StatusTag.vue';
import { STATUS_STYLE } from '@/constants';
import type { ApprovalOverview } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const approvalOverviewColumn: ColumnDef<ApprovalOverview>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		cell: ({ row }) => row.original.reason,
	},
	{
		accessorKey: 'from',
		header: 'From',
		cell: ({ row }) => row.original.from,
	},
	{
		accessorKey: 'to',
		header: 'To',
		cell: ({ row }) => row.original.to,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				class: [STATUS_STYLE[row.original.status]],
				status: row.original.status,
			}),
	},
];
