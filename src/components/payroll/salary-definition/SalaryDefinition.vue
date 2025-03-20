<script lang="ts" setup>
import Title from '@/components/common/Title.vue';
import Button from '@/components/ui/button/Button.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { salaryDefinitionColumn } from './salary-definition.column';
import type { SalaryDefinition } from '@/types';
import DataTable from '@/components/datatable/DataTable.vue';

const data: SalaryDefinition[] = [
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

const table = useVueTable({
	data,
	columns: salaryDefinitionColumn,
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
