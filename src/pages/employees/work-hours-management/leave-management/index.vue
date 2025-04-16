<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { leaveColumns } from '@/components/employee/work-hours-management/leave-management/leave.column';
import LeaveSheet from '@/components/employee/work-hours-management/leave-management/LeaveSheet.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import { useEmployeeStore } from '@/stores/employee.store';
import type { FilterAccordion, LeaveManagement } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { onBeforeMount, ref } from 'vue';
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import Chart2 from '@/assets/icons/Outline/Chart 2.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Hiking from '@/assets/icons/Outline/Hiking.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';

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
		value: 'leave_type',
		title: 'Leave type',
		items: [
			{
				label: 'Annual Leave',
				value: 'annual',
			},
			{
				label: 'Sick Leave',
				value: 'sick',
			},
			{
				label: 'Maternity Leave',
				value: 'maternity',
			},
			{
				label: 'Unpaid Leave',
				value: 'unpaid',
			},
			{
				label: 'Business Leave',
				value: 'business',
			},
			{
				label: 'Holiday Leave',
				value: 'holiday',
			},
			{
				label: 'Other',
				value: 'other',
			},
		],
		icon: Hiking,
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

const employeeStore = useEmployeeStore();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const dataSent = ref<LeaveManagement>();

const handleOpenSheet = (payload?: LeaveManagement) => {
	dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: LeaveManagement) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return employeeStore.leaves;
	},
	columns: leaveColumns(handleOpenSheet, handleOpenAlert),
	getCoreRowModel: getCoreRowModel(),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	state: {
		get columnVisibility() {
			return columnVisibility.value;
		},
		get rowSelection() {
			return rowSelection.value;
		},
	},
	initialState: {
		pagination: {
			pageIndex: 0,
			pageSize: ROWS_PER_PAGE[0],
		},
	},
});

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};

onBeforeMount(() => {
	if (employeeStore.leaves.length === 0) {
		employeeStore.getAllLeave();
	}
});
</script>
<template>
	<ContentWrapper>
		<Title>Leave management</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search employee" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" />
		</div>
		<div class="flex flex-col gap-2">
			<DataTable :table="table" @row:click="handleOpenSheet" />
			<Separator class="mt-3" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<LeaveSheet :open="isOpenSheet" @update:open="handleCloseSheet" :data="dataSent" />
	<AlertPopup :open="isOpenAlert" @update:open="handleCloseAlert" />
</template>
