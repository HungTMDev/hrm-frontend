import type { ColumnDef } from '@tanstack/vue-table';

export const attendanceHistoryColumn: ColumnDef<any>[] = [
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'day',
		header: 'Day',
	},
	{
		accessorKey: 'check_in',
		header: 'Check in',
	},
	{
		accessorKey: 'check_out',
		header: 'Check out',
	},
	{
		accessorKey: 'workday_count',
		header: 'Workday count',
	},
	{
		accessorKey: 'workhour_count',
		header: 'Workhour count',
	},
	{
		accessorKey: 'overtime_day',
		header: 'Overtime day',
	},
	{
		accessorKey: 'overtime_hours',
		header: 'Overtime hours',
	},
	{
		accessorKey: 'late_checkin',
		header: 'Late checkin',
	},
	{
		accessorKey: 'early_checkout',
		header: 'Early checkout',
	},
	{
		accessorKey: 'total_worked_hours',
		header: 'Total worked hours',
	},
];

export const attendanceColumn: ColumnDef<any>[] = [
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'day',
		header: 'Day',
	},
	{
		accessorKey: 'time',
		header: 'Time',
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];

export const overtimeColumn: ColumnDef<any>[] = [
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'start_time',
		header: 'Start time',
	},
	{
		accessorKey: 'end_time',
		header: 'End time',
	},
	{
		accessorKey: 'overtime_hours',
		header: 'Overtime hours',
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];
