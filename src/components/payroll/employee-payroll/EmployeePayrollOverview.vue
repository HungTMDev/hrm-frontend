<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import Upload from '@/assets/icons/Outline/UploadMinimalistic.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import { formatCurrency } from '@/lib/utils';
import router from '@/routers';
import type { EmployeePayroll } from '@/types';
import { getCoreRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table';
const data: EmployeePayroll[] = [
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 0,
		status: 'Pending',
		salary: 80000000,
		department: 'Design',
		level: 'Junior',
	},
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 1000000,
		status: 'Pending',
		salary: 8000000,
		department: 'Design',
		level: 'Junior',
	},
	{
		name: 'Tran Song Quynh',
		role: 'Software Engineer',
		deduction: 2000000,
		status: 'Pending',
		salary: 80000000,
		department: 'Design',
		level: 'Junior',
	},
];

const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.original.name,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => row.original.role,
	},
	{
		accessorKey: 'salary',
		header: 'Salary',
		cell: ({ row }) => formatCurrency(row.original.salary),
	},
	{
		accessorKey: 'deduction',
		header: 'Deduction',
		cell: ({ row }) => {
			if (row.original.deduction === 0) {
				return '-';
			}
			return formatCurrency(row.original.deduction);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => row.original.status,
	},
];

const table = useVueTable({
	data,
	columns,
	getCoreRowModel: getCoreRowModel(),
});

const handleNavigate = () => {
	router.push('/payroll/employee-payroll');
};
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Employee Payroll</Title>
			<Button class="text-blue-500" variant="link" @click="handleNavigate"> View all</Button>
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
