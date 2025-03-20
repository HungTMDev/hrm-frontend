<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request.column';
import RecruitmentFilter from '@/components/recruitments/RecruitmentFilter.vue';
import RecruitmentSheet from '@/components/recruitments/RecruitmentSheet.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import type { RecruitmentRequest } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

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
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<Title>Recruitment requests</Title>
		<div class="text-end">
			<RecruitmentFilter />
		</div>
		<DataTable :table="table" @row:click="handleOpenSheet" />
		<Separator class="mb-4" />
		<DataTablePagination :table="table" />
	</ContentWrapper>
	<RecruitmentSheet :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
