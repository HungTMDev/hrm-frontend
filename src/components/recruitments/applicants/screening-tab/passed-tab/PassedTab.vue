<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import AlertPopup from '@/components/common/AlertPopup.vue';
import DisplayColumn from '@/components/common/DisplayColumn.vue';
import FilterPopover from '@/components/common/FilterPopover.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useApplicant } from '@/composables/recruitment/applicant/useApplicant';
import { useUpdateStage } from '@/composables/recruitment/applicant/useUpdateApplicant';
import { useListJob } from '@/composables/recruitment/job/useJob';
import { DEFAULT_PAGINATION, RECRUITMENT_STAGE } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { valueUpdater } from '@/lib/utils';
import type { FilterAccordion, FilterData, IApplicant, IApplicantFilter, IMeta } from '@/types';
import {
	getCoreRowModel,
	useVueTable,
	type PaginationState,
	type VisibilityState,
} from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import ApplicantSheet from '../../ApplicantSheet.vue';
import { screeningColumn } from '../columns';
import PassedTabDialog from './PassedTabDialog.vue';

let timeout: any;
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const isOpenDialog = ref(false);
const isOpenAlert = ref(false);
const isOpenSheet = ref(false);
const isCreateSchedule = ref(false);
const isView = ref(false);
const dataSent = ref<IApplicant>();

const keywords = ref<string>();
const filter = ref<Record<string, string[]>>();

const pageIndex = ref(DEFAULT_PAGINATION.DEFAULT_PAGE - 1);
const pageSize = ref(DEFAULT_PAGINATION.DEFAULT_LIMIT);
const filterPayload = computed<Partial<IApplicantFilter>>(() => ({
	stage: RECRUITMENT_STAGE.SCREENING,
	keywords: keywords.value,
	...filter.value,
}));

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const { data, isLoading } = useApplicant(pagination, filterPayload);
const { data: jobs } = useListJob();
const { showToast } = useCustomToast();

const applicants = computed<IApplicant[]>(() => data.value?.data || []);
const meta = computed<IMeta | undefined>(() => data.value?.meta);
const pageCount = computed(() => meta.value?.total_pages);

const accordionItems = computed<FilterAccordion[]>(() => [
	{
		value: 'job_id',
		title: 'Job',
		items: jobs.value?.map((item) => ({ label: item.title, value: item.id })) || [],
		icon: Building3,
		type: 'list',
	},
]);

const { mutate: updateStage, isPending: isRejecting } = useUpdateStage();

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

const handleOpenSheet = (payload?: IApplicant, view?: boolean, createSchedule?: boolean) => {
	if (payload instanceof PointerEvent) {
		dataSent.value = undefined;
	} else {
		dataSent.value = payload;
	}
	isCreateSchedule.value = createSchedule ?? false;
	isView.value = view ?? false;
	isOpenSheet.value = true;
};

const handleOpenDialog = (payload?: IApplicant) => {
	dataSent.value = payload;
	isOpenDialog.value = true;
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
	columns: screeningColumn({ handleOpenSheet, handleOpenAlert, handleOpenDialog }),
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
	const newFilter: Record<string, (string | number)[]> = {};
	payload.forEach((item) => {
		newFilter[item.field] = item.filters.map((i) => i.value as string);
	});

	pageIndex.value = 0;
	filter.value = newFilter as Record<string, string[]>;
};

const handleReject = () => {
	updateStage(
		{
			id: dataSent.value?.id || '',
			data: { to_stage: RECRUITMENT_STAGE.REJECTED, outcome: 'FAILED' },
		},
		{
			onSuccess: () => {
				showToast({
					message: 'Success!',
					type: 'success',
				});
				isOpenAlert.value = false;
				dataSent.value = undefined;
			},
		},
	);
};

const handleCloseDialog = (open: boolean) => {
	dataSent.value = undefined;
	isOpenDialog.value = open;
};

const handleCloseSheet = (open: boolean) => {
	dataSent.value = undefined;
	isCreateSchedule.value = false;
	isOpenSheet.value = open;
};

const handleCloseAlert = (open: boolean) => {
	dataSent.value = undefined;
	isOpenAlert.value = open;
};
</script>
<template>
	<div>
		<div class="flex gap-4 items-center my-4">
			<InputWithIcon
				:icon="Magnifer"
				class="py-2 flex-1 rounded-full"
				placeholder="Search..."
				@update:model-value="handleSearch" />
			<DisplayColumn :list="table.getAllColumns().filter((column) => column.getCanHide())" />
			<FilterPopover :list="accordionItems" @update:value="handleFilter" />
		</div>
		<div class="flex flex-col gap-3">
			<DataTable
				:table="table"
				@row:click="(payload) => handleOpenSheet(payload, true)"
				:is-loading="isLoading" />
			<Separator />
			<DataTablePagination :table="table" :meta="meta" />
		</div>
	</div>
	<ApplicantSheet
		:open="isOpenSheet"
		:is-view="isView"
		:applicant-id="dataSent?.id"
		:is-create-schedule="isCreateSchedule"
		@edit="isView = false"
		@update:open="handleCloseSheet" />
	<PassedTabDialog :open="isOpenDialog" :id="dataSent?.id" @update:open="handleCloseDialog" />
	<AlertPopup
		:open="isOpenAlert"
		:description="dataSent?.candidate.full_name"
		:is-loading="isRejecting"
		button-label="Reject"
		title="Are you sure reject this candidate?"
		@update:open="handleCloseAlert"
		@confirm="handleReject" />
</template>
