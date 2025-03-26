<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import CaseRound from '@/assets/icons/Outline/Case Round Minimalistic.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Trash from '@/assets/icons/Outline/Trash Bin Minimalistic.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { jobColumn } from '@/components/recruitments/jobs/job.column';
import JobSheet from '@/components/recruitments/jobs/JobSheet.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { valueUpdater } from '@/lib/utils';
import type { FilterData, Job } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { ref } from 'vue';

const data: Job[] = [
	{
		position: 'Mobile App Marketer',
		status: 'Opening',
		level: 'Intern',
		branch: 'Đà Nẵng',
		cadidates: 53,
		created_date: 'March 1, 2025',
	},
	{
		position: 'Mobile App Marketer',
		status: 'Opening',
		level: 'Intern',
		branch: 'Hà Nội',
		cadidates: 51,
		created_date: 'March 5, 2025',
	},
	{
		position: 'Data Analyst',
		status: 'Pending',
		level: 'Intern',
		branch: 'Đà Nẵng',
		cadidates: 45,
		created_date: 'May 1, 2025',
	},
	{
		position: 'Content Writer',
		status: 'Opening',
		level: 'Junior',
		branch: 'Đà Nẵng',
		cadidates: 41,
		created_date: 'March 28, 2025',
	},
	{
		position: 'DevOps Engineer',
		status: 'Opening',
		level: 'Senior',
		branch: 'Đà Nẵng',
		cadidates: 36,
		created_date: 'April 20, 2025',
	},
	{
		position: 'Blockchain Developer',
		status: 'Pending',
		level: 'Junior',
		branch: 'Hà Nội',
		cadidates: 34,
		created_date: 'April 30, 2025',
	},
	{
		position: 'Android Developer',
		status: 'Closed',
		level: 'Junior',
		branch: 'Hà Nội',
		cadidates: 31,
		created_date: 'March 14, 2025',
	},
	{
		position: 'Web Developer',
		status: 'Pending',
		level: 'Senior',
		branch: 'Hà Nội',
		cadidates: 29,
		created_date: 'April 15, 2025',
	},
	{
		position: 'Graphic Designer',
		status: 'Closed',
		level: 'Intern',
		branch: 'Đà Nẵng',
		cadidates: 27,
		created_date: 'April 5, 2025',
	},
	{
		position: 'UI/UX Designer',
		status: 'Opening',
		level: 'Intern',
		branch: 'Hà Nội',
		cadidates: 25,
		created_date: 'March 22, 2025',
	},
	{
		position: 'Product Manager',
		status: 'Opening',
		level: 'Mid-level',
		branch: 'Hà Nội',
		cadidates: 22,
		created_date: 'April 2, 2025',
	},
];

const { showToast } = useCustomToast();

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const rowSelection = ref({});
const columnVisibility = ref<VisibilityState>({});
const dataSend = ref<any>();

const handleOpenSheet = () => {
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const handleOpenAlert = (payload: any) => {
	dataSend.value = payload;
	isOpenAlert.value = true;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
	dataSend.value = undefined;
};

const table = useVueTable({
	data,
	columns: jobColumn(handleOpenAlert),
	getCoreRowModel: getCoreRowModel(),
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	state: {
		get rowSelection() {
			return rowSelection.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
	initialState: {
		pagination: {
			pageIndex: 0,
			pageSize: ROWS_PER_PAGE[0],
		},
	},
});

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

const handleFilter = (payload: FilterData[]) => {
	console.log(payload);
};

const handleDelete = () => {
	showToast({
		message: 'Job deleted successfully',
		description: 'The job has been deleted successfully!',
		type: 'success',
	});
};
</script>
<template>
	<ContentWrapper>
		<Title>Jobs</Title>
		<div
			v-if="table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()"
			class="my-4 flex justify-between items-center">
			<p class="text-slate-600">
				{{ table.getFilteredSelectedRowModel().rows.length }} item(s) selected
			</p>
			<Button
				variant="ghost"
				class="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-500 rounded-2xl">
				<IconFromSvg :icon="Trash" />
				Delete
			</Button>
		</div>
		<div v-else class="my-4 flex gap-2 justify-end">
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
			<Button
				class="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
				@click="handleOpenSheet">
				<IconFromSvg :icon="CaseRound" />
				Add new job
			</Button>
		</div>
		<div class="flex flex-col gap-2">
			<DataTable :table="table" />
			<Separator class="mb-4" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<JobSheet :open="isOpenSheet" @update:open="handleCloseSheet" @open-alert="handleOpenAlert" />
	<AlertPopup :open="isOpenAlert" @update:open="handleCloseAlert" @confirm="handleDelete" />
</template>
