<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import UploadModal from '@/components/payroll/employee-payroll/payroll-file-management/UploadModal.vue';
import { usePayrollStore } from '@/stores/payroll.store';
import { onBeforeMount, ref } from 'vue';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { payrollFileColumn } from '@/components/payroll/employee-payroll/payroll-file-management/payroll-file.column';
import { valueUpdater } from '@/lib/utils';
import { ROWS_PER_PAGE } from '@/constants';
import DataTable from '@/components/datatable/DataTable.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import type { PayrollFileManagement } from '@/types';
import PayrollFileSheet from '@/components/payroll/employee-payroll/payroll-file-management/PayrollFileSheet.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';

const payrollStore = usePayrollStore();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const dataSent = ref<PayrollFileManagement>();
const isView = ref(false);

const handleOpenSheet = (payload?: PayrollFileManagement, view?: boolean) => {
	isView.value = view || false;
	dataSent.value = payload;
	isOpenSheet.value = true;
};

const handleOpenAlert = (payload?: PayrollFileManagement) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const table = useVueTable({
	get data() {
		return payrollStore.payrollFiles;
	},
	columns: payrollFileColumn(handleOpenSheet, handleOpenAlert),
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
	isOpenSheet.value = open;
	dataSent.value = undefined;
	isView.value = false;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
	dataSent.value = undefined;
};

onBeforeMount(() => {
	payrollStore.getAllPayrollFile();
});
</script>
<template>
	<ContentWrapper>
		<Title>Payroll File Management</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				class="py-2 flex-1 rounded-full"
				placeholder="Search employee"
				:icon="Magnifer" />
			<DisplayColumn :list="[]" />
			<FilterPopover :list="[]" />
			<UploadModal />
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<PayrollFileSheet
		:open="isOpenSheet"
		:is-view="isView"
		:data="dataSent"
		@edit="isView = false"
		@update:open="handleCloseSheet" />
	<AlertPopup
		:open="isOpenAlert"
		@update:open="handleCloseAlert"
		:description="dataSent?.payrollOf" />
</template>
