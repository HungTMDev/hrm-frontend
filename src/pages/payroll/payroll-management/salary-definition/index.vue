<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Buildings from '@/assets/icons/Outline/Buildings.svg';
import Calendar from '@/assets/icons/Outline/Calendar.svg';
import ChartSquare from '@/assets/icons/Outline/ChartSquare.svg';
import ClipboardAdd from '@/assets/icons/Outline/ClipboardAdd.svg';
import Dollar from '@/assets/icons/Outline/DollarMinimalistic.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { salaryDefinitionColumn } from '@/components/payroll/payroll-management/salary-definition/salary-definition.column';
import SalaryDefinitionSheet from '@/components/payroll/payroll-management/salary-definition/SalaryDefinitionSheet.vue';
import { Button } from '@/components/ui/button';
import Separator from '@/components/ui/separator/Separator.vue';
import { listJobLevel, ROWS_PER_PAGE } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import { usePayrollStore } from '@/stores/payroll.store';
import type { FilterAccordion, SalaryDefinition } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { onBeforeMount, ref } from 'vue';

const filter: FilterAccordion[] = [
	{
		title: 'Level',
		value: 'level',
		icon: ChartSquare,
		items: listJobLevel,
		type: 'list',
	},
	{
		title: 'Branch',
		value: 'branch',
		icon: Building3,
		items: [
			{ label: 'Đà nẵng', value: 'dn' },
			{ label: 'Hà nội', value: 'hn' },
		],
		type: 'list',
	},
	{
		title: 'Department',
		value: 'department',
		icon: Buildings,
		items: [
			{ label: 'Design', value: 'design' },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Product', value: 'product' },
			{ label: 'Development', value: 'Development' },
			{ label: 'Back Office', value: 'BO' },
			{ label: 'E-commerce', value: 'ecommerce' },
		],
		type: 'list',
	},
	{
		title: 'Salary',
		value: 'salary',
		icon: Dollar,
		type: 'numberSlider',
		min: 0,
		max: 100000000,
		step: 1000000,
	},
	{
		title: 'Quarter',
		value: 'quarter',
		icon: Calendar,
		type: 'timeRange',
	},
];

const payrollStore = usePayrollStore();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const dataSent = ref<SalaryDefinition>();
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);

const handleOpenSheet = (payload?: SalaryDefinition, view?: boolean) => {
	dataSent.value = payload;
	isOpenSheet.value = true;
	isView.value = view || false;
};

const handleOpenAlert = (payload?: SalaryDefinition) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return payrollStore.salaryDefinitions;
	},
	columns: salaryDefinitionColumn(handleOpenSheet, handleOpenAlert),
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
	isView.value = false;
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};

onBeforeMount(() => {
	payrollStore.getAllSalaryDefinition();
});
</script>
<template>
	<ContentWrapper>
		<Title>Salary Definition</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search " />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="filter" />
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-2xl font-medium"
				@click="handleOpenSheet(undefined)">
				<IconFromSvg :icon="ClipboardAdd" />Add new
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<SalaryDefinitionSheet :open="isOpenSheet" @update:open="handleCloseSheet" />
	<AlertPopup :open="isOpenAlert" @update:open="handleCloseAlert" />
</template>
