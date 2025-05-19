<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import { ATTENDANCE_STYLE, STATUS_STYLE } from '@/constants';
import router from '@/routers';
import { useEmployeeStore } from '@/stores/employee.store';
import type { AttendanceManagement } from '@/types';
import { getCoreRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table';
import { h, onBeforeMount } from 'vue';

const employeeStore = useEmployeeStore();

const columns: ColumnDef<AttendanceManagement>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'attendance',
		header: 'Attendance',
		cell: ({ row }) =>
			h(
				h(StatusTag, {
					status: row.original.attendance,
					class: [ATTENDANCE_STYLE[row.original.attendance]],
				}),
			),
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => row.original.date,
	},
	{
		accessorKey: 'time',
		header: 'Time',
		cell: ({ row }) => row.original.time,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) =>
			h(StatusTag, {
				status: row.original.status,
				class: [STATUS_STYLE[row.original.status]],
			}),
	},
];

const table = useVueTable({
	get data() {
		return employeeStore.attendances;
	},
	columns,
	getCoreRowModel: getCoreRowModel(),
});

const handleNavigate = () => {
	router.push('/employees/work-hours-management/attendance-management');
};

onBeforeMount(() => {
	if (employeeStore.attendances.length === 0) {
		employeeStore.getAllAttendances();
	}
});
</script>
<template>
	<div class="flex justify-between items-center">
		<Title>Attendance Management</Title>
		<Button variant="link" class="text-blue-500" @click="handleNavigate">View all</Button>
	</div>
	<div class="flex gap-4 items-center my-4">
		<InputWithIcon
			:icon="Magnifer"
			class="py-2 flex-1 rounded-full"
			placeholder="Search employee" />
		<FilterPopover :list="[]" />
	</div>
	<div>
		<DataTable :table="table" />
	</div>
</template>
