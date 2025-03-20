<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { documentsColumn } from '@/components/documents/documents.column';
import Button from '@/components/ui/button/Button.vue';
import { ROWS_PER_PAGE } from '@/constants';
import type { Document } from '@/types';
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { Search, SlidersHorizontal, Upload } from 'lucide-vue-next';
import { onBeforeMount } from 'vue';
import { toast } from 'vue-sonner';

const data: Document[] = [
	{
		name: 'company_profile.pdf',
		create_by: 'Lê Thị Linh Ly',
		createdAt: 'March 11, 2025',
		description: 'Official Company Profile 2025',
		share_with: 'All Employees',
	},
	{
		name: 'promotion_announcement.pdf',
		create_by: 'Lê Thị Linh Ly',
		createdAt: 'March 11, 2025',
		description: 'Promotion Announcement',
		share_with: 'All Employees',
	},
	{
		name: 'financial_report_Q1_2025.pdf',
		create_by: 'Trần Thanh Kim Ngân',
		createdAt: 'April 15, 2025',
		description: 'Q1 Financial Report',
		share_with: 'Leader/Manager',
	},
	{
		name: 'product_launch_plan_2025.pdf',
		create_by: 'Lê Quốc Nghĩa',
		createdAt: 'April 28, 2025',
		description: 'Product Launch Plan 2025',
		share_with: 'Development',
	},
	{
		name: 'employee_handbook_2025.pdf',
		create_by: 'Lê Thị Linh Ly',
		createdAt: 'May 1, 2025',
		description: 'Employee Handbook 2025',
		share_with: 'All Employees',
	},
	{
		name: 'project_overview_initiative_x.pdf',
		create_by: 'Trần Duy Mai Dung',
		createdAt: 'June 10, 2025',
		description: 'Initiative X Overview',
		share_with: 'Product',
	},
];

const handleDownload = () => {
	const loadingToast = toast.loading('Loading...');
	setTimeout(() => {
		toast.dismiss(loadingToast);
		toast.success('Success');
	}, 1000);
};

const table = useVueTable({
	data,
	columns: documentsColumn(handleDownload),
	getCoreRowModel: getCoreRowModel(),
	initialState: {
		pagination: { pageIndex: 0, pageSize: ROWS_PER_PAGE[0] },
	},
});

onBeforeMount(() => {
	console.log('Mounted');
});
</script>
<template>
	<ContentWrapper>
		<Title>Documents </Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon class="py-2 flex-1" :icon="Search" placeholder="Search document..." />
			<Button variant="outline" class="w-fit rounded-full">
				<SlidersHorizontal /> Filter
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-3xl">
				<Upload />Upload document</Button
			>
		</div>
		<div class="flex flex-col gap-4">
			<DataTable :table="table" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
</template>
