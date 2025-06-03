import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import type { LeaveHistory } from './type';
import StatusTag from '@/components/common/StatusTag.vue';
import { LEAVE_REQUEST_STATUS_STYLE } from '@/constants';

export const leaveHistoryColumn = (
	handleOpenView: (payload: LeaveHistory, edit?: boolean) => void,
): ColumnDef<LeaveHistory>[] => [
	{
		accessorKey: 'leave_type',
		header: 'Leave type',
	},
	{
		accessorKey: 'leave_start_day',
		header: 'Leave start day',
	},
	{
		accessorKey: 'leave_end_day',
		header: 'Leave end date',
	},
	{
		accessorKey: 'duration',
		header: 'Duration',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: LEAVE_REQUEST_STATUS_STYLE[row.original.status],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			return h(ActionGroupCommon, { actions: [] });
		},
	},
];
