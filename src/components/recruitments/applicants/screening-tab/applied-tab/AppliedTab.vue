<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings 3.svg';
import Building from '@/assets/icons/Outline/Buildings.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import ChartSqare from '@/assets/icons/Outline/Chart Square.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Upload from '@/assets/icons/Outline/Upload Minimalistic.svg';
import UserPlus from '@/assets/icons/Outline/User Plus.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { Button } from '@/components/ui/button';
import Separator from '@/components/ui/separator/Separator.vue';
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { useApplicant } from '@/composables/recruitment/applicant/useApplicant';
import { useUpdateStage } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useDeleteCandidate } from '@/composables/recruitment/applicant/useUpdateCandidate';
import {
	DEFAULT_PAGINATION,
	listEmploymentType,
	listJobStatus,
	RECRUITMENT_STAGE,
} from '@/constants';
import { valueUpdater } from '@/lib/utils';
import type {
	FilterAccordion,
	FilterData,
	IApplicant,
	IApplicantFilter,
	IBranch,
	IMeta,
} from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import CandidateSheet from '../CandidateSheet.vue';
import { screeningColumn } from '../columns';
import AppliedDialog from './AppliedDialog.vue';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();

const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const isView = ref(false);
const dataSent = ref<IApplicant>();

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantFilter>>(() => ({
	stage: RECRUITMENT_STAGE.APPLIED,
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useApplicant(pagination, filterPayload);

const applicants = computed<IApplicant[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const { mutate } = useDeleteCandidate(pagination, filterPayload);
const { mutate: updateStage } = useUpdateStage();

const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'status',
		title: 'Status',
		items: listJobStatus,
		icon: ChartSqare,
		type: 'list',
	},
	{
		value: 'branch',
		title: 'Branch',
		items: branches.value?.map((item: IBranch) => ({ label: item.name, value: item.id })) || [],
		icon: Building3,
		type: 'list',
	},
	{
		value: 'department',
		title: 'Department',
		items: departments.value?.map((item: any) => ({ label: item.name, value: item.id })) || [],
		icon: Building,
		type: 'list',
	},
	{
		value: 'employment_type',
		title: 'Employment type',
		items: listEmploymentType,
		icon: Case,
		type: 'list',
	},
]);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleOpenAlert = (payload: IApplicant) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleOpenSheet = (payload?: IApplicant, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isView.value = view || false;
	isOpenSheet.value = true;
};

const handleStage = (action: string, payload: IApplicant) => {
	if (action === 'PASS') {
		updateStage({
			id: payload.id,
			data: { to_stage: RECRUITMENT_STAGE.SCREENING, outcome: 'PASSED' },
		});
		return;
	}
	updateStage({
		id: payload.id,
		data: { to_stage: RECRUITMENT_STAGE.REJECTED, outcome: 'FAILED' },
	});
};

const table = useVueTable({
	get data() {
		return applicants.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: screeningColumn({ handleOpenSheet, handleOpenAlert, handleStage }),
	state: {
		get rowSelection() {
			return rowSelection.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
	},
	initialState: {
		pagination: pagination.value,
	},
	manualPagination: true,
	getCoreRowModel: getCoreRowModel(),
	onPaginationChange: (updater) => {
		if (typeof updater === 'function') {
			setPagination(updater(pagination.value));
		} else {
			setPagination(updater);
		}
	},
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
});

const handleSearch = (payload: string | number) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		keywords.value = payload === '' ? undefined : (payload as string);
	}, 500);
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, string[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});

	pageIndex.value = 0;

	filter.value = newFilter;
};

const handleOpenDialog = () => {
	isOpenDialog.value = true;
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
	isOpenDialog.value = open;
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};

const handleDeleteCandidate = () => {
	mutate(dataSent.value!.id);
	isOpenAlert.value = false;
};
</script>
<template>
	<div>
		<div class="flex gap-2 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenDialog">
				<IconFromSvg :icon="Upload" />Upload
			</Button>
			<Button
				class="bg-blue-500 hover:bg-blue-600 rounded-3xl font-medium"
				@click="handleOpenSheet">
				<IconFromSvg :icon="UserPlus" />Add new
			</Button>
		</div>
		<div class="flex flex-col gap-3">
			<DataTable
				:table="table"
				:is-loading="isLoading"
				@row:click="(payload) => handleOpenSheet(payload, true)" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>
	<CandidateSheet
		:open="isOpenSheet"
		:is-view="isView"
		:data="dataSent"
		:pagination="pagination"
		:filter="filterPayload"
		@back="isView = true"
		@edit="isView = false"
		@update:open="handleCloseSheet"
		@open-dialog="handleOpenDialog" />
	<AppliedDialog
		:open="isOpenDialog"
		:pagination="pagination"
		:filter="filterPayload"
		@update:open="handleCloseDialog" />
	<AlertPopup
		:open="isOpenAlert"
		@update:open="handleCloseAlert"
		@confirm="handleDeleteCandidate" />
</template>
