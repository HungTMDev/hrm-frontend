<script lang="ts" setup>
import { Search, SlidersHorizontal, UserRoundPlus } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { candidateColumn } from './candidate.column';
import type { Candidate } from '@/types';
import DataTable from '@/components/datatable/DataTable.vue';
import Title from '@/components/common/Title.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

const data: Candidate[] = [
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		stage: 'Applied',
	},
];

const table = useVueTable({
	data,
	columns: candidateColumn,
	getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
	<div>
		<div>
			<Title>Candidates</Title>
		</div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon :icon="Search" class="py-2 flex-1" placeholder="Search candidates" />
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium">
				<IconFromSvg :icon="UserPlus" />Add new candidate
			</Button>
		</div>
		<div>
			<DataTable :table="table" />
		</div>
	</div>
</template>
