<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { attendanceColumn, attendanceHistoryColumn, overtimeColumn } from './columns';
import DataTable from '@/components/datatable/DataTable.vue';
import { useAppStore } from '@/stores/app.store';
import Separator from '@/components/ui/separator/Separator.vue';

const appStore = useAppStore();

const attendanceHistoryTable = useVueTable({
	data: [],
	columns: attendanceHistoryColumn,
	getCoreRowModel: getCoreRowModel(),
});

const attendanceTable = useVueTable({
	data: [],
	columns: attendanceColumn,
	getCoreRowModel: getCoreRowModel(),
});

const overtimeTable = useVueTable({
	data: [],
	columns: overtimeColumn,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<ScrollArea class="h-[calc(100vh-270px)] pr-3">
		<div>
			<Title class="text-xl">Attendance history</Title>
			<ScrollArea
				class="border rounded-2xl p-1 pb-3 w-[calc(100vw-650px)] transition-all duration-300 ease-in-out mt-4"
				:class="appStore.isSmallSidebar && 'w-[calc(100vw-496px)]'">
				<DataTable :table="attendanceHistoryTable" />
			</ScrollArea>
		</div>

		<Separator class="my-6" />
		<div>
			<Title class="text-xl">Late arrival / Early leave information</Title>
			<ScrollArea
				class="border rounded-2xl p-1 pb-3 w-[calc(100vw-650px)] transition-all duration-300 ease-in-out mt-4"
				:class="appStore.isSmallSidebar && 'w-[calc(100vw-496px)]'">
				<DataTable :table="attendanceTable" />
			</ScrollArea>
		</div>

		<Separator class="my-6" />
		<div>
			<Title class="text-xl">Overtime information</Title>
			<ScrollArea
				class="border rounded-2xl p-1 pb-3 w-[calc(100vw-650px)] transition-all duration-300 ease-in-out mt-4"
				:class="appStore.isSmallSidebar && 'w-[calc(100vw-496px)]'">
				<DataTable :table="overtimeTable" />
			</ScrollArea>
		</div>
	</ScrollArea>
</template>
