<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request.column';
import RecruitmentSheet from '@/components/recruitments/RecruitmentSheet.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import type { FilterAccordion, RecruitmentRequest } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import { ref } from 'vue';
import FilterPopover from '@/components/common/FilterPopover.vue';

const data: RecruitmentRequest[] = [
	{
		position: 'UI/UX Designer',
		quantity: 1,
		level: 'Intern',
		request_from: 'Nguyễn Đức Phát',
		expected_date: 'March 22, 2025',
		status: 'To-do',
	},
	{
		position: 'Android Developer',
		quantity: 2,
		level: 'Junior',
		request_from: 'Lê Quốc Nghĩa',
		expected_date: 'March 14, 2025',
		status: 'Approved',
	},
	{
		position: 'iOS Developer',
		quantity: 1,
		level: 'Intern',
		request_from: 'Lê Quốc Nghĩa',
		expected_date: 'March 10, 2025',
		status: 'Rejected',
	},
	{
		position: 'Mobile App Marketer',
		quantity: 2,
		level: 'Intern',
		request_from: 'Phạm Anh Tú',
		expected_date: 'March 5, 2025',
		status: 'Approved',
	},
	{
		position: 'Mobile App Marketer',
		quantity: 1,
		level: 'Intern',
		request_from: 'Lê Thị Diệu Hoài',
		expected_date: 'March 1, 2025',
		status: 'Approved',
	},
	{
		position: 'Web Developer',
		quantity: 3,
		level: 'Senior',
		request_from: 'Trịnh Minh Hưng',
		expected_date: 'April 15, 2025',
		status: 'To-do',
	},
	{
		position: 'Graphic Designer',
		quantity: 1,
		level: 'Intern',
		request_from: 'Nguyễn Đức Phát',
		expected_date: 'April 5, 2025',
		status: 'To-do',
	},
	{
		position: 'Product Manager',
		quantity: 1,
		level: 'Mid-level',
		request_from: 'Trần Duy Mai Dung',
		expected_date: 'April 2, 2025',
		status: 'Approved',
	},
	{
		position: 'Content Writer',
		quantity: 2,
		level: 'Junior',
		request_from: 'Nguyễn Thị Thu An',
		expected_date: 'March 28, 2025',
		status: 'Approved',
	},
	{
		position: 'DevOps Engineer',
		quantity: 3,
		level: 'Senior',
		request_from: 'Lê Minh Quân',
		expected_date: 'April 20, 2025',
		status: 'To-do',
	},
	{
		position: 'Blockchain Developer',
		quantity: 2,
		level: 'Junior',
		request_from: 'Nguyễn Thị Ngọc',
		expected_date: 'April 30, 2025',
		status: 'To-do',
	},
	{
		position: 'Data Analyst',
		quantity: 1,
		level: 'Intern',
		request_from: 'Phạm Minh Hậu',
		expected_date: 'May 1, 2025',
		status: 'To-do',
	},
];

const isOpenSheet = ref(false);
const dataSent = ref<RecruitmentRequest>();

const table = useVueTable({
	data,
	columns: recruitmentRequestColumn(),
	getCoreRowModel: getCoreRowModel(),
	initialState: {
		pagination: {
			pageIndex: 0,
			pageSize: ROWS_PER_PAGE[0],
		},
	},
});

const handleOpenSheet = (data: any) => {
	dataSent.value = data;
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const accordionItems: FilterAccordion[] = [
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
		type: 'list',
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
		type: 'list',
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
		type: 'list',
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
		type: 'list',
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
		type: 'list',
	},
];
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<Title>Recruitment requests</Title>
		<div class="text-end">
			<FilterPopover :list="accordionItems" />
		</div>
		<DataTable :table="table" @row:click="handleOpenSheet" />
		<Separator class="mb-4" />
		<DataTablePagination :table="table" />
	</ContentWrapper>
	<RecruitmentSheet :data="dataSent" :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
