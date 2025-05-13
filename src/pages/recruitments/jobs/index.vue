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
import { useBranch } from '@/composables/branch/useBranch';
import { useDepartment } from '@/composables/department/useDepartment';
import { useJob } from '@/composables/recruitment/job/useJob';
import { useDeleteJob } from '@/composables/recruitment/job/useUpdateJob';
import { DEFAULT_PAGINATION, listEmploymentType, listJobLevel, listJobStatus } from '@/constants';
import { valueUpdater } from '@/lib/utils';
import type { FilterAccordion, FilterData, IJob, IJobFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';

const { data: branches } = useBranch();
const { data: departments } = useDepartment();

const isOpenSheet = ref(false);
const isOpenAlert = ref(false);
const isView = ref(false);
const dataSent = ref<IJob>();

const rowSelection = ref({});
const columnVisibility = ref<VisibilityState>({});

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = ref<Partial<IJobFilter>>({});

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useJob(pagination, filterPayload);
const { mutate: deleteJob, isPending } = useDeleteJob(pagination, filterPayload);

const jobs = computed<IJob[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isView.value = false;
	isOpenSheet.value = open;
};

const handleOpenAlert = (payload: IJob) => {
	dataSent.value = payload;
	isOpenAlert.value = true;
};

const handleCloseAlert = (open: boolean) => {
	isOpenAlert.value = open;
	dataSent.value = undefined;
};

const handleOpenSheet = (payload?: IJob, view?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isView.value = view || false;
	isOpenSheet.value = true;
};

const table = useVueTable({
	get data() {
		return jobs.value;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: jobColumn(handleOpenSheet, handleOpenAlert),
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
		items: branches.value?.map((item: any) => ({ label: item.name, value: item.id })) || [],
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
	{
		value: 'level',
		title: 'Level',
		items: listJobLevel,
		icon: Chart2,
		type: 'list',
	},
]);

const handleDelete = () => {
	if (dataSent.value) deleteJob(dataSent.value.id);
	isOpenAlert.value = false;
};

const handleFilter = (payload: FilterData[]) => {
	const newFilter: Record<string, string[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value);
	});
	filterPayload.value = newFilter;
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
			<DataTable
				:table="table"
				@row:click="(payload) => handleOpenSheet(payload, true)"
				:is-loading="isLoading" />
			<Separator class="mb-4" />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</ContentWrapper>
	<JobSheet
		:open="isOpenSheet"
		:data="dataSent"
		:is-view="isView"
		:pagination="pagination"
		:filter="filterPayload"
		@update:open="handleCloseSheet"
		@open-alert="handleOpenAlert"
		@edit="isView = false" />
	<AlertPopup
		:open="isOpenAlert"
		:is-loading="isPending"
		@update:open="handleCloseAlert"
		@confirm="handleDelete" />
</template>
