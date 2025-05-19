<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import Button from '@/components/ui/button/Button.vue';
import { valueUpdater } from '@/lib/utils';
import router from '@/routers';
import type { Applicant } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { onMounted, ref } from 'vue';
import { applicantColumn } from './applicant.column';

const data: Applicant[] = [
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
];

const columnVisibility = ref<VisibilityState>({});

const handleOpenSheet = () => {};
const handleOpenAlert = () => {};

const table = useVueTable({
	data: [],
	columns: applicantColumn(handleOpenSheet, handleOpenAlert),
	getCoreRowModel: getCoreRowModel(),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	state: {
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
});

onMounted(() => {
	table
		.getAllColumns()
		.filter((column) => column.getCanHide())
		.forEach((column) => {
			column.toggleVisibility(false);
		});
});

const handleNavigate = () => {
	router.push('applicants');
};
</script>
<template>
	<div>
		<div class="flex justify-between">
			<Title>Applicants</Title>
			<Button variant="link" class="text-blue-500" @click="handleNavigate">View all</Button>
		</div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search applicants" />
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium">
				<IconFromSvg :icon="UserPlus" />Add new applicant
			</Button>
		</div>
		<div>
			<DataTable :table="table" />
		</div>
	</div>
</template>
