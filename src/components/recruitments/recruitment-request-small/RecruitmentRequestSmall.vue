<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import { recruitmentRequestColumn } from '@/components/recruitments/recruitment-request.column';
import RecruitmentFilter from '@/components/recruitments/RecruitmentFilter.vue';
import RecruitmentSheet from '@/components/recruitments/RecruitmentSheet.vue';
import Button from '@/components/ui/button/Button.vue';
import { ROWS_PER_PAGE } from '@/constants';
import router from '@/routers';
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

const handleOpenSheet = () => {
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const handleNavigate = () => {
	router.push('/recruitments/requests');
};
</script>
<template>
	<ContentWrapper class="flex gap-2 flex-col">
		<div class="flex justify-between items-center">
			<Title>Recruitment requests</Title>
			<Button variant="link" class="text-blue-500" @click="handleNavigate">View all</Button>
		</div>
		<div class="text-end">
			<RecruitmentFilter />
		</div>
		<DataTable :table="table" @row:click="handleOpenSheet" />
	</ContentWrapper>
	<RecruitmentSheet :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
