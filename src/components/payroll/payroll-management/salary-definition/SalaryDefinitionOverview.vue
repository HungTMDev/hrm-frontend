<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import { formatCurrency } from '@/lib/utils';
import { getCoreRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table';

const data = [
	{
		title: 'Android',
		level: 'Jur',
		salary: 25000000,
	},
	{
		title: 'Android',
		level: 'Jur',
		salary: 25000000,
	},
	{
		title: 'Android',
		level: 'Jur',
		salary: 25000000,
	},
	{
		title: 'Android',
		level: 'Jur',
		salary: 25000000,
	},
];

const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => row.original.title,
	},
	{
		accessorKey: 'level',
		header: 'Level',
		cell: ({ row }) => row.original.level,
	},
	{
		accessorKey: 'salary',
		header: 'Salary',
		cell: ({ row }) => formatCurrency(row.original.salary),
	},
];

const table = useVueTable({
	data,
	columns,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Salary Definition</Title>
			<Button variant="link" class="text-blue-500">View all</Button>
		</div>
		<div>
			<DataTable :table="table" />
		</div>
	</div>
</template>
