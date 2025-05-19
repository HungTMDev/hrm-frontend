<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { attendanceOverviewColumn } from './attendance-overview.column';
import type { AttendanceOverview } from '@/types';
import DataTable from '@/components/datatable/DataTable.vue';
import Title from '@/components/common/Title.vue';

const data: AttendanceOverview[] = [
	{
		name: 'Tran Song Quynh',
		check_in: '08:16 AM',
		status: 'Late Arrival',
	},
	{
		name: 'Huynh Minh Huy',
		check_in: '08:16 AM',
		status: 'Absent',
	},
	{
		name: 'Nguyen Duc Phat',
		check_in: '08:16 AM',
		status: 'Present',
	},
	{
		name: 'Trinh Minh Hung',
		check_in: '08:16 AM',
		status: 'Late Arrival',
	},
];

const table = useVueTable({
	data,
	columns: attendanceOverviewColumn,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Attendance Overview</Title>
			<Button variant="link" class="text-blue-500">View all</Button>
		</div>
		<p class="text-sm text-gray-400">Today March 4, 2025</p>
		<div>
			<DataTable :table="table" />
		</div>
	</div>
</template>
