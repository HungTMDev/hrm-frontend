import StatusTag from '@/components/common/StatusTag.vue';
import { STATUS_STYLE } from '@/constants';
import type { AttendanceOverview } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

export const attendanceOverviewColumn: ColumnDef<AttendanceOverview>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'check_in',
		header: 'Check in',
		cell: ({ row }) => row.original.check_in,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				class: [STATUS_STYLE[row.original.status.toUpperCase()]],
				status: row.original.status,
			}),
	},
];
