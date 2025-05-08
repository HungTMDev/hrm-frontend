<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { Button } from '@/components/ui/button';
import { ROWS_PER_PAGE } from '@/constants';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { ref } from 'vue';
import { screeningColumn } from '../columns';
import { valueUpdater } from '@/lib/utils';
import DataTable from '@/components/datatable/DataTable.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import PassedTabDialog from './PassedTabDialog.vue';
import CandidateSheet from '../CandidateSheet.vue';

const props = defineProps<{
	tab: string;
}>();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const isOpenDialog = ref(false);
const isOpenSheet = ref(false);
const isView = ref(false);

const handleOpenDialog = (payload?: any) => {
	isOpenDialog.value = true;
};
const handleOpenSheet = (payload?: any, view?: boolean) => {
	isView.value = view || false;
	isOpenSheet.value = true;
};

const table = useVueTable({
	get data() {
		return [
			{
				name: 'Nguyễn Văn An',
				email: 'annguyen@gmail.com',
				phone_number: '0234729671',
				job: 'Mobile App Marketer',
				status: 'To-do',
			},
		];
	},
	columns: screeningColumn(props.tab, handleOpenDialog, handleOpenSheet),
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

const handleCloseDialog = (open: boolean) => {
	isOpenDialog.value = open;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};
</script>
<template>
	<div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search applicant" />
			<!-- <DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" /> -->
			<!-- <FilterPopover :list="[]" /> -->
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new candidate
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable :table="table" @row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" />
		</div>
	</div>
	<CandidateSheet
		:open="isOpenSheet"
		:is-view="isView"
		@edit="isView = false"
		@update:open="handleCloseSheet"
		@open-dialog="handleOpenDialog" />
	<PassedTabDialog :open="isOpenDialog" @update:open="handleCloseDialog" />
</template>
