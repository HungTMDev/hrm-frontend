<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import Upload from '@/assets/icons/Outline/Upload Minimalistic.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import type { EmployeePayroll } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { employeePayrollColumn } from './employee-payroll.column';

const data: EmployeePayroll[] = [
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 0,
		status: 'Pending',
		salary: 80000000,
	},
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 1000000,
		status: 'Pending',
		salary: 8000000,
	},
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 2000000,
		status: 'Pending',
		salary: 80000000,
	},
];

const table = useVueTable({
	data,
	columns: employeePayrollColumn,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Employee Payroll</Title>
			<Button class="text-blue-500" variant="link"> View all</Button>
		</div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				class="py-2 flex-1 rounded-full"
				placeholder="Search employee"
				:icon="Magnifer" />
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-3xl">
				<IconFromSvg :icon="Upload" />Upload
			</Button>
		</div>
		<div>
			<DataTable :table="table" />
		</div>
	</div>
</template>
