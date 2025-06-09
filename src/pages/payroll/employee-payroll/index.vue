<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { employeePayrollColumn } from '@/components/payroll/employee-payroll/employee-payroll.column';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import { usePayrollStore } from '@/stores/payroll.store';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { onBeforeMount, ref } from 'vue';
import FileText from '@/assets/icons/Outline/FileText.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import router from '@/routers';
import type { EmployeePayroll } from '@/types';
import EmployeePayrollSheet from '@/components/payroll/employee-payroll/EmployeePayrollSheet.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';
import { useCustomToast } from '@/lib/customToast';

const payrollStore = usePayrollStore();
const { showToast } = useCustomToast();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const dataSent = ref<EmployeePayroll>();
const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);

const handleOpenSheet = (payload?: EmployeePayroll, view?: boolean) => {
	dataSent.value = payload;
	isOpenSheet.value = true;
	isView.value = view || false;
};

const handleOpenAlert = (payload?: EmployeePayroll) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return payrollStore.employeePayrolls;
	},
	columns: employeePayrollColumn(handleOpenSheet, handleOpenAlert),
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

const handleDelete = () => {
	showToast({
		message: 'Delete employee payroll success!',
		type: 'success',
	});
};

const handleNavigate = () => {
	router.push('/payroll/employee-payroll/payroll-file-management');
};

onBeforeMount(() => {
	if (payrollStore.employeePayrolls) payrollStore.getAllEmployeePayroll();
});
</script>
<template>
	<ContentWrapper>
		<Title>Employee Payroll</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				class="py-2 flex-1 rounded-full"
				placeholder="Search employee"
				:icon="Magnifer" />
			<DisplayColumn :list="[]" />
			<FilterPopover :list="[]" />
			<Button
				class="rounded-2xl bg-blue-500 hover:bg-blue-600 font-normal"
				@click="handleNavigate">
				<IconFromSvg :icon="FileText" /> Payroll files
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<EmployeePayrollSheet
		:open="isOpenSheet"
		:is-view="isView"
		:data="dataSent"
		@update:open="handleCloseSheet"
		@edit="isView = false"
		@delete="handleOpenAlert" />

	<AlertPopup
		:open="isOpenAlert"
		:data="dataSent"
		:description="dataSent?.name"
		@update:open="handleCloseAlert"
		@confirm="handleDelete" />
</template>
