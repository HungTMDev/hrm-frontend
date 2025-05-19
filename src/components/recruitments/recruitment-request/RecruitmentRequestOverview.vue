<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request/recruitment-request.column';
import RecruitmentSheet from '@/components/recruitments/recruitment-request/RecruitmentRequestSheet.vue';
import Button from '@/components/ui/button/Button.vue';
import { ROWS_PER_PAGE } from '@/constants';
import router from '@/routers';
import type { IRecruitmentRequest } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

const isOpenSheet = ref(false);

// const table = useVueTable({
// 	data:[],
// 	columns: recruitmentRequestColumn(),
// 	getCoreRowModel: getCoreRowModel(),
// 	initialState: {
// 		pagination: {
// 			pageIndex: 0,
// 			pageSize: ROWS_PER_PAGE[0],
// 		},
// 	},
// });

const handleOpenSheet = () => {
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const handleNavigate = () => {
	router.push('/recruitments/requests');
};

const accordionItems = [
	{
		value: 'status',
		title: 'Status',
		items: [
			{
				label: 'To-do',
				value: 'to-do',
			},
			{
				label: 'Rejected',
				value: 'rejected',
			},
			{
				label: 'Approved',
				value: 'approved',
			},
		],
		icon: ChartSqare,
	},
	{
		value: 'branch',
		title: 'Branch',
		items: [
			{
				label: 'Đà Nẵng',
				value: 'dn',
			},
			{
				label: 'Hà Nội',
				value: 'hn',
			},
		],
		icon: Building3,
	},
	{
		value: 'department',
		title: 'Department',
		items: [
			{
				label: 'Design',
				value: 'design',
			},
			{
				label: 'Marketing',
				value: 'marketing',
			},
			{
				label: 'Product',
				value: 'product',
			},
			{
				label: 'Development',
				value: 'development',
			},
			{
				label: 'Back Office',
				value: 'BO',
			},
			{
				label: 'E-commerce',
				value: 'ecommerce',
			},
		],
		icon: Building,
	},
	{
		value: 'employment_type',
		title: 'Employment type',
		items: [
			{
				label: 'Part-time',
				value: 'part_time',
			},
			{
				label: 'Full-time',
				value: 'full_time',
			},
		],
		icon: Case,
	},
	{
		value: 'level',
		title: 'Level',
		items: [
			{
				label: 'Intern',
				value: 'Intern',
			},
			{
				label: 'Fresher',
				value: 'Fresher',
			},
			{
				label: 'Junior',
				value: 'Junior',
			},
			{
				label: 'Mid-Level',
				value: 'Mid_Level',
			},
			{
				label: 'Senior',
				value: 'Senior',
			},
		],
		icon: Chart2,
	},
];
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<div class="flex justify-between items-center">
			<Title>Recruitment requests</Title>
			<Button variant="link" class="text-blue-500" @click="handleNavigate">View all</Button>
		</div>
		<div class="text-end">
			<FilterPopover :list="[]" />
		</div>
		<!-- <DataTable :table="table" @row:click="handleOpenSheet" /> -->
	</ContentWrapper>
	<RecruitmentSheet :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
