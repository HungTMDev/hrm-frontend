<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Tuning from '@/assets/icons/Outline/Tuning.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { candidateColumn } from '@/components/recruitments/candidates/candidate.column';
import CandidateSheet from '@/components/recruitments/candidates/CandidateSheet.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ROWS_PER_PAGE } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { valueUpdater } from '@/lib/utils';
import type { Candidate } from '@/types';
import { getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table';
import { ref } from 'vue';

const data: Candidate[] = [
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
	{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+1 123 456 7890',
		cv: 'https://www.google.com',
		job: 'Mobile App Marketer',
		stage: 'Applied',
	},
];

const { showToast } = useCustomToast();

const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const openSheet = ref(false);
const openAlert = ref(false);
const isView = ref(false);
const dataSended = ref<Candidate>();

const handleOpenSheet = (payload?: any, view?: boolean) => {
	isView.value = view || false;
	dataSended.value = payload;
	openSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isView.value = false;
	dataSended.value = undefined;
	openSheet.value = open;
};

const handleOpenAlert = (payload?: any) => {
	dataSended.value = payload;
	openAlert.value = true;
};

const handleCloseAlert = (open: boolean) => {
	dataSended.value = undefined;
	openAlert.value = open;
};

const table = useVueTable({
	data,
	columns: candidateColumn(handleOpenSheet, handleOpenAlert),
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

const handleDelete = () => {
	showToast({
		message: 'Delete candidates success!',
		type: 'success',
		action: {
			label: 'Undo',
		},
	});
};
</script>
<template>
	<ContentWrapper>
		<Title>Candidates</Title>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search candidates" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<Button variant="outline" class="w-fit rounded-full">
				<IconFromSvg :icon="Tuning" /> Filter
			</Button>
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet(undefined)">
				<IconFromSvg :icon="UserPlus" />Add new candidate
			</Button>
		</div>
		<div class="flex flex-col gap-4">
			<DataTable :table="table" />
			<Separator class="mb-2" />
			<DataTablePagination :table="table" />
		</div>
	</ContentWrapper>
	<CandidateSheet
		:data="dataSended"
		:open="openSheet"
		@update:open="handleCloseSheet"
		:is-view="isView"
		@edit="isView = false" />
	<AlertPopup
		:open="openAlert"
		@update:open="handleCloseAlert"
		title="Are you sure you want to delete this candidates?"
		:description="dataSended?.name"
		@confirm="handleDelete" />
</template>
