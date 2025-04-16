import { STATUS_STYLE } from '@/constants';
import type { RecruitmentRequest } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import StatusTag from '../common/StatusTag.vue';

export const recruitmentRequestColumn = (): ColumnDef<RecruitmentRequest>[] => [
	{
		accessorKey: 'position',
		header: 'Position',
		cell: ({ row }) => row.original.position,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => row.original.quantity,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'request_from',
		header: 'Request From',
		cell: ({ row }) => row.original.request_from,
	},
	{
		accessorKey: 'expected_date',
		header: 'Expected Date',
		cell: ({ row }) => row.original.expected_date,
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
