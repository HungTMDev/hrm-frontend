import StatusTag from '@/components/common/StatusTag.vue';
import { REQUEST_STATUS_STYLE } from '@/constants';
import type { LeaveRequest } from '@/types/center-request';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import CenterRequestActionCell from '../CenterRequestActionCell.vue';

export const leaveRequestColumns = (
	handleOpenSheet: (payload?: LeaveRequest, view?: boolean) => void,
	handleOpenDialog: (payload?: LeaveRequest) => void,
	handleOpenAlert: (payload?: LeaveRequest) => void,
	handleOpenRejectDialog: (payload?: LeaveRequest) => void,
): ColumnDef<LeaveRequest>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'leave_type',
		header: 'Leave type',
	},
	{
		accessorKey: 'leave_shift',
		header: 'Leave shift',
	},
	{
		accessorKey: 'start_day',
		header: 'Start day',
	},
	{
		accessorKey: 'end_day',
		header: 'End day',
	},
	{
		accessorKey: 'total_days',
		header: 'Total (days)',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: REQUEST_STATUS_STYLE[row.original.status],
			}),
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			return h(CenterRequestActionCell, {
				data: row.original,
				onView: (payload) => handleOpenSheet(payload.data, payload.isView),
				onEdit: (payload) => handleOpenSheet(payload.data, payload.isView),
				onReject: handleOpenRejectDialog,
				onDelete: handleOpenAlert,
				onRecall: handleOpenDialog,
			});
		},
	},
];
