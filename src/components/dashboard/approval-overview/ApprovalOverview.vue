<script lang="ts" setup>
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import type { ApprovalOverview } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { approvalOverviewColumn } from './approval-overview.column';

const data: ApprovalOverview[] = [
	{
		name: 'Tran Song Quynh',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'To-do',
	},
	{
		name: 'Huynh Minh Huy',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Rejected',
	},
	{
		name: 'Nguyen Duc Phat',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Approved',
	},
	{
		name: 'Trinh Minh Hung',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Rejected',
	},
	{
		name: 'Huynh Minh Huy',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Rejected',
	},
	{
		name: 'Nguyen Duc Phat',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Approved',
	},
	{
		name: 'Trinh Minh Hung',
		reason: 'Sick leave',
		from: '2025',
		to: '2025',
		status: 'Rejected',
	},
];

defineProps<{
	isLoading?: boolean;
}>();

const table = useVueTable({
	data,
	columns: approvalOverviewColumn,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Approval</Title>
			<Button variant="link" class="text-blue-500">View all</Button>
		</div>

		<div class="text-end">
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
		</div>
		<div>
			<DataTable :table="table" :is-loading="isLoading" />
		</div>
	</div>
</template>
